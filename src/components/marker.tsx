

import Needle from "./needle";
import type { Point } from "../type";

export default function Marker({ position, color }: { position: Point, color?: string | null }) {
  return (
    <g transform={`translate(${position.x}, ${position.y})`}>
      <Needle color={color || "white"} />
    </g>
  );
}