Rails.application.routes.draw do
  namespace :api do
      root 'users#index'

      resources :friends, only: [:index, :create]
      get '/friends/not_friends', to: 'friends#render_not_friends'
      get '/friends/made_friends', to: 'friends#render_made_friends'
      get '/friends/sent_requests/:id', to: 'friends#sent_requests'
      get '/friends/received_requests/:id', to: 'friends#received_requests'
      patch 'friends/accept_friend', to: 'friends#update_friend_req'
      delete '/friends/delete_friend', to: 'friends#delete_friend'
      delete '/friends/decline_friend_req', to: 'friends#decline_friend_req'

      resources :jokes
      resources :comments, only: [:new, :create, :destroy]
      resources :favorites, only: [:show, :create, :destroy]
      
      resources :users, only: [:index, :update, :destroy]
      get '/users/rankings', to: 'users#rankings_index'
      post '/signup', to: 'users#create'
      get '/me', to: 'users#show'
      get '/users/:id', to: 'users#show_user'

      post '/login', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'
      # resources :users, only: [:index, :update, :destroy] do
      #   resources :friends, only: [:create] do
      #     collection do
      #       get 'accept_friend'
      #       get 'decline_friend'
      #     end
      #   end
      # end

      # resources :jokes, only: [:new, :index, :show, :create, :update, :destroy] do
      #   resources :favorites, only: [:create]
      # end
      
  end
  
  # Routing logic: fallback requests for React Router.
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
