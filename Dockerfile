FROM node:lts-alpine as builder

# Create app directory
WORKDIR /app

# Bundle app source
COPY . .

RUN npm install
RUN npm run build

FROM node:lts-alpine as production
WORKDIR /app

RUN apk add --no-cache bash curl && curl -1sLf \
    'https://dl.cloudsmith.io/public/infisical/infisical-cli/setup.alpine.sh' | bash \
    && apk add infisical

COPY --from=builder /app/node_modules ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src

EXPOSE 3000
CMD ["infisical", "run", "--", "npm", "run", "start"]