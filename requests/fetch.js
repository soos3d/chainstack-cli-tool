const axios = require("axios");
const BASE_URL = "https://api.chainstack.com/v1";

const fetchWithToken = async (
  endpoint,
  data,
  token,
  method = "get",
  headers
) => {
  const url = `${BASE_URL}/${endpoint}`;

  try {
    if (method === "get") {
      return await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      return await axios(url, {
        method,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(data),
      });
    }
  } catch (error) {
    return {
      status: error.response.status,
      message: `[ERROR] ${error.response.data.error.code}: ${error.response.data.error.message}`,
    };
  }
};

fetchWithTokenFormData = async (endpoint, form, token) => {
  const url = `${BASE_URL}/${endpoint}`;

  try {
    return await axios(url, {
      method: "post",
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: form,
    });
  } catch (error) {
    return {
      status: error.response.status,
      message: `[ERROR] ${error.response.data.error.code}: ${error.response.data.error.message}`,
    };
  }
};

module.exports = { fetchWithToken, fetchWithTokenFormData };
