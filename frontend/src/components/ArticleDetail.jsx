import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPostBySlug } from "../services/api";
import { renderContent } from "../utils/renderContent";

const ArticleDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await fetchPostBySlug(slug);
        setPost(data.data[0]);
      } catch (error) {
        console.error("Error loading post:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="my-32 container mx-auto px-4 text-center">
        <h2 className="text-2xl text-red-500">Post not found</h2>
        <Link
          to="/"
          className="mt-4 inline-block text-blue-500 hover:text-blue-600"
        >
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="my-32 max-w-screen-lg mx-auto p-6">
      <div className="space-y-5 lg:space-y-8 mb-10">
        <Link
          to="/"
          className="inline-flex items-center gap-x-1.5 text-sm text-gray-600 decoration-2 hover:underline focus:outline-none focus:underline dark:text-blue-500"
        >
          <svg
            className="shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Blog
        </Link>
        <h1 className="text-[38px] font-bold dark:text-white leading-[1.2]">
          {post.title}
        </h1>
        <div className="flex items-center gap-x-5">
          <a
            className="inline-flex items-center gap-1.5 py-1 px-3 sm:py-2 sm:px-4 rounded-full text-xs sm:text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
            href="#"
          >
            {post.category?.name || "Uncategorized"}
          </a>
          <time className="text-xs sm:text-sm text-gray-800 dark:text-neutral-200">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </div>
      <div className="prose prose-lg dark:prose-invert prose-img:rounded-xl max-w-full prose-a:text-blue-500 prose-img:w-full hover:prose-a:text-blue-400 prose-code:text-lg">
        {renderContent(post.content)}
      </div>
    </article>
  );
};

export default ArticleDetail;
