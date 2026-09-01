import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://dev.urbuddi.com/login');
  await page.locator('#userEmail').click();
  await page.locator('#userEmail').fill('hafsajakathi@gmail.com');
  await page.locator('#userPassword').click();
  await page.locator('#userPassword').fill('124');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('*Invalid credentials')).not.toHaveText('*Invalid 864513');
});