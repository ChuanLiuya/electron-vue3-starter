# 项目依赖说明

> 本文档逐条说明本项目的每一个依赖：它是什么、在项目里干什么、如果缺少会发生什么。
>
> 依赖分为两大类：
>
> - **dependencies（运行时依赖）**：打包后应用运行仍然需要
> - **devDependencies（开发依赖）**：只在开发 / 构建 / 打包阶段使用，不进入最终产物

---

## 一、运行时依赖（dependencies）

应用打包后仍需要这些包才能正常运行。

### vue `^3.5.40`

- **是什么**：Vue 3 核心框架（渐进式前端框架）。
- **在项目里干什么**：所有页面、组件、响应式数据、指令等都是由它驱动的，是前端部分的根基。
- **缺了会怎么样**：整个应用无法启动，`import { createApp } from 'vue'` 直接报错，页面完全无法渲染。这是**不可替代**的核心依赖。

### vue-router `^5.2.0`

- **是什么**：Vue 官方路由库，负责 SPA（单页应用）的页面切换。
- **在项目里干什么**：管理 `src/router/index.ts` 中定义的路由表，让不同 URL 渲染不同视图。
- **缺了会怎么样**：`router/index.ts` 无法导入，`<RouterView>` 等组件失效，`npm run dev` 启动即报错；页面无法在视图之间跳转。

### pinia `^4.0.2`

- **是什么**：Vue 官方推荐的状态管理库（Vuex 的继任者）。
- **在项目里干什么**：管理 `src/stores/counter.ts` 等全局共享状态，跨组件共享数据。
- **缺了会怎么样**：`stores/` 目录下的代码无法编译，使用 `useCounterStore()` 的组件报错。若暂不用全局状态，可移除相关代码后正常运行。

---

## 二、开发依赖（devDependencies）

只在开发、构建、打包时使用，不会打包进最终产物。

### 1. Electron 相关

### electron `^43.3.0`

- **是什么**：Electron 运行时（Chromium + Node.js 的桌面应用壳）。
- **在项目里干什么**：把 Vue 网页包装成跨平台桌面应用，提供主进程、系统窗口、文件系统等原生能力。这是本项目作为 **Electron + Vue** 的**核心中的核心**。
- **缺了会怎么样**：项目退化成纯网页应用，无法打开桌面窗口，`electron-builder` 打包也完全无法工作。

### electron-builder `^26.15.3`

- **是什么**：Electron 应用打包分发工具。
- **在项目里干什么**：把应用打包成 Windows（nsis/portable）、macOS（dmg/zip）、Linux（AppImage/deb）等平台安装包。
- **缺了会怎么样**：无法生成安装包，只能本地开发运行，应用无法分发给用户。开发阶段不受影响。

### vite-plugin-electron `^1.1.1`

- **是什么**：Vite 与 Electron 的集成插件（本项目的核心桥梁）。
- **在项目里干什么**：让 Vite 在 `dev` / `build` 时自动编译主进程与 preload 脚本，并在开发模式下自动启动 Electron 窗口，同时打通 HMR。
- **缺了会怎么样**：即使装了 `electron`，Vite 也不会去编译和启动主进程，`npm run dev` 仍然只会开浏览器而不是桌面窗口，项目名存实亡。

### vite-plugin-electron-renderer `^1.0.0`

- **是什么**：让渲染进程（网页部分）支持 Node.js API 的插件。
- **在项目里干什么**：允许渲染进程使用 `require`、`process`、`fs` 等 Node 能力（需要时）。
- **缺了会怎么样**：渲染进程默认无法直接使用 Node API。**如果不依赖 Node 能力，缺它也能跑**；一旦渲染进程代码里用到 Node API 就会运行报错。属于"按需"依赖。

### 2. 构建工具

### vite `^8.1.5`

- **是什么**：构建工具 + 开发服务器（本项目工具链的核心）。
- **在项目里干什么**：`npm run dev` 起开发服务器（HMR 热更新），`npm run build` 用 Rollup 打包压缩。`.vue`、TS、CSS、别名（`@`）等都靠它处理。
- **缺了会怎么样**：所有 `vite` 相关脚本（dev / build / preview）全部失效，项目完全无法开发与构建。

