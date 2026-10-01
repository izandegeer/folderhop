# FolderHop

Hop between folders like Mario between pipes. FolderHop adds a pipe icon to the VS Code sidebar: pick a base folder once, and every subfolder becomes a destination. Click one and VS Code opens it as your workspace in the same window. The folder you are in is marked with a ✓.

*[Versión en español más abajo](#en-español)*

## Use cases

- **Studies**: one folder per course or subject. This is where FolderHop was born, to jump between the subjects of a vocational web development degree without hunting through Finder.
- **Clients or freelance work**: one folder per client.
- **Side projects**: your `~/Projects` folder, one click per repo.
- **Anything else** organised as "a folder full of folders".

## Install by hand

FolderHop is not on the VS Code Marketplace yet, so you install it from a `.vsix` file.

1. Download [`folderhop.vsix`](https://github.com/izandegeer/folderhop/releases/latest/download/folderhop.vsix) (always the latest version).
2. In VS Code, open the Extensions view (`Ctrl+Shift+X`, `Cmd+Shift+X` on Mac), click `...` at the top right and choose **Install from VSIX...**. Select the downloaded file.

   Or from a terminal:

   ```sh
   code --install-extension folderhop.vsix
   ```

   If `code` is not found on Mac, open VS Code and run **Shell Command: Install 'code' command in PATH** from the Command Palette.

3. Reload the window: Command Palette (`Ctrl+Shift+P`, `Cmd+Shift+P` on Mac) > **Developer: Reload Window**.
4. Click the pipe icon in the sidebar, then **Choose base folder**.

To update, repeat steps 1 to 3.

## Install with an AI assistant

If you use an AI coding assistant with terminal access (Claude Code, Codex, Cursor, Copilot agent mode...), paste this prompt:

```text
Install the FolderHop VS Code extension (https://github.com/izandegeer/folderhop)
following the "Instructions for AI assistants" section of its README.
```

### Instructions for AI assistants

1. Check that the `code` CLI is available (`code --version`). If it is not:
   - macOS: try `"/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code"`.
   - Windows: try `"$env:LOCALAPPDATA\Programs\Microsoft VS Code\bin\code.cmd"`.
   - Otherwise ask the user to run **Shell Command: Install 'code' command in PATH** from the VS Code Command Palette.
2. Download the latest package to a temporary folder:
   - macOS / Linux: `curl -fL -o /tmp/folderhop.vsix https://github.com/izandegeer/folderhop/releases/latest/download/folderhop.vsix`
   - Windows (PowerShell): `Invoke-WebRequest https://github.com/izandegeer/folderhop/releases/latest/download/folderhop.vsix -OutFile "$env:TEMP\folderhop.vsix"`
3. Install it: `code --install-extension <path to folderhop.vsix> --force`
4. Verify: `code --list-extensions` must include `izandegeer.folderhop`. If `izandegeer.asignaturas` is also listed (the old name), uninstall it with `code --uninstall-extension izandegeer.asignaturas`.
5. Optional: ask the user which base folder they want (the folder whose subfolders they want to hop between). Only if they give one, set `"folderhop.root": "<that path>"` in their VS Code user `settings.json`, adding the key without touching the rest of the file. Otherwise they can pick it from the sidebar.
6. Tell the user to reload VS Code (Command Palette > **Developer: Reload Window**) and click the pipe icon in the sidebar. Do not close or restart VS Code yourself, since it may have unsaved work.

## Tips

- Name folders `CODE - Name` (for example `DWS - Web Development Server Side`) and the sidebar shows the code in bold with the name next to it. Any other name works too and is shown as is.
- Folders starting with `.` or `_` are hidden, handy for an `_archive` folder.
- Change the base folder with the folder icon at the top of the panel or the `folderhop.root` setting.
- The interface follows your VS Code language (English and Spanish).

## En español

FolderHop añade una tubería a la barra lateral de VS Code. Eliges una carpeta base y cada subcarpeta se convierte en un destino: al pulsarla, VS Code la abre como workspace en la misma ventana. Nació para saltar entre las asignaturas del ciclo de DAW (una carpeta por asignatura, con nombres como `DWS - Desarrollo Web Entorno Servidor`), pero sirve para cualquier carpeta llena de carpetas: proyectos, clientes, repos...

### Instalar a mano

1. Descarga [`folderhop.vsix`](https://github.com/izandegeer/folderhop/releases/latest/download/folderhop.vsix) (siempre la última versión).
2. En VS Code, abre Extensiones (`Ctrl+Shift+X`, `Cmd+Shift+X` en Mac), pulsa `...` arriba a la derecha y elige **Install from VSIX...**. Selecciona el archivo descargado. Desde el terminal también vale: `code --install-extension folderhop.vsix`
3. Recarga la ventana: paleta de comandos (`Ctrl+Shift+P`, `Cmd+Shift+P` en Mac) > **Developer: Reload Window**.
4. Pulsa la tubería de la barra lateral y luego **Elegir carpeta base**.

Para actualizar, repite los pasos 1 a 3.

### Instalar con una IA

Si usas un asistente de IA con acceso al terminal (Claude Code, Codex, Cursor, Copilot en modo agente...), pégale esto:

```text
Instala la extensión de VS Code FolderHop (https://github.com/izandegeer/folderhop)
siguiendo la sección "Instructions for AI assistants" de su README.
```

Si tenías instalada la versión anterior (**Asignaturas**), desinstálala: FolderHop recupera tu carpeta automáticamente.

## Development

Plain JavaScript, no dependencies. To build the `.vsix`:

```sh
npx @vscode/vsce package
```

## License

MIT
