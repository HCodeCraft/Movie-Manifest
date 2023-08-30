class User < ApplicationRecord
  has_many :reviews
  has_many :movies, -> { distinct }, through: :reviews
  has_secure_password

  validates :username, presence: true, uniqueness: true
  validates :password, presence: true
  validates :password_confirmation, presence: true
end
