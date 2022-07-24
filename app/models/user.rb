class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true, uniqueness: true
    validates :email, presence: true
    validates :password, presence: true, on: :create

    has_many :jokes
    has_many :comments, dependent: :destroy
    has_many :notifications, dependent: :destroy
    has_many :friend_sent, class_name: 'Friend', foreign_key: 'sent_by_id', inverse_of: 'sent_by', dependent: :destroy
    has_many :friend_request, class_name: 'Friend', foreign_key: 'sent_to_id', inverse_of: 'sent_to', dependent: :destroy
    has_many :friends, -> { merge(Friend.made_friends) }, through: :friend_sent, source: :sent_to
    has_many :pending_requests, -> { merge(Friend.not_friends) }, through: :friend_sent, source: :sent_to
    has_many :received_requests, -> { merge(Friend.not_friends) }, through: :friend_request, source: :sent_by

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