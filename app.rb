# -*- coding: utf-8 -*-

require 'sinatra'

require 'yaml'
require 'hashie'
require 'sass'
require 'oauth'
require 'rubytter'
require 'mongoid'
require "rack/csrf"

require './api/twitter'
# require './models/post'

def load_config
  Hashie::Mash.new(YAML.load_file("./config/config.yml"))
rescue
  raise "there is nothing \"/config/config.yml\""
end

configure do
  config = load_config()
  set :app_file, __FILE__
  set :accounts, config.accounts
  use Rack::Session::Cookie, :secret => config.app.session_secret
  use Rack::Csrf, :raise => true
  set :protection, :except => :json_csrf
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

helpers do
  def csrf_token
    Rack::Csrf.csrf_token(env)
  end

  def csrf_tag
    Rack::Csrf.csrf_tag(env)
  end
end
