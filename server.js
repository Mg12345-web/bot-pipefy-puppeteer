const express = require('express');
const puppeteer = require('puppeteer');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto('https://app.pipefy.com/login');
    await page.screenshot({ path: 'screenshot.png' });

    await browser.close();

    res.send('✅ Bot acessou o Pipefy e tirou o print com sucesso!');
  } catch (error) {
    console.error('Erro ao executar o bot:', error);
    res.status(500).send('❌ Erro ao rodar o bot.');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
