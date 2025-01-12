# Form - rudneyrodrigues.dev.br

Um aplicativo de criação de formulários dinâmicos semelhante ao Google Forms. Permite que usuários criem, editem, visualizem e gerenciem formulários de forma intuitiva.

## 🛠️ Tecnologias Utilizadas

### Front-End

- **React.js** (com Vite)
- **Chakra UI** (para estilização)
- **SWR** (para gerenciamento de dados)
- **React Router** (para navegação)
- **React Hook Form** (para manipulação de formulários)

### Back-End

- **Firebase** (Firestore, Storage e Authentication)
- **Firebase SDK** (integração com o front-end)

### Outras Ferramentas

- **Vercel** (para hospedagem do front-end)
- **TypeScript** (para tipagem e segurança de código)

---

## ⚙️ Funcionalidades

- **Autenticação**:

  - Cadastro e login de usuários com Firebase Authentication.

- **Criação de Formulários**:

  - Título do formulário.
  - Adição, edição e exclusão de questões.
  - Tipos de questões disponíveis: múltipla escolha, texto curto, parágrafo, checkbox, entre outros.
  - Configuração de obrigatoriedade de respostas.

- **Edição de Formulários**:

  - Possibilidade de desfazer/refazer alterações (função de undo/redo).
  - Reorganização automática das questões ao adicionar/remover.

- **Visualização de Formulários**:

  - Formulários públicos e privados.
  - Organização de questões em ordem definida pelo criador.

- **Gerenciamento de Formulários**:

  - Listagem de todos os formulários criados pelo usuário.
  - Exclusão completa do formulário, incluindo todas as questões.

- **Responsividade**:
  - Totalmente adaptado para dispositivos móveis, tablets e desktops.

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

Certifique-se de ter instalado:

- Node.js (>= 18)
- Firebase CLI (opcional, para deploys no Firebase)
- Vercel CLI (opcional, para deploys na Vercel)

### Instalação

1. Clone o repositório:

   ```bash
   gh repo clone rudneyrodrigues/forms-google-clone
   cd forms-google-clone
   ```

2. Instale as dependências:

   ```bash
   pnpm install
   ```

3. Configure o Firebase:

   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/).
   - Ative o Firestore e a autenticação por e-mail/senha e google.
   - Adicione o arquivo `firebase-config.ts` em `src/service/` com as informações do seu projeto:

     ```typescript
     import { initializeApp } from 'firebase/app'

     const firebaseConfig = {
     	apiKey: 'SUA_API_KEY',
     	authDomain: 'SEU_AUTH_DOMAIN',
     	projectId: 'SEU_PROJECT_ID',
     	storageBucket: 'SEU_STORAGE_BUCKET',
     	messagingSenderId: 'SEU_MESSAGING_SENDER_ID',
     	appId: 'SEU_APP_ID'
     }

     export const app = initializeApp(firebaseConfig)
     ```

4. Inicie o servidor local:

   ```bash
   pnpm dev
   ```

5. Acesse o projeto no navegador em:
   ```
   http://localhost:5173
   ```

---

## 🌐 Deploy

### Vercel

1. Faça o deploy na Vercel:

   ```bash
   vercel deploy
   ```

2. Certifique-se de configurar as variáveis de ambiente no painel da Vercel.

### Firebase Hosting

1. Faça o build do projeto:

   ```bash
   npm run build
   ```

2. Faça o deploy:
   ```bash
   firebase deploy
   ```

---

## 🗂️ Estrutura de Pastas

```
src/
├── app/                # Páginas principais do aplicativo
├── assets/             # Imagens e outros arquivos estáticos
├── components/         # Componentes reutilizáveis
  ├── app/              # Componentes principais do aplicativo
  ├── ui/               # Componentes de interface (botões, inputs, etc)
├── config/             # Configurações do projeto (tipos, constantes)
├── context/            # Contextos globais (ex: autenticação)
├── hooks/              # Hooks personalizados (ex: SWR hooks)
├── routes/             # Rotas do aplicativo
├── service/            # Configurações e integrações com Firebase
├── utils/              # Funções auxiliares e utilitárias
```

---

## 💡 Melhorias Futuras

- Adicionar suporte a respostas anônimas em formulários públicos.
- Implementar análises gráficas para visualizar os resultados das respostas.
- Permitir a exportação dos dados dos formulários em CSV ou Excel.
- Adicionar temas customizáveis para formulários.

---

<!-- ## 🧑‍💻 Contribuindo

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Faça um fork do projeto.
2. Crie uma branch com sua funcionalidade/correção:
   ```bash
   git checkout -b minha-feature
   ```
3. Commit suas alterações:
   ```bash
   git commit -m "Minha nova feature"
   ```
4. Faça um push para a branch:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request no repositório original.

--- -->

## 📝 Licença

Este projeto está sob a licença **MIT**. Consulte o arquivo [`LICENSE`](LICENSE) para mais detalhes.
