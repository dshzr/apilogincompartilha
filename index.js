require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rota para gerar hash da senha
app.post('/hash', async (req, res) => {
  try {
    const { senha } = req.body;

    // Validação básica
    if (!senha) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Senha é obrigatória',
      });
    }

    // Gera o hash da senha
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    res.json({
      sucesso: true,

      hash: senhaHash,
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno do servidor',
    });
  }
});

// Rota para verificar senha
app.post('/verificar', async (req, res) => {
  try {
    const { senha, hash } = req.body;

    // Validação básica
    if (!senha || !hash) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Senha e hash são obrigatórios',
      });
    }

    // Compara a senha com o hash
    const match = await bcrypt.compare(senha, hash);

    res.json({
      sucesso: true,
      match: match,
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno do servidor',
    });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
