import * as React from 'react';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DateComponent(props) {
  const { label, onChange, className, value } = props;
  const [valueDate, setValueDate]= useState();

  useEffect(() => {
    // Si value no es vacío
    if (value) {
      // Convierte el string de value en un objeto de tipo dayjs
      setValueDate(dayjs(value));
    }
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label={label} className={className} onChange={date => {
          const formattedDate = date.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
          onChange(className, formattedDate); // Call the handler with field name and formatted date
        }} value={valueDate}/>
      </DemoContainer>
    </LocalizationProvider>
  );
}