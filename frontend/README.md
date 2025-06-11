# フロントエンド（予約できるくん）

## 概要

Vue.jsとTypeScriptを使用したモダンなフロントエンドアプリケーションです。
ユーザーフレンドリーな予約インターフェースを提供します。

## 技術スタック

- Vue.js
- TypeScript
- Tailwind CSS
- Vite

## 開発環境のセットアップ

1. 依存関係をインストール

```bash
cd frontend
npm install
```

2. 開発サーバーを起動

```bash
npm run dev
```

## プロジェクト構造

- `src/`: ソースコード
  - `components/`: Vueコンポーネント
  - `views/`: ページコンポーネント
  - `stores/`: 状態管理
  - `types/`: TypeScript型定義
- `public/`: 静的ファイル
- `dist/`: ビルド成果物

## 利用可能なコマンド

- `npm run dev`: 開発サーバーを起動
- `npm run build`: プロダクションビルドを作成
- `npm run lint`: コードの静的解析を実行
- `npm run format`: コードのフォーマットを実行

## 開発ガイドライン

- コンポーネントは機能単位で分割する
- TypeScriptの型定義を適切に行う
- Tailwind CSSのユーティリティクラスを活用する
- コードレビューを必ず行う
