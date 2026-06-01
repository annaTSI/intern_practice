import { useState } from "react";
import API from "../services/api";
import "../styles/profile.css";

function Profile() {

    const user =
    JSON.parse(
        localStorage.getItem("user")
    );

    const [formData,setFormData] =
    useState({

        name:user?.name || "",

        email:user?.email || "",

        password:""
    });

    const [message,setMessage] =
    useState("");

    const handleChange =
    (e)=>{

        setFormData({

            ...formData,

            [e.target.name]:
            e.target.value
        });
    };

    const handleSubmit =
    async(e)=>{

        e.preventDefault();

        try{

            const res =
            await API.put(

                "/auth/profile",

                formData
            );

            const updatedUser = {

                ...user,

                name:formData.name,

                email:formData.email
            };

            localStorage.setItem(

                "user",

                JSON.stringify(
                    updatedUser
                )
            );

            setMessage(
                res.data.message
            );

            setTimeout(()=>{

                window.location.reload();

            },1000);

        }

        catch(error){

            console.log(error);

            setMessage(
                "Profile update failed"
            );
        }
    };

    return(

        <div className="profile-page">

            <div className="profile-card">

                <h2>
                    My Profile
                </h2>

                <form
                onSubmit={handleSubmit}
                >

                    <input

                    type="text"

                    name="name"

                    placeholder="Name"

                    value={formData.name}

                    onChange={handleChange}

                    />

                    <input

                    type="email"

                    name="email"

                    placeholder="Email"

                    value={formData.email}

                    onChange={handleChange}

                    />

                    <input

                    type="password"

                    name="password"

                    placeholder="New Password"

                    value={formData.password}

                    onChange={handleChange}

                    />

                    <button
                    type="submit"
                    >

                    Update Profile

                    </button>

                </form>

                {

                message &&

                <p>

                    {message}

                </p>

                }

            </div>

        </div>
    );
}

export default Profile;