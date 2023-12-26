import express from "express"
import got from 'got';
const app = express();

const PORT = 8080;
const thirdPartBaseURL = "http://api.weatherbit.io/v2.0/current";


app.get("/weather", async (req, res) => {
   try {
      const response = await got.get(`${thirdPartBaseURL}`, {
         searchParams: {
            key: "a5fb8647584148f6a85a0ad1d44a11d9",
            lat: "52.134717",
            lon: "21.004241"
         },
         responseType: "json"
      });
      res.json({ response: response.body })
   } catch (error) {
      res.status(500).json({ message: error.message })
   }
})


app.listen(PORT, (err) => {
   if (err) console.error("Error at server launch");
   console.log(`${PORT} is working`);
})







