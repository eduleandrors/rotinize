export default function Overlay({ onClose, children }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="w-[90%] md:w-[50%] xl:w-[30%]" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
