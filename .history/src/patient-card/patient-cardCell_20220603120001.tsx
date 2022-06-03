import React from "react";
import { Column } from "carbon-components-react";
import { Icon } from "@iconify/react";
import styles from "./patient-card.scss";

export default function PatientCardCell({}){
    
        return <>
         <Column>
        <p>
          <Icon
            icon="akar-icons:link-chain"
            className={styles.icon}
          />
          Show relationships
        </p>
      </Column>
      </>
}