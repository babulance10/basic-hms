import MainMenuItem from '@/Components/Menu/MainMenuItem';
//import { Building, CircleGauge, Printer, Users } from 'lucide-react';
import { icons } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import { Menu } from '@/types';

interface MainMenuProps {
  className?: string;
  menus?: Menu[];
}

export default function MainMenu({ className, menus }: MainMenuProps) {
  return menus ? (
    <div className={className}>
      {menus.map((menu: Menu) => {
        const iconName = menu?.icon || 'CircleGauge';
        const Icon = icons[iconName];
        return (
          <MainMenuItem
            key={menu.id}
            text={menu.name}
            link={menu.url}
            icon={<Icon size={20} />}
          />
        );
      })}
    </div>
  ) : (
    ''
  );

  // return (
  //   <div className={className}>
  //     <MainMenuItem
  //       text="Dashboard"
  //       link="dashboard"
  //       icon={<CircleGauge size={20} />}
  //     />
  //     <MainMenuItem
  //       text="Organizations"
  //       link="organizations"
  //       icon={<Building size={20} />}
  //     />
  //     <MainMenuItem
  //       text="Contacts"
  //       link="contacts"
  //       icon={<Users size={20} />}
  //     />
  //     <MainMenuItem
  //       text="Reports"
  //       link="reports"
  //       icon={<Printer size={20} />}
  //     />
  //   </div>
  // );
}
