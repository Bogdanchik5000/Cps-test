import { RefObject, useCallback, useEffect, useState } from "react";

type RefType = RefObject<HTMLDivElement>;
export function useBurgerMenu(
  wrapRef: RefType,
  dropdownRef: RefType,
  navListRef: RefType
) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownLangOpen, setDropdownLangOpen] = useState(false);

  const clickHandler = useCallback(
    (e: MouseEvent) => {
      if (menuOpen) {
        //Закрываем бургер меню если клик не в области меню
        if (!navListRef.current?.contains(e.target as Node)) setMenuOpen(false);

        //Закрываем дропдауны при клике в области меню
        if (navListRef.current?.contains(e.target as Node)) {
          setDropdownOpen(false);
          setDropdownLangOpen(false);
        }
      }
    },
    [navListRef, menuOpen]
  );

  //Установка css-переменной для отсутпа под аккордионом
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--margin-bottom",
      `${dropdownRef.current?.scrollHeight}px`
    );
  }, [dropdownOpen, dropdownRef]);

  //Добавление и удаление прослушивателя при монтировании и размонтировании
  useEffect(() => {
    //Неизменная ссылка на wrap
    const currentWrapRef = wrapRef.current;
    //Добавление и удаление прослушивателя
    currentWrapRef?.addEventListener("click", clickHandler);
    return () => currentWrapRef?.removeEventListener("click", clickHandler);
  }, [wrapRef, clickHandler]);

  return {
    menu: { menuOpen, setMenuOpen },
    dropdown: { dropdownOpen, setDropdownOpen },
    dropdownLang: { dropdownLangOpen, setDropdownLangOpen },
  };
}
