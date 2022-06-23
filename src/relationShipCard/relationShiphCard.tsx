import styles from "./relationShipCard.scss";
import React from "react";
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
                    <Icon className={styles.relationshipPhoneIcon} icon="bxs:phone-call" /> <span>{relationshipPhone}</span> </span>
            }
        </>
    )
}
export default RelationShipCard;