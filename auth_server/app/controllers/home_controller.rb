class HomeController < ApplicationController
  before_action :authenticate_request!

  def index
    render json: { premium: !!current_user.premium }
  end
end
