class Twitter
  def initialize(accounts)
    @consumer_key = accounts.consumer_key
    @consumer_secret = accounts.consumer_secret
    @access_token = accounts.access_token
    @access_token_secret =  accounts.access_token_secret
  end

  def client()
    consumer = OAuth::Consumer.new(
      @consumer_key,
      @consumer_secret,
      :site => 'http://api.twitter.com'
    )
    access_token = OAuth::AccessToken.new(
      consumer,
      @access_token,
      @access_token_secret
    )
    OAuthRubytter.new(access_token)
  end
end
