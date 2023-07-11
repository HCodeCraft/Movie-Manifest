Rails.application.routes.draw do
  resources :movie_lists, only: [:index, :create]
  resources :movies, only: [:index, :create]
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