### @vitejs/plugin-vue `^6.0.8`

- **是什么**：Vite 官方 Vue 插件。
- **在项目里干什么**：把 `.vue` 单文件组件编译成浏览器可运行的 JS + CSS。
- **缺了会怎么样**：Vite 无法解析 `.vue` 文件，所有组件编译报错，页面渲染不出来。对 Vue 项目来说**必需**。

### vite-plugin-vue-devtools `^8.1.5`

- **是什么**：Vue 官方开发者工具插件（在 Vite 中内嵌 Vue DevTools 面板）。
- **在项目里干什么**：开发时提供组件树、状态、时间线等调试能力，直接集成在页面里。
- **缺了会怎么样**：只是少了内嵌的调试面板，**不影响开发运行**；也可以改用浏览器扩展版 Vue DevTools。纯开发便利工具。

### typescript `~6.0.0`

- **是什么**：TypeScript 编译器。
- **在项目里干什么**：编译类型检查（`vue-tsc` 底层调用它）、让编辑器获得类型提示，`tsconfig*.json` 配置生效。
- **缺了会怎么样**：`tsc` / `vue-tsc` 无法运行，类型检查失效，但 Vite 借助 esbuild 仍能转译 TS 让项目跑起来——只是**没有类型安全保障**。

### vue-tsc `^3.3.7`

- **是什么**：基于 TypeScript 的 Vue 类型检查工具。
- **在项目里干什么**：`npm run type-check` 用它检查 `.vue` 和 `.ts` 的类型（官方推荐替代 `tsc`）。
- **缺了会怎么样**：`type-check` 脚本和 `build` 中的类型检查步骤失效，类型错误只能靠编辑器提示，无法在构建时拦截。

### @types/node `^24.13.3`

- **是什么**：Node.js 的 TypeScript 类型定义。
- **在项目里干什么**：让 TS 认识 `process`、`path`、`fs` 等 Node 全局与模块（Electron 主进程、Vite 配置都需要）。
- **缺了会怎么样**：使用 Node API 的代码会报"找不到模块/类型"错误，类型检查失败。纯类型包，不影响运行时。

### @tsconfig/node24 `^24.0.4`

- **是什么**：Node 24 的官方 TS 基础配置（`tsconfig.node.json` 会继承它）。
- **在项目里干什么**：提供 `tsconfig.node.json` 的基准编译选项。
- **缺了会怎么样**：Node 侧的 tsconfig 继承报错，类型检查失败。纯配置包。

### @vue/tsconfig `^0.9.1`

- **是什么**：Vue 官方 TS 基础配置集合。
- **在项目里干什么**：为 `tsconfig.app.json` 提供 Vue 项目推荐的基准编译选项。
- **缺了会怎么样**：应用侧 tsconfig 继承报错，类型检查失败。纯配置包。

### 3. 代码规范 & 格式化

### eslint `^10.7.0`

- **是什么**：JavaScript/TypeScript 代码检查工具（Lint）。
- **在项目里干什么**：`npm run lint` 时检查并自动修复代码规范问题，`eslint.config.ts` 是它的配置文件。
- **缺了会怎么样**：`lint` 相关脚本失效，代码规范检查无法执行。**不影响运行**，只影响代码质量保障。

### oxlint `~1.78.0`

- **是什么**：Rust 编写的高性能 JS/TS Lint 工具（oxc 生态）。
- **在项目里干什么**：`lint:oxlint` 脚本用它在毫秒级完成大部分 lint 检查。
- **缺了会怎么样**：`lint:oxlint` 脚本失效。**不影响运行**，ESLint 仍可兜底做检查。

### eslint-plugin-oxlint `~1.78.0`

