interface CardProps {
  title: string;
  description: string;
  tag?: string;
}

export default function Card({ title, description, tag }: CardProps) {
  return (
    <div className="rounded-lg border border-light bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {tag && (
        <span className="mb-3 inline-block rounded-full bg-sor-orange/10 px-3 py-1 text-xs font-semibold text-sor-orange">
          {tag}
        </span>
      )}
      <h3 className="mb-2 text-lg font-bold text-fachschule-teal">{title}</h3>
      <p className="text-sm leading-relaxed text-dark/70">{description}</p>
    </div>
  );
}
