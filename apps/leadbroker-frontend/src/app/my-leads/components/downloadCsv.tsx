import { Button } from '@v4company/ui-components';
import exportFromJSON from 'export-from-json';
import { Download } from 'lucide-react';
import { dataToExportFromJson } from '../utils';
import { MyLeadResponse } from '../../../common';

interface DownloadCsvProps {
  data: MyLeadResponse[];
}

export function DownloadCsv({ data }: DownloadCsvProps) {
  const fileName = 'lead-broker';
  const exportType = exportFromJSON.types.csv;
  return (
    <Button
      className="rounded-full"
      onClick={() =>
        exportFromJSON({
          data: dataToExportFromJson(data),
          fileName,
          exportType,
        })
      }
    >
      <Download size={16} />
    </Button>
  );
}
