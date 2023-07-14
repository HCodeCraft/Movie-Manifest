class ReviewsController < ApplicationController

    def index
        reviews = Review.all
        render json: reviews
    end

    # def create
    #     user = User.find_by(id: params[:user_id])
    #     user.movie_lists.new(movie_list_params)
    #     if movie_list.save
    #         render json: movie_list
    #     else  
    #         render json: { errors: movie_list.errors.full_messages}, status: :unprocessable_entity
    #     end
    # end

    private

    def review_params
        params.require(:review).permit(:review, :watched, :rating)
    end


end
