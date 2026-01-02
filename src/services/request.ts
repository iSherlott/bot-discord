import axios from "axios";


const TOKEN = process.env.APIKEY || (() => { throw new Error("API Key is required") })();
const URL = process.env.APIURL || (() => { throw new Error("API URL is required") })();

export async function request(method: string, tarjet: string, data: any) {

    let url = `${URL}/${tarjet}`

    if (method == "get") url += `?${Object.keys(data)[0]}=${Object.values(data)[0]}`

    const result = await axios({
        method: method,
        url: url,
        headers: {
            Authorization: TOKEN,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        data: data,
    });

    return result.data;
}
