# Cloudflare Images Workers Custom Domain

Cloudflare WorkersでCloudflare Imagesにカスタムドメインを設定するためのプロキシWorkerです。

## 概要

このWorkerは、カスタムドメイン（例：`cdn.example.com`）へのリクエストを受け取り、Cloudflare Images（`imagedelivery.net`）にプロキシします。これにより、独自のドメインでCloudflare Imagesの画像を配信できます。

## 仕組み

1. カスタムドメインへのリクエストを受信
2. パスを維持したまま`imagedelivery.net`へプロキシ
3. 例：`cdn.example.com/image-id/variant` → `imagedelivery.net/account-hash/image-id/variant`

## セットアップ

### 前提条件

- Cloudflareアカウント
- Cloudflare Imagesが有効化されていること
- Node.js 18以上

### インストール

```bash
# 依存関係をインストール
npm install
```

### 設定

1. Cloudflare Imagesのアカウントハッシュを取得
   - Cloudflareダッシュボード → Images → 配信タブで確認できます
   - 形式：`ZWd9g1K7eljCn_KDTu_MWA`のような文字列

2. 環境変数を設定する方法（以下のいずれか）：

   **方法1: Cloudflareダッシュボードで設定（推奨）**
   - Workers & Pages → 該当のWorker → 設定 → 環境変数
   - 変数名: `ACCOUNT_HASH`
   - 値: あなたのアカウントハッシュ

   **方法2: wrangler.jsoncで設定（開発用）**
   - `wrangler.jsonc`の`vars`セクションで`YOUR_ACCOUNT_HASH`を実際の値に置き換える

### デプロイ

```bash
# 開発環境で実行
npm run dev

# 本番環境にデプロイ
npm run deploy
```

## 使用方法

デプロイ後、カスタムドメインを通じて画像にアクセスできます：

```
https://your-custom-domain.com/{image-id}/{variant}
```

例：
- `https://cdn.example.com/83eb7b2-5392-4565-b69e-aff66acddd00/public`
- `https://cdn.example.com/sample-image/thumbnail`

## 環境変数

| 変数名 | 説明 | 必須 |
|--------|------|------|
| `ACCOUNT_HASH` | Cloudflare Imagesのアカウントハッシュ | ✓ |

## 開発

```bash
# 開発サーバーを起動
npm run dev

# テストを実行
npm test

# 型定義を生成
npm run cf-typegen
```

## ライセンス

このプロジェクトはプライベートです。