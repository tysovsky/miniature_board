import {useState, useEffect} from "react";
import axios from "axios";

const useAxiosGet = (url?: string, timeout?: number) => {
    const [response, setResponse] = useState<string>();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!url) return;

      setLoading(true);

      let unmounted = false;
      let source = axios.CancelToken.source();
      axios.get(url, {
        cancelToken: source.token,
        timeout: timeout
      })
      .then(res => {
        if (!unmounted) {
          setResponse(res.data as string);
          setLoading(false);
        }
      }).catch((e) => {
        if (!unmounted) {
          setError(true);
          setErrorMessage(e.message);
          setLoading(false);
          if (axios.isCancel(e)) {
            console.log(`request cancelled:${e.message}`);
          } else {
            console.log("another error happened: " + e.message);
          }
        }
      });
      return function () {
          unmounted = true;
          source.cancel("Cancelling in cleanup");
      };
  }, [url, timeout]);

    return {response, loading, error, errorMessage};
};

export default useAxiosGet;
