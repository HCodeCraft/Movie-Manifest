class CreateMovies < ActiveRecord::Migration[6.1]
  def change
    create_table :movies do |t|
      t.string :title
      t.string :image_url
      t.string :genres
      t.string :description
      t.integer :runtime
      t.string :link
      t.integer :list_id
      t.integer :review_id
      t.timestamps
    end
  end
end
