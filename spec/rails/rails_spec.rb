require File.dirname(__FILE__) + '/../spec_helper'

describe 'Rails' do

  before(:all){ setup :rails }

  it 'should be able to render text for an arbitrary controller action' do
    get('/dogs').should == 'Hello from DogsController index action'
  end

  it 'should be able to render a template for an arbitrary controller action'

  it 'should be able to list dogs (example)'

  it 'should be able to ... ?'

end
