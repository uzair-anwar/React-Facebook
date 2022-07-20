import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Createcomment from "./createComment";
import "../css/mainStyle.css";

function Showpost() {
  const id = useParams();
  const tempPostId = Number(id.id);

  const tempUser = JSON.parse(localStorage.getItem("currentUser"));
  let tempID = null;
  if (tempUser !== null) {
    tempID = tempUser.Id;
  }
  const [uid] = useState(tempID);

  const [post] = useState(
    JSON.parse(localStorage.getItem("posts")).find(
      (post) => post.id === tempPostId
    )
  );

  const [comments, setComment] = useState([]);
  useEffect(() => {
    let loadedComments = localStorage.getItem("comments" + tempPostId);
    if (loadedComments === undefined || loadedComments === null) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${tempPostId}/comments`)
        .then((response) => response.json())
        .then(
          (data) => {
            loadedComments = data;
            setComment(data);
            localStorage.setItem("comments" + tempPostId, JSON.stringify(data));
          },
          (error) => {
            console.error(error);
          }
        );
    } else {
      setComment(JSON.parse(loadedComments));
    }
  }, []);

  function deleteComment(cid) {
    const updatedComments = comments.filter((c) => c.id !== cid);
    setComment(updatedComments);
    localStorage.setItem(
      "comments" + tempPostId,
      JSON.stringify(updatedComments)
    );
  }
  return (
    <div className="main">
      <div className="post main-post">
        <button className="update btn btn-back">
          <Link to="/main" state={{ userID: uid }} className="link">
            Back
          </Link>
        </button>
        <div className="post">
          <p className="title">Title</p>
          <p>
            <i>{post.title}</i>
          </p>
          <p className="content">{post.body}</p>
          <p className="text-detail">
            <i>
              (This post#{post.id} was made by user#{post.userId})
            </i>
          </p>
        </div>
        {uid === null ? null : (
          <Createcomment
            comments={comments}
            setComment={setComment}
            userId={uid}
            postId={tempPostId}
          />
        )}
        <div>
          <h2 className="all-comment">Comments</h2>
        </div>
        {comments?.map((comment) => (
          <div key={comment.id} className="post">
            <p className="comment">{comment.body}</p>
            <h4>Comment Detail :</h4>
            <p>
              <i>
                Made by "{comment.name}" - "{comment.email}"
              </i>
            </p>
            {comment.userId !== uid ? null : (
              <div className="buttons">
                <button className="update btn">
                  <Link
                    className="update-link"
                    to={"/Post/" + post.id + "/Comment/" + comment.id + "/edit"}
                    state={{
                      comment: comment,
                      comments: comments,
                      pid: post.id,
                      userId: post.userId,
                    }}
                  >
                    Update
                  </Link>
                </button>
                <button
                  onClick={() => deleteComment(comment.id)}
                  className="delete btn"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Showpost;
