export const getTossClientKey = () => {
  const clientKey = process.env.REACT_APP_TOSS_CLIENT_ID;
  if (!clientKey) {
    throw new Error(`REACT_APP_TOSS_CLIENT_ID Not Exists : ${clientKey}`);
  }
  return clientKey;
};
