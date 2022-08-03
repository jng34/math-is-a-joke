import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


function Notifications({ user, noticeReRender, setNoticeReRender }) {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();


  useEffect(() => {
    fetch("/api/me")
      .then((r) => r.json())
      .then((data) => {
        console.log(data.notifications);
        setNotices(data.notifications);
      });
  }, [isLoading]);


  function handleDeleteNotice(id) {
    fetch(`/api/notifications/${id}`, { method: "DELETE" }).then((r) => {
      console.log(r);
      setIsLoading(!isLoading);
      setNoticeReRender(!noticeReRender);
    });
  }

  const renderNotices = user.username ? (
    notices.map((notice) => (
      <div key={notice.id} className="card border border-dark mt-3">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-12 col-md-11">
              <p className="row fs-3 text-start">👀 --- {notice.message}</p>
            </div>
            <div className="col-6 col-md-1 text-end">
              <button
                type="button"
                className="btn btn-sm border border-2 rounded-pill fs-2 border-dark"
                onClick={(id) => handleDeleteNotice(notice.id)}
              >
                X
              </button>
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <></>
  );

  if (!user.username) {
    history.push("/");
  }

  return (
    <div className="align-self-center text-center mt-4">
      <p className="fs-1">My Inbox</p>
      <div className="container text-start mt-5">{renderNotices}</div>
    </div>
  );
} 

export default Notifications;