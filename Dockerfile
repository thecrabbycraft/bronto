FROM denoland/deno:alpine

WORKDIR /app
USER deno

ADD . .
RUN deno cache server.ts

EXPOSE 8000

CMD ["deno", "task", "start"]
