import axios from 'axios';

class ApiNetwork {

  public post(endpoint: string, data: any, method: string, callback: any) {
    if (method == 'POST') {
      console.log("success", import.meta.env.VITE_BASE_API_URL);
      axios.post(`${import.meta.env.VITE_BASE_API_URL}${endpoint}`, data)
        .then(response => callback(response))
        .catch(error => callback(error));
    }


  }

}


export default new ApiNetwork();
