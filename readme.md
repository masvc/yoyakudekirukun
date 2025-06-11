# 予約できるくん

## プロジェクト概要

このプロジェクトは、モダンな予約管理システムです。フロントエンドとバックエンドに分かれたモノレポ構成で、効率的な開発を可能にしています。

## 技術スタック

- フロントエンド: Vue.js + TypeScript
- バックエンド: NestJS + TypeScript
- データベース: SQLite
- ビルドツール: Turborepo

## 開発を始めるには

1. リポジトリをクローンする

```bash
git clone [リポジトリURL]
cd yoyakudekirukun
```

2. 依存関係をインストールする

```bash
npm install
```

3. 開発サーバーを起動する

```bash
npm run dev
```

## プロジェクト構成

- `frontend/`: フロントエンドアプリケーション（Vue.js）
- `backend/`: バックエンドAPI（NestJS）
- `shared/`: 共有コンポーネントやユーティリティ
- `turbo.json`: Turborepoの設定ファイル

## 詳細情報

- フロントエンドの詳細は [frontend/README.md](./frontend/README.md) を参照してください
- バックエンドの詳細は [backend/README.md](./backend/README.md) を参照してください
