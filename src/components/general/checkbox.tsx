export default function Checkbox({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  disabled: boolean;
}) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className="accent-udemy-purple cursor-pointer h-[1.6rem] w-[1.6rem]"
    />
  );
}
