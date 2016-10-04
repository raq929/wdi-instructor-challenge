require 'sinatra'
require 'net/http'

class MovieApp < Sinatra::Base
  get '/' do
    title = params[:title]
    year = params[:year]
    unless title || year
      return File.read('./views/index.html')
    end

    url = URI("http://www.omdbapi.com/?t=#{title}&y=#{year}&plot=short&r=json")
    Net::HTTP.get(url)
  end

  get '/favorites' do
    response.header['Content-Type'] = 'application/json'
    File.read('./data.json')
  end

  put '/favorites' do
    file = JSON.parse(File.read('data.json')) || []
    unless params[:name] && params[:oid]
      return 'Invalid Request'
    end
    movie = { name: params[:name], oid: params[:oid] }
    file << movie
    File.write('data.json',JSON.pretty_generate(file))
    movie.to_json()
  end
end
