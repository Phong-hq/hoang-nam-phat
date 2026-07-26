# FROM node:lts-alpine as builder

# ENV APP_ROOT /src

# RUN mkdir ${APP_ROOT}
# WORKDIR ${APP_ROOT}
# ADD . ${APP_ROOT}

# COPY package*.json ./

# RUN yarn install
# RUN yarn run build

# ENV HOST 0.0.0.0

# ENTRYPOINT ["node", ".output/server/index.mjs"]

FROM node:lts-alpine as builder

ENV DEFAULT_API_DOMAIN ''
ENV APP_ROOT /src
RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

COPY package*.json ./

RUN yarn install
RUN yarn run build


FROM node:lts-alpine as final
COPY --from=builder /src/.output /src/.output

RUN apk --update add redis && \
    npm install -g concurrently  

# EXPOSE 6379
ENV APP_ROOT /src
WORKDIR ${APP_ROOT}

ENV REDIS_HOST 'localhost'
ENV REDIS_PORT 6379
ENV REDIS_USERNAME 'default'
ENV REDIS_PASSWORD '123456abcA'
# ENV DEFAULT_API_DOMAIN 'https://web-booking.gci-app.dtsmart.dev'



ENV HOST 0.0.0.0

EXPOSE 3000
EXPOSE 6379

CMD concurrently "/usr/bin/redis-server --bind '0.0.0.0' --requirepass '${REDIS_PASSWORD}'" "sleep 5s; node /src/.output/server/index.mjs" 