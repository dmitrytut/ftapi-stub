# Version: 0.0.1
FROM node:6.9

# add ssh keys
RUN mkdir /root/.ssh
ADD ./ssh/* /root/.ssh/


RUN chmod 600 ~/.ssh/id_rsa && chmod 600 ~/.ssh/id_rsa.pub

# add bower config ignored to allow root to run ‘bower i’, install bower and webpack
RUN echo '{ "allow_root": true }' > /root/.bowerrc \
  && npm i -g bower   \
  && npm i -g webpack \
  && mkdir -p /usr/src/app

WORKDIR /usr/src/app
#ADD ./node_modules /usr/src/app
#ADD ./ /usr/src/app

ADD ./.node_modules.tar.gz /usr/src/app
ADD ./tmp-package.json /usr/src/app/package.json
RUN npm i --quiet --no-progress --unsafe-perm

ADD ./.app.tar.gz /usr/src/app
RUN npm run build
#RUN npm prune --production

EXPOSE 8080

#CMD [ "/bin/bash", "-c", "NODE_ENV=pr  oduction node ./.build/server.js" ]
CMD [ "/bin/bash", "-c", "node ./.build/server.js" ]
