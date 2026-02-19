FROM node 

ENV MONGO_DB_USERNAME=ADMIN \
    MONGO_DB_PWD=qwerty

    RUN mkdir -p testapp

    COPY . /testapp

    CMD ["node", "/testapp/server.js"]