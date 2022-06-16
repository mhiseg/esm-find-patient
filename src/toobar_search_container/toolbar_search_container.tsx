import React, { useState, useEffect, useRef } from "react";
import styles from "./toolbar_search_container.scss";
import Add from "@carbon/icons-react/es/add/32";
import SearchIcon from "@carbon/icons-react/es/search/16";
import { Button, Tile } from "carbon-components-react";
import { Icon } from "@iconify/react";
import EmptyDataIllustration from "./empty-data-illustration.component";
import { useTranslation } from "react-i18next";
import { navigate, NavigateOptions } from "@openmrs/esm-framework";

export function SearchInput({ onChangeInput, onClickChangeButton, children }) {
  const [isActiveSearchIcon, setActiveSearchIcon] = useState(false);
  const [isActiveRemoveIcon, setActiveRemoveIcon] = useState(true);
  const [isSearching, setSearching] = useState(false);
  const input = useRef(null);
  const searchboxResult = useRef(null);
  const { t } = useTranslation();

  const toggleClass = (e) => {
    if (e.currentTarget.id == styles.removeIcon) {
      children = null;
      searchboxResult.current = "";
      setActiveRemoveIcon(!isActiveRemoveIcon);
      setActiveSearchIcon(!isActiveSearchIcon);
      input.current.value = "";
      setSearching(false);
    }
    if (e.currentTarget.id == styles.searchIcon) {
      input.current.focus();
    }
  };

  const onInputChange = (e) => {
    if (input.current.value.trim().length == 0) {
      setActiveRemoveIcon(true);
      setActiveSearchIcon(false);
    } else {
      setActiveRemoveIcon(false);
      setActiveSearchIcon(true);
    }
  };

  useEffect(() => {
    if (input.current.value.trim().length == 0) {
      setActiveRemoveIcon(true);
      setActiveSearchIcon(false);
    }
    if (children != null) {
      setSearching(true);
    } else {
      setSearching(false);
    }
  }, [children]);

  return (
    <div>
      <i className={styles.SearchIcon}>
        <SearchIcon
          id={styles.searchIcon}
          className={isActiveSearchIcon ? styles["SearchIconChild"] : ""}
          onClick={toggleClass}
        />
        <Icon
          icon="gridicons:cross-small"
          id={styles.removeIcon}
          className={isActiveRemoveIcon ? styles["SearchIconChild"] : ""}
          onClick={toggleClass}
        />
      </i>
      <input
        ref={input}
        name="search"
        type="text"
        placeholder={t("Search")}
        className={styles["search-1"]}
        autoComplete="off"
        onChange={onChangeInput}
        onInput={onInputChange}
      />
      <Button
        renderIcon={Add}
        iconDescription=""
        hasIconOnly
        onClick={onClickChangeButton}
        className={styles.Button}
        size="sm"
      />
      <div
        className={isSearching ? styles.searchResults_Show : styles.desactive}
      >
        <div
          ref={searchboxResult}
          className={styles.searchResults_ShowChildren}
        >
          {isSearching && children}
        </div>
      </div>
    </div>
  );
}
