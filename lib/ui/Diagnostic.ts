import * as ts from 'typescript';
export type ReportDiagnostic = (diagnostic: ts.Diagnostic) => void;

export const createDiagnosticReporter = function (
  binary: typeof ts,
): ReportDiagnostic {
  const formatHost: ts.FormatDiagnosticsHost = {
    getCurrentDirectory: () => binary.sys.getCurrentDirectory(),
    getNewLine: () => binary.sys.newLine,
    getCanonicalFileName: (path) => path,
  };
  const diagnostics = new Array(1);
  return (diagnostic) => {
    diagnostics[0] = diagnostic;
    binary.sys.write(
      binary.formatDiagnosticsWithColorAndContext(diagnostics, formatHost) +
        formatHost.getNewLine(),
    );
    diagnostics[0] = undefined!;
  };
};
