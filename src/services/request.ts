import axios from "axios";

import varcharGlobal from "./varGlobal";

const TOKEN = varcharGlobal.TOKEN;

export async function request(method: string, tarjet: string, data: any) {

    let url = `http://localhost:9000/${tarjet}`

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
