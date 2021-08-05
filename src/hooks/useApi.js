import { useState, useContext } from "react";
import AuthContext from "../context/authContext";


const useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setErrorMessage } = useContext(AuthContext);

  const request = async (...args) => {
    try {

      setLoading(true);
      const response = await apiFunc(...args);
      console.log("useApi response", response)
      setLoading(false);

      setError(!response.ok);
      setData(response.data);

      if (response.status !== 200) {
        setErrorMessage(response.data);
      }


      return response;
    } catch (error) {
      console.log("use api error = ", error);
    }
  };

  return { data, error, loading, request };
};

export default useApi;
