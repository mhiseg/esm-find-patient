import React, { useState, useEffect } from "react";
import styles from "./searchPatient.scss";
import { SearchInput } from "../toobar_search_container/toolbar_search_container";
import PatientCard from "../patient-card/patient-card";
import {  getCurrentUserRoleSession, getPatient } from "../patient-getter.resource";
import { navigate, NavigateOptions } from "@openmrs/esm-framework";
import { useTranslation } from "react-i18next";

const SearchPatient: React.FC = () => {
  const [patients, setPatient] = useState([]);
  const { t } = useTranslation();
  const to: NavigateOptions = { to: window.spaBase + "/death/patient" };

  const [userfunction, setUserFunction] = useState('');
  async function onHandleChangeSearch(e) {
    if (e.currentTarget.value.trim().length !== 0) {
      getPatient(e.currentTarget.value).then((patients) => {
        setPatient(patients);
      });
    } else {
      setPatient([]);
    }
  }
  useEffect(()=>{
    getCurrentUserRoleSession().then(UserRole=>{
      setUserFunction(UserRole);
    })
   
  },[])
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
                return <PatientCard key={cadre.id} patient={cadre} userRole={userfunction} />
              })
              : null}
          </SearchInput>
        </div>
      </div>
    </>
  );
};

export default SearchPatient;
