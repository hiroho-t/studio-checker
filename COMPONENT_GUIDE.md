# コンポーネントシステム使用ガイド

このプロジェクトでは、HTML、CSS、JS のみを使用して共通コンポーネント（ヘッダー・フッター）を管理しています。

## ファイル構成

```
studio-checker/
├── components/
│   ├── header.html          # ヘッダーコンポーネント
│   ├── footer.html          # フッターコンポーネント
│   ├── component-loader.js  # コンポーネント読み込み用JS
│   └── components.css       # コンポーネント用CSS
├── template.html            # 新規ページ作成用テンプレート
└── index.html              # メインページ（更新済み）
```

## 新しいページの作成方法

### 1. テンプレートをコピー

```bash
cp template.html new-page.html
```

### 2. ページ固有の設定を変更

```html
<!-- タイトルを変更 -->
<title>新しいページタイトル - Studio 公開チェッカー</title>

<!-- ヘッダーオプションを設定 -->
<script>
  document.addEventListener("DOMContentLoaded", async function () {
    await window.componentLoader.initPage({
      title: "新しいページタイトル",
      subtitle: "ページの説明文",
      showProgress: false, // 必要に応じてtrueに変更
    });
  });
</script>
```

### 3. メインコンテンツを追加

```html
<main id="main-content">
  <!-- ここにページ固有のコンテンツを追加 -->
  <div class="content-section">
    <h2>ページコンテンツ</h2>
    <p>この部分にページ固有のコンテンツを追加してください。</p>
  </div>
</main>
```

## ヘッダーオプション

| オプション     | 型      | 説明           | デフォルト値                                                      |
| -------------- | ------- | -------------- | ----------------------------------------------------------------- |
| `title`        | string  | ページタイトル | "Studio 公開チェッカー"                                           |
| `subtitle`     | string  | ページの説明文 | "Studio で作成したサイトを公開する前に、チェックを行いましょう。" |
| `showProgress` | boolean | 進捗表示の有無 | false                                                             |
| `progressText` | string  | 進捗テキスト   | "残り 11 チェック"                                                |

## 使用例

### 基本的なページ

```html
<script>
  await window.componentLoader.initPage({
    title: '使い方ガイド',
    subtitle: 'Studio 公開チェッカーの使い方を説明します。'
  });
</script>
```

### 進捗表示付きページ

```html
<script>
  await window.componentLoader.initPage({
    title: 'チェックリスト',
    subtitle: '項目を順番にチェックしていきましょう。',
    showProgress: true,
    progressText: '残り 5 チェック'
  });
</script>
```

## 注意事項

1. **ローカルサーバーが必要**: コンポーネントの読み込みには`fetch`を使用するため、ローカルサーバー（Live Server 等）で実行してください。

2. **ファイルパス**: コンポーネントファイルは`components/`フォルダ内に配置してください。

3. **CSS の読み込み**: 必ず`components/components.css`を読み込んでください。

4. **JavaScript の読み込み順序**: `component-loader.js`を`script.js`より前に読み込んでください。

## トラブルシューティング

### コンポーネントが読み込まれない

- ローカルサーバーで実行しているか確認
- ファイルパスが正しいか確認
- ブラウザのコンソールでエラーを確認

### スタイルが適用されない

- `components/components.css`が読み込まれているか確認
- CSS ファイルのパスが正しいか確認
