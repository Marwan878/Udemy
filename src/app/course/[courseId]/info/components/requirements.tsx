export default function Requirements({
  requirements,
}: {
  requirements: string[];
}) {
  return (
    <div>
      <h2 className="heading-xl mb-4">Requirements</h2>
      <ul className="list-disc py-1">
        {requirements.map((requirement) => (
          <li key={requirement} className="min-h-4 ms-4">
            {requirement}
          </li>
        ))}
      </ul>
    </div>
  );
}
