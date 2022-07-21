import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/mainStyle.css";
import CreatePost from "./createPost";
const Main = () => {
  //Hooks
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    debugger;
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
    const updatePosts = posts.filter((p) => p.id !== postId);
    setPosts(updatePosts);
    localStorage.setItem("posts", JSON.stringify(updatePosts));
  }
  function logOut() {
    localStorage.removeItem("currentUser");
    navigate("/");
  }
  return (
    <>
      <div className="main">
        <div className="name-div">
          <h1>All Posts</h1>
          {userID === null ? null : (
            <div>
              <button className="logout" type="submit" onClick={() => logOut()}>
                Log Out
              </button>
            </div>
          )}
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
                (This post#{post.id} was made by user#{post.userId})
              </i>
            </p>
            {post.userId !== userID ? null : (
              <div className="buttons">
                <button className="update btn">
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
                  className="delete btn"
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
