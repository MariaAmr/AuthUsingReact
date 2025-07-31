import { Link } from "react-router-dom";
import { NoDataSvg } from "./no-data-svg";

const NotFoundPage = () => (
  <div className="flex min-h-screen items-center justify-center bg-white px-4">
    <div className=" flex flex-wrap flex-col items-center justify-between g-4 text-center">
      <div className="w-full">
        <NoDataSvg />
      </div>
      <div className="mt-6">
      <h4 className="mt-9 mb-6 font-medium text-gray-900">
        Sorry, we didn't find any match!
      </h4>

      </div>
       <div className="mt-6">
        <Link to="/login"
          className="inline-block rounded-md bg-gray-500 px-6 py-2 text-white no-underline transition hover:bg-gray-600"
        
        style={{ textDecoration: "none" }}
      >
        Back to Home
      </Link>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
