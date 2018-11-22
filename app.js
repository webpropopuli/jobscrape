const axios = require("axios");
const express = require("express");
const app = express();
const expressip = require("express-ip");
const PORT = process.env.PORT || 5001;
const path = require("path");

const handlebars = require("express-handlebars");
const myAppTitle = `Jobscrape`;

//tbd break it up and hide api-key
const urlPath = `https://api.ziprecruiter.com/jobs/v1?`;
const apiKey = `z9fe45ncinkwckmu5g2beibbe2kpqisx`;
const searchRadius = `radius_miles=25`;
const searchMisc = "jobs_per_page=10&page=1";
let userCountry = "";

// tbd This should eventually be built from all parts. I'm currently reducing from the mega-string
const searchString = `${urlPath}${searchRadius}&${searchMisc}&api_key=${apiKey}`;

app.engine(".hbs", handlebars({ extname: ".hbs" }));

app.set("PORT", PORT);

app.use(expressip().getIpInfoMiddleware); // TBD why?, where to use?

app.use(express.static(path.join(__dirname, "assets")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs"); //tbd to React

app.get("/", function(req, res) {
  res.render("index", { title: `${myAppTitle}` });
});

app.get("/search", function(req, res) {
  console.log(`render from '/search'`);
  //console.log(req);
  //console.log(res);

  console.warn(req.query);
  console.warn(req.params);
  console.warn(req.route);

  /* pull country info from req. my be null on localhost */

  if (req.ipInfo) {
    if (ipInfo.country) {
      console.warn(req.ipInfo);
      userCountry = ipInfo.country;
    }
  }

  queries = req.query;
  if (queries) {
    let url = BuildSearchString(queries);
    axios
      .get(url) // , { params }
      .then(function(response) {
        console.log(`**RESPONSE: (${response.data.jobs.length}) `);
        response.data.jobs.forEach(j => console.dir(j.name));
        res.render("search", { title: `${myAppTitle}`, jobs: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  } else {
    // nothing entered
    res.render("search", { title: `${myAppTitle}` });
  }
});

app.listen(app.get("PORT"), function() {
  console.log(`Express started on http://localhost:${app.get("PORT")}; press Ctrl-C to end it.`);
});

/** Create the full url here from root parts and the query */
let BuildSearchString = q => {
  let fullUrl = `${searchString}&search=${q.qDesc}&location=${q.qLoc}`;
  if (userCountry !== "") fullUrl += `&country=${userCountry}`;
  console.error(fullUrl);
  return fullUrl;
};
