import styles from "./relationShipCard.scss";
import React from "react";
<<<<<<< HEAD
=======
import { Column, Row, Grid } from 'carbon-components-react';
import PatientCardCell from "../patient-card/patient-cardCell";
>>>>>>> 912c678f78fe3802c0f6a6ffbec0f645594b8d8b
import { Icon } from "@iconify/react";

const RelationShipCard = ({ relationshipName, relationshipType, relationshipPhone }) => {
    return (relationshipName != null && relationshipName !== undefined) && (
        <>
            <span className={styles.relationShipName}> {relationshipName} </span>
            <span className={styles.relationShipType}>
                {relationshipType}
            </span>
            {(relationshipPhone != null && relationshipPhone !== undefined) &&
                <span className={styles.relationshipPhone} >
<<<<<<< HEAD
                    <Icon className={styles.relationshipPhoneIcon} icon="bxs:phone-call" /> <span>{relationshipPhone}</span> </span>
=======
                    <Icon className={styles.relationshipPhoneIcon} icon="bxs:phone-call" />{relationshipPhone} </span>
>>>>>>> 912c678f78fe3802c0f6a6ffbec0f645594b8d8b
            }
        </>
    )
}
<<<<<<< HEAD
export default RelationShipCard;
=======
export default RelationShipCard;




    //     <Row className={styles.relationShipName}>
    //     {relationshipName}
    //     <Column sm={1} className={styles.relationShipType}>
    //         {relationshipType}
    //         <PatientCardCell
    //             icon="bxs:phone-call"
    //             label={relationshipPhone}
    //         />
    //     </Column>
    // </Row>
>>>>>>> 912c678f78fe3802c0f6a6ffbec0f645594b8d8b
