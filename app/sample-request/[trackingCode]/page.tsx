import { SampleRequest } from "@/components/sample-request";

interface Props {
  params: Promise<{ trackingCode: string }>;
}

export default async function SampleRequestPage({ params }: Props) {
  const { trackingCode } = await params;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 md:px-10">
      <h1>Sample Request</h1>
      <SampleRequest trackingCode={trackingCode} />
    </div>
  );
}
