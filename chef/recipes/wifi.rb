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

package %w{wireless-tools wpasupplicant}

file '/etc/wpa_supplicant/wpa_supplicant.conf' do
  owner 'root'
  group 'root'
  mode '600'
  sensitive true
  content <<-EOH
network={
  ssid="codeNet2"
  psk="#{node['house-dash']['wpa_key']}"
  scan_ssid=1
}
EOH
end

wifi_interface = node['network']['interfaces'].keys.find {|name| name.start_with?('w') }
raise "no wifi interface found" unless wifi_interface

ifupdown = execute "ifdown #{wifi_interface} && ifup #{wifi_interface}" do
  action :nothing
end

file "/etc/network/interfaces.d/#{wifi_interface}.cfg" do
  notifies :run, ifupdown, :immediately
  content <<-EOH
auto #{wifi_interface}
iface #{wifi_interface} inet dhcp
wpa-driver wext
wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf
EOH
end
