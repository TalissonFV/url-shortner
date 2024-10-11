# Encurtador de URL com e sem autenticação de usuarios para teste tecnico

## Descrição
Encurtador de URL utilizando Nest e Prisma (SQLite). Criação e Autenticação de usuario utilizando Passport.js e JWT.
[Documentação](http://localhost:3000/api) pode ser acessada após rodar o app 

## Utilizando Docker Compose
```bash
$ docker compose build
$ docker compose up
```

## Instalação nest e pnpm

```bash
$ npm install -g @nestjs/cli
$ npm install -g pnpm
```

## Criando arquivo .env

Alterar o nome do arquivo `.env.example` para `.env` 



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
---
# Documentação
## Encurtar URL
Para encurtart uma URL realize uma chamada `POST` para o endpoint `/short` com o seguinte payload:
``` json
{
    "originUrl": "http://url.com"
}
```

Após a chamada será retornado um novo link com a URL encurtada que poderá ser acessada a partir de agora:

#### Response
``` json
{
    "shortened_url": "http://localhost:3000/hrz1jt"
}
```

Qualquer pessoa pode chamar o endpoint, porém, caso seja enviado um token no Header `authorization` você poderá, visualizar, editar e excluir este cadastro.


Para cadastrar um novo usuario siga [Cadastro de Usuario](#cadastro-de-usuario).

## Cadastro de Usuario
Um usuario poderá ser cadastraro ao realizar uma chamada `POST` para o endpoint `/user/register` com o seguinte payload:
``` json
{
    "email": "email@email.com",
    "password": "123"
}
```

Após o cadastro será necessário realizar uma autenticação para poder receber um token JWT e realizar chamadas de consulta, edição e exclusão.

## Autenticar Usuario
Um usuario poderá ser autenticado ao realizar uma chamada `POST` para o endpoint `/auth/login` com o seguinte payload:
``` json
{
    "email": "email@email.com",
    "password": "123"
}
```

Caso estiver tudo certo com os dados enviados, será retornado um JWT que deverá ser guardado para realizar as chamadas de consulta, edição e exclusão.

### Response
``` json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmYWNiZGU2YS1kOTlhLTQ1MGUtOTBiZS1iODcyYWVkNjE3YTQiLCJlbWFpbCI6InRhbGlzc29uMkBlbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDI0LTEwLTEwVDIyOjE1OjA3LjE0NFoiLCJpYXQiOjE3Mjg1OTg1MTEsImV4cCI6MTczMTE5MDUxMX0.6fhsrx6ZiY0jAZEToUEM1wmNki6WvsGOyKCHGyBoLlU"
}
```

## Listar todas URLs validas encurtadas pelo usuario
Para listar todas URLs validas encurtadas pelo o usuario é necessario enviar o token JWT recebido após a autenticação no Header `authorization`.
Para receber todas URLs validas é necessário fazer uma chamada `GET` para o endpoint `/url/list`. 
Poderá ser enviado no Body as opções de paginação:

``` json
{
    "page": "1",
    "perPage": "2"
}
```

## Editar destino de URL encurtada pelo usuario
Para editar o destino de URLs encurtadas pelo o usuario é necessario enviar o token JWT recebido após a autenticação no Header `authorization`.
Para editar o destino é necessario fazer uma chamada `PATCH` para o endpoint `/url/update-destiny` com o seguinte payload:

``` json
{
    "urlId": "123abc",
    "newUrlDestiny": "http://google.com"
}
```

O campo `urlId` pode ser obtido após listar todas as URLs criadas pelo usuario.

## Deletar URL encurtada pelo usuario
Para deletar as URLs encurtadas pelo o usuario é necessario enviar o token JWT recebido após a autenticação no Header `authorization`.
Para deletar é necessario fazer uma chamada `DELETE` para o endpoint `/url/delete` com o seguinte payload:

``` json
{
    "urlId": "123abc"
}
```

O campo `urlId` pode ser obtido após listar todas as URLs criadas pelo usuario.


## License

Nest is [MIT licensed](LICENSE).

