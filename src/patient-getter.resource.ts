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
function getObs(path: string) {
  return openmrsFetch(`${BASE_WS_API_URL + path.split(BASE_WS_API_URL)[1]}?lang=${localStorage.i18nextLng}`, { method: 'GET' });
}

export async function getPatient(query) {
  let patients;
  const searchResult = await openmrsFetch(
    `/ws/rest/v1/patient?v=full&q=${query}&includeDead=true`,
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
  const formatValided = (item) => {
    let formated = false;
    item?.map(function (element) {
      if (element?.attributeType?.display === "Death Validated") {
        return (element?.attributeType?.display === "Death Validated")
          ? formated = true : formated = false
      }
    })
    return formated;
  }

  const formatConcept = (concepts, uuid) => {
    let value = "";
    concepts?.map((concept) => {
      value = (concept?.concept?.uuid == uuid) ? concept?.answer?.display : ""
    })
    return value;
  }
  const formatResidence = (country, village, address) => {
    let residenceCountry = checkUndefined(country) !== "" ? country + ", " : "";
    let residenceVillage = checkUndefined(village) !== "" ? village + ", " : "";
    let residenceAddress = checkUndefined(address) !== "" ? address : "";
    return residenceCountry + residenceVillage + residenceAddress;
  }

  if (searchResult) {
    patients = Promise.all(
      searchResult?.data.results?.map(async function (item, i) {
        const relationships = await openmrsFetch(
          `/ws/rest/v1/relationship?v=full&person=${item?.uuid}`,
          {
            method: "GET",
          }
        );
        const Allconcept = await fetchObsByPatientAndEncounterType(item?.uuid, encounterTypeCheckIn)
        const attributs = formatAttribute(relationships?.data?.results?.[0]?.personA?.attributes);
        const personAttributes = formatAttribute(item?.person?.attributes);
        const identities = formatAttribute(item.identifiers);
        return {
          id: item?.uuid,
          identify: identities.find(
            (identifier) => identifier.type == "CIN" || identifier.type == "CIN"
          )?.value,
          No_dossier: checkUndefined(item?.identifiers?.[0]?.identifier),

          firstName: checkUndefined(item?.person?.names?.[0]?.familyName),

          lastName: checkUndefined(
            item?.person?.names?.[0]?.givenName +
            " " +
            checkUndefined(item?.person?.names?.[0]?.middleName)
          ),

          birth: checkUndefined(item?.person?.birthdate.split("T")?.[0]),

          residence:
            formatResidence(
              item?.person?.addresses?.[0]?.country,
              item?.person?.addresses?.[0]?.cityVillage,
              item?.person?.addresses?.[0]?.display
            ),

          habitat: formatConcept(Allconcept, habitatConcept),

          phoneNumber: checkUndefined(personAttributes.find(
            (attribute) => attribute.type == "Telephone Number"
          )?.value),

          gender: checkUndefined(item?.person?.gender),

          birthplace: checkUndefined(personAttributes.find(
            (attribute) => attribute.type == "Birthplace"
          )?.value),

          dead: checkUndefined(item?.person?.dead),

          occupation: formatConcept(Allconcept, occupationConcept),

          matrimonial: formatConcept(Allconcept, maritalStatusConcept),

          deathDate: "",
          valided: checkUndefined(formatValided(item?.person?.attributes)),

          relationship: [
            relationships?.data?.results?.[0]?.personB?.display,
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