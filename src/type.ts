export type Point = {
  x: number;
  y: number;
}

export type Geo = {
  lat: number;
  long: number;
}

export type Location = {
  point: Point;
  geo: Geo;
}

export type City = {
  name: string;
  long: number;
  lat: number;
}

export type MapProps = {
  width: number;
  height: number;
  x: number;
  y: number;
  minLat: number;
  maxLat: number;
  minLong: number;
  maxLong: number;
}

export type Score = {
  cities: number;
  kms: number;
}
