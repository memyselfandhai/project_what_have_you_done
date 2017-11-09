const express = require('express')
const app = express()
const request = require('request')

var Congressman = require('./models/congressman.js')
var fs = require('fs')

var propublica_api = {'X-API-Key': 'IFP9za6qpYxnKfgOPkJWFDtmxwXfI1TrCHek275a'}
var google_url = "https://www.googleapis.com/civicinfo/v2/representatives?key"
var google_key = 'AIzaSyDXZY9mGfaadnbBATbYSqCrEB2m4sfq7Gg';



var address = '4700 fossil drive, 76117';
var house_reps = []
var senate_reps = []


// ----------------------------------
//
// Options
//
// ----------------------------------

// finds house/senate reps by address (google civics)
// legislatorLowerBody for house reps
// legislatorUpperBody for senate reps

function Your_Reps_by_Address (address, chamber) {
  this.uri = 'https://www.googleapis.com/civicinfo/v2/representatives';
  this.qs = {
    "key": "AIzaSyDXZY9mGfaadnbBATbYSqCrEB2m4sfq7Gg",
    'address': address,
    'roles': chamber
  }
}



// finds all reps by state (propublica)
function All_Reps_by_State(chamber, state) {
  this.url = `https://api.propublica.org/congress/v1/members/${chamber}/${state}/current.json`;
  this.headers = {
    'X-API-Key': 'IFP9za6qpYxnKfgOPkJWFDtmxwXfI1TrCHek275a'
  }
}

// gets all votes by member id

function Votes(id) {
  this.url = `https://api.propublica.org/congress/v1/members/${id}/votes.json`;
  this.headers = {
    'X-API-Key': 'IFP9za6qpYxnKfgOPkJWFDtmxwXfI1TrCHek275a'
  }
}


// ----------------------------------
//
// CALLBACK FUNCTIONS
//
// ----------------------------------

// **** refactor later ****

var house_callback = function (error, response, body) {
  body = JSON.parse(body);
  house_reps = body.officials.map(rep => new Congressman(rep.name, rep.party, rep.phones, rep.urls, rep.photoUrl) )
};

var senate_callback = function (error, response, body) {
  body = JSON.parse(body);
  senate_reps = body.officials.map(rep => new Congressman(rep.name, rep.party, rep.phones, rep.urls, rep.photoUrl) )
};



request(new Your_Reps_by_Address(address, 'legislatorUpperBody'), senate_callback)
request(new Your_Reps_by_Address(address, 'legislatorLowerBody'), house_callback)


// setTimeout( () => console.log(house_reps.forEach(rep => {
//   console.log(rep.name)
// }))
// , 5000)



setTimeout( function() {
  var rep_names = [];
  house_reps.forEach(rep => {rep_names.push(rep.name)});
  // console.log(rep_names);


// matches found house reps from Google Civics to master list of
// reps (Propublica), and appends the ID if found in both
  request( new All_Reps_by_State('house', 'TX'), (error, response, body) => {
    body = JSON.parse(body)

    body.results.forEach(rep => {
      // console.log(rep.name)
      if (rep_names.includes(rep.name)) {
          house_reps.forEach(member => {
            if (member.name === rep.name) {
              member.id = rep.id
              // console.log(member)
            }
          })
      }
    })
    console.log(house_reps)
  })

}
, 5000)



//  searches and returns recently voted bills of house rep
