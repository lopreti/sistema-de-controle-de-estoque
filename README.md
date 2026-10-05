# Sistema de Controle de Estoque

Sistema desenvolvido para a atividade de Banco de Dados e Back-End, com o objetivo de aplicar conceitos de banco de dados relacional, API REST, operações CRUD, movimentações de estoque e consultas para geração de relatórios.

## Estrutura do projeto

```text
backend/
├── src/
│   ├── database/
│   │   └── connection.js
│   │
│   ├── models/
│   │   ├── categoriaModel.js
│   │   ├── produtoModel.js
│   │   └── movimentacaoModel.js
│   │
│   ├── controllers/
│   │   ├── categoriaController.js
│   │   ├── produtoController.js
│   │   └── movimentacaoController.js
│   │
│   └── routes/
│       ├── categoriaRoutes.js
│       ├── produtoRoutes.js
│       └── movimentacaoRoutes.js
│
├── server.js
├── package.json
└── .gitignore
```

## Banco de dados

O sistema utiliza o banco de dados `estoque_db`, desenvolvido em MariaDB.

### Tabelas

- `categoria`: armazena as categorias dos produtos.
- `produto`: armazena os produtos e seus dados de estoque.
- `movimentacao`: registra as entradas e saídas de produtos.

### Relacionamentos

```text
categoria 1 ───── N produto
produto   1 ───── N movimentacao
```

A tabela `movimentacao` utiliza o campo `tipo` para identificar se a movimentação é uma `ENTRADA` ou `SAIDA`.

## Como executar o projeto

### 1. Instalar as dependências

No terminal, dentro da pasta `backend`:

```bash
npm install
```

### 2. Configurar a conexão com o banco

No arquivo:

```text
src/database/connection.js
```

configure os dados de acesso ao MariaDB:

```js
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'SUA_SENHA',
    database: 'estoque_db',
    connectionLimit: 5
});

module.exports = pool;
```

Caso o usuário `root` não possua senha, utilizar:

```js
password: ''
```

### 3. Criar o banco de dados

Executar no MariaDB/HeidiSQL o script SQL fornecido para a atividade.

O script cria:

- Banco `estoque_db`
- Tabela `categoria`
- Tabela `produto`
- Tabela `movimentacao`
- Dados iniciais
- View de consulta de estoque

### 4. Iniciar o servidor

Modo desenvolvimento:

```bash
npm run dev
```

Ou:

```bash
npm start
```

A API será executada em:

```text
http://localhost:3000
```

## Endpoints da API

### Categorias

#### Listar categorias

```http
GET /api/categorias
```

#### Buscar categoria

```http
GET /api/categorias/:id
```

#### Cadastrar categoria

```http
POST /api/categorias
```

Exemplo:

```json
{
    "nome": "Bebidas"
}
```

#### Atualizar categoria

```http
PUT /api/categorias/:id
```

#### Excluir categoria

```http
DELETE /api/categorias/:id
```

---

# Produtos

### Listar todos os produtos

```http
GET /api/produtos
```

### Buscar produto

```http
GET /api/produtos/:id
```

### Cadastrar produto

```http
POST /api/produtos
```

Exemplo:

```json
{
    "id_categoria": 1,
    "nome": "Alcool em Gel",
    "unidade_medida": "UN",
    "quantidade": 20,
    "valor_unitario": 10.50,
    "estoque_minimo": 0,
    "estoque_maximo": 100
}
```

### Atualizar produto

```http
PUT /api/produtos/:id
```

### Excluir produto

```http
DELETE /api/produtos/:id
```

## Relatórios de produtos

### Valor total por categoria

Calcula o valor total dos produtos de cada categoria considerando:

```text
quantidade × valor unitário
```

Endpoint:

```http
GET /api/produtos/relatorio/valor-categoria
```

### Níveis de estoque

Identifica produtos que atingiram o limite mínimo ou máximo estabelecido para o estoque e apresenta o percentual do nível atingido.

Endpoint:

```http
GET /api/produtos/relatorio/niveis-estoque
```

---

# Movimentações

### Listar movimentações

```http
GET /api/movimentacoes
```

### Buscar movimentação

```http
GET /api/movimentacoes/:id
```

### Registrar entrada ou saída

```http
POST /api/movimentacoes
```

Exemplo de entrada:

```json
{
    "id_produto": 1,
    "tipo": "ENTRADA",
   
