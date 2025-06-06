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

interface Props {
  onAddressSelect: (address: string) => void;
}

export default function AddressSearchButton({ onAddressSelect }: Props) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleClick = () => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        const fullAddr = data.roadAddress || data.jibunAddress;
        onAddressSelect(fullAddr);
      }
    }).open();
  };

  return (
    <Button variant="outlined" size="small" onClick={handleClick}>
      주소 검색
    </Button>
  );
}
