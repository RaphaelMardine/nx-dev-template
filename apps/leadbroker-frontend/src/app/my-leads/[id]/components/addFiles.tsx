import { useToast } from '@v4company/ui-components';
import { CloudUpload, Dot, File, Trash } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileList, sendFile } from '../../../../common/services';

interface AddFilesProps {
  files: FileList[];
  setFiles: Dispatch<SetStateAction<FileList[]>>;
}
export function AddFiles({ files, setFiles }: AddFilesProps) {
  const { toast } = useToast();

  const MAX_SIZE_IN_MB = 1;

  const convertBytesToMB = (bytes: number) => {
    return (bytes / 1024 / 1024).toPrecision(1);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((file, i) => i !== index);
    setFiles(newFiles);
  };

  const addFiles = async (filesToSend: FileList[]) => {
    const newFiles = await Promise.all(
      filesToSend.map(async (file) => {
        const response = await sendFile(file);
        try {
          file.url = response.data.url;
          file.filename = file.name;
          return file;
        } catch (error) {
          toast({
            title: 'Erro ao adicionar arquivo',
            description: `Erro ao enviar o arquivo ${file.name}`,
            variant: 'destructive',
          });
          return file;
        }
      })
    );
    setFiles([...newFiles, ...files]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop(acceptedFiles, fileRejections) {
      if (acceptedFiles.length + files.length > 5) {
        toast({
          title: 'Erro ao adicionar arquivo',
          description: 'O limite máximo de arquivos é 5',
          variant: 'destructive',
        });
        return;
      }
      if (fileRejections.length > 0) {
        fileRejections.map((file) => {
          toast({
            title: 'Erro ao adicionar arquivo',
            description: file.errors[0].message,
            variant: 'destructive',
          });
        });
      }
      addFiles(acceptedFiles);
    },
    multiple: true,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg'],
      'document/pdf': ['.pdf'],
      'audio/mp3': ['.mp3'],
      'video/mp4': ['.mp4'],
    },
    maxFiles: 5,
    validator: (file) => {
      if (file.size > MAX_SIZE_IN_MB * 1024 * 1024) {
        return {
          code: 'file-too-large',
          message: `O arquivo ${file.name} é muito grande`,
        };
      }
      return null;
    },
  });
  return (
    <div
      {...getRootProps()}
      className="flex flex-col justify-between w-full h-full gap-8 p-4 bg-gray-100 border border-dashed rounded cursor-pointer"
    >
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <CloudUpload size={48} />
        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold">Arraste e solte os arquivos aqui</p>
          <p className="text-xs">
            Arquivos suportados: pdf, jpeg, png, mp3 e mp4
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <input
          {...getInputProps()}
          type="file"
          title="Escolher Arquivos"
          placeholder="Escolher Arquivos"
        />
        <p className="text-sm font-bold">Escolher Arquivo</p>
      </div>

      <div
        className="flex flex-col gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 bg-white rounded cursor-default"
          >
            <div className="flex items-center gap-4">
              <File size={16} />
              <p className="overflow-hidden text-sm font-bold truncate whitespace-nowrap max-w-28">
                {file.name}
              </p>
              <div className="flex items-center gap-1 pl-1">
                <p className="text-sm uppercase">{file.name?.split('.')[1]}</p>
                <Dot size={24} />
                <p className="text-sm">{convertBytesToMB(file.size)} MB</p>
              </div>
            </div>
            <Trash
              className="cursor-pointer text-destructive"
              size={16}
              onClick={() => removeFile(index)}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <p className="text-xs">
          Tamanho máximo: {MAX_SIZE_IN_MB}mb. Máximo de 5 arquivos
        </p>
      </div>
    </div>
  );
}
