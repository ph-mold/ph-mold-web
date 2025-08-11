import { SampleRequest } from "@/components/sample-request";

interface Props {
  params: Promise<{ trackingCode: string }>;
}

export default async function SampleRequestPage({ params }: Props) {
  const { trackingCode } = await params;

  return (
    <div className="mx-auto my-4 w-full max-w-[720px] px-4 md:px-10">
      <SampleRequest trackingCode={trackingCode} />
    </div>
  );
}
