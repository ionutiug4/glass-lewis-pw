import { LandingPageClass } from "cypress/pages/LandingPage";

const landingPage = new LandingPageClass();

describe("Vote table tests", () => {
  beforeEach(() => {
    cy.visit("/WD/?siteId=DemoClient");
    cy.intercept("POST", "**/WD/Api/Data//Issuers").as("issuers");
    cy.intercept(
      "GET",
      "/WD/Api/Data/WebDisclosureService/GetLatestMeetingDetails?siteId=DemoClient&securityId=**"
    ).as("meetings");
    cy.wait("@issuers").its("response.statusCode").should("eq", 200);
  });

  it("VT-TC-1 checks company filter filed exists", () => {
    landingPage.checkCompanySearchFilterExists();
  });

  it("VT-TC-2 checks company is visible after inserting filter", () => {
    const companyName: string = "Activision Blizzard Inc";
    landingPage
      .insertCompanyNameFilter(companyName)
      .checkCompanyNameFilterIsVisible(companyName);
  });

  it("VT-TC-3 checks redirect to company meetings page", () => {
    const companyName: string = "Activision Blizzard Inc";
    landingPage
      .insertCompanyNameFilter(companyName)
      .selectCompanyFilter(companyName);
    cy.wait("@meetings").then(() => {
      landingPage.checkCompanyMeetingsHeader(companyName);
    });
  });
});
