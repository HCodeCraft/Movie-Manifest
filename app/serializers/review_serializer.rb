class ReviewSerializer < ActiveModel::Serializer
  attributes :reviewtext, :watched, :rating, :movie_id, :username, :stars, :id
  belongs_to :users
  belongs_to :movies
  # has_one :user

  def stars
    rating = object.rating.to_i
    positive_stars = [rating, 0].max
    negative_stars = [5 - rating, 0].max
  
    "#{ '★' * positive_stars }#{ '☆' * negative_stars }"
  end
#   ^ Means that the review has a single associated user that will be included
# when the Review is serialized
end
