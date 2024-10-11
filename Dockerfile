FROM node:22-slim as builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

FROM builder AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM builder AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM builder
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
COPY --from=build /app/prisma ./prisma

EXPOSE 3000

RUN apt-get update -y && apt-get install -y openssl

CMD [  "pnpm", "run", "start:migrate:prod" ]
