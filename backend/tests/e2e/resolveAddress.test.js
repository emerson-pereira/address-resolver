describe('Google', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000/');
  });

  it('should have "cidade" as "Diadema"', async () => {
    await expect(page.title()).resolves.toMatch('Address Resolver');
  });
});
