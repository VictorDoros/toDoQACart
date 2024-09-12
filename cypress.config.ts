import { defineConfig } from "cypress"

export default defineConfig({
  env: {
    grepFilterSpecs: true,
    grepOmitFiltered: true,
  },
  e2e: {
    baseUrl: "https://todo.qacart.com/",
    setupNodeEvents(on, config) {
      // implement node event listeners here

      require('@cypress/grep/src/plugin')(config);
      return config;
    },
  },
})
