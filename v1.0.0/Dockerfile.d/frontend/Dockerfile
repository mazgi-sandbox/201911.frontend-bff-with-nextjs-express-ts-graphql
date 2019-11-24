FROM node:10 as base

# Set in non-interactive mode.
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
  && apt-get install --assume-yes --no-install-recommends locales procps dialog \
  && echo 'en_US.UTF-8 UTF-8' > /etc/locale.gen \
  && locale-gen

# Reset DEBIAN_FRONTEND to default(`dialog`).
# If you no need `dialog`, you can set `DEBIAN_FRONTEND=readline`.
# see also: man 7 debconf
ENV DEBIAN_FRONTEND=


# ================================
# Begin development stage
FROM base as development
ENV DEBIAN_FRONTEND=noninteractive

ARG GID=0
ARG UID=0
ENV GID=${GID:-0}
ENV UID=${UID:-0}

RUN apt-get update \
  && apt-get install --assume-yes --no-install-recommends git tmux zsh jq\
  && addgroup --gid ${GID} developer || true\
  && adduser --disabled-password --uid ${UID} --gecos '' --gid ${GID} developer || true

ENV DEBIAN_FRONTEND=
# End development stage
# ================================
