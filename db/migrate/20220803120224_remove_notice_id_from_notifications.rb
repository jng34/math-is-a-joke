class RemoveNoticeIdFromNotifications < ActiveRecord::Migration[6.1]
  def change
    remove_column :notifications, :notice_id
  end
end
