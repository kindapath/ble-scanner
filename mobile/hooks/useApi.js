function useApi() {

  const apiData = {
    baseUrl: 'http://45.91.8.244/',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // check the response from the server
  const checkResponse = (res) => {

    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);

  }

  // send POST request to the server with array of found devices
  const sendDevices = async (devices) => {
    const res = await fetch(`${apiData.baseUrl}`, {
      method: 'POST',
      headers: apiData.headers,
      body: JSON.stringify({
        devices
      })
    })

    return checkResponse(res)
  }

  return {
    sendDevices
  }
}

export default useApi;
