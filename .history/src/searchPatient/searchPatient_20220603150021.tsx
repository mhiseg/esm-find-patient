import React, { useEffect, useState } from "react";
import styles from "./searchPatient.scss";
import { SearchInput } from "../toobar_search_contener/toolbar_search_container";
import PatientCard from "../patient-card/patient-card";
import { getPatient } from "../patient-getter.resource";
import { navigate, NavigateOptions } from "@openmrs/esm-framework";
<<<<<<< HEAD

=======
import { useTranslation } from "react-i18next";
>>>>>>> 8846e868d2bce1501953c57545b23666974f1da2
const SearchPatient: React.FC = () => {
  const [patients, setPatient] = useState([]);
  const [listPatient, setListPatient] = useState([]);
  const { t } = useTranslation();
  const to: NavigateOptions = { to: window.spaBase + "/death/add-patient" };

  useEffect(() => {
    setPatient(listPatient);
  }, [listPatient]);

  async function onHandleChangeSearch(e) {
    if (e.currentTarget.value.trim().length !== 0) {
      setListPatient(await getPatient(e.currentTarget.value));
    } else {
      setListPatient([]);
    }
  }

  return (
    <>
      <h4 className={`title-page`}>{t("searchPatient", "Find a patient")}</h4>
      <div className={`mhiseg-main-content `}>
        <div className={styles.SearchPatient}>
          <SearchInput
            onChangeInput={onHandleChangeSearch}
            onClickChangeButton={() => {
              navigate(to);
            }}
          >
            {patients.length > 0
              ? patients.map((cadre) => {
                  return <PatientCard key={cadre.id} Patient={cadre} />;
                })
              : null}
          </SearchInput>
        </div>
      </div>
    </>
  );
};

export default SearchPatient;
