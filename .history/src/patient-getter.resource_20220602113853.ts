import { openmrsFetch, fhir } from "@openmrs/esm-framework";

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
    `/ws/fhir2/R4/Patient?&given=&name=${query}`,
    {
      method: "GET",
    }
  );
  function checkUndefined(value){
  value!=undefined
  }
  if (searchResult?.data?.entry) {
    searchResult?.data?.entry.forEach(function (item, i) {
      patients.push({
        id: i,
        No_dossier: item?.resource?.identifier?.[0]?.value,
        firstName: item?.resource?.name?.[0]?.family,
        lastName: item?.resource?.name?.[0]?.given?.map((lastName) => {
          return lastName + " ";
        }),
        birth: item?.resource?.birthDate,
        residence:
          item?.resource?.address?.[0]?.country +
          ", " +
          item?.resource?.address?.[0]?.city +
          ", " +
          item?.resource?.address?.[0]?.extension?.[0]?.extension?.[0]?.valueString,
        habitat: "",
        phoneNumber: item?.resource?.telecom?.map((phone,i) => {
          return phone.value +  " " ;
        }),
        gender: item?.resource?.gender,
        occupation: "",
        matrimonial: "",
        deathDate: "",
      });
    });
  }
  return patients;
}
