import { Context, isHttpError, Status } from 'oak/mod.ts'

const isDevelopment = Deno.env.get('ENV') === 'dev' || Deno.env.get('ENV') === 'development'

// deno-lint-ignore no-explicit-any
const errorMiddleware = async (ctx: Context, next: () => Promise<any>) => {
    try {
        await next()
    } catch (err) {
        let message = err.message
        const status = err.status || err.statusCode || Status.InternalServerError

        /**
         * considering all unhandled errors as internal server error,
         * do not want to share internal server errors to
         * end user in non "development" mode
         */
        if (!isHttpError(err)) {
            message = isDevelopment ? message : 'Internal Server Error'
        }

        if (isDevelopment) {
            console.log(err)
        }

        ctx.response.status = status
        ctx.response.body = { status, message }
    }
}

export { errorMiddleware }
