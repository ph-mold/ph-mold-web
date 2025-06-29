import { Button, Input, TextArea } from "@ph-mold/ph-ui";
import AddressSearchButton from "../common/AddressSearchButton";
import {
  formatPhoneNumber,
  validateEmail,
  validatePhoneNumber
} from "@/lib/validators/input";
import { IInquiryFormValues } from "@/types/api/inquiry";
import { createInquiry, GET_INQUIRIES } from "@/lib/api/inquiry";
import { mutate } from "swr";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("이름을 입력해주세요."),
  company: Yup.string().required("회사명을 입력해주세요."),
  email: Yup.string()
    .test("email", "유효한 이메일을 입력해주세요.", (value) => {
      return value ? validateEmail(value) : false;
    })
    .required("이메일을 입력해주세요."),
  phone: Yup.string()
    .test("phone", "유효한 전화번호를 입력해주세요.", (value) => {
      return value ? validatePhoneNumber(value) : false;
    })
    .required("전화번호를 입력해주세요."),
  address: Yup.string().required("주소를 입력해주세요."),
  password: Yup.string()
    .min(4, "비밀번호는 4자리여야 합니다.")
    .max(4, "비밀번호는 4자리여야 합니다.")
    .required("비밀번호를 입력해주세요."),
  agree: Yup.boolean()
    .oneOf([true], "개인정보 수집 및 이용에 동의해주세요.")
    .required("개인정보 수집 및 이용에 동의해주세요.")
});

const initialFormValues: IInquiryFormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  address: "",
  detailedAddress: "",
  remarks: "",
  password: "",
  agree: false
};

interface Props {
  onClose: () => void;
}

export default function InquiryForm({ onClose }: Props) {
  const handleSubmit = async (
    values: IInquiryFormValues,
    {
      setSubmitting,
      setFieldError,
      resetForm
    }: FormikHelpers<IInquiryFormValues>
  ) => {
    try {
      setSubmitting(true);
      await createInquiry(values);

      await mutate((key) => Array.isArray(key) && key[0] === GET_INQUIRIES);
      resetForm();
      onClose();
    } catch (error) {
      console.error("문의 등록 실패:", error);
      setFieldError(
        "password",
        "문의 등록에 실패했습니다. 잠시 후 다시 시도해주세요."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik<IInquiryFormValues>
      initialValues={initialFormValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values, errors, touched, isSubmitting }) => (
        <Form className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              required
              label="이름"
              name="name"
              placeholder="예) 홍길동"
              value={values.name}
              onChange={(e) => setFieldValue("name", e.target.value)}
              error={!!(errors.name && touched.name)}
              helperText={errors.name && touched.name ? errors.name : undefined}
            />
            <Input
              required
              label="회사명"
              name="company"
              placeholder="예) (주) 팜앤몰드"
              value={values.company}
              onChange={(e) => setFieldValue("company", e.target.value)}
              error={!!(errors.company && touched.company)}
              helperText={
                errors.company && touched.company ? errors.company : undefined
              }
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              required
              label="이메일"
              name="email"
              type="email"
              placeholder="예) ph-mold@hanmail.com"
              value={values.email}
              onChange={(e) => setFieldValue("email", e.target.value)}
              error={!!(errors.email && touched.email)}
              helperText={
                errors.email && touched.email ? errors.email : undefined
              }
            />
            <Input
              required
              label="전화번호"
              name="phone"
              placeholder="예) 010-1234-5678"
              value={values.phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const formatted = formatPhoneNumber(e.target.value);
                setFieldValue("phone", formatted);
              }}
              error={!!(errors.phone && touched.phone)}
              helperText={
                errors.phone && touched.phone ? errors.phone : undefined
              }
            />
          </div>
          <div className="flex gap-2">
            <Input
              required
              label="주소"
              name="address"
              placeholder="주소 검색 '클릭'"
              className="min-w-0 flex-1"
              value={values.address}
              error={!!(errors.address && touched.address)}
              helperText={
                errors.address && touched.address ? errors.address : undefined
              }
              readOnly
            />
            <div className="shrink-0 pt-6">
              <AddressSearchButton
                onAddressSelect={(address: string) => {
                  setFieldValue("address", address);
                }}
              />
            </div>
          </div>
          <Input
            label="상세 주소"
            name="detailedAddress"
            placeholder="건물, 층수 등"
            value={values.detailedAddress}
            onChange={(e) => setFieldValue("detailedAddress", e.target.value)}
          />
          <TextArea
            label="문의 내용"
            name="remarks"
            placeholder="문의하실 내용을 입력해주세요."
            value={values.remarks}
            onChange={(e) => setFieldValue("remarks", e.target.value)}
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
            value={values.password}
            onChange={(e) => setFieldValue("password", e.target.value)}
            error={!!(errors.password && touched.password)}
            helperText={
              errors.password && touched.password ? errors.password : undefined
            }
          />
          <div>
            <label className="flex cursor-pointer items-start space-x-2 select-none">
              <input
                type="checkbox"
                name="agree"
                checked={values.agree}
                onChange={(e) => setFieldValue("agree", e.target.checked)}
                className="mt-1"
              />
              <span className="text-foreground text-sm font-medium">
                개인정보 수집 및 이용에 동의합니다.
              </span>
            </label>
            {errors.agree && touched.agree && (
              <p className="text-error ml-1 text-sm">{errors.agree}</p>
            )}
          </div>
          <Button fullWidth type="submit" disabled={isSubmitting}>
            {isSubmitting ? "처리중..." : "문의하기"}
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
                보유 기간: 귀하가 정보 수신 동의를 철회할 때까지 수집된
                개인정보를 보유 및 이용
              </li>
            </ul>
          </div>
        </Form>
      )}
    </Formik>
  );
}
