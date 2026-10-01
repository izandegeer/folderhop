# FolderHop

Hop between folders like Mario between pipes. FolderHop adds a pipe icon to the VS Code sidebar: pick a base folder once, and every subfolder becomes a destination. Click one and VS Code opens it as your workspace in the same window. The folder you are in is marked with a ✓.

*[Versión en español más abajo](#en-español)*

## Use cases

- **Studies**: one folder per course or subject. This is where FolderHop was born, to jump between the subjects of a vocational web development degree without hunting through Finder.
- **Clients or freelance work**: one folder per client.
- **Side projects**: your `~/Projects` folder, one click per repo.
- **Anything else** organised as "a folder full of folders".

## Install

1. Download the `.vsix` file from the [latest release](https://github.com/izandegeer/folderhop/releases/latest).
2. In VS Code, open the Extensions view, click `...` at the top and choose **Install from VSIX...**.

   Or from a terminal: `code --install-extension folderhop-2.0.0.vsix`

3. Click the pipe icon in the sidebar, then **Choose base folder**.

## Tips

- Name folders `CODE - Name` (for example `DWS - Web Development Server Side`) and the sidebar shows the code in bold with the name next to it. Any other name works too and is shown as is.
- Folders starting with `.` or `_` are hidden, handy for an `_archive` folder.
- Change the base folder with the folder icon at the top of the panel or the `folderhop.root` setting.
- The interface follows your VS Code language (English and Spanish).

## En español

FolderHop añade una tubería a la barra lateral de VS Code. Eliges una carpeta base y cada subcarpeta se convierte en un destino: al pulsarla, VS Code la abre como workspace en la misma ventana. Nació para saltar entre las asignaturas del ciclo de DAW (una carpeta por asignatura, con nombres como `DWS - Desarrollo Web Entorno Servidor`), pero sirve para cualquier carpeta llena de carpetas: proyectos, clientes, repos...

Para instalarla, descarga el `.vsix` de la [última versión](https://github.com/izandegeer/folderhop/releases/latest) y en VS Code ve a Extensiones > `...` > **Install from VSIX...**. Luego pulsa la tubería y **Elegir carpeta base**.

Si tenías instalada la versión anterior (**Asignaturas**), desinstálala: FolderHop recupera tu carpeta automáticamente.

## Development

Plain JavaScript, no dependencies. To build the `.vsix`:

```sh
npx @vscode/vsce package
```

## License

MIT
