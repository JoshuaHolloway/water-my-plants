import { useState, useCallback, useRef, useEffect } from 'react';

// ==============================================

export const useHttpClient = () => {
  // --------------------------------------------

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

  // -Store data across re-render cycles
  // -We don't want to update the UI
  //  when we change this specific data.
  const activeHttpRequests = useRef([]);
  // -We want to be able to cancel a request
  //  if the user changes the page
  //  to avoid errors related to this situation.

  // --------------------------------------------

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      // - - - - - - - - - - - - - - - - - - - -

      setIsLoading(true);
      const httpAbortCtrll = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrll);

      // - - - - - - - - - - - - - - - - - - - -

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrll.signal,
          // -Link the abort-controller to this request.
          // -We can now user the abort-controller
          //  to cancel the request.
        });

        const responseData = await response.json();
        console.log('responseData: ', responseData);

        // -We now know that the request completed.
        // -We know that we will not need to cancel this request.
        // -We can thus remove the request-controller
        //  corresponding to this request.
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCntrl) => reqCntrl !== httpAbortCtrll
        );

        // -We want a 4xx or 5xx error to throw to the catch block
        if (!response.ok) {
          // -.ok property on the response object
          //  is true if we have a 2xx or 3xx status code.
          // -If we made it into this if-statement
          //  then we got a 4xx or 5xx status code.
          throw new Error(responseData.message);
          // -NOTE: Cannot throw an error in async code!!!!
        }

        setIsLoading(false);
        return responseData;
        // - - - - - - - - - - - - - - - - - - - -
      } catch (err) {
        /* ... */
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
      // - - - - - - - - - - - - - - - - - - - -
    },
    []
  ); // const sendRequest = useCallback(async () => {}, []);

  // --------------------------------------------

  const clearError = () => {
    setError(null);
  };

  // --------------------------------------------

  // -Cleanup
  useEffect(() => {
    // -Run the returned function before each time
    //  that this useEffect callback runs again (after initial render)
    //  [that does not happen if the dependency list is empty,
    //   because this callback only runs on the initial render, or course]
    //  OR
    //  when the component un-mounts (this is what we use it for here)
    return () => {
      // -Loop through the array of abort-controllers
      activeHttpRequests.current.forEach((abortCntrl) => {
        // -On every abort-controller call abort().
        // -The request to which it is linked is aborted.
        abortCntrl.abort();
      });
    };
  }, []);

  // --------------------------------------------

  return { isLoading, error, sendRequest, clearError };

  // --------------------------------------------
};

// ==============================================
