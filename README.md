# iroha - 完全静的ポートフォリオサイト

**コンセプト**: できることを、シンプルにありのままに。

栃木県を拠点としたWeb制作・デザインのポートフォリオサイト（完全静的版）

## 🌟 サイトの特徴

- **完全静的サイト**: HTMLファイルとJSONデータのみで動作
- **シンプルでミニマルなデザイン**: 無駄を削ぎ落とし、本質に集中
- **栃木県特化のSEO対策**: 地域キーワード、LocalBusiness構造化データ実装済み
- **レスポンシブ対応**: スマートフォン、タブレット、PCすべてに最適化
- **Google Analytics 4**: トラッキングコード実装済み（G-4KY8G122Y8）

## 📁 プロジェクト構成

```
iroha/
├── index.html              # メインページ
├── admin.html              # コラム管理画面（JSONエディタ）
├── services-admin.html     # サービス管理画面（JSONエディタ）
├── admin-menu.html         # 管理メニュー
├── privacy.html            # プライバシーポリシー
├── terms.html              # 利用規約
├── sitemap.xml             # サイトマップ
├── robots.txt              # robots.txt
├── css/
│   ├── style.css          # メインスタイル
│   ├── admin.css          # 管理画面スタイル
│   └── legal.css          # 法的ページスタイル
├── js/
│   └── main.js            # メインJavaScript（静的JSON読み込み）
├── data/
│   ├── services.json      # サービスデータ（静的JSON）
│   └── columns.json       # コラムデータ（静的JSON）
└── README.md              # このファイル
```

## ✅ 実装済み機能

### 🎨 デザイン・UI
- ✅ ミニマルでモダンなデザイン
- ✅ スムーススクロール
- ✅ ハンバーガーメニュー（モバイル対応）
- ✅ ホバーエフェクト・アニメーション

### 📝 コンテンツ管理
- ✅ **サービス管理**（JSONエディタ）
- ✅ **コラム管理**（JSONエディタ）
- ✅ カテゴリーフィルター（すべて / デザイン / UI/UX / トレンド等）
- ✅ ページネーション（3件ずつ表示、「もっと見る」ボタン）

### 🔍 SEO・アクセシビリティ
- ✅ メタタグ完備（title, description, keywords）
- ✅ OGP・Twitter Card設定
- ✅ 構造化データ（LocalBusiness、JSON-LD）
- ✅ 栃木県特化キーワード（栃木県、宇都宮、小山市、足利市）
- ✅ セマンティックHTML
- ✅ sitemap.xml / robots.txt
- ✅ Google Analytics 4（G-4KY8G122Y8）

### 📄 法的ページ
- ✅ プライバシーポリシー
- ✅ 利用規約

## 🚀 デプロイ方法

### 推奨ホスティングサービス

#### 1. **Cloudflare Pages**（高速・無料）
1. Cloudflare Pagesにログイン
2. プロジェクトをアップロード
3. Build command: 空欄
4. Build output directory: `/`
5. デプロイ完了

#### 2. **Netlify**（超簡単）
1. https://www.netlify.com/ にアクセス
2. ドラッグ&ドロップでフォルダをアップロード
3. 自動デプロイ完了

#### 3. **Vercel**（高速）
1. https://vercel.com/ にアクセス
2. GitHubリポジトリを連携
3. 自動デプロイ完了

#### 4. **GitHub Pages**（完全無料）
1. GitHubリポジトリを作成
2. Settings → Pages → Sourceを設定
3. `https://yourusername.github.io/iroha/` で公開

## 📝 コンテンツの更新方法

### サービスを更新する

1. **管理画面にアクセス**: `services-admin.html` を開く
2. **JSONエディタで編集**: サービス情報を追加・編集
3. **JSONをダウンロード**: 「JSONをダウンロード」ボタンをクリック
4. **ファイルを配置**: ダウンロードした `services.json` を `data/` フォルダに配置
5. **再デプロイ**: サイトを再デプロイして反映

### コラムを更新する

1. **管理画面にアクセス**: `admin.html` を開く
2. **JSONエディタで編集**: コラム情報を追加・編集
3. **JSONをダウンロード**: 「JSONをダウンロード」ボタンをクリック
4. **ファイルを配置**: ダウンロードした `columns.json` を `data/` フォルダに配置
5. **再デプロイ**: サイトを再デプロイして反映

### 📌 JSONフォーマット例

#### services.json
```json
[
  {
    "id": "1",
    "title": "Webサイト制作",
    "description": "シンプルで美しいデザインのWebサイトを制作します。",
    "image_url": "https://images.unsplash.com/photo-xxx?w=600&h=400&fit=crop",
    "price": "¥300,000〜",
    "display_order": 1,
    "is_published": true
  }
]
```

#### columns.json
```json
[
  {
    "id": "1",
    "title": "コラムのタイトル",
    "description": "コラムの本文（長文OK）",
    "category": "デザイン",
    "image_url": "https://images.unsplash.com/photo-xxx?w=800&h=400&fit=crop",
    "project_url": "https://note.com/yourname/n/xxx",
    "display_order": 1,
    "is_published": true,
    "created_at": "2026-01-13"
  }
]
```

## 🎯 公開後にやること

### 1. **Google Analytics の確認**
- [Google Analytics 4](https://analytics.google.com/) にログイン
- 「リアルタイム」でトラッキングを確認

### 2. **Google Search Console の登録**
- https://search.google.com/search-console
- サイトURLを登録
- `sitemap.xml` を送信（`https://yoursite.com/sitemap.xml`）

### 3. **Googleビジネスプロフィール の登録**（栃木県SEO対策）
- https://business.google.com/
- ビジネス情報を登録
  - 所在地: 栃木県の住所
  - カテゴリ: Webデザイナー / Webサイト制作者
  - サービス提供エリア: 栃木県全域

### 4. **sitemap.xml のカスタマイズ**
`sitemap.xml` の `https://yoursite.com/` を実際のURLに変更してください。

### 5. **OGP画像の設定**
`index.html` の以下の部分を実際の画像URLに変更：
```html
<meta property="og:image" content="https://yoursite.com/ogp-image.jpg">
```

## 🌐 管理画面へのアクセス

**重要**: 管理画面はメインページからリンクされていません（セキュリティ対策）

### 管理画面URL
- **管理メニュー**: `https://yoursite.com/admin-menu.html`
- **コラム管理**: `https://yoursite.com/admin.html`
- **サービス管理**: `https://yoursite.com/services-admin.html`

### アクセス方法
1. URLを直接ブラウザに入力
2. ブックマークに保存しておくことを推奨

## 💡 画像の取得方法

### Unsplash（無料・商用利用OK）
1. https://unsplash.com/ にアクセス
2. キーワードで検索（例: web design, laptop, business）
3. 画像をクリック
4. 画像を右クリック → 「画像アドレスをコピー」
5. URLを以下の形式に変換：
   ```
   https://images.unsplash.com/photo-[ID]?w=600&h=400&fit=crop
   ```

### 推奨画像サイズ
- **サービス画像**: 600x400px
- **コラム画像**: 800x400px

## 📞 問い合わせ先

- **Email**: info@irohacs.com
- **サイト**: https://yoursite.com/

## 📄 ライセンス

© 2026 iroha. All rights reserved.

---

## 🎉 完了！

このサイトは**完全に静的**なので、どこでもホスティング可能です。
サーバーサイド処理やデータベースは一切不要です。

デプロイして、素敵なポートフォリオサイトを公開しましょう！🚀
