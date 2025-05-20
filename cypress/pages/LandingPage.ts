export class LandingPageClass {
  elements = {
    getSearchForCompanyFilterInput: () => cy.get("#kendo-Search-for-company"),
    getDateRangeFilterContainer: () => cy.get("#filter-date-range"),
    getAccountsNameFilterContainer: () => cy.get("#filter-Accounts"),
    getCountryFilterContainer: () => cy.get("#filter-country"),
    getUpdatePageByCountryFilterButton: () => cy.get("#btn-update"),
    getResetPageCountryFilerButton: () => cy.get("#btn-close"),
    getSearchForCountryFilterInput: () =>
      cy.get("#txt-multiselect-static-search-CountryFilter"),
  };

  insertCompanyNameFilter(companyName: string): this {
    this.elements.getSearchForCompanyFilterInput().type(companyName);
    return this;
  }

  checkCountryFilter(countryName: string): this {
    this.elements.getCountryFilterContainer().within(() => {
      cy.get(`#${countryName}-cb-CountryFilter`).check({ force: true });
    });
    return this;
  }

  clickUpdatePageByCountryFilterButton(): this {
    this.elements.getUpdatePageByCountryFilterButton().click({ force: true });
    return this;
  }

  clickResetResultsByCountryFilterButton(): this {
    this.elements.getCountryFilterContainer().within(() => {
      this.elements.getResetPageCountryFilerButton().click({ force: true });
    });
    return this;
  }

  checkCountryFilterContainerExists(): this {
    this.elements.getCountryFilterContainer().should("exist").and("be.visible");
    return this;
  }

  insertSearchForCountryFilter(countryName: string): this {
    this.elements.getSearchForCountryFilterInput().type(countryName);
    return this;
  }

  checkResultsByCountryFilter(countryName: string) {
    return cy.document().then((doc) => {
      const tbodyElements = doc.getElementsByTagName("tbody");

      if (tbodyElements.length > 0) {
        return cy.get("tbody").within(() => {
          cy.get('tr[role="row"]').each(($el) => {
            cy.wrap($el).children("td").last().should("have.text", countryName);
          });
        });
      } else {
        cy.log(`No elements found for country: ${countryName}.`);
        return cy.wrap<string[]>([]);
      }
    });
  }

  checkCompanySearchFilterExists(): this {
    this.elements.getSearchForCompanyFilterInput().should("exist");
    return this;
  }

  checkCompanyNameFilterIsVisible(companyName: string) {
    cy.get("#header-search-input_listbox").within(() => {
      cy.contains("li", companyName).should("exist").and("be.visible");
    });
  }

  selectCompanyFilter(companyName: string) {
    cy.get("#header-search-input_listbox").within(() => {
      cy.contains("li", companyName).click({ force: true });
    });
  }

  checkCompanyMeetingsHeader(companyName: string): this {
    cy.get("#detail-issuer-name").should("have.text", companyName);
    return this;
  }
}
