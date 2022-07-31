class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true, uniqueness: true
    validates :email, presence: true
    validates :password, presence: true, on: :create

    has_many :jokes
    has_many :favorites
    # has_many :comments, dependent: :destroy
    # has_many :notifications, dependent: :destroy

    has_many :friendee_friends, foreign_key: 'sent_by_id', class_name: 'Friend'
    has_many :made_friends, -> { merge(Friend.made_friends) }, through: :friendee_friends, source: :sent_to

    has_many :friender_friends, foreign_key: 'sent_to_id', class_name: 'Friend'
    has_many :pending_friends, -> { merge(Friend.not_friends) }, through: :friender_friends, source: :sent_by
    
    
    #new
    has_many :senders, foreign_key: 'sent_by_id', class_name: 'Friend'
    has_many :sent_reqs, -> { merge(Friend.sent_reqs) }, through: :senders, source: :sent_to
    
    has_many :receivers, foreign_key: 'sent_to_id', class_name: 'Friend'
    has_many :received_reqs, -> { merge(Friend.received_reqs) }, through: :receivers, source: :sent_by


    #Password validations
    # validate :password_lower_case
    # validate :password_uppercase
    # validate :password_special_char
    # validate :password_contains_number

    #Password Validation Methods
    # def password_uppercase
    #   return if !!password.match(/\p{Upper}/)
    #   errors.add :password, ' must contain at least 1 uppercase '
    # end
  
    # def password_lower_case
    #   return if !!password.match(/\p{Lower}/)
    #   errors.add :password, ' must contain at least 1 lowercase '
    # end
  
    # def password_special_char
    #   special = "?<>',?[]}{=-)(*&^%$#`~{}!"
    #   regex = /[#{special.gsub(/./){|char| "\\#{char}"}}]/
    #   return if password =~ regex
    #   errors.add :password, ' must contain special character'
    # end
  
    # def password_contains_number
    #   return if password.count("0-9") > 0
    #   errors.add :password, ' must contain at least one number'
    # end
  
end