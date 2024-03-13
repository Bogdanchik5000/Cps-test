import device from "current-device";
import styles from "./ModalWarning.module.css";
import { useEffect, useState } from "react";

export function ModalWarning() {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(device.type === "desktop" ? false : true);
  }, []);
  return (
    <div
      className={`${styles["modal-container"]} ${isActive ? styles["active"] : ""}`}
    >
      <div className={styles["modal-content"]}>
        <span>
          На устройствах с сенсорным экраном КПС тест может работатать некорректно
        </span>
        <span className={styles["modal-close"]} onClick={() => setIsActive(false)}>
          &#10006;
        </span>
      </div>
    </div>
  );
}
