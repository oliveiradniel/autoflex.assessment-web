import { SearchIcon } from 'lucide-react';

import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group';

import type { Table } from '@tanstack/react-table';

interface DataTableTextFilterProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: Table<any>;
  placeholder: string;
  column: string;
}

export function DataTableTextFilter({
  table,
  placeholder,
  column,
}: DataTableTextFilterProps) {
  if (!table) {
    throw new Error('DataTableTextFilter requires a table instance');
  }

  const tableColumn = table.getColumn(column);
  const value = tableColumn?.getFilterValue() as string;

  return (
    <InputGroup className="w-full max-w-100">
      <InputGroupInput
        placeholder={placeholder}
        value={value}
        onChange={(event) => tableColumn?.setFilterValue(event.target.value)}
      />

      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>

      {value?.length > 0 && (
        <InputGroupAddon align="inline-end" className="animate-fade-in">
          ({table.getRowCount()})
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}
