interface Props {
  buttonText: string;
  isDisabled?: boolean;
}

const SettingsBtnAppearance = ({ buttonText, isDisabled = false }: Props) => {
  return (
    <div
      className={`flex justify-center items-center text-center w-full bg-neutral-700 text-neutral-400 text-shadow-[0_0_10px_rgb(0_0_0)] ${!isDisabled && 'hover:invert'} ${isDisabled && 'brightness-50'}`}
    >
      <div className='flex justify-center items-center text-xl tracking-widest py-0.5 pr-2 pl-3'>
        {buttonText}
      </div>
    </div>
  );
};

export default SettingsBtnAppearance;
