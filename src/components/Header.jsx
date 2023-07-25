import { BiMenu } from 'react-icons/bi';
import DropdownUser from './DropdownUser';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1">
            <div className="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11 md:justify-end">
                <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                    <button
                        aria-controls="sidebar"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSidebarOpen(!sidebarOpen);
                        }}
                        className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm text-3xl lg:hidden"
                    >
                        <BiMenu />
                    </button>
                </div>
                <div className="flex items-center  gap-3 2xsm:gap-7">
                    <DropdownUser />
                </div>
            </div>
        </header>
    );
};

export default Header;
