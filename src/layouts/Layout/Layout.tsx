import { Link, NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useBurgerMenu } from "../../hooks/useBurgerMenu.hook";
import { ModalWarning } from "../../components/ModalWarning/ModalWarning";

function NavLayout() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const navListRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownLangRef = useRef<HTMLDivElement>(null);

  const { menu, dropdown, dropdownLang } = useBurgerMenu(
    wrapRef,
    dropdownRef,
    navListRef
  );

  const { t, i18n } = useTranslation();

  return (
    <div className={styles["wrap__no-scroll"]} ref={wrapRef}>
      <ModalWarning />
      <header className={styles["header"]}>
        <nav className={`${styles["nav"]} container`}>
          <Link to="/" reloadDocument>
            <img src="/logo.svg" alt="Лого" width="60" className={styles["logo"]} />
          </Link>

          <div
            className={`${styles["burger"]} ${
              menu.menuOpen ? styles["active"] : ""
            }`}
            onClick={() => menu.setMenuOpen(true)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className={styles["nav-list"]} ref={navListRef}>
            <div
              className={styles["nav-item"]}
              onClick={() => dropdown.setDropdownOpen(true)}
            >
              <img src="/pointer-icon.svg" alt="иконка курсора" width={30} />
              <span>{t("nav.item1")}</span>
              <img src="/arrow-down.svg" alt="стрелка вниз" width={30} />
              <div
                className={`${styles["dropdown"]} ${
                  dropdown.dropdownOpen ? styles["active"] : ""
                }`}
                ref={dropdownRef}
                style={
                  dropdown.dropdownOpen
                    ? { maxHeight: dropdownRef.current?.scrollHeight }
                    : { maxHeight: 0 }
                }
              >
                <ul className={styles["dropdown-list"]}>
                  <li className={styles["dropdown-item"]}>
                    <NavLink
                      to={"/1-second-test"}
                      className={({ isActive }) =>
                        isActive ? styles["active-link"] : ""
                      }
                      reloadDocument
                    >
                      1-{t("nav.seconds")}
                    </NavLink>
                  </li>
                  <li className={styles["dropdown-item"]}>
                    <NavLink
                      to={"/3-second-test"}
                      className={({ isActive }) =>
                        isActive ? styles["active-link"] : ""
                      }
                      reloadDocument
                    >
                      3-{t("nav.seconds")}
                    </NavLink>
                  </li>
                  <li className={styles["dropdown-item"]}>
                    <NavLink
                      to={"/5-second-test"}
                      className={({ isActive }) =>
                        isActive ? styles["active-link"] : ""
                      }
                      reloadDocument
                    >
                      5-{t("nav.seconds")}
                    </NavLink>
                  </li>
                  <li className={styles["dropdown-item"]}>
                    <NavLink
                      to={"/10-second-test"}
                      className={({ isActive }) =>
                        isActive ? styles["active-link"] : ""
                      }
                      reloadDocument
                    >
                      10-{t("nav.seconds")}
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>

            <NavLink to={"/right"} className={styles["nav-item"]} reloadDocument>
              <img src="/right-mouse.svg" alt="иконка пкм" width={30} />
              <span>{t("nav.item2")}</span>
            </NavLink>

            <div
              className={styles["nav-item"]}
              onClick={() => dropdownLang.setDropdownLangOpen(true)}
            >
              <span>{t("nav.lang.current")}</span>
              <img src="/arrow-down.svg" alt="стрелка вниз" width={30} />
              <div
                className={`${styles["dropdown"]} ${
                  dropdownLang.dropdownLangOpen ? styles["active"] : ""
                }`}
                ref={dropdownLangRef}
                style={
                  dropdownLang.dropdownLangOpen
                    ? { maxHeight: dropdownLangRef.current?.scrollHeight }
                    : { maxHeight: 0 }
                }
              >
                <ul className={styles["dropdown-list"]}>
                  <li className={styles["dropdown-item"]}>
                    <a onClick={() => i18n.changeLanguage("ru")}>Русский</a>
                  </li>
                  <li className={styles["dropdown-item"]}>
                    <a onClick={() => i18n.changeLanguage("en")}>Английский</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export default NavLayout;
