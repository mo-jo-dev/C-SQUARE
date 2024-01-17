const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const {PORT} = require('./config/serverConfig');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date) {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }

const startServer = async () => {
    const res = await axios.get(`https://clist.by:443/api/v1/contest/?username=mo-jo-dev&api_key=0965da70e684b0485eedc5cf7209098afe12519a&limit=15&offset=0&start__gte=${formatDate(new Date())}&order_by=start&duration__lt=999999`);
    // const res = await axios.get("https://gnews.io/api/v4/search?q=example&apikey=dff371407c884115b4c2f9a1a588f80d");
    res.data.objects.forEach(i => {
        console.log(i);
    });
    console.log(res.data);
    app.listen(PORT,() => {
        console.log(`SERVER STARTED IN PORT: ${PORT}`);
    })
}

startServer();
