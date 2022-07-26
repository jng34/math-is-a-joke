class FriendSerializer < ActiveModel::Serializer
  attributes :id, :sent_by_id, :sent_to_id, :status
end
