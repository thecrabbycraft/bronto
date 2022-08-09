import { Context } from 'oak/mod.ts'

export function throwError(ctx: Context, code: number, message: string) {
    ctx.response.status = 403
    return (ctx.response.body = { code, message })
}
