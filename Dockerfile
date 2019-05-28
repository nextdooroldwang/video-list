FROM node:10
COPY ./ /dashboard
WORKDIR /dashboard
RUN yarn install && yarn run build

FROM nginx
RUN mkdir /dashboard
COPY --from=0 /dashboard/dist /dashboard
COPY nginx.conf /etc/nginx/nginx.conf
