import { MouseEvent, useEffect, useRef, useState } from "react";
import styles from "./ClickBox.module.css";
import { observer } from "mobx-react-lite";
import clickStore from "../../store/click.store";
import getRippleCoords from "../../helpers/ripple-coords";
import ClickBoxStatus from "./ClickBoxStatus";
import countClick from "../../helpers/count-click";
import { typeClick } from "../../pages/MainPage/MainPage";
import { cancelClick } from "../../helpers/cancel-click";
import { useTranslation } from "react-i18next";

interface Ripple {
  id: number;
  left: number;
  top: number;
}

interface ClickBoxProps {
  timer: number;
  type: typeClick;
  fullScreen: boolean;
}

function changeTimer(value: number) {
  if (clickStore.isActive) return;
  clickStore.changeTimer(value);
}

const ClickBox = observer(({ timer, type, fullScreen }: ClickBoxProps) => {
  const fieldRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const { t } = useTranslation();

  useEffect(() => {
    clickStore.setTimer(timer);
  }, [timer]);

  function handleMouseDown(e: MouseEvent) {
    //Обработка нужной кнопки мыши
    if (cancelClick(type, e) || clickStore.isTimerEnd) return;

    // Анимация
    const { left, top } = getRippleCoords(fieldRef, e);
    const id = ripples.length ? Math.max(...ripples.map((r) => r.id)) + 1 : 1;
    setRipples([...ripples, { id, left, top }]);

    //Счет кликов и таймера
    countClick(clickStore);
  }

  function deleteRipples(ripple: Ripple) {
    setRipples((prevRipples) => prevRipples.filter((r) => r.id !== ripple.id));
  }

  return (
    <div
      className={`${styles["click-box"]} ${fullScreen ? styles["fullscreen"] : ""}`}
    >
      <div className={styles["click-box__info"]}>
        <div className={styles["timer"]}>
          <div className={styles["timer-header"]}>
            <span className={styles["big-nums"]}>{+clickStore.timer}</span>
            <div className={styles["change-time"]}>
              <img
                className={styles["triangle-icon"]}
                src="/triangle.svg"
                alt="иконка переключателя вверх"
                onClick={() => changeTimer(1)}
              />
              <img
                className={styles["triangle-icon"]}
                src="/triangle.svg"
                alt="иконка переключателя вниз"
                onClick={() => changeTimer(-1)}
              />
            </div>
          </div>
          <span>{t("main.timer")}</span>
        </div>

        <div className={styles["speed"]}>
          <span className={styles["big-nums"]}>0.00</span>
          <span>{t("main.cps")}</span>
        </div>

        <div className={styles["clicks"]}>
          <span className={styles["big-nums"]}>{clickStore.clicks}</span>
          <span>{t("main.clicks")}</span>
        </div>
      </div>
      <div
        className={styles["click-box__field"]}
        ref={fieldRef}
        onMouseDown={handleMouseDown}
        onContextMenu={(e) => e.preventDefault()}
      >
        <ClickBoxStatus
          isTimerEnd={clickStore.isTimerEnd}
          isActive={clickStore.isActive}
          clicks={clickStore.clicks}
          reset={clickStore.reset}
        />
        {ripples.map((r) => (
          <span
            key={r.id}
            className={styles["ripple"]}
            style={{ top: r.top, left: r.left }}
            onAnimationEnd={() => deleteRipples(r)}
          />
        ))}
      </div>
    </div>
  );
});

export default ClickBox;
