export function getPlatform() {
  if (typeof window === "undefined") return "server" as never;

  let platform: string =
    //@ts-expect-error
    window.navigator?.userAgentData?.platform ||
    navigator?.platform ||
    "unknown";

  platform = platform.toLocaleLowerCase();

  return {
    platform,
    isIOS: platform === "iphone",
    isMacOS: platform === "macos",
    isMobile:
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        platform
      ),
  };
}
