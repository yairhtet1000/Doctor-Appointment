interface Prop {
  message?: string;
}

export const FormSuccess = ({ message }: Prop) => {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 p-3 rounded flex items-center gap-x-2 text-sm text-emerald-500">
      <p>{message}</p>
    </div>
  );
};
