describe('Report output', () => {
  ['simple', 'multiple-reporters', 'multiple-reporters-config-file', 'mochawesome-flags', 'screenshots-folder'].forEach(
    (folder) => {
      describe(`${folder} folder`, () => {
        beforeEach(() => {
          if (folder === 'mochawesome-flags') {
            cy.visit(`examples/${folder}/test-report/index.html`);
          } else {
            cy.visit(`examples/${folder}/cypress/reports/html/index.html`);
          }
        });

        it('Validate all tests exists', () => {
          cy.get('li[title="Suites"]').contains(4);
          cy.get('li[title="Tests"]').contains(7);
          cy.get('li[title="Passed"]').contains(2);
          cy.get('li[title="Failed"]').contains(4);
          cy.get('li[title="Skipped"]').contains(1);
        });

        describe('Validate image exists', () => {
          it('screenshot of passed test', () => {
            cy.validateTestHasScreenshot('default todos exists');
          });

          it('fail during test', () => {
            cy.validateTestHasScreenshot('fail test', folder === 'simple' ? 4 : 2);
            cy.validateTestHasScreenshot('fail test hierarchy', folder === 'simple' ? 4 : 2);
          });

          it('before hook', () => {
            cy.validateTestHasScreenshot('before hook fail', 1);
          });

          it('beforeEach', () => {
            cy.validateTestHasScreenshot('beforeEach hook fail 1', folder === 'simple' ? 2 : 1);
          });
        });
      });
    }
  );
});
