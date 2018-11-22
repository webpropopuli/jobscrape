# Jobscrape - a first-pass jobs scraper using the Zip Recruiter API

{orig working off this: https://medium.freecodecamp.org/how-i-built-a-job-scraping-web-app-using-node-js-and-indreed-7fbba124bbdc 
for the very basics, but I wanted to convert everything. It probably would have been easier to code it from scratch, but I like grabbing other people's _design_ since I'm bad at visuals.}
- You need a ZipRecruiter API key for this to work, but you can pretty much swap out whatever search engine you want. I'll try to modularize it as much as possible, to that isn't too painful
  https://api.ziprecruiter.com/jobs/v1?search=Javascript&location=Providence,%20RI&radius_miles=25&days_ago=&jobs_per_page=10&page=1&api_key=z9fe45ncinkwckmu5g2beibbe2kpqisx
  { doc: https://www.ziprecruiter.com/marketplace/user/integration/api?enc_board_id=5b1931e5 }

For now, this uses handlebars for frontend, axios for data.
Have data, need to work on formatting as found.

Will add React instead of HB
