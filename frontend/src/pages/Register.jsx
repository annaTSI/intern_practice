
import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.name.trim()) {

            setErrorMessage("Enter your name");
            return;
        }

       if(!formData.email.trim()){

    setErrorMessage(
        "Enter your email"
    );

    return;
}

if(
    !formData.email.endsWith(
        "@gmail.com"
    )
){

    setErrorMessage(
        "Email must contain @gmail.com"
    );

    return;
}
        if (!formData.password.trim()) {

            setErrorMessage(
                "Enter your password"
            );

            return;
        }

        setLoading(true);
        setErrorMessage("");

        try {

            await API.post(
                "/auth/register",
                formData
            );

            setSuccessMessage(
                "Registered Successfully!!"
            );

            setTimeout(() => {

                navigate("/login");

            }, 500);

        }

        catch (error) {

            console.log(error);

            setErrorMessage(
                "Email already exists"
            );
        }

        finally {

            setLoading(false);
        }
    };

    return (

        <div className="register-container">

            <div className="register-form">

                <h2 className="register-title">
                    Register
                </h2>

                <form onSubmit={handleSubmit}>

                    <label htmlFor="name">
                        Name
                    </label>

                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={handleChange}
                        autoFocus
                    />

                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <label htmlFor="password">
                        Password
                    </label>

                    <div className="password-wrapper">

                        <input
                            id="password"
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <span

                            className="toggle-password"

                            onClick={() =>
                                setShowPassword(
                                    (prev) => !prev
                                )
                            }

                        >

                            {
                                showPassword
                                    ? "🙈"
                                    : "👁️"
                            }

                        </span>

                    </div>

                    {
                        errorMessage && (

                            <p className="error-message">
                                {errorMessage}
                            </p>
                        )
                    }

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Registering..."
                                : "Register"
                        }

                    </button>

                    {
                        successMessage && (

                            <p className="success-message">
                                {successMessage}
                            </p>
                        )
                    }

                </form>

            </div>

        </div>
    );
}

export default Register;

