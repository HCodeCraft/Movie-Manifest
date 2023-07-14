class ReviewSerializer < ActiveModel::Serializer
  attributes :review, :watched, :rating 
  has_many :movies
  has_one :user
#   ^ Means that the review has a single associated user that will be included
# when the Review is serialized
end
