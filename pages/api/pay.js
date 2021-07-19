import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
import HmacSHA256 from 'crypto-js/sha256';
import axios from "axios";

export default async function handler(req, res) {
  // Run cors
  const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
      // Only allow requests with GET, POST and OPTIONS
      methods: ['GET', 'POST', 'OPTIONS'],
    })
  )

  await cors(req, res)

  const hash = HmacSHA256("merchant=onxQZvaVQZq&apikey=5cCuzYw1AOUKLFS69ruxRBC6qBAQWFBH&nonce=1386178459&to=1CkSCqyWGtVjok5A5xeGKKyMvpeZMnfEbq&fiat_amount=1", "HOSFvwa9pev8gMk3Cj6q6elKdwSkEPaL");
    console.log("initiated", hash );
    axios.get("http://paxful.com/wallet/pay", {
      merchant:"onxQZvaVQZq", 
      apikey:"e4sDZyCdWYBTcA6iuIR09ddgZCEOgEAq",
      apiseal:hash,
      nonce:1386178459,
      to: "1CkSCqyWGtVjok5A5xeGKKyMvpeZMnfEbq",
      amount: 1,
    }).catch(function(err){
      console.log("ERROR", err)
    })
}