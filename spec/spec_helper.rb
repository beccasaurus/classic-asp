%w( rubygems spec httparty fileutils tempfile ).each {|lib| require lib }
require File.dirname(__FILE__) + '/db/dog'

def asp_server_ip
  ENV['IP'] || 'localhost'
end

def asp_server
  ENV['HOST'] || "http://#{ asp_server_ip }/"
end

def save_and_open response
  file = Tempfile.new 'classic-asp-testing.html'
  file.print response
  file.flush
  `firefox #{ file.path }`
end

def get uri
  HTTParty.get File.join(asp_server, uri)
end

def post uri, params = {}
  HTTParty.post File.join(asp_server, uri), params
end

def put uri, params = {}
  HTTParty.put File.join(asp_server, uri), params
end

def delete uri
  HTTParty.delete File.join(asp_server, uri)
end

def setup directory
  FileUtils.cp path('spec', directory.to_s, 'app.js'), path('app.js')
end

def path *args
  File.join root, *args.map {|arg| arg.to_s }
end

def root
  File.join File.dirname(__FILE__), '..'
end

Spec::Runner.configure do |config|
end
