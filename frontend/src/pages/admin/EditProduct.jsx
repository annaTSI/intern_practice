import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import API from "../../services/api";

function EditProduct() {

    const { id } = useParams();

    const navigate =
        useNavigate();

  const [product, setProduct] =
useState({

    name:"",

    description:"",

    price:"",

    stock:"",

    category:"",

    imageUrl:""
});

   const fetchProduct =
async () => {

    try {

        const res =
        await API.get(
            `/products/${id}`
        );

        setProduct({

            ...res.data,

            imageUrl:
            res.data.image || ""

        });

    }

    catch(error){

        console.log(error);
    }
};

    useEffect(() => {

        fetchProduct();

    }, []);

    const handleChange =
    (e) => {

        setProduct({

            ...product,

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
                    `/products/${id}`,
                    product
                );

            alert(res.data.message);

            navigate("/admin");

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div
            style={{
                padding:"30px"
            }}
        >

            <h2>
                Edit Product
            </h2>

            <form
                onSubmit={handleSubmit}
            >

               <input

    type="text"

    name="imageUrl"

    placeholder=
    "Image URL"

    value={product.imageUrl}

    onChange={handleChange}

    style={{

        display:"block",

        marginBottom:"15px",

        padding:"10px",

        width:"300px"
    }}
/>

                <textarea

                    name="description"

                    placeholder=
                    "Description"

                    value={product.description}

                    onChange={handleChange}

                    style={{
                        display:"block",
                        marginBottom:"15px",
                        padding:"10px",
                        width:"300px"
                    }}
                />

                <input

                    type="number"

                    name="price"

                    placeholder=
                    "Price"

                    value={product.price}

                    onChange={handleChange}

                    style={{
                        display:"block",
                        marginBottom:"15px",
                        padding:"10px",
                        width:"300px"
                    }}
                />

                <input

                    type="number"

                    name="stock"

                    placeholder=
                    "Stock"

                    value={product.stock}

                    onChange={handleChange}

                    style={{
                        display:"block",
                        marginBottom:"15px",
                        padding:"10px",
                        width:"300px"
                    }}
                />

                <input

                    type="text"

                    name="category"

                    placeholder=
                    "Category"

                    value={product.category}

                    onChange={handleChange}

                    style={{
                        display:"block",
                        marginBottom:"15px",
                        padding:"10px",
                        width:"300px"
                    }}
                />

                <input

                    type="text"

                    name="image"

                    placeholder=
                    "Image URL"

                    value={product.image}

                    onChange={handleChange}

                    style={{
                        display:"block",
                        marginBottom:"15px",
                        padding:"10px",
                        width:"300px"
                    }}
                />

                {
    product.imageUrl && (

        <img

            src={

                product.imageUrl?.startsWith(
                    "http"
                )

                ?

                product.imageUrl

                :

                `http://localhost:5000/${product.imageUrl}`
            }

            alt=""

            width="200"

            style={{

                marginTop:"20px",

                display:"block"

            }}
        />

    )
}

                <button

                    type="submit"

                    style={{
                        marginTop:"20px",
                        padding:"10px 20px",
                        cursor:"pointer"
                    }}
                >
                    Update Product
                </button>

            </form>

        </div>
    );
}

export default EditProduct;