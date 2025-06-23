import { InfinitySpin } from 'react-loader-spinner';

export default function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 z-50">
      <InfinitySpin
        width={200}
        height={200}
        color="#4fa94d"
        visible={true}
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
}