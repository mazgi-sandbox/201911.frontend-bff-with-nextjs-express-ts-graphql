# Frontend + BFF with Next.js, Express, TypeScript, GraphQL example 1.0

## Before you begin

### Required

- [Docker & Docker Compose](https://www.docker.com)
- [direnv](https://github.com/direnv/direnv)

## Before development

### (optional) Create the ENV file for Docker

Create the `.env` file like bellow.

_You can get your local IP Address for bind via `ip addr show` or `ifconfig` command._  
_You can get your UID and GID via `id` command._

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

### Generate the key pair

Generate the key pair via openssl command like bellow.

First, you should run `direnv allow` command to load `${DEV_CREDENTIALS_DIR}` environment variable.

```shellsession
direnv allow
```

```shellsession
mkdir -p ${DEV_CREDENTIALS_DIR}
openssl genrsa -out ${DEV_CREDENTIALS_DIR}/key.pem 4096
openssl rsa -in ${DEV_CREDENTIALS_DIR}/key.pem -pubout -out ${DEV_CREDENTIALS_DIR}/pubkey.pem
```

Last, you should re-run `direnv allow` command to load `key.pem` and `pubkey.pem` file that you just generated.

```shellsession
direnv allow
```

### Create config.json file

Place `config.development/config.json` like bellow.

```json
{
  "version": "2019.11.0-dev",
  "server": {
    "port": 4000,
    "origins": ["http://192.168.65.1:3000"]
  },
  "seeds": {
    "users": [
      {
        "name": "admin",
        "displayName": "システム管理者",
        "email": "admin@example.com",
        "password": "password"
      }
    ]
  }
}
```
