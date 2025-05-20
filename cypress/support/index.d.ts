declare namespace Cypress {
  interface ConfigOptions {
    browserUrl?: string;
    baseUrl: string;
  }

  interface EnvOptions {
    browserUrl: string;
    baseUrl?: string;
  }

  interface Chainable<Subject> {}
}
