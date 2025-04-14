# API de Hash e Verificação de Senha

API simples com Express.js que utiliza bcrypt para gerar e verificar hashes de senhas.

## Configuração

1. Instale as dependências:

```
npm install
```

2. Inicie o servidor:

```
npm run dev
```

O servidor será iniciado na porta 3000 por padrão.

## Rotas

### Gerar hash de senha

- **URL**: `/hash`
- **Método**: `POST`
- **Corpo**:

```json
{
  "usuario": "seu_usuario",
  "senha": "sua_senha"
}
```

- **Resposta**:

```json
{
  "sucesso": true,
  "usuario": "seu_usuario",
  "hash": "$2a$10$HASH_GERADO_PELO_BCRYPT"
}
```

### Verificar senha

- **URL**: `/verificar`
- **Método**: `POST`
- **Corpo**:

```json
{
  "senha": "sua_senha",
  "hash": "$2a$10$HASH_PREVIAMENTE_GERADO"
}
```

- **Resposta**:

```json
{
  "sucesso": true,
  "match": true // ou false, dependendo se a senha corresponde ao hash
}
```

## Uso com n8n

1. Use a rota `/hash` para gerar hashes ao cadastrar senhas
2. Use a rota `/verificar` para autenticar usuários, enviando a senha informada e o hash armazenado no banco de dados
