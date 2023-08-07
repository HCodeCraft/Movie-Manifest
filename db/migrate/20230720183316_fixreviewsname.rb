class Fixreviewsname < ActiveRecord::Migration[6.1]
  def change
    rename_column :reviews, :review, :reviewtext
  end
end
