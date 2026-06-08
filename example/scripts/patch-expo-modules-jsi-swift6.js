const fs = require('node:fs');
const path = require('node:path');

const packageRoot = path.resolve(__dirname, '..');
const dependencyRoot = path.join(packageRoot, 'node_modules', 'expo-modules-jsi');
const packageJsonPath = path.join(dependencyRoot, 'package.json');
const sourcesRoot = path.join(dependencyRoot, 'apple', 'Sources', 'ExpoModulesJSI');

if (!fs.existsSync(packageJsonPath)) {
  process.exit(0);
}

const { version } = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

if (!/^56\.0\./.test(version)) {
  process.exit(0);
}

let patchedFiles = 0;

function patchSwiftSources(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      patchSwiftSources(entryPath);
      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith('.swift')) {
      continue;
    }

    const source = fs.readFileSync(entryPath, 'utf8');
    const patched = source
      .replace(/\bweak let runtime:/g, 'weak var runtime:')
      .replace(
        'internal final class HostFunctionContext: Sendable {',
        'internal final class HostFunctionContext: @unchecked Sendable {',
      )
      .replace(
        'internal final class HostObjectContext: Sendable {',
        'internal final class HostObjectContext: @unchecked Sendable {',
      )
      .replace(
        'public final class JavaScriptPropNameID: JavaScriptType {',
        'public final class JavaScriptPropNameID: JavaScriptType, @unchecked Sendable {',
      )
      .replace(
        'public final class JavaScriptValue: JavaScriptType, Equatable, Escapable, Error {',
        'public final class JavaScriptValue: JavaScriptType, Equatable, Escapable, Error, @unchecked Sendable {',
      );

    if (patched !== source) {
      fs.writeFileSync(entryPath, patched);
      patchedFiles += 1;
    }
  }
}

patchSwiftSources(sourcesRoot);

if (patchedFiles > 0) {
  console.log(`Patched expo-modules-jsi Swift 6 weak references in ${patchedFiles} files.`);
}
