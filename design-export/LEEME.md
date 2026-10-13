# Exportaciones para Figma

Hay dos archivos HTML autocontenidos, listos para el plugin **html.to.design**:

- `litegua-pantallas.html`: las pantallas de la app.
- `litegua-sistema-de-diseno.html`: el sistema de diseño (colores con su hex, tipografía, espaciado, radios, sombras, íconos, botones, formularios, navegación, insignias, tarjetas, asientos, calendario, listas y boleto).

## Pantallas

`litegua-pantallas.html` reúne 44 pantallas de la app (390 px de ancho, página completa) en un solo archivo
autocontenido (CSS y fotos de tours incluidos; las fotos de agencias y mapa cargan desde internet).

Para importarlo con el plugin **html.to.design**:

1. Abre el plugin en Figma y elige importar un archivo HTML (o sirve el archivo y usa la opción de URL).
2. Importa `litegua-pantallas.html`. Cada pantalla queda como un frame con el nombre de la pantalla,
   agrupadas por sección: Autenticación, Inicio, Buses, Turismo, LEX, Agencias, Mis viajes y Perfil.

Es una captura estática del estado actual de la app; si cambia el diseño hay que volver a generarla.

## Sistema de diseño

Se importa igual (un frame de 1440 px de ancho con una sección por tema). Los valores de color son los reales renderizados por la app (Tailwind CSS 4 con el verde de marca personalizado en `src/index.css`). Si cambian tokens o componentes hay que volver a generarlo.
