import appStore from "@/stores/app.store";

interface rpcStatus {
  code: number;
  message: string;
  details: string;
}

function isErrorStatus(res: unknown): res is rpcStatus {
  return res && typeof res === "object" && "code" in res && "message" in res;
}

export async function fetcher<T>({
  url,
  method = "GET",
  body = {},
  params,
}: {
  url: string;
  method?: "GET" | "POST" | "DELETE";
  body?: Record<string, unknown>;
  params?: Record<string, string>;
}) {
  const url_version = appStore.server_url + "/api/v1";
  const token = appStore.server_key;
  try {
    let _url = url_version + url;
    if (params && Object.keys(params).length > 0) {
      _url = _url + `?${new URLSearchParams(params).toString()}`;
    }

    const rsp = await fetch(_url, {
      method,
      body: method == "GET" ? null : JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (rsp.status !== 200) {
      throw new Error(rsp.statusText);
    }
    const res = (await rsp.json()) as T | rpcStatus;

    if (isErrorStatus(res)) {
      throw new Error(res.message);
    }

    return res;
  } catch (err) {
    return null;
  }
}
