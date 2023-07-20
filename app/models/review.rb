class Review < ApplicationRecord
   belongs_to :user
   belongs_to :movie



   def username
     self.user.username 
   end


end
