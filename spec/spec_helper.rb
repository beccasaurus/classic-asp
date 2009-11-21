%w( rubygems spec httparty fileutils ).each {|lib| require lib }

def asp_server
  'http://10.5.5.107/'
end

def get uri
  HTTParty.get File.join(asp_server, uri)
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
