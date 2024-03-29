class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.string :review
      t.boolean :watched
      t.integer :rating
      t.integer :user_id
      t.integer :movie_id
      t.timestamps
    end
  end
end
