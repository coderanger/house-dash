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



application '/srv/homebridge' do
  javascript '6'

  apt_repository 'raspi2' do
    uri 'http://ppa.launchpad.net/ubuntu-raspi2/ppa/ubuntu'
    components %w{main}
    key '6587FFD6536B8826E88A62547876AE518CBCF2F2'
  end

  # libavahi-compat-libdnssd-dev is needed for homebridge.
  # libraspberrypi-bin contains the tvservice command.
  package %w{libavahi-compat-libdnssd-dev libraspberrypi-bin}

  node_package %w{homebridge homebridge-cmdswitch2} do
    # path parent.path # FIXME AppMixin is stomping on the path property.
    path false
  end

  poise_service_user 'homebridge' do
    home '/srv/homebridge'
  end

  directory '/srv/homebridge/.homebridge' do # FIXME Should use an application_directory and be relative.
    # Make sure homebridge has write access here for it's state folders.
    owner 'homebridge'
    group 'homebridge'
  end

  file '/etc/sudoers.d/homebridge' do
    content "homebridge ALL = (root) NOPASSWD: /usr/bin/tvservice, /bin/fbset, /usr/bin/xrefresh\n"
  end

  file '.homebridge/config.json' do
    content({
      bridge: {
        name: 'Homebridge',
        pin: node['house-dash']['homebridge_pin'],
        port: 51826,
        username: 'CC:22:3D:E3:CE:30',
      },
      platforms: [
        {
          platform: 'cmdSwitch2',
          switches: [
            {
              name: 'Dashboard',
              # on_cmd: 'sudo tvservice --preferred && sudo fbset -depth 8 && sudo fbset -depth 16 && sudo xrefresh -display :0',
              on_cmd: 'sudo tvservice --preferred && sudo fbset -depth 32 && xset dpms force on -display :0 && xrefresh -display :0',
              off_cmd: 'sudo tvservice --off',
              state_cmd: 'sudo tvservice --status | grep progressive',
            },
          ],
        },
      ]
    }.to_json) # FIXME Make applicaiton_file detect/convert based on path for non-strings.
  end

  javascript_service 'homebridge' do # FIXME we should do something smarter here?
    command File.expand_path('../homebridge', javascript)
    user 'homebridge'
  end
end
