class Movie < ApplicationRecord
    has_many :reviews
    has_many :users, through: :reviews

    validates :title, presence: true, uniqueness: true
    validates :image_url, presence: true
    validates :genres, presence: true
    validates :description, length: { minimum: 10 }
    validates :runtime, length: { in: 1..999 }
end
