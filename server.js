import express from "express"
import got from 'got';
import 'dotenv/config'
const app = express();

const PORT = process.env.PORT || 8080;
const thirdPartApiKey = process.env.WEATHER_API_KEY
const thirdPartBaseURL = "http://api.weatherbit.io/v2.0/current";


app.get("/weather", async (req, res) => {
   try {
      const {
         latitude,
         longitude
      } = req.query

      if (!latitude) res.status(400).json({ message: "latitude parameter is mandatory" })

      if (!longitude) res.status(400).json({ message: "longitude parameter is mandatory" })


      const response = await got.get(`${thirdPartBaseURL}`, {
         searchParams: {
            key: thirdPartApiKey,
            lat: latitude,
            lon: longitude
         },
         responseType: "json"
      });
      const [weatherData] = response.body.data;


      const {
         city_name,
         weather: { description },
         temp
      } = weatherData

      res.json({
         city_name,
         description,
         temp
      })

   } catch (error) {
      res.status(500).json({ message: error.message })
   }
})


app.listen(PORT, (err) => {
   if (err) console.error("Error at server launch");
   console.log(`${PORT} is working`);
})





