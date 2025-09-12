export default function Loading({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-white font-semibold text-2xl">{title}</p>
    </div>
  );
}
