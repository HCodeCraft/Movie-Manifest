class MovieSerializer < ActiveModel::Serializer
  attributes :title, :image_url, :genres, :description, :runtime, :link, :short_description, :id, :hours_and_min
  has_many :users


def short_description
  "#{object.description[0..200]}..."
end

def hours_and_min
  hours = object.runtime / 60
  hours_truncated = hours.to_i
  extramin = object.runtime % 60

  "#{hours_truncated} #{hours_truncated > 1 ? 'hrs' : 'hr'} #{extramin > 1 ? extramin : nil} min"
end




end
