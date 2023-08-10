
class MoviesController < ApplicationController
    before_action :authorize


    def index
        render json: Movie.all
      end


# def create
#     movie = @current_user.movies.create!(movie_params)
#     render json: movie, status: :created
# end
def create
    movie = Movie.create!(movie_params)
    
    if params[:reviews_attributes]
      params[:reviews_attributes].each do |review_attributes|
        review = movie.reviews.create!(review_attributes.merge(user_id: @current_user.id))
      end
    end
  
    render json: movie, status: :created
  end

#   I think the blank review is being created by the current_user.movies.create! that creates a blank review because user had movies through reviews
  


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




def movie_params
    params.require(:movie).permit(:title, :image_url, :description, :runtime, :link, :genres, reviews_attributes: [:reviewtext, :watched, :rating, :movie_id] )
  end
  



end
