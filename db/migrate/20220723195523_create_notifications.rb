class CreateNotifications < ActiveRecord::Migration[6.1]
  def change
    create_table :notifications do |t|
      t.integer :notice_id
      t.string :notice_type
      t.integer :user_id

      t.timestamps
    end
  end
end
