import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";
function EditComment() {
  const location = useLocation();
  const navigate = useNavigate();
  const comment = location.state.comment;
  const [content, setContent] = useState(comment.body);

  const comments = location.state.comments;
  const pid = location.state.pid;
  const userId = location.state.userId;

  function submit(event) {
    event.preventDefault();
    if (content.length > 0) {
      const index = comments.findIndex((data) => data.id === comment.id);
      if (index !== -1) {
        comments[index].body = content;
      }
      localStorage.removeItem("comments" + pid);
      localStorage.setItem("comments" + pid, JSON.stringify(comments));
      alert("Comment Updated Successfully");
      navigate("/Post/" + pid, { state: { pid: pid, uid: userId } });
    } else {
      alert("Comment can't be Empty");
    }
  }
  return (
    <form onSubmit={submit} className="edit-form">
      <div className="form">
        <h3>Edit your Comment</h3>
        <input
          className="title-input"
          type="text"
          placeholder="Enter Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button variant="contained" type="submit">
          Update
        </Button>
      </div>
    </form>
  );
}

export default EditComment;
