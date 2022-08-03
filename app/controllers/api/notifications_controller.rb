class Api::NotificationsController < ApplicationController
    skip_before_action :authenticate_user, only: :create

    def index
        render json: Notification.all
    end

    def show
        render json: notice
    end

    def create 
        notice = Notification.create!(notice_params)
        render json: notice, status: :created
    end

    def destroy
        notice.delete
        head :no_content
    end

    private

    def notice
        Notification.find(params[:id])
    end
    
    def notice_params   
        params.permit(:user_id, :sender_id, :notice_type, :message)
    end
end
