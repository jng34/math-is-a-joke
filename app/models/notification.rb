class Notification < ApplicationRecord
    belongs_to :user
    # scope :friend_requests, -> { where('notice_type = friendRequest') }
    # scope :favorites, -> { where('notice_type = favorite') }
    # scope :comments, -> { where('notice_type = comment') }

    validates :user_id, presence: true
    validates :sender_id, presence: true
    validates :notice_type, presence: true, inclusion: { in: %w(favorite score friend_request),
    message: "is not a valid type." }
    validates :message, presence: true, length: { in: 1..200 }
end
