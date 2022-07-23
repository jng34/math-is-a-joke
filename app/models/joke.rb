class Joke < ApplicationRecord
    belongs_to :user
    has_many :comments, dependent: :destroy
    has_many :favorites, dependent: :destroy

    validates :setup, presence: true
    validates :punchline, presence: true
end
