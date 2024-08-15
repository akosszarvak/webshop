import axios from 'axios'
import { describe, it, expect, vi } from 'vitest'
import { fetchProductsApi } from '@/utils/api'

vi.mock('axios')

describe('fetchProductsApi', () => {
  it('should fetch products from API', async () => {
    const mockData = [{ id: '1', name: 'Product 1' }]
    axios.get.mockResolvedValue({ data: mockData })

    const products = await fetchProductsApi()

    expect(axios.get).toHaveBeenCalledWith(
      'https://cas5-0-urlprotect.trendmicro.com:443/wis/clicktime/v1/query?url=https%3a%2f%2f63c10327716562671870f959.mockapi.io%2fproducts&umid=edab3d48-7a50-4ca6-b6c9-9362af456f60&auth=3bd1ed0ea25e030aebac2180cda48b2d7a1ccc30-bf53e959aa381ef3b79ace2237ee4d9545bb0e5b'
    )
    expect(products).toEqual(mockData)
  })
})
