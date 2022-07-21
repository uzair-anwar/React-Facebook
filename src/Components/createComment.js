import React, { useState } from "react";
import { Button } from "@material-ui/core";

function Createcomment({ comments, setComment, userId, postId }) {
  const [content, setContent] = useState("");
  const user = JSON.parse(localStorage.getItem("currentUser"));
  let cid = 1;

  if (comments !== null && comments.length > 0) {
    cid = comments[comments.length - 1].id + 1;
  }

  function submit(event) {
    event.preventDefault();
    const newComment = {
      postId: postId,
      id: cid,
      name: user.name,
      email: user.email,
      body: content,
      userId,
    };
    const updatedComments = [...comments];
    updatedComments.push(newComment);
    setComment(updatedComments);
    localStorage.setItem("comments" + postId, JSON.stringify(updatedComments));
    setContent("");
  }
  return (
    <form onSubmit={submit} className="form">
      <h2>Create new Comment</h2>
      <input
        className="title-input"
        type="text"
        placeholder="Enter Comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button variant="contained" type="submit">
        Create
      </Button>
    </form>
  );
}
export default Createcomment;
