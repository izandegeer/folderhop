const vscode = require('vscode');
const fs = require('fs');
const os = require('os');
const path = require('path');

function carpetaRaiz() {
  const root = vscode.workspace.getConfiguration('asignaturas').get('root') || '';
  return root.trim().replace(/^~(?=$|[\\/])/, os.homedir());
}

// Carpetas "CÓDIGO - Nombre" de la raíz, ordenadas por código
function leerAsignaturas() {
  const root = carpetaRaiz();
  if (!root) return null;
  let entradas;
  try {
    entradas = fs.readdirSync(root, { withFileTypes: true });
  } catch {
    return null;
  }
  return entradas
    .filter((e) => e.isDirectory() && !e.name.startsWith('.') && !e.name.startsWith('_'))
    .map((e) => {
      const [codigo, ...resto] = e.name.split(' - ');
      return { codigo, nombre: resto.join(' - '), ruta: path.join(root, e.name) };
    })
    .sort((a, b) => a.codigo.localeCompare(b.codigo));
}

function esActual(ruta) {
  const carpetas = vscode.workspace.workspaceFolders || [];
  return carpetas.some((f) => path.resolve(f.uri.fsPath) === path.resolve(ruta));
}

class ProveedorAsignaturas {
  constructor() {
    this._cambio = new vscode.EventEmitter();
    this.onDidChangeTreeData = this._cambio.event;
  }

  refrescar() {
    this._cambio.fire();
  }

  getTreeItem(asignatura) {
    const item = new vscode.TreeItem(asignatura.codigo);
    item.description = asignatura.nombre;
    item.tooltip = asignatura.ruta;
    item.iconPath = new vscode.ThemeIcon(esActual(asignatura.ruta) ? 'check' : 'folder');
    item.command = { command: 'asignaturas.abrir', title: 'Abrir asignatura', arguments: [asignatura] };
    return item;
  }

  getChildren(padre) {
    if (padre) return [];
    // Sin carpeta válida la lista queda vacía y VS Code muestra el botón "Elegir carpeta"
    return leerAsignaturas() || [];
  }
}

async function elegirCarpeta() {
  const eleccion = await vscode.window.showOpenDialog({
    canSelectFolders: true,
    canSelectFiles: false,
    canSelectMany: false,
    openLabel: 'Usar esta carpeta',
    title: 'Carpeta con una subcarpeta por asignatura',
  });
  if (!eleccion) return;
  await vscode.workspace
    .getConfiguration('asignaturas')
    .update('root', eleccion[0].fsPath, vscode.ConfigurationTarget.Global);
}

function activate(context) {
  const proveedor = new ProveedorAsignaturas();

  context.subscriptions.push(
    vscode.window.registerTreeDataProvider('asignaturas.lista', proveedor),
    vscode.commands.registerCommand('asignaturas.refrescar', () => proveedor.refrescar()),
    vscode.commands.registerCommand('asignaturas.elegirCarpeta', elegirCarpeta),
    vscode.commands.registerCommand('asignaturas.abrir', (asignatura) => {
      if (esActual(asignatura.ruta)) return;
      vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(asignatura.ruta), {
        forceNewWindow: false,
      });
    }),
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration('asignaturas.root')) proveedor.refrescar();
    })
  );
}

function deactivate() {}

module.exports = { activate, deactivate };
