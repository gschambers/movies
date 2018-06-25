FROM node:10

COPY package.json yarn.lock ./
RUN yarn install

COPY . ./

EXPOSE 8080

CMD ["node", "."]
