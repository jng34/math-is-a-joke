class CreateFriendRequests < ActiveRecord::Migration[6.1]
  def change
    create_table :friend_requests do |t|
      t.integer :sent_by_id
      t.integer :sent_to_id
      t.boolean :status

      t.timestamps
    end
  end
end
