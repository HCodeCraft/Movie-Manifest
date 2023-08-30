class MoviesController < ApplicationController
  before_action :authorize

  def index
    render json: Movie.all
  end

  def create
    movie = Movie.create!(movie_params)

    if params[:review_attributes]
      review_attributes = params[:review_attributes].merge(user_id: @current_user.id)
      review = movie.reviews.create!(review_attributes)
    end

    render json: movie, status: :created
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

  def movie_params
    params.require(:movie).permit(:title, :image_url, :description, :runtime, :link, :genres, :id, reviews_attributes: [:reviewtext, :watched, :rating, :movie_id])
  end
end
