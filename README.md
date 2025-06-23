# 📘 Projeto de Teste - Iforth

Este é um projeto de teste técnico para a empresa **Iforth**, utilizando **Next.js**, **Prisma ORM** e **PostgreSQL**, com autenticação via **JWT**.

---

## 🚀 Tecnologias usadas

- **Next.js (App Router)**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **JWT (JSON Web Token)**
- **React Hook Form**
- **TailwindCSS**

---

## ⚙️ Variáveis de Ambiente (.env)

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
DATABASE_URL="postgresql://<seu-servidor>/<seu-database>?schema=public"
JWT_SECRET=secreto1234
```
✅ Obs: A string de conexão do banco deve apontar para seu ambiente local ou o banco fornecido pela empresa.

## 👤 Login de Teste
Para acessar o sistema, utilize as seguintes credenciais fixas:
Usuário: iforth.development.test
Senha: famosaSenha123

## 📥 Como rodar o projeto localmente
1. Instale as dependências:
```bash 
npm install
```
2. Configure o banco de dados:
Caso necessário, rode as migrations Prisma para criar as tabelas:
```bash
npx prisma migrate dev
```
#### ou

```bash 
npx prisma db push
``` 
Se o banco de dados já estiver pronto, apenas gere o client Prisma:

```bash
npx prisma generate
```
3. Inicie o projeto:
```bash 
npm run dev
```

O projeto estará disponível em:
```bash
http://localhost:3000
```
## ✅ Funcionalidades implementadas
Login com JWT
Proteção de rotas
CRUD básico (exemplo: Produtos, Produção, etc)
Validações de formulário
Fluxo de confirmação antes de ações sensíveis (Salvar)

🛠️ Scripts úteis
Rodar Prisma Migrate:

Ver o banco com Prisma Studio:
```bash
npx prisma studio
```
## ✅ Notas finais
Este projeto foi desenvolvido apenas para fins de avaliação técnica.


### Considerações finais
Obrigado por me avaliar, caso o projeto esteja fora do padrão que você esteja acostumado, eu aprendo se padrão e jeito de programar. 
Não tive tempo de implementar totalmente a funcionalidade de Permissões mas já está quase tudo pronto para utilizar essa funcionalidade.

@SauloRamos 😁👍