- **是什么**：把 oxlint 的规则桥接到 ESLint 的插件。
- **在项目里干什么**：让 ESLint 同时执行 oxlint 的规则，两个引擎统一在一条流水线里。
- **缺了会怎么样**：ESLint 不再包含 oxlint 规则；若仅用独立 `oxlint` 命令则无影响。注意它要求 oxlint 版本与之匹配（本项目二者都是 `~1.78.0`），否则会有 peer 依赖冲突。

### eslint-plugin-vue `~10.9.2`

- **是什么**：Vue 官方的 ESLint 规则插件。
- **在项目里干什么**：提供 `.vue` 文件的专属检查规则（模板、script、样式规范）。
- **缺了会怎么样**：`.vue` 文件失去 Vue 专属 lint 规则，只靠通用规则检查。**不影响运行**。

### @vue/eslint-config-typescript `^14.9.0`

- **是什么**：Vue 官方为 Vue + TS 项目准备的 ESLint 配置包。
- **在项目里干什么**：在 `eslint.config.ts` 中提供 Vue + TS 的推荐规则集，让 ESLint 能正确解析 `.vue` 和 `.ts`。
- **缺了会怎么样**：ESLint 对 `.vue`/`.ts` 文件的解析与规则会失效或报错，lint 无法正常跑。

### vue-eslint-parser `^10.4.1`

- **是什么**：专门解析 `.vue` 文件的 ESLint 解析器。
- **在项目里干什么**：让 ESLint 能读懂 `.vue` 单文件组件（拆出 template/script/style 分别检查）。
- **缺了会怎么样**：ESLint 解析 `.vue` 文件直接报解析错误，Vue 项目的 lint 完全跑不起来。

### eslint-config-prettier `^10.1.8`

- **是什么**：关闭 ESLint 中与 Prettier 冲突的格式类规则。
- **在项目里干什么**：避免 ESLint 和 Prettier 在格式上打架（谁负责什么划分清楚）。
- **缺了会怎么样**：可能出现 ESLint 与 Prettier 对同一格式规则互相矛盾的报错。

### prettier `3.9.5`

- **是什么**：代码格式化工具。
- **在项目里干什么**：`npm run format` 统一格式化 `src/` 代码风格。
- **缺了会怎么样**：`format` 脚本失效，代码风格只能靠人工维护。**不影响运行**。

### 4. 辅助工具

### npm-run-all2 `^9.0.2`

- **是什么**：并行/串行运行多个 npm 脚本的工具（`run-p` / `run-s`）。
- **在项目里干什么**：`build` 脚本用它并行跑 `type-check` 和 `build-only`；`lint` 用它串行跑多个 lint 脚本。
- **缺了会怎么样**：所有使用 `run-p` / `run-s` 的脚本（`build`、`lint`）失效，只能手动逐个执行。

### jiti `^2.7.0`

- **是什么**：在 Node 中直接加载 TS/ESM 配置文件的运行时工具。
- **在项目里干什么**：让 ESLint / Prettier 等工具能加载 `eslint.config.ts` 这类 TS 配置文件。
- **缺了会怎么样**：TS 写的配置文件可能无法被工具直接加载，相关工具报配置加载错误。

---

## 三、常见问题

### Q：这些依赖都是必要的吗？

不是。真正"少了就完全跑不起来"的是：`vue`、`vue-router`、`pinia`、`vite`、`@vitejs/plugin-vue`、`electron`、`vite-plugin-electron`。其余大多是"缺了只影响对应功能"（lint、类型检查、打包等）。

### Q：electron 相关的是装 devDependencies 还是 dependencies？

装 **devDependencies** 是正确的。因为打包时 `electron-builder` 会把应用代码连同 Electron 运行时一起打进安装包，运行时不需要再 `npm install`；`electron`、`electron-builder`、两个 vite 插件都属于构建期工具。

### Q：为什么 oxlint 和 eslint-plugin-oxlint 版本要一致？

`eslint-plugin-oxlint` 把 oxlint 声明为 peer 依赖，二者版本区间不匹配时 `npm install` 会直接报 `ERESOLVE` 冲突。本项目统一为 `~1.78.0`。
