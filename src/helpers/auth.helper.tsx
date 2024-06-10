import { LoginProps, RegisterProps } from "@/types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export async function register(userData: RegisterProps) {
    try {
        const res = await fetch(`${apiUrl}/users/register`, {
            method: 'POST',
            headers: {
                'ngrok-skip-browser-warning': 'true',
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        if (res.ok) {//esta es repuesta del fetch
            return res.json()
        } else {
            alert("Failed to register")
            throw new Error("Failed to register")
        }

    } catch (error: any) {
        throw new Error(error);
    }
}


export async function login(userData: LoginProps) {
    try {
        const res = await fetch(`${apiUrl}/users/login`, {
            method: 'POST',
            headers: {
                'ngrok-skip-browser-warning': 'true',
                "Content-type": "application/json"
            },
            //to convert a JavaScript object into a JSON string so it can be sent in the body of an HTTP request
            //This ensures that the data is in the correct format for transmission and can be correctly interpreted by the receiving server.
            body: JSON.stringify(userData)
        })
        if (res.ok) {//esta es repuesta del fetch
            return res.json()
        } else {
            throw new Error("Failed to login")
        }

    } catch (error: any) {
        throw new Error(error);
    }
}