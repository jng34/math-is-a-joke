class Api::FriendsController < ApplicationController
    # include ApplicationHelper
    skip_before_action :authenticate_user, only: [:render_made_friends, :render_not_friends, :create, :index, :update_friend_req,
    :delete_friend, :decline_friend_req, :sent_requests, :received_requests]

    def render_not_friends
        not_friends = Friend.not_friends
        render json: not_friends 
    end
    
    def render_made_friends
        made_friends = Friend.made_friends
        render json: made_friends 
    end

    def index
        render json: Friend.all
    end

    def sent_requests
        reqs = Friend.where(sent_by_id: params[:id], status: false, request_sender: true)
        render json: reqs, status: :ok
    end

    def received_requests
        reqs = Friend.where(sent_to_id: params[:id], status: false, request_sender: true)
        render json: reqs, status: :ok
    end

    #create for accepted and pending friends

    def create 
        request_1 = Friend.create!(sent_to_id: params[:sent_to_id], sent_by_id: params[:sent_by_id], status: false, request_sender: true);
        request_2 = Friend.create!(sent_to_id: params[:sent_by_id], sent_by_id: params[:sent_to_id], status: false, request_sender: false);
        render json: [request_1, request_2], status: :created
        
        # hasFriend = Friend.find_by(sent_to_id: params[:sent_by_id], sent_by_id: params[:sent_to_id], status: false);
        # if hasFriend
        #     render json: { errors: "There is a pending friend request already." }
        # else 
        #     friendship = Friend.create!(friends_params)
        #     render json: friendship, status: :created
        # end
    end 

    # def update
    #     friendship = Friend.find_by(friends_params);
    #     # friendship = Friend.find(params[:id])
    #     if friendship
    #         friendship.update!(status: params[:status])
    #         render json: friendship, status: :ok
    #     else
    #         render json: { errors:  "Friendship cannot be made." }
    #     end
    # end

    def update_friend_req
        friendship1 = Friend.find_by(sent_to_id: params[:sent_by_id], sent_by_id: params[:sent_to_id], status: false);
        friendship1.update!(status: params[:status])
        friendship2 = Friend.find_by(sent_to_id: params[:sent_to_id], sent_by_id: params[:sent_by_id], status: false);
        friendship2.update!(status: params[:status])
        
        render json: Friend.all, status: :ok
        # friendship = Friend.find_by(sent_to_id: params[:sent_to_id], sent_by_id: params[:sent_by_id], status: false);
        # if friendship
        #     friendship.update!(status: params[:status])
        #     render json: friendship, status: :ok
        # else
        #     render json: { errors:  "Friendship cannot be made." }
        # end
    end

    # remove friend
    def delete_friend
        friend1 = Friend.find_by(sent_to_id: params[:sent_to_id], sent_by_id: params[:sent_by_id], status: true)
        friend1.destroy
        friend2 = Friend.find_by(sent_to_id: params[:sent_by_id], sent_by_id: params[:sent_to_id], status: true)
        friend2.destroy
        head :no_content
    end

    # decline friend requets
    def decline_friend_req
        request1 = Friend.find_by(sent_to_id: params[:sent_to_id], sent_by_id: params[:sent_by_id], status: false)
        request1.destroy
        request2 = Friend.find_by(sent_to_id: params[:sent_by_id], sent_by_id: params[:sent_to_id], status: false)
        request2.destroy
        head :no_content
    end


    private 

    def friends_params
        params.permit(:sent_by_id, :sent_to_id, :status, :request_sender)
    end 
    

    #   # Returns the new record created in notifications table
    # def new_notification(user, notice_id, notice_type)
    #     notice = user.notifications.build(notice_id: notice_id,   
    #     notice_type: notice_type)
    #     user.notice_seen = false
    #     user.save
    #     notice
    # end
    
    # # Receives the notification object as parameter along with a type
    # # and returns a User record, Post record or a Comment record
    # # depending on the type supplied 
    # def notification_find(notice, type)
    #     return User.find(notice.notice_id) if type == 'friendRequest'
    #     return Joke.find(notice.notice_id) if type == 'comment'
    #     return Joke.find(notice.notice_id) if type == 'favorite'
    #     return unless type == 'favorite'
    #     comment = Comment.find(notice.notice_id)
    #     Joke.find(comment.post_id)
    # end

    # # Favorite helper
    # def favorited?(subject, type)
    #     result = false
    #     result = favorite.where(user_id: current_user.id, joke_id: subject.id).exists? if type == 'joke'
    #     result = favorite.where(user_id: current_user.id, comment_id: subject.id).exists? if type == 'comment'
    #     result
    # end


    # def create
    #     return if current_user.id == params[:user_id] # Disallow the ability to send yourself a friend request
    #     # Disallow the ability to send friend request more than once to same person
    #     return if friend_request_sent?(User.find(params[:user_id]))
    #     # Disallow the ability to send friend request to someone who already sent you one
    #     return if friend_request_recieved?(User.find(params[:user_id]))

    #     @user = User.find(params[:user_id])
    #     @friend = current_user.friend_sent.build(sent_to_id: params[:user_id])
    #     if @friend.save
    #     flash[:success] = 'Friend Request Sent!'
    #     @notification = new_notification(@user, @current_user.id, 'friendRequest')
    #     @notification.save
    #     else
    #     flash[:danger] = 'Friend Request Failed!'
    #     end
    #     redirect_back(fallback_location: root_path)
    # end

    # def accept_friend
    #     @friend = Friend.find_by(sent_by_id: params[:user_id], sent_to_id: current_user.id, status: false)
    #     return unless @friend # return if no record is found

    #     @friend.status = true
    #     if @friend.save
    #     flash[:success] = 'Friend Request Accepted!'
    #     @friend2 = current_user.friend_sent.build(sent_to_id: params[:user_id], status: true)
    #     @friend2.save
    #     else
    #     flash[:danger] = 'Friend Request could not be accepted!'
    #     end
    #     redirect_back(fallback_location: root_path)
    # end

    # def decline_friend
    #     @friend = Friend.find_by(sent_by_id: params[:user_id], sent_to_id: current_user.id, status: false)
    #     return unless @friend # return if no record is found

    #     @friend.destroy
    #     flash[:success] = 'Friend Request Declined!'
    #     redirect_back(fallback_location: root_path)
    # end
end
