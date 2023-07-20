class ReviewsController < ApplicationController

    def index
        reviews = Review.all
        render json: reviews
    end

    def create
        user = User.find_by(id: params[:user_id])
        newreview = user.reviews.create(review_params)
        if newreview.save
            render json: newreview
        else  
            render json: { errors: newreview.errors.full_messages}, status: :unprocessable_entity
        end
    end

    private

    def review_params
        params.permit(:reviewtext, :watched, :rating)
    end


end
