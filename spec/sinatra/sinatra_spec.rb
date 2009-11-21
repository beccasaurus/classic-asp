require File.dirname(__FILE__) + '/../spec_helper'

# see spec/sinatra/app.js for the example sinatra application that this is testing

describe 'Sinatra' do

  before(:all){ setup :sinatra }

  it 'should be able to handle GET requests' do
    get('/').body.should == 'Hello World'
  end

  it 'should be able to handle POST requests' do
    # you need to manually add the .asp
    post('/foo.asp'  ).body.should == 'POSTed to foo'
    post('/index.asp').body.should == 'POST!'
  end

  it 'should be able to handle PUT requests' do
    put('/index.asp').body.should == 'PUT!'
  end

  it 'should be able to handle DELETE requests' do
    delete('/index.asp').body.should == 'DELETE!'
  end

  it 'should return a useful message (with 404) with paths are not found' do
    get('/does-not-exist').code.should == 404

    get('/does-not-exist'     ).body.should include('GET /does-not-exist')
    post('/does-not-exist.asp').body.should include('POST /does-not-exist')
  end

  it 'should be able to get POSTed params'
  it 'should be able to get query string params'

  it 'should be able to use Regexp for paths'
  it 'should be able to put tokens in paths, eg. /dogs/:name'

  it 'should be able to set custom headers'
  it 'should be able to set custom status code'

  it 'should be able to render haml (inline)'
  it 'should be able to render haml (from a view file)'

end
