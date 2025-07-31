import { LoaderCircle, Mail } from "lucide-react";
import { useState } from "react";
import Button from "../button/button";
import { usersDB } from "../auth/auth";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const userExists = usersDB.some((user) => user.email === email);
      setLoading(false);
      setSuccess(userExists);
      if (!userExists) setError("Email not found");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-300 p-12">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Forgot Password?
        </h2>

        {success ? (
          <div className="space-y-4 rounded bg-green-50 p-4 text-green-700">
            <p>Password reset link sent to:</p>
            <p className="font-medium">{email}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3 mt-9">
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full rounded-md border pl-10 pr-4 py-3   focus:outline-none focus:ring-2 ${
                    error ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your email"
                />
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              </div>
              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-neutral-800 py-3 text-white hover:bg-neutral-700"
              >
                {loading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    <span>Sending...</span>
                  </span>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </div>
          </form>
        )}

        <div className="pt-4 text-center">
          <Link to={'/login'}
            className="text-sm font-medium text-blue-600 hover:underline hover:text-blue-500"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
