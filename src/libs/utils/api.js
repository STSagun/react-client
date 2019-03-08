import axios from 'axios';


export default async function callApi(method, url, data) {
  try {
    const response = await axios({
      method,
      url: `https://express-training.herokuapp.com/api/${url}`,
      data,
    });

    return response;
  } catch (err) {
    return err.response;
  }
}
