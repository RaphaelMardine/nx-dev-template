'use client';
import * as React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from './popover';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Separator } from './separator';
import {
  Menu,
  LogOut,
  ChevronDown,
  ChevronUp,
  User,
  Users,
  Grip,
  UsersRound,
  Briefcase,
  GalleryHorizontalEnd,
  Landmark,
  BarChart2,
  QrCode,
  LayoutGrid,
  CircleDollarSign,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Logo from '../../../../assets/src/logo_mkt_lab.svg';
import DarkLogo from '../../../../assets/src/dark-logo.svg';
import Image from 'next/image';
import { User as iUser } from '../../../../types/src/user';

interface iHeaderUserMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: iUser;
  eventMyProfile: () => void;
  eventLogout: () => void;
}
interface iHeaderProps {
  menuListContent?: React.ReactNode;
  user: iUser;
  eventLogo: () => void;
}

interface iMainHeaderProps extends iHeaderProps {
  authLogout: () => void;
}

const HeaderMenu = ({ eventLogo, menuListContent }: iHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="flex gap-4 text-white">
      <Popover onOpenChange={() => setIsMenuOpen(!isMenuOpen)}>
        <PopoverTrigger
          className={`flex items-center justify-center w-24 h-10 gap-1 transition duration-300 ease-in-out rounded-lg hover:scale-105 ${
            isMenuOpen && 'bg-primary-darkgray'
          }`}
        >
          <Menu
            color="#ffffff"
            size={26}
          />
          <span className="text-sm text-white">Menu</span>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col justify-between pt-10 border-0 bg-primary-dark h-dvh">
          {menuListContent}
        </PopoverContent>
      </Popover>
      <Image
        className="cursor-pointer"
        src={Logo}
        alt="Logo"
        width={100}
        height={30}
        onClick={eventLogo}
      />
    </div>
  );
};
const HeaderProductsMenu = () => {
  const router = useRouter();
  return (
    <Popover>
      <PopoverTrigger>
        <Grip
          size={24}
          color="#ffffff"
          className="transition duration-300 ease-in-out hover:scale-110"
        ></Grip>
      </PopoverTrigger>
      <PopoverContent className="p-6 mt-3 border-0 w-80 bg-primary-dark rounded-se-none">
        <h3 className="text-sm font-bold text-white">Minha unidade</h3>
        <Separator className="bg-primary-darkgray"></Separator>
        <ul className="flex flex-wrap gap-y-4 *:text-white *:truncate *:text-sm *:flex *:flex-col *:p-2 *:w-1/3 *:h-24 *:items-center *:justify-center *:gap-2.5 *:hover:cursor-pointer *:transition duration-300 ease-in-out">
          <li
            className="hover:scale-105"
            onClick={() => router.push('/units')}
          >
            <GalleryHorizontalEnd
              size={32}
              color="#ffffff"
            />
            <p>Visão geral</p>
          </li>
          <li
            className="hover:scale-105"
            onClick={() => router.push('https://mktlab.app/clients')}
          >
            <Briefcase
              size={32}
              color="#ffffff"
            />
            <p>Clientes</p>
          </li>
          <li
            className="hover:scale-105"
            onClick={() => router.push('https://mktlab.app/unidades')}
          >
            <UsersRound
              size={32}
              color="#ffffff"
            />
            <p>Investidores</p>
          </li>
        </ul>
        <h3 className="mt-8 text-sm font-bold text-white">Produtos V4</h3>
        <Separator className="bg-primary-darkgray"></Separator>
        <ul className="flex flex-wrap gap-y-4 *:text-white *:text-sm *:p-2 *:text-center *:flex *:flex-col *:w-1/3 *:h-24 *:items-center *:justify-center *:gap-2.5 *:hover:cursor-pointer *:transition duration-300 ease-in-out">
          <li
            className="hover:scale-105"
            onClick={() => router.push('https://meetingbroker.mktlab.app/')}
          >
            <CircleDollarSign
              size={32}
              color="#ffffff"
            />
            <p>Broker</p>
          </li>
          <li
            className="hover:scale-105"
            onClick={() => router.push('https://mktlab.app/clientes/mediahub')}
          >
            <LayoutGrid
              size={32}
              color="#ffffff"
            />
            <p>MediaHub</p>
          </li>
          <li
            className="hover:scale-105"
            onClick={() => router.push('https://v4pay.mktlab.app/')}
          >
            <QrCode
              size={32}
              color="#ffffff"
            />
            <p>V4 Pay</p>
          </li>
          <li
            className="hover:scale-105"
            onClick={() => router.push('https://mktlab.app/dashboards')}
          >
            <BarChart2
              size={32}
              color="#ffffff"
            />
            <p>Central de Dashboards</p>
          </li>
          <li
            className="hover:scale-105"
            onClick={() => router.push('https://laboratoriodomarketing.com/')}
          >
            <Landmark
              size={32}
              color="#ffffff"
            />
            <p>Lab Financeiro</p>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};
const HeaderUserMenu = ({
  isOpen,
  setIsOpen,
  user,
  eventMyProfile,
  eventLogout,
}: iHeaderUserMenuProps) => {
  return (
    <Popover onOpenChange={() => setIsOpen(!isOpen)}>
      <PopoverTrigger className="group">
        <div className="border border-primary-darkgray h-10 rounded-full flex gap-2.5 justify-between items-center p-1">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user?.picture} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {isOpen ? (
            <ChevronUp
              size={16}
              color="#ffffff"
              className="group-hover:animate-bounce"
            />
          ) : (
            <ChevronDown
              size={16}
              color="#ffffff"
              className="mr-1 group-hover:animate-bounce"
            />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-4 border-0 bg-primary-dark">
        <section className="flex items-center gap-3 mb-3.5">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user.picture} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-base text-white">{user.name}</h3>
            <span className="text-xs font-semibold text-white">
              {user?.unit?.name}
            </span>
          </div>
        </section>
        <Separator className="bg-primary-darkgray" />
        <ul className="my-3 flex flex-col gap-2.5 *:text-white *:text-base *:flex *:gap-2 *:items-center *:hover:cursor-pointer *:transition duration-300 ease-in-out">
          <li
            className="hover:scale-105"
            onClick={eventMyProfile}
          >
            <User
              size={16}
              color="#ffffff"
            />
            <span>Meu perfil</span>
          </li>
          <li
            className="hover:scale-105"
            onClick={eventLogout}
          >
            <LogOut
              size={16}
              color="#ffffff"
            />
            <span>Sair</span>
          </li>
        </ul>
        <Separator className="bg-primary-darkgray" />
        <Image
          src={DarkLogo}
          alt="Logo"
          width={64}
          height={16}
          className="m-auto mt-4"
        />
      </PopoverContent>
    </Popover>
  );
};
const Header = React.forwardRef<HTMLElement, any>(
  ({ user, authLogout, menuListContent }: iMainHeaderProps, ref) => {
    const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);

    const router = useRouter();

    return (
      <header
        ref={ref}
        className={`fixed z-50 flex items-center justify-between w-screen px-8 h-14 bg-primary-dark`}
      >
        <HeaderMenu
          user={user}
          menuListContent={menuListContent}
          eventLogo={() => router.push('/')}
        />
        <div className="flex items-center gap-6 text-white">
          <HeaderProductsMenu />
          <HeaderUserMenu
            isOpen={isUserMenuOpen}
            setIsOpen={setIsUserMenuOpen}
            user={user}
            eventMyProfile={() =>
              router.replace(`https://mktlab.app/perfil/${user?._id}`)
            }
            eventLogout={() => {
              authLogout();
              router.replace('/');
            }}
          />
        </div>
      </header>
    );
  }
);
Header.displayName = 'Header';
export { Header };
