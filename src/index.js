import './style.scss';
import contentCreator from './helpers/contentCreator'

const key = 'c718936db7e8ffb4daa086761e71f389'

const body = document.querySelector('body')

const form = contentCreator.withText('form')

const cityInput = contentCreator.withPlaceholder('input', 'text', 'Enter City Name...')
form.appendChild(cityInput)

const submitBtn = contentCreator.withValue('input', 'submit', "Check Weather")
submitBtn.onclick = (e) => {
  e.preventDefault()
  getWeather(cityInput.value, key)
  cityInput.value = ''
}
form.appendChild(submitBtn)

body.appendChild(form)

const getWeather = async (cityName, key) => {
 const weatherBox = contentCreator.withText('p');
 try {
   const weatherResult = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`, { mode: 'cors'});
   const weatherJson = await weatherResult.json()

         weatherBox.innerHTML = weatherJson.main.feels_like
         console.log(weatherJson)
         document.body.appendChild(weatherBox)

 } catch(err) {
      console.log(err)
    }
}
