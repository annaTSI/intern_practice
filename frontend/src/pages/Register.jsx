import {
    useState
} from "react";

import API from "../services/api";

import {
    useNavigate
} from "react-router-dom";

function Register() {

    const navigate =
        useNavigate();

    const [formData, setFormData] =
        useState({

            name:"",
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
        const [loading,setLoading] =
useState(false);

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

    // NAME VALIDATION

    if(!formData.name.trim()){

        setErrorMessage(
            "Enter your name"
        );

        return;
    }

    // EMAIL VALIDATION

    if(!formData.email.trim()){

        setErrorMessage(
            "Enter your email"
        );
        
// EMAIL FORMAT VALIDATION

if(

    !formData.email
    .endsWith("@gmail.com")

){

    setErrorMessage(

        "Email must contain @gmail.com"

    );

    return;
}



        return;
    }

    // PASSWORD VALIDATION

    if(!formData.password.trim()){

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

        setTimeout(()=>{

            navigate("/login");

        },500);

    }

    catch(error){

        console.log(error);

        setErrorMessage(
            "Email already exists"
        );
    }

    finally{

        setLoading(false);
    }
};


    const inputStyle = {

    display:"block",

    marginBottom:"15px",

    padding:"12px",

    width:"100%",

    border:"1px solid #ccc",

    borderRadius:"8px",

    fontSize:"15px"
};

    return (

        <div
           style={{

    display:"flex",

    justifyContent:"center",

    alignItems:"center",

    height:"100vh",



}}
        >

            <div
                style={{

                    background:  "  #221e18",
                   

                    padding:"40px",

                    borderRadius:"12px",

                    boxShadow:
                    "0 0 10px rgba(0,0,0,0.1)",

                    width:"350px"
                }}
            >

                <h2
                    style={{
                        marginBottom:"20px",
                        textAlign:"center",
                        color:"white",
                    }}
                >
                    Register
                </h2>

                <form
                    onSubmit={handleSubmit}
                >

                    <input

                        type="text"

                        name="name"

                        placeholder=
                        "Enter Name"

                        value={formData.name}

                        onChange={handleChange}

                        style={inputStyle}
                    />

                    <input

                        type="email"

                        name="email"

                        placeholder=
                        "Enter Email"

                        value={formData.email}

                        onChange={handleChange}

                        style={inputStyle}
                    />

                    <div
                        style={{
                            position:"relative",
                            width:"100%",
                            marginBottom:"15px",
                            
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
style={inputStyle}
                        />

                        <span

                            onClick={()=>
                               setShowPassword(
(prev)=>!prev
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

                            padding:"8px",

                            cursor:"pointer",

                            width:"50%",

                            background:"#c9a96e",

                            color:"#0a0a0f",

                            border:"none",

                            borderRadius:"10px",
                            

                            fontSize:"16px",
                           display:"block",
margin:"0 auto"
                        }}
                    >
                        Register
                    </button>

                    {
                        successMessage && (

                            <p
                               
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

export default Register;