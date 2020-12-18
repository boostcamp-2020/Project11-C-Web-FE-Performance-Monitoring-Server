# 부모 이미지 지정
FROM node:14
# 작업 디렉토리 생성
WORKDIR /usr/src/app
# 의존성 설치
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn
RUN yarn global add pm2
# 소스 추가
COPY ./. .
RUN yarn build
# 포트 매핑
EXPOSE 3000
EXPOSE 27017


# Add docker-compose-wait tool -------------------
ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

# 실행 명령
CMD /wait && pm2-runtime start ecosystem.config.js --env production
