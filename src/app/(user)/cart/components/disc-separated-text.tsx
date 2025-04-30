export default function DiscSeperatedText({
  sentences,
  style,
}: {
  sentences: string[] | undefined;
  style?: React.CSSProperties;
}) {
  if (!sentences || sentences.length === 0) return null;
  return (
    <div
      style={style}
      className="flex items-center gap-[0.4rem] mt-[0.8rem] text-[#595c73] text-xs"
    >
      {sentences.map((sentence, i) => (
        <>
          {i >= 1 && <div className="w-2 h-2 rounded-full bg-[#595c73]" />}
          <p>{sentence}</p>
        </>
      ))}
    </div>
  );
}
