# CLAUDE.md

このファイルは、AIエージェント（Claude Code など）がこのリポジトリで作業する際のプロジェクト固有の注意事項をまとめたものです。

## ローカルサーバーの URL には `/Portfolio` を付ける（重要）

このプロジェクトは `next.config.js` で `basePath: '/Portfolio'` を設定しています。
そのため、ローカルサーバー（`npm run dev` など）でページにアクセスするときは、**必ずすべての URL のパスの先頭に `/Portfolio` を付けてください**。付けない場合は 404 になります。

| | URL |
| --- | --- |
| ✅ 正しい | `http://localhost:3000/Portfolio` |
| ✅ 正しい | `http://localhost:3000/Portfolio/laboratory/random-walk-bonsai/random-walk-bonsai-app` |
| ❌ 404 になる | `http://localhost:3000/` |
| ❌ 404 になる | `http://localhost:3000/laboratory/random-walk-bonsai/random-walk-bonsai-app` |

注意点:

- curl でのヘルスチェック、Playwright での動作確認、ブラウザでの表示確認など、URL を指定するすべての操作に適用されます。
- ルート（`src/pages/` 以下のパス）自体には `/Portfolio` を含めません。`basePath` はサーバーがアクセスを受けるときの URL にのみ付きます。
- Next.js の dev サーバーのログにはリクエストパスが `basePath` 抜きで表示されます（例: `GET /laboratory/... 404`）。ログのパスをそのまま URL として使わないでください。
