class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :profile_img, :email, :score, :made_friends, :not_friends
  has_many :favorites
  # has_many :friends
  has_many :jokes
  
  def friends
    object.made_friends
  end
  
  def not_friends
    object.friend_requests
  end


end
