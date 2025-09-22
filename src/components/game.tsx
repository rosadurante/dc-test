import { useState } from "react";
import type { City, Score, Location } from "../type";
import Map from "./map";
import { getDistance } from "../utils";
import { useCities } from "../hooks";


export default function Game() {

  // Score: number of cities found and total KM left.
  const [score, setScore] = useState<Score>({ cities: 0, kms: 15000 });
  // Current city to reveal
  const [currentCity, setCurrentCity] = useState<City | null>(null);
  // Reveal city - get partial score: city 0/1 and kms distance
  const [partialScore, setPartialScore] = useState<Score | null>(null);
  // Marker position selected by the user
  const [marker, setMarker] = useState<Location | null>(null);

  // List of cities
  const cityList = useCities();

  const setNewCity = () => {
    // Update score
    setScore({ cities: score.cities + (partialScore?.cities || 0), kms: score.kms - (partialScore?.kms || 0) });
    // Choose new city
    setCurrentCity(cityList[Math.floor(Math.random() * cityList.length)]);
    // Reset partial score
    setPartialScore(null);
    // Reset marker
    setMarker(null);
  }

  const setNewGame = () => {
    // Reset score
    setScore({ cities: 0, kms: 15000 });
    // Choose new city
    setCurrentCity(cityList[Math.floor(Math.random() * cityList.length)]);
    // Reset partial score
    setPartialScore(null);
    // Reset marker
    setMarker(null);
  }

  const _getPartialScore = (marker: Location, currentCity: City) => {
    const distance = getDistance(marker, currentCity);
    return { cities: distance < 50 ? 1 : 0, kms: distance < 0 ? 0 : distance };
  }

  const revealSolution = () => {
    if (marker && currentCity) {
      setPartialScore(_getPartialScore(marker, currentCity));
    }
    
  }

  return (
    <div className="game">
      <header><h1>CITIES GAME</h1></header>

      <div className="score">
        <h2>Total KM: {score.kms > 0 ? score.kms : 0}</h2>
        <h2>Score: {score.cities}</h2>
      </div>

      {score.kms > 0 ? (
        <>
        <div>
            {!currentCity ? (
              <div className="feedback">
                <h3>Let's start!</h3>
                {cityList.length > 0 && <button onClick={setNewCity}>Start</button>}
              </div>
            ) : <h3 className="feedback">Find this city: {currentCity.name.toUpperCase()}</h3>}
            <div className="feedback">
            {currentCity && !marker ? (
              <p>Click on the map to set your marker</p>
            ) : currentCity && marker && !partialScore ? (
              <><p>City found?</p><button onClick={revealSolution}>Reveal Solution</button></>
            ) : currentCity && marker && partialScore && partialScore.cities > 0 ? (
              <><p>City found! Congrats!</p><button onClick={setNewCity}>Next city</button></>
            ) : currentCity && marker && partialScore && partialScore.cities === 0 ? (
              <><p>City not correct! Missed by {partialScore.kms} km! Try again!</p><button onClick={setNewCity}>Next city</button></>
              ) : null}
            </div>
          </div>
          {currentCity &&
            <div>
            <Map city={partialScore ? currentCity : null} marker={marker} setMarker={setMarker} />
            </div>
          }
        </>
      ) : (
        <div className="feedback">
            <h3>Game over!</h3>
            <button onClick={setNewGame}>Start again</button>
        </div>
      )}

    </div>
  )
}