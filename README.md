# Asignaturas

Extensión de VS Code para saltar entre las carpetas de tus asignaturas. Añade un icono de birrete a la barra lateral; al pulsarlo ves tus asignaturas y, con un clic, VS Code abre esa carpeta como workspace en la misma ventana. La asignatura abierta sale marcada con un ✓.

## Instalar

1. Descarga el archivo `.vsix` de la última versión en [Releases](https://github.com/izandegeer/vscode-asignaturas/releases/latest).
2. En VS Code, abre la vista de Extensiones, pulsa los tres puntos (`...`) de arriba y elige **Install from VSIX...**. Selecciona el archivo descargado.

   Desde el terminal también vale: `code --install-extension asignaturas-1.0.0.vsix`

3. Pulsa el birrete de la barra lateral y luego **Elegir carpeta**.

## Cómo organizar las carpetas

Elige la carpeta que contiene una subcarpeta por asignatura. Si las nombras como `CÓDIGO - Nombre`, el panel enseña el código en grande y el nombre al lado:

```
Curso/
├── DAW - Despliegue de Aplicaciones Web/
├── DWC - Desarrollo Web Entorno Cliente/
└── DWS - Desarrollo Web Entorno Servidor/
```

Las carpetas sin guion también funcionan; se muestran con su nombre tal cual. Las que empiezan por `.` o `_` se ignoran (útil para un `_archivo`).

Para cambiar de carpeta más adelante, usa el icono de carpeta de arriba del panel o el ajuste `asignaturas.root`.

## Desarrollo

Es JavaScript sin dependencias: `extension.js` y `package.json`. Para generar el `.vsix`:

```sh
npx @vscode/vsce package
```

## Licencia

MIT
