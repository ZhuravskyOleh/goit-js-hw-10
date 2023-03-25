const BASE_URL = 'https://restcountries.com/v3.1/name/'


export const fetchCountries = countryName =>
  fetch(`${BASE_URL}${countryName}?fields=name,capital,population,flags,languages`).then(
    res => {
      if (!res.ok) {
        throw new Error(response.status);
      }

      return res.json();
    }
  );
  
