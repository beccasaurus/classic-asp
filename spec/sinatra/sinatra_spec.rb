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

  it 'should be able to get POST params' do
    post('/params.asp', :body => { :foo => 'bar' }).body.should == '{"foo":"bar"}'
  end

  it 'should be able to get query string params' do
    post('/params.asp', :query => { :chunky => 'bacon' }).body.should == '{"chunky":"bacon"}'
  end

  it 'should be able to get POST & query string params' do
    response = post('/params.asp', :body => { :foo => 'bar' }, :query => { :chunky => 'bacon' }).body
    response.should include('"foo":"bar"')
    response.should include('"chunky":"bacon"')
  end

  it 'should be able to use Regexp for paths' do
    get('/regex-1').body.should == 'Regexp match'
    get('/regex-8').body.should == 'Regexp match'
  end

  it 'should be able to get the matches from Regexp used for paths' do
    get('/regex-match-1' ).body.should == 'Number: 1'
    get('/regex-match-8' ).body.should == 'Number: 8'
    get('/regex-match-14').body.should == 'Number: 14'
  end

  it 'should support splats in paths'

  it 'should be able to put tokens in paths, eg. /dogs/:name' do
    get('/dynamic/foo').body.should == "Dynamic: foo"
    get('/dynamic/bar').body.should == "Dynamic: bar"
  end

  it 'should be able to set custom headers' do
    get('/foo.xml').headers['content-type'].should == ['application/xml']
  end

  it 'should be able to set custom status code' do
    get('/return-404').body.should == 'hello!'
    get('/return-404').code.should == 404
  end

  it 'should be able to render haml (inline)' do
    get('/inline-haml').body.should == "\n<h1>hello there</h1>\n"
  end

  it 'should be able to render haml (inline)(with variables)' do
    get('/inline-haml-vars').body.should == "\n<h1>FOO</h1>\n"
  end

  it 'should be able to render haml (from a view file)' do
    get('/haml').body.should == "\n<h1>hello from file</h1>\n"
  end

  it 'should be able to render haml (from a view file)(with variables)' do
    get('/haml-vars').body.should == "\n<h1>hello from FOO</h1>\n"
  end

  it 'should be able to have function accept :named argument' do
    get('/say2/what'     ).should == 'Say: what'
    get('/say2/who'      ).should == 'Say: who'
    get('/say2/how/goes' ).should == 'Say: how ... goes'
  end

  it 'should be able to have function accept regular regular expression matches' do
    get('/say/what'     ).should == 'Say: what'
    get('/say/who'      ).should == 'Say: who'
    get('/say/how/goes' ).should == 'Say: how ... goes'
  end

  it 'should be able to easily redirect'

  it 'should be able to accept nested POST parameters'

end
