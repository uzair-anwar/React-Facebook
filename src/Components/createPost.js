import React, { useState } from "react";
import { Button } from "@material-ui/core";
import "../css/mainStyle.css";
const _ = require("lodash");

function CreatePost({ post, setPost }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const user = JSON.parse(localStorage.getItem("currentUser"));
  let postId = 1;
  postId = Number(_.uniqueId("10"));

  function validate() {
    if (title.length <= 0) {
      return "title";
    } else if (content.length <= 0) {
      return "content";
    } else if (!isNaN(title)) {
      return "number";
    } else if (content.length < 20) {
      return "length";
    } else {
      return "validated";
    }
  }

  function submit(event) {
    event.preventDefault();
    const validationError = validate();
    if (validationError === "validated") {
      const newPost = {
        id: postId,
        userId: user.Id,
        title: title,
        body: content,
      };

      const updatePosts = [...post];
      updatePosts.unshift(newPost);
      setPost(updatePosts);
      localStorage.setItem("posts", JSON.stringify(updatePosts));
      setTitle("");
      setContent("");
    } else if (validationError === "title") {
      alert("Please enter a title");
    } else if (validationError === "content") {
      alert("Please enter the content");
    } else if (validationError === "number") {
      alert("Title should contain atleast one alphabet");
    } else if (validationError === "length") {
      alert("Content should be greate then 20 character");
    }
  }

  return (
    <form onSubmit={submit} className="form">
      <h2>Create new Post</h2>
      <input
        className="title-input"
        type="text"
        placeholder="Enter title here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="content-input"
        type="text"
        placeholder="Enter Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button variant="contained" type="submit">
        Create
      </Button>
    </form>
  );
}

export default CreatePost;
