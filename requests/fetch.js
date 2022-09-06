const axios = require("axios");
const BASE_URL = "https://api.chainstack.com/v1";

const fetchWithToken = async (endpoint, data, token, method = "get") => {
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
    console.error(error);
    return null;
  }
};

// const fetchWithToken = (endpoint, data, token, method = "GET") => {
//   const url = `${BASE_URL}/${endpoint}`;

//   if (method === "GET") {
//     return fetch(url, {
//       method,
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   } else {
//     return fetch(url, {
//       method,
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(data),
//     });
//   }
// };

module.exports = { fetchWithToken };
