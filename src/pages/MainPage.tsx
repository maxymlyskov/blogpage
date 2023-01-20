import { useState } from "react";
import BlogItem from "../components/BlogItem";
import { useAddPostMutation, useGetPostsQuery } from "../store/posts/postsApi";

function MainPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { data } = useGetPostsQuery();
  const [addPost, response] = useAddPostMutation();

  const handleAdd = async () => {
    try {
      await addPost({
        title: title,
        body: body,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
    console.log(response);

    setTitle("");
    setBody("");
  };

  return (
    <main className="container main">
      <section className="blog-item blog-item-details__top blog-item-change post-container">
        <div className="change__top">
          <input
            className="input__title"
            type="text"
            placeholder="Post title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <button onClick={handleAdd} className="btn--change">
            Post
          </button>
        </div>
        <textarea
          className="input__body"
          placeholder="Post body"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
      </section>
      <div>
        {data?.map((post) => (
          <BlogItem
            key={post.id}
            title={post.title}
            body={post.body}
            id={post.id}
          />
        ))}
      </div>
    </main>
  );
}

export default MainPage;
