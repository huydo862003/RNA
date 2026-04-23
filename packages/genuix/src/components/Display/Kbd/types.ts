/* #human-slop
   https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
*/

// References:
// - Mdn: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
// - W3C Spec: https://w3c.github.io/uievents/#dom-keyboardevent-key
// Currently, only normal keys are supported (Mostly ascii)
export enum GKbdKeyName {
  // Arrows
  ArrowDown = 'ArrowDown',
  ArrowUp = 'ArrowUp',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',

  // Whitespaces
  Enter = 'Enter',
  Tab = 'Tab',
  Space = ' ',

  // Control/Modifier keys
  Escape = 'Escape',
  Shift = 'Shift',
  Control = 'Control',
  Alt = 'Alt',
  Meta = 'Meta',

  CapsLock = 'CapsLock',
  Insert = 'Insert',
  Delete = 'Delete',
  Backspace = 'Backspace',
  NumLock = 'NumLock',

  End = 'End',
  Home = 'Home',
  PageDown = 'PageDown',
  PageUp = 'PageUp',

  // Function keys
  F1 = 'F1',
  F2 = 'F2',
  F3 = 'F3',
  F4 = 'F4',
  F5 = 'F5',
  F6 = 'F6',
  F7 = 'F7',
  F8 = 'F8',
  F9 = 'F9',
  F10 = 'F10',
  F11 = 'F11',
  F12 = 'F12',

  // Digits
  Zero = '0',
  One = '1',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
  Nine = '9',

  // Underscore and letters
  Underscore = '_',

  a = 'a',
  b = 'b',
  c = 'c',
  d = 'd',
  e = 'e',
  f = 'f',
  g = 'g',
  h = 'h',
  i = 'i',
  j = 'j',
  k = 'k',
  l = 'l',
  m = 'm',
  n = 'n',
  o = 'o',
  p = 'p',
  q = 'q',
  r = 'r',
  s = 's',
  u = 'u',
  v = 'v',
  w = 'w',
  x = 'x',
  y = 'y',
  z = 'z',

  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
  H = 'H',
  I = 'I',
  J = 'J',
  K = 'K',
  L = 'L',
  M = 'M',
  N = 'N',
  O = 'O',
  P = 'P',
  Q = 'Q',
  R = 'R',
  S = 'S',
  U = 'U',
  V = 'V',
  W = 'W',
  X = 'X',
  Y = 'Y',
  Z = 'Z',

  // Punctuations
  Semicolon = ';',
  Period = '.',
  Comma = ',',

  Colon = ':',

  Question = '?',
  Bang = '!',

  LAngle = '<',
  RAngle = '>',
  LBracket = '[',
  RBracket = ']',
  LBrace = '{',
  RBrace = '}',
  LParen = '(',
  RParen = ')',

  Tilde = '~',
  Plus = '+',
  Pipe = '|',
  Equal = '=',
  Minus = '-',
  Star = '*',
  Ampersand = '&',
  Dollar = '$',
  Hash = '#',
  AtSign = '@',

  FSlash = '/',
  BSlash = '\\',

  SQuote = '\'',
  DQuote = '"',
  Backtick = '`',
}
