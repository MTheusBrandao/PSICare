# 🧠 PsiCare - Sistema de Monitoramento Emocional

Aplicação web voltada ao bem-estar psicológico, permitindo que pacientes registrem seus sentimentos, acompanhem seu histórico emocional e mantenham comunicação com profissionais da saúde. O projeto utiliza **Node.js com Express** no backend, **Prisma ORM** com **MongoDB Atlas**, e frontend em **HTML/CSS/JS puro**.

---

## 🎯 Funcionalidades Principais

- Cadastro e login de pacientes
- Registro diário do humor com descrição e emoji
- Visualização do histórico de emoções
- Logout seguro com expiração de sessão
- Interface responsiva e intuitiva

---

## 🧰 Tecnologias Utilizadas

### 🔹 Frontend
- HTML5, CSS3 e JavaScript puro
- Formulários dinâmicos com `fetch`
- Armazenamento de token com `localStorage`
- Design responsivo com layout em grid

### 🔸 Backend
- Node.js com Express
- MongoDB Atlas (banco de dados)
- Prisma ORM
- JWT para autenticação
- Dotenv para gerenciamento de variáveis
- Validação de dados no backend

---

## 🚀 Como Rodar o Projeto Localmente

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/psicare.git
cd psicare
```

### 2. Backend - Servidor Node.js
```bash
cd backend
npm install

# Crie o arquivo .env e defina:
# DATABASE_URL=mongodb+srv://<usuario>:<senha>@cluster.mongodb.net/psicare
# JWT_SECRET=sua_chave_jwt

npx prisma generate
npm start
```

### 3. Frontend - Servidor Local
```bash
cd frontend
python -m http.server
```
Acesse: `http://127.0.0.1:8000`

---

## 📁 Estrutura do Projeto

```
backend/
├── controllers/         # Controladores das rotas
├── middlewares/         # Validação, autenticação
├── routes/              # Endpoints públicos e privados
├── prisma/              # Esquema do banco e client
├── utils/               # Funções auxiliares
├── app.js               # Configuração principal do app
├── .env                 # Variáveis de ambiente
└── server.js            # Inicialização do servidor

frontend/
├── index.html
├── login.html
├── cadastro.html
├── humor.html
├── historico.html
└── style.css
```

---

## 👥 Perfis de Usuário

### Paciente
- Realiza cadastro e login
- Registra seu humor com emoji e texto
- Visualiza seu histórico emocional

### (Futuro) Profissional de Saúde
- Acesso ao histórico de seus pacientes
- Painel com estatísticas e evolução emocional

---

## 🔐 Segurança e Privacidade

- Senhas criptografadas e tokens JWT
- Armazenamento seguro no MongoDB Atlas
- Apenas dados essenciais são coletados

---

## 📞 Contato e Suporte

- 📧 Email: contato@psicare.com.br  
- 📱 Telefone: (61) 99999-0000

---

**© PsiCare - Plataforma de Acompanhamento Psicológico**  
*Construída com foco na empatia, privacidade e acessibilidade*
