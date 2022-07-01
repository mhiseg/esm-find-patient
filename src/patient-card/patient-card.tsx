import React from "react";
import { Button, Column, Grid, Row, Tile } from "carbon-components-react";
import { Icon } from "@iconify/react";
import styles from "./patient-card.scss";
import PatientCardCell from "./patient-cardCell";
import RelationShipCard from "../relationShipCard/relationShiphCard";
import { navigate, NavigateOptions } from "@openmrs/esm-framework";
import { useTranslation } from "react-i18next";


const PatientCard = ({ patient, userRole }) => {
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
                  <PatientCardCell icon="ep:place" label={patient.birthplace} />
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
                      className={!patient.dead
                        ? `${styles.heartStyle} ${styles.heartRed}`
                        : `${styles.heartStyle} ${styles.heartGray}`
                      }
                    />
                      {!patient.dead && (
                        <Button
                          size="sm"
                          id={styles.buttonDeclare}
                          className={styles.cardButton}
                          onClick={(e) => {
                            navigate(toDeclare);
                            e.stopPropagation();
                          }}
                        >
                          {t("declareDeath")}
                          <Icon
                            icon="healthicons:chart-death-rate-increasing"
                            className={styles.cardButtonIcon}
                          />
                        </Button>
                      )}

                      {patient.dead && patient.valided === false && (userRole !== "nurse") && (
                        <Button
                          size="sm"
                          className={styles.cardButton}
                          onClick={(e) => {
                            navigate(toValidate);
                            e.stopPropagation();
                          }}
                        >
                          {t("validedDeath")}
                          <Icon
                            icon="flat-color-icons:ok"
                            className={styles.cardButtonIcon}
                          />
                        </Button>
                      )}
                      {patient.dead && patient.valided===true && (
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          id={styles.buttonPrint}
                          className={styles.cardButton}
                        >
                          {t("print")}
                          <Icon
                            icon="cil:print"
                            className={styles.cardButtonIcon}
                          />
                        </Button>
                      )}
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
