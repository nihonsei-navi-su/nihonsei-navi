# 日本製ナビ

**日本人にもっと日本の製品を使ってほしい。**

Amazonで購入できる日本製品を、メーカー別に整理して紹介するサイトです。

## サイトURL

（GitHub Pagesデプロイ後にURLを追加予定）

## 特徴

- 📦 **メーカー別整理**: 日本製品をメーカーごとに分類
- ✨ **コメント付き製品**: 実際に使った人のリアルな感想
- 🔍 **カテゴリー検索**: キッチン家電、刃物、調理器具、文房具、工具など
- 📱 **レスポンシブ対応**: スマホ、タブレット、PCすべてに対応
- 🔗 **Amazon連携**: Amazonアソシエイトリンクで直接購入可能

## 掲載カテゴリー

- 🍳 キッチン家電
- 🔪 刃物・包丁
- 🍲 調理器具
- ✏️ 文房具
- 🔧 工具・DIY用品

## 技術スタック

- **フロントエンド**: HTML5, CSS3, JavaScript (Vanilla)
- **ホスティング**: GitHub Pages
- **データ管理**: JSON形式

## ファイル構成

```
nihonsei-navi/
├── index.html              # トップページ
├── products.html           # 製品一覧
├── product-detail.html     # 製品詳細
├── manufacturers.html      # メーカー一覧
├── manufacturer-detail.html # メーカー詳細
├── about.html              # このサイトについて
├── submit.html             # 製品投稿フォーム
├── css/
│   └── style.css           # スタイルシート
├── js/
│   └── main.js             # JavaScript
├── data/
│   └── products.json       # 製品データ
└── README.md               # このファイル
```

## ローカル環境での実行

1. リポジトリをクローン:
```bash
git clone https://github.com/[your-username]/nihonsei-navi.git
cd nihonsei-navi
```

2. ローカルサーバーを起動:
```bash
# Pythonがインストールされている場合
python -m http.server 8000

# または、VS Code Live Serverなどを使用
```

3. ブラウザで開く:
```
http://localhost:8000
```

## GitHub Pagesへのデプロイ

1. GitHubリポジトリを作成
2. ファイルをプッシュ:
```bash
git init
git add .
git commit -m "Initial commit: 日本製ナビ"
git branch -M main
git remote add origin https://github.com/[your-username]/nihonsei-navi.git
git push -u origin main
```

3. GitHub Settings → Pages:
   - Source: `main` ブランチを選択
   - Save

4. 数分後、`https://[your-username].github.io/nihonsei-navi/` でアクセス可能

## 製品データの追加方法

`data/products.json` に以下の形式で製品を追加:

```json
{
  "asin": "B0XXXXXXXXX",
  "name": "製品名",
  "manufacturer": "メーカー名",
  "category": "カテゴリー",
  "price": "参考価格を見る",
  "amazonUrl": "https://www.amazon.co.jp/dp/B0XXXXXXXXX",
  "comment": "コメント（任意）",
  "hasComment": true
}
```

## 収益化

- **AdSense**: 1日100PV達成後に申請予定
- **Amazon Associates**: 売上実績後に申請予定

## ライセンス

このプロジェクトは個人運営のサイトです。

## 免責事項

- 当サイトは各企業とは一切関係なく、情報提供を目的として個人で運営しています
- 製品の品質や性能について、当サイトは一切の責任を負いません
- Amazon.co.jpアソシエイトとして適格販売により収入を得ています

## お問い合わせ

製品情報の誤りや、掲載してほしい製品がありましたら、サイト内の「製品を投稿」フォームからお知らせください。

---

Made with ❤️ for Japan
