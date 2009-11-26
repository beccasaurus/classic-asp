require File.dirname(__FILE__) + '/../spec_helper'

describe 'Rails' do

  before(:all){ setup :rails }

  it 'should be able to render text for an arbitrary controller action' do
    pending "going to extract the Sinatra router (so I can re-use it) then come back to this"
    get('/cats').should == 'Hello from CatsController index action'
  end

  it 'should be able to render a template for an arbitrary controller action'

  it 'should be able to list dogs (example)'

  it 'should be able to ... ?'

end
