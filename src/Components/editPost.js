import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/mainStyle.css";

function Editpost() {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state.post;
  const posts = location.state.posts;
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.body);

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
      const index = posts.findIndex((data) => data.id === post.id);
      posts[index].title = title;
      posts[index].body = content;
      localStorage.removeItem("posts");
      localStorage.setItem("posts", JSON.stringify(posts));
      alert("Post Updated Successfully");
      navigate("/posts");
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
    <form onSubmit={submit} className="edit-form">
      <div className="form">
        <h2>Update Yout Post</h2>
        <input
          className="title-input"
          type="text"
          placeholder="Enter Title"
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
          Update
        </Button>
      </div>
    </form>
  );
}

export default Editpost;
