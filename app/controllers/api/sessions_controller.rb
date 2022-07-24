class Api::SessionsController < ApplicationController
  skip_before_action :authenticate_user, only: [:create]

  # post '/api/login'
  def create
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: :ok
    else
      render json: { error: 'Invalid username or password.' }, status: :unauthorized
    end
  end

  # delete '/api/logout'
  def destroy
    session.delete :user_id
    head :no_content
  end

end