class Api::UsersController < ApplicationController
  skip_before_action :authenticate_user
  
  def index
    @users = User.all
    @friends = current_user.friends
    @pending_requests = current_user.pending_requests
    @friend_requests = current_user.received_requests
  end
  
  # post '/api/signup'
  def create
    user = User.create(user_params)
    if user.valid?
      session[:user_id] = user.id
      render json: user, status: :ok
    else
      render json: { error: user.errors }, status: :unprocessable_entity
    end
  end

  # get '/api/me'
  def show
      render json: @current_user
  end

  
  def update
      user = User.find(params[:id])
      user.update!(user_params)
      render json: user, status: :ok
  end

  def destroy
      user = User.find(params[:id])
      user.destroy
      head :no_content
  end


  private

  def user_params
    params.permit(:username, :profile_img, :email, :password, :password_confirmation)
  end

end