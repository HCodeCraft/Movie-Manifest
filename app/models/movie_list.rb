class MovieList < ApplicationRecord
    belongs_to :user
    has_many :movies, dependent: :destroy


end
