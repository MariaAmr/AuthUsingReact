import { LoaderCircle, Lock, Mail, UserRound } from "lucide-react";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../auth/auth";

const Button = ({
  children,
  className = "",
  disabled = false,
  loading = false,
  type = "button",
}: {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
}) => (
  <button
    type={type}
    disabled={disabled || loading}
    className={`flex items-center justify-center h-10 rounded-lg transition-colors ${className} ${
      disabled ? "opacity-75 cursor-not-allowed" : ""
    }`}
  >
    {loading ? (
      <>
        <LoaderCircle className="animate-spin mr-2" size={18} />
        {children}
      </>
    ) : (
      children
    )}
  </button>
);

const Input = ({
  type,
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  icon,
}: {
  type: string;
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  icon?: React.ReactNode;
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full ${icon ? "pl-10" : "pl-3"} pr-3 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
        placeholder={placeholder}
      />
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);


export function RegisterPage() {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" });
    setAuthError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors = { username: "", email: "", password: "" };
    if (!user.username.trim()) newErrors.username = "Please enter a username";
    if (!user.password.trim()) newErrors.password = "Please enter a password";

    if (newErrors.username || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const { token } = await register({
        username: user.username,
        email: user.email,
        password: user.password,
      });
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-300 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        
        <h2 className="mb-8 text-center text-2xl font-semibold text-gray-800">
          Sign up 
        </h2>

        {authError && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-md text-center">
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            label="Username"
            name="username"
            placeholder="Enter your username"
            value={user.username}
            onChange={handleChange}
            error={errors.username}
            icon={<UserRound size={20} />}
          />

          <Input
            type="email"
            label="Email (optional)"
            name="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={handleChange}
            error={errors.email}
            icon={<Mail size={20} />}
          />

          <Input
            type="password"
            label="Password"
            name="password"
            placeholder="Create a password"
            value={user.password}
            onChange={handleChange}
            error={errors.password}
            icon={<Lock size={20} />}
          />

          <Button
            className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-medium"
            disabled={isLoading}
            loading={isLoading}
            type="submit"
          >
            Create account
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
