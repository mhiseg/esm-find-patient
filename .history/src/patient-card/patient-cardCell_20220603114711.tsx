import React from "react";
import { Column } from "carbon-components-react";
import { Icon } from "@iconify/react";
import { render } from "react-dom";

function PatientCardCell(){
    
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