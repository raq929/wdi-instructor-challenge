require 'sinatra'

get '/' do
  File.read('index.html')
end

get 'favorites' do
  response.header['Content-Type'] = 'application/json'
  File.read('data.json')
end

put '/favorites' do
  file = JSON.parse(File.read('data.json'))
  unless params[:name] && params[:oid]
    return 'Invalid Request'
  end
  movie = { name: params[:name], oid: params[:oid] }
  file << movie
  File.write('data.json',JSON.pretty_generate(file))
  movie.to_json
end
