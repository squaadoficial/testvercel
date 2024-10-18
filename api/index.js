export default async function handler(req, res) {
  try {
    // Definir a URL de destino
    const apiUrl = `https://habulaj-mysqlapi.hf.space${req.url}`;

    // Adicionar o token Bearer ao cabeçalho
    const headers = {
      ...req.headers,
      Authorization: `Bearer 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`,
      // Modificar o cabeçalho Host
      Host: 'hf.space',
    };

    // Fazendo a requisição para a API externa
    const response = await fetch(apiUrl, {
      method: req.method,
      headers: headers,
      body: req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE' ? JSON.stringify(req.body) : null,
    });

    // Pegando o conteúdo da resposta
    const data = await response.text();

    // Configurando a resposta do Vercel sem expor cabeçalhos desnecessários
    res.setHeader('Content-Type', 'application/json');
    res.status(response.status).send(data);
  } catch (error) {
    console.error("Error fetching from the API:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
