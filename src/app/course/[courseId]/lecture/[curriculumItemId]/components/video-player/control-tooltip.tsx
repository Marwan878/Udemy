export default function ControlTooltip({ text }: { text: string }) {
  return (
    <div className="bg-[#1d1e27] border border-[#d1d2e0] bottom-full -translate-y-4 rounded-md text-white p-1 text-sm hidden group-hover:block absolute">
      {text}
    </div>
  );
}
