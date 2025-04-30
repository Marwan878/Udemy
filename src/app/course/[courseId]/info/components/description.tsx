export default function Description({ description }: { description: string }) {
  return (
    <div>
      <h2 className="heading-xl mb-4">Description</h2>
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
}
