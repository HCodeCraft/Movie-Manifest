Rails.application.routes.draw do

    resources :reviews, only: [:index, :create]
    resources :movies, only: [:index, :show, :create]
    get 'movies/all', to: 'movies#all_movies_index'

    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
    post '/signup', to: 'users#create'
    get '/me', to: 'users#show'


  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
