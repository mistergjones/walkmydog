
const storageService = {};

storageService.getToken = () => {
    return localStorage.getItem("token");
}
storageService.setToken = (token) => {

    localStorage.setItem("token", token);
}

storageService.removeToken = () => {
    localStorage.removeItem("token");
}

export default storageService;