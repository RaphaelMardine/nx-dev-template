import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useAuth } from '@v4company/contexts';
import { useRouter } from 'next/navigation';
import {
  ArrowLeftRight,
  BarChart4,
  CalendarCheck2,
  CalendarDays,
  DollarSign,
  FileCheck,
  FileInput,
  Settings,
  UserCheck,
  Wallet,
} from 'lucide-react';
import { ScrollArea } from '@v4company/ui-components';

export const MenuListContent = () => {
  const { user } = useAuth();
  const router = useRouter();

  const mktLabUrl = process.env.NEXT_PUBLIC_MKTLAB_URL || '';
  const leadbrokerUrl = process.env.NEXT_PUBLIC_LEADBROKER_URL || '';
  const meetingbrokerUrl = process.env.NEXT_PUBLIC_MEETINGBROKER_URL || '';
  const transitionUrl = process.env.NEXT_PUBLIC_TRANSITION_URL || '';
  const brokerManagerUrl = process.env.NEXT_PUBLIC_BROKERMANAGER_URL || '';

  return (
    <>
      <ScrollArea>
        <section className="flex flex-col gap-2 font-sans">
          <div className="px-1">
            <h3 className="text-white text-base mb-2.5 border-b-[1px] py-2 border-gray-600 font-light">
              Lead Broker
            </h3>
            <ul className="flex flex-col gap-4 py-1 *:flex *:gap-2 *:hover:cursor-pointer *:transition duration-300 ease-in-out">
              <li
                className="flex items-center gap-2 py-2 pl-4 hover:scale-105"
                onClick={() => (window.location.href = leadbrokerUrl)}
              >
                <DollarSign
                  size={16}
                  className="text-white"
                />
                <span className="text-base text-white">Lead Broker</span>
              </li>
              <li
                className="flex items-center gap-2 py-2 pl-4 hover:scale-105"
                onClick={() =>
                  (window.location.href = `${leadbrokerUrl}/meus-leads`)
                }
              >
                <UserCheck
                  size={16}
                  className="text-white"
                />
                <span className="text-base text-white">Meus Leads</span>
              </li>
            </ul>
          </div>
          <div className="px-1">
            <h3 className="text-white text-base mb-2.5 border-b-[1px] py-2 border-gray-600 font-light">
              Meeting Broker
            </h3>
            <ul className="flex flex-col gap-4 py-1 *:flex *:gap-2 *:hover:cursor-pointer *:transition duration-300 ease-in-out">
              <li
                className="flex items-center gap-2 py-2 pl-4 hover:scale-105"
                onClick={() => (window.location.href = meetingbrokerUrl)}
              >
                <CalendarDays
                  size={16}
                  className="text-white"
                />
                <span className="text-base text-white">Meeting Broker</span>
              </li>
              <li
                className="flex items-center gap-2 py-2 pl-4 hover:scale-105"
                onClick={() =>
                  (window.location.href = `${meetingbrokerUrl}/minhas-reunioes`)
                }
              >
                <CalendarCheck2
                  size={16}
                  className="text-white"
                />
                <span className="text-base text-white">Minhas reuniões</span>
              </li>
            </ul>
          </div>
          <div className="px-1">
            <h3 className="text-white text-base mb-2.5 border-b-[1px] py-2 border-gray-600 font-light">
              Transições
            </h3>
            <ul className="flex flex-col gap-4 py-1 *:flex *:gap-2 *:hover:cursor-pointer *:transition duration-300 ease-in-out">
              <li
                className="flex items-center gap-2 py-2 pl-4 hover:scale-105"
                onClick={() => (window.location.href = transitionUrl)}
              >
                <ArrowLeftRight
                  size={16}
                  className="text-white"
                />
                <span className="text-base text-white">Transições</span>
              </li>
              <li
                className="flex items-center gap-2 py-2 pl-4 hover:scale-105"
                onClick={() =>
                  (window.location.href = `${transitionUrl}/meus-interesses`)
                }
              >
                <FileInput
                  size={16}
                  className="text-white"
                />
                <span className="text-base text-white">Meus Interesses</span>
              </li>
              <li
                className="flex items-center gap-2 py-2 pl-4 hover:scale-105"
                onClick={() =>
                  (window.location.href = `${transitionUrl}/minhas-transicoes`)
                }
              >
                <FileCheck
                  size={16}
                  className="text-white"
                />
                <span className="text-base text-white">Minhas Transições</span>
              </li>
            </ul>
          </div>
          <div className="px-1">
            <h3 className="text-white text-base mb-2.5 border-b-[1px] py-2 border-gray-600 font-light">
              Gerenciamento
            </h3>
            <ul className="flex flex-col gap-4 py-1 *:flex *:gap-2 *:hover:cursor-pointer *:transition duration-300 ease-in-out">
              <li
                className="flex items-center gap-2 py-2 pl-4 hover:scale-105"
                onClick={() => (window.location.href = mktLabUrl)}
              >
                <BarChart4
                  size={16}
                  className="text-white"
                />
                <span className="text-base text-white">Dashboard</span>
              </li>
              <li
                className="flex items-center gap-2 py-2 pl-4 bg-gray-700 rounded-lg hover:scale-105"
                onClick={() => router.push('/')}
              >
                <Wallet
                  size={16}
                  className="text-white"
                />
                <span className="text-base text-white">Minha Carteira</span>
              </li>
              <li
                className="flex items-center gap-2 py-2 pl-4 hover:scale-105"
                onClick={() => (window.location.href = brokerManagerUrl)}
              >
                <Settings
                  size={16}
                  className="text-white"
                />
                <span className="text-base text-white">Broker Manager</span>
              </li>
            </ul>
          </div>
        </section>
      </ScrollArea>
      <section className="mb-12">
        <div className="flex items-center justify-center gap-4 mb-3.5 w-full h-20 px-2 bg-primary-darkgray rounded-lg">
          <Avatar className="w-12 h-12">
            <AvatarImage
              className="rounded-full h-full w-full"
              src={user.picture || 'https://github.com/shadcn.png'}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-base text-white">{user.name}</h3>
            <span className="text-xs font-semibold text-white">
              {user?.unit?.name}
            </span>
          </div>
        </div>
      </section>
    </>
  );
};
