require 'rest-client'
require 'rss'
require 'sinatra'

get '/' do
  # News ticker data.
  @bbc = RSS::Parser.parse(RestClient.get('http://newsrss.bbc.co.uk/rss/newsonline_uk_edition/front_page/rss.xml'))
  erb :index
end
