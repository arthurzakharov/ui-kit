import { Certifications } from '@components/certifications/certifications.component';
import type { CertificationsProps } from '@components/certifications/certifications.types';

const certifications = {
  icons: ['free', 'gdpr', 'ssl'],
  className: 'test-class',
} satisfies CertificationsProps;

describe('<Certifications />', () => {
  it('renders icons in the provided order', () => {
    cy.viewport(430, 932);
    cy.mount(<Certifications {...certifications} />);

    cy.get('[data-cy="certifications-icon"]').should('have.length', 3);
    cy.get('[data-cy="certifications-icon"]').eq(0).should('have.attr', 'data-icon', 'free-icon');
    cy.get('[data-cy="certifications-icon"]').eq(1).should('have.attr', 'data-icon', 'gdpr-icon');
    cy.get('[data-cy="certifications-icon"]').eq(2).should('have.attr', 'data-icon', 'ssl-icon');
  });

  it('merges a custom className on the wrapper', () => {
    cy.viewport(430, 932);
    cy.mount(<Certifications {...certifications} />);

    cy.get('[data-cy="certifications"]').should('have.class', 'test-class');
  });
});
