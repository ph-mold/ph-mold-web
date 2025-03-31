import Image from "next/image";
import Tab from "../common/Tab";

export default function ProductSubCategorySection() {
  return (
    <div className="border-background2 scrollbar-hide w-full overflow-x-scroll overflow-y-hidden border-b-2">
      <Tab
        className="py-2"
        showIndicator={false}
        tabClassName="flex-col !text-sm !p-0"
        activeTabClassName="!font-medium !text-foreground2"
        tabs={[
          {
            label: "PP 주사기",
            value: "s",
            icon: (
              <div className="size-24 flex-none sm:size-32">
                <Image src={"/sample1.png"} alt={""} width={240} height={240} />
              </div>
            )
          },
          {
            label: "PP 주사기",
            value: "s1",
            icon: (
              <div className="size-24 flex-none sm:size-32">
                <Image src={"/sample1.png"} alt={""} width={240} height={240} />
              </div>
            )
          },
          {
            label: "PP 주사기",
            value: "s2",
            icon: (
              <div className="size-24 flex-none sm:size-32">
                <Image src={"/sample1.png"} alt={""} width={240} height={240} />
              </div>
            )
          }
        ]}
      />
    </div>
  );
}
