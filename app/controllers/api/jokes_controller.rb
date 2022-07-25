class Api::JokesController < ApplicationController
    skip_before_action :authenticate_user, only: [:index, :show]
    
    def index
        render json: Joke.all
    end

    def show
        @joke = Joke.find(params[:id])
        render json: @joke
    end

    def new
        @joke = Joke.new
    end

    def create
        @joke = current_user.jokes.create!(joke_params)
        render json: @joke, status: :created
        # if @joke.save
        #     redirect_to @joke
        # else
        #     render 'new'
        # end
    end
    
    def update
        joke = Joke.find_by(id: params[:id])
        joke.update!(joke_params)
        render json: joke, status: :accepted
    end

    def destroy
        @joke.destroy
        head :no_content
    end

    private

    def joke_params
        params.permit(:setup, :punchline, :user_id, :likes)
    end
end
