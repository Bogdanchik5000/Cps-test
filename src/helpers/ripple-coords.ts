import { MouseEvent, RefObject } from "react";

function getRippleCoords(elem: RefObject<HTMLDivElement>, event: MouseEvent) {
  if (!elem.current) return { top: 0, left: 0 };
  const rect = elem.current.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return { top: y, left: x };
}

export default getRippleCoords;
