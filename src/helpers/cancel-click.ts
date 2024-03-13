import { MouseEvent } from "react";
import { typeClick } from "../pages/MainPage/MainPage";

export function cancelClick(type: typeClick, event: MouseEvent) {
  switch (type) {
    case "left":
      return event.button !== 0;
    case "right":
      return event.button !== 2;
  }
}
