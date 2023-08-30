class MovieSerializer < ActiveModel::Serializer
  attributes :title, :image_url, :genres, :description, :runtime, :link, :short_description, :id, :hours_and_min, :adv_review
  has_many :reviews

  def short_description
    object.description.length < 200 ? object.description : "#{object.description[0..200]}..."
  end

  def hours_and_min
    hours = object.runtime / 60
    hours_truncated = hours.to_i
    extramin = object.runtime % 60

    "#{hours_truncated > 0 ? "#{hours_truncated} #{hours_truncated > 1 ? "hrs" : "hr"}" : ""}#{hours_truncated > 0 && extramin > 0 ? " " : ""}#{extramin > 0 ? "#{extramin} min" : ""}"
  end
end
