require 'sinatra'
require 'net/http'
require 'json'

class MovieApp < Sinatra::Base
  get '/' do
    return File.read('./views/index.html')
  end

  get '/favorites' do
    response.header['Content-Type'] = 'application/json'
    File.read('./data.json')
  end

  post '/favorites' do
    file = JSON.parse(File.read('data.json'))
    unless params[:name] && params[:oid]
      return 'Invalid Request'
    end
    movie = { name: params[:name], oid: params[:oid] }
    file << movie
    File.write('data.json',JSON.pretty_generate(file))
    File.read('./data.json')
  end
end
