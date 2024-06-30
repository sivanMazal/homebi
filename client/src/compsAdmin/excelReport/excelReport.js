import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Button } from '@mui/material';
import SelectInput from '../usersPayments/selectInput';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API_URL, doApiTokenGet } from '../../store/services/service';

const exportReportToExcel = (reportData) => {
  // Report data
  // const reportData = [
  //   { name: 'אליס', age: 30, email: 'alice@example.com' },
  //   { name: 'בוב', age: 25, email: 'bob@example.com' },
  //   { name: 'ג׳ון', age: 35, email: 'john@example.com' },
  //   /* ... */
  // ];

  // Create a new workbook
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(reportData);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');

  // Convert the workbook to an Excel file
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  // Create a Blob from the buffer
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Save the file using FileSaver.js
  saveAs(blob, `דוח ${new Date().getFullYear()}.xlsx`);
};

const ReportExportButton = ({ type }) => {
  const [value, setValue] = useState(new Date().getFullYear());
  const [years, setYears] = useState([]);
  const building = useSelector(state => state.buildingSlice.building);

  useEffect(() => {
    const startYear = new Date(building.dateCreated).getFullYear();
    const currentYear = new Date().getFullYear();
    const yearsArr = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);
    setYears(yearsArr);
  }, [])

  const doApi = async () => {
    try {
      let url;
      if (type == 1) {
        url = API_URL + "/messages/byYear/" + value + "/" + building._id;
      } else {
        url = API_URL + "/usersPayments/byYear/" + value + "/" + building._id;
      }
      const { data } = await doApiTokenGet(url);
      console.log(data)
      const extractedData = data.map(({ name, price, date_created, isConst, isPay }) => ({ name, price, date_created, isConst, isPay }));
      console.log(extractedData)
      exportReportToExcel(extractedData);
    }
    catch (err) {
      console.log(err.response?.data?.msg);
    }
  }

  return (<>
    {/* <SelectInput name={"שנה"} arr={years} value={value} setValue={setValue} /> */}
    <Button
      variant='contained'
      style={{ backgroundColor: "#94db9f" }}
      onClick={doApi}
    >יצוא ל-EXECL</Button>
  </>);
};

export default ReportExportButton;
