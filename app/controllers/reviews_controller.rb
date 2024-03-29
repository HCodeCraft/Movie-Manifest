class ReviewsController < ApplicationController
  before_action :authorize

  def index
    reviews = Review.all
    render json: reviews
  end

  def create
    newreview = @current_user.reviews.create!(review_params)
    render json: newreview
  end

  def update
    review = find_review
    review.update(review_params)
    render json: review
  end

  def destroy
    review = find_review
    review.destroy
    head :no_content
  end

  private

  def find_review
    review = @current_user.reviews.find_by(id: params[:id])
  end

  def review_params
    params.require(:review).permit(:reviewtext, :watched, :rating, :movie_id)
  end

end
