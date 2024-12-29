import { get } from '../axios'
import type { GetRecommendationResp, GetRouteResp, SearchReq, SearchResp } from '../../model/routes.ts'


export async function searchAPI(req: SearchReq): Promise<SearchResp> {
  const resp = await get('/search', req)
  return Promise.resolve(resp.data)
}


export async function getRouteAPI(route_id: string): Promise<GetRouteResp> {
  const resp = await get(`/route/${route_id}`)
  return Promise.resolve(resp.data)
}

export async function getRecommendationAPI(route_id: string): Promise<GetRecommendationResp> {
  const resp = await get('/recommendation', { route_id })
  return Promise.resolve(resp.data)
}