// Store a variable and its expiration timestamp in session storage
const setSessionVariable = (key, value, expirationMinutes) => {
    const now = new Date();
    const item = {
      value: value,
      expiration: now.getTime() + expirationMinutes * 60000 // Convert minutes to milliseconds
    };
    sessionStorage.setItem(key, JSON.stringify(item));
  };
  
  // Retrieve a variable from session storage and check if it has expired
  const getSessionVariable = key => {
    const itemStr = sessionStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiration) {
      sessionStorage.removeItem(key);
      sessionStorage.clear();
      alert("Session Expired")
      return null;
    }
    return item.value;
  };
  export {setSessionVariable,getSessionVariable}
  