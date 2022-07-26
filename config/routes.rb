Rails.application.routes.draw do
  namespace :api do
      root 'users#index'

      resources :users, only: [:index, :update, :destroy]
      resources :friends, only: [:create, :destroy]
      
      get '/friends/not_friends', to: 'friends#render_not_friends'
      get '/friends/made_friends', to: 'friends#render_made_friends'
      # resources :users, only: [:index, :update, :destroy] do
      #   resources :friends, only: [:create] do
      #     collection do
      #       get 'accept_friend'
      #       get 'decline_friend'
      #     end
      #   end
      # end

      resources :jokes, only: [:new, :index, :show, :create, :update, :destroy] do
        resources :favorites, only: [:create]
      end

      resources :comments, only: [:new, :create, :destroy]
      resources :favorites, only: [:show, :create, :destroy]

      get '/users/rankings', to: 'users#rankings_index'
      post '/signup', to: 'users#create'
      get '/me', to: 'users#show'

      post '/login', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'
  end
  
  # Routing logic: fallback requests for React Router.
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
