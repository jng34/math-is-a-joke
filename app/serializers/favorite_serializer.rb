class FavoriteSerializer < ActiveModel::Serializer
  attributes :id, :joke_id, :joke

  def joke
    object.joke
  end
  
end
