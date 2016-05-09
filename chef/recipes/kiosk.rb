#
# Copyright 2016, Noah Kantrowitz
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

raise "This is intended for Raspbian or other Debian-style distros" unless platform_family?('debian')

# Upgrade all the things!
apt_update 'update'
execute 'apt-get -y upgrade'

# Install some utilities for our kiosk.
package %w{xorg lightdm matchbox x11-xserver-utils unclutter firefox}

# Install RKisok
global_extensions_dir = '/usr/share/mozilla/extensions/{ec8030f7-c20a-464f-9b0e-13a3a9e97384}'
rkiosk_page = Chef::HTTP.new('https://addons.mozilla.org/').get('/en-us/firefox/addon/r-kiosk/versions/')
raise "unable to parse RKiosk version" unless rkiosk_page =~ %r{href="(https://addons.mozilla.org/.*?\.xpi)}
rkiosk_url = $1
rkiosk_id = '{4D498D0A-05AD-4fdb-97B5-8A0AABC1FC5B}'
rkiosk_path = File.join(Chef::Config[:file_cache_path], rkiosk_url.split(%r{/}).last.gsub(/.xpi$/, '.zip'))

log "Downloading RKiosk from #{rkiosk_url}"

remote_file rkiosk_path do
  source rkiosk_url
end

directory global_extensions_dir
directory File.join(global_extensions_dir, rkiosk_id)

poise_archive rkiosk_path do
  destination File.join(global_extensions_dir, rkiosk_id)
  strip_components 0
end

# Create a startup script for our X session.
directory '/usr/local'
directory '/usr/local/bin'
file '/usr/local/bin/house-dash-kiosk' do
  owner 'root'
  group 'root'
  mode '755'
  content <<-EOH
#!/bin/sh
xset -dpms
xset s off
unclutter &
matchbox-window-manager &
while true; do
  firefox http://localhost:3000/
done
EOH
end

# Create an Xsession thingy.
file '/usr/share/xsessions/house-dash-kiosk.desktop' do
  content <<-EOH
[Desktop Entry]
Name=house-dash-kiosk
Exec=/usr/local/bin/house-dash-kiosk
EOH
end

auto_login_user = node['etc']['passwd'].find {|username, data| data['uid'] >= 1000 && username != 'nobody' }.first
raise "no user for autologin found" unless auto_login_user

# Set up our session in LightDM.
file '/etc/lightdm/lightdm.conf' do
  content <<-EOH
[SeatDefaults]
autologin-guest=false
autologin-user=#{auto_login_user}
autologin-user-timeout=0
user-session=house-dash-kiosk
EOH
end

# Install our session as the default.
execute 'update-alternatives --install /usr/bin/x-session-manager x-session-manager /usr/local/bin/house-dash-kiosk 100 && systemctl restart lightdm'
