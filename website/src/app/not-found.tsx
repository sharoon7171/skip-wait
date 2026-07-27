import { redirect } from 'next/navigation';
import { routes } from '@/lib/routes';

export default function NotFound(): never {
  redirect(routes.home);
}
