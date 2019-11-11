_This document still works in progress._

## Before you begin

### Required

- [Docker & Docker Compose](https://www.docker.com)
- [direnv](https://github.com/direnv/direnv)

## Before development

### (optional) Create the ENV file for Docker

Create the `.env` file like bellow.

on macOS

```
BIND_IP_ADDR=192.168.65.1
```

on Linux

```
BIND_IP_ADDR=192.168.65.1
UID=1000
GID=100
```

### Setup direnv

Edit the `.envrc` file with `direnv edit .` command.

### Generate the key pair

Generate the key pair via openssl command like bellow.

```shellsession
openssl genrsa -out ${DEV_CREDENTIALS_DIR}/key.pem 4096
openssl rsa -in ${DEV_CREDENTIALS_DIR}/key.pem -pubout -out ${DEV_CREDENTIALS_DIR}/pubkey.pem
```
