# Peaks Portal

基于 Nx 管理的全栈 Monorepo 项目，包含 Web 管理端、移动端应用和共享组件库。

## 技术栈

- **构建工具**: Nx Monorepo
- **Web 端**: Next.js + PayloadCMS + TailwindCSS
- **移动端**: Taro.js (支持微信小程序、H5 等多端)
- **包管理**: pnpm
- **测试**: Vitest + Playwright
- **代码规范**: ESLint + Prettier + Husky

## 项目结构

```
peaks-portal/
├── apps/
│   ├── web/           # Next.js Web 应用 (PayloadCMS 管理端 + 前端)
│   ├── mobile/        # Taro.js 移动端应用
│   └── web-e2e/       # Web 端 E2E 测试
├── packages/
│   ├── cms-config/    # PayloadCMS 配置
│   ├── cms-fields/    # CMS 字段组件
│   ├── cms-utils/     # CMS 工具函数
│   ├── common-ui/     # 通用 UI 组件
│   ├── common-utils/  # 通用工具函数
│   ├── data-access/   # 数据访问层
│   ├── data-models/   # 数据模型
│   ├── web-ui/        # Web UI 组件
│   └── config-*/      # 配置包 (ESLint, TailwindCSS, Testing)
└── tools/
    └── peaks-nx/      # 自定义 Nx 插件
```

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 9

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# 启动 Web 应用 (PayloadCMS + 前端)
pnpm nx dev web

# 启动移动端 H5 开发
pnpm nx dev:h5 mobile

# 启动移动端微信小程序开发
pnpm nx dev:weapp mobile
```

### 构建

```bash
# 构建 Web 应用
pnpm nx build web

# 构建移动端 H5
pnpm nx build:h5 mobile

# 构建移动端微信小程序
pnpm nx build:weapp mobile
```

## 常用命令

### 项目管理

```bash
# 查看项目依赖图
pnpm nx graph

# 运行所有项目的测试
pnpm test

# 类型检查
pnpm check-types

# 代码格式化
pnpm format
```

### 移动端开发

```bash
# 微信小程序
pnpm nx dev:weapp mobile    # 开发
pnpm nx build:weapp mobile  # 构建

# H5
pnpm nx dev:h5 mobile       # 开发
pnpm nx build:h5 mobile     # 构建

# 支付宝小程序
pnpm nx dev:alipay mobile   # 开发
pnpm nx build:alipay mobile # 构建
```

### 测试

```bash
# 运行单元测试
pnpm nx test <package-name>

# 运行 E2E 测试
pnpm nx e2e web-e2e

# 测试覆盖率
pnpm nx test <package-name> --coverage
```

## 开发指南

### 添加新包

```bash
# 生成新的库包
pnpm nx g @nx/js:lib my-package --directory=packages

# 生成新的应用
pnpm nx g @nx/next:app my-app --directory=apps
```

### 包依赖管理

- 使用 `workspace:^` 引用内部包
- 外部依赖统一在根目录 `package.json` 管理
- 使用 `catalog:` 统一版本管理

### 代码规范

- 提交前自动运行 ESLint 和 Prettier
- 遵循 Conventional Commits 规范
- 使用 Husky 进行 Git Hooks 管理

### 最佳实践

1. **组件开发**: 优先在 `packages/common-ui` 开发通用组件
2. **工具函数**: 放在 `packages/common-utils` 中
3. **类型定义**: 统一在 `packages/data-models` 管理
4. **配置共享**: 使用 `packages/config-*` 包统一配置

## 部署

### Web 应用

```bash
# 构建生产版本
pnpm nx build web

# 启动生产服务器
pnpm nx start web
```

### 移动端

```bash
# 构建微信小程序
pnpm nx build:weapp mobile

# 构建 H5 版本
pnpm nx build:h5 mobile
```

## 相关链接

- [Nx 文档](https://nx.dev)
- [Next.js 文档](https://nextjs.org/docs)
- [PayloadCMS 文档](https://payloadcms.com/docs)
- [Taro 文档](https://taro-docs.jd.com)
