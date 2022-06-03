import { Column } from "carbon-components-react";
import React from "react";
function PatientCardCell(){
    render(){
        return 
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