export default function CustomInput(props) {
  const { label, ...rest } = props;
  return (
    <div className="relative my-2">
    <input
        {...rest}
      id="floating_outlined"
      className="block border-2 border-black shadow px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg appearance-none dark:border-gray-600 focus:outline-none focus:ring-0 peer"
      placeholder=" "
    />
    <label
      htmlFor="floating_outlined"
      className="absolute bg-gray-100 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
    >
      {label}
    </label>
  </div>
  );
}