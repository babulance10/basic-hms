import { Head } from '@inertiajs/react';
import MainMenu from '@/Components/Menu/MainMenu';
import FlashMessages from '@/Components/Messages/FlashMessages';
import TopHeader from '@/Components/Header/TopHeader';
import BottomHeader from '@/Components/Header/BottomHeader';
import { Menu } from '@/types';

interface MainLayoutProps {
  title?: string;
  children: React.ReactNode;
  menus: Menu[];
}

export default function MainLayout({
  title,
  children,
  menus
}: MainLayoutProps) {
  return (
    <>
      <Head title={title} />
      <div className="flex flex-col">
        <div className="flex flex-col h-screen">
          <div className="md:flex">
            <TopHeader menus={menus} />
            <BottomHeader />
          </div>
          <div className="flex flex-grow overflow-hidden">
            <MainMenu
              className="flex-shrink-0 hidden w-56 p-4 overflow-y-auto bg-indigo-800 md:block"
              menus={menus}
            />
            {/**
             * We need to scroll the content of the page, not the whole page.
             * So we need to add `scroll-region="true"` to the div below.
             *
             * [Read more](https://inertiajs.com/pages#scroll-regions)
             */}
            <div
              className="w-full px-2 py-8 overflow-hidden overflow-y-auto md:p-8"
              scroll-region="true"
            >
              <FlashMessages />
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
