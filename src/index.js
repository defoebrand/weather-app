import headerBackground from './assets/atmosphere-earth.jpeg';
import './style.scss';
import contentCreator from './helpers/contentCreator'
import {
  getWeather,
  runSearch
} from './helpers/display'

const body = document.querySelector('body')

const header = contentCreator.withText('img', '', 'header')
header.src = headerBackground
body.appendChild(header)

const form = contentCreator.withText('form')

const weatherBox = contentCreator.withText('div', '', 'weatherBox')

const printTime = contentCreator.withText('p')

const errorMsg = contentCreator.withText('p', '', 'errors')

const cityInput = contentCreator.withPlaceholder('input', 'text', 'Enter City Name...')
cityInput.autofocus = true
form.appendChild(cityInput)

const submitBtn = contentCreator.withValue('input', 'submit', "Check Weather", 'submit')
submitBtn.onclick = (e) => {
  e.preventDefault()
  runSearch(cityInput, printTime)
}
form.appendChild(submitBtn)

form.appendChild(contentCreator.withLabel('input', 'radio', 'F', 'radio', 'F', 'unit'))

form.appendChild(contentCreator.withLabel('input', 'radio', 'C', 'radio', 'C', 'unit'))

body.appendChild(form)

body.appendChild(weatherBox);

body.appendChild(printTime);

body.appendChild(errorMsg);

const radioC = document.getElementById('C')
radioC.checked = true
radioC.onclick = () => {
  getWeather(document.querySelector('.cityName').textContent)
}
const radioF = document.getElementById('F')
radioF.onchange = () => {
  getWeather(document.querySelector('.cityName').textContent)
}

getWeather('vilnius')