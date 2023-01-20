import BlogItem from "../components/BlogItem";
import { useGetPostsQuery } from "../store/posts/postsApi";

function MainPage() {
  const { data } = useGetPostsQuery();
  return (
    <main className="container main">
      {data?.map((post) => (
        <BlogItem
          key={post.id}
          title={post.title}
          body={post.body}
          id={post.id}
        />
      ))}
    </main>
  );
}

export default MainPage;
