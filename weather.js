const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/weather",
};

window.addEventListener("DOMContentLoaded", (event) => {
    const searchbox = document.querySelector('input[type="text"]');
    if (searchbox) {
        searchbox.addEventListener("keypress", search);
    }
});

function getResults(query) {
    fetch(`${api.base}?q=${query}&units=metric&appid=${api.key}`)
        .then((weather) => {
            return weather.json();
        })
        .then((response) => {
            displayResults(response);
        });
}

function search(event) {
    if (event.keyCode == 13) {
        getResults(event.target.value);
    }
}

function displayResults(data) {
    let ele = queryElements();
    if (data.cod !== 200) {
        Object.keys(queryElements()).forEach((element) => {
            if (element === "errMsg") {
                ele[element].innerHTML = "Something went wrong.Pls retry.";
            } else {
                ele[element].innerHTML = "";
            }
        });
    } else {
        const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
        ele.errMsg.innerHTML = "";
        ele.city_name.innerHTML = `${data.name}, ${regionNames.of(data.sys.country)}`;
        ele.city_date.innerHTML = showDate();
        ele.temp.innerHTML = `${Math.round(data.main.temp)}\u00B0c`;
        ele.weather.innerHTML = data.weather[0].main;
        ele.min_max_temp.innerHTML = `${Math.round(data.main.temp_min)}\u00B0c / ${Math.round(data.main.temp_max)}\u00B0c`;
    }
}

function showDate() {
    let date = new Date();
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return `${weekday[date.getDay()]} ${date.getDate()} ${monthNames[date.getMonth()]
        } ${date.getFullYear()}`;
}

function queryElements() {
    let elements = {};
    elements.errMsg = document.querySelector(".error-msg");
    elements.city_name = document.querySelector(".city-data .city-name");
    elements.city_date = document.querySelector(".city-data .city-date");
    elements.temp = document.querySelector(".temp-info .temp");
    elements.weather = document.querySelector(".temp-info .weather");
    elements.min_max_temp = document.querySelector(".temp-info .min-max-temp");
    return elements;
}