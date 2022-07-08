import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import styles from "../patient-card/patient-card.scss";
import style from "./PopoverButton.scss";
import { useTranslation } from "react-i18next";

export const PopoverButton = ({ children }) => {
  const { t } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <>
      <Icon
        className={`${styles.align} ${styles.pm0}  ${styles.iconMenu}`}
        icon="charm:menu-kebab"
        aria-expanded={showMenu}
        id="custom-actions-overflow-menu-trigger"
        aria-controls="custom-actions-overflow-menu"
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      />
      <div
        ref={wrapperRef}
        data-overflow-menu
        className="bx--overflow-menu-options bx--overflow-menu--flip"
        tabIndex={0}
        data-floating-menu-direction="bottom"
        role="menu"
        aria-labelledby="custom-actions-overflow-menu-trigger"
        id={style["custom-actions-overflow-menu"]}
        style={{
          display: showMenu ? "block" : "none",
        }}
      >
        <ul className="bx--overflow-menu-options__content">{children}</ul>
        <span />
      </div>
    </>
  );
};
