 # Quiz da Galera
Este projeto é um sistema de quiz onde **apenas administradores autenticados** podem
**criar, editar e excluir quizzes**, enquanto **alunos logados** podem **responder quizzes e
visualizar os resultados**.
## 1. Tecnologias Utilizadas
### 1.1 Front-End
- **Angular** – Framework principal para construção do SPA (Single Page Application)
- **RxJS** – utilizado no projeto para lidar com operações assíncronas, principalmente nas requisições HTTP feitas aos endpoints da API.
- **Ng-Zorro** – Biblioteca de componentes visuais (botões, tabelas, ícones, notificações etc.)
---
## 2. Como Rodar o Projeto
### 2.1 Clonando o Repositório Back
```bash
$ git clone https://github.com/beladays/quiz-back.git
````
### 2.2 Clonando o Repositório Front
```bash
$ git clone https://github.com/beladays/quiz-angular.git
````
### 2.3 Rodar o Back-End
> Certifique-se de ter o banco de dados MySQL configurado corretamente e as variáveis no
arquivo `.env`.
```bash
cd quiz-back
npm i
npx prisma generate
npm start
````
### 2.4 Rodar o Front-End
```bash
cd quiz-angular
npm i
ng serve -o
````
## 3. Funcionalidades
-✅ Login de usuários e administradores
-✅ Resposta a quizzes com exibição de resultado
-✅ Área administrativa com criação, edição e exclusão de quizzes
-✅ Proteção de rotas por autenticação
