import './style.scss';
import contentCreator from './helpers/contentCreator'

const body = document.querySelector('body')

const form = contentCreator.withText('form')

const cityInput = contentCreator.withPlaceholder('input', 'text', 'Enter City Name...')
form.appendChild(cityInput)

const submitBtn = contentCreator.withValue('input', 'submit', "Check Weather")
submitBtn.onclick = (e) => {
  e.preventDefault()
  alert(cityInput.value)
  cityInput.value = ''
}
form.appendChild(submitBtn)

body.appendChild(form)
