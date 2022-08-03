class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :profile_img, :email, :problems_solved, :score
  has_many :favorites
  has_many :made_friends
  has_many :pending_friends
  has_many :sent_reqs
  has_many :received_reqs
  has_many :jokes
  has_many :notifications

  
  # def accepted_friends
  #   object.made_friends
  # end
  
  # def pending_friends
  #   object.friend_requests
  # end

  # def sent_reqs_to
  #   object.sent_reqs
  # end
  
  # def received_reqs_from
  #   object.received_reqs
  # end


end
