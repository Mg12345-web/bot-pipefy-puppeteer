const express = require('express');
const app = express();
const puppeteer = require('puppeteer');

app.get('/', async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('https://app.pipefy.com/login');
    await page.type('input[name=email]', 'juridicomgmultas@gmail.com');
    await page.click('button[type=submit]');
    await page.waitForTimeout(2000);
    await page.type('input[name=password]', 'Mg.12345@');
    await page.click('button[type=submit]');
    await page.waitForNavigation();

    await page.goto('https://app.pipefy.com/apollo_databases/304722696');
    await page.waitForSelector('button:has-text("Criar registro")', { timeout: 10000 });
    await page.click('button:has-text("Criar registro")');

    await page.screenshot({ path: 'formulario_cliente.png' });
    await browser.close();

    res.send('✅ Print tirado com sucesso!');
  } catch (error) {
    console.error(error);
    res.status(500).send('❌ Erro ao executar o robô.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
