import { NotFound, type NotFoundProps } from '@components/not-found/not-found.component';
import cn from '@components/not-found/not-found.module.css';

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
} satisfies NotFoundProps;

describe('<NotFound />', () => {
  it('renders headings and contact info', () => {
    cy.viewport(1366, 1024);
    cy.mount(<NotFound {...notFound} />);

    cy.contains('h1', notFound.title).should('be.visible');
    cy.contains('h2', notFound.subtitle).should('be.visible');
    cy.contains('h3', notFound.tableTitle).should('be.visible');

    cy.get('table tbody tr').should('have.length', notFound.tableRows.length);

    notFound.tableRows.forEach(({ key, value }) => {
      cy.contains('th', key).should('be.visible');

      const cell = cy.contains('th', key).parent('tr').find('td');
      if (value.includes('<')) {
        cell.should('contain.html', value);
      } else {
        cell.should('have.text', value);
      }
    });
  });

  it('styles are changed during resize', () => {
    cy.viewport(430, 932);
    cy.mount(<NotFound {...notFound} />);

    cy.get(`.${cn.NotFound}`).should('have.css', 'padding', '12px 16px');
    cy.get(`.${cn.Title}`).should('have.css', 'font-size', '24px');
    cy.get(`.${cn.Subtitle}`).should('have.css', 'font-size', '20px');
    cy.get(`.${cn.TableTitle}`).should('have.css', 'font-size', '18px');
    cy.get(`.${cn.Table}`).should('have.css', 'font-size', '14px');

    cy.viewport(1024, 768);

    cy.get(`.${cn.NotFound}`).should('have.css', 'padding', '16px 24px');

    cy.viewport(1366, 1024);

    cy.get(`.${cn.NotFound}`).should('have.css', 'padding', '24px');
    cy.get(`.${cn.Title}`).should('have.css', 'font-size', '28px');
    cy.get(`.${cn.Subtitle}`).should('have.css', 'font-size', '24px');
    cy.get(`.${cn.TableTitle}`).should('have.css', 'font-size', '20px');
    cy.get(`.${cn.Table}`).should('have.css', 'font-size', '16px');
  });
});
