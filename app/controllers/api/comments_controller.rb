class Api::CommentsController < ApplicationController

    def new
        @comment = Comment.new
    end

    def create
        @comment = current_user.comments.build(comment_params)
        @joke = Joke.find(params[:comment][:joke_id])
        if @comment.save
            @notification = new_notification(@joke.user, @joke.id, 'comment')
            @notification.save
        end
        redirect_to @joke
    end

    def destroy
        @comment = Comment.find(params[:id])
        return unless current_user.id == @comment.user_id
        @comment.destroy
        flash[:success] = 'Comment deleted'
        redirect_back(fallback_location: root_path)
    end

    private

    def comment_params
        params.require(:comment).permit(:post, :joke_id)
    end
end
