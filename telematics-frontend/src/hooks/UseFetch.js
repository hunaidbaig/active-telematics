import { useState } from "react";
import { api } from "../api/Config";

const UseFetch = ()=>{

    const [data, setData] = useState(null);
    const [loadData, setLoadData] = useState(null);

    const fetch = async (url) => {
        setLoadData(true);

        try {
            const response = await api.get(url);
            const result = response.data;

            if (result.Bool) {
                // console.log(result.data)
                setData(result.data);
                setLoadData(false)
            }
            else {
                console.log('reject your request');
            }

            // console.log(result, 'result');
        } catch (e) {
            console.log(e);
        }

    }

    return { data, loadData, fetch, setData, setLoadData }

}

export default UseFetch;
