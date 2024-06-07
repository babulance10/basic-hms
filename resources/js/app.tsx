import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import MainLayout from '@/Layouts/MainLayout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: title => `${title} - ${appName}`,
  resolve: name => {
    const page = resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob('./Pages/**/*.tsx')
    );
    page.then((module: any) => setupPageLayout(module,name));
    return page;
  },
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(<App {...props} />);
  },
  progress: {
    color: '#F87415'
  }
});

function setupPageLayout(module: any, name:string) {
  if (!module.default.layout && name !== 'Auth/Login') {
    module.default.layout = (page: any) => {
      return <MainLayout title={page.type.name.replace("Page","")} children={page} menus={page.props.menus}></MainLayout>;
    };
  }
}
