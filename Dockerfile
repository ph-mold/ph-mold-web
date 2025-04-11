# 1단계: 빌드 스테이지
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG API_PROTOCOL
ARG API_HOST_NAME
ARG API_PORT

ENV API_PROTOCOL=$API_PROTOCOL
ENV API_HOST_NAME=$API_HOST_NAME
ENV API_PORT=$API_PORT

RUN npm run build

# 2단계: 런타임 스테이지
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app ./
RUN npm install --omit=dev

# Next.js는 start 명령어로 실행됨
CMD ["npm", "run", "start"]

# Next.js 포트
EXPOSE 3000