import headerBackground from './assets/atmosphere-earth.jpeg';
import './style.scss';
import contentCreator from './helpers/contentCreator'
import {clearContent } from './helpers/helpers'
import { getWeather, chooseUnit } from './helpers/display'
// import jquery from "https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"
// import locations from "http://lab.iamrohit.in/js/location.js"

//token MXEjbMzVZQcrWZBkdrvjD50I6mJ0IAfCHA8EIv04qOx4-W_OrKdzs7hjryGMXX1BKuM
//for https://www.universal-tutorial.com/rest-apis/free-rest-api-for-country-state-city

// const key = 'c718936db7e8ffb4daa086761e71f389'

const body = document.querySelector('body')

const header = contentCreator.withText('img', '', 'header')
// header.style.backgroundImage = headerBackground
header.src = headerBackground
body.appendChild(header)

const form = contentCreator.withText('form')

const cityInput = contentCreator.withPlaceholder('input', 'text', 'Enter City Name...')
cityInput.autofocus = true
form.appendChild(cityInput)

const weatherBox = contentCreator.withText('div', '', 'weatherBox')

const printTime = contentCreator.withText('p')

const submitBtn = contentCreator.withValue('input', 'submit', "Check Weather", 'submit')
submitBtn.onclick = (e) => {
  e.preventDefault()
  clearContent(weatherBox)
  const before = Date.now();
  // alert(document.querySelector('radio'))
  getWeather(cityInput.value, weatherBox, unit).then(() => {
    const after = Date.now();
    printTime.textContent = `Your request took ${((after - before)/1000)} seconds to complete`
  });
  cityInput.value = ''
}
form.appendChild(submitBtn)

const unitF = contentCreator.withLabel('input', 'radio', 'F', 'radio', 'F', 'unit')
form.appendChild(unitF)
const unitC = contentCreator.withLabel('input', 'radio', 'C', 'radio', 'C', 'unit')
form.appendChild(unitC)

// const radioF = document.querySelector('#F')
// radioF.checked = true


// radioF.onchange = () => {
//   alert('hello')
// }

// radioF.onchange = () => {
//   alert('hello')
//   // chooseUnit()
// }


body.appendChild(form)

const unit = 'metric'

if(localStorage['radioC'] == undefined){
  localStorage['radioC'] = true
}

const radioC = document.getElementById('C')
radioC.checked = localStorage['radioC']
radioC.onclick = () => {
  localStorage['radioC'] = true
  localStorage['radioF'] = false
  unit = 'metric'
}

const radioF = document.getElementById('F')
radioF.checked = localStorage['radioF']
radioF.onclick = () => {
  localStorage['radioF'] = true
  localStorage['radioC'] = false
  unit = 'imperial'
}
getWeather('vilnius', weatherBox)

body.appendChild(weatherBox);

body.appendChild(printTime);
