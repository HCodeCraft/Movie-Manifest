class Review < ApplicationRecord
   belongs_to :user
   belongs_to :movie

   validates :review, length: { minimum: 25 }
   validates :rating, length: { in: 0..5}


   def username
     self.user.username 
   end
end
