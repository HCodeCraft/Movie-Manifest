class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create]

  def create
    user = User.create(user_params)
    if user.valid?
      session[:user_id] = user.id
      render json: user
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    if @current_user
    render json: @current_user
    else
        render json: {error: "You must be logged in to access"}
    end
  end

  private

  def user_params
    params.permit(:username, :password, :password_confirmation)
  end
end
