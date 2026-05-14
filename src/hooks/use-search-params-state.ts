"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useCallback } from "react"

export function useSearchParamsState(key: string) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const value = searchParams.get(key) ?? ""

  const setValue = useCallback(
    (newValue: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (newValue) {
        params.set(key, newValue)
      } else {
        params.delete(key)
      }
      router.replace(`${pathname}?${params.toString()}`)
    },
    [key, searchParams, router, pathname]
  )

  return [value, setValue] as const
}
