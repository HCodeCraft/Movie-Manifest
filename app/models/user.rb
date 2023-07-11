class User < ApplicationRecord
    has_many :movie_lists
    has_many :movies, through :movie_lists
end
