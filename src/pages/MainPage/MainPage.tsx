import { useParams } from "react-router-dom";
import ClickBox from "../../components/ClickBox/ClickBox";
import styles from "./MainPage.module.css";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../providers/ThemeProvider";
import Button from "../../components/Button/Button";
import { useTranslation } from "react-i18next";
export type typeClick = "left" | "right";

function MainPage({ type }: { type: typeClick }) {
  const [theme, setTheme] = useContext(ThemeContext);
  const [fullScreen, setFullScreen] = useState(false);

  const { t } = useTranslation();

  function changeTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  let { second = "1" } = useParams();
  second = second.split("-")[0];

  useEffect(() => {
    localStorage.setItem("current-timer", second);
  }, [second]);

  return (
    <>
      <div className="container">
        <div className={styles["desc"]}>
          <h1>{t("main.heading")}</h1>
          <p>{t("main.desc")}</p>
        </div>
        <section
          className={`${styles["click-box__section"]} ${
            fullScreen ? styles["fullscreen"] : ""
          }`}
        >
          <div className={styles["params"]}>
            <div className={styles["toggle-theme"]}>
              <label className={styles["switch"]}>
                <input
                  type="checkbox"
                  className={styles["switch-input"]}
                  onChange={changeTheme}
                  checked={theme === "dark" ? true : false}
                />
                <span className={styles["switch-slider"]}></span>
              </label>
              <span>{t("main.changeTheme")}</span>
            </div>
            <Button
              className={styles["btn"]}
              onClick={() => setFullScreen(!fullScreen)}
            >
              {t("main.screenMode")}
            </Button>
          </div>
          <ClickBox timer={+second} type={type} fullScreen={fullScreen} />
        </section>

        <section className={styles["how-to-start"]}>
          <h1>{t("howToStart.heading")}</h1>
          <div className={styles["manual-list"]}>
            <div className={styles["manual-item"]}>
              <span className={styles["pagination"]}>1</span>
              <div className={styles["manual-info"]}>
                <h3>{t("howToStart.item1.heading")}</h3>
                <p>{t("howToStart.item1.desc")}</p>
              </div>
            </div>

            <div className={styles["manual-item"]}>
              <span className={styles["pagination"]}>2</span>
              <div className={styles["manual-info"]}>
                <h3>{t("howToStart.item2.heading")}</h3>
                <p>{t("howToStart.item2.desc")}</p>
              </div>
            </div>

            <div className={styles["manual-item"]}>
              <span className={styles["pagination"]}>3</span>
              <div className={styles["manual-info"]}>
                <h3>{t("howToStart.item3.heading")}</h3>
                <p>{t("howToStart.item3.desc")}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default MainPage;
