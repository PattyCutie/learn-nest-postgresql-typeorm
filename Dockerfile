FROM node:18-alpine as builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package.json /app/yarn.lock ./
RUN yarn install --frozen-lockfile --production

COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
ENV DATABASE_URL=""

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001
RUN chown -R nestjs:nodejs /app/dist
USER nestjs

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s CMD node healthcheck.js

EXPOSE 3000

VOLUME [ "/tmp" ]

CMD ["node", "dist/main"]