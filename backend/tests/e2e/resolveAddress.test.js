describe('Google', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000');
  });

  it('should contain "Cidade: Diadema"', async () => {
    await page.waitForSelector('.address-form-input');
    await page.type('.address-form-input', '09960-430');
    await page.click('.address-form-button');
    await page.waitForSelector('.address-summary-list-item');
    const cidadeItem = await page.evaluate(() => {
      return document.querySelector(
        '.address-summary-list-item:nth-child(3) > p'
      ).innerText;
    });
    await expect(cidadeItem).toBe('Cidade: Diadema');
  });
});
