export function getPartnerId() {
  const partnerId = process.env.REACT_APP_NAVERPAY_PARTNER_ID;
  if (!partnerId) {
    throw new Error("partnerId not exists");
  }
  return partnerId;
}
export function getClientId() {
  const clientId = process.env.REACT_APP_NAVERPAY_CLIENT_ID;
  if (!clientId) {
    throw new Error("clientId not exists");
  }
  return clientId;
}
export function getClientSecret() {
  const clientSecret = process.env.REACT_APP_NAVERPAY_CLIENT_SECRET;
  if (!clientSecret) {
    throw new Error("clientSecret not exists");
  }
  return clientSecret;
}
export function getOnetimeChainId() {
  const onetimeChainId = process.env.REACT_APP_NAVERPAY_ONETIME_CHAIN_ID;
  if (!onetimeChainId) {
    throw new Error("clientSecret not exists");
  }
  return onetimeChainId;
}
export function getSubscriptionChainId() {
  const subscriptionChainId =
    process.env.REACT_APP_NAVERPAY_SUBSCRIPTION_CHAIN_ID;
  if (!subscriptionChainId) {
    throw new Error("subscriptionChainId not exists");
  }
  return subscriptionChainId;
}

export function getMode() {
  return "development";
}
