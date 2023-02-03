import { Outlet } from 'react-router-dom';
import GeneralLayout from './GeneralLayout';

export default function GuestLayout() {
  return (
    <GeneralLayout>
      <Outlet />
    </GeneralLayout>
  );
}
