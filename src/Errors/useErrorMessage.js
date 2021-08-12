// import { useState } from "react";
// import ErrorMessage from "./ErrorMessageDisplay";

// const useErrorMessage = () => {
//     const [error, setError] = useState(null);

//     const checkResponse = async (response) => {
//         if (response.status !== 200) {
//             setError(response.data);
//         }
//     };
//     let ErrorMessageComponent = null;
//     if (error) { ErrorMessageComponent = () => (<ErrorMessage message={error} />) }
//     return { checkResponse, ErrorMessageComponent }
// };

// export default useErrorMessage;