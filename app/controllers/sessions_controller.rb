class SessionsController < ApplicationController

    # login
    def create
        user = User.find_by(username: params[:username])
        if user && user.authenticate(params[:password])
          session[:user_id] = user.id
          render json: user
        else
          render json: { error: "Invalid username or password" }, status: :unauthorized
        end
      end
      

    # logout
    def destroy
        session.clear
    end

    #The session hash is where the user is stored
end
