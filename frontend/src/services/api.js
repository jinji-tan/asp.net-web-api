const BASE_URL = import.meta.env.VITE_API_URL || "/api";
const LOGIN_REDIRECT_PATH = "/login";
const TOKEN_KEY = "token"

const handleResponse = async (response, endpoint) => {
    if (response.status === 401) {
        const isAuthEndpoint = endpoint.toLowerCase().includes("login")
            || endpoint.toLowerCase().includes("register");

        if (!isAuthEndpoint)
            localStorage.removeItem(TOKEN_KEY);

        if (!window.location.pathname.includes(LOGIN_REDIRECT_PATH))
            window.location.href = LOGIN_REDIRECT_PATH;
    }

    if (response.status === 204)
        return null;

    const contentType = response.headers.get("content-type");
    const data = contentType && contentType.includes("application/json")
        ? await response.json()
        : await response.text();

    if (!response.ok) {
        const error = (data && typeof data == 'object' ? data.message : data)
            || response.statusText;

        throw new Error(error);
    }

    return data;
}

const request = async (method, endpoint, body = null) => {
    const token = localStorage.getItem(TOKEN_KEY);
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {})
        }
    };

    if (body)
        options.body = JSON.stringify(body);

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        return handleResponse(response, endpoint);

    } catch (error) {
        if (error.message === "Failed to fetch") {
            throw new Error("Network error: Please check your internet connection.");
        }
        console.error(error);
        throw error;
    }
}

export const api = {
    register: (email, password, firstName, lastName) =>
        request("POST", "/Auth/register", { Email: email, Password: password, FirstName: firstName, LastName: lastName }),
    login: (email, password) =>
        request("POST", "/Auth/login", { Email: email, Password: password }),
}