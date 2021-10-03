import client from "./client";

const endpoint = "/bookings/";

const getBookings = () => {
    return client.get(endpoint);
};

const getBooking = (bookingId) => {
    const bookingEndpoint = endpoint + bookingId;
    return client.get(bookingEndpoint);
};

const getBookingDetails = (bookingId, userType) => {
    const bookingDetailEndpoint = `${endpoint}${bookingId}/${userType}`;
    return client.get(bookingDetailEndpoint);
};

const createBooking = (booking) => {
    return client.post(endpoint, booking);
};

const cancelBooking = (bookingId, walkerBookingIDObj) => {
    const bookingEndpoint = endpoint + bookingId;
    console.log(
        "bookings.js -> The cancelBooking end point is:",
        bookingEndpoint
    );
    return client.patch(bookingEndpoint, walkerBookingIDObj);
};

const getCompletedJobsForOwner = (ownerCredentialID) => {
    const completedJobs = endpoint + "completed/" + ownerCredentialID;
    console.log(
        "api - bookings.js -> getCompletedJobsForOwner:",
        ownerCredentialID
    );
    return client.get(completedJobs);
};

// GJ: The below is used to obtain both ASSIGNED and OPEN jobs for the owner
const getAssignedJobsForOwner = (ownerCredentialID) => {
    const assignedJobs = endpoint + "assigned/" + ownerCredentialID;
    console.log(
        "api - bookings.js -> getCompletedJobsForOwner:",
        ownerCredentialID
    );
    return client.get(assignedJobs);
};
const updateBooking = (status) => {
    return client.put(endpoint, status);
};

const updateBookingCompletedByWalker = (bookingId, walkerID) => {
    const bookingEndpoint = endpoint + "completedBywalker/" + bookingId;
    console.log(
        "api - bookings.js -> updateBookingCompletedByWalker:",
        bookingId
    );
    return client.patch(bookingEndpoint, walkerID);
};

export default {
    getBookings,
    getBooking,
    getBookingDetails,
    createBooking,
    cancelBooking,
    getCompletedJobsForOwner,
    getAssignedJobsForOwner,
    updateBooking,
    updateBookingCompletedByWalker,
};
