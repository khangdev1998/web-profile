import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPostBySlug } from "../services/api";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ArticleDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await fetchPostBySlug(slug);
        setPost(data.data[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error loading post:", error);
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  console.log(post);

  const components = {
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <div style={{ position: "relative" }}>
          <CopyToClipboard text={String(children).replace(/\n$/, "")}>
            <button className="absolute top-2 right-2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:border-gray-600 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border">
              <span id="default-message" className="inline-flex items-center">
                <svg
                  className="w-3 h-3 me-1.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                </svg>
                <span className="text-xs font-semibold">Copy</span>
              </span>
            </button>
          </CopyToClipboard>
          <SyntaxHighlighter
            style={dracula}
            showLineNumbers
            language={match[1]}
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  if (loading) return <div>Loading...</div>;
  if (!post)
    return (
      <div className="my-32 container text-red-500 text-2xl">
        Post not found
      </div>
    );

  return (
    <div className="my-32 max-w-screen-lg mx-auto p-6">
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
        <h2 className="text-[38px] font-bold dark:text-white leading-[1.2]">
          {post.title}
        </h2>
        <div className="flex items-center gap-x-5">
          <a
            className="inline-flex items-center gap-1.5 py-1 px-3 sm:py-2 sm:px-4 rounded-full text-xs sm:text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
            href="#"
          >
            {post.category?.name || "Uncategorized"}
          </a>
          <p className="text-xs sm:text-sm text-gray-800 dark:text-neutral-200">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
      <ReactMarkdown rehypePlugins={[rehypeRaw]} components={components}>
        {post.content}
      </ReactMarkdown>
    </div>
  );
};

export default ArticleDetail;
