require File.dirname(__FILE__) + '/../spec_helper'

describe 'DB' do

  before(:all){ setup :db }

  before do
    DataMapper.auto_migrate!
  end

  it "should be able to get a model's columns" do
    get('/dog-columns').body.should include('"name":"id"')
    get('/dog-columns').body.should include('"name":"name"')
  end

  it 'should be able to get all() of a model' do
    get('/all').should == '[]'

    Dog.create :name => 'Rover'
    get('/all').should include('"name":"Rover"')

    Dog.create :name => 'Snoopy'
    get('/all').should include('"name":"Rover"')
    get('/all').should include('"name":"Snoopy"')
  end

  it 'should be able to get a first() model' do
    Dog.create :name => 'Rover'
    get('/first').should include('"name":"Rover"')
  end

  it "should be able to get a model's count()" do
    get('/count').should == '0'

    Dog.create :name => 'Rover'
    get('/count').should == '1'

    Dog.create :name => 'Snoopy'
    get('/count').should == '2'
  end

  it 'should be able to pass string equals conditions to first()' do
    get('/dogs/Snoopy').should == nil

    Dog.create :name => 'Rover'
    get('/dogs/Snoopy').should == nil

    Dog.create :name => 'Snoopy'
    get('/dogs/Snoopy').should include('"name":"Snoopy"')
  end

  it 'should be able to get() by id' do
    get('/dog/1').should == nil
    get('/dog/2').should == nil

    Dog.create :name => 'Rover'
    get('/dog/1').should include('"name":"Rover"')
    get('/dog/2').should == nil

    Dog.create :name => 'Snoopy'
    get('/dog/1').should include('"name":"Rover"')
    get('/dog/2').should include('"name":"Snoopy"')
  end

  it 'should be able to pass integer equals conditions to first()'

  it 'should be able to create() a dog' do
    get('/count').should == '0'

    post '/dogs.asp', :body => { :name => 'Rover' }

    get('/count').should == '1'
    get('/first').should include('"name":"Rover"')
  end

  it 'should be able to save() a dog (CREATE)' do
    get('/count').should == '0'

    post '/create-via-save.asp', :body => { :name => 'Rover' }

    get('/count').should == '1'
    get('/first').should include('"name":"Rover"')
  end

  # very custom version, with 1 attribute ... need better tests with update_attributes, etc
  it 'should be able to save() a dog (UPDATE)' do
    post '/create-via-save.asp', :body => { :name => 'Rover' }
    get('/count').should == '1'
    get('/first').should include('"name":"Rover"')

    put '/update-dog/Rover.asp', :body => { :name => 'Snoopy' }
    get('/count').should == '1'
    get('/first').should include('"name":"Snoopy"')
  end

end
