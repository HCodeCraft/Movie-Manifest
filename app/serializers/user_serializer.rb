class UserSerializer < ActiveModel::Serializer
  attributes :id, :username
  has_many :movies
  has_many :reviews
end
