class FriendSerializer < ActiveModel::Serializer
  attributes :id, :sent_by_id, :sent_to_id, :status, :request_sender, :friendJokesList
  belongs_to :sent_by
  belongs_to :sent_to


  def friendJokesList
    if object.status == true
      User.find(object.sent_to_id).jokes
    end
  end

end
