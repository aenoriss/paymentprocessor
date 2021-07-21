import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import axios from "axios";

export default async function pay(req, res) {
  // Run cors
  const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
      // Only allow requests with GET, POST and OPTIONS
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  await cors(req, res);

  // const merchantId = process.env.MERCHANT_ID;
  // const apiKey = process.env.API_KEY;

  //Credentials
  // const merchantId = "onxQZvaVQZq";
  // const publicKey = "iyrJ7KyEjuA2cuGEUTSWwMw8oDKazp6G";
  // const privateKey = "bOR2ZtGP8dPumnsO6n2HihLPwefKMJjo";
  // const time = new Date().getTime();
  // const toAdress = "1FfmbHfnpaZjKFvyi1okTjJJusN455paPH";
  // const amount = "0.1";

  const merchantId = "jozDqmvd7mW";
  const publicKey = "6bSxoS3gd2vdO458EU0UZANWyiMmKnyo";
  const privateKey = "bOR2ZtGP8dPumnsO6n2HihLPwefKMJjo";
  const time = 1386178459;
  const toAdress = "1CkSCqyWGtVjok5A5xeGKKyMvpeZMnfEbq";
  const amount = "0.5";

  console.log(merchantId, publicKey, privateKey,time, toAdress,amount )

  // "98276117589486d823930f29dd0b8f3e"
  
  // echo -n "merchant=onxQZvaVQZq&apikey=iyrJ7KyEjuA2cuGEUTSWwMw8oDKazp6G&nonce=12345&to=1FfmbHfnpaZjKFvyi1okTjJJusN455paPH&amount=0.1" | openssl dgst -sha256 -hmac bOR2ZtGP8dPumnsO6n2HihLPwefKMJjo

  //Encryption
  const hmacDigest = HmacSHA256(`merchant=${merchantId}&apikey=${publicKey}&nonce=${time}&to=${toAdress}&amount=${amount}`, privateKey).toString(Base64);
  
  console.log("HASH", hmacDigest)

  await axios.get(`https://paxful.com/wallet/pay?merchant=${merchantId}&apikey=${publicKey}&nonce=${time}&to=${toAdress}&amount=${amount}&apiseal=${hmacDigest}`).then((response => {
    console.log("Response: ", response);
    res.status(200).send()
  })).catch(function (err) {
    // console.log(err)
    res.status(400).send()
  })
}

