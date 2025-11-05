# 🧪 Projeto de Automação de Testes de API com Cypress + Allure Report

Este projeto foi desenvolvido como parte de um desafio técnico de QA, com foco em **automação de testes de API** utilizando o **Cypress**, a API pública [Serverest.dev](https://serverest.dev/), e integração com **Allure Report** para geração de relatórios detalhados.

---

## 🚀 Tecnologias Utilizadas

- [Cypress](https://www.cypress.io/) — Framework principal de automação
- [Allure Report](https://docs.qameta.io/allure/) — Relatórios visuais dos testes
- [Node.js](https://nodejs.org/) — Ambiente de execução
- [GitHub Actions](https://docs.github.com/en/actions) — CI/CD e publicação do relatório

---

##  Estrutura do Projeto

api-serverest-cypress/
├── cypress/
│ ├── e2e/
│ │ └── api/
│ │ ├── login.cy.js
│ │ ├── usuarios.cy.js
│ │ ├── produtos.cy.js
│ │ └── carrinhos.cy.js
│ ├── fixtures/
│ │ └── dados.json
│ └── support/
│ ├── e2e.js
│ └── apiHelper.js
├── allure-results/
├── allure-report/
├── cypress.config.js
├── package.json
└── README.md


---

## ⚙️ Configuração do Ambiente

### 1️⃣ Pré-requisitos
- Node.js v18+  
- NPM (instalado junto com o Node)
- Git (opcional para versionamento)

---

### 2️⃣ Instalar dependências
npm install

Execução dos Testes
Rodar todos os testes
npx cypress run


Os resultados brutos dos testes serão gerados automaticamente na pasta:

/allure-results

📊 Gerar e Visualizar o Relatório Allure
Gerar o relatório
npx allure generate allure-results --clean -o allure-report

Abrir o relatório localmente
npx allure open allure-report

🔁 Execução automatizada no GitHub Actions

Este projeto inclui um workflow de CI/CD que:

Instala as dependências

Executa os testes automaticamente

Gera o relatório Allure

Publica o resultado no GitHub Pages

Arquivo: .github/workflows/ci.yml

⚙️ Como habilitar

Vá em Settings → Pages

Em Build and deployment, selecione Source: GitHub Actions

Após o próximo push no branch main, o relatório estará disponível em:

https://github.com/Guilherme-Aragao/desafio-api-QA

##  Levantamento de Cenários de Teste (Planejamento)

###  Login
1. Login com credenciais válidas deve retornar token.
2. Login com senha incorreta deve retornar 401.
3. Login com usuário inexistente deve retornar 401.
4. Login com campos obrigatórios ausentes deve retornar 400.
5. Validar estrutura do corpo de resposta (token e mensagem).

###  Usuários
1. Criar novo usuário com dados válidos.
2. Criar usuário com e-mail já existente.
3. Buscar lista de usuários (GET /usuarios).
4. Buscar usuário por ID.
5. Editar usuário existente (PUT).
6. Tentar editar usuário inexistente.
7. Excluir usuário existente.
8. Tentar excluir usuário inexistente.

###  Produtos
1. Criar produto com sucesso (autenticado).
2. Criar produto sem autenticação.
3. Buscar lista de produtos.
4. Buscar produto por ID.
5. Atualizar produto existente.
6. Tentar cadastrar produto duplicado.
7. Deletar produto existente.
8. Deletar produto inexistente.

###  Carrinhos
1. Criar carrinho com produto válido.
2. Criar carrinho com produto inexistente.
3. Consultar carrinho de um usuário.
4. Concluir compra (encerrar carrinho).
5. Excluir carrinho (cancelar compra).
6. Criar mais de um carrinho ativo para o mesmo usuário (deve bloquear).


🧠 Endpoints Testados
Endpoint	Cenário 1	                   Cenário 2
Login	    Login com sucesso	           Login com senha incorreta
Usuários	Criar usuário com sucesso	   Criar usuário com e-mail duplicado
Produtos	Criar produto autenticado	   Tentar criar produto sem autenticação
Carrinhos	Criar carrinho com sucesso	   Criar carrinho com produto inexistente

🧾 Scripts úteis
"scripts": {
  "test": "npx cypress run",
  "allure:generate": "npx allure generate allure-results --clean -o allure-report",
  "allure:open": "npx allure open allure-report"
}


npm run test → Executa os testes

npm run allure:generate → Gera o relatório

npm run allure:open → Abre o relatório no navegador

🧰 Boas práticas adotadas

Cenários independentes entre si

Criação e limpeza de dados antes de cada execução (beforeEach)

Estrutura de testes modularizada (cada endpoint em um arquivo próprio)

Geração automática de token de autenticação

Integração com Allure Report e CI/CD no GitHub Actions

👨‍💻 Autor

Guilherme Aragão
💼 QA Engineer | Automação de Testes | Cypress | API | CI/CD
📧 guilhermearagao2001@hotmail.com
🌐 LinkedIn - linkedin.com/in/guilherme-aragão-silva-367758235

🏁 Resultado final

✅ Testes automatizados de API funcionando

📊 Relatórios Allure locais e hospedados no GitHub Pages

⚙️ CI/CD rodando no GitHub Actions

“A automação é uma forma de garantir qualidade contínua — não apenas velocidade.”