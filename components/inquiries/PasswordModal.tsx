import { Button, Input, Modal } from "@ph-mold/ph-ui";
import { Form, Formik, FormikHelpers } from "formik";
import { IPasswordModalFormValues } from "@/types/api/inquiry";
import * as Yup from "yup";

const validationSchema = Yup.object({
  password: Yup.string()
    .min(4, "비밀번호는 4자리여야 합니다.")
    .max(4, "비밀번호는 4자리여야 합니다.")
});

const initFormValues: IPasswordModalFormValues = {
  password: ""
};

interface Props {
  open: boolean;
  onClose: () => void;
  onVerify: (password: string) => Promise<boolean>;
}

export function PasswordModal({ open, onClose, onVerify }: Props) {
  const handleSubmit = async (
    values: IPasswordModalFormValues,
    {
      setSubmitting,
      resetForm,
      setFieldError
    }: FormikHelpers<IPasswordModalFormValues>
  ) => {
    try {
      setSubmitting(true);
      const isValid = await onVerify(values.password);
      if (!isValid) {
        setFieldError("password", "비밀번호가 올바르지 않습니다.");
      } else {
        resetForm();
        onClose();
      }
    } catch {
      setFieldError("password", "비밀번호 확인 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="비밀번호 확인">
      <Formik<IPasswordModalFormValues>
        initialValues={initFormValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnBlur={true}
        validateOnChange={true}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur
        }) => (
          <Form className="space-y-4">
            <Input
              required
              label="비밀번호"
              name="password"
              type="password"
              placeholder="비밀번호 4자리"
              maxLength={4}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(errors.password && touched.password)}
              helperText={
                errors.password && touched.password
                  ? errors.password
                  : undefined
              }
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outlined"
                onClick={onClose}
                type="button"
                disabled={isSubmitting}
              >
                취소
              </Button>
              <Button type="submit" loading={isSubmitting}>
                확인
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
