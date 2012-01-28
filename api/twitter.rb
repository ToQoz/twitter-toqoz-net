class Twitter
  def initialize(accounts)
    @consumer_key = accounts.consumer_key
    @consumer_secret = accounts.consumer_secret
    @access_token = accounts.access_token
    @access_token_secret =  accounts.access_token_secret
    @command_regexp = accounts.command_regexp
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
  def trim_command(status)
    match = @command_regexp.match(status)
    match != nil ? match.post_match : status
  end
end
