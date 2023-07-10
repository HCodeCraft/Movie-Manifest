class CreateMovieLists < ActiveRecord::Migration[6.1]
  def change
    create_table :movie_lists do |t|
      t.string :title
      t.string :image_url
      t.string :description
      t.string :genres
      t.integer :user_id
      t.integer :movie_id

      t.timestamps
    end
  end
end
