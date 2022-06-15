import { getAsyncLifecycle, defineConfigSchema } from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";

const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

const backendDependencies = {
  fhir2: "^1.2.0",
  "webservices.rest": "^2.2.0",
};

function setupOpenMRS() {
  const moduleName = "@mhiseg/esm-find-patient-app";

  const options = {
    featureName: "find-patient",
    moduleName,
  };

  defineConfigSchema(moduleName, configSchema);

  return {
    pages: [
      {
        load: getAsyncLifecycle(
          () => import("./searchPatient/searchPatient"),
          options
        ),
        route: "death/search",
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
