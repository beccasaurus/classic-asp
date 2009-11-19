%w( rubygems dm-core dm-validations dm-aggregates data_objects ).each {|lib| require lib }

class Dog
  include DataMapper::Resource

  property :id,   Serial
  property :name, String, :nullable => false, :unique => true
end

DataMapper.setup :default, "sqlite3://#{ File.expand_path(File.dirname(__FILE__), 'dogs.sqlite') }"
DataMapper.auto_upgrade!
