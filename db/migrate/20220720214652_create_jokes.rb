class CreateJokes < ActiveRecord::Migration[6.1]
  def change
    create_table :jokes do |t|
      t.string :setup
      t.string :punchline
      t.string :difficulty
      t.integer :likes
      t.integer :math_problem_id
      t.integer :user_id

      t.timestamps
    end
  end
end
