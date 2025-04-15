# 1단계: 빌드 스테이지
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG NEXT_PUBLIC_FILE_SERVER_BASE_URL
ARG NEXT_PUBLIC_API_BASE_URL

ENV NEXT_PUBLIC_FILE_SERVER_BASE_URL=$NEXT_PUBLIC_FILE_SERVER_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

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