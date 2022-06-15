import { openmrsFetch, fhir, NavigateOptions } from "@openmrs/esm-framework";

export const to: NavigateOptions = {
  to: window.spaBase + "/death/add-patient",
};

export async function getPatient(query) {
  let patients;
  const uuids = await openmrsFetch(
    `/ws/fhir2/R4/Patient?&given=&name=${query}`,
    { method: "GET" }
  );

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
        return formatPatient(patient.data);
      })
    );
  }
  const formatIdentify = (item) =>
    item.map((identifier) => {
      return {
        type: identifier.display.split(" = ")[0],
        identifier: identifier.display.split(" = ")[1],
      };
    });

  const formatPatient = (item) => {
    const identities = formatIdentify(item.identifiers);
    return {
      id: item.uuid,
      identify: identities[1]?.identifier,
      No_dossier: identities[0]?.identifier,
      firstName: item?.person?.names?.[0]?.familyName,
      lastName: item?.person?.names?.[0]?.givenName,
      birth: item?.person?.birthdate.split("T")?.[0],
      residence:
        item?.person?.addresses?.[0]?.country +
        ", " +
        item?.person?.addresses?.[0]?.cityVillage +
        ", " +
        item?.person?.addresses?.[0]?.display,
      birthPlace: "",
      habitat: "",

      phoneNumber: item?.person?.attributes?.map((element) => {
        return element?.attributeType?.display === "Telephone Number"
          ? element.value
          : null;
      }),

      gender: checkUndefined(item?.person?.gender),

      birthplace: item?.person?.attributes?.map((element) => {
        return element?.attributeType?.display === "Birthplace"
          ? checkUndefined(element?.value)
          : null;
      }),
      death: item.person.death,
      occupation: "",
      matrimonial: "",
      deathDate: "",
    };
  };
  const checkUndefined = (value) => {
    return value !== null || value !== undefined ? value : "";
  };
  return patients;
}
