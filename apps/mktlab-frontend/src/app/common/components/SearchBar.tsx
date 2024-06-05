import { Input, InputProps } from '@v4company/ui-components';
import { Search } from 'lucide-react';

export default function SearchBar(props: InputProps) {
  return (
    <div className="relative">
      <Search className="absolute top-0 bottom-0 w-4 h-4 my-auto text-gray-500 left-3" />
      <Input
        type="text"
        className="pr-4 pl-9"
        {...props}
      />
    </div>
  );
}
