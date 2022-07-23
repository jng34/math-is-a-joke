class Api::JokesController < ApplicationController
    skip_before_action :authenticate_user
    
    def index
        render json: Joke.all
    end

    def show
        render json: Joke.find(params[:id])
    end
end
