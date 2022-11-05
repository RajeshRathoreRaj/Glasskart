var APIKEY="AIzaSyCeL-_o98r7DE5H-BxKAYTSupPnio4M3Rs"
var ServerURL = "http://localhost:5000";
var axios = require("axios");
const getData = async (url) => {
  try {
    /* `${ServerURL}/${url}` template literals*/
    const response = await fetch(`${ServerURL}/${url}`);
    const result = await response.json();
    return result;
  } catch (e) {
    console.log("Error:", e);
    return null;
  }
};

const postData = async (url, body) => {
  try {
    const response = await fetch(`${ServerURL}/${url}`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    return result;
  } catch (e) {
    return null;
  }

}


const postDataAndImage = async (url, formData, config) => {
  try {
 
    const response = await axios.post(`${ServerURL}/${url}`, formData, config);
    const result = await response.data;
    return result;
  } catch (e) {
    console.log("Error:", e);
    alert(e);
    return null;
  }
};

export { ServerURL, getData, postDataAndImage,APIKEY,postData };
