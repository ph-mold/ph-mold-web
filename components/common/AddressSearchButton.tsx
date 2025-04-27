import { Button } from "@ph-mold/ph-ui";
import { useEffect } from "react";

interface DaumPostcodeData {
  roadAddress: string;
  jibunAddress: string;
}

declare global {
  interface Window {
    daum: {
      Postcode: new (options: {
        oncomplete: (data: DaumPostcodeData) => void;
      }) => { open: () => void };
    };
  }
}

const AddressSearchButton = ({
  onAddressSelect
}: {
  onAddressSelect: (addr: string) => void;
}) => {
  const handleSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        const fullAddr = data.roadAddress || data.jibunAddress;
        onAddressSelect(fullAddr);
      }
    }).open();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <Button
      type="button"
      variant="outlined"
      onClick={handleSearch}
      className="text-nowrap"
    >
      주소 검색
    </Button>
  );
};

export default AddressSearchButton;
