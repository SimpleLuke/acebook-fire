const { defineConfig } = require("cypress");
const mongo = require("cypress-mongodb");

module.exports = defineConfig({
  env: {
    mongodb: {
      uri: "mongodb://0.0.0.0/",
      database: "acebook_test",
    },
  },
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      mongo.configurePlugin(on);
    },
    baseUrl: "http://localhost:3000",
  },
});
