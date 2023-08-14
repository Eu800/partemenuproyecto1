import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DateComponent(props) {
  const { label, onChange, className } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label={label} className={className} onChange={date => {
          const formattedDate = date.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
          onChange(className, formattedDate); // Call the handler with field name and formatted date
        }} />
      </DemoContainer>
    </LocalizationProvider>
  );
}