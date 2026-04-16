interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
}

export default function ServiceCard({ number, title, description }: ServiceCardProps) {
  return (
    <div className="border border-violet rounded-xl p-6 hover:border-violet-dark transition-colors">
      <span className="text-xs text-violet font-mono">{number}</span>
      <h3 className="text-lg font-semibold mt-3 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}
