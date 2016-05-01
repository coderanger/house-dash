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
packages %w{matchbox x11-xserver-utils unclutter}

# Install the kweb browser.
# TODO make this more Chef-y.
bash 'install kweb' do
  code <<-EOH
wget http://steinerdatenbank.de/software/kweb-1.7.1.tar.gz
tar -xzf kweb-1.7.1.tar.gz
cd kweb-1.7.1
./debinstall
EOH
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
  kweb3 -KHCUA+-zbhrqfpoklgtjneduwxyavcsmi#?!., https://google.com/
done
EOH
end

# Install our session as the default.
execute 'update-alternatives --install /usr/bin/x-session-manager x-session-manager /usr/local/bin/house-dash-kiosk 100'
