import React from "react";
import BrandLogo from "./BrandLogo";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/ReactHook";
import { setLoading, setUserLogout } from "@/redux/slice/UserSlice";
import { useRouter } from "next/navigation";
import { deleteAuthToken } from "@/servers/server";
import { toast } from "sonner";

const headerLinks = [
  { name: "Features", path: "#features" },
  { name: "Pricing", path: "#pricing" },
  { name: "Testimonial", path: "/testimonial" },
  { name: "FAQ", path: "/faq" },
];

const Header = () => {
  const { userData, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logOutFunc = async () => {
    dispatch(setLoading(true));
    try {
      await deleteAuthToken();
      dispatch(setUserLogout());
      router.push("/");
      toast.success("Logged out");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Failed to Log out");
    }
  };
  return (
    <header className='min-w-full min-h-16 border-b flex justify-between items-center px-4'>
      <div className='flex justify-between gap-1.5 lg:gap-4 items-center'>
        <BrandLogo />
        <h1 className='lg:text-xl font-bold'>SmartSpend</h1>
      </div>
      <div className='hidden xl:flex gap-8'>
        {headerLinks.map((link) => (
          <a href={link.path} key={link.name} className='group relative py-1 font-medium text-xs'>
            {link.name}
            {/* Animated underline */}
            <span className='absolute left-0 bottom-0 h-0.5 w-0 btnbg dark:bg-white transition-all duration-300 group-hover:w-full'></span>
          </a>
        ))}
      </div>
      {userData === null ? (
        <div className='flex gap-4'>
          <a href='/login'>
            <Button variant={"outline"} className='font-medium text-xs'>
              Login
            </Button>
          </a>

          <a href='/register'>
            <Button className='btnbg font-medium text-xs'>Sign Up</Button>
          </a>
        </div>
      ) : (
        <div className='flex gap-5'>
          {userData.admin === false && (
            <div className='flex items-center justify-center h-10 w-10 rounded-full bg-[#0F172A] text-white font-bold'>
              {`${userData.firstname[0]}${userData.lastname[0]}`.toUpperCase()}
            </div>
          )}
          <Button variant={"outline"} className='font-medium text-xs' onClick={logOutFunc} disabled={loading}>
            {loading ? "logging out..." : "Logout"}
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
