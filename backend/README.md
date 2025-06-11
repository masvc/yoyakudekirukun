# バックエンド（予約できるくん）

## 概要

NestJSフレームワークを使用した予約管理システムのバックエンドAPIです。
RESTful APIとデータベース管理を提供します。

## 技術スタック

- NestJS
- TypeScript
- SQLite
- TypeORM

## 開発環境のセットアップ

1. 依存関係をインストール

```bash
cd backend
npm install
```

2. 開発サーバーを起動

```bash
npm run start:dev
```

## データベース

- SQLiteを使用（`database.sqlite`）
- マイグレーション: `npm run migration:run`
- 新しいマイグレーション作成: `npm run migration:generate`

## プロジェクト構造

- `src/`
  - `controllers/`: APIエンドポイント
  - `services/`: ビジネスロジック
  - `entities/`: データベースモデル
  - `migrations/`: データベースマイグレーション
  - `dto/`: データ転送オブジェクト
- `test/`: テストファイル

## 利用可能なコマンド

- `npm run start:dev`: 開発サーバーを起動（ホットリロード有効）
- `npm run build`: プロダクションビルドを作成
- `npm run test`: テストを実行
- `npm run lint`: コードの静的解析を実行

## API仕様

主要なエンドポイント：

- `GET /reservations`: 予約一覧を取得
- `POST /reservations`: 新規予約を作成
- `GET /reservations/:id`: 特定の予約を取得
- `PUT /reservations/:id`: 予約を更新
- `DELETE /reservations/:id`: 予約を削除

## 開発ガイドライン

- RESTful APIの設計原則に従う
- 適切なエラーハンドリングを実装する
- ユニットテストを書く
- 環境変数を適切に管理する
