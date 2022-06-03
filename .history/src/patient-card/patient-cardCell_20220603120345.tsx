import React from "react";
import { Column } from "carbon-components-react";

export default function PatientCardCell({icon,label}){
    
        return <>
         <Column>
        <p>
         {icon}
         {label}
        </p>
      </Column>
      </>
}