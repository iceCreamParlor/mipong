import axios from "axios";
import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { apiUrl } from "../App";

const Kakao: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const { match } = props;
  const [nextRedirectPcUrl, setNextRedirectPcUrl] = useState(null);
  const [tid, setTid] = useState(null);

  useEffect(() => {
    const fetchReadyResponse = async () => {
      return (await axios.post(`${apiUrl}/api/payments/kakao/ready`)).data;
    };
    fetchReadyResponse().then((res) => {
      setNextRedirectPcUrl(res.next_redirect_pc_url);
      console.log(`set tid : ${res.tid}`);
      setTid(res.tid);
      axios.get(`${apiUrl}/api/payments/kakao/setTid?tid=${res.tid}`);
      // .then(() => (document.location.href = res.next_redirect_pc_url));
    });
  }, []);

  console.log(`props : ${props}`);
  return (
    <>
      {JSON.stringify(nextRedirectPcUrl)}
      {nextRedirectPcUrl ? (
        <iframe width="500" height="500" src={nextRedirectPcUrl!}></iframe>
      ) : (
        "loading..."
      )}
    </>
  );
};

export default Kakao;
