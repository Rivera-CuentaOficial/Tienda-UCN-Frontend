"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useUrlSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(key, value);
        if (key === "searchTerm" || key === "pageSize") {
          params.set("pageNumber", "1");
        }
      } else {
        params.delete(key);
      }

      router.push(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  const getSearchParam = (key: string, defaultValue = "") => {
    return searchParams.get(key) || defaultValue;
  };

  return { updateSearchParam, getSearchParam };
}
