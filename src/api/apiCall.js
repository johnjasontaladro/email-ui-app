const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const getEmailData = async () => {
  await sleep(200);
  return await fetch(process.env.REACT_APP_GET_EMAIL_DATA_URL, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
};

const apiCall = {
  getEmailData,
};

export default apiCall;
