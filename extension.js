const vscode = require('vscode');
const fs = require('fs');
const os = require('os');
const path = require('path');

function baseFolder() {
  const root = vscode.workspace.getConfiguration('folderhop').get('root') || '';
  return root.trim().replace(/^~(?=$|[\\/])/, os.homedir());
}

// Subfolders of the base folder. "CODE - Name" folders show the code as label
// and the name as description; hidden (.) and archived (_) folders are skipped.
function readFolders() {
  const root = baseFolder();
  if (!root) return null;
  let entries;
  try {
    entries = fs.readdirSync(root, { withFileTypes: true });
  } catch {
    return null;
  }
  return entries
    .filter((e) => e.isDirectory() && !e.name.startsWith('.') && !e.name.startsWith('_'))
    .map((e) => {
      const [label, ...rest] = e.name.split(' - ');
      return { label, description: rest.join(' - '), fsPath: path.join(root, e.name) };
    })
    .sort((a, b) => a.label.localeCompare(b.label));
}

function isCurrent(fsPath) {
  const open = vscode.workspace.workspaceFolders || [];
  return open.some((f) => path.resolve(f.uri.fsPath) === path.resolve(fsPath));
}

class FolderProvider {
  constructor() {
    this._changed = new vscode.EventEmitter();
    this.onDidChangeTreeData = this._changed.event;
  }

  refresh() {
    this._changed.fire();
  }

  getTreeItem(folder) {
    const item = new vscode.TreeItem(folder.label);
    const current = isCurrent(folder.fsPath);
    item.description = folder.description;
    item.tooltip = current ? `${folder.fsPath}\n${vscode.l10n.t('You are here')}` : folder.fsPath;
    item.iconPath = new vscode.ThemeIcon(current ? 'check' : 'folder');
    item.command = { command: 'folderhop.open', title: 'Open', arguments: [folder] };
    return item;
  }

  getChildren(parent) {
    if (parent) return [];
    // An empty list makes VS Code show the welcome view with the "choose" button
    return readFolders() || [];
  }
}

async function chooseRoot() {
  const picked = await vscode.window.showOpenDialog({
    canSelectFolders: true,
    canSelectFiles: false,
    canSelectMany: false,
    openLabel: vscode.l10n.t('Use this folder'),
    title: vscode.l10n.t('Base folder (one subfolder per destination)'),
  });
  if (!picked) return;
  await vscode.workspace
    .getConfiguration('folderhop')
    .update('root', picked[0].fsPath, vscode.ConfigurationTarget.Global);
}

// Users of the old "Asignaturas" extension keep their folder
async function migrateFromAsignaturas() {
  const config = vscode.workspace.getConfiguration('folderhop');
  if (config.get('root')) return;
  const old = vscode.workspace.getConfiguration('asignaturas').get('root');
  if (old) await config.update('root', old, vscode.ConfigurationTarget.Global);
}

function activate(context) {
  const provider = new FolderProvider();

  context.subscriptions.push(
    vscode.window.registerTreeDataProvider('folderhop.list', provider),
    vscode.commands.registerCommand('folderhop.refresh', () => provider.refresh()),
    vscode.commands.registerCommand('folderhop.chooseRoot', chooseRoot),
    vscode.commands.registerCommand('folderhop.open', (folder) => {
      if (isCurrent(folder.fsPath)) return;
      vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(folder.fsPath), {
        forceNewWindow: false,
      });
    }),
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration('folderhop.root')) provider.refresh();
    })
  );

  migrateFromAsignaturas().catch(() => {});
}

function deactivate() {}

module.exports = { activate, deactivate };
