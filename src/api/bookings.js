import client from "./client";

const endpoint = "/bookings/";

const getBookings = () => client.get(endpoint);

const getBooking = (bookingId) => {
    const bookingEndpoint = endpoint + bookingId;
    return client.get(bookingEndpoint);
}

const getBookingDetails = (bookingId, userType) => {
    const bookingDetailEndpoint = `${endpoint}${bookingId}/${userType}`
    return client.get(bookingDetailEndpoint);
}

export default {
    getBookings,
    getBooking,
    getBookingDetails
};





