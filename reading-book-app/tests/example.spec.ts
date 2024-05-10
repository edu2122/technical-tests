// import { test, expect } from '@playwright/test'

// const LOCALHOST_URL = 'http://localhost:5173'

// test('verify that renders books', async ({ page }) => {
//   // Navega a la página que contiene el componente Books
//   await page.goto(LOCALHOST_URL);

//   // Espera a que el componente Books se cargue en la página
//   await page.waitForSelector('.books');

//   // Obtiene todos los elementos del libro en la página
//   const books = await page.$$('.book');

//   // Verifica que se hayan cargado todos los libros
//   // Reemplaza "expectedBookCount" con el número de libros que esperas que se carguen
//   const expectedBookCount = 13;
//   expect(books.length).toBe(expectedBookCount);

// });
import { test, expect } from '@playwright/test'

const LOCALHOST_URL = 'http://localhost:5173'

test('verify that renders books', async ({ page }) => {
  // Navega a la página que contiene el componente Books
  await page.goto(LOCALHOST_URL);

  // Espera a que el componente Books se cargue en la página
  await page.waitForSelector('.books');

  // Obtiene todos los elementos del libro en la página
  const books = await page.$$('.book');

  // Verifica que se hayan cargado todos los libros
  const expectedBookCount = 13;
  expect(books.length).toBe(expectedBookCount);

  for (const book of books) {
    // Verifica que el título del libro se haya cargado
    const title = await book.$eval('.book-title', node => node.textContent);
    expect(title).toBeTruthy();

    // Verifica que la imagen del libro se haya cargado
    const image = await book.$('img');
    expect(image).toBeTruthy();

    // Verifica que la descripción del libro se haya cargado
    const description = await book.$eval('.book-description', node => node.textContent);
    expect(description).toBeTruthy();
  }
});