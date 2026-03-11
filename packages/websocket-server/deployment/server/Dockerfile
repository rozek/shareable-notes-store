# /opt/sds-server/server/Dockerfile
FROM node:22-alpine

WORKDIR /app

# install dependencies first so Docker can cache this layer
# sds-websocket-server.tgz and sds-persistence-node.tgz are built locally
# and copied here before docker compose build (see DEPLOYMENT.md — Quick Start)
COPY package.json sds-websocket-server.tgz sds-persistence-node.tgz ./
# --legacy-peer-deps: the local tarballs bundle all workspace deps (sds-core etc.)
# via Vite, so their peerDependencies entries are not needed at runtime and must
# not be resolved against the npm registry (they are not published there)
RUN npm install --omit=dev --legacy-peer-deps

# entry point
COPY server.mjs ./

# run as a non-root user
USER node

EXPOSE 3000

CMD ["node", "server.mjs"]
