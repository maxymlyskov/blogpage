import { useNavigate } from "react-router-dom";
import { useDeletePostMutation } from "../store/posts/postsApi";

interface BlogItemProps {
  id: string;
  title: string;
  body: string;
}

function BlogItem({ id, title, body }: BlogItemProps) {
  const navigate = useNavigate();
  const [deletePost, response] = useDeletePostMutation();

  const handleDelete = async (id: string) => {
    await deletePost({ id: id }).unwrap();

    console.log(response);
  };

  return (
    <section
      onClick={() => navigate("/details/" + id, { state: id })}
      className="blog-item"
    >
      <div className="blog-item__top">
        <h3 className="blog-item__title">{title}</h3>
        <div className="blog-item__buttons">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/change/" + id, {
                state: { id: id, title: title, body: body },
              });
            }}
            className="btn--change"
          >
            Change
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(id);
            }}
            className="btn--change btn--delete"
          >
            Delete
          </button>
        </div>
      </div>
      <h4>{body}</h4>
    </section>
  );
}

export default BlogItem;
