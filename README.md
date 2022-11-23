# HNJMR 

Sistema de gestión para el Hospital de Niños Dr. José Manuel de los Ríos. 

Este proyecto fue realizado como parte del cumplimiento de pasantias de servicio comunitario en la Universidad Católica Andrés Bello (UCAB). El repositorio contiene el código fuente y la documentación de la aplicación cliente; no obstante, el proyecto también cuenta con una API REST para la comunicación con el servicio de almacenamiento [hnjmr-server](https://github.com/ChristianSanchez25/hnjmr-server).

## Prerequisitos

1. [Git](https://git-scm.com/)
2. [NodeJS](https://nodejs.org/es/)

## Instalación

Desde un terminal clonamos el repositorio 

    $ git clone https://github.com/leonardolarrad/hnjmr.git

e instalamos todas las dependencias necesarias

    $ cd hnjmr
    $ npm install

## Ejecutar (entorno de desarrollo)

Como estamos trabajando para una aplicación de escritorio pero con herramientas de desarrollo web tendremos la opción de levantar un servicio `desktop` o un servicio `browser`, en cualquiera de los dos casos se actualizaran los cambios realizados en el código sin necesidad de recompilar. 

Para ejecutar la aplicación en modo escritorio corremos 

    $ npm run desktop 

y para ejecutar la aplicación en modo browser 

    $ npm run browser

## Construir y distribuir (producción)

