import {
  IGetProductSummary,
  IRequestSampleFormValues
} from "@/types/api/product";
import AddressSearchButton from "../common/AddressSearchButton";
import {
  formatPhoneNumber,
  validateEmail,
  validatePhoneNumber
} from "@/lib/validators/input";
import { createSampleRequest } from "@/lib/api/products";
import { Alert, Button, Input, Modal, TextArea } from "@ph-mold/ph-ui";
import { useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  quantity: Yup.number()
    .min(1, "1개 이상의 수량을 입력해주세요.")
    .required("수령을 입력해주세요."),
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
  agree: Yup.boolean()
    .oneOf([true], "개인정보 수집 및 이용에 동의해주세요.")
    .required("개인정보 수집 및 이용에 동의해주세요.")
});

const initFromValues: IRequestSampleFormValues = {
  productId: 0,
  quantity: "",
  name: "",
  company: "",
  email: "",
  phone: "",
  address: "",
  detailedAddress: "",
  remarks: "",
  agree: false
};

interface Props {
  info: IGetProductSummary;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

export default function RequestSampleModal({ info, open, setOpen }: Props) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleSubmit = async (
    values: IRequestSampleFormValues,
    {
      setSubmitting,
      resetForm,
      setFieldError
    }: FormikHelpers<IRequestSampleFormValues>
  ) => {
    try {
      await createSampleRequest({ ...values, productId: info.id });
      resetForm();
      setOpen(false);
    } catch (error) {
      console.error(error);
      setFieldError(
        "password",
        "문의 등록에 실패했습니다. 잠시 후 다시 시도해주세요."
      );
    } finally {
      setIsConfirmOpen(false);
      setSubmitting(false);
    }
  };

  return (
    <>
      <Modal
        onClose={() => setOpen(false)}
        open={open}
        title={
          <div>
            <span className="text-signature">{info.name}</span> 제품 샘플 요청
          </div>
        }
      >
        <Formik<IRequestSampleFormValues>
          initialValues={initFromValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          validateOnMount={false}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            setFieldValue,
            handleChange,
            handleBlur,
            setTouched,
            submitForm,
            validateForm
          }) => (
            <>
              <Alert
                description="샘플 요청을 보내시겠습니까?"
                open={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                acceptLabel="샘플 요청"
                cancelLabel="취소"
                onAccept={() => submitForm()}
                loading={isSubmitting}
              />
              <Form className="flex flex-col gap-5">
                <Input label="제품명" readOnly value={info.name} />

                <Input
                  required
                  label="샘플 수량"
                  type="number"
                  placeholder="예) 10"
                  name="quantity"
                  value={values.quantity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(errors.quantity && touched.quantity)}
                  helperText={
                    errors.quantity && touched.quantity
                      ? errors.quantity
                      : undefined
                  }
                />
                <Input
                  required
                  label="이름"
                  name="name"
                  placeholder="예) 홍길동"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(errors.name && touched.name)}
                  helperText={
                    errors.name && touched.name ? errors.name : undefined
                  }
                />
                <Input
                  required
                  label="회사명"
                  placeholder="예) (주) 팜앤몰드"
                  name="company"
                  value={values.company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(errors.company && touched.company)}
                  helperText={
                    errors.company && touched.company
                      ? errors.company
                      : undefined
                  }
                />
                <Input
                  required
                  label="이메일"
                  placeholder="예) ph-mold@hanmail.com"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  onBlur={handleBlur}
                  error={!!(errors.phone && touched.phone)}
                  helperText={
                    errors.phone && touched.phone ? errors.phone : undefined
                  }
                />
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
                      errors.address && touched.address
                        ? errors.address
                        : undefined
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
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextArea
                  label="비고"
                  name="remarks"
                  placeholder="문의하실 내용을 입력해주세요."
                  value={values.remarks}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={5}
                  maxLength={300}
                />
                <div>
                  <label className="flex cursor-pointer items-start space-x-2 select-none">
                    <input
                      type="checkbox"
                      name="agree"
                      checked={values.agree}
                      onChange={handleChange}
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
                <Button
                  fullWidth
                  type="button"
                  loading={isSubmitting}
                  onClick={async () => {
                    setTouched({
                      name: true,
                      company: true,
                      email: true,
                      phone: true,
                      address: true,
                      quantity: true,
                      agree: true
                    });

                    // 유효성 검사 수행
                    const validationErrors = await validateForm();

                    // 오류가 없을 때만 확인 팝업 열기
                    if (Object.keys(validationErrors).length === 0) {
                      setIsConfirmOpen(true);
                    }
                  }}
                >
                  {isSubmitting ? "처리중..." : "문의하기"}
                </Button>
                <div>
                  <p className="text-foreground2 mt-2 text-sm">
                    당사는 귀하의 샘플 요청 및 문의사항에 대응하기 위해 아래와
                    같이 개인정보를 수집·이용합니다. 귀하는 동의를 거부할 권리가
                    있으며, 동의하지 않을 경우 샘플 제공 또는 문의 응답이 제한될
                    수 있습니다.
                  </p>
                  <ul className="text-foreground2 mt-1 list-inside list-disc space-y-0.5 text-sm">
                    <li>수집 항목: 이름, 전화번호, 이메일, 회사명, 주소</li>
                    <li>수집 목적: 샘플 발송, 문의 응답 및 관련 정보 제공</li>
                    <li>
                      보유 기간: 귀하가 정보 수신 동의를 철회할 때까지 수집된
                      개인정보를 보유 및 이용
                    </li>
                  </ul>
                </div>
              </Form>
            </>
          )}
        </Formik>
      </Modal>
    </>
  );
}
