class Api::FavoritesController < ApplicationController
    skip_before_action :authenticate_user

    def create
        favorite = Favorite.create!(favorite_params)
        render json: favorite, status: :created
    end

    def destroy
        favorite = Favorite.find(params[:id])
        favorite.destroy 
        head :no_content
    end

    private

    # Add comment_id later if necessary 
    def favorite_params
        params.permit(:user_id, :joke_id)
    end
end
