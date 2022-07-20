import React, { useState } from "react";
import { Button } from "@material-ui/core";
import "../css/mainStyle.css";
function CreatePost({ post, setPost }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const user = JSON.parse(localStorage.getItem("currentUser"));
  let postId = 1;
  let length = 0;
  let lastPost = null;
  if (post !== undefined) {
    length = post.length;
    lastPost = post[length - 1];
    if (lastPost !== undefined) {
      postId = lastPost.id + 1;
    }
  }

  function validate() {
    if (title.length > 0 && content.length > 0) return true;
    else return false;
  }

  function submit(event) {
    event.preventDefault();
    if (validate()) {
      const newPost = {
        id: postId,
        userId: user.Id,
        title: title,
        body: content,
      };
      const updatePosts = [...post];
      updatePosts.push(newPost);
      setPost(updatePosts);
      localStorage.setItem("posts", JSON.stringify(updatePosts));
      setTitle("");
      setContent("");
    } else {
      alert("Enter Values first");
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
      <Button sx={{ color: "white" }} variant="contained" type="submit">
        Create
      </Button>
    </form>
  );
}

export default CreatePost;
