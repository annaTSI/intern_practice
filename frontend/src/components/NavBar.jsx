import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    useContext
} from "react";

import {
    FaHome,
    FaShoppingCart,
    FaHeart,
    FaBoxOpen,
    FaSignInAlt,
    FaUserPlus,
    FaUser
} from "react-icons/fa";

import {
    CartContext
} from "../context/CartContext";

function Navbar() {

    const navigate =
    useNavigate();

    const {

        cartCount,

        wishlistCount

    }

    =

    useContext(
        CartContext
    );

    const user =
    JSON.parse(
        localStorage.getItem(
            "user"
        )
    );
    

    const logout = () => {

        localStorage.removeItem(
            "user"
        );

        navigate(
            "/login"
        );

        window.location.reload();
    };
    const linkStyle={

display:"flex",

alignItems:"center",

gap:"8px",

color:"#ddd",

textDecoration:"none",

fontSize:"18px"

};

const iconStyle = {

    fontSize:"16px",

    color:"#888"

};

    return (

        <nav
            style={{

                background:"#05060f",

                color:"white",

                padding:"20px 40px",

                display:"flex",

                justifyContent:
                "space-between",

                alignItems:
                "center",

         

                position:"sticky",

                top:"0",

                zIndex:"1000"
            }}
        >

           <h1
style={{

marginLeft:"15px",

fontSize:"38px",

fontWeight:"bold",

letterSpacing:"-1px"

}}
>

            E

            <span

            style={{

                color:"#cfa45e"

            }}

            >

            .

            </span>

            commerce

            </h1>


            <div
style={{

display:"flex",

gap:"40px",

alignItems:"center",

marginRight:"20px"

}}
>

           <Link
to="/"
style={linkStyle}
>

<FaHome
style={iconStyle}
/>

Home

</Link> 


            {

            user && (

            <>

            <Link
to="/cart"
style={linkStyle}
>

<FaShoppingCart
style={iconStyle}
/>

{

cartCount>0

?

`Cart (${cartCount})`

:

"Cart"

}

</Link>


            <Link
to="/wishlist"
style={linkStyle}
>

<FaHeart
style={iconStyle}
/>

{

wishlistCount>0

?

`Wishlist (${wishlistCount})`

:

"Wishlist"

}

</Link>


            <Link
to="/orders"
style={linkStyle}
>

<FaBoxOpen
style={iconStyle}
/>

Orders

</Link>
<Link
to="/profile"
style={linkStyle}
>

<FaUser
style={iconStyle}
/>

Profile

</Link>


            {

            user.role==="admin"

            &&

            <Link

            to="/admin"

            style={{

                color:"#ddd",

                textDecoration:"none",

                fontSize:"18px"

            }}

            >

            Admin

            </Link>

            }


           <span

style={{

color:"#888",

fontSize:"18px",

marginLeft:"20px",

marginRight:"20px",

whiteSpace:"nowrap"

}}

>

Welcome,
{" "}
{user.name}

</span>


            <button

            onClick={logout}

            style={{

                background:"transparent",

                border:
                "1px solid #444",

                color:"white",

                padding:
                "12px 25px",

                borderRadius:
                "10px",

                cursor:"pointer",

                transition:"0.3s"
            }}

            >

            Logout

            </button>

            </>

            )

            }


            {

            !user && (

            <>

            <Link
to="/login"
style={linkStyle}
>

<FaSignInAlt
style={iconStyle}
/>

Login

</Link>


            <Link
to="/register"
style={linkStyle}
>

<FaUserPlus
style={iconStyle}
/>

Register

</Link>

            </>

            )

            }

            </div>

        </nav>
    );
}

export default Navbar;