/* eslint-disable prettier/prettier */
declare const styles: {
  (path: string, ...paths: string[]): string;
  (path: string, paths: string[]): string;
  (root: string, ...paths: string[':']): string;
  (root: string, paths: string[':']): string;

  (path: string, paths: string[]): string;
  rootVariables: string = styles[':root {...}'];
};
export = styles;
export = styles[':root {...}'];
