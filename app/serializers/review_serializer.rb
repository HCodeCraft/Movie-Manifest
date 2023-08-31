class ReviewSerializer < ActiveModel::Serializer
  attributes :reviewtext, :watched, :rating, :movie_id, :username, :stars, :id, :user_id, :create_date
  belongs_to :user
  belongs_to :movie

  def stars
    rating = object.rating.to_i
    positive_stars = [rating, 0].max
    negative_stars = [5 - rating, 0].max

    "#{"★" * positive_stars}#{"☆" * negative_stars}"
  end

  def create_date
    created_at = object.created_at
    formatted_time = created_at.strftime("%B %d, %Y, %I:%M %p")
  end
end
