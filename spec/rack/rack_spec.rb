require File.dirname(__FILE__) + '/../spec_helper'

describe 'Rack' do

  before(:all){ setup :rack }

  it 'should be able to hit the server' do
    get('/').body.should include('Hello World')
  end

end
