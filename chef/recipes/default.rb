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

application '/srv/house-dash' do
  git 'https://github.com/coderanger/house-dash.git' do
    branch 'release'
  end
  javascript '6'
  environment.update(
    NODE_ENV: 'production',
    BART_API_KEY: node['house-dash']['bart_api_key'],
    FORECASTIO_API_KEY: node['house-dash']['forecastio_api_key'],
    IMGUR_CLIENT_ID: node['house-dash']['imgur_client_id'],
  )
  npm_install do
    timeout 3600
  end
  npm_start
end
