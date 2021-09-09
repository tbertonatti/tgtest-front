/* eslint-disable */
const server = "/api";
const HandledFetch = async (url: string, data = {}) => {
    try {
        const response = await fetch(url, data);
        if (response.ok) {
            const jsonRes = await response.json();
            return jsonRes.data;
        } else {
            throw Error(String(response.status));
        }
    } catch (err: any) {
        if (err.toString().includes("Error: 502")) {
            throw Error("Server is down");
        }
    }
};
export const HttpGet = (url: string) => {
    return HandledFetch(server + url);
};
export const HttpDelete = (url: string) => {
    return HandledFetch(server + url, { method: "DELETE" });
};
export const HttpPost = (url: string, data: any) => {
    return HandledFetch(server + url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
};
export const HttpPut = (url: string, data: any) => {
    return HandledFetch(server + url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
};
