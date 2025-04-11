# Guia de Contribuição para o No Kage Bunshin

Obrigado por considerar contribuir com o projeto No Kage Bunshin! Este documento oferece diretrizes para garantir uma colaboração eficiente e manter a qualidade do código.

## Fluxo de Trabalho de Contribuição

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das suas alterações (`git commit -am 'Adiciona nova funcionalidade'`)
4. Envie para a branch (`git push origin feature/nova-funcionalidade`)
5. Crie um Pull Request

## Padrões de Código

### Go
- Siga as convenções do [Effective Go](https://golang.org/doc/effective_go)
- Use `gofmt` para formatar seu código
- Escreva testes unitários para novas funcionalidades
- Siga a estrutura de pastas existente de Clean Architecture

### TypeScript/React
- Use linting e formatação com ESLint/Prettier
- Componentes devem ser funcionais e usar hooks
- Organize componentes por propósito (UI, containers, layouts)

### Commits
- Use mensagens de commit claras e descritivas
- Siga o modelo de [Conventional Commits](https://www.conventionalcommits.org/)
- Exemplos:
  - `feat: adiciona nova opção de filtro para duplicados`
  - `fix: corrige problema ao mover arquivos para a lixeira`
  - `docs: atualiza documentação da arquitetura`

## Testes

- Cada nova funcionalidade deve incluir testes unitários
- Execute os testes existentes antes de submeter o PR: `go test ./...` para o backend e `npm test` para o frontend
- Mantenha ou aumente a cobertura de testes

## Documentação

- Atualize o README.md se necessário
- Documente novas APIs ou alterações significativas
- Mantenha o CHANGELOG.md atualizado com suas alterações

## Revisão de Código

Os PRs serão revisados considerando:
- Qualidade do código
- Cobertura de testes
- Aderência aos padrões do projeto
- Clareza e manutenabilidade

## Estrutura de Diretórios

Mantenha a organização atual do projeto:
```
backend/
  ├── application/    # Casos de uso
  ├── domain/         # Entidades e interfaces
  ├── infrastructure/ # Implementações concretas
  └── interfaces/     # Handlers e APIs
frontend/
  ├── components/     # Componentes React
  ├── context/        # Contextos e providers
  ├── hooks/          # Hooks personalizados
  ├── pages/          # Componentes de página
  └── utils/          # Utilitários e adapters
```

## Dúvidas?

Para quaisquer dúvidas sobre contribuição, abra uma issue com a tag "question".
