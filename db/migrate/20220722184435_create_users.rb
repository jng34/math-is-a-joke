class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :profile_img
      t.string :email
      t.string :password_digest
      t.integer :score, default: 0

      t.timestamps
    end
  end
end
