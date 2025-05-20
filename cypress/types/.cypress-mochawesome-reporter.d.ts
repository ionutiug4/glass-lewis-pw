declare module "cypress-mochawesome-reporter/lib" {
    export function beforeRunHook(details: Cypress.BeforeRunDetails): Promise<void>;
    export function afterRunHook(): Promise<void>;
}
