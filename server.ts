import { Application, Context } from 'oak/mod.ts'
import { oakCors } from 'cors/mod.ts'
import 'dotenv/load.ts'

import * as middlewares from './middlewares/middlewares.ts'

import { router as defaultRoutes } from './routes/default.ts'
import { router as linkRoutes } from './routes/links.ts'

export const appSecretKey = Deno.env.get('APP_SECRET_KEY') || ''

const app = new Application<Context>()

// Register middlewares
app.use(oakCors())
app.use(middlewares.loggerMiddleware)
app.use(middlewares.errorMiddleware)
app.use(middlewares.timingMiddleware)

// Will log the thrown error to the console.
app.addEventListener('error', (evt) => {
    console.log(evt.error)
})

// Register all routes
app.use(defaultRoutes.routes())
app.use(linkRoutes.routes())

await app.listen({ port: 8000 })
