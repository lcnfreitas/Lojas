# Estagio 1: Build do Frontend (React)
FROM node:18-alpine AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install --legacy-peer-deps
COPY client/ ./
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm run build

# Estagio 2: Servidor Node.js + Arquivos do React
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production --ignore-scripts
COPY . .
COPY --from=client-build /app/client/build ./client/build

EXPOSE 80
ENV PORT=80
ENV NODE_ENV=production

CMD ["node", "index.js"]