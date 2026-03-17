// Support for Cypress Component Testing
import "./commands";
import { mount } from "cypress/react";

Cypress.Commands.add("mount", mount);

export * from "cypress/react";