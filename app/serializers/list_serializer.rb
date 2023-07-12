class ListSerializer < ActiveModel::Serializer
  attributes :title, :description, :image_url
  has_many :movies
end
