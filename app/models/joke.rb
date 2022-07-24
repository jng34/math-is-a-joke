class Joke < ApplicationRecord
    belongs_to :user
    has_many :comments, dependent: :destroy
    has_many :favorites, dependent: :destroy

    validates :setup, presence: true, uniqueness: true
    validates :punchline, presence: true
end
