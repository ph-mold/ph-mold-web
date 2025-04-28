import { ReactNode } from "react";
import { Button, Modal } from "@ph-mold/ph-ui";

interface AlertModalProps {
  open: boolean;
  onClose: () => void;
  onAccept?: () => void;
  onCancel?: () => void;
  title?: ReactNode;
  description: ReactNode;
  acceptLabel?: string;
  cancelLabel?: string;
  showCancelButton?: boolean;
  loading?: boolean;
}

export default function AlertModal({
  open,
  onClose,
  onAccept,
  onCancel,
  title,
  description,
  acceptLabel = "확인",
  cancelLabel = "취소",
  showCancelButton = true,
  loading = false
}: AlertModalProps) {
  const handleAccept = () => {
    onAccept?.();
    onClose();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col gap-6 text-center">
        {/* 타이틀 */}
        {title && (
          <h2 className="text-foreground text-lg font-bold">{title}</h2>
        )}

        {/* 설명 */}
        <div className="text-foreground2 text-sm">{description}</div>

        {/* 버튼 그룹 */}
        <div className="flex flex-col gap-2 md:flex-row md:justify-center">
          {showCancelButton && (
            <Button
              type="button"
              variant="text"
              color="secondary"
              size="small"
              onClick={handleCancel}
              fullWidth
            >
              {cancelLabel}
            </Button>
          )}
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={handleAccept}
            fullWidth
            loading={loading}
            size="small"
          >
            {acceptLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
