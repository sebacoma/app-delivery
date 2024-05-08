# Backend DeliverEat

## Descripción del Proyecto
Este proyecto consiste en la construcción de una API de Delivery con el objetivo de comprender los aspectos fundamentales de NodeJS, utilizando NodeJS, Express, MySQL y Sequelize.

![NODE Express and MySQL logo](https://camo.githubusercontent.com/dd9024e69baf8374565724596b731933da38474be9b102fc3a555f06f90ffe22/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a313430302f312a5f765f706564414a486e334e7a573670724b445264412e706e67)

## Tecnologías Utilizadas
- NodeJS
- Express
- MySQL
- Sequelize

## Instalación y Configuración

### Software Necesario
- [Node](https://nodejs.org/): Descargar e instalar Node.js.
- [Nodemon](https://www.npmjs.com/package/nodemon): Instalar globalmente con `npm install -g nodemon`.
- MySQL Workbench (o cualquier gestor de base de datos de tu elección): Descargar e instalar [MySQL Workbench](https://www.mysql.com/products/workbench/).

### Pasos de Ejecución
1. Instalar MySQL Workbench.
2. Ingresar Seeders de Roles.
3. Copiar el archivo `.env.example` y nombrarlo como `.env`.
4. Ejecutar el comando `npm install` para instalar las dependencias del proyecto.
5. Configurar las variables de entorno en el archivo `.env`.
6. Ejecutar el proyecto de manera local con el comando `nodemon app`.

## Comandos de Migraciones
- **Crear Migración:** `sequelize migration:generate --name [nombre_migración]`
- **Revertir Última Migración:** `sequelize db:migrate:undo`
- **Revertir Todas las Migraciones:** `sequelize db:migrate:undo:all`
- **Ejecutar Migraciones:** `sequelize db:migrate`

## Comandos de Seeders
- **Crear Seeder:** `sequelize seed:generate --name [nombre_seeder]`
- **Revertir Último Seeder:** `sequelize db:seed:undo`
- **Revertir Todos los Seeders:** `sequelize db:seed:undo:all`
- **Ejecutar Seeders:** `sequelize db:seed:all`

## Autores
- **Kevin Araya**
- **Alexander Tapia**
- **Sebastian Concha**
- **David Zeballos**
