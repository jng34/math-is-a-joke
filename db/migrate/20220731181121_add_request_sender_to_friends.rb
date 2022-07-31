class AddRequestSenderToFriends < ActiveRecord::Migration[6.1]
  def change
    add_column :friends, :request_sender, :boolean, default: true
  end
end
