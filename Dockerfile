FROM node:lts-alpine as builder

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN npm run build

FROM node:lts-alpine as production

WORKDIR /app

COPY --from=builder /app/package*.json ./

RUN npm install --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./
COPY --from=builder /app/tsconfig.json ./

EXPOSE 3000
CMD ["npm", "start"]