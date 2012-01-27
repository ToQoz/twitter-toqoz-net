# -*- coding: utf-8 -*-

require 'sinatra'

require 'yaml'
require 'hashie'
require 'sass'
require 'oauth'
require 'rubytter'
require 'mongoid'

require './api/twitter'
# require './models/post'

def load_accounts
  path = File.expand_path("./config/accounts.yml")
  Hashie::Mash.new(YAML.load_file("./config/accounts.yml"))
rescue
  raise "there is nothing \"/config/accounts.yml\""
end

configure do
  set :accounts, load_accounts()
end

get '/' do
  erb :index
end

post '/' do
  content_type :json
  client = Twitter.new(options.accounts.twitter).client()
  begin
    client.update(params['body'])
    {:status => true, :msg => "Complete Post"}.to_json
  rescue => e
    {:status => false, :msg => e.message}.to_json
  end
end

get '/stylesheets/:name.css' do
    sass :"stylesheets/#{params[:name]}"
end
