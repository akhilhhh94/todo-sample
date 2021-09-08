FROM node:14.17.6
RUN mkdir -p /app
WORKDIR /app
COPY /backend /app
RUN cd /app && npm install

CMD ["npm", "start"]
