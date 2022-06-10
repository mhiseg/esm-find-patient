import React from "react";
import { Column, Grid, Row, Tile } from "carbon-components-react";
import { Icon } from "@iconify/react";
import styles from "./patient-card.scss";
import PatientCardCell from "./patient-cardCell";

const PatientCard = ({ Patient }) => {
  return (

    <Tile className={styles.cardBox} light={true}>
      <Grid className={styles.pm0} fullWidth={true}>
        <Row className={styles.pm0}>
          {/* Partie reserve pour mettre la photo */}
          <Column className={styles.patientPhoto} lg={1}>
            <p className={styles.alias}>
              {(
                Patient.firstName?.split("")[0] +
                Patient.lastName[0]?.split("")[0]
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
                      {Patient.gender === "female" ? (
                        <Icon
                          icon="emojione-monotone:woman"
                          className={styles.iconHead}
                        />
                      ) : null}
                      {Patient.gender === "male" ? (
                        <Icon
                          icon="emojione-monotone:man"
                          className={styles.iconHead}
                        />
                      ) : null}
                      {Patient.firstName} <span>{Patient.lastName}</span>
                    </h1>
                  </Column>
                  <Column className={styles.pm0} lg={6}>
                    <h1 className={`${styles.align} ${styles.pm0}`}>
                      <Icon icon="bxs:folder" className={styles.iconHead} />
                      {Patient.No_dossier}
                    </h1>
                  </Column>
                </Row>
              </Column>
              <Row>
                <Column lg={4}>
                  <Column>
                    <p>
                          <Icon
                            icon="clarity:calendar-solid"
                            className={styles.icon}
                          />
                          {Patient.birth}
                    </p>
                  </Column>
                  <PatientCardCell
                    icon="entypo:location-pin"
                    label={Patient.birth}
                  />

                  <PatientCardCell
                    icon="entypo:location-pin"
                    label={Patient.residence}
                  />
                  <PatientCardCell
                    icon="bxs:building"
                    label={Patient.habitat}
                  />
                </Column>

                <Column lg={3}>
                  <PatientCardCell
                    icon="ant-design:field-number-outlined"
                    label="400381P75"
                  />

                  <PatientCardCell
                    icon="carbon:user-multiple"
                    label={Patient.matrimonial}
                  />

                  <PatientCardCell
                    icon="ic:outline-work"
                    label={Patient.occupation}
                  />
                </Column>

                <Column lg={3}>
                  <PatientCardCell
                    icon="bxs:phone-call"
                    label={Patient.phoneNumber}
                  />
                  <PatientCardCell
                    icon="fxemoji:email"
                    label="louisshacha@gmail.com"
                  />
                  <PatientCardCell
                    icon="akar-icons:link-chain"
                    label="Show relationships"
                  />
                </Column>

                <Column
                  lg={2}
                  className={`${styles.pm0} ${styles.borderLeft}`}
                >
                  <Column>
                    <Icon
                      icon="fluent:heart-pulse-20-filled"
                      className={styles.heartStyle}
                    />
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