type Props = {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
};

export default function Notification({ message, type = 'info' }: Props) {
  const colors = {
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
    info: 'bg-blue-100 border-blue-500 text-blue-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
  };

  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️',
  };

  return (
    <div
      className={`flex items-center gap-2 border-l-4 p-4 rounded shadow-md animate-slide-in ${colors[type]}`}
    >
      <span className="text-lg">{icons[type]}</span>
      <span>{message}</span>
    </div>
  );
}
