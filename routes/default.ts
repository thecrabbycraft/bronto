import { Context, Router } from 'oak/mod.ts'
import { getQuery } from 'oak/helpers.ts'

import { supabase } from '../libraries/supabase.ts'
import type { Links } from '../routes/links.ts'

export const router = new Router()

router.get('/', (ctx: Context) => {
    ctx.response.redirect('https://feel.co.id/')
})

router.get('/api', (ctx: Context) => {
    ctx.response.body = `Your IP Address is: ${ctx.request.ip}`
})

router.get('/healthcheck', (ctx: Context) => {
    ctx.response.body = 'OK'
})

router.get('/:slug', async (ctx: Context) => {
    const { slug } = getQuery(ctx, { mergeParams: true })
    const { data } = await supabase.from<Links>('links').select().eq('slug', slug).limit(1).single()
    if (!data) return ctx.response.redirect(`https://feel.co.id/404?ref=fltr&path=${slug}`)

    await supabase
        .from<Links>('links')
        .update({ total_clicks: data.total_clicks + 1 })
        .match({ id: data.id })

    ctx.response.redirect(data.original_url)
})
