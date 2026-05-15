"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export function useSearchParamsArrayState<T extends string = string>(
  key: string,
) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const rawValue = searchParams.get(key) ?? "";
  const values: T[] = rawValue ? (rawValue.split(",") as T[]) : [];

  const setValues = useCallback(
    (newValues: T[]) => {
      const params = new URLSearchParams(searchParams.toString());
      if (newValues.length > 0) {
        params.set(key, newValues.join(","));
      } else {
        params.delete(key);
      }
      router.replace(`${pathname}?${params.toString()}`);
    },
    [key, searchParams, router, pathname],
  );

  return [values, setValues] as const;
}
