import { Certifications } from '@components/certifications/certifications.component';
import cn from '@components/certifications/certifications.module.css';

describe('<Certifications />', () => {
  it('renders icons in the provided order', () => {
    cy.viewport(430, 932);
    cy.mount(<Certifications icons={['free', 'gdpr', 'ssl']} />);

    cy.get(`.${cn.Icon}`).should('have.length', 3);
    cy.get(`.${cn.Icon}`).eq(0).should('have.attr', 'data-cy', 'free-icon');
    cy.get(`.${cn.Icon}`).eq(1).should('have.attr', 'data-cy', 'gdpr-icon');
    cy.get(`.${cn.Icon}`).eq(2).should('have.attr', 'data-cy', 'ssl-icon');
  });

  it('merges a custom className on the wrapper', () => {
    cy.viewport(430, 932);
    cy.mount(<Certifications className="test-class" icons={['ssl']} />);

    cy.get(`.${cn.Certifications}`).should('have.class', 'test-class');
  });
});
