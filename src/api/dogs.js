import client from "./client";

const endpoint = "/dogs/";

const getDogs = () => client.get(endpoint);

const getDog = (dogId) => {
    const dogEndpoint = endpoint + dogId;
    return client.get(dogEndpoint);
}
export default {
    getDogs,
    getDog
};