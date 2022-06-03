import React from "react";
import { Column } from "carbon-components-react";
import styles from "./patient-card.scss";
import { Icon } from "@iconify/react";

export default function PatientCardCell({ icon, label }) {

    return <>
        <Column>
            <p>

                <>
                <Icon icon={icon} className={styles.icon}
                />
                 {label}
            </>
            </p>
        </Column>
    </>
}