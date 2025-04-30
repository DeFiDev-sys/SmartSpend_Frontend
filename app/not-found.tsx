import Image from "next/image";
import Link from "next/link";
import Not_Found from "../public/Images/page-not-found.png";

export default function NotFound() {
  return (
    <div className='w-full min-h-dvh flex flex-col gap-2 items-center justify-center'>
      <Image src={Not_Found} alt='404 Image' className='object-cover' width={300} height={300} />
      <div className='flex flex-col items-center gap-4'>
        <h2>Page Not Found</h2>
        <Link href='/'>Return Home</Link>
      </div>
    </div>
  );
}
