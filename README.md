# Projeto Next.js + MySQL com Drizzle ORM, Criptografia de CPF, Auth.js e Rate Limiting

Este projeto completo foi estruturado seguindo as melhores práticas de segurança e arquitetura para Next.js App Router.

## 🚀 Como Rodar na sua Máquina

### 1. Pré-requisitos
- Node.js (v18 ou superior instalado)
- Servidor MySQL rodando localmente (ou via Docker / XAMPP)
- Conta gratuita no [Upstash Redis](https://upstash.com/) para o Rate Limiting

### 2. Instalação das Dependências
Abra a pasta do projeto no terminal e instale as dependências:
```bash
npm install
```

### 3. Configurar as Variáveis de Ambiente
O arquivo `.env.local.example` não está incluído no projeto. Crie `.env.local` na raiz com as variáveis necessárias:

- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER` e `DB_PASSWORD`, alinhadas com a configuração do serviço MySQL no `compose.yaml`.
- `AUTH_SECRET`, usado pelo Auth.js para assinar as sessões.
- `ENCRYPTION_KEY` (32 caracteres) e `HASH_SECRET`, usados para proteger os CPFs.
- `UPSTASH_REDIS_REST_URL` e `UPSTASH_REDIS_REST_TOKEN`, usados pelo rate limiting do formulário.

### 4. Configurar o Banco de Dados MySQL
Crie um banco de dados vazio no seu MySQL:
```sql
CREATE DATABASE seu_banco;
```

### 5. Executar as Migrações do Drizzle
Sincronize o schema com o banco de dados:
```bash
npm run db:push
```

### 6. Popular Usuário Administrador (Seed)
Execute o script de seed para criar o primeiro usuário administrador no banco:
```bash
npx tsx src/db/seed.ts
```
* Credenciais de desenvolvimento criadas (troque a senha antes de usar em produção):
  - **E-mail:** `admin@exemplo.com`
  - **Senha:** `admin123`

### 7. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```
Acesse no navegador: `http://localhost:3000`
- **Público:** `http://localhost:3000` (Formulário de assinaturas)
- **Administrativo:** `http://localhost:3000/signatures` (Redireciona para login)
