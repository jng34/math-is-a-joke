class Api::FriendsController < ApplicationController
    skip_before_action :authenticate_user
    # only: [:render_made_friends, :render_not_friends, :create, :index, :update_friend_req,
    # :delete_friend, :decline_friend_req, :sent_requests, :received_requests]

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
        
    end 


    def update_friend_req
        friendship1 = Friend.find_by(sent_to_id: params[:sent_by_id], sent_by_id: params[:sent_to_id], status: false);
        friendship1.update!(status: params[:status])
        friendship2 = Friend.find_by(sent_to_id: params[:sent_to_id], sent_by_id: params[:sent_by_id], status: false);
        friendship2.update!(status: params[:status])
        
        render json: Friend.all, status: :ok
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
    
end
