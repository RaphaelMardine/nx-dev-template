'use client';

import { useQuery } from '@tanstack/react-query';
import { getDashboardUrl } from '../../../common/services';
import { useAuth } from '@v4company/contexts';

export function IframeDashboard() {
  const { user } = useAuth();
  const unitManagementDashboardId = 114;
  const { data: url } = useQuery({
    queryKey: ['get-dashboard-url'],
    queryFn: async () => {
      const response = await getDashboardUrl(unitManagementDashboardId, {
        id: user.unitId,
      });
      return response;
    },
  });
  return (
    <iframe
      src={url?.data}
      className="w-full h-screen"
    />
  );
}
