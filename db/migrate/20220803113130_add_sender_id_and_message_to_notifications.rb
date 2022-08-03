class AddSenderIdAndMessageToNotifications < ActiveRecord::Migration[6.1]
  def change
    add_column :notifications, :sender_id, :integer
    add_column :notifications, :message, :text
  end
end
