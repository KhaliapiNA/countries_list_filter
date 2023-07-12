const countriesElem = document.querySelector('.countries');
const dropDown = document.querySelector('.dropDown');
const dropElem = document.querySelector('.drop');
const region = document.querySelectorAll('.region');
const search = document.querySelector('.search');
const toggle = document.querySelector('.toggle');
const moon = document.querySelector('.moon');
let res;

async function getCountry() {
    const url = await fetch('https://restcountries.com/v3.1/all');
    res = await url.json();
    //console.log(res);
    res.forEach(element => {
        showCountry(element);
    })
}

getCountry();

function showCountry(data) {
    const country = document.createElement('div');
    country.classList.add('country');
    country.innerHTML = `<div class="country-img">
            <img src="${data.flags.svg}" alt="">
        </div>
        <div class="country-info">
            <h5 class="countryName">${data.name.common}</h5>
            <p><strong>Population: </strong>${data.population}</p>
            <p class="regionName"><strong>Region: </strong>${data.region}</p>
            <p><strong>Capital: </strong>${data.capital}</p>
        </div>`;
    countriesElem.appendChild(country);
}

function deleteAllCountries() {
    document.querySelectorAll('.country')
        .forEach((countryElement) => countryElement.remove());
}

dropDown.addEventListener('click', () => {
    dropElem.classList.toggle('showDropDown');
});

region.forEach(elem => {
    elem.addEventListener('click', () => {
        deleteAllCountries()
        if (elem.innerText === 'All') {
            res.forEach(element => {
                showCountry(element);
            });
        } else {
            res.filter((c) => c.region.includes(elem.innerText))
                .forEach(element => {
                    showCountry(element);
                });
        }
    })
});
search.addEventListener('input', () => {
    deleteAllCountries()
    res.filter((c) => c.name.common.toLowerCase().includes(search.value.toLowerCase()))
        .forEach(element => {
            showCountry(element);
        });
});

toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    moon.classList.toggle('fas')
})
