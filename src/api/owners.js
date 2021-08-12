// 1. this actually queries the database via the url, params and axiosConfig and eventually returns the result
import client from "./client";

// 2. what is this? Does this refer to the backend/routes/users.js eventually
const endpoint = "/owners/";

// 3. Get all owner info. This routes its way eventually to GET_OWNERS in backend/db/ownersSql.js???
const getOwners = () => client.get(endpoint);

const updateOwner = (ownerInfo) => {
    const userEndpoint = endpoint;
    console.log("UPDATE OWNER: user end point is", userEndpoint);
    return client.post(userEndpoint, ownerInfo);
};
export default {
    getOwners,
    updateOwner,
};
