// 1. this actually queries the database via the url, params and axiosConfig and eventually returns the result
import storageService from "../storage/localStorage";
import client from "./client";

// 2. what is this? Does this refer to the backend/routes/users.js eventually
const endpoint = "/users/";

// 3. Get the user info. This routes its way eventually to GET_USERS in backend/db/usersSql.js???
const getUsers = () => client.get(endpoint);

// 4/ This if to find a particular user
const getUser = (UserId) => {
    //the below will be: /users/3
    const userEndpoint = endpoint + UserId;

    return client.get(userEndpoint);
};

const getUserByEmail = (emailId) => {
    //the below will be: /users/aa@aa.com
    const userEndpoint = endpoint + emailId;
    console.log("getUserByEmail: user end point is", userEndpoint);
    return client.get(userEndpoint);
};

const insertUser = (userInfo) => {
    const userEndpoint = endpoint;
    console.log("INSERT USER: user end point is", userEndpoint);
    return client.post(userEndpoint, userInfo);
};

const loginUser = (userInfo) => {
    console.log("userInfo = ", userInfo);
    const userEndpoint = endpoint + "login";
    console.log("LOGIN USER: user end point is", userEndpoint);
    return client.post(userEndpoint, userInfo);
};

const updateProfile = (profile) => {
    // client.setHeaders({ "x-auth-token": storageService.getToken() })
    console.log("update profile token = ", storageService.getToken())
    console.log("profile = ", profile);
    const profileEndpoint = "/users/profile";
    return client.post(profileEndpoint, profile);
};

// const register = (userInfo) => client.post("/users", userInfo);

export default {
    getUsers,
    getUser,
    getUserByEmail,
    // 27/07 - GJ added the bleow
    insertUser,
    updateProfile,
    loginUser,
};
