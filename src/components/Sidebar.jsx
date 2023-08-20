import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiX, BiHome, BiUser, BiBookContent, BiCoinStack, BiGroup, BiNotepad } from 'react-icons/bi';
import SidebarLinkGroup from './SidebarLinkGroup';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const location = useLocation();
    const { pathname } = location;

    const trigger = useRef(null);
    const sidebar = useRef(null);

    const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
    );

    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!sidebar.current || !trigger.current) return;
            if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
            setSidebarOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    useEffect(() => {
        localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
        if (sidebarExpanded) {
            document.querySelector('body')?.classList.add('sidebar-expanded');
        } else {
            document.querySelector('body')?.classList.remove('sidebar-expanded');
        }
    }, [sidebarExpanded]);

    return (
        <aside
            ref={sidebar}
            className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-graydark duration-300 ease-linear lg:static lg:translate-x-0 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                <Link to="/">
                    <h1 className="text-title-sm font-bold text-meta-3">Koncer Darul Aman</h1>
                </Link>

                <button
                    ref={trigger}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-controls="sidebar"
                    aria-expanded={sidebarOpen}
                    className="block text-4xl text-white lg:hidden"
                >
                    <BiX />
                </button>
            </div>

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav className="mt-5 py-4 px-4 lg:mt-2 lg:px-6">
                    <li className="list-none">
                        <Link
                            to="/"
                            className={`group relative flex items-center gap-2.5 rounded mb-3 py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-meta-3 ${
                                pathname == '/' && 'bg-meta-3'
                            }`}
                        >
                            <BiHome />
                            Dashboard
                        </Link>
                        <ul className="mb-3 flex flex-col gap-1.5">
                            <SidebarLinkGroup
                                activeCondition={
                                    pathname == '/penduduk' ||
                                    pathname.includes('penduduk') ||
                                    pathname == '/data-asset' ||
                                    pathname.includes('data-asset')
                                }
                            >
                                {(handleClick, open) => {
                                    return (
                                        <>
                                            <Link
                                                to="#"
                                                className={`group relative flex items-center gap-2.5 rounded py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                                    (pathname == '/penduduk' ||
                                                        pathname.includes('penduduk') ||
                                                        pathname == '/data-asset' ||
                                                        pathname.includes('/data-asset')) &&
                                                    'bg-meta-3'
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                                                }}
                                            >
                                                <BiUser />
                                                Kependudukan
                                                <svg
                                                    className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                                        open && 'rotate-180'
                                                    }`}
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </Link>
                                            <div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
                                                <ul className="mt-2 mb-2 flex flex-col gap-2.5 pl-6">
                                                    <li>
                                                        <Link
                                                            to="/penduduk"
                                                            className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium duration-300 ease-in-out hover:text-white ${
                                                                pathname == '/penduduk' || pathname.includes('penduduk')
                                                                    ? 'text-white'
                                                                    : 'text-bodydark2'
                                                            }`}
                                                        >
                                                            Daftar Penduduk
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
                                                <ul className="mt-2 mb-2 flex flex-col gap-2.5 pl-6">
                                                    <li>
                                                        <Link
                                                            to="/data-asset"
                                                            className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium duration-300 ease-in-out hover:text-white ${
                                                                pathname == '/data-asset' ||
                                                                pathname.includes('data-asset')
                                                                    ? 'text-white'
                                                                    : 'text-bodydark2'
                                                            }`}
                                                        >
                                                            Daftar Asset
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </>
                                    );
                                }}
                            </SidebarLinkGroup>
                        </ul>
                        <Link
                            to="/artikel"
                            className={`group relative flex items-center gap-2.5 rounded mb-3 py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-meta-3 ${
                                (pathname == '/artikel' || pathname.includes('artikel')) && 'bg-meta-3'
                            }`}
                        >
                            <BiBookContent />
                            Artikel
                        </Link>
                        <Link
                            to="/agenda"
                            className={`group relative flex items-center gap-2.5 rounded mb-3 py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-meta-3 ${
                                (pathname == '/agenda' || pathname.includes('agenda')) && 'bg-meta-3'
                            }`}
                        >
                            <BiNotepad />
                            Agenda
                        </Link>
                        <Link
                            to="/perangkat-desa"
                            className={`group relative flex items-center gap-2.5 rounded mb-3 py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-meta-3 ${
                                (pathname == '/perangkat-desa' || pathname.includes('perangkat-desa')) && 'bg-meta-3'
                            }`}
                        >
                            <BiGroup />
                            Perangkat Desa
                        </Link>
                        <Link
                            to="/master"
                            className={`group relative flex items-center gap-2.5 rounded mb-3 py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-meta-3 ${
                                (pathname == '/master' || pathname.includes('master')) && 'bg-meta-3'
                            }`}
                        >
                            <BiCoinStack />
                            Master Data
                        </Link>
                    </li>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
