import type { MapProps, Geo, Point, City, Location } from "./type";


  export const svgToGeo = (props: MapProps, point: Point): Geo => {
    const long = props.minLong + ((point.x - props.x) / (props.width)) * (props.maxLong - props.minLong);
    const lat = props.maxLat - ((point.y - props.y)) / (props.height) * (props.maxLat - props.minLat);

    return { lat, long };
  }

  export const geoToSvg = (props: MapProps, geo: Geo): Point => {
    const x = props.x + ((geo.long - props.minLong) / (props.maxLong - props.minLong)) * props.width;
    const y = props.y + ((props.maxLat - geo.lat) / (props.maxLat - props.minLat)) * props.height;

    return { x, y };
  }

export const getDistance = (marker: Location, city: City) => {
  const markerGeo = marker.geo;
  const cityGeo = { lat: city.lat, long: city.long };

  const _toRad = (value: number) => {
    return value * (Math.PI / 180);
  }
      
  // Harvesine formula
  const r = 6371;
  const dLat = _toRad(cityGeo.lat - markerGeo.lat);
  const dLong = _toRad(cityGeo.long - markerGeo.long);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(_toRad(markerGeo.lat))
      * Math.cos(_toRad(cityGeo.lat))
      * Math.sin(dLong / 2)
      * Math.sin(dLong / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(r * c);

  }