'use client';

import React, { ReactNode } from 'react';
import ButtonDefault from '../buttonDefault';

type ConfirmDialogProps = {
  open: boolean;
  title?: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  children?: ReactNode;
};

const DialogDefault: React.FC<ConfirmDialogProps> = ({
  open,
  title = 'Confirmação',
  message,
  onConfirm,
  onCancel,
  children,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        {children ? (
          children
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            <p className="mb-6">{message}</p>
          </>
        )}
            <div className="flex justify-end space-x-4">
             {onCancel && <ButtonDefault
                onClick={onCancel}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancelar
              </ButtonDefault>}
              {onConfirm && <ButtonDefault
                onClick={onConfirm}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Confirmar
              </ButtonDefault>}
            </div>
      </div>
    </div>
  );
};

export default DialogDefault;
