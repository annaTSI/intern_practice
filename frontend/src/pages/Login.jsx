import {
    useState
} from "react";

import API from "../services/api";

import {
    useNavigate
} from "react-router-dom";
import "../styles/login.css";

function Login() {

    const [formData, setFormData] =
        useState({

            email:"",
            password:""
        });

    const [successMessage,
        setSuccessMessage] =
        useState("");

    const [errorMessage,
        setErrorMessage] =
        useState("");

    const [showPassword,
        setShowPassword] =
        useState(false);

    const navigate =
        useNavigate();

    const handleChange =
    (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
            e.target.value
        });
    };

    const handleSubmit =
    async (e) => {

        e.preventDefault();

        setErrorMessage("");

        try {

            const res =
                await API.post(
                    "/auth/login",
                    formData
                );

            localStorage.setItem(

                "user",

                JSON.stringify(
                    res.data.user
                )
            );

            setSuccessMessage(
                "Login Successful!!"
            );

            setTimeout(()=>{

                if(
                    res.data.user.role
                    === "admin"
                ){

                    navigate("/admin");

                } else {

                    navigate("/");
                }

                window.location.reload();

            },500);

        } catch (error) {

            console.log(error);

            setErrorMessage(
                "Enter correct email or password"
            );
        }
    };

    return (

       <div className="login-page">

            <div className="login-card">

                <h2
                    style={{
                        marginBottom:"20px",
                        textAlign:"center"
                    }}
                >
                    Login
                </h2>
               

                <form
                    onSubmit={handleSubmit}
                >

                    <input

                        type="email"

                        name="email"

                        placeholder=
                        "Enter Email"

                        value={formData.email}

                        onChange={handleChange}

                        style={{
                            display:"block",
                            marginBottom:"15px",
                            padding:"12px",
                            width:"100%",
                            border:"1px solid #ccc",
                            borderRadius:"8px",
                            fontSize:"15px"
                        }}
                    />

                    <div
                        style={{
                            position:"relative",
                            width:"100%",
                            marginBottom:"15px"
                        }}
                    >

                        <input

                            type={
                                showPassword
                                ?
                                "text"
                                :
                                "password"
                            }

                            name="password"

                            placeholder=
                            "Enter Password"

                            value={formData.password}

                            onChange={handleChange}

                            style={{
                                padding:"12px",
                                width:"100%",
                                border:"1px solid #ccc",
                                borderRadius:"8px",
                                fontSize:"15px"
                            }}
                        />

                        <span

                            onClick={()=>
                                setShowPassword(
                                    !showPassword
                                )
                            }

                            style={{

                                position:"absolute",

                                right:"10px",

                                top:"12px",

                                cursor:"pointer",

                                userSelect:"none"
                            }}
                        >

                            {
                                showPassword
                                ?
                                "🙈"
                                :
                                "👁️"
                            }

                        </span>

                    </div>

                    {
                        errorMessage && (

                            <p
                                style={{
                                    color:"red",
                                    marginTop:"4px",
                                    marginBottom:"12px",
                                    fontSize:"14px"
                                }}
                            >
                                {errorMessage}
                            </p>
                        )
                    }

                    <button
                        type="submit"

                        style={{

                            padding:"12px",

                            cursor:"pointer",

                            width:"100%",

                            background:"black",

                            color:"white",

                            border:"none",

                            borderRadius:"8px",

                            fontSize:"16px"
                        }}
                    >
                        Login
                    </button>
                     <p className="register-text">
    Don't have an account?
    
    <span
        onClick={() => navigate("/register")}
    >
        Register here
    </span>
</p>

                    {
                        successMessage && (

                            <p
                                style={{
                                    color:"green",
                                    marginTop:"15px",
                                    fontWeight:"bold",
                                    textAlign:"center"
                                }}
                            >
                                {successMessage}
                            </p>
                        )
                    }

                </form>

            </div>

        </div>
    );
}

export default Login;