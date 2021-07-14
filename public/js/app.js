console.log('client side javascript fie is loaded');

const weatherForm = document.querySelector("form")
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')
    // msg2.textContent = "From javaScript1"

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const location = search.value

    msg1.textContent = ' loading.......'

    fetch('/weather?address=' + location + ".").then((Response) => {
        Response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error;
            } else {
                msg1.textContent = data.location;
                msg2.textContent = data.Forecast;
            }
        })
    })

})