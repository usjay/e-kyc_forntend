import axios from 'axios';

class ApiNetwork {
  public postform(endpoint: string, data: any, method: 'POST'|'GET', headertype: 'application/json' | 'multipart/form-data', callback: (res: any) => void
  ) {
    console.log("API Request ", { endpoint, method, headertype });

    const headers = {
      'Content-Type':
      headertype ,
    };
    if (method == 'POST') {
      axios.post(`${import.meta.env.VITE_BASE_API_URL}${endpoint}`, data, { headers })
        .then((response) => callback(response))
        .catch((error) => callback(error));
    }

    if (method == 'GET') {
      axios.get(`${import.meta.env.VITE_BASE_API_URL}${endpoint}`, { headers })
        .then((response) => callback(response)).catch((error) => callback(error));
    }
  }
}

export default new ApiNetwork();
