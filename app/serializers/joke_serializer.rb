class JokeSerializer < ActiveModel::Serializer
  attributes :id, :setup, :punchline, :likes, :user_id
end
