import { defineConfig } from "cypress"
import getCompareSnapshotsPlugin from "cypress-image-diff-js/plugin"

export default defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "custom-title",
    inlineAssets: true,
    saveAllAttempts: false,
  },
  env: {
    //cy-grep
    grepFilterSpecs: true,
    grepOmitFiltered: true,
  },

  e2e: {
    setupNodeEvents(on, config) {
      getCompareSnapshotsPlugin(on, config)
      require("cypress-mochawesome-reporter/plugin")(on)
      require("@cypress/grep/src/plugin")(config)

      on("task", {
        getCurrentTime() {
          const date = new Date()
          return `${date.getUTCHours()}`
        },
      })

      return config
    },
    //baseUrl: "https://todo.qacart.com/",

    // The quality setting for the video compression, in Constant Rate Factor (CRF).
    // The value can be false to disable compression or a value between 0 and 51,
    // where a lower value results in better quality (at the expense of a higher file size).
    videoCompression: 32,

    // Default height in pixels
    viewportHeight: 1080,

    // Default width in pixels
    viewportWidth: 1920,
  },
})
