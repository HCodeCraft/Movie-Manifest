class ChangeTypeOfReviews < ActiveRecord::Migration[6.1]
  def change
    change_column :reviews, :review, :string
  end
end
