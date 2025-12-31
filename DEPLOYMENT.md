# GitHub Pages 部署说明

## 已完成的步骤

✅ 代码已推送到 GitHub 仓库：`https://github.com/wangruohan94-collab/PulseCheck.git`  
✅ 已创建 GitHub Actions 自动部署工作流  
✅ 已添加 `.nojekyll` 文件确保静态文件正确显示

## 启用 GitHub Pages

要启用 GitHub Pages，请按照以下步骤操作：

### 方法一：使用 GitHub Actions（推荐）

1. 访问仓库：https://github.com/wangruohan94-collab/PulseCheck
2. 点击 **Settings**（设置）标签
3. 在左侧菜单中找到 **Pages**（页面）
4. 在 **Source**（源）部分，选择 **GitHub Actions**
5. 保存设置

### 方法二：使用分支部署

1. 访问仓库：https://github.com/wangruohan94-collab/PulseCheck
2. 点击 **Settings**（设置）标签
3. 在左侧菜单中找到 **Pages**（页面）
4. 在 **Source**（源）部分，选择 **Deploy from a branch**
5. 选择 **main** 分支和 **/ (root)** 目录
6. 点击 **Save**（保存）

## 访问网站

部署完成后，您的网站将在以下地址可用：

```
https://wangruohan94-collab.github.io/PulseCheck/
```

## 自动部署

使用 GitHub Actions 部署时：
- 每次推送到 `main` 分支时，网站会自动重新部署
- 部署过程通常需要 1-2 分钟
- 可以在 **Actions** 标签中查看部署状态

## 注意事项

- 首次部署可能需要几分钟时间
- 如果网站无法访问，请检查：
  - GitHub Pages 是否已启用
  - 仓库是否为公开（Public）仓库
  - Actions 工作流是否成功运行

