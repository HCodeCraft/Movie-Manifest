class ReviewsController < ApplicationController

    def index
        reviews = Review.all
        render json: reviews
    end

    def create
        user = find_user
        newreview = user.reviews.create(review_params)
        if newreview.save
            render json: newreview
        else  
            render json: { errors: newreview.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        user = find_user
        review = user.reviews.find_by(id: params[:id])
        review.update(review_params)
        if review.save
            render json: review
        else
            render json: { errors: review.errors.full_messages}, status: :unprocessable_entity
        end
    end

    private

    def find_user
        User.find_by(id: params[:user_id])
    end

    def review_params
        params.permit(:reviewtext, :watched, :rating)
    end


end
