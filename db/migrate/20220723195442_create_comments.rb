class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.text :post
      t.integer :user_id
      t.integer :joke_id

      t.timestamps
    end
  end
end

