import './style.scss';

const body = document.querySelector('body')

const form = document.createElement('form')

const cityInput = document.createElement('input')
cityInput.type = 'text'
cityInput.placeholder = 'Enter City Name...'
form.appendChild(cityInput)

const submitBtn = document.createElement('input')
submitBtn.type = 'submit'
submitBtn.value = "Check Weather"
submitBtn.onclick = (e) => {
  e.preventDefault()
  alert(cityInput.value)
}
form.appendChild(submitBtn)

body.appendChild(form)
