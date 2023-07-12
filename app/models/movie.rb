class Movie < ApplicationRecord
    belongs_to :list
    belongs_to :review
end
