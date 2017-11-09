const express = require('express')
const app = express()
const request = require('request')
var Congressman = require('./models/congressman.js')
var fs = require('fs')

// request
//   .get(uri)
//   .on('response', function(response) {
//    console.log(response.statusCode) // 200
//  })
//
//  // console.log('error:', error);
//  // console.log('statusCode:', response && response.statusCode);
//  // console.log('body:', typeof body);
//
// app.get('/', (req, res) => res.send('Hello World!'))
//
// app.post('/', function (req, res) {
//   res.send('Got a POST request')
// })
//
//
// kay granger = G000377
//
// // request
// //   .get(uri)
// //   .on('response', function(response) {
// //    console.log(response.statusCode) // 200
// //  })
//
// const request = require('request');
// const gitHuh = request.defaults({
//   headers: { 'User-Agent': 'Seeker0' }
// });
// const baseUri = 'https://api.github.com/users';
//
// let getGit = (user, type) => {
//   gitHuh
//     .get(`${baseUri}/${user}/${type}`)
//     .on('error', err => console.error(err))
//     .on('response', response => {
//       console.log(response.statusCode);
//       console.log(response.headers);
//     });
// };
//
// getGit('Seeker0', 'repos');
//
// getGit('Seeker0', 'stars');
//
// getGit('Seeker0', 'profile');


function Votes(id) {
  this.url = `https://api.propublica.org/congress/v1/members/${id}/votes.json`;
  this.headers = {
    'X-API-Key': 'IFP9za6qpYxnKfgOPkJWFDtmxwXfI1TrCHek275a'
  }
}


console.log(new Votes('G000377'))
