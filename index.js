const express = require("express");
const ct = require('countries-and-timezones');

const app = express();
const port = 3000;

function addHours(numOfHours, date = new Date()) {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

  return date;
}
function getWeekDay(date) {
  let days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

  return days[date.getDay()];
}


app.get("/", (req, res) => {
  const hours = 1;
  const date = addHours(hours, (newdate = new Date()));
const datenotime= date.getMonth()+" "+date.getDay()+" "+date.getFullYear();
  result = {
    "UTC": date.toUTCString(),
    "ISO": date.toISOString(),
    "Datestring":date.toString(),
    "hours": date.getHours(),
    "minutes": date.getMinutes(),
    "seconds": date.getSeconds(),
    "weekDay":getWeekDay(date),
    "month":date.getMonth(),
    "year":date.getFullYear(),
    "datenotime":date.toString().substring(0,15)
  
  };
  res.send(result);
});

app.get("/:hours", (req, res) => {
  const hours = req.params["hours"];
  const date = addHours(hours, (newdate = new Date()));
const datenotime= date.getMonth()+" "+date.getDay()+" "+date.getFullYear();
  result = {
    "UTC": date.toUTCString(),
    "ISO": date.toISOString(),
    "Datestring":date.toString(),
    "hours": date.getHours(),
    "minutes": date.getMinutes(),
    "seconds": date.getSeconds(),
    "weekDay":getWeekDay(date),
    "month":date.getMonth(),
    "year":date.getFullYear(),
    "datenotime":date.toString().substring(0,15)
  
  };
  res.send(result);
});


app.listen(process.env.PORT || 5000, () => {
  console.log(`Example app listening on port ${process.env.PORT || 5000}`);
});
