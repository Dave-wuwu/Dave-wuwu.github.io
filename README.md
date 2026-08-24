# CET 写译训练营

面向大学英语四、六级写作与翻译训练的 Web-first MVP。当前版本适合学生自用，支持移动端访问，包含写作训练、翻译训练、手写入口、模拟批改报告和薄弱点复盘。

## 本地运行

```bash
npm install
npm run dev
```

默认访问：

```text
http://localhost:3000/
```

## 构建静态站点

```bash
npm run test
npm run build
```

构建后的静态文件会生成到：

```text
out/
```

## 部署到 GitHub Pages

如果目标站点是：

```text
https://dave-wuwu.github.io/
```

建议使用名为 `dave-wuwu.github.io` 的 GitHub 仓库，并把本项目源码推送到该仓库的 `main` 分支。

仓库设置：

1. 打开 GitHub 仓库 `Settings`
2. 进入 `Pages`
3. 在 `Build and deployment` 中选择 `GitHub Actions`
4. 推送代码到 `main` 分支
5. 等待 Actions 完成后访问 `https://dave-wuwu.github.io/`

本项目已经包含 `.github/workflows/deploy.yml`，推送后会自动执行：

```text
npm ci
npm run test
npm run build
deploy ./out
```

## 当前边界

当前版本使用模拟评分与模拟批改报告，页面中的说明为：

```text
模拟分按四六级写译权重估算，不等同于官方报道分。
```

后续接入真实 AI 批改、OCR 手写识别、用户数据保存时，需要增加后端服务或云函数。
