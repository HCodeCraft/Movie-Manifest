class Review < ApplicationRecord
   belongs_to :user
   belongs_to :movie

validates :reviewtext, presence: true, allow_blank: true
validates :rating, presence: true, allow_blank: true

   def username
     self.user.username 
   end


end
