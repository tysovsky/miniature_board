import {useState, useEffect} from "react";
import axios, { AxiosRequestConfig } from "axios";

const useAxiosPost = (url: string, data?: any, headers?: any, timeout?: number) => {
    const [response, setResponse] = useState<string>();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [responseUrl, setResponseUrl] = useState('');

    useEffect(() => {
      let unmounted = false;
      let source = axios.CancelToken.source();

      setLoading(true);

      axios.post(url, data, {
        headers: headers,
        cancelToken: source.token,
        timeout: timeout
      })
      .then(res => {
        if(!unmounted) {
          setResponse(res.data as string);
          setLoading(false);
          setResponseUrl(res.request.responseURL as string)
        }
      })
      .catch(e => {
        if(!unmounted){
          setError(true);
          setErrorMessage(e.message);
          setLoading(false);
        }
        if (axios.isCancel(e)) {
          console.log(`request cancelled:${e.message}`);
        } else {
          console.log("another error happened:" + e.message);
        }
      })

      return function () {
          unmounted = true;
          source.cancel("Cancelling in cleanup");
      };
  }, [url, data, timeout]);

    return {response, responseUrl, loading, error, errorMessage};
};

export default useAxiosPost;
