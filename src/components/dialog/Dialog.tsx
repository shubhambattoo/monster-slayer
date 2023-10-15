import React, { useLayoutEffect, useRef } from 'react';

const Dialog: React.FC<{
  show: boolean;
  text: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}> = ({
  show = false,
  onSuccess,
  onCancel,
  text = 'You lost the game. New game?',
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useLayoutEffect(() => {
    if (show) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [show]);

  return (
    <dialog ref={dialogRef} className="w-[80%] sm:w-[30%]">
      <header className="flex justify-between p-4 ">
        <div className="prose prose-xl">Alert!</div>
        <button>&times;</button>
      </header>
      <div className="p-4">{text}</div>
      <footer className="flex justify-end gap-4 p-4">
        <button
          className="rounded-md bg-[#eee] px-4 py-1.5 text-[16px] font-[500] text-[#333]"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="rounded-md bg-[rgb(4,27,66)] px-4 py-1.5 text-[16px] font-[500] text-white"
          onClick={onSuccess}
        >
          New Game
        </button>
      </footer>
    </dialog>
  );
};

export default Dialog;
