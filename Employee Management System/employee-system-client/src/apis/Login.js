export const Authenticate=(UserId,password)=> {
    const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
      const apiUrl = `${SERVER_BASE_URL}/authentication`;
      return  fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Set the Content-Type header for JSON data
          },
          body: JSON.stringify({ "UserId": UserId, "password": password }),
        })
          .then((response) => {
            return response;
          })
         
          .catch((error) => {
            console.error('Error in POST request:', error);
          });
  }