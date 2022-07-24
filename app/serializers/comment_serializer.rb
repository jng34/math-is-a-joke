class CommentSerializer < ActiveModel::Serializer
  attributes :id, :post, :user_id
end
