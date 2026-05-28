import {
    useContext,
    useState
} from "react";

import API from "../services/api";

import {
    AuthContext
} from "../context/AuthContext";

function Profile() {

    const {

        user,

        setUser

    } = useContext(AuthContext);

    const [formData,
        setFormData] =
        useState({

            name:user?.name || "",

            email:user?.email || "",

            password:""
        });

    const [message,
        setMessage] =
        useState("");

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

        try {

            const res =
                await API.put(

                    "/auth/update-profile",

                    formData
                );

            setMessage(
                "Profile Updated!!"
            );

            setUser({

                ...user,

                name:formData.name,

                email:formData.email
            });

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div
            style={{

                display:"flex",

                justifyContent:"center",

                alignItems:"center",

                height:"100vh",

                background:"#f5f5f5"
            }}
        >

            <div
                style={{

                    background:"white",

                    padding:"40px",

                    borderRadius:"12px",

                    boxShadow:
                    "0 0 10px rgba(0,0,0,0.1)",

                    width:"350px"
                }}
            >

                <h2
                    style={{
                        textAlign:"center",
                        marginBottom:"20px"
                    }}
                >
                    My Profile
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

                        style={{
                            width:"100%",
                            padding:"12px",
                            marginBottom:"15px",
                            borderRadius:"8px",
                            border:"1px solid #ccc"
                        }}
                    />

                    <input

                        type="email"

                        name="email"

                        placeholder=
                        "Enter Email"

                        value={formData.email}

                        onChange={handleChange}

                        style={{
                            width:"100%",
                            padding:"12px",
                            marginBottom:"15px",
                            borderRadius:"8px",
                            border:"1px solid #ccc"
                        }}
                    />

                    <input

                        type="password"

                        name="password"

                        placeholder=
                        "Enter New Password"

                        value={formData.password}

                        onChange={handleChange}

                        style={{
                            width:"100%",
                            padding:"12px",
                            marginBottom:"15px",
                            borderRadius:"8px",
                            border:"1px solid #ccc"
                        }}
                    />

                    <button

                        type="submit"

                        style={{

                            width:"100%",

                            padding:"12px",

                            background:"black",

                            color:"white",

                            border:"none",

                            borderRadius:"8px",

                            cursor:"pointer"
                        }}
                    >

                        Update Profile

                    </button>

                    {
                        message && (

                            <p
                                style={{
                                    color:"green",
                                    marginTop:"15px",
                                    textAlign:"center"
                                }}
                            >
                                {message}
                            </p>
                        )
                    }

                </form>

            </div>

        </div>
    );
}

export default Profile;