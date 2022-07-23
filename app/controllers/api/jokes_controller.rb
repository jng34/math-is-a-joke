class Api::JokesController < ApplicationController
    skip_before_action :authenticate_user
    
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
        @joke = current_user.jokes.build(jokes_params)
        if @joke.save
            redirect_to @joke
        else
            render 'new'
        end
    end
    
    def update
        render json: @joke.update!(jokes_params)
    end

    def destroy
        @joke.destroy
        head :no_content
    end

    private

    def jokes_params
        params.permit(:setup, :punchline)
    end
end
