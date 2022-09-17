class Notification < ApplicationRecord
    belongs_to :user

    validates :user_id, presence: true
    validates :sender_id, presence: true
    validates :notice_type, presence: true, inclusion: { in: %w(favorite score friend_request),
    message: "is not a valid type." }
    validates :message, presence: true, length: { in: 1..200 }
end
