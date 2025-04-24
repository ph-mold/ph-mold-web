import { useForm, Controller } from "react-hook-form";
import Modal from "../common/Modal";
import Input from "../common/Input";
import { IGetProductSummary } from "@/types/api/product";
import AddressSearchButton from "../common/AddressSearchButton";
import { Button } from "@ph-mold/ph-ui";
import {
  formatPhoneNumber,
  validateEmail,
  validatePhoneNumber
} from "@/lib/validators/input";

interface Props {
  info: IGetProductSummary;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

interface FormValues {
  productKey: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  detailAddress: string;
  quantity: string;
  agree: boolean;
}

export default function RequestSampleModal({ info, open, setOpen }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      productKey: info.key,
      name: "",
      company: "",
      email: "",
      phone: "",
      address: "",
      detailAddress: "",
      quantity: "",
      agree: false
    },
    mode: "onChange"
  });

  const onSubmit = (data: FormValues) => {
    console.log("제출된 샘플 요청 정보:", data);
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      open={open}
      title={
        <div>
          <span className="text-signature">{info.name}</span> 제품 샘플 요청
        </div>
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-fit flex-col gap-5"
      >
        <Input label="제품명" readOnly value={info.name} />
        <Input
          required
          label="샘플 수량"
          type="number"
          placeholder="예) 10"
          {...register("quantity", {
            required: "샘플 수량을 입력해주세요.",
            validate: (v) =>
              parseInt(v) > 0 || "1개 이상의 수량을 입력해주세요."
          })}
          error={!!errors.quantity}
          helperText={errors.quantity?.message}
        />
        <Input
          required
          label="이름"
          placeholder="예) 홍길동"
          {...register("name", { required: "이름을 입력해주세요." })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <Input
          required
          label="회사명"
          placeholder="예) (주) 팜앤몰드"
          {...register("company", { required: "회사명을 입력해주세요." })}
          error={!!errors.company}
          helperText={errors.company?.message}
        />

        <Input
          required
          label="이메일"
          placeholder="예) ph-mold@hanmail.com"
          {...register("email", {
            required: "이메일을 입력해주세요.",
            validate: (v) => validateEmail(v) || "유효한 이메일을 입력해주세요."
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <Controller
          name="phone"
          control={control}
          rules={{
            validate: (value) =>
              validatePhoneNumber(value) || "유효한 전화번호를 입력해주세요."
          }}
          render={({ field }) => (
            <Input
              required
              label="전화번호"
              placeholder="예) 010-1234-5147"
              value={field.value}
              onChange={(e) => {
                const formatted = formatPhoneNumber(e.target.value);
                field.onChange(formatted); // RHF 등록된 onChange 호출
              }}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          )}
        />

        <div className="flex gap-2">
          <Controller
            name="address"
            control={control}
            rules={{
              validate: (value) => !!value || "주소를 입력해주세요."
            }}
            render={({ field }) => (
              <>
                <Input
                  required
                  label="주소"
                  readOnly
                  placeholder="주소 검색 '클릭'"
                  className="min-w-0 flex-1"
                  value={field.value}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
                <div className="shrink-0 pt-6">
                  <AddressSearchButton onAddressSelect={field.onChange} />
                </div>
              </>
            )}
          />
        </div>

        <Input
          label="상세 주소"
          placeholder="건물, 층수 등"
          {...register("detailAddress")}
          error={!!errors.detailAddress}
          helperText={errors.detailAddress?.message}
        />
        <div>
          <label className="flex cursor-pointer items-start space-x-2 select-none">
            <input
              type="checkbox"
              {...register("agree", { required: true })}
              className="mt-1"
            />
            <span className="text-foreground text-sm font-medium">
              개인정보 수집 및 이용에 동의합니다.
            </span>
          </label>
          {errors.agree && (
            <p className="text-error ml-1 text-sm">
              개인정보 수집 및 이용에 동의해주세요.
            </p>
          )}
        </div>

        <Button fullWidth type="submit">
          요청
        </Button>

        <div>
          <p className="text-foreground2 mt-2 text-sm">
            당사는 귀하의 샘플 요청 및 문의사항에 대응하기 위해 아래와 같이
            개인정보를 수집·이용합니다. 귀하는 동의를 거부할 권리가 있으며,
            동의하지 않을 경우 샘플 제공 또는 문의 응답이 제한될 수 있습니다.
          </p>
          <ul className="text-foreground2 mt-1 list-inside list-disc space-y-0.5 text-sm">
            <li>수집 항목: 이름, 전화번호, 이메일, 회사명, 주소</li>
            <li>수집 목적: 샘플 발송, 문의 응답 및 관련 정보 제공</li>
            <li>
              보유 기간: 귀하가 정보 수신 동의를 철회할 때까지 수집된 개인정보를
              보유 및 이용
            </li>
          </ul>
        </div>
      </form>
    </Modal>
  );
}
