FROM node:10

COPY package.json yarn.lock ./
RUN yarn install

EXPOSE 8080

CMD ["node", "."]
