import login from "./login";
import myServer from "../request/getRequest";
// 集成模块
myServer.parseRouter("login", login);
export default myServer;
