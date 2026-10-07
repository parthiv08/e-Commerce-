import { useEffect, useState } from "react";
import axios from "axios"

function useFetch(URL) {
    let [products, setProducts] = useState([]);
    let [error, setError] = useState("");
    let [pending, setPending] = useState(true);

    useEffect(() => {
        let fetchApi = async () => {
            try {
                // let response = await fetch(URL);
                let response = await axios.get(URL)
                setProducts(response.data);
                

                // if (response.ok) {
                //     let data = await response.json();
                //     setProducts(data);
                // } else {
                //     throw new Error("Data not Found");
                // }
            } catch (error) {
                setError(error.message);
            } finally {
                setPending(false);
            }
        };
        fetchApi();
    }, []);
    return {
        products,
        error,
        pending,
        setProducts,
    };
}
export default useFetch;
