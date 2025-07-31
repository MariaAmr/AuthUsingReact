import { useNavigate } from "react-router-dom";
import { logout } from "../auth/auth";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

export function Dashboard() {
  const navigate = useNavigate();
  const username =
    localStorage.getItem("token")?.replace("jwt-token-for-", "") || "User";

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full mx-auto bg-white rounded-lg shadow-md p-8 text-center">
     
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          {" "}
       
          Hello, {username}!
        </h2>

        <div className="mt-12 mb-8">
          {" "}
      
          <button
            onClick={handleLogout}
            className="py-3 px-8 bg-neutral-800 hover:bg-neutral-700 text-white font-medium  rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Log Out
          </button>
        </div>

    
        <div className="border-t border-gray-200 pt-6">
          <p className="text-gray-600">Welcome to your dashboard!</p>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
