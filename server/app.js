const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')

app.use(express.urlencoded())

app.use(express.static('public'))

let trips = []

//tell express to use mustache templating engine
app.engine('mustache', mustacheExpress())
// the pages are located in views directory
app.set('views','./views')
//extension will be .mustache
app.set('view engine', 'mustache')

app.post('/trips',(req,res) => {
  if(req.body.submit == 'Add Trip') {
    let city = req.body.newCity
    let tripStart = req.body.tripStart
    let tripEnd = req.body.tripEnd
    let trip = {title: city, tripStart: tripStart, tripEnd: tripEnd}
    trips.push(trip)
    res.render('trips', {city: trips})
  } else if (req.body.submit == 'Delete') {
    let title = req.body.hidden
    for(let index = 0; index < trips.length; index++){
      let trip = trips[index]
      if(trip.title == title) {
        trips.splice(index, 1)
      }
    }
    res.render('trips', {city: trips})
  } else if (req.body.submit == 'Update') {
    console.log(req.body)
    let title = req.body.hidden
    for(let index = 0; index < trips.length; index++){
      let trip = trips[index]
      if(trip.title == title) {
        trips.splice(index, 1)
      }
    }
    let city = req.body.hidden
    let tripStart = req.body.tripStart
    let tripEnd = req.body.tripEnd
    let trip = {title: city, tripStart: tripStart, tripEnd: tripEnd}
    trips.push(trip)
    res.render('trips', {city: trips})
  } else if (req.body.submit == 'Sort') {
    console.log(trips)
    console.log(req.body)
    search = trips.filter(el => el.title == req.body.city)
    console.log(search)
    res.render('trips', {city: search})
  }
})

app.get('/trips',(req,res) => {
  res.render('trips', {city: trips})
})

app.listen(3000,() => {
})
