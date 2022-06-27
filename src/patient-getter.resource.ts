import { getCurrentUser, openmrsFetch, userHasAccess } from "@openmrs/esm-framework";
import { encounterTypeCheckIn, habitatConcept, maritalStatusConcept, occupationConcept } from "./constant";
import { User } from './types'
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
const BASE_WS_API_URL = '/ws/rest/v1/';

export function getCurrenUserFunction() {
  let currentUserFunction = [];
  getCurrentUser().subscribe(
    user => {
      currentUserFunction[0] = user.systemId.split("-")?.[0];
    })
  console.log(currentUserFunction);
  return currentUserFunction;
}

async function fetchObsByPatientAndEncounterType(patientUuid: string, encounterType: string) {
  if (patientUuid && encounterType) {
    let observations = [];
    const encounter = await openmrsFetch(`${BASE_WS_API_URL}encounter?patient=${patientUuid}&encounterType=${encounterType}&v=default`, { method: 'GET' });
    let concepts = encounter.data.results[(encounter.data.results?.length) - 1]?.obs;
    if (concepts) {
      await Promise.all(concepts.map(async concept => {
        const obs = await getObs(concept.links[0]?.uri)
        observations.push({ concept: obs?.data?.concept, answer: obs?.data?.value })
      }))
    }
    return observations;
  }
  return Promise.resolve(null);
}
export function getObs(path: string) {
  return openmrsFetch(`${BASE_WS_API_URL + path.split(BASE_WS_API_URL)[1]}?lang=${localStorage.i18nextLng}`, { method: 'GET' });
}

export async function getPatient(query) {
  let patients;
  const searchResult = await openmrsFetch(
    `/ws/rest/v1/patient?q=${query}&v=full`,
    {
      method: "GET",
    }
  );

  function checkUndefined(value) {
    return (value !== null && value !== undefined) ? value : "";
  }
  const formatAttribute = (item) =>
    item?.map((identifier) => {
      return {
        type: identifier.display.split(" = ")[0].trim(),
        value: identifier.display.split(" = ")[1].trim(),
      };
    });

  const formatConcept = (concepts, uuid) => {
    let value = "";
    concepts?.map((concept) => {
      value = (concept?.concept?.uuid == uuid) ? concept?.answer?.display : ""
    })
    return value;
  }

  if (searchResult) {
    patients = Promise.all(
      searchResult?.data?.results.map(async function (item, i) {
        const relationships = await openmrsFetch(
          `/ws/rest/v1/relationship?v=full&person=${item.uuid}`,
          {
            method: "GET",
          }
        );
        const Allconcept = await fetchObsByPatientAndEncounterType(item.uuid, encounterTypeCheckIn)
        const attributs = formatAttribute(relationships?.data?.results?.[0]?.personA?.attributes);
        return {
          id: item?.uuid,

          identify: checkUndefined(item?.identifiers?.map((element) => {
            return element?.identifierType?.display === ("CIN" || "NIF")
              ? element?.identifier : "";
          }).toString()),
          No_dossier: checkUndefined(item?.identifiers[0]?.identifier),

          firstName: checkUndefined(item?.person?.names?.[0]?.familyName),

          lastName: checkUndefined(
            item?.person?.names?.[0]?.givenName +
            " " +
            checkUndefined(item?.person?.names?.[0]?.middleName)
          ),

          birth: checkUndefined(item?.person?.birthdate.split("T")?.[0]),

          residence:
            checkUndefined(item?.person?.addresses?.[0]?.country) &&
            ", " &&
            checkUndefined(item?.person?.addresses?.[0]?.cityVillage) &&
            ", " &&
            checkUndefined(item?.person?.addresses?.[0]?.display),

          habitat: formatConcept(Allconcept, habitatConcept),

          phoneNumber: checkUndefined(item?.person?.attributes?.map((element) => {
            return (element?.attributeType?.display === "Telephone Number")
              ? element?.value
              : ""
          }).toString()),

          gender: checkUndefined(item?.person?.gender),

          birthplace: checkUndefined(item?.person?.attributes?.map((element) => {
            return (element?.attributeType?.display === "Birthplace")
              ? element?.value
              : "";
          }).toString()),

          dead: checkUndefined(item.person.dead),

          occupation: formatConcept(Allconcept, occupationConcept),

          matrimonial: formatConcept(Allconcept, maritalStatusConcept),

          deathDate: "",
          valided: checkUndefined(item?.person?.attributes?.map((element) => {
            return (element?.attributeType?.display === "valided")
              ? element?.value
              : "";
          }).toString()),
          relationship: [
            relationships?.data?.results?.[0]?.personA?.display,
            relationships?.data?.results?.[0]?.relationshipType?.aIsToB,
            attributs?.map(attribut => {
              return (attribut.type == "Telephone Number") ? attribut.value : ""
            })
          ]
        }
      })
    );
  }
  return patients;
}