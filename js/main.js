const weatherRegion = document.querySelector('.weather__region')
const weatherImage = document.querySelector('.weather__image')
const weatherDegree = document.querySelector('.weather__degree')
const weatherDesc = document.querySelector('.weather__desc')
const searchForm = document.querySelector('.search__form')
const searchInput = document.querySelector('.search__input')
let forecastday = document.querySelector('.forecastday')
let dailyWeather = document.querySelector('.dailyWeather')



// https://api.weatherapi.com/v1/forecast.json?key=644f6ce0ca9e401ebb891832211707&q=Tashkent&days=7&aqi=yes&alerts=yes

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(searchInput.value);
    getWeatherData(searchInput.value)
})

document.addEventListener('DOMContentLoaded', () => {
    getWeatherData()
})

async function getWeatherData(region = 'Tashkent') {
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=644f6ce0ca9e401ebb891832211707&q=${region}&days=7&aqi=yes&alerts=yes`)
    data
        .json()
        .then(res => renderWeather(res))
        .catch(err => console.log(err))
}

function renderWeather(data) {
    console.log(data);
    weatherRegion.innerHTML = `${data.location.name}. ${data.location.country}`
    weatherDegree.textContent = `${data.current.temp_c}°`
    weatherImage.src = `${data.current.condition.icon}`
    weatherDesc.textContent = `${data.current.condition.text}`

    let forecastItems = ''
    let date = new Date()
    let nowHour = date.getHours()

    console.log(data.forecast.forecastday[0].hour);
    data.forecast.forecastday[0].hour.slice(nowHour + 1).forEach((hour) => {
        forecastItems += `
        <div class="forecastday__item">
            <p>${hour.time.split(' ')[1]}</p>
            <img src="${hour.condition.icon}" alt="">
            <p>${hour.temp_c}°</p>
        </div>
`
    })

    forecastday.innerHTML = forecastItems



    let dailyWeatherItems = `
    <div class="dailyWeather__item">
            <div class="day">
                <h3>Day</h3>
            </div>
            <div class="temperature">
                <h2>Temperature</h2>
            </div>
            <p>Description</p>
            <p>Precipitation</p>
        </div>
    `

    data.forecast.forecastday.forEach((el) => {
        dailyWeatherItems += `
        <div class="dailyWeather__item">
            <div class="day">
                <h3>${el.date}</h3>
            </div>
            <div class="temperature">
                <div class="temperature__img">
                    <img src="${el.day.condition.icon}" alt="">
                </div>
                <div class="temperature__info">
                    <p>${el.day.maxtemp_c}°</p>
                    <p>${el.day.mintemp_c}°</p>
                </div>
            </div>
            <p>${el.day.condition.text}</p>
            <p>${el.day.avgtemp_c}%</p>
        </div>
        `
    })
    dailyWeather.innerHTML = dailyWeatherItems

}


