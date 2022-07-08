import { navigate, NavigateOptions } from "@openmrs/esm-framework";
import { Button, Tile } from "carbon-components-react";
import React from "react";
import { useTranslation } from "react-i18next";
import EmptyDataIllustration from "../toobar_search_container/empty-data-illustration.component";
import styles from "../toobar_search_container/toolbar_search_container.scss";

export const PatientCardNotFound = function () {
  const { t } = useTranslation();
  const to: NavigateOptions = { to: window.spaBase + "/death/patient" };
  return (
    <>
      <p className={styles.resultsText}>
        {t("noResultsFound", "No results found")}
      </p>
      <Tile className={styles.emptySearchResultsTile}>
        <EmptyDataIllustration />
        <p className={styles.emptyResultText}>
          {t(
            "noPatientChartsFoundMessage",
            "Sorry, no patient charts have been found"
          )}
        </p>
        <p className={styles.actionText}>
          <span>
            {t(
              "trySearchWithPatientUniqueID",
              "Try searching with the patient's unique ID number"
            )}
          </span>
          <br />
          <span>{t("orPatientName", "OR the patient's name(s)")}</span>
        </p>
        <Button
          className={styles.ButtonAdd}
          onClick={() => {
            navigate(to);
          }}
        >
          {t("New patient")}
        </Button>
      </Tile>
    </>
  );
};
