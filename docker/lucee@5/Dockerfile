FROM ortussolutions/commandbox:3.8.4

RUN echo "------------------------------- Starting Dockerfile -------------------------------"

LABEL maintainer "Wheels Core Team"

RUN apt-get update && apt-get install -y tini

WORKDIR /wheels-test-suite

COPY ../../ /wheels-test-suite

#Add the H2 extension
ADD https://ext.lucee.org/org.h2-1.3.172.lex /usr/local/lib/serverHome/WEB-INF/lucee-server/deploy/org.h2-1.3.172.lex

ENV APP_DIR                 "/wheels-test-suite"
ENV HEALTHCHECK_URI         "http://127.0.0.1:8080/"
ENV ENV_MODE                "remote"
ENV BOX_SERVER_CFCONFIGFILE "/wheels-test-suite/docker/lucee@5/CFConfig.json"
ENV BOX_SERVER_PROFILE      "none"



# WARM UP THE SERVER
RUN ${BUILD_DIR}/util/warmup-server.sh


# Install our box.json dependencies
RUN cd ${WORKDIR} && box install



