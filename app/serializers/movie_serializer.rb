class MovieSerializer < ActiveModel::Serializer
  attributes :title, :image_url, :genres, :description, :runtime, :link
  belongs_to :list
  belongs_to :review
end
