import { useState, useEffect } from "react";

const useAxiosFetch = () => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false); //different!
  const [controller, setController] = useState();

  const axiosFetch = async (configObj) => {
    const { axiosInstance, method, url, requestConfig = {} } = configObj;

    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);
      const res = await axiosInstance[method.toLowerCase()](url, {
        ...requestConfig,
        signal: ctrl.signal,
      });
      setResponse(res);
    } catch (err) {
      console.log(err);

      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => controller && controller.abort();
  }, [controller]);

  return [response, error, loading, axiosFetch];
};

export default useAxiosFetch;
