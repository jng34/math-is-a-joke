class Api::UsersController < ApplicationController
  skip_before_action :authenticate_user, only: [:create, :index]

  def rankings_index
    render json: User.order(score: :desc)
  end
  
  def index
    # @users = User.all
    # @friends = current_user.friends
    # @pending_requests = current_user.pending_requests
    # @friend_requests = current_user.received_requests
    render json: User.all
  end
  
  # post '/api/signup'
  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
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
    params.permit(:username, :profile_img, :email, :score, :password, :password_confirmation)
  end

end