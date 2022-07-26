import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/mainStyle.css";
import CreatePost from "./createPost";
import Logout from "./logout";
const Main = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const posts = localStorage.getItem("posts");
    if (posts === null || posts === undefined) {
      fetch(process.env.REACT_APP_POSTS_API)
        .then((response) => response.json())
        .then(
          (data) => {
            //Data has many enteries (about 100 entries that make difficult in scrolling) soo I reduce data here
            data = data.filter((item) => item.id > 90);
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

  //varibale to store currentUser and userID varibale that store currentUser id
  const user = JSON.parse(localStorage.getItem("currentUser"));
  let userID = null;
  if (user !== null) {
    userID = user.Id;
  }

  //Function for deleting a post
  function deletePost(postId) {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    localStorage.removeItem("comments" + postId);
  }

  //Function for logging in
  function login() {
    navigate("/");
  }

  return (
    <>
      <div className="main">
        <div className="name-div">
          <h1>All Posts</h1>
          <div className="logout-section">
            {userID === null ? (
              <button className="logout" type="submit" onClick={() => login()}>
                Sign In
              </button>
            ) : null}
            <Logout userID={userID} />
          </div>
        </div>
        {userID === null ? null : (
          <CreatePost post={posts} setPost={setPosts} userId={userID} />
        )}

        {posts?.map((post) => (
          <div key={post.id} className="post">
            <p className="title">
              <i>{post.title}</i>
            </p>
            <p className="content">{post.body}</p>
            <Link
              to={"/Post/" + post.id}
              state={{ pid: post.id }}
              className="comment-link"
            >
              Show Comments...{" "}
            </Link>
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
