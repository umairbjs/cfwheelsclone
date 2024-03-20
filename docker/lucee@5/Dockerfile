FROM ortussolutions/commandbox:3.8.4

RUN echo "------------------------------- Starting Dockerfile -------------------------------"

LABEL maintainer "Wheels Core Team"

WORKDIR /wheels-test-suite

COPY ../../ /wheels-test-suite

#Add the H2 extension
ADD https://ext.lucee.org/org.h2-1.3.172.lex /usr/local/lib/serverHome/WEB-INF/lucee-server/deploy/org.h2-1.3.172.lex

# ENV APP_DIR                 "/wheels-test-suite"
ENV HEALTHCHECK_URI         "http://127.0.0.1:8080/"
ENV ENV_MODE                "remote"
ENV BOX_SERVER_CFCONFIGFILE "/wheels-test-suite/docker/lucee@5/CFConfig.json"
ENV BOX_SERVER_PROFILE      "none"

RUN cd ${WORKDIR} && box install

# WARM UP THE SERVER
RUN ${BUILD_DIR}/util/warmup-server.sh

RUN rm -rf ${APP_DIR}/build

# Install our box.json dependencies
#RUN cd ${WORKDIR} && box install

#COPY box-install.sh /wheels-test-suite

#RUN sh box-install.sh

RUN box server start

#dockerfile ended