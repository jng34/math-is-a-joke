class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :profile_img, :email, :score
  has_many :jokes
  has_many :favorites
  # has_many :friends
end
