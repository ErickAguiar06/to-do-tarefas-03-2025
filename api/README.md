# Instalação do Prisma 

```bash
cd api
npm i prisma -g
npm init -y
npm i express cors dotenv
npx prisma init --datasource-provider mysql
```

# Se necessário
- Altere o endereço do arquivo **.env** para:   
```js
DATABASE_URL="mysql://root@localhost:3306/tarefas"
```
```
npx prisma generate
```

# Migrations
- Faremos a migração do banco de dados para o MySQL através do comando a seguir no terminal
```bash
npx prisma migrate dev --name init

npx nodemon
```