# BEERFLIX

Web sobre cervezas basada en la información de una API. Consta de dos páginas:

* Una Home inicial donde podemos ver un listado de 10 cervezas y filtrar por palabras o por la fecha en la que se comenzó a fabricar.

* Una página de detalle que ofrece más información sobre una sóla cerveza, en la que podremos añadir likes y comentarios, podemos acceder a ella clickando en las cervezas desde el Home.

## Para inicializar el proyecto:

```shell
npm install
```

## Para arrancar el proyecto:

* En producción:

```shell
npm run prod
```

* En desarrollo, para ver los cambios en el momento:

```shell
npm run dev
```
El proyecto arrancará automaticamente en 'http://localhost:3000/'

## Estructura de la web:

A continuación haré un pequeño resumen de las funciones de los diferentes archivos:

* Cuenta con dos páginas html, una home: index.html y una de detalle: detail.html, a la que pasaremos diferentes ids para renderizar el contenido de una u otra cerveza.

Los archivos Javascript sirven para los siguientes fines:

* api.js contiene las distintas funciones para hacer llamadas o cambios en la API, que luego son recogidas por el resto de archivos.

* detail-functions.js contiene todas las funciones referentes a cargar el ui de la página de detalle y a interactuar con este, incluyendo las funciones de 'like' y 'comentario'.

* home-beers.js incluye todas las funciones referentes a la carga de las cervezas en el Home.

* navbar.js incluye todas las funciones para renderizar el UI y activar los elementos de búsqueda referentes al navbar.

## Observaciones

* Para que html-loader tuviera en cuenta los diferentes source de picture y añadiese las imagenes utilizadas a la carpeta dist he tenido que editar un archivo de este mismo, cambiando en ./node_modules/html-loader/index.html, la linea 29:

```shell
 var attributes = ["img:src"];
 ```

 por 

 ```shell
 var attributes = ["img:src","source:srcset"];
 ```


* Al entrar en el Home la página busca las fechas de las cervezas en la base de datos e imprime los botones de fecha en el navbar con esta información, dado que la velocidad de respuesta de la API es algo larga podría interesar en un futuro, si no se mejorara la velocidad de carga, eliminar o editar esta funcionalidad.

