class ReviewSerializer < ActiveModel::Serializer
  attributes :review, :watched, :rating
  has_many :movies
end
