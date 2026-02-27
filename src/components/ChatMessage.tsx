interface ChatMessageProps {
  content: string;
  displayName: string;
  createdAt: string;
  isOwn: boolean;
}

export default function ChatMessage({
  content,
  displayName,
  createdAt,
  isOwn,
}: ChatMessageProps) {
  const time = new Date(createdAt).toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] rounded-xl px-4 py-2 ${
          isOwn
            ? "bg-fachschule-teal text-white"
            : "bg-white text-dark border border-light"
        }`}
      >
        {!isOwn && (
          <p className="mb-0.5 text-xs font-semibold text-sor-orange">
            {displayName}
          </p>
        )}
        <p className="text-sm whitespace-pre-wrap">{content}</p>
        <p
          className={`mt-1 text-[10px] ${
            isOwn ? "text-white/60" : "text-dark/40"
          }`}
        >
          {time}
        </p>
      </div>
    </div>
  );
}
