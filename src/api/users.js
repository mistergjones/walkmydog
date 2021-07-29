import client from "./client";
const endpoint = "/users/";

const register = (userInfo) => client.post(endpoint, userInfo);


const getUsers = () => client.get(endpoint);

const getUser = (userId) => {
    const userEndpoint = endpoint + userId;
    return client.get(userEndpoint);
}
export default {
    getUsers,
    getUser
};

// import client from "./client";

// const endpoint = "/bookings/";

// const getBookings = () => client.get(endpoint);

// const getBooking = (bookingId) => {
//     const bookingEndpoint = endpoint + bookingId;
//     return client.get(bookingEndpoint);
// }
// export default {
//     getBookings,
//     getBooking
// };