import { API_ENDPOINT } from "../../../../config/api";
import { axiosInstance } from "../../../../config/axios";

export async function createAccount() {
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = {
        full_name: fullName,
        email: email,
        password: password,
    };
    try {
        const response = await axiosInstance.post(
            API_ENDPOINT.AUTH_REGISTER,
            user
        );
        response.status === 200 && console.log("REGISTER SUCCESSFULLY!");
    } catch (error) {
        console.log(error);
    }
}
