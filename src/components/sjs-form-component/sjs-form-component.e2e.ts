import { newE2EPage } from '@stencil/core/testing';

describe('sjs-form-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<sjs-form-component></sjs-form-component>');
    const element = await page.find('sjs-form-component');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent(`<sjs-form-component sign-value ="$" form-button-value='Transfer' 
    only-numbers enable-validation form-error-message = 'Please enter values greater than 0.'></sjs-form-component>`);
    const component = await page.find('sjs-form-component');
    const element = await page.find('sjs-form-component >>> form');
    const strong = await element.find('strong');
    expect(strong.textContent).toEqual(`$`);
    const button = await page.find('sjs-form-component >>> input[type="submit"]');
    const btnValue = await button.getProperty('value');
    expect(btnValue).toBe('Transfer');
    const mainFieldTextBox = await page.find('sjs-form-component >>> #mainField');
    let mainFieldTextBoxValue = await mainFieldTextBox.getProperty('value');
    expect(mainFieldTextBoxValue).toBe('');
    await mainFieldTextBox.press('8');
    mainFieldTextBoxValue = await mainFieldTextBox.getProperty('value');
    expect(mainFieldTextBoxValue).toBe('8');
  });
});
