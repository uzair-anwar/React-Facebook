import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";
function EditComment() {
  const loc = useLocation();
  const navigate = useNavigate();
  const comment = loc.state.comment;
  const comments = loc.state.comments;
  const [content, setContent] = useState(comment.body);
  const pid = loc.state.pid;
  const userId = loc.state.userId;

  function submit(event) {
    event.preventDefault();
    const index = comments.findIndex((data) => data.id === comment.id);
    if (index !== -1) {
      comments[index].body = content;
    }
    localStorage.removeItem("comments" + pid);
    localStorage.setItem("comments" + pid, JSON.stringify(comments));
    alert(content);
    navigate("/Post/" + pid, { state: { pid: pid, uid: userId } });
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
