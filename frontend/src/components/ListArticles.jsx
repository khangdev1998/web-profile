import { useEffect, useState } from "react";
import Card from "./Card";
import { fetchPosts } from "../services/api";

const ListArticles = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading posts:", error);
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  console.log(posts[0]?.cover.url);
  if (loading) return <div>Loading...</div>;

  return (
    <div className="container grid grid-cols-4 gap-y-10 gap-x-6 mt-[120px] mb-16">
      {posts.map((item) => (
        <Card
          key={item.id}
          title={item.title}
          image={item.cover?.url}
          desc={item.description}
          path={item.slug}
        />
      ))}
    </div>
  );
};

export default ListArticles;
