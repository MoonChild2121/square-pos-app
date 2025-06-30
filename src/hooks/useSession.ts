import { useEffect, useState } from 'react'

interface MerchantData {
  merchantId: string | null
  businessName: string | null
  isLoading: boolean
  error: Error | null
}

export function useSession() {
  const [merchantData, setMerchantData] = useState<MerchantData>({
    merchantId: null,
    businessName: null,
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    async function fetchMerchantData() {
      try {
        const response = await fetch('/api/merchant')
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch merchant data')
        }

        setMerchantData({
          merchantId: data.merchantId,
          businessName: data.businessName,
          isLoading: false,
          error: null,
        })
      } catch (error) {
        setMerchantData((prev) => ({
          ...prev,
          isLoading: false,
          error: error as Error,
        }))
      }
    }

    fetchMerchantData()
  }, [])

  return merchantData
}
