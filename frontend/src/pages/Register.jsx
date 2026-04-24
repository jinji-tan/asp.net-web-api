import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const Register = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors, isSubmitting }
    } = useForm();

    const password = watch("password");

    const onSubmit = async (data) => {
        try {
            const response = await api.register(
                data.email.trim(),
                data.password,
                data.firstName.trim(),
                data.lastName.trim()
            );

            localStorage.setItem("token", response.token);
            alert(response.message);
            navigate("/");
        } catch (error) {
            setError("root", {
                message: error?.message || "Something went wrong"
            });
        }
    };

    return (
        <div className="min-h-screen  w-screen flex items-center justify-center bg-slate-800">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-slate-700 min-h-125 w-100 gap-5 flex flex-col justify-center items-center font-serif text-xl rounded-3xl shadow-slate-950 shadow-xl p-6"
            >
                {/* Title */}
                <div className="text-5xl font-bold text-white">
                    <h1>Register</h1>
                </div>

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
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,7}$/,
                            message: "Invalid email"
                        }
                    })}
                    className="border-2 border-slate-500 rounded-xl w-full px-3 py-2 bg-slate-800 text-white"
                />
                {errors.email && (
                    <p className="text-red-400 text-sm">{errors.email.message}</p>
                )}

                {/* First Name */}
                <input
                    type="text"
                    placeholder="First Name"
                    disabled={isSubmitting}
                    {...register("firstName", {
                        required: "First name is required"
                    })}
                    className="border-2 border-slate-500 rounded-xl w-full px-3 py-2 bg-slate-800 text-white"
                />
                {errors.firstName && (
                    <p className="text-red-400 text-sm">{errors.firstName.message}</p>
                )}

                {/* Last Name */}
                <input
                    type="text"
                    placeholder="Last Name"
                    disabled={isSubmitting}
                    {...register("lastName", {
                        required: "Last name is required"
                    })}
                    className="border-2 border-slate-500 rounded-xl w-full px-3 py-2 bg-slate-800 text-white"
                />
                {errors.lastName && (
                    <p className="text-red-400 text-sm">{errors.lastName.message}</p>
                )}

                {/* Password */}
                <input
                    type="password"
                    placeholder="Password"
                    disabled={isSubmitting}
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                        },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                            message: "Must include uppercase, lowercase, and a number"
                        }
                    })}
                    className="border-2 border-slate-500 rounded-xl w-full px-3 py-2 bg-slate-800 text-white"
                />
                {errors.password && (
                    <p className="text-red-400 text-sm">{errors.password.message}</p>
                )}

                {/* Confirm Password */}
                <input
                    type="password"
                    placeholder="Password Confirmation"
                    disabled={isSubmitting}
                    {...register("passwordConfirmation", {
                        required: "Please confirm password",
                        validate: (value) =>
                            value === password || "Passwords do not match"
                    })}
                    className="border-2 border-slate-500 rounded-xl w-full px-3 py-2 bg-slate-800 text-white"
                />
                {errors.passwordConfirmation && (
                    <p className="text-red-400 text-sm">
                        {errors.passwordConfirmation.message}
                    </p>
                )}

                {/* Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-slate-500 text-slate-900 rounded-2xl w-35 py-2 hover:bg-slate-800 hover:text-slate-500 border-2 border-slate-900 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {isSubmitting ? "Registering..." : "Register"}
                </button>

                {/* Login link */}
                <p className="text-white text-sm">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="text-sky-500 hover:underline"
                    >
                        Log in
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Register;