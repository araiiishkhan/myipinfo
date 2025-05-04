import { useState, useEffect } from "react";
import { getBrowserInfo, getOSInfo, getDeviceType, getScreenResolution } from "@/lib/utils";

export interface SystemInfo {
  browser: string;
  os: string;
  device: string;
  resolution: string;
}

export function useSystemInfo(): SystemInfo {
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({
    browser: "Unknown",
    os: "Unknown",
    device: "Unknown",
    resolution: "Unknown"
  });

  useEffect(() => {
    setSystemInfo({
      browser: getBrowserInfo(),
      os: getOSInfo(),
      device: getDeviceType(),
      resolution: getScreenResolution()
    });
  }, []);

  return systemInfo;
}
