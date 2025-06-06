import { useState } from "react";
import { Button, Input, TextArea } from "@ph-mold/ph-ui";
import AddressSearchButton from "../common/AddressSearchButton";
import {
  formatPhoneNumber,
  validateEmail,
  validatePhoneNumber
} from "@/lib/validators/input";
import { IInquiryFormValues } from "@/types/api/inquiry";

interface FormErrors {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  address?: string;
  password?: string;
  agree?: string;
}

export default function InquiryForm() {
  const [formValues, setFormValues] = useState<IInquiryFormValues>({
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    detailedAddress: "",
    agree: false,
    remarks: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
    // Clear error when user types
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormValues((prev) => ({ ...prev, phone: formatted }));
    setFormErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const handleAddressSelect = (address: string) => {
    setFormValues((prev) => ({ ...prev, address }));
    setFormErrors((prev) => ({ ...prev, address: undefined }));
  };

  const validateForm = () => {
    const errors: FormErrors = {};

    if (!formValues.name) errors.name = "이름을 입력해주세요.";
    if (!formValues.company) errors.company = "회사명을 입력해주세요.";
    if (!formValues.email || !validateEmail(formValues.email))
      errors.email = "유효한 이메일을 입력해주세요.";
    if (!formValues.phone || !validatePhoneNumber(formValues.phone))
      errors.phone = "유효한 전화번호를 입력해주세요.";
    if (!formValues.address) errors.address = "주소를 입력해주세요.";
    if (!formValues.password) errors.password = "비밀번호를 입력해주세요.";
    if (!formValues.agree)
      errors.agree = "개인정보 수집 및 이용에 동의해주세요.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: 문의하기 API 연동
      console.log(formValues);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          required
          label="이름"
          name="name"
          placeholder="예) 홍길동"
          value={formValues.name}
          onChange={handleFormChange}
          error={!!formErrors.name}
          helperText={formErrors.name}
        />
        <Input
          required
          label="회사명"
          name="company"
          placeholder="예) (주) 팜앤몰드"
          value={formValues.company}
          onChange={handleFormChange}
          error={!!formErrors.company}
          helperText={formErrors.company}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          required
          label="이메일"
          name="email"
          type="email"
          placeholder="예) ph-mold@hanmail.com"
          value={formValues.email}
          onChange={handleFormChange}
          error={!!formErrors.email}
          helperText={formErrors.email}
        />
        <Input
          required
          label="전화번호"
          name="phone"
          placeholder="예) 010-1234-5678"
          value={formValues.phone}
          onChange={handlePhoneChange}
          error={!!formErrors.phone}
          helperText={formErrors.phone}
        />
      </div>
      <div className="flex gap-2">
        <Input
          required
          label="주소"
          name="address"
          placeholder="주소 검색 '클릭'"
          className="min-w-0 flex-1"
          value={formValues.address}
          onChange={handleFormChange}
          error={!!formErrors.address}
          helperText={formErrors.address}
          readOnly
        />
        <div className="shrink-0 pt-6">
          <AddressSearchButton onAddressSelect={handleAddressSelect} />
        </div>
      </div>
      <Input
        label="상세 주소"
        name="detailedAddress"
        placeholder="건물, 층수 등"
        value={formValues.detailedAddress}
        onChange={handleFormChange}
      />
      <TextArea
        label="문의 내용"
        name="remarks"
        placeholder="문의하실 내용을 입력해주세요."
        value={formValues.remarks}
        onChange={handleFormChange}
        rows={5}
        maxLength={300}
      />
      <Input
        required
        label="비밀번호"
        name="password"
        type="password"
        placeholder="비밀번호 4자리"
        maxLength={4}
        value={formValues.password}
        onChange={handleFormChange}
        error={!!formErrors.password}
        helperText={formErrors.password}
      />
      <div>
        <label className="flex cursor-pointer items-start space-x-2 select-none">
          <input
            type="checkbox"
            name="agree"
            checked={formValues.agree}
            onChange={handleFormChange}
            className="mt-1"
          />
          <span className="text-foreground text-sm font-medium">
            개인정보 수집 및 이용에 동의합니다.
          </span>
        </label>
        {formErrors.agree && (
          <p className="text-error ml-1 text-sm">{formErrors.agree}</p>
        )}
      </div>
      <Button fullWidth type="submit">
        문의하기
      </Button>
      <div>
        <p className="text-foreground2 mt-2 text-sm">
          당사는 귀하의 샘플 요청 및 문의사항에 대응하기 위해 아래와 같이
          개인정보를 수집·이용합니다. 귀하는 동의를 거부할 권리가 있으며,
          동의하지 않을 경우 샘플 제공 또는 문의 응답이 제한될 수 있습니다.
        </p>
        <ul className="text-foreground2 mt-1 list-inside list-disc space-y-0.5 text-sm">
          <li>수집 항목: 이름, 전화번호, 이메일, 회사명, 주소</li>
          <li>수집 목적: 문의, 문의 응답 및 관련 정보 제공</li>
          <li>
            보유 기간: 귀하가 정보 수신 동의를 철회할 때까지 수집된 개인정보를
            보유 및 이용
          </li>
        </ul>
      </div>
    </form>
  );
}
