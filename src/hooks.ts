import { useState, useEffect } from "react";
import type { City } from "./type";
import cities from "./assets/cities.json";

export const useCities = () => {
  const [cityList, setCityList] = useState<City[]>([]);
  // Make sure cities aren't duplicated
  const citySet = new Set(cities.capitalCities.map(city => city.capitalCity.toLowerCase()));

  const _fetchCity = async (city: string): Promise<City | undefined> => {
    const url = `https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1`;
    const response = await fetch(url, { headers: { "User-Agent": "EuropeMapTest" } });
    const data = await response.json();
    if (data.length > 0) {
      return { name: city, lat: data[0].lat, long: data[0].lon } as City;
    }
  };
  
  const _fetchAllCities = async () => {
    const cities = Array.from(citySet);
    for (let i = 0; i < citySet.size; i++) {
      setTimeout(() => {
        _fetchCity(cities[i]).then(city =>
          setCityList((prev: City[]) => city ? [...prev, city] : prev)
        );
      }, 1100 * i);
    }
  };

  // To fetch all cities just once
  useEffect(() => {
    _fetchAllCities();
  }, []);

  return cityList;
};