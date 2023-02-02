FROM node:16-alpine
WORKDIR /api
COPY package.json /api
RUN yarn install
COPY . /api
#EXPOSE 3006
CMD yarn start