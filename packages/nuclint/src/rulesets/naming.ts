import type {
  Linter,
} from 'eslint';

// Naming rules enforce readable, non-abbreviated variable and parameter names
export const namingRules: Linter.RulesRecord = {
  // Blacklist abbreviations and auto-replace with full names
  'unicorn/prevent-abbreviations': [
    'error',
    {
      replacements: {
        opts: {
          options: true,
        },
        idx: {
          index: true,
        },
        cb: {
          callback: true,
        },
        expression: {
          expr: true,
        },
        identifier: {
          ident: true,
        },
        pos: {
          position: true,
        },
        number: {
          num: true,
        },
        function: {
          fn: true,
        },
        lst: {
          list: true,
        },
        para: {
          paragraph: true,
        },
        args: false,
        txt: {
          text: true,
        },
        tbl: {
          table: true,
        },
        arr: {
          array: true,
        },
        len: {
          length: true,
        },
        cmd: {
          command: true,
        },
        btn: {
          button: true,
        },
        evt: {
          event: true,
        },
        doc: {
          document: true,
        },
      },
      allowList: {
        // Allow common conventions
        props: true,
        ref: true,
        env: true,
        ident: true,
        num: true,
        fn: true,
        NumsLock: true,
      },
    },
  ],
  // Disallow single-character variable names for readability
  'id-length': [
    'error',
    {
      min: 2,
      exceptions: [
        '_',
        'n',
      ],
    },
  ],
};
