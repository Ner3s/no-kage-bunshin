<br>
<div align="center">
  <img src="./build/appicon.png" width="128"/>
  <h1 align="center">No Kage Bunshin</h1>
  <p align="center"><strong>No Kage Bunshin é um software de remoção de arquivos duplicados</strong></p>
  <br>
  <img src="./resources/preview.png" >
</div>

## Visão Geral

**No Kage Bunshin** é um aplicativo desktop desenvolvido com Wails, Go, React e TypeScript, projetado para identificar e gerenciar arquivos duplicados em um sistema. O nome faz referência à técnica de clonagem do anime Naruto ("Kage Bunshin no Jutsu"), aludindo à ideia de encontrar "clones" (arquivos duplicados) e eliminá-los para manter apenas os originais.

## Arquitetura do Sistema

O aplicativo segue uma arquitetura baseada em Domain-Driven Design (DDD) e Clean Architecture:

### Back-end (Go)

A estrutura do backend segue os princípios do DDD e Clean Architecture com as seguintes camadas:

1. **Domain Layer (Camada de Domínio)**
   - **Entities**: Contém as entidades principais do sistema como `FileInfo` e `DuplicateFile`
   - **Repositories**: Define interfaces para acesso a dados
   - **Services**: Define interfaces para serviços de domínio

2. **Application Layer (Camada de Aplicação)**
   - **Use Cases**: Implementa os casos de uso da aplicação, orquestrando a lógica de negócios

3. **Infrastructure Layer (Camada de Infraestrutura)**
   - **Persistence**: Implementações concretas para repositórios e serviços
   - **Utils**: Funções utilitárias de baixo nível

4. **Interfaces Layer (Camada de Interfaces)**
   - **Handlers**: Adaptadores para expor funcionalidades para a interface do usuário

### Front-end (React/TypeScript)

- Interface de usuário interativa que permite visualizar e gerenciar os arquivos duplicados
- Utiliza o Wails para comunicação com o backend Go

## Recursos

- Detecção rápida de arquivos duplicados usando hash SHA-256
- Identificação automática do arquivo original (mais antigo) entre duplicatas
- Suporte para análise de arquivos compactados
- Interface gráfica intuitiva para gerenciar duplicatas
- Opção para mover arquivos duplicados para a lixeira ou excluir permanentemente

## Implementações Técnicas

### Backend (Go)

- **Domain-Driven Design**: Separação clara entre as camadas de domínio, aplicação e infraestrutura
- **Clean Architecture**: Dependências apontam para dentro, com as camadas internas sem conhecimento das externas
- **Hash de Arquivos**: Implementação eficiente de cálculo de hash SHA-256
- **Manipulação do Sistema de Arquivos**: APIs nativas do Go para operações em arquivos
- **Detecção de Data de Criação**: Identificação do arquivo mais antigo entre duplicatas
- **Movimentação para Lixeira**: Implementações específicas para cada sistema operacional

### Frontend (React/TypeScript)

- Interface Responsiva: Design adaptável com Tailwind CSS
- Gerenciamento de Estado: Contexto React para gerenciar o estado da aplicação
- Navegação: Sistema de rotas para diferentes telas
- Ícones por Tipo de Arquivo: Sistema visual que identifica o tipo de arquivo baseado na extensão

## Desenvolvimento

Para rodar o projeto em modo de desenvolvimento:

```bash
wails dev
```

## Construção

Para compilar o projeto:

```bash
./build.sh
```

ou

```bash
wails build
```
