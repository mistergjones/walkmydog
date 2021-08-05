import jwtDecode from "jwt-decode";
import storageService from "../storage/localStorage";

const jwtService = {}


jwtService.getUserFromResponseToken = (response) => {
    const token = response.headers["x-auth-token"];

    if (token) {
        storageService.setToken(token);
        return jwtDecode(token);
    }
    return null;
}


export default jwtService;




