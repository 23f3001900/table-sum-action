const { chromium } = require('playwright');

const seeds = Array.from({ length: 10 }, (_, i) => 26 + i);
const urls = seeds.map(seed => `https://example.com/seed-${seed}`); // Replace with actual URLs

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let total = 0;

  for (const url of urls) {
    await page.goto(url);
    const tables = await page.$$('table');

    for (const table of tables) {
      const rows = await table.$$('tr');
      for (const row of rows) {
        const cells = await row.$$('td');
        for (const cell of cells) {
          const text = await cell.innerText();
          const num = parseFloat(text.replace(/[^0-9.\-]/g, ''));
          if (!isNaN(num)) total += num;
        }
      }
    }
  }

  console.log(`ANSWER: ${total}`);
  await browser.close();
})();