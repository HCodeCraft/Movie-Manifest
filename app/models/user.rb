class User < ApplicationRecord
    has_many :reviews
    has_many :movies, through: :reviews
    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :password, presence: true
end
