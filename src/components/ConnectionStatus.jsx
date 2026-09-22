import { useTheme } from '../context/ThemeContext';

export default function ConnectionStatus({ networkStatus }) {
  const { theme } = useTheme();
  const { online, connectionType } = networkStatus;
  const muted = theme === 'dark' ? 'text-[#71717A]' : 'text-[#A1A1AA]';

  return (
    <div className={`flex items-center gap-3 text-[11px] font-medium ${muted}`}>
      <span className={`flex items-center gap-1.5 ${
        online ? 'text-emerald-500' : 'text-red-500'
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full ${online ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
        {online ? 'Online' : 'Offline'}
      </span>
      {connectionType && connectionType !== 'unknown' && (
        <>
          <span className="text-[#52525B] dark:text-[#3F3F46]">&middot;</span>
          <span className="uppercase tracking-wider">{connectionType}</span>
        </>
      )}
    </div>
  );
}
