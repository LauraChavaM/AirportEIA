# API CRUD with Node Js, Sequelize and MySQL

## If the base project already exists, use npm i to install dependencies.

```sh
npm install
```

## Create base project

```sh
npm init -y
```
(this command help us to init base project)

```sh
npm install express sequelize mysql2 cors body-parser helmet morgan dotenv
```

> [!NOTE]  
> those are the dependencies we need to use ORM, to connect to data base, to add security configurations to our apis and finally to get variables from environment process and log all transactions requested.

```sh
npm install --save-dev nodemon sequelize-cli
```

> [!NOTE]  
> Nodemon it's for autorefresh pur project. Sequelize cli is our client to exec sequelize commands.

```sh
npx sequelize-cli init
```

> [!NOTE]  
> This command help us to create base folder structure in root project.

## create mandatory folders and files
1. controllers (folder to include operations to database)
2. routes (folder to include available routes to execute or call controller functions)
3. .env (file where we have our credentials)

## Install auth dependencies

```sh
npm install jsonwebtoken bcryptjs express-jwt
```

> [!IMPORTANT]  
> Our credentials always shall be hidden on .env file and env config.

4. .sequelizerc (file where we specify that project should use config.js file)
5. replace config.json to config.js

> [!WARNING]  
> We must replace config.json to config.js file because it's not a good idea show our credentendials out of environment settings.

6. server.js (StartUp project)
7. Modify package.json run command with nodemon

> [!TIP]
> In server.js we need to include all necesary middleware.

> [!IMPORTANT]  
> Once you have installed all dependencies and you have a complete package.json with all of them included
> you just need run
```sh
npm i
```


## create a model

1. This command help us to create a new migration file where allow us to modify the database model
```sh
npx sequelize-cli migration:generate --name name-of-your-migration
```

2. This command help us to apply migration changes into the database model
```sh
npx sequelize-cli db:migrate
```

## Documentation

- https://sequelize.org/docs/v6/core-concepts/model-basics/#extending-model
- https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
- https://sequelize.org/docs/v6/other-topics/migrations/
