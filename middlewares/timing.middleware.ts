import { Context } from 'oak/mod.ts'

// deno-lint-ignore no-explicit-any
const timingMiddleware = async (ctx: Context, next: () => Promise<any>) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    ctx.response.headers.set('X-Response-Time', `${ms}ms`)
}

export { timingMiddleware }
