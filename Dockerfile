# Stage 1: Build Stage
FROM node:22-alpine AS build

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build  

# Stage 2: Production Stage
FROM node:22-alpine AS production

WORKDIR /app

RUN npm install -g pnpm

COPY --from=build /app/package.json /app/pnpm-lock.yaml ./
COPY --from=build /app/dist ./dist   

RUN pnpm install --prod --frozen-lockfile

EXPOSE 3000

ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}
ENV MONGO_URI=${MONGO_URI}
ENV TEST_MONGO_URI=${TEST_MONGO_URI}

COPY --from=build /app/src ./src  
COPY . . 

CMD ["sh", "-c", "pnpm start"]
