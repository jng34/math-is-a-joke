class AddProblemsSolvedToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :problems_solved, :integer, default: 0
  end
end
