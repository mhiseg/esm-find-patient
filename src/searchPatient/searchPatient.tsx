import React, { useState } from "react";
import styles from "./searchPatient.scss";
import { SearchInput } from "../toobar_search_container/toolbar_search_container";
import PatientCard from "../patient-card/patient-card";
import { getPatient } from "../patient-getter.resource";
import { navigate, NavigateOptions } from "@openmrs/esm-framework";
import { useTranslation } from "react-i18next";
import { PatientCardNotFound } from "../patient-card/patient-card-not-found";
const SearchPatient: React.FC = () => {
  const [patients, setPatient] = useState([]);
  const [patientNotFound, setPatientNotFound] = useState(undefined);
  const { t } = useTranslation();
  const to: NavigateOptions = { to: window.spaBase + "/death/patient" };

  async function onHandleChangeSearch(e) {
    if (e.currentTarget.value.trim().length !== 0) {
      getPatient(e.currentTarget.value).then((patients) => {
        setPatient(patients);
        setPatientNotFound(patients === undefined);
      });
    } else {
      setPatient([]);
      setPatientNotFound(false);
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
<<<<<<< HEAD
            {patients.length > 0
              ? patients.map((cadre) => {
                  return <PatientCard key={cadre.id} patient={cadre} />
                })
              : null}
=======
            {
              patients?.length > 0 &&
              patientNotFound === false &&
              patients.map((cadre) => {
                return <PatientCard key={cadre.id} patient={cadre} />;
              })
            }
            {patientNotFound === true ? <PatientCardNotFound /> : ""}
>>>>>>> 912c678f78fe3802c0f6a6ffbec0f645594b8d8b
          </SearchInput>
        </div>
      </div>
    </>
  );
};

export default SearchPatient;
