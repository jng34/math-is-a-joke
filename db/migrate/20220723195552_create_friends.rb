class CreateFriends < ActiveRecord::Migration[6.1]
  def change
    create_table :friends do |t|
      t.references :sent_by, null: false, foreign_key: { to_table: :users }
      t.references :sent_to, null: false, foreign_key: { to_table: :users }
      t.boolean :status, default: false

      t.timestamps
    end
  end
end
