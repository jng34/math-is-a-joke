class FriendSerializer < ActiveModel::Serializer
  attributes :id, :sent_by_id, :sent_to_id, :status, :friendJokesList
  # has_many :jokes
  def friendJokesList
    if object.status == true
      User.find(object.sent_to_id).jokes
    end
  end

end
