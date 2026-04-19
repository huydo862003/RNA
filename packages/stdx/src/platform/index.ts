/* #human-slop
   https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
*/

export enum PlatformKind {
  Unix = 'unix', // Does not include Mac
  Windows = 'windows',
  Mac = 'mac',
  Unknown = 'unknown',
}

/* Return whether the code is running within a browser
 **/
export function isBrowser (): boolean {
  return typeof window !== 'undefined';
}

/* Return whether the code is running within node-like environment
 **/
export function isNode (): boolean {
  return typeof process !== 'undefined';
}

/* Return the name of the current platform
 **/
export function getPlatform (): PlatformKind {
  try {
    if (isBrowser()) {
      const userAgent = navigator.userAgent.toLowerCase();
      const platform = navigator.platform.toLowerCase();
      const concatted = `${userAgent}\0${platform}`;
      if (/(unix|linux|aix|android|darwin|freebsd|haiku|openbsd|sunos|netbsd|cygwin)/.test(concatted)) {
        return PlatformKind.Unix;
      }
      if (/win/.test(concatted)) {
        return PlatformKind.Windows;
      }
      if (/mac|darwin/.test(concatted)) {
        return PlatformKind.Mac;
      }
    }
    if (isNode()) {
      // See type defintion of process platform for possible values
      const platform = process.platform;
      switch (platform) {
      case 'aix':
      case 'android':
      case 'freebsd':
      case 'haiku':
      case 'linux':
      case 'openbsd':
      case 'sunos':
      case 'cygwin':
      case 'netbsd':
        return PlatformKind.Unix;
      case 'darwin':
        return PlatformKind.Mac;
      case 'win32':
        return PlatformKind.Windows;
      }
    }
    return PlatformKind.Unknown;
  } catch {
    return PlatformKind.Unknown;
  }
}
