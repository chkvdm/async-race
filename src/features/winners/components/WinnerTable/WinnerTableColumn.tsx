import { useMemo, ReactElement } from 'react';
import { MRT_ColumnDef } from 'material-react-table';
import { TruckOutlined } from '@ant-design/icons';

import { WinnerWithCar } from '@winnerTypes/interfaces/winners.interfaces';

const renderColorCell = (color: string): ReactElement => (
  <TruckOutlined style={{ color, fontSize: 50, margin: 0, padding: 0 }} />
);

const useWinnerColumns = (): MRT_ColumnDef<WinnerWithCar>[] => {
  return useMemo<MRT_ColumnDef<WinnerWithCar>[]>(
    () => [
      { accessorKey: 'id', header: '№', enableSorting: false },
      {
        accessorKey: 'color',
        header: 'Car',
        enableSorting: false,
        Cell: ({ cell }): ReactElement => renderColorCell(cell.getValue<string>()),
      },
      { accessorKey: 'name', header: 'Name', enableSorting: false },
      { accessorKey: 'wins', header: 'Wins' },
      { accessorKey: 'time', header: 'Best Time' },
    ],
    []
  );
};

export default useWinnerColumns;
