# Feelantera URL Shortener

[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/feelantera/fltr-link?logo=deno&style=flat-square)](https://github.com/feelantera/fltr-link)
[![(Deno)](https://img.shields.io/badge/deno-v1.24.2-green.svg?style=flat-square&logo=deno)](https://deno.land)
[![(Deno)](https://img.shields.io/badge/oak-v10.6.0-orange.svg?style=flat-square&logo=deno)](https://github.com/oakserver/oak)
[![Language](https://img.shields.io/github/languages/top/feelantera/fltr-link?style=flat-square)](https://github.com/feelantera/fltr-link)
[![License](https://img.shields.io/github/license/feelantera/fltr-link?style=flat-square)][choosealicense]
[![GitHub Sponsors](https://img.shields.io/static/v1?color=26B643&label=Sponsor&message=%E2%9D%A4&logo=GitHub&style=flat-square)](https://github.com/sponsors/riipandi)

<hr/>

This is our super simple URL shortener. Powered by [Supabase](https://supabase.com/partners/feelantera)
and [Deno](https://deno.land/), and [Oak](https://oakserver.github.io/oak) for the http framework.
You can deploy this project to [Deno Deploy](https://deno.com/deploy) or any container hosting such
as [Fly.io](https://fly.io/) or [Railway](https://railway.app/).

## 🏁 Quick Start

### Prerequisites

At least you will need `Deno >=1.24` and optionally `Docker >= 20.10` for building the container.

### Generate Secret Key

Before you continue, you need to create `.env` file (you can duplicate `.env.example`) and
fill the `application secret key` with some random string. To generate a secret key, use
the following command:

```sh
openssl rand -base64 500 | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1
```

### Up and Running

```sh
deno task dev     # run in development
deno task start   # run in production
```

Application will run at `http://localhost:8000`

## Build Container

```sh
# Build the container
DOCKER_BUILDKIT=1 docker build -t fltr-link:latest -t fltr-link:v0.1.0 .

# Running the container
docker run --rm -d -p 8000:8000 --name fltr-link --env-file .env fltr-link:latest

# Stopping the container
docker stop fltr-link
```

## 🚀 Deployment

Visit [Deno Deploy docs](https://deno.com/deploy/docs) for more information.

## 🧑🏻‍💻 Development

This project uses TypeScript for type checking, [deno_lint](https://lint.deno.land/) for linting,
and [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to get
TypeScript set up for your editor and install an editor plugin (like the [VSCode Prettier plugin](https://s.id/vscode-prettier))
to get auto-formatting on saving and get a really great in-editor experience with type checking
and auto-complete.

## Maintainer

Currently, [Aris Ripandi](htps://ripandis.com) ([@riipandi](https://twitter.com/riipandi)) is the only maintainer.

## License

This project is open-sourced software licensed under the [Apache License 2.0][choosealicense].

Copyrights in this project are retained by their contributors.

See the [license file](./LICENSE) for more information.

[choosealicense]: https://choosealicense.com/licenses/apache-2.0/
