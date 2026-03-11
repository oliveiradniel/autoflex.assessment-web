# 🏭 ForgePlan – Plataforma de Controle de Produção Industrial

![ForgePlan - Tela de Produtos](https://raw.githubusercontent.com/oliveiradniel/forgeplan-web/refs/heads/main/src/assets/screenshots/products.png)

> O ForgePlan Web é a interface de gerenciamento industrial do sistema ForgePlan, desenvolvida com o objetivo de proporcionar uma experiência fluida e intuitiva para o controle de estoque e planejamento de produção.

O projeto foca fortemente na comunicação eficiente com APIs REST, gerenciamento de estados para formulários complexos e na visualização clara de dados estratégicos, como o cálculo de viabilidade produtiva processado pelo back-end.

![Status](https://img.shields.io/badge/status-estável-2ECC71?style=flat-square)

---

O que essa interface entrega:

- Painel de Gestão: Visualização clara de produtos e matérias-primas com feedback visual de estoque.
- Ficha Técnica Dinâmica: Interface para associar insumos a produtos de forma interativa, facilitando a montagem da estrutura de fabricação.
- Simulador de produção: Área dedicada para visualizar quais itens são viáveis para produção de acordo com o estoque atual.
- Consumo de API Robusto: Mensagens informativas de sucesso ou erro exibidas de forma amigável ao usuário.

---

## 📊 Instruções para rodar a plataforma web

1. Clone o repositório e acesse o diretório do projeto:

```bash
git clone https://github.com/oliveiradniel/forgeplan-web.git

cd forgeplan-web
```

2. Instale as dependências:

```bash
npm install
```

3. Copie o arquivo de variáveis de ambiente:

Linux/macOS

```bash
cp .env.example .env
```

Windows (PowerShell)

```bash
copy .env.example .env
```

4. Executando em modo de desenvolvimento:

```bash
npm run dev
```

5. Acessar a plataforma

- A aplicação web estará rodando em: `http://localhost:5173/`
- As rotas são:
  - produtos
  - materias-primas
  - relatorio-de-producao

---

## 🚀 Tecnologias utilizadas

| Tecnologia                   | Finalidade                                                                                   |
| ---------------------------- | -------------------------------------------------------------------------------------------- |
| Vite                         | Build tool ultra-rápido para o desenvolvimento e empacotamento do projeto.                   |
| React                        | Biblioteca principal para construção da interface baseada em componentes.                    |
| TailwindCSS                  | Framework CSS utilitário para estilização rápida e responsiva.                               |
| TanStack Router              | Gerenciamento de rotas com tipagem segura (Type-safe) para navegação na SPA.                 |
| TanStack Table               | Lógica poderosa para criação de tabelas complexas, paginação e ordenação de dados.           |
| TanStack Query (React Query) | Gerenciamento de estado assíncrono, cache e sincronização de dados com a API.                |
| Axios                        | Cliente HTTP para consumo dos endpoints REST da API Quarkus.                                 |
| React Hook Form              | Gerenciamento de formulários focado em performance e validação flexível.                     |
| Zod                          | Esquema de validação de dados com tipagem estática para garantir a integridade dos inputs.   |
| shadcn                       | Componentes de interface reutilizáveis e acessíveis, construídos com Radix UI.               |
| Prettier                     | Formatador de código opinativo para manter a consistência visual do projeto.                 |
| ESLint                       | Ferramenta de linting para identificar e corrigir problemas no código JavaScript/TypeScript. |

---

## 📄 Variáveis de Ambiente

O projeto utiliza um arquivo `.env` com as seguintes variáveis:

| Nome           | Descrição                | Exemplo                 |
| -------------- | ------------------------ | ----------------------- |
| `VITE_API_URL` | URL de conexão com a API | `http://localhost:8080` |

---

## 🎨 Algumas telas da aplicação

### Gestão de Produtos

Controle centralizado do seu catálogo. Visualize o inventário total e utilize a busca em tempo real para localizar itens rapidamente. Interface completa para criação, edição e remoção de registros.

![ForgePlan - Tela de Produtos](https://raw.githubusercontent.com/oliveiradniel/forgeplan-web/refs/heads/main/src/assets/screenshots/products.png)

### Controle de Matérias-primas

Gestão detalhada de insumos com foco em integridade. O sistema monitora o estoque disponível e possui validações que impedem a exclusão de materiais que já compõem a ficha técnica de produtos existentes.

![ForgePlan - Tela de Matérias-primas](https://raw.githubusercontent.com/oliveiradniel/forgeplan-web/refs/heads/main/src/assets/screenshots/raw-materials.png)

### Relatório de produção (RF004)

Exibe o cálculo inteligente de produção baseado no estoque atual. A tela prioriza itens de maior valor unitário e identifica o potencial máximo de fabricação, servindo como ferramenta estratégica para o planejamento industrial.

![ForgePlan - Tela de relatório de produção](https://raw.githubusercontent.com/oliveiradniel/forgeplan-web/refs/heads/main/src/assets/screenshots/report.png)

---

## 🛜 Conexão com a API

Para conseguir utilizar a aplicação vá até o [repositório da API](https://github.com/oliveiradniel/forgeplan-server) e siga os passos corretamente para colocá-la no ar e fazer uso da aplicação web.

## 🧑🏻‍💻 Veja mais projetos meus

- [JungleOps](https://jungleops.com.br/) - Aplicação web para gerenciamento de tarefas em equipe, com autenticação centralizada, comentários e
  notificações em tempo real.
- [InOrbit](https://app.inorbit.site/login) - Aplicação web para gestão de metas semanais com autenticação OAuth (GitHub), regras de negócio
  temporais, histórico de execuções e sistema de gamificação por progresso do usuário.
- [Jovem Books]() - Aplicação web para organização e descoberta de livros, com interface intuitiva, métricas de leitura e
  integração à Google Books API.
