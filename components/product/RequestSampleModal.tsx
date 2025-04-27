import { useForm, Controller } from "react-hook-form";
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
import { Button, Input, Modal, TextArea } from "@ph-mold/ph-ui";

interface Props {
  info: IGetProductSummary;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

export default function RequestSampleModal({ info, open, setOpen }: Props) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<IRequestSampleFormValues>({
    defaultValues: {
      productId: info.id,
      name: "",
      company: "",
      email: "",
      phone: "",
      address: "",
      detailedAddress: "",
      quantity: "",
      remarks: "",
      agree: false
    },
    mode: "onChange"
  });

  const onSubmit = async (data: IRequestSampleFormValues) => {
    try {
      await createSampleRequest(data);
      alert("샘플 요청이 성공적으로 접수되었습니다.");
      reset();
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert("요청 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
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
          {...register("detailedAddress")}
          error={!!errors.detailedAddress}
          helperText={errors.detailedAddress?.message}
        />

        <Controller
          name="remarks"
          control={control}
          defaultValue=""
          rules={{
            maxLength: {
              value: 300,
              message: `최대 300자까지 입력할 수 있습니다.`
            }
          }}
          render={({ field }) => (
            <TextArea
              {...field}
              rows={5}
              label="비고"
              placeholder="요청사항을 입력해주세요."
              error={!!errors.remarks}
              helperText={errors.remarks?.message}
              maxLength={300}
            />
          )}
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
