import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { TaxData } from '@/types';


export interface DataTableProps {
  data: TaxData[];
}

const TaxTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tax Rate %</TableCell>
            <TableCell>Taxble Amount</TableCell>
            <TableCell>CGST Amt</TableCell>
            <TableCell>SGST Amt</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map(row => (
            <TableRow key={row.rate}>
              <TableCell>{row.rate}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.cgst}</TableCell>
              <TableCell>{row.sgst}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaxTable;
