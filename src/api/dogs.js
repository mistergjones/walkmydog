import client from "./client";

const endpoint = "/dogs/";

const getDogs = () => client.get(endpoint);

const getDog = (dogId) => {
    const dogEndpoint = endpoint + dogId;
    return client.get(dogEndpoint);
};

// GJ: added the insertDog functionality
const insertDog = (dogInfo) => {
    const dogEndpoint = endpoint;
    console.log("INSERT DOG: dog end point is", dogEndpoint);
    return client.post(dogEndpoint, dogInfo);
};

export default {
    getDogs,
    getDog,
    // GJ: added the insertDog functionality
    insertDog,
};
