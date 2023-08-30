class MovieSerializer < ActiveModel::Serializer
  attributes :title, :image_url, :genres, :description, :runtime, :link, :short_description, :id, :hours_and_min
  has_many :reviews

  def short_description
    object.description.length < 200 ? object.description : "#{object.description[0..200]}..."
  end

  def hours_and_min
    hours = object.runtime / 60
    extramin = object.runtime % 60

    "#{hours > 0 ? "#{hours} #{hours > 1 ? "hrs" : "hr"}" : ""}#{hours > 0 && extramin > 0 ? " " : ""}#{extramin > 0 ? "#{extramin} min" : ""}"
  end
end
