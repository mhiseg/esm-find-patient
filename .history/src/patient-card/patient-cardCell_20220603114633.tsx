import React from "react";
import { Column } from "carbon-components-react";
import { Icon } from "@iconify/react";
function PatientCardCell(){
    render(){
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
    }
}