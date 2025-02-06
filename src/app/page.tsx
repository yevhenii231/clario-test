import { SignInForm } from '@/components/auth/SignInForm';
import Stars from '@/public/icons/stars.svg';
import Image from 'next/image';
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F4F9FF] to-[#E0EDFB] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Image
          src={Stars}
          alt="Stars"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-slate-600">
            Sign up
          </h2>
        </div>
        <SignInForm />
      </div>
    </div>
  );
}
