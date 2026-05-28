import { useState } from "react";

import API from "../../services/api";

function AddProduct() {

    const [formData, setFormData] =
        useState({

            name:"",
            description:"",
            price:"",
            stock:"",
            category:"",
            imageUrl:""
        });

    const [image, setImage] =
        useState(null);

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

            const data =
                new FormData();

            data.append(
                "name",
                formData.name
            );

            data.append(
                "description",
                formData.description
            );

            data.append(
                "price",
                formData.price
            );

            data.append(
                "stock",
                formData.stock
            );

            data.append(
                "category",
                formData.category
            );

            data.append(
                "imageUrl",
                formData.imageUrl
            );

            // FILE IMAGE

            if(image){

                data.append(
                    "image",
                    image
                );
            }

            const res =
                await API.post(
                    "/products",
                    data,
                    {
                        headers:{
                            "Content-Type":
                            "multipart/form-data"
                        }
                    }
                );

            alert(res.data.message);

            // CLEAR FORM

            setFormData({

                name:"",
                description:"",
                price:"",
                stock:"",
                category:"",
                imageUrl:""
            });

            setImage(null);

        } catch (error) {

            console.log(error);

            alert(
                "Product Add Failed"
            );
        }
    };

    return (

        <div
            style={{
                padding:"30px"
            }}
        >

            <h2>
                Add Product
            </h2>

            <form

                onSubmit={handleSubmit}

                style={{

                    width:"400px",

                    display:"flex",

                    flexDirection:"column",

                    gap:"15px"
                }}
            >

                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"

                    value={formData.name}

                    onChange={handleChange}

                    required
                />

                <textarea

                    name="description"

                    placeholder="Description"

                    value={formData.description}

                    onChange={handleChange}

                    required
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"

                    value={formData.price}

                    onChange={handleChange}

                    required
                />

                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"

                    value={formData.stock}

                    onChange={handleChange}

                    required
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"

                    value={formData.category}

                    onChange={handleChange}

                    required
                />

                <input
                    type="text"
                    name="imageUrl"

                    placeholder=
                    "Unsplash Image URL (Optional)"

                    value={formData.imageUrl}

                    onChange={handleChange}
                />

                <input
                    type="file"

                    accept="
                    image/png,
                    image/jpeg,
                    image/jpg,
                    image/webp
                    "

                    onChange={(e)=>

                        setImage(
                            e.target.files[0]
                        )
                    }
                />

                <button

                    style={{
                        padding:"12px",
                        cursor:"pointer"
                    }}
                >
                    Add Product
                </button>

            </form>

        </div>
    );
}

export default AddProduct;