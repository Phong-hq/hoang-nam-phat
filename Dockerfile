# please yarn before build - this is note (not remove)

FROM node:lts-alpine AS builder

WORKDIR /src

COPY .npmrc ./
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production=false

COPY . .

ENV DISABLE_VUE_TSC=1
RUN yarn build

# ========================
# Stage 2: Final runtime
# ========================
FROM node:lts-alpine AS final

WORKDIR /src

COPY --from=builder /src/.output ./.output

RUN apk --no-cache add redis && \
    npm install -g concurrently

ENV NODE_ENV=production \
    REDIS_HOST=srv-captain--web-booking-redis \
    REDIS_PORT=6379 \
    REDIS_USERNAME=default \
    REDIS_PASSWORD=123456 \
    SECURE_PHONE_SUSPICION=^\(242\) \
    SECURE_NAME_SUSPICION= \
    SECURE_EMAIL_SUSPICION= \
    NUXT_PUBLIC_GIFTCARD_URL=https://egift-booking.gci-app.dtsmart.dev \
    NUXT_PUBLIC_API_DOMAIN=https://web-booking.gbk01.dtsmart.dev \
    DB_HOST=db-web-booking-nyc1-17341-do-user-4549052-0.j.db.ondigitalocean.com \
    DB_USER=doadmin \
    DB_PORT=25060 \
    DB_PASSWORD=AVNS_tW4kSqWIHL56BXohyXV \
    DB_NAME=booking \
    IP_API_BASE_URL=https://pro.ip-api.com/json \
    IP_API_KEY=OrZQ35BeESq3ik1 \
    IP_API_FIELDS=21221375 \
    NUXT_PUBLIC_CLOUDFLARE_TURNSTILE_SECRET=0x4AAAAAABnnT7QV71b8yqrhg7EVKVQysgs \
    PROXY_API=https://ip2proxy-service.gci-app.dtsmart.dev \
    NUXT_PUBLIC_DESKTOP_WINDOW_MS=3600000 \
    NUXT_PUBLIC_DESKTOP_MAX_REQUESTS=2 \
    NUXT_PUBLIC_MOBILE_WINDOW_MS=600000 \
    NUXT_PUBLIC_MOBILE_MAX_REQUESTS=3 \
    NUXT_PUBLIC_MAX_APPOINTMENTS_PER_DAY=5 \
    HOST=0.0.0.0 

EXPOSE 3000
EXPOSE 6379

CMD concurrently \
  "/usr/bin/redis-server --bind 0.0.0.0 --requirepass ${REDIS_PASSWORD}" \
  "sleep 5s && node .output/server/index.mjs"
