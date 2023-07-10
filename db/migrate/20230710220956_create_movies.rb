class CreateMovies < ActiveRecord::Migration[6.1]
  def change
    create_table :movies do |t|
      t.string :title
      t.string :image_url
      t.string :genres
      t.string :description
      t.string :review
      t.boolean :watched
      t.integer :rating
      t.integer :runtime

      t.timestamps
    end
  end
end
