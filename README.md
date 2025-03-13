# No Kage Bunshin

## 📌 About

**No Kage Bunshin** é um aplicativo desenvolvido com **Wails**, **Go**, **React** e **TypeScript** para analisar e identificar arquivos duplicados, incluindo arquivos comprimidos. O sistema percorre uma pasta específica, detecta arquivos semelhantes com base em seus nomes e conteúdos e realiza uma verificação profunda extraindo arquivos compactados (ZIP, GZIP, 7z) para comparar seus conteúdos.

## 🚀 Technologies

- **[Wails](https://wails.io/)** – Framework para criar aplicações desktop com Go e frontend moderno.
- **Go** – Linguagem usada para manipulação de arquivos e lógica de backend.
- **React** + **TypeScript** – Interface interativa e tipada para melhor experiência do usuário.

## 🛠 Features

- 📂 Listagem de arquivos com informações detalhadas.
- 🔍 Detecção de arquivos duplicados por nome e conteúdo.
- 🗜️ Identificação de arquivos comprimidos e extração automática para análise.
- 🗑️ Criação de uma pasta temporária para extração e remoção automática após a verificação.

## 🔧 Live Development

Para rodar o projeto em modo de desenvolvimento:

```bash
wails dev
```

## 📦 Building
Para criar um pacote de produção:

```bash
wails build
```

Isso gerará um executável redistribuível para o sistema operacional.

