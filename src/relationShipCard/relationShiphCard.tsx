import styles from "./relationShipCard.scss";
import React from "react";
import { Icon } from "@iconify/react";

const RelationShipCard = ({ relationshipName, relationshipType, relationshipPhone }) => {
    return (relationshipName != null && relationshipName !== undefined) && (
        <>
            <span className={styles.relationShipType}>
                {relationshipType}
            </span>
            <span className={styles.relationShipName}> {relationshipName} </span>
            {(relationshipPhone != "" && relationshipPhone !== null) &&
                <span className={styles.relationshipPhone} >
                    <Icon className={styles.relationshipPhoneIcon} icon="bxs:phone-call" /> <span>{relationshipPhone}</span> </span>
            }
        </>
    )
}
export default RelationShipCard;
