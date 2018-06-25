FROM node:10

# Copy package manifests first to cache dependencies
# and optimize build times
COPY package.json yarn.lock ./
RUN yarn install

COPY . ./

RUN yarn build-server
RUN yarn build-client

EXPOSE 8080

CMD ["yarn", "start"]
