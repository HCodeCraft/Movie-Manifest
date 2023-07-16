class MoviesController < ApplicationController
    before_action :authorize


def index
    movies = current_user.movies
    render json: movies, include: :reviews
end


def create
    movie = current_user.movies.create(movie_params)
    if movie.valid? 
        render json: movie
    else
        render json: { errors: movie.errors.full_messages }, status: :unprocessable_entity
    end
end
end

# Showing all movies regardless if the user added it or not
def all_movies_index
    movies = Movie.all
    render json: movies, include: :reviews
end


def show
    movie = Movie.includes(:reviews).find_by(id: params[:id])
  
    if movie
      if movie.users.include?(current_user)
        render json: movie, include: :reviews
      else
        render json: movie
      end
    else
      render json: { error: "Movie not found" }, status: :not_found
    end
  end
  

def update

end

def destroy

end

private

def current_user
    user = User.find_by(id: session[:user_id])
end

def movie_params
    params.permit(:title, :image_url, :genres, :description, :runtime, :link)
end

def authorize
    return render json: {error: "Not authorized"}, status: :unauthorized unless session.include? :user_id
end


end
