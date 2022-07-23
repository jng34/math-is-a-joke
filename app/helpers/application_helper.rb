module ApplicationHelper 
  # Returns the new record created in notifications table
  def new_notification(user, notice_id, notice_type)
    notice = user.notifications.build(notice_id: notice_id,   
    notice_type: notice_type)
    user.notice_seen = false
    user.save
    notice
  end
  
  # Receives the notification object as parameter along with a type
  # and returns a User record, Joke record or a Comment record
  # depending on the type supplied 
  def notification_find(notice, type)
    return User.find(notice.notice_id) if type == 'friendRequest'
    return Joke.find(notice.notice_id) if type == 'comment'
    return Joke.find(notice.notice_id) if type == 'favorite'
    return unless type == 'favorite'
    comment = Comment.find(notice.notice_id)
    Joke.find(comment.joke_id)
  end

 # Friends helper
  def friend_request_sent?(user)
    current_user.friend_sent.exists?(sent_to_id: user.id, status: false)
  end
  
  def friend_request_received?(user)
    current_user.friend_request.exists?(sent_by_id: user.id, status: false)
  end
  
  # Checks whether a user has had a friend request sent to them by the current user or 
  # if the current user has been sent a friend request by the user returning either true or false
  def possible_friend?(user)
    request_sent = current_user.friend_sent.exists?(sent_to_id: user.id)
    request_received = current_user.friend_request.exists?(sent_by_id: user.id)
    
    return true if request_sent != request_recieved    
    return true if request_sent == request_recieved && request_sent == true    
    return false if request_sent == request_recieved && request_sent == false
  end
end