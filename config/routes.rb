Rails.application.routes.draw do
  namespace :api do
    resources :comments
    resources :favorites
    resources :friendrequests
    resources :jokes, only: [:index, :show]
    resources :notifications
    resources :users, only: [:index, :show, :update, :destroy]

    post '/signup', to: 'users#create'
    get '/me', to: 'users#show'

    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
  end
  
  # Routing logic: fallback requests for React Router.
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
