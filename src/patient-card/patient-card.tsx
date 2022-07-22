import React from "react";
import {
  Button,
  Column,
  Grid,
  OverflowMenuItem,
  Row,
  Tile,
} from "carbon-components-react";
import { Icon } from "@iconify/react";
import styles from "./patient-card.scss";
import FormatCardCell from "./patient-cardCell";
import RelationShipCard from "../relationShipCard/relationShiphCard";
import { navigate, NavigateOptions } from "@openmrs/esm-framework";
import { useTranslation } from "react-i18next";
import { PopoverButton } from "../popOver/PopoverButton";

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
  console.log(patient, "=========");

  return (
    <Tile className={styles.cardBox} light={true}>
      <Grid className={styles.pm0} fullWidth={true}>
        <Row className={styles.pm0}>
          <Column className={styles.patientPhoto} lg={1}>
            <p className={styles.alias}>
              {(
                patient.firstName?.split("")[0] +
                patient.lastName[0]?.split("")[0]
              ).toUpperCase()}
            </p>
          </Column>
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
                    {/* =========================={patient.valided} */}
                    {patient.valided === false && (
                      <>
                        <PopoverButton>
                          <OverflowMenuItem
                            itemText={t("editPatient")}
                            onClick={editPatient}
                          />
                          {userRole !== "nurse" && (
                            <OverflowMenuItem
                              itemText={t("EditdeclareDeath")}
                              onClick={editPatient}
                            />
                          )}
                        </PopoverButton>
                      </>
                    )}
                    <h3
                      className={`${styles.align} ${styles.pm0} ${styles.name}`}
                    >
                      <Icon
                        icon="fluent:folder-open-20-regular"
                        className={styles.iconHead}
                      />
                      {patient.No_dossier}
                    </h3>
                  </Column>
                </Row>
              </Column>
              <Row>
                <Column lg={4}>
                  <FormatCardCell icon="cil:calendar" label={patient.birth} />

                  <FormatCardCell
                    icon="ion:home-outline"
                    label={patient.residence}
                  />
                  <FormatCardCell
                    icon="healthicons:city-outline"
                    label={patient.habitat}
                  />
                </Column>

                <Column lg={3}>
                  <FormatCardCell
                    icon="teenyicons:id-outline"
                    label={patient.identify}
                  />

                  <FormatCardCell
                    icon="carbon:user-multiple"
                    label={patient.matrimonial}
                  />

                  <FormatCardCell
                    icon="ic:baseline-work-outline"
                    label={patient.occupation}
                  />
                </Column>

                <Column lg={3}>
                  <FormatCardCell
                    icon="carbon:phone"
                    label={patient.phoneNumber}
                  />
                  <FormatCardCell
                    icon="bytesize:location"
                    label={patient.birthplace}
                  />
                  <FormatCardCell
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
                        !patient.dead
                          ? `${styles.heartStyle} ${styles.heartRed}`
                          : `${styles.heartStyle} ${styles.heartGray}`
                      }
                    />

                    {!patient.dead && (
                      <Button
                        kind="tertiary"
                        size="sm"
                        id={styles.buttonDeclare}
                        className={styles.cardButton}
                        onClick={(e) => {
                          navigate(toDeclare);
                          e.stopPropagation();
                        }}
                      >
                        {t("declareDeath")}

                        {/* <Icon
                        <Icon
                          icon="healthicons:chart-death-rate-increasing"
                          className={styles.cardButtonIcon}
                        />
                      </Button>
                    )}
                     { patient.dead && !patient.valided && (
                      <Button
                        size="sm"
                        id={styles.buttonDeclare}
                        className={styles.cardButton}
                        onClick={(e) => {
                          navigate(toDeclare);
                          e.stopPropagation();
                        }}
                      >
                        {t("EditdeclareDeath")}
                        <Icon
                          icon="healthicons:chart-death-rate-increasing"
                          className={styles.cardButtonIcon}
                        /> */}
                      </Button>
                    )}

                    {patient.dead &&
                      patient.valided === false &&
                      userRole !== "nurse" && (
                        <Button
                          kind="tertiary"
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
                    {patient.dead && patient.valided === true && (
                      <Button
                        id={styles.buttonPrint}
                        kind="tertiary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className={styles.cardButton}
                      >
                        {t("Imprimer")}

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
