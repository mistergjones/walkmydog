import storageService from "../storage/localStorage";
import client from "./client";

// 2. what is this? Does this refer to the backend/routes/users.js eventually
const endpoint = "/walkers/";

const updateProfile = (profile) => {
    // client.setHeaders({ "x-auth-token": storageService.getToken() })
    console.log("update profile token = ", storageService.getToken());
    console.log("profile = ", profile);
    const profileEndpoint = "profile/";
    return client.post(endpoint + profileEndpoint, profile);
};

const getWalkerPreferences = (walkerId) => {
    const preferenceEndpoint = endpoint + "preferences/" + walkerId;

    return client.get(preferenceEndpoint);
};

// GJ: 07/09: The below is used to obtain all the completed jobs for the walker based on their token credential_id
const getWalkerHistoricalCompletions = (credential_id) => {
    const userEndpoint = endpoint + credential_id;
    console.log(
        "walker.js -> The getWalkerHistoricalCompletions point is:",
        userEndpoint
    );
    return client.get(userEndpoint);
};
const getWalkerProfile = (credentialID) => {
    const walkerProfileEnpoint = endpoint + "profile/" + credentialID;

    return client.get(walkerProfileEnpoint);
}

export default {
    updateProfile,
    getWalkerHistoricalCompletions,
    getWalkerPreferences,
    getWalkerProfile
};
