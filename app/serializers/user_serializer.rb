class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :profile_img, :email, :score, :made_friends, :not_friends
  has_many :jokes
  has_many :favorites
  # has_many :friends
  # has_many :made_friends
  # has_many :not_friends
  def made_friends
    object.friendees
  end

  def not_friends
    object.frienders
  end

end
