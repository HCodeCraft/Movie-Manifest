class SessionsController < ApplicationController
  skip_before_action :authorize, only: :create

    # login
    def create
      user = find_user
      movies = user.movies
    
      if user && user.authenticate(params[:password])
        session[:user_id] = user.id
        render json: user, status: :created
      
      else
        render json: { error: "Invalid username or password" }, status: :unauthorized
      end
    end
    

    # logout
    def destroy
        session.clear
        head :no_content
    end

end
