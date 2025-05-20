import { LandingPageClass } from "cypress/pages/LandingPage";

const landingPage = new LandingPageClass();

describe("Navigate to page", () => {
  beforeEach(() => {
    cy.visit("/WD/?siteId=DemoClient");
    cy.intercept("POST", "**/WD/Api/Data//Issuers").as("issuers");
    cy.wait("@issuers").its("response.statusCode").should("eq", 200);
  });

  it("LP-TC-1 checks country filter container exists", () => {
    landingPage.checkCountryFilterContainerExists();
  });

  it("LP-TC-2 checks resuts by country filter", () => {
    const countryFilter: string = "Belgium";
    landingPage
      .checkCountryFilter(countryFilter)
      .clickUpdatePageByCountryFilterButton();
    cy.wait("@issuers").then(() => {
      landingPage.checkResultsByCountryFilter(countryFilter);
    });
  });

  it("LP-TC-3 checks search for country filter", () => {
    const countryFilter: string = "Belgium";
    landingPage
      .insertSearchForCountryFilter(countryFilter)
      .checkCountryFilter(countryFilter);
  });

  it("LP-TC-4 resets country filter results", () => {
    const countryFilter: string = "Belgium";
    landingPage
      .checkCountryFilter(countryFilter)
      .clickUpdatePageByCountryFilterButton();
    cy.wait("@issuers").then(() => {
      landingPage.checkResultsByCountryFilter(countryFilter);
      landingPage.clickResetResultsByCountryFilterButton();

    });
  });
});
