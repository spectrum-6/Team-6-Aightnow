export default function User({ content }: { content: string }) {
  return (
    <div className="flex justify-end mb-4">
      <div className="p-2 bg-grayscale-100 rounded-lg max-w-xs">
        <p className="text-right text-sm">{content}</p>
      </div>
    </div>
  );
}
