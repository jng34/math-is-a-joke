class Api::NotificationsController < ApplicationController
    skip_before_action :authenticate_user, only: [:index, :create, :show_user_notifications]

    def index
        render json: Notification.all
    end

    def show_user_notifications
        notices = Notification.where(user_id: params[:id])
        render json: notices
    end

    def create 
        notice = Notification.create!(notice_params)
        render json: notice, status: :created
    end

    def destroy
        notice = Notification.find(params[:id])
        notice.destroy
        head :no_content
    end

    private
    
    def notice_params   
        params.permit(:user_id, :sender_id, :notice_type, :message)
    end
end
