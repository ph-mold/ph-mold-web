"use client";

import ProductGrid from "./ProductGrid";

interface Props {
  currentTab: string;
  currentSubTab: string;
}

export default function ProductListSection({
  currentTab,
  currentSubTab
}: Props) {
  const categoryKey = currentSubTab === "all" ? currentTab : currentSubTab;

  return (
    <div className="my-4">
      <ProductGrid categoryKey={categoryKey} />
    </div>
  );
}
