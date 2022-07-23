class CreateFavorites < ActiveRecord::Migration[6.1]
  def change
    create_table :favorites do |t|
      t.integer :user_id, null: false
      t.integer :joke_id, null: true
      t.integer :comment_id, null: true

      t.timestamps
    end
  end
end
