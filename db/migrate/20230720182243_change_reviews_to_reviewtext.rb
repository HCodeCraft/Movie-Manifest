class ChangeReviewsToReviewtext < ActiveRecord::Migration[6.1]
  def change
   change_column :reviews, :review, :reviewtext
  end
end
