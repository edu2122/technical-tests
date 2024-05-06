import { test, expect } from '@playwright/test'

const LOCALHOST_URL = 'http://localhost:5173'

test('app show renders books', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  // Espera a que el elemento con la clase 'book' sea visible en la página
  await page.waitForSelector('.book')

  // Verifica que hay al menos un elemento con la clase 'book' en la página
  const books = await page.$$('.book')
  expect(books?.length).toBeGreaterThan(0)
})
