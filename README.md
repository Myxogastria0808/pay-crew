# pay-crew (not released yet)

[![Test](https://github.com/Myxogastria0808/pay-crew/actions/workflows/test.yaml/badge.svg)](https://github.com/Myxogastria0808/pay-crew/actions/workflows/test.yaml)
[![Docs](https://github.com/Myxogastria0808/pay-crew/actions/workflows/docs.yaml/badge.svg)](https://github.com/Myxogastria0808/pay-crew/actions/workflows/docs.yaml)
![GitHub Release](https://img.shields.io/github/v/release/Myxogastria0808/pay-crew)
![GitHub License](https://img.shields.io/github/license/Myxogastria0808/pay-crew)
![Vitest](https://img.shields.io/badge/-vitest-6e9f18?style=flat&logo=vitest&logoColor=ffffff)
[![RenovateBot](https://img.shields.io/badge/RenovateBot-1A1F6C?logo=renovate&logoColor=fff)](#)

## セットアップ

0. いくつかのツールをインストール

- docker-compose
- Docker
- Node.js
- pnpm
- vscode
- vscode extensions
  - `astro-build.astro-vscode`
  - `esbenp.prettier-vscode`
  - `dbaeumer.vscode-eslint`
  - `clinyong.vscode-css-modules`

1. このレポジトリをクローン

```sh
git clone https://github.com/Myxogastria0808/pay-crew.git
cd pay-crew
```

2. レポジトリのルートに`.env` ファイルを作成

> [!TIP]
> `.emv.exmaple`を参考に適当な値を設定してください。

以下は、`.env`の設定例です。

```.env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=sample
POSTGRES_PORT=5432
```

3. コンテナを起動

```sh
sudo docker compose up -d
```

4. 以下のコマンドを実行

```sh
pnpm i && pnpm run setup:generate && pnpm run backend:generate && pnpm run backend:migrate
```

## ドキュメント

https://myxogastria0808.github.io/pay-crew/

## 技術スタック

### Frontend

- TypeScript
- CSS Modules
- Vite + React
- React Router (for routing)

#### [Live Demo](https://pay-crew.yukiosada.work/)
- https://pay-crew.yukiosada.work/

#### [Source Code](https://github.com/Myxogastria0808/pay-crew/tree/dev/products/frontend/)
- https://github.com/Myxogastria0808/pay-crew/tree/dev/products/frontend/

#### [Details](https://github.com/Myxogastria0808/pay-crew/tree/dev/products/frontend/README.md)
- https://github.com/Myxogastria0808/pay-crew/tree/dev/products/frontend/README.md

#### [Vitest UI Report](https://myxogastria0808.github.io/pay-crew/vitest/frontend/)
- https://myxogastria0808.github.io/pay-crew/vitest/frontend/

#### [Coverage Report](https://myxogastria0808.github.io/pay-crew/coverage/frontend/)
- https://myxogastria0808.github.io/pay-crew/coverage/frontend/

### Backend

- TypeScript
- Hono (Web Framework)
- fetch API (for calling Webhook)
- Drizzle (ORM)

#### [Live Demo](https://pay-crew-api.yukiosada.work/)
- https://pay-crew-api.yukiosada.work/

#### [Source Code](https://github.com/Myxogastria0808/pay-crew/tree/dev/products/backend/)
- https://github.com/Myxogastria0808/pay-crew/tree/dev/products/backend/

#### [Details](https://github.com/Myxogastria0808/pay-crew/tree/dev/products/backend/README.md)
- https://github.com/Myxogastria0808/pay-crew/tree/dev/products/backend/README.md

#### [Vitest UI Report](https://myxogastria0808.github.io/pay-crew/vitest/backend/)
- https://myxogastria0808.github.io/pay-crew/vitest/backend/

#### [Coverage Report](https://myxogastria0808.github.io/pay-crew/coverage/backend/)
- https://myxogastria0808.github.io/pay-crew/coverage/backend/

### Database

- development
  - PostgreSQL as Docker container
- production
  - Xata Lite

### Docs

- Astro

#### [Docs](https://github.com/Myxogastria0808/pay-crew/tree/dev/docs/)
- https://github.com/Myxogastria0808/pay-crew/tree/dev/docs/

#### [Details](https://github.com/Myxogastria0808/pay-crew/tree/dev/docs/README.md)
- https://github.com/Myxogastria0808/pay-crew/tree/dev/docs/README.md

## CI/CD

- GitHub Actions with Nix

#### [CI/CD](https://github.com/Myxogastria0808/pay-crew/tree/dev/.github/workflows/)
- https://github.com/Myxogastria0808/pay-crew/tree/dev/.github/workflows/

## テストツール

- Vitest

## 開発ツール

> [!WARNING]
> このプロジェクトは、 pnpmのみサポートしています。 npmやyarnなどはサポートしていません。

- pnpm (with workspace feature)
- turbo (monorepo management tool)
- Nix (optional tool)

## システム構成図 ~ 開発環境 ~

```mermaid
graph LR;
    subgraph Docker container
      db[("PostgreSQL (Database)")]
    end
    db[("PostgreSQL (Database)")] <--> drizzle["Drizzle (ORM)"]
    subgraph "Backend (Localhost)"
        drizzle["Drizzle (ORM)"] <--> hono["Hono (Web API)"]
        drizzle["Drizzle (ORM)"] <--> discord["Discord Webhook"]
        drizzle["Drizzle (ORM)"] <--> slack["Slack Webhook"]
    end
    hono["Hono (Web API)"] <--> frontend["Vite + React"]
    subgraph "Frontend (Localhost)"
        frontend["Vite + React"]
    end
    idp{{"Identity Provider (Google, GitHub, etc.)"}} <-.authentication.-> user["User"]
    idp{{"Identity Provider (Google, GitHub, etc.)"}} <--check token--> hono["Hono (Web API)"]
    frontend["Vite + React"] -.redirect.-> idp{{"Identity Provider (Google, GitHub, etc.)"}}
    user["User"] <--with token--> frontend["Vite + React"]
    user["User"] -.without token.-> frontend["Vite + React"]
    discord["Discord Webhook"] --notification--> server(["Server (Discord)"])
    slack["Slack Webhook"] --notification--> workspace(["Workspace (Slack)"])
    server(["Server (Discord)"]) --notification--> user["User"]
    workspace(["Workspace (Slack)"]) --notification--> user["User"]
```

## システム構成図 ~ 本番環境 ~

```mermaid
graph LR;
    db[("Database (Xata Lite)")]
    hyperdrive(("Hyperdrive"))
    drizzle["Drizzle (ORM)"]
    hono["Hono (Web API)"]
    discord["Discord Webhook"]
    slack["Slack Webhook"]
    frontend["Vite + React"]
    idp{{"Identity Provider (Google, GitHub, etc.)"}}
    server(["Server (Discord)"])
    workspace(["Workspace (Slack)"])
    user["User"]
    db <--> hyperdrive
    hyperdrive <--> drizzle
    subgraph "Backend (Cloudflare Workers)"
        drizzle
        drizzle <--> hono
        drizzle <--> discord
        drizzle <--> slack
    end
    hono <--> frontend
    subgraph "Frontend (Cloudflare Workers)"
        frontend
    end
    idp <-.authentication.-> user
    idp <--check token--> hono
    frontend -.redirect.-> idp
    user <--with token--> frontend
    user -.without token.-> frontend
    discord --notification--> server
    slack --notification--> workspace
    server --notification--> user
    workspace --notification--> user
```

## ER図

```mermaid
```

## ブランチ戦略

### main

main branch is the release branch.

### dev

dev branch is the development root branch.


### feature

- feat/#[issue-number]-[issue-summary]

  example) feat/#12-add-card-button-component

### chore

- chore/#[issue-number]-[issue-summary]

  example) chore/#12-add-prettier-config

### fix

- fix/#[issue-number]-[issue-summary]

  example) fix/#12-change-title

### update

- update/#[issue-number]-[issue-summary]

  example) update/#12-update-dependencies

### test

- test/#[issue-number]-[issue-summary]

  example) test/#12-add-unit-test

```mermaid
flowchart LR
    feature["feat/*"]
    chore["chore/*"]
    fix["fix/*"]
    update["update/*"]
    dev["dev"]
    test["test/*"]
    main["main"]
    feature --with checks--> dev
    chore --with checks--> dev
    fix --with checks--> dev
    update --with checks--> dev
    dev --with checks--> main
    test --with checks--> dev
    main --with checks (cron)--> main
```

#### with `checks` (`dev branch`)

- test (`push` and `pull requests`)
- CodeQL Scanning
- docs (`push`)

#### with `checks` (`main branch`)

- test (`pull requests`)
- CodeQL Scanning
- deploy-frontend (`push`)
- deploy-backend (`push`)

#### with `checks (cron)` (`main branch`)

- test (`cron`)
