import { Context, Router } from 'oak/mod.ts'
import { getQuery } from 'oak/helpers.ts'

import { throwError } from '../libraries/helpers.ts'
import { supabase } from '../libraries/supabase.ts'
import { appSecretKey } from '../server.ts'

export type Links = {
    id: string
    title: string
    slug: string | null
    original_url: string
    total_clicks: number
    createdAt: Date
    updatedAt: Date
}

export const router = new Router().prefix('/api/links')

router.get('/', getLinks)
router.get('/:id', getSingleLink)

async function getLinks(ctx: Context) {
    const secretKey = ctx.request.headers.get('x-secret-key')
    if (!secretKey || secretKey !== appSecretKey) return throwError(ctx, 403, 'Forbidden!')

    const { data, error } = await supabase.from<Links>('links').select()
    if (error) return throwError(ctx, 500, error.message)
    if (!data) return throwError(ctx, 404, 'Not found!')

    const hrefUrl = ctx.request.url.origin + ctx.request.url.pathname
    const result = data?.map((link: Links) => ({
        ...link,
        _href: `${hrefUrl}/${link.id}`,
    }))

    ctx.response.body = result
}

async function getSingleLink(ctx: Context) {
    const secretKey = ctx.request.headers.get('x-secret-key')
    if (!secretKey || secretKey !== appSecretKey) return throwError(ctx, 403, 'Forbidden!')

    const { id } = getQuery(ctx, { mergeParams: true })
    const { data, error } = await supabase.from<Links>('links').select().eq('id', id).limit(1).single()
    if (error) return throwError(ctx, 500, error.message)
    if (!data) return throwError(ctx, 404, 'Not found!')

    ctx.response.body = data
}
