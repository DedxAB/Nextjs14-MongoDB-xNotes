import RightSideBar from '@/components/Sidebar/RightSideBar';

export default function DefaultLayout({ children }) {
  return (
    <div>
      {/* main content */}
      <main className="flex items-start gap-x-5 px-4 mx-auto mb-48 sm:mb-0 max-w-6xl min-h-full sm:min-h-screen">
        <div className="w-full lg:w-2/3">{children}</div>

        {/* right side bar */}
        <div className="sticky top-24 h-[86vh] w-1/3 overflow-y-scroll hidden lg:block sticky-scrollbar">
          <RightSideBar />
        </div>
      </main>
    </div>
  );
}
