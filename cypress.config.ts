import { defineConfig } from "cypress"
import getCompareSnapshotsPlugin from 'cypress-image-diff-js/plugin'

export default defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "custom-title",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },

  screenshotsFolder: "./cypress/snapshots/actual",

  env: {
    //cy-grep
    grepFilterSpecs: true,
    grepOmitFiltered: true,
  },

  e2e: {
    screenshotsFolder: "./cypress/snapshots/actual",

    env: {
      //cy-grep
      grepFilterSpecs: true,
      grepOmitFiltered: true,
    },

    //baseUrl: "https://todo.qacart.com/",
    setupNodeEvents(on, config) {
      getCompareSnapshotsPlugin(on, config)

      //mocha-awecome-reporter
      require("cypress-mochawesome-reporter/plugin.js")(on)

      //cy-grep
      require("@cypress/grep/src/plugin")(config)
      return config
    },
  },
})
