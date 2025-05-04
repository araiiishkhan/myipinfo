import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to get browser information
export function getBrowserInfo(): string {
  if (typeof window === 'undefined') return 'Unknown';
  
  const userAgent = navigator.userAgent;
  let browserName = 'Unknown';
  let browserVersion = '';
  
  // Chrome
  if (/chrome|chromium|crios/i.test(userAgent)) {
    browserName = 'Chrome';
    browserVersion = userAgent.match(/(chrome|chromium|crios)\/([0-9]+\.[0-9]+)/i)?.[2] || '';
  } 
  // Firefox
  else if (/firefox|fxios/i.test(userAgent)) {
    browserName = 'Firefox';
    browserVersion = userAgent.match(/(firefox|fxios)\/([0-9]+\.[0-9]+)/i)?.[2] || '';
  } 
  // Safari
  else if (/safari/i.test(userAgent) && !/chrome|chromium|crios/i.test(userAgent)) {
    browserName = 'Safari';
    browserVersion = userAgent.match(/version\/([0-9]+\.[0-9]+)/i)?.[1] || '';
  } 
  // Edge
  else if (/edg/i.test(userAgent)) {
    browserName = 'Edge';
    browserVersion = userAgent.match(/edg\/([0-9]+\.[0-9]+)/i)?.[1] || '';
  } 
  // IE
  else if (/msie|trident/i.test(userAgent)) {
    browserName = 'Internet Explorer';
    browserVersion = userAgent.match(/(msie |rv:)([0-9]+\.[0-9]+)/i)?.[2] || '';
  }
  
  return browserVersion ? `${browserName} ${browserVersion}` : browserName;
}

// Function to get OS information
export function getOSInfo(): string {
  if (typeof window === 'undefined') return 'Unknown';
  
  const userAgent = navigator.userAgent;
  
  // Windows
  if (/windows nt 10/i.test(userAgent)) return 'Windows 10';
  if (/windows nt 6\.3/i.test(userAgent)) return 'Windows 8.1';
  if (/windows nt 6\.2/i.test(userAgent)) return 'Windows 8';
  if (/windows nt 6\.1/i.test(userAgent)) return 'Windows 7';
  if (/windows nt 6\.0/i.test(userAgent)) return 'Windows Vista';
  if (/windows nt 5\.2/i.test(userAgent)) return 'Windows Server 2003';
  if (/windows nt 5\.1/i.test(userAgent)) return 'Windows XP';
  if (/windows xp/i.test(userAgent)) return 'Windows XP';
  if (/windows nt/i.test(userAgent)) return 'Windows';
  
  // macOS
  if (/mac os x/i.test(userAgent)) {
    const macVersion = userAgent.match(/mac os x ([0-9_]+)/i);
    if (macVersion && macVersion[1]) {
      const versionString = macVersion[1].replace(/_/g, '.');
      return `macOS ${versionString}`;
    }
    return 'macOS';
  }
  
  // Linux
  if (/linux/i.test(userAgent)) return 'Linux';
  if (/ubuntu/i.test(userAgent)) return 'Ubuntu';
  if (/fedora/i.test(userAgent)) return 'Fedora';
  if (/debian/i.test(userAgent)) return 'Debian';
  
  // Mobile
  if (/android/i.test(userAgent)) {
    const androidVersion = userAgent.match(/android ([0-9\.]+)/i);
    return androidVersion ? `Android ${androidVersion[1]}` : 'Android';
  }
  if (/iphone|ipad|ipod/i.test(userAgent)) {
    const iosVersion = userAgent.match(/os ([0-9_]+) like mac os x/i);
    if (iosVersion && iosVersion[1]) {
      const versionString = iosVersion[1].replace(/_/g, '.');
      return `iOS ${versionString}`;
    }
    return 'iOS';
  }
  
  return 'Unknown OS';
}

// Function to get device type
export function getDeviceType(): string {
  if (typeof window === 'undefined') return 'Unknown';
  
  const userAgent = navigator.userAgent;
  
  if (/ipad/i.test(userAgent)) return 'iPad';
  if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile/i.test(userAgent)) return 'Mobile';
  
  return 'Desktop';
}

// Function to get screen resolution
export function getScreenResolution(): string {
  if (typeof window === 'undefined') return 'Unknown';
  
  return `${window.screen.width} x ${window.screen.height}`;
}
