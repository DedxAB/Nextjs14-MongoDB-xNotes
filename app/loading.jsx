import { LoadingIcon } from './assets/svgs/GeneralIcons';

export default function Loading() {
  return (
    <div className="h-[85vh] w-full flex justify-center items-center">
      <LoadingIcon className="w-[13.5rem] h-[7.5rem]" />
    </div>
  );
}
