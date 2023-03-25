import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';


const DEBOUNCE_DELAY = 300;
const searchBoxEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBoxEl.addEventListener('input', debounce(handleSearchInput, DEBOUNCE_DELAY));


function handleSearchInput() {
  const searchQuery = searchBoxEl.value.trim();

  if (searchQuery === '') {
      clearFields();
    return;
  }

  fetchCountries(searchQuery)
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
      }

        if (data.length >= 2) {
          console.log(data);
            const countryListMarkup = createCountryListMarkup(data);
            countryList.insertAdjacentHTML('beforeend', countryListMarkup);
        return;
      }

        if (data.length === 1) { 
        const countryInfoMarkup = createCountryInfoMarkup(data[0]);
        countryList.insertAdjacentHTML('beforeend', countryInfoMarkup);
        return;
      }

    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
        clearFields();
    });
}

function createCountryListMarkup(countryList) {
  return countryList
    .map(
      country => `
      <li class="country-list__item">
        <img src="${country.flags.svg}" alt="${country.flags.alt}" width="50">
        <span>${country.name.official}</span> 
      </li>
    `,
    )
    .join('');
}


function createCountryInfoMarkup({
  name,
  capital,
  population,
  flags,
  languages,
}) {
    return `
    <div class="info__header">
        <img src="${flags.png}" alt="${flags.alt}" class="info__img" />
        <h2 class="info__name">${name.official}</h2>
    </div>
    <ul class="info__list">
    <li class="info__item">
        <h3 class="item__key">Capital:</h3>
        <span class="item__value">${capital}</span>
    </li>
    <li class="info__item">
        <h3 class="item__key">Population:</h3>
        <span class="item__value">${population.toLocaleString()}</span>
    </li>
    <li class="info__item">
        <h3 class="item__key">Languages:</h3>
        <ul class="list__languages">
            ${renderLanguages(languages)}
        </ul> 
    </li>
    </ul>
    `;
}

function renderLanguages(languages) {
  return Object.values(languages)
    .map(lang => `<li class="languages__item">${lang}</li>`)
    .join(' ');
}

 function clearFields() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';   
}
