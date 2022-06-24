import React from "react";
import { Button, Column, Grid, Row, Tile } from "carbon-components-react";
import { Icon } from "@iconify/react";
import styles from "./patient-card.scss";
import PatientCardCell from "./patient-cardCell";
<<<<<<< HEAD
import { useTranslation } from "react-i18next";
import { navigate, NavigateOptions } from "@openmrs/esm-framework";
import RelationShipCard from "../relationShipCard/relationShiphCard";
import { Patient } from "../types";

export interface PatientCardProps {
  patient: Patient
}
const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  const { t } = useTranslation();
  const declare: NavigateOptions = {
    to: window.spaBase + "/death/patient/" + patient.id,
  };
  const valided: NavigateOptions = {
    to: window.spaBase + "/death/validate/patient/" + patient.id,
  };
  function onClickChangePatientCard(e) {
    navigate(declare);
  }
  return (
    <Tile
      onClick={onClickChangePatientCard}
      className={styles.cardBox}
      light={true}
    >
=======
import RelationShipCard from "../relationShipCard/relationShiphCard";
import { navigate, NavigateOptions } from "@openmrs/esm-framework";
import { useTranslation } from "react-i18next";

const PatientCard = ({ patient }) => {
  const { t } = useTranslation();
  const toDeclare: NavigateOptions = {
    to: window.spaBase + "/death/declare/patient/" + patient.id,
  };
  const toValidate: NavigateOptions = {
    to: window.spaBase + "/death/validate/patient/" + patient.id,
  };
  const toEditPatient: NavigateOptions = {
    to: window.spaBase + "/death/patient/" + patient.id,
  };
  const editPatient = (e) => {
    navigate(toEditPatient);
  };
  return (
    <Tile onClick={editPatient} className={styles.cardBox} light={true}>
>>>>>>> 912c678f78fe3802c0f6a6ffbec0f645594b8d8b
      <Grid className={styles.pm0} fullWidth={true}>
        <Row className={styles.pm0}>
          {/* Partie reserve pour mettre la photo */}
          <Column className={styles.patientPhoto} lg={1}>
            <p className={styles.alias}>
              {(
                patient.firstName?.split("")[0] +
                patient.lastName[0]?.split("")[0]
              ).toUpperCase()}
            </p>
          </Column>
          {/* Partie reserve pour les infos */}
          <Column className={styles.pm0} lg={11}>
            <Grid className={styles.pm0} fullWidth={true}>
              <Column lg={12}>
                <Row className={styles.borderBottom}>
                  <Column className={styles.pm0} lg={6}>
                    <h1 className={styles.name}>
                      {patient.gender == "F" ? (
                        <Icon
                          icon="emojione-monotone:woman"
                          className={styles.iconHead}
                        />
                      ) : null}
                      {patient.gender == "M" ? (
                        <Icon
                          icon="emojione-monotone:man"
                          className={styles.iconHead}
                        />
                      ) : null}
                      {patient.firstName} <span>{patient.lastName}</span>
                    </h1>
                  </Column>
                  <Column className={styles.pm0} lg={6}>
                    <h3 className={`${styles.align} ${styles.pm0}`}>
                      <Icon icon="bxs:folder" className={styles.iconHead} />
                      {patient.No_dossier}
                    </h3>
                  </Column>
                </Row>
              </Column>
              <Row>
                <Column lg={4}>
                  <PatientCardCell
                    icon="clarity:calendar-solid"
                    label={patient.birth}
                  />

                  <PatientCardCell
                    icon="entypo:location-pin"
                    label={patient.residence}
                  />
                  <PatientCardCell
                    icon="bxs:building"
                    label={patient.habitat}
                  />
                </Column>

                <Column lg={3}>
                  <PatientCardCell
                    icon="ant-design:field-number-outlined"
                    label={patient.identify}
                  />

                  <PatientCardCell
                    icon="carbon:user-multiple"
                    label={patient.matrimonial}
                  />

                  <PatientCardCell
                    icon="ic:outline-work"
                    label={patient.occupation}
                  />
                </Column>

                <Column lg={3}>
                  <PatientCardCell
                    icon="bxs:phone-call"
                    label={patient.phoneNumber}
                  />
<<<<<<< HEAD
                  <PatientCardCell
                    icon="ep:place"
                    label={patient.birthplace}
                  />

=======
                  <PatientCardCell icon="ep:place" label={patient.birthplace} />
>>>>>>> 912c678f78fe3802c0f6a6ffbec0f645594b8d8b
                  <PatientCardCell
                    icon="akar-icons:link-chain"
                    label={
                      patient.relationship[0] != "" &&
                        patient.relationship[0] != null ? (
                        <RelationShipCard
                          relationshipName={patient.relationship[0]}
                          relationshipType={patient.relationship[1]}
                          relationshipPhone={patient.relationship[2]}
                        />
                      ) : null
                    }
                  />
                </Column>

                <Column lg={2} className={styles.pm0}>
                  <Column className={styles.borderLeft}>
                    <Icon
                      icon="fluent:heart-pulse-20-filled"
                      className={
<<<<<<< HEAD
                        !patient.death
=======
                        !patient.dea
>>>>>>> 912c678f78fe3802c0f6a6ffbec0f645594b8d8b
                          ? `${styles.heartStyle} ${styles.heartRed}`
                          : `${styles.heartStyle} ${styles.heartGray}`
                      }
                    />
                    <Column>
<<<<<<< HEAD
                      {patient.death ? (
                        <Button size="sm" className={styles.cardButton}>
=======
                      {patient.dead && !patient.isValided && (
                        <Button
                          size="sm"
                          className={styles.cardButton}
                          onClick={(e) => {
                            navigate(toValidate);
                            e.stopPropagation();
                          }}
                        >
>>>>>>> 912c678f78fe3802c0f6a6ffbec0f645594b8d8b
                          {t("validedDeath", "Valider")}
                          <Icon
                            icon="flat-color-icons:ok"
                            className={styles.cardButtonIcon}
                          />
                        </Button>
<<<<<<< HEAD
                      ) : (
                        <Button
                          size="sm"
                          onClick={(e) => {
                            navigate(valided);
=======
                      )}
                      {!patient.dead && (
                        <Button
                          size="sm"
                          onClick={(e) => {
                            navigate(toDeclare);
>>>>>>> 912c678f78fe3802c0f6a6ffbec0f645594b8d8b
                            e.stopPropagation();
                          }}
                          id={styles.buttonDeclare}
                          className={styles.cardButton}
                        >
<<<<<<< HEAD
                          {t("declareDeath", "Declarer mort")}
=======
                          {t("declareDeath", "declareDeath")}
                          <Icon
                            icon="healthicons:chart-death-rate-increasing"
                            className={styles.cardButtonIcon}
                          />
                        </Button>
                      )}
                      {patient.dead && patient.isValided && (
                        <Button
                          size="sm"
                          onClick={(e) => {
                            // navigate(toDeclare);
                            alert('Printed')
                            e.stopPropagation();
                          }}
                          id={styles.buttonDeclare}
                          className={styles.cardButton}
                        >
                          {t("print", "Print")}
>>>>>>> 912c678f78fe3802c0f6a6ffbec0f645594b8d8b
                          <Icon
                            icon="healthicons:chart-death-rate-increasing"
                            className={styles.cardButtonIcon}
                          />
                        </Button>
                      )}
                    </Column>
                  </Column>
                </Column>
              </Row>
            </Grid>
          </Column>
        </Row>
      </Grid>
    </Tile>
  );
};
export default PatientCard;
