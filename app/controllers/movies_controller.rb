class MoviesController < ApplicationController
    before_action :authorize


    def index
        movies = Movie.all
        render json: movies
      end


def create
    movie = current_user.movies.create(movie_params)
    if movie.valid? 
        render json: movie
    else
        render json: { errors: movie.errors.full_messages }, status: :unprocessable_entity
    end
end



def show
    movie = Movie.find_by(id: params[:id])
  
    if movie
        render json: movie
    else
      render json: { error: "Movie not found" }, status: :not_found
    end
  end
  

def update
    movie = find_movie
    movie.update(movie_params)
    render json: movie
end

def destroy
    movie = find_movie
    movie.destroy
    head :no_content
end

private

def find_movie
    Movie.find_by(id: params[:id])
end

def current_user
    user = User.find_by(id: session[:user_id])
end

def movie_params
    params.require(:movie).permit(:title, :image_url, :description, :runtime, :link, :genres)
  end
  
def authorize
    return render json: {error: "Not authorized"}, status: :unauthorized unless session.include? :user_id
end


end
