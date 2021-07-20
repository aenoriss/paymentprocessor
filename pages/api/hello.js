// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios"
import HmacSHA256 from 'crypto-js/sha256';

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
  res.header("Access-Control-Allow-Origin", "localhost");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  const hash = HmacSHA256("merchant=onxQZvaVQZq&apikey=5cCuzYw1AOUKLFS69ruxRBC6qBAQWFBH&nonce=1386178459&to=1CkSCqyWGtVjok5A5xeGKKyMvpeZMnfEbq&fiat_amount=1", "HOSFvwa9pev8gMk3Cj6q6elKdwSkEPaL");
    console.log("initiated", hash );
    axios.get("https://paxful.com/wallet/pay", {
      merchant:"onxQZvaVQZq", 
      apikey:"e4sDZyCdWYBTcA6iuIR09ddgZCEOgEAq",
      apiseal:hash,
      nonce:1386178459,
      to: "1CkSCqyWGtVjok5A5xeGKKyMvpeZMnfEbq",
      amount: 1,
    }).then(function(err){
      console.log("ERROR", err)
    })
}
