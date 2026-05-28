
import { Link } from "react-router-dom";

function Footer(){

    return(

        <footer
        className="footer"
        >

            <div>

                <h3>
                    E.commerce
                </h3>

                <p>
                    Premium Shopping Experience
                </p>

            </div>


            
<div>

    <h4>
        Quick Links
    </h4>

    <Link

        to="/"
        onClick={()=>

window.scrollTo({

top:0,

behavior:"smooth"

})

}

       
    >

       <p>Home</p>

    </Link>


    <Link

        to="/cart"
        onClick={()=>

window.scrollTo({

top:0,

behavior:"smooth"

})

}

        
    >

       <p>Cart</p> 

    </Link>


    <Link

        to="/wishlist"
        onClick={()=>

window.scrollTo({

top:0,

behavior:"smooth"

})

}

        
    >

       <p>Wishlist</p> 

    </Link>

</div>


            <div>

                <h4>
                    Contact
                </h4>

                <p>
                    admin@gmail.com
                </p>
                <p>+91 98765 43210</p>

            </div>

        </footer>
    );
}

export default Footer;

