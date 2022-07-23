class Comment < ApplicationRecord
    belongs_to :user
    belongs_to :joke
    # has_many :favorites, dependent: :destroy
end
