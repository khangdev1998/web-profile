import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { BASE_BACKEND_URL } from "../utils/constants";

const Card = ({ title, image, desc, path }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link
        className="overflow-hidden group aspect-auto rounded-t-lg inline-block"
        to={path}
      >
        <img
          className="object-cover w-full h-full transition-all transform group-hover:scale-110 group-hover:opacity-80"
          src={`${BASE_BACKEND_URL}${image}`}
          alt="this-image"
        />
      </Link>
      <div className="flex flex-col p-5">
        <Link to={path}>
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white hover:text-blue-400 transition-colors line-clamp-2">
            {title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2">
          {desc}
        </p>
        <Link
          to={path}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-fit"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default Card;
