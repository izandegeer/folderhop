# Asignaturas

Extensión de VS Code con un panel lateral (icono del birrete de bedel) que lista las asignaturas de `~/Documents/CFGS/CFGS-2`. Al pulsar una, VS Code abre su carpeta como workspace en la misma ventana. La asignatura abierta sale marcada con un check.

La ruta se cambia con el ajuste `asignaturas.root`.

## Instalar o actualizar

```sh
npx @vscode/vsce package --allow-missing-repository --skip-license
code --install-extension asignaturas-0.1.0.vsix
```

Después, recargar la ventana (`Developer: Reload Window`).
