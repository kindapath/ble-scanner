function useApi() {

  const apiData = {
    baseUrl: 'http://46.22.56.22',
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
    const res = await fetch(`${apiData.baseUrl}/`, {
      method: 'POST',
      headers: apiData.headers,
      body: {
        devices
      }
    })

    return res
  }

  return {
    sendDevices
  }
}

export default useApi;
