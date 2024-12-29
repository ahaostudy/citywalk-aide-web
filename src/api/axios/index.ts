import instance from './instance.ts'


export async function get(url: string, params?: object | undefined): Promise<Response> {
  return instance.get(url, { params })
}
