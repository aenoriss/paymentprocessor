import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
import HmacSHA256 from 'crypto-js/sha256';
import axios from "axios";

export default async function pay(req, res) {
  // Run cors
  const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
      // Only allow requests with GET, POST and OPTIONS
      methods: ['GET', 'POST', 'OPTIONS'],
    })
  );

  await cors(req, res);

  const merchantId = process.env.MERCHANT_ID;
  const apiKey = process.env.API_KEY;

  const hash = HmacSHA256(`merchant=${merchantId}&apikey=${apiKey}&nonce=${1386178459}&to=1CkSCqyWGtVjok5A5xeGKKyMvpeZMnfEbq&fiat_amount=1`);
  // console.log("initiated", hash );
  await axios.get("http://paxful.com/wallet/pay", {
    merchant: merchantId, 
    apikey: apiKey,
    apiseal: hash,
    nonce: 1386178459,
    to: "1CkSCqyWGtVjok5A5xeGKKyMvpeZMnfEbq",
    fiat_amount: 1,
  }).then((response => {
    console.log("Response: ", response);
    res.status(200)
  })).catch(function(err){
    console.log("ERROR", err)
    res.status(400)
  })
}