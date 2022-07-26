class Friend < ApplicationRecord
    belongs_to :sent_to, class_name: 'User', foreign_key: 'sent_to_id' 
    belongs_to :sent_by, class_name: 'User', foreign_key: 'sent_by_id'
    scope :made_friends, -> { where('status =?', true) }
    scope :not_friends, -> { where('status =?', false) }

    validates :sent_by_id, presence: true, uniqueness: { scope: :sent_to_id }
    validates :sent_to_id, presence: true, uniqueness: { scope: :sent_by_id }
    validate :cannot_friend_yourself

    def cannot_friend_yourself
        errors.add(:sent_to_id, message:"You cannot friend yourself!") if sent_by_id == sent_to_id
    end

    def cannot_friend_sender
        errors.add(:sent_to_id, message:"Pending request already") if Friend.where(sent_by_id)
    end
    
end
