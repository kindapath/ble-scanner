function useApi() {

  const apiData = {
    baseUrl: 'https://45.91.8.244:3000/',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const checkResponse = (res) => {

    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);

  }

  const sendDevices = async (devices) => {
    console.log('send');
    const res = await fetch(`${apiData.baseUrl}`, {
      method: 'GET',
      headers: apiData.headers,
      body: {
        devices
      }
    })

    return checkResponse(res)
  }

  return {
    sendDevices
  }
}

export default useApi;
