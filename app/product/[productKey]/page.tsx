interface Props {
  params: Promise<{ productKey: string }>;
}

export default async function Product({ params }: Props) {
  const { productKey } = await params;
  return (
    <>
      {productKey}
      <div className="h-[2000px]">1</div>
    </>
  );
}
