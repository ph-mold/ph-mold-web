"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

interface TabType {
  label: string;
  value: string;
}

interface UseTabNavigationProps {
  tabs?: TabType[];
  defaultTab?: string;
  queryKey?: string; // query 모드에서 사용되는 쿼리 키
  mode?: "query" | "path" | "state"; // ✅ 동작 방식 선택
  basePath?: string;
  syncParams?: string[]; // query 모드에서 유지할 파라미터 목록
  removeParams?: string[]; // 제거할 파라미터
  onTabChange?: (tab: string) => void;
}

/**
 * 탭 네비게이션 훅 (query, path, state 모드 지원)
 */
export const useTabNavigation = ({
  tabs = [],
  defaultTab = tabs[0]?.value,
  queryKey = "tab",
  mode = "path",
  basePath = "",
  syncParams = [],
  removeParams = [],
  onTabChange
}: UseTabNavigationProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    let currentTab: string;

    if (mode === "query") {
      currentTab = searchParams.get(queryKey) ?? defaultTab;
    } else if (mode === "path") {
      const path = pathname.replace(basePath ?? "", "");
      const currentSegment = path.split("/").filter(Boolean)[0];
      currentTab =
        tabs.find((tab) => tab.value === currentSegment)?.value ?? defaultTab;
    } else {
      // state 모드
      currentTab = activeTab;
    }

    if (currentTab !== activeTab) {
      setActiveTab(currentTab);
      onTabChange?.(currentTab);
    }
  }, [
    searchParams,
    pathname,
    defaultTab,
    queryKey,
    mode,
    activeTab,
    tabs,
    basePath,
    onTabChange
  ]);

  const handleTabClick = useCallback(
    (tab: string) => {
      if (activeTab === tab) return;

      if (mode === "query") {
        const params = new URLSearchParams(searchParams);
        params.set(queryKey, tab);

        removeParams.forEach((key) => {
          params.delete(key);
        });

        syncParams.forEach((key) => {
          const value = searchParams.get(key);
          if (value) params.set(key, value);
        });

        router.push(`?${params.toString()}`);
      } else if (mode === "path") {
        const newPath = `${basePath && basePath + "/"}${tab}`;
        router.push(newPath);
      } else {
        // state 모드
        setActiveTab(tab);
        onTabChange?.(tab);
      }
    },
    [
      activeTab,
      mode,
      searchParams,
      router,
      queryKey,
      syncParams,
      removeParams,
      basePath,
      onTabChange
    ]
  );

  return { activeTab, handleTabClick };
};
