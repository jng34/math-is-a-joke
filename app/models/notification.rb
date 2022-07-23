class Notification < ApplicationRecord
    belongs_to :user
    scope :friend_requests, -> { where('notice_type = friendRequest') }
    scope :favorites, -> { where('notice_type = favorite') }
    scope :comments, -> { where('notice_type = comment') }
end
