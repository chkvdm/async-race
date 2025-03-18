import {
  MaterialReactTable,
  MRT_PaginationState,
  useMaterialReactTable,
  type MRT_SortingState,
  type MRT_Updater,
} from 'material-react-table';

import { useAppSelector } from '@reduxHook';
import { RootState } from '@store';
import useWinnerPagination from 'features/winners/hooks/useWinnersPagination';
import { WinnersLimits } from '@winnerTypes/enums/winners.enums';
import useWinnerColumns from 'features/winners/components/WinnerTable/WinnerTableColumn';
import WinnerTableLoader from 'components/Loaders/TableLoader/TableLoader';

const WinnerTable: React.FC = () => {
  const { winners, loading, winnersError } = useAppSelector((state: RootState) => state.winners);
  const { sorting, pagination, totalWinners, handlePageChange, handleSortChange } =
    useWinnerPagination();

  const pageCount = Math.ceil(totalWinners / WinnersLimits.PAGE_LIMIT);
  const columns = useWinnerColumns();

  const table = useMaterialReactTable({
    columns,
    data: winners,
    renderEmptyRowsFallback: () => (
      <div style={{ textAlign: 'center', margin: '20px' }}>Currently, there are no winners.</div>
    ),
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      sx: { padding: '0 16px', textAlign: 'center' },
    },
    enableColumnActions: false,
    enableTopToolbar: false,
    manualPagination: true,
    paginationDisplayMode: 'pages',
    muiPaginationProps: {
      color: 'primary',
      shape: 'rounded',
      rowsPerPageOptions: [WinnersLimits.PAGE_LIMIT],
      showRowsPerPage: false,
      showFirstButton: true,
      showLastButton: true,
      variant: 'outlined',
    },
    manualSorting: true,
    rowCount: totalWinners,
    pageCount,
    state: {
      pagination,
      sorting,
      isLoading: loading,
      showAlertBanner: !!winnersError,
    },
    onPaginationChange: (updater: MRT_Updater<MRT_PaginationState>) => {
      const newPagination = updater instanceof Function ? updater(pagination) : updater;
      handlePageChange(newPagination);
    },
    onSortingChange: (updater: MRT_Updater<MRT_SortingState>) => {
      const newSorting = updater instanceof Function ? updater(sorting) : updater;
      handleSortChange(newSorting);
    },
  });

  return loading ? <WinnerTableLoader /> : <MaterialReactTable table={table} />;
};

export default WinnerTable;
