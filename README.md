# Studio 公開チェッカー

Studio で作成したサイトを公開する前に、必要なチェック項目を確認するための Web アプリケーションです。

## 機能

- 📋 **料金プラン別チェックリスト**: Free プラン（8 問）と有料プラン（11 問）に対応
- 🎯 **段階的チェック**: 文章、デザイン、機能、公開設定を順番にチェック
- 📊 **進捗管理**: 残りのチェック項目数を表示
- 🎨 **モダン UI**: 直感的で使いやすいインターフェース

## ファイル構成

```
studio-checker/
├── index.html      # メインHTMLファイル
├── script.js       # JavaScriptロジック
├── style.css       # CSSスタイル
├── img/            # 画像ファイル
│   ├── StartWith_favicon.png
│   ├── lightbulb_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg
│   └── arrow_forward_ios_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg
└── README.md       # このファイル
```

## 使用方法

1. `index.html`をブラウザで開く
2. プロジェクトの料金プランを選択
3. チェックリストに従って項目を確認
4. 全てのチェックが完了したら公開準備完了

## 開発

### ブランチ構成

- `main`: 本番用ブランチ
- `develop`: 開発用ブランチ

### ローカル開発

```bash
# リポジトリをクローン
git clone https://github.com/hiroho-t/studio-checker.git

# 開発ブランチに切り替え
git checkout develop

# ローカルサーバーで起動（例：Live Server）
```

## ライセンス

© StartWith Inc.
