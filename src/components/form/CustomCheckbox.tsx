
export default function CustomCheckbox(props: { [x: string]: any; label: any; }) {
  const { label, ...rest } = props;
  return (
    <div className="relative my-2">
      <input
        type="checkbox"
        {...rest}
        id="custom_checkbox"
        className="appearance-none h-4 w-4 border-2 border-black rounded-md checked:bg-black checked:border-transparent focus:outline-none"
      />
      <label
        htmlFor="custom_checkbox"
        className="ml-2 text-sm text-gray-900"
      >
        {label}
      </label>
    </div>
  );
}
