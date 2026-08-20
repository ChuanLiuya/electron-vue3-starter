// IPC 处理器汇总注册（所有模块的入口）
import { CatController } from './apis/cat'

export function registerIpc() {

  // 猫模块（class 风格）
  new CatController().register()
}
