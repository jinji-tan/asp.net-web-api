import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const Login = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await api.login(
                data.email.trim(),
                data.password
            );

            localStorage.setItem("token", response.token);
            navigate("/");
        } catch (error) {
            setError("root", {
                message: error?.message || "Invalid email or password"
            });
        }
    };

    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-slate-800">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-slate-700 h-auto w-100 gap-5 flex flex-col justify-center items-center font-serif text-xl rounded-3xl shadow-slate-950 shadow-xl p-6"
            >
                {/* Title */}
                <h1 className="text-5xl font-bold text-white">
                    Login
                </h1>

                {/* Global error */}
                {errors.root && (
                    <p className="text-red-500">{errors.root.message}</p>
                )}

                {/* Email */}
                <input
                    type="email"
                    placeholder="Email"
                    disabled={isSubmitting}
                    {...register("email", {
                        required: "Email is required"
                    })}
                    className="border-2 border-slate-500 rounded-xl w-full px-3 py-2 bg-slate-800 text-white"
                />
                {errors.email && (
                    <p className="text-red-400 text-sm">
                        {errors.email.message}
                    </p>
                )}

                {/* Password */}
                <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    disabled={isSubmitting}
                    {...register("password", {
                        required: "Password is required"
                    })}
                    className={`border-2 border-slate-500 rounded-xl w-full px-3 py-2 bg-slate-800 text-white transition-opacity ${isSubmitting ? "opacity-50 cursor-not-allowed" : "opacity-100"
                        }`}
                />
                {errors.password && (
                    <p className="text-red-400 text-sm">
                        {errors.password.message}
                    </p>
                )}

                {/* Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-slate-500 text-slate-900 rounded-2xl w-35 py-2 hover:bg-slate-800 hover:text-slate-500 border-2 border-slate-900 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {isSubmitting ? "Logging in..." : "Login"}
                </button>

                {/* Register link */}
                <p className="text-white text-sm">
                    Don't have an account yet?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                        className="text-sky-500 hover:underline"
                    >
                        Register
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Login;