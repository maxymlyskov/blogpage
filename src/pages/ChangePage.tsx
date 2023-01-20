import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useChangeCurrentPostMutation } from "../store/posts/postsApi";

function ChangePage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState(state.title);
  const [body, setBody] = useState(state.body);
  const [trigger, setTrigger] = useState(false);
  const [changePost, response] = useChangeCurrentPostMutation();

  const handleChange = async () => {
    try {
      await changePost({
        id: state.id,
        title: title,
        body: body,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
    console.log(response);

    navigate("/");
  };

  return (
    <main className="container change">
      <section className="blog-item blog-item-details__top blog-item-change">
        <div className="change__top">
          <input
            className="input__title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setTrigger(true);
            }}
          />
          {trigger && (
            <button onClick={handleChange} className="btn--change">
              Change
            </button>
          )}
        </div>
        <textarea
          className="input__body"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
            setTrigger(true);
          }}
        />
      </section>
    </main>
  );
}

export default ChangePage;
