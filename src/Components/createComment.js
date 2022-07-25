import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
const _ = require("lodash");

function Createcomment({ comments, setComment, userId, postId }) {
  const [content, setContent] = useState("");
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [commentId, setCommentId] = useState(1);

  useEffect(() => {
    if (!_.isEmpty(comments)) {
      setCommentId(comments[comments.length - 1].id + 1);
    }
  }, []);

  function submit(event) {
    event.preventDefault();
    if (content.length > 0) {
      const newComment = {
        postId: postId,
        id: commentId,
        name: user.name,
        email: user.email,
        body: content,
        userId,
      };

      const updatedComments = [...comments];
      updatedComments.push(newComment);
      setComment(updatedComments);
      localStorage.setItem(
        "comments" + postId,
        JSON.stringify(updatedComments)
      );
      setContent("");
    } else {
      alert("Comment can't be empty");
    }
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
