import { NotFound } from '@components/not-found/not-found.component';
import type { NotFoundProps } from '@components/not-found/not-found.types';

const notFound = {
  title: 'Entschuldigung, da ist wohl etwas schief gelaufen!',
  subtitle: 'Fehler 404',
  tableTitle: 'Bitte kontaktieren Sie uns doch per:',
  tableRows: [
    {
      key: 'E-Mail:',
      value: 'info@rightmart.de',
    },
    {
      key: 'Telefon:',
      value: '+49 (0)421 / 33 100 311',
    },
    {
      key: 'Fax:',
      value: '+49 (0)421 / 33 100 380',
    },
    {
      key: 'Post:',
      value: 'rightmart Rechtsanwaltsgesellschaft mbH<br>Clara-Jaschke-Straße 1<br>28199 Bremen',
    },
  ],
  className: 'test-class',
} satisfies NotFoundProps;

describe('<NotFound />', () => {
  it('renders headings and contact info', () => {
    cy.viewport(1366, 1024);
    cy.mount(<NotFound {...notFound} />);

    cy.get('[data-cy="not-found-title"]').should('have.text', notFound.title);
    cy.get('[data-cy="not-found-subtitle"]').should('have.text', notFound.subtitle);
    cy.get('[data-cy="not-found-table-title"]').should('have.text', notFound.tableTitle);
    cy.get('[data-cy="not-found-row"]').should('have.length', notFound.tableRows.length);

    notFound.tableRows.forEach(({ key, value }, index) => {
      cy.get('[data-cy="not-found-cell-head"]').eq(index).should('have.text', key);

      if (value.includes('<')) {
        cy.get('[data-cy="not-found-cell-data"]').eq(index).should('contain.html', value);
      } else {
        cy.get('[data-cy="not-found-cell-data"]').eq(index).should('have.text', value);
      }
    });
  });

  it('styles are changed during resize', () => {
    cy.viewport(430, 932);
    cy.mount(<NotFound {...notFound} />);

    cy.get("[data-cy='not-found']").should('have.css', 'padding', '12px 16px');
    cy.get('[data-cy="not-found-title"]').should('have.css', 'font-size', '24px');
    cy.get('[data-cy="not-found-subtitle"]').should('have.css', 'font-size', '20px');
    cy.get('[data-cy="not-found-table-title"]').should('have.css', 'font-size', '18px');
    cy.get('[data-cy="not-found-table"]').should('have.css', 'font-size', '14px');

    cy.viewport(1024, 768);

    cy.get("[data-cy='not-found']").should('have.css', 'padding', '16px 24px');

    cy.viewport(1366, 1024);

    cy.get("[data-cy='not-found']").should('have.css', 'padding', '24px');
    cy.get('[data-cy="not-found-title"]').should('have.css', 'font-size', '28px');
    cy.get('[data-cy="not-found-subtitle"]').should('have.css', 'font-size', '24px');
    cy.get('[data-cy="not-found-table-title"]').should('have.css', 'font-size', '20px');
    cy.get('[data-cy="not-found-table"]').should('have.css', 'font-size', '16px');
  });

  it('merges a custom className on the wrapper', () => {
    cy.viewport(1366, 1024);
    cy.mount(<NotFound {...notFound} />);

    cy.get('[data-cy="not-found"]').should('have.class', 'test-class');
  });
});
