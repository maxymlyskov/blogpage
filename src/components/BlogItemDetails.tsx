import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  useGetCurrentPostQuery,
  useAddCommentMutation,
} from "../store/posts/postsApi";

function BlogItemDetails() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const location = useLocation();

  const { data } = useGetCurrentPostQuery(location.state);

  const [addComment, response] = useAddCommentMutation();

  const handleAddComment = async () => {
    console.log(body);
    await addComment({
      postId: location.state,
      name: name,
      body: body,
      email: email,
    }).unwrap();

    console.log(response);
  };
  return (
    <section className="blog-item-details container">
      {data && (
        <div>
          <section className=" container blog-item blog-item-details__top">
            <h3 className="blog-item__title">{data.title}</h3>
            <h4>{data.body}</h4>
          </section>
          <section className="comments">
            <div>
              {data.comments.map((comment) => (
                <article key={comment.id} className="comment">
                  <div className="comment__name">
                    <h4>{comment.name}</h4>
                    <h5>{comment.email}</h5>
                  </div>
                  <h5>{comment.body}</h5>
                </article>
              ))}
            </div>
            <section className="comment-form">
              <input
                type="text"
                placeholder="Enter your name:"
                value={name}
                className="comment__name-input"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                value={email}
                placeholder="Enter your email:"
                className="comment__email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
                placeholder="Comment:"
                value={body}
                className="comment__body"
                onChange={(e) => setBody(e.target.value)}
              />
              <button
                disabled={body === "" && name === "" && email === ""}
                onClick={handleAddComment}
                className="btn--change"
              >
                Post comment
              </button>
            </section>
          </section>
        </div>
      )}
    </section>
  );
}

export default BlogItemDetails;
