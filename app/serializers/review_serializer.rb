class ReviewSerializer < ActiveModel::Serializer
  attributes :reviewtext, :watched, :rating, :movie_id, :username, :stars, :id, :user_id, :created_at
  #maybe need to not include user id?
  belongs_to :user
  belongs_to :movie
  # has_one :user

  def stars
    rating = object.rating.to_i
    positive_stars = [rating, 0].max
    negative_stars = [5 - rating, 0].max
  
    "#{ '★' * positive_stars }#{ '☆' * negative_stars }"
  end
#   ^ Means that the review has a single associated user that will be included
# when the Review is serialized

# def create_date
#   created_at = object.created_at
#   date_time = DateTime.parse(created_at)

# # Format the DateTime object in the desired format
# formatted_date = date_time.strftime("%B %e, %Y, %l:%M:%S %p")
# end

end
