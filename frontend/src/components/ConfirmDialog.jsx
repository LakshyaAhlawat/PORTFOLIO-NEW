import React from 'react';
import { Button } from '../atoms/Button.jsx';

const ConfirmDialog = ({ open, title, message, onConfirm, onCancel, confirmLabel = 'Delete', cancelLabel = 'Cancel' }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative z-10 max-w-lg w-full rounded-xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-white/6 p-6 shadow-2xl">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-3 text-sm text-gray-200">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={onCancel}>{cancelLabel}</Button>
          <Button onClick={onConfirm} className="bg-red-600 hover:bg-red-500">{confirmLabel}</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
