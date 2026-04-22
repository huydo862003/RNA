/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

export {
  Semantic as CodeBlockSemantic,
  Prominence as CodeBlockProminence,
} from '@/types';

export enum GCodeLanguage {
  Javascript = 'javascript',
  Typescript = 'typescript',
  Css = 'css',
  Html = 'xml',
  Json = 'json',
  Bash = 'bash',
  Python = 'python',
  Go = 'go',
  Rust = 'rust',
  Java = 'java',
  C = 'c',
  Cpp = 'cpp',
  Yaml = 'yaml',
  Ini = 'ini',
  Dockerfile = 'dockerfile',
  Sql = 'sql',
  Graphql = 'graphql',
  Markdown = 'markdown',
  Diff = 'diff',
}

/** Display names for languages (handles casing and abbreviations) */
export const GCodeLanguageLabel: Record<GCodeLanguage, string> = {
  [GCodeLanguage.Javascript]: 'JavaScript',
  [GCodeLanguage.Typescript]: 'TypeScript',
  [GCodeLanguage.Css]: 'CSS',
  [GCodeLanguage.Html]: 'HTML',
  [GCodeLanguage.Json]: 'JSON',
  [GCodeLanguage.Bash]: 'Bash',
  [GCodeLanguage.Python]: 'Python',
  [GCodeLanguage.Go]: 'Go',
  [GCodeLanguage.Rust]: 'Rust',
  [GCodeLanguage.Java]: 'Java',
  [GCodeLanguage.C]: 'C',
  [GCodeLanguage.Cpp]: 'C++',
  [GCodeLanguage.Yaml]: 'YAML',
  [GCodeLanguage.Ini]: 'INI',
  [GCodeLanguage.Dockerfile]: 'Dockerfile',
  [GCodeLanguage.Sql]: 'SQL',
  [GCodeLanguage.Graphql]: 'GraphQL',
  [GCodeLanguage.Markdown]: 'Markdown',
  [GCodeLanguage.Diff]: 'Diff',
};
