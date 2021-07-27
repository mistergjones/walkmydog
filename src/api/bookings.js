import client from "./client";

const endpoint = "/bookings/";

const getBookings = () => client.get(endpoint);

const getBooking = (bookingId) => {
    const bookingEndpoint = endpoint + bookingId;
    return client.get(bookingEndpoint);
}
export default {
    getBookings,
    getBooking
};





