import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { API_URL, doApiMethod } from "../../store/services/service";
import { useEffect } from "react";
import ReportExportButton from "../../compsAdmin/excelReport/excelReport";
import { shallowEqual, useSelector } from "react-redux";

const ApexChart = () => {
  const [expenses, setExpenses] = useState([]);
  const [payments, setPayments] = useState([]);
  const { user, building } = useSelector(state => {
    return {
      user: state.userSlice.user,
      building: state.buildingSlice.building,
    }
  }, shallowEqual);

  useEffect(() => {
    doExpensesApi();
    doPaymentsApi();
  }, [building])

  const doExpensesApi = async () => {
    try {
      const url = API_URL + "/expenses/graph/" + building._id;
      const { data } = await doApiMethod(url, "GET");
      console.log(data);
      setExpenses(data);
    }
    catch (err) {
      console.log(err);
    }
  }

  const doPaymentsApi = async () => {
    try {
      const url = API_URL + "/expenses/payments/"+building._id;
      const { data } = await doApiMethod(url, "GET");
      console.log(data);
      setPayments(data);
    }
    catch (err) {
      console.log(err);
    }
  }

  const series = [{
    name: 'הוצאות',
    data: expenses
  }, {
    name: 'הכנסות',
    data: payments
  }];
  const options = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
    },
    yaxis: {
      // title: {
      //   text: '$ (thousands)'
      // }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      // y: {
      //   formatter: function (val) {
      //     return "$ " + val + " thousands"
      //   }
      // }
    }
  }


  return (<div id="chart" style={{ marginTop: "90px" }}>
    <div className="row gx-0 justify-content-between mb-2">
      <h4 className="m-2 col-4 fw-bold"> גרף הכנסות מול הוצאות </h4>
      {user && user.role == "admin" && <div className="col-2">
        <ReportExportButton type={2} />
      </div>}
    </div>
    {expenses.length>0 && payments.length>0 ? <ReactApexChart options={options} series={series} type="bar" height={350} /> 
    : <p>אין נתונים במערכת.</p>}
  </div>
  )
}
export default ApexChart;