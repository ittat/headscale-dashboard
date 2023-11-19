import {
  Callout,
  Checkbox,
  DefaultButton,
  IconButton,
  ITextFieldProps,
  Link,
  MessageBar,
  PrimaryButton,
  Stack,
  TextField,
} from "@fluentui/react";
import { AddLinkIcon } from "@fluentui/react-icons-mdl2";
import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import appStore from "../../stores/app.store";

import LOGO from "../../assets/logo.svg";

const LoginPage = () => {
  const nav = useNavigate();

  const [url, setUrl] = useState<string>("");
  const [key, setkey] = useState<string>("");

  useEffect(() => {
    setkey(localStorage.getItem("HD_KEY") ?? import.meta.env.VITE_KEY);
    setUrl(localStorage.getItem("HD_URL") ?? import.meta.env.VITE_URL);

    const AUTO_LOGIN = localStorage.getItem("AUTO_LOGIN");
    setTimeout(() => {
      if (AUTO_LOGIN === "true") {
        onConnectClick();
      }
    }, 1000);

  }, []);

  const onConnectClick = async () => {
    // debugger
    if (key == "") {
      localStorage.removeItem("HD_KEY");
    } else {
      localStorage.setItem("HD_KEY", key);
    }
    if (url == "") {
      localStorage.removeItem("HD_URL");
    } else {
      localStorage.setItem("HD_URL", url);
    }

    await appStore.login(key, url);

    appStore.isLogin && nav("/nodes", { replace: true });
  };

  return (
    <div className="w-full h-screen flex flex-col gap-3 justify-center items-center">
      <img src={LOGO} className={"text-center pb-10 text-blue-500 w-[150px]"} />
      <TextField
        // prefix="http(s)://"
        label="Server Url"
        styles={{ fieldGroup: { width: 300 } }}
        value={url}
        onChange={(e, v) => setUrl(v)}
      />
      <TextField
        label="Api Key"
        styles={{ fieldGroup: { width: 300 } }}
        // description=""
        type="password"
        value={key}
        onChange={(e, v) => setkey(v)}
        // validateOnFocusOut
      />

      <Checkbox
        className="text-start w-[300px]"
        onChange={(e, v) => {
          localStorage.setItem("AUTO_LOGIN", v ? "true" : "false");
        }}
        label="Auto login"
        // defaultChecked
        styles={{ text: { fontSize: "10px" } }}
      />

      <div className="pt-10 w-full text-center">
        {" "}
        <PrimaryButton text="Connect it" onClick={onConnectClick} />
      </div>

      <MessageBar className="absolute  bottom-0">
        API Key can get from self host by shell command:{" "}
        <b>headscale apikeys list</b>
        <br />
        or create new one by <b>
          headscale apikeys create --expiration 90d
        </b>{" "}
        {/* <Link href="www.bing.com" target="_blank" underline>
          more
        </Link> */}
      </MessageBar>
    </div>
  );
};

export default LoginPage;
