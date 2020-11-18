import './style.scss';
import contentCreator from './helpers/contentCreator'
import {clearContent} from './helpers/helpers'

const key = 'c718936db7e8ffb4daa086761e71f389'

const body = document.querySelector('body')

const form = contentCreator.withText('form')

const weatherBox = contentCreator.withText('div', '', 'weatherBox')
const cityInput = contentCreator.withPlaceholder('input', 'text', 'Enter City Name...')
cityInput.autofocus = true
form.appendChild(cityInput)

const submitBtn = contentCreator.withValue('input', 'submit', "Check Weather")
submitBtn.onclick = (e) => {
  e.preventDefault()
  clearContent(weatherBox)
  getWeather(cityInput.value, key)
  cityInput.value = ''
}
form.appendChild(submitBtn)

body.appendChild(form)

body.appendChild(weatherBox);

const getWeather = async (cityName, key) => {
  const weatherBox = document.querySelector('.weatherBox')
 try {
   const weatherResult = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`, { mode: 'cors'});
   const weatherJson = await weatherResult.json()
     console.log(weatherJson)
//somefunction
         weatherBox.innerHTML = weatherJson.clouds.all + '% Cloudy'
         document.body.appendChild(weatherBox)
//endfunction
 } catch(err) {
      console.log(err)
    }
  // return weatherBox
}
