const form = document.querySelector('form')
const input= document.querySelector('input')
const button = document.querySelector('button')
const paragraph1 = document.querySelector('#message-1')
const paragraph2 = document.querySelector('#message-2')
let address



form.addEventListener('submit', (e) =>{

    e.preventDefault()
    paragraph1.textContent = 'Loading...'
    paragraph2.textContent = ''
    address = input.value
    fetchWeatherForm(address)
    input.value= ''
})

function fetchWeatherForm(address) {
   fetch('/weather?address='+address)
.then(res => res.json().then(data => {
  if (data.error) {
    paragraph1.textContent = data.error
    paragraph2.textContent = ''
  } else {
    paragraph1.textContent = data.location
    paragraph2.textContent = data.forecast
  }
})
) 
}
