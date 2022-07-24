class Api::FriendsController < ApplicationController
    include ApplicationHelper

      # Returns the new record created in notifications table
    def new_notification(user, notice_id, notice_type)
        notice = user.notifications.build(notice_id: notice_id,   
        notice_type: notice_type)
        user.notice_seen = false
        user.save
        notice
    end
    
    # Receives the notification object as parameter along with a type
    # and returns a User record, Post record or a Comment record
    # depending on the type supplied 
    def notification_find(notice, type)
        return User.find(notice.notice_id) if type == 'friendRequest'
        return Joke.find(notice.notice_id) if type == 'comment'
        return Joke.find(notice.notice_id) if type == 'favorite'
        return unless type == 'favorite'
        comment = Comment.find(notice.notice_id)
        Joke.find(comment.post_id)
    end

    # Favorite helper
    def favorited?(subject, type)
        result = false
        result = favorite.where(user_id: current_user.id, joke_id: subject.id).exists? if type == 'joke'
        result = favorite.where(user_id: current_user.id, comment_id: subject.id).exists? if type == 'comment'
        result
    end


    def create
        return if current_user.id == params[:user_id] # Disallow the ability to send yourself a friend request
        # Disallow the ability to send friend request more than once to same person
        return if friend_request_sent?(User.find(params[:user_id]))
        # Disallow the ability to send friend request to someone who already sent you one
        return if friend_request_recieved?(User.find(params[:user_id]))

        @user = User.find(params[:user_id])
        @friend = current_user.friend_sent.build(sent_to_id: params[:user_id])
        if @friend.save
        flash[:success] = 'Friend Request Sent!'
        @notification = new_notification(@user, @current_user.id, 'friendRequest')
        @notification.save
        else
        flash[:danger] = 'Friend Request Failed!'
        end
        redirect_back(fallback_location: root_path)
    end

    def accept_friend
        @friend = Friend.find_by(sent_by_id: params[:user_id], sent_to_id: current_user.id, status: false)
        return unless @friend # return if no record is found

        @friend.status = true
        if @friend.save
        flash[:success] = 'Friend Request Accepted!'
        @friend2 = current_user.friend_sent.build(sent_to_id: params[:user_id], status: true)
        @friend2.save
        else
        flash[:danger] = 'Friend Request could not be accepted!'
        end
        redirect_back(fallback_location: root_path)
    end

    def decline_friend
        @friend = Friend.find_by(sent_by_id: params[:user_id], sent_to_id: current_user.id, status: false)
        return unless @friend # return if no record is found

        @friend.destroy
        flash[:success] = 'Friend Request Declined!'
        redirect_back(fallback_location: root_path)
    end
end