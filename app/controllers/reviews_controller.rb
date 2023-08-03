class ReviewsController < ApplicationController
    before_action :authorize

    def index
        reviews = Review.all
        render json: reviews
    end

    # create a method to make create and update more dry bc/ you're repeaing code
    def create
        newreview = @current_user.reviews.create!(review_params)
          render json: newreview
      end
      
      # I already have the user
      def update
        review = @current_user.reviews.find_by(id: params[:id])
        review.update(review_params)
            render json: review
      end

    private
      

    def review_params
        params.require(:review).permit(:reviewtext, :watched, :rating, :movie_id)
      end


end
