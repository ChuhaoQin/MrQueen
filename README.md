# Chuhao Qin · Academic Homepage

尚未发布的个人学术主页草稿。仅包含 About、News 和 Publications，参考 [Nan Li 的主页](https://chnln.github.io/) 的布局，独立实现。英文内容以提供的 CV 及论文原始记录为依据。

## 立即检查

直接双击 `index.html`，用 Safari、Chrome 或其他浏览器打开即可。所有样式、脚本、头像、论文缩略图和 CV 均在本地，无需安装依赖、构建、联网或登录。论文全文、个人学术账号等外部链接需要联网。

如需通过本地服务器预览，在此目录运行：

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

浏览器打开 `http://127.0.0.1:8765/`。使用完后按 `Ctrl+C` 停止服务器。

## 当前内容

- About：Research Fellow 身份、研究方向、教育背景、提供的新照片、邮箱，以及直达原始 CV 的 PDF 链接。
- News：8 条有来源的动态，包含 Applied Soft Computing（2026 年 1 月）和 TR-C（2023 年 12 月）的发表消息，以及 MEng 团队 Best Student Project 获奖消息（2024 年 6 月）；默认显示 5 条，可展开历史消息。
- Publications：6 项已发表论文（3 篇期刊、3 篇会议），默认全部展示；可切换全部、期刊及会议。提供 TL;DR、BibTeX，以及有依据的 DOI、arXiv、PDF、代码或数据链接。
- 支持手机布局、深浅主题、键盘操作与引用复制。

已按要求移除全部 6 项预印本。这里的 All 指当前收录的 6 项已发表论文；Google Scholar 入口用于查看完整个人学术记录。没有使用自动更新的引用量，也未将预印本标记为已接收论文。

## 日常修改

| 文件 | 内容 |
| --- | --- |
| `index.html` | About 文案、导航、社交账号、邮箱 |
| `content.js` | 论文条目与 News 数据；默认展示全部已发表论文 |
| `styles.css` | 配色、字体、间距和响应式布局 |
| `script.js` | 筛选、详情、复制引用、主题切换 |
| `assets/CV_ChuhaoQin.pdf` | 提供的 CV 原文件；替换同名文件即可更新 |
| `assets/portrait.jpg` | 用户新提供的照片，按原始纵横比显示 |
| `assets/publications.bib` | 当前论文的 BibTeX 汇总；更新论文后同步维护 |
| `SOURCES.md` | 内容依据、图片来源、年份处理与审阅说明 |
| `review/` | 桌面/手机/深色截图和浏览器检查结果，仅用于本地审阅 |

## 你确认内容后自行发布到 GitHub Pages

以下步骤需要你登录 GitHub。当前没有创建 GitHub 仓库、上传文件、推送提交、连接账号或启用任何托管服务。

1. 登录 GitHub，确认你的真实用户名。创建名为 `你的用户名.github.io` 的仓库，名称需要和用户名完全一致。
2. 把本目录的网页文件放到仓库根目录：`index.html`、`styles.css`、`content.js`、`script.js`、`.nojekyll` 和完整的 `assets/` 文件夹。应当直接看到 `index.html`，不要在仓库根目录外再套一层 `chuhao-qin-profile/` 文件夹。`README.md` 与 `SOURCES.md` 可选；`review/` 不需要上传。
3. 打开仓库的 **Settings → Pages**，在 **Build and deployment** 中选择 **Deploy from a branch**，选择包含文件的分支（通常为 `main`）和 **/(root)**，保存。
4. 等待 GitHub Pages 构建完成，使用设置页显示的地址访问。个人站点的地址通常是 `https://你的用户名.github.io/`。

也可以部署到普通项目仓库；本站使用相对路径，可用于 `https://你的用户名.github.io/仓库名/`。

发布步骤依据：[GitHub 官方建站指南](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)、[配置发布来源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。检查日期：2026-10-21。

## 已完成的验证

通过真实浏览器检查桌面及手机布局（360、390、540、768、1024、1440 px）、论文筛选、TL;DR、BibTeX 展开与复制、News 展开、深浅主题切换及持久化、图片加载、CV 链接和 `file://` 离线打开。CV 副本与原文件 SHA-256 一致。

Google Scholar、IEEE 作者页和 LinkedIn 对自动读取有限制，已保留你给的准确链接。Google Scholar 与 LinkedIn 的完整内容没有被自动导入，具体论文以出版社和 arXiv 记录核对。
