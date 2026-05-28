import {
    useEffect,
    useState
} from "react";

import API from "../services/api";

import ProductCard
from "../components/ProductCard";

import "../styles/home.css";
import { Link } from "react-router-dom";

function Home() {

    const [products, setProducts] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [selectedCategory,
        setSelectedCategory] =
        useState("All");

    const [sortType,
        setSortType] =
        useState("");

    const [priceRange,
        setPriceRange] =
        useState("");

    const fetchProducts =
    async () => {

        try {

            const res =
                await API.get(
                    "/products"
                );

            setProducts(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(()=>{

        fetchProducts();

    },[]);

    // UNIQUE CATEGORIES

    const categories =

[

    ...new Set(

        ["All",
        ...products.map(
            (p)=>p.category
        )]
    )
];

    // FILTER PRODUCTS

    let filteredProducts =

    products.filter((product)=>{

        const matchesSearch =

            product.name
            .toLowerCase()

            .includes(
                search.toLowerCase()
            );

        const matchesCategory =

            selectedCategory ===
            "All"

            ||

            product.category ===
            selectedCategory;

        let matchesPrice = true;

        if(priceRange){

            const [min,max] =

            priceRange
            .split("-")
            .map(Number);

            matchesPrice =

                product.price >= min

                &&

                product.price <= max;
        }

        return (

            matchesSearch

            &&

            matchesCategory

            &&

            matchesPrice
        );
    });

    // SORTING

    if(sortType === "lowToHigh"){

        filteredProducts.sort(
            (a,b)=>

            a.price - b.price
        );
    }

    if(sortType === "highToLow"){

        filteredProducts.sort(
            (a,b)=>

            b.price - a.price
        );
    }

    return (

           <div
    className="home-page"
    >

            {/* SEARCH */}

            <div
                className=
                "search-container"
            >

                <input

                    type="text"

                    placeholder=
                    "Search Products..."

                    value={search}

                    onChange={(e)=>

                        setSearch(
                            e.target.value
                        )
                    }
                />

            </div>
            {

!search && (
            <div className="hero">

    <p>
        CURATED COLLECTION
    </p>

    <h1>

        Shop the

        <span>
            {" "}Finest{" "}
        </span>

        <br/>

        Picks of the Season

    </h1>

</div>
)
}

            {/* CATEGORY BUTTONS */}

            <div
                className=
                "category-container"
            >

                {
                    categories.map(
                        (category,index)=>(

                        <button

                            key={index}

                            onClick={()=>

                                setSelectedCategory(
                                    category
                                )
                            }

                            className={

                                selectedCategory
                                === category

                                ?

                                "active-category"

                                :

                                ""
                            }
                        >

                            {category}

                        </button>
                    ))
                }

            </div>

            {/* FILTERS */}

            <div
                className=
                "filter-container"
            >

                <select

                    value={sortType}

                    onChange={(e)=>
                        setSortType(
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        Sort By
                    </option>

                    <option value="lowToHigh">
                        Price Low To High
                    </option>

                    <option value="highToLow">
                        Price High To Low
                    </option>

                </select>

                <select

                    value={priceRange}

                    onChange={(e)=>
                        setPriceRange(
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        Price Range
                    </option>

                    <option value="0-500">
                        ₹0 - ₹500
                    </option>

                    <option value="500-2000">
                        ₹500 - ₹2000
                    </option>

                    <option value="2000-10000">
                        ₹2000 - ₹10000
                    </option>

                </select>

            </div>

            {/* PRODUCTS */}

            {/* PRODUCTS */}

<div
    className="home-container"
>

    {
        filteredProducts.map(
            (product)=>(

                <ProductCard

                    key={product.id}

                    product={product}

                />

            )
        )
    }

</div>




</div>

);
}

export default Home;