// 1. this actually queries the database via the url, params and axiosConfig and eventually returns the result
import storageService from "../storage/localStorage";
import client from "./client";

// 2. what is this? Does this refer to the backend/routes/users.js eventually
const endpoint = "/owners/";

// 3. Get all owner info. This routes its way eventually to GET_OWNERS in backend/db/ownersSql.js???
const getOwners = () => client.get(endpoint);

// used to obtain 1 owner from OWNER table
const getOwner = (credentialId) => {
    const userEndpoint = endpoint + credentialId;
    return client.get(userEndpoint);
};

const getOwnerFromCredentialByEmail = (email) => {
    const userEndpoint = endpoint + email;
    console.log("The XXXX point is:", userEndpoint);
    return client.get(userEndpoint);
};
const updateOwner = (ownerInfo) => {
    const userEndpoint = endpoint;
    console.log("UPDATE OWNER: user end point is", userEndpoint);
    return client.post(userEndpoint, ownerInfo);
};

const updateOwnerProfile = (profile) => {
    // client.setHeaders({ "x-auth-token": storageService.getToken() })
    console.log("OWNER: update profile token = ", storageService.getToken());
    console.log("OWNER: profile = ", profile);
    const profileEndpoint = "/owners/profile";
    return client.post(profileEndpoint, profile);
};

const getOwnerProfile = (ownerId) => {
    const ownerProfileEndpoint = "/owners/profile/" + ownerId;
    return client.get(ownerProfileEndpoint);
}

export default {
    getOwners,
    updateOwner,
    getOwner,
    getOwnerFromCredentialByEmail,
    updateOwnerProfile,
    getOwnerProfile
};
