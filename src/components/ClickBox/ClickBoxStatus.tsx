import { useTranslation } from "react-i18next";
import Button from "../Button/Button";
import styles from "./ClickBox.module.css";

interface ClickBoxStatusProps {
  isActive: boolean;
  isTimerEnd: boolean;
  clicks: number;
  reset: (timer: number) => void;
}

function ClickBoxStatus({
  isTimerEnd,
  isActive,
  clicks,
  reset,
}: ClickBoxStatusProps) {
  const currentTimer = localStorage.getItem("current-timer") ?? 1;

  const { t } = useTranslation();

  return (
    <div className={styles["click-box__field-status"]}>
      {!isTimerEnd && !isActive && <>{t("main.start")}</>}
      {isTimerEnd && (
        <>
          <span>
            {t("main.result")} - {clicks}
          </span>
          <Button className={styles["btn"]} onClick={() => reset(+currentTimer)}>
            Повторить
          </Button>
        </>
      )}
    </div>
  );
}

export default ClickBoxStatus;
