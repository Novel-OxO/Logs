interface CalloutProps {
  icon?: string;
  children: React.ReactNode;
}

export function Callout({ icon = '💡', children }: CalloutProps) {
  return (
    <div className="my-4 flex gap-3 rounded-lg border bg-muted/50 p-4">
      <span className="text-xl">{icon}</span>
      <div className="flex-1">{children}</div>
    </div>
  );
}
