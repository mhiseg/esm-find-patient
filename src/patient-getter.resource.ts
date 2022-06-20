import { openmrsFetch, fhir, NavigateOptions } from "@openmrs/esm-framework";

export const to: NavigateOptions = {
  to: window.spaBase + "/death/patient",
};

export async function getPatient(query) {
  let patients;
  const uuids = await openmrsFetch(`/ws/fhir2/R4/Patient?name=${query}`, {
    method: "GET",
  });

  if (uuids.data.entry) {
    patients = Promise.all(
      uuids?.data?.entry.map(async (url) => {
        const uuid = url.fullUrl.split("Patient/")[1];
        const patient = await openmrsFetch(
          `/ws/rest/v1/patient/${uuid}?v=full`,
          {
            method: "GET",
          }
        );
        const relationships = await openmrsFetch(
          `/ws/rest/v1/relationship?v=full&person=${uuid}`,
          {
            method: "GET",
          }
        );
        return formatPatient(patient.data, relationships.data);
      })
    );
  }
  const formatAttribute = (item) =>
    item.map((identifier) => {
      return {
        type: identifier.display.split(" = ")[0].trim(),
        value: identifier.display.split(" = ")[1].trim(),
      };
    });

  const formatPatient = (patient, relationship) => {
    const identities = formatAttribute(patient.identifiers);
    const personAttributes = formatAttribute(patient.person?.attributes);
    return {
      id: patient.uuid,
      identify: identities.find(
        (identifier) => identifier.type == "CIN" || identifier.type == "CIN"
      )?.value,
      No_dossier: identities.find(
        (identifier) => identifier.type == "OpenMRS ID"
      )?.value,
      firstName: patient?.person?.names?.[0]?.familyName,
      lastName: patient?.person?.names?.[0]?.givenName,
      birth: patient?.person?.birthdate.split("T")?.[0],
      residence: displayResidence(patient.person?.addresses[0]),
      habitat: "",
      phoneNumber: personAttributes.find(
        (attribute) => attribute.type == "Telephone Number"
      )?.value,
      gender: checkUndefined(patient?.person?.gender),
      birthplace: personAttributes.find(
        (attribute) => attribute.type == "Birthplace"
      )?.value,
      death: patient.person.dead,
      occupation: "",
      matrimonial: "",
      deathDate: "",
      relationship: [
        relationship?.results?.[0]?.personA?.display,
        relationship?.results?.[0]?.relationshipType?.aIsToB,
        relationship?.results?.[0]?.personA?.attributes?.[0]?.display?.split("=")?.[1]
      ],
    };
  };
  const displayResidence = (addresses) => {
    if (addresses && addresses.country && addresses.cityVillage) {
      return (
        (addresses.address1 ? addresses.address1 + ", " : "") +
        addresses.cityVillage +
        ", " +
        addresses.country
      );
    }
  };
  const checkUndefined = (value) => {
    return value !== null || value !== undefined ? value : "";
  };
  return patients;
}
