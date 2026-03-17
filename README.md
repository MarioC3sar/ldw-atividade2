# Controle de Hábitos Diários

Aplicativo desenvolvido para gerenciar e monitorar hábitos diários com uma interface moderna e responsiva.

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como atividade de aprendizado em React, focando na integração de **Redux Toolkit** para gerenciamento de estado global e **Material UI** para construção da interface de usuário.

### Objetivo

Criar um aplicativo que permita aos usuários:
- Cadastrar novos hábitos para monitorar diariamente
- Alterar informações dos hábitos (nome ou categoria)
- Marcar hábitos como concluídos
- Excluir hábitos
- Filtrar hábitos por categoria
- Limpar todos os hábitos concluídos de uma vez

## 🎯 Funcionalidades Implementadas

### ✅ Adicionar Hábitos
- Formulário para adicionar novos hábitos com nome e categoria
- Validação de entrada (não permite campos vazios)
- Suporte a categorias personalizadas

### ✅ Editar Hábitos
- Diálogo modal para editar nome e categoria de um hábito
- Interface intuitiva com Material UI Dialog

### ✅ Marcar como Concluído
- Checkbox para marcar/desmarcar hábitos como concluídos
- Indicação visual com efeito de tachado (strikethrough)
- Contador de hábitos concluídos

### ✅ Excluir Hábitos
- Botão de exclusão em cada item da lista
- Removção imediata do hábito

### ✅ Filtrar por Categoria
- Select dropdown para filtrar hábitos
- Opção "todas" para exibir todos os hábitos
- Categorias dinâmicas baseadas nos hábitos existentes

### ✅ Limpar Concluídos
- Botão para remover todos os hábitos concluídos
- Desabilitado quando não há hábitos concluídos

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React** 18+ - Biblioteca para construção de interfaces
- **Vite** - Build tool rápido e moderno
- **Redux Toolkit** - Gerenciamento de estado global simplificado
- **React-Redux** - Integração React com Redux
- **Material UI** - Biblioteca de componentes de UI

### Dependências Principais
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "@reduxjs/toolkit": "^1.9.7",
  "react-redux": "^8.1.3",
  "@mui/material": "^5.14.20",
  "@mui/icons-material": "^5.14.20",
  "@emotion/react": "^11.11.3",
  "@emotion/styled": "^11.11.0"
}
```

## 📁 Estrutura do Projeto

```
src/
├── store/
│   ├── store.js           # Configuração do Redux store
│   └── habitsSlice.js     # Slice com actions e reducers
├── App.jsx                # Componente principal
├── main.jsx               # Entry point com Provider
├── index.css              # Estilos globais
└── assets/                # Recursos estáticos
```

### Arquivos Principais

#### `store/habitsSlice.js`
Define o estado global dos hábitos e todas as ações (actions) para manipulá-lo:
- `addHabit` - Adiciona um novo hábito
- `updateHabit` - Atualiza nome ou categoria
- `toggleHabit` - Marca/desmarco como concluído
- `deleteHabit` - Remove um hábito
- `setFilterCategory` - Define filtro de categoria
- `clearCompleted` - Remove todos concluídos

#### `store/store.js`
Configura o Redux store com o habitsReducer.

#### `App.jsx`
Componente principal que:
- Conecta ao Redux com hooks `useDispatch` e `useSelector`
- Renderiza todos os componentes Material UI
- Gerencia estado local do formulário
- Lida com eventos de usuário

#### `main.jsx`
Configura a aplicação com:
- Redux Provider para disponibilizar store
- Material UI ThemeProvider com tema customizado
- CssBaseline para reset de estilos

## 🚀 Como Executar

### Instalação de Dependências
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```
Abre a aplicação em modo desenvolvimento com Hot Module Replacement (HMR).

### Build para Produção
```bash
npm run build
```
Gera os arquivos otimizados na pasta `dist/`.

### Preview de Produção
```bash
npm run preview
```
Visualiza o build de produção localmente.

## 🎨 Design e Interface

- **Tema Customizado**: Cores primárias em roxo (`#5b4b8a`) e secundárias em turquesa (`#00a896`)
- **Layout Responsivo**: Adapta-se a diferentes tamanhos de tela
- **Componentes Material UI**:
  - Card, TextField, Select, Button, IconButton
  - Dialog para edição
  - List para exibição de hábitos
  - Chip para contadores
  - Alert para estados vazios

## 📊 Estado Redux (Redux Toolkit)

```javascript
{
  habits: {
    habits: [
      {
        id: "unique-id",
        name: "Beber água",
        category: "saúde",
        completed: false
      },
      // ... mais hábitos
    ],
    filterCategory: "todas",
    defaultCategories: ["saúde", "estudo", "lazer"]
  }
}
```

## 🔄 Fluxo de Dados

1. Usuário interage com a interface (clica em botão, preenche formulário)
2. Componente dispara uma action Redux
3. Reducer atualiza o estado global
4. Componente re-renderiza com novo estado via `useSelector`

## 📝 Exemplos de Uso

### Adicionar Hábito
1. Preencher o campo "Nome do hábito"
2. Selecionar a categoria
3. Clicar em "Adicionar"

### Editar Hábito
1. Clicar no ícone de edição (lápis)
2. Modificar nome ou categoria
3. Clicar em "Salvar"

### Filtrar por Categoria
1. Abrir o select "Filtrar por categoria"
2. Selecionar a categoria desejada

### Limpar Hábitos Concluídos
1. Marcar hábitos como concluídos (checkbox)
2. Clicar em "Limpar concluídos"

## 🎓 Conceitos de Aprendizado

Este projeto demonstra:
- ✅ Gerenciamento de estado com Redux Toolkit
- ✅ Uso de hooks React (useState, useSelector, useDispatch)
- ✅ Integração de biblioteca de UI (Material UI)
- ✅ Formulários controlados
- ✅ Filtering e transformação de dados
- ✅ Componentização
- ✅ Build com Vite

## 📦 Build

O projeto foi compilado com sucesso usando Vite:
```
✓ 932 modules transformed.
dist/index.html                   0.46 kB
dist/assets/index-CtvXdhoZ.css    0.03 kB
dist/assets/index-CQ1R81s-.js   415.27 kB (gzip: 130.42 kB)
✓ built in 2.18s
```

## 📄 Licença

Este projeto é fornecido como material educacional.
