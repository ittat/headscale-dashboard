import { redirect, } from "react-router-dom";
import appStore from "../stores/app.store";





export async function layoutLoader() {



  if (checkLogin()) {
    return {}
  }

  return redirect("/login");

}


/**
 * A function that loads the home page.
 *
 * @return {Promise<void>} Returns a Promise that resolves to an empty object if the user is logged in, or redirects to the login page if not.
 */
export async function homeLoader() {

  return {}
}


/**
 * Checks if the user is logged in.
 *
 * @return {boolean} Returns true if the user is logged in, false otherwise.
 */
function checkLogin() {
  return appStore.isLogin
}



export async function unImplementedThisPageLoader() {

  // 提示用户不可以打开此页面

  alert("此页面暂未实现");

  return redirect(`/`);

}
