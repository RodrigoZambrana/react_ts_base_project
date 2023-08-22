import ApiService from './ApiService'

export async function apiGetEmpresasList<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/empresas',
        method: 'post',
        data,
    })
}
