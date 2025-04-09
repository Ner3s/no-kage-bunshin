# Arquitetura do Projeto No Kage Bunshin

Este documento descreve a arquitetura do projeto No Kage Bunshin, detalhando seus componentes, camadas e as interações entre eles.

## Visão Geral

O projeto segue os princípios da Clean Architecture, com clara separação de responsabilidades:

```
+-------------------+
|     Frontend      |
| (React/TypeScript)|
+--------+----------+
         |
         | Adapters
         v
+-------------------+
|      Backend      |
|       (Go)        |
+-------------------+
```

## Camadas do Backend

```
+-----------------------------------+
|           Interfaces              |
| (APIs, handlers, controllers)     |
+-----------------------------------+
                |
                v
+-----------------------------------+
|           Application             |
|         (Use Cases)               |
+-----------------------------------+
                |
                v
+-----------------------------------+
|             Domain                |
| (Entidades, Serviços, Interfaces) |
+-----------------------------------+
                |
                v
+-----------------------------------+
|         Infrastructure            |
|    (Implementações concretas)     |
+-----------------------------------+
```

### Domain

A camada de domínio contém as entidades core do negócio e interfaces:

- `entities/`: Define as estruturas de dados principais como `duplicate_file.go` e `file_info.go`
- `repositories/`: Interfaces para acesso a dados como `file_repository.go` 
- `services/`: Interfaces para serviços de negócio como `duplicate_detector_service.go`

### Application

Implementa os casos de uso da aplicação:

- `usecases/`: Contém a lógica de aplicação como `find_duplicates_usecase.go`, `delete_duplicates_usecase.go`

### Infrastructure 

Fornece implementações concretas para as interfaces definidas na camada de domínio:

- `persistence/`: Implementações dos repositórios e serviços
- `utils/`: Utilitários para operações do sistema como `move_to_trash.go`

### Interfaces

Conecta o mundo exterior com a aplicação:

- `handlers/`: Define os handlers que lidam com as requisições (como `app_handler.go`)

## Camadas do Frontend

```
+-----------------------------------+
|             Pages                 |
|       (Componentes de páginas)    |
+-----------------------------------+
                |
                v
+-----------------------------------+
|            Contexts               |
|     (Gerenciamento de estado)     |
+-----------------------------------+
                |
                v
+-----------------------------------+
|            Components             |
|     (Componentes reutilizáveis)   |
+-----------------------------------+
                |
                v
+-----------------------------------+
|         Utils/Adapters            |
| (Comunicação com backend)         |
+-----------------------------------+
```

### Utils/Adapters 

Responsáveis pela comunicação entre o frontend e o backend:

- `adapters/file/`: Adaptadores para operações de arquivo
- `adapters/browser/`: Adaptadores para operações de navegador

### Components

Componentes reutilizáveis da interface:

- `ui/`: Componentes básicos (buttons, cards, etc)
- `containers/`: Componentes que agrupam outros componentes
- `layouts/`: Estruturas de layout para as páginas

### Contexts

Gerenciamento de estado global da aplicação:

- `use-file.tsx`: Gerencia estado relacionado a arquivos
- `use-toast.tsx`: Gerencia notificações toast

### Pages

Componentes de página que utilizam components, contexts e utils:

- `home.tsx`: Página inicial
- `clones.tsx`: Página de exibição de arquivos duplicados

## Fluxo de Dados

1. O usuário interage com uma página no frontend
2. O context apropriado processa a ação do usuário
3. O adapter correspondente é chamado para comunicar com o backend
4. O handler no backend recebe a requisição
5. O caso de uso apropriado é executado
6. Os serviços e repositórios do domínio são utilizados
7. A resposta volta pelo mesmo caminho

## Padrões de Design Utilizados

- **Adapter Pattern**: Isola a comunicação entre frontend e backend
- **Repository Pattern**: Abstrai o acesso a dados
- **Dependency Injection**: Facilita testes e desacoplamento
- **Clean Architecture**: Separa claramente as responsabilidades