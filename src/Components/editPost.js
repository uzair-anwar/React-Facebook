import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/mainStyle.css";

function Editpost() {
  const loc = useLocation();
  const navigate = useNavigate();
  const post = loc.state.post;
  const posts = loc.state.posts;
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.body);

  function submit(event) {
    event.preventDefault();
    const index = posts.findIndex((data) => data.id === post.id);
    posts[index].title = title;
    posts[index].body = content;
    localStorage.removeItem("posts");
    localStorage.setItem("posts", JSON.stringify(posts));
    alert(title + content);
    navigate("/main");
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
