class SessionsController < ApplicationController
  skip_before_action :authorize, only: :create

    # login
    def create
      user = find_user
      if user && user.authenticate(params[:password])
        session[:user_id] = user.id
        render json: user.as_json(only: [:id, :username]) # Include only the necessary attributes
      else
        render json: { error: "Invalid username or password" }, status: :unauthorized
      end
    end
    
      

    # logout
    def destroy
        session.clear
        head :no_content
    end

    #The session hash is where the user is stored
end
