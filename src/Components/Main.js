import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/mainStyle.css";
import CreatePost from "./createPost";
import Logout from "./logout";
const Main = () => {
  //Following block of code is related to React hooks like useaState and useEffect etc
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const posts = localStorage.getItem("posts");
    if (posts === null || posts === undefined) {
      fetch(process.env.REACT_APP_POSTS_API)
        .then((response) => response.json())
        .then(
          (data) => {
            setPosts(data);
            localStorage.setItem("posts", JSON.stringify(data));
          },
          (error) => {
            console.error(error);
          }
        )
        .catch((error) => {
          console.log(error);
        });
    } else {
      setPosts(JSON.parse(posts));
    }
  }, []);

  //variables
  const user = JSON.parse(localStorage.getItem("currentUser"));
  let userID = null;
  if (user !== null) {
    userID = user.Id;
  }

  //functions
  function deletePost(postId) {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  }

  return (
    <>
      <div className="main">
        <div className="name-div">
          <h1>All Posts</h1>
          <Logout userID={userID} />
        </div>

        {userID === null ? null : (
          <CreatePost post={posts} setPost={setPosts} userId={userID} />
        )}

        {posts?.map((post) => (
          <div key={post.id} className="post">
            <p className="title">Title</p>
            <p>
              <i>{post.title}</i>
            </p>
            <p className="content">{post.body}</p>
            <p className="text-detail">
              <i>
                (This post#{post.id} was made by Author: {post.userId})
              </i>
            </p>

            {post.userId !== userID ? null : (
              <div className="buttons">
                <button className="update-btn common-btn">
                  <Link
                    className="update-link"
                    to={"/Post/" + post.id + "/edit"}
                    state={{ post: post, posts: posts }}
                  >
                    {" "}
                    UPDATE
                  </Link>
                </button>

                <button
                  className="delete-btn common-btn"
                  onClick={() => deletePost(post.id)}
                >
                  DELETE
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Main;
