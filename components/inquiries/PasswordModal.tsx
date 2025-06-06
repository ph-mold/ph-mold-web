import { useEffect, useState } from "react";
import { Button, Input, Modal } from "@ph-mold/ph-ui";

interface PasswordModalProps {
  open: boolean;
  onClose: () => void;
  onVerify: (password: string) => boolean;
}

export function PasswordModal({ open, onClose, onVerify }: PasswordModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (open) {
      setPassword("");
      setError(false);
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = onVerify(password);
    if (!isValid) {
      setError(true);
    }
  };

  const handleClose = () => {
    setPassword("");
    setError(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="비밀번호 확인">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          placeholder="비밀번호를 입력해주세요"
          error={error}
          helperText={error ? "비밀번호가 일치하지 않습니다" : undefined}
          maxLength={4}
          required
        />
        <div className="flex justify-end gap-2">
          <Button variant="outlined" onClick={handleClose} type="button">
            취소
          </Button>
          <Button type="submit">확인</Button>
        </div>
      </form>
    </Modal>
  );
}
