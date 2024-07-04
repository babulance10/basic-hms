import MainMenuItem from '@/Components/Menu/MainMenuItem';
import { icons as LucideIcons } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Menu } from '@/types';
import { isEmpty } from 'lodash';
import * as MuiIcons from '@mui/icons-material';

interface MainMenuProps {
  className?: string;
  menus?: Menu[];
}

const loadIcon = (iconName, size) => {
  // Remove 'Icon' suffix if present, as MUI does not use it
  const formattedIconName = iconName.replace(/Icon$/, '');

  const LucideIcon = LucideIcons[formattedIconName];
  const MuiIcon = MuiIcons[formattedIconName];

  // If LucideIcon exists, return it, otherwise return MuiIcon if it exists
  if (LucideIcon) {
    return <LucideIcon size={size} />;
  } else if (MuiIcon) {
    return <MuiIcon style={{ fontSize: size }} />;
  } else {
    console.error(`Icon "${formattedIconName}" not found in either icon libraries.`);
    return null; // or a default icon
  }
};

export default function MainMenu({ className, menus }: MainMenuProps) {
  const menuClasses = `md:w-56 ${className}`;

  return !isEmpty(menus) ? (
    <div className={menuClasses}>
      {menus.map((menu: Menu) => {
        const iconName = menu?.icon || 'CircleGauge';
        return (
          <MainMenuItem
            key={menu.id}
            text={menu.name}
            link={menu.url}
            icon={loadIcon(iconName, 20)}
          />
        );
      })}
    </div>
  ) : null;
}
