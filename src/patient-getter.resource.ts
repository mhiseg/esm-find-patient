import { openmrsFetch, fhir } from "@openmrs/esm-framework";
import { random } from "lodash-es";

/**
 * This is a somewhat silly resource function. It searches for a patient
 * using the REST API, and then immediately gets the data using the FHIR
 * API for the first patient found. OpenMRS API endpoints are generally
 * hit using `openmrsFetch`. For FHIR endpoints we use the FHIR API
 * object.
 *
 * See the `fhir` object API docs: https://github.com/openmrs/openmrs-esm-core/blob/master/packages/framework/esm-api/docs/API.md#fhir
 * See the docs for the underlying fhir.js Client object: https://github.com/FHIR/fhir.js#api
 * See the OpenMRS FHIR Module docs: https://wiki.openmrs.org/display/projects/OpenMRS+FHIR+Module
 * See the OpenMRS REST API docs: https://rest.openmrs.org/#openmrs-rest-api
 *
 * @param query A patient name or ID
 * @returns The first matching patient
 */
export async function getPatient(query) {
  let patients = [];
  const searchResult = await openmrsFetch(
    `/ws/rest/v1/patient?q=${query}&v=full`,
    {
      method: "GET",
    }
  );

  function checkUndefined(value) {
    return value !== null && value !== undefined ? value : "";
  }
  if (searchResult) {
    searchResult?.data?.results.forEach(function (item, i) {
      console.log(item);
      patients.push({
        id: i,

        identify: item?.identifiers?.map((element) => {
          return element?.identifierType?.display === ("CIN" || "NIF")
            ? checkUndefined(element?.identifier)
            : null;
        }),
        No_dossier: checkUndefined(item?.identifiers[0]?.identifier),

        firstName: checkUndefined(item?.person?.names?.[0]?.familyName),

        lastName: checkUndefined(
          item?.person?.names?.[0]?.givenName +
            " " +
            checkUndefined(item?.person?.names?.[0]?.middleName)
        ),

        birth: checkUndefined(item?.person?.birthdate.split("T")?.[0]),

        residence:
          checkUndefined(item?.person?.addresses?.[0]?.country) +
          ", " +
          checkUndefined(item?.person?.addresses?.[0]?.cityVillage) +
          ", " +
          checkUndefined(item?.person?.addresses?.[0]?.display),

        birthPlace: "",

        habitat: "",

        phoneNumber: item?.person?.attributes?.map((element) => {
          return element?.attributeType?.display === "Telephone Number"
            ? checkUndefined(element?.value)
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
      });
    });
  }
  return patients;
}
