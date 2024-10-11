# Encurtador de URL com e sem autenticação de usuarios para teste tecnico

## Descrição
Encurtador de URL utilizando Nest e Prisma (SQLite). Criação e Autenticação de usuario utilizando Passport.js e JWT.
[Documentação](http://localhost:3000/api) pode ser acessada após rodar o app 

## Instalação nest e pnpm

```bash
$ npm install -g @nestjs/cli
$ npm install -g pnpm
```


## Instalação de Dependências

```bash
$ pnpm install
```

## Criação do banco SQLite
```bash
$ pnpm prisma init --datasource-provider sqlite
$ pnpm prisma migrate dev
```

## Rodando o app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Teste

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
