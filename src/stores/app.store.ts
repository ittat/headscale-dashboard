import services from "@/services";

class AppStore {
  server_key: string | null = null;
  server_url: string | null = null;

  isLogin: boolean = false;

  constructor() {}

  async login(key: string, url: string) {
    this.server_key = key;
    this.server_url = url;
    // test
    try {
      const res = await services.key.getApiKeys();
      console.log(res);
      
      if (res) {
        this.isLogin = true;
      } else {
        this.server_key = null;
        this.server_url = null;
      }
    } catch (e) {}
  }

  logout() {
    this.server_key = null;
    this.server_url = null;
    this.isLogin = false;

    localStorage.removeItem("HD_KEY");
    localStorage.removeItem("AUTO_LOGIN");
  }
}

const appStore = new AppStore();

export default appStore;
