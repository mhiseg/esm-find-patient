import React, { useEffect, useState } from "react";
import styles from "./searchPatient.scss";
import { SearchInput } from "../toobar_search_contener/toolbar_search_container";
import PatientCard from "../patient-card/patient-card";
import { getPatient } from "../patient-getter.resource";
import { navigate, NavigateOptions } from "@openmrs/esm-framework";
const SearchPatient: React.FC = () => {
  const [Patients, setPatient] = useState([]);
  const [listPatient, setListPatient] = useState([]);
  const to: NavigateOptions = { to: window.spaBase + "/death/add-patient" };
  useEffect(() => {
    setPatient(ListPatient);
  }, [ListPatient]);

  async function onHandleChangeSearch(e) {
    if (e.currentTarget.value.trim().length !== 0) {
      setListPatient(await getPatient(e.currentTarget.value));
      console.log(listPatient)
    } else {
      setListPatient([]);
    }
  }

  return (
    <>
    <br/> <br/> <br/> <br/> <br/>
    
        <div className={styles.SearchPatient}>
          <SearchInput
            onChangeInput={onHandleChangeSearch}
            onClickChangeButton={() => {
              navigate(to);
            }}
          >
            {Patients.length > 0
              ? Patients.map((cadre) => {
                  return <PatientCard key={cadre.id} Patient={cadre} />;
                })
              : null}
          </SearchInput>
        </div>
    </>
  );
};

export default SearchPatient;
