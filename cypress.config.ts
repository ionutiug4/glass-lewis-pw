import { defineConfig } from "cypress";
import * as fs from "fs-extra";
import * as path from "path";
import { beforeRunHook, afterRunHook } from "cypress-mochawesome-reporter/lib";

function getConfigurationByFile(file: any) {
  const pathToConfigFile = path.resolve("cypress", "config", `${file}.json`);

  return fs.readJson(pathToConfigFile);
}

export default defineConfig({
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "cypress-mochawesome-reporter, mocha-junit-reporter",
    cypressMochawesomeReporterReporterOptions: {
      reportDir: "cypress/reports",
      charts: true,
      reportPageTitle: "Automation Testing",
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },
    mochaJunitReporterReporterOptions: {
      testCaseSwitchClassnameAndName: true,
      mochaFile: "cypress/reports/junit/results-[hash].xml",
    },
  },

  video: false,
  trashAssetsBeforeRuns: true,
  pageLoadTimeout: 60000,
  defaultCommandTimeout: 20000,
  viewportHeight: 1080,
  viewportWidth: 1920,
  watchForFileChanges: false,
  waitForAnimations: true,

  e2e: {
    setupNodeEvents(on, config) {
      on("before:run", async (details) => {
        console.log("override before:run");
        await beforeRunHook(details);
      });

      on("after:run", async () => {
        console.log("override after:run");
        await afterRunHook();
      });

      const file = config.env.configFile || "development";
      return getConfigurationByFile(file);
    },
    testIsolation: false,
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
