class Review < ApplicationRecord
    has_many :movies
    has_many :lists, through: :movies


end
