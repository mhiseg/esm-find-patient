import React from "react";
import { Column } from "carbon-components-react";
import styles from "./patient-card.scss";

export default function PatientCardCell({ icon, label }) {

    return <>
        <Column>
            <p>
                {icon}
                {<Icon icon="bxs:phone-call"
                    className={styles.icon}
                />
         {label}
            </p>
        </Column>
    </>
}