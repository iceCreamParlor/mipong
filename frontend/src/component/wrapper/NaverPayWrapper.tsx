const NaverPayWrapper: React.FC = ({ children }) => {
  const partnerId = process.env.REACT_APP_NAVERPAY_PARTNER_ID;
  const clientId = process.env.REACT_APP_NAVERPAY_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_NAVERPAY_CLIENT_SECRET;
  const onetimeChainId = process.env.REACT_APP_NAVERPAY_ONETIME_CHAIN_ID;
  const subscriptionChainId =
    process.env.REACT_APP_NAVERPAY_SUBSCRIPTION_CHAIN_ID;
  const mode = "development";
  const userKey = `${Math.floor(Math.random() * 10000000)}`;
  const payKey = `${Math.floor(Math.random() * 10000000)}`;

  const props = {
    partnerId,
    clientId,
    clientSecret,
    onetimeChainId,
    subscriptionChainId,
    mode,
    userKey,
    payKey,
  };

  return <>{children}</>;
};
export default NaverPayWrapper;
