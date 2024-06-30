import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import CanvasJSReact from './canvasjs.react';
import { useState } from 'react';
import { useEffect } from 'react';
import { API_URL, doApiMethod } from '../../store/services/service';
import ReportExportButton from '../../compsAdmin/excelReport/excelReport';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Pie = () => {
	const [statistics, setStatistics] = useState([]);
	const { user, building } = useSelector(state => {
		return {
		  user: state.userSlice.user,
		  building: state.buildingSlice.building,
		}
	  }, shallowEqual);

	useEffect(() => {
		doApi();
	}, [building])

	const doApi = async () => {
		try {
			const url = API_URL + "/expenses/pie/"+ building._id;;
			const { data } = await doApiMethod(url, "GET");
			console.log(data);
			setStatistics(data);
		}
		catch (err) {
			console.log(err);
		}
	}

	const options = {
		backgroundColor: "#f7f7f8",
		animationEnabled: true,
		exportFileName: "הוצאות בפריסה שנתית",
		// exportEnabled: true,
		data: [{
			type: "pie",
			showInLegend: true,
			legendText: "{label}",
			toolTipContent: "{label}: <strong>{y}%</strong>",
			indexLabel: "{y}%",
			indexLabelPlacement: "inside",
			dataPoints: statistics
		}]
	}

	return (
		<div className='my-5'>
			<div className="row gx-0 justify-content-between mb-2">
				<h4 className='mb-3 col-4 fw-bold'>הוצאות בפריסה שנתית</h4>
				{user && user.role == "admin" && <div className="col-2">
					<ReportExportButton type={1}/>
				</div>}
			</div>

			{statistics.length>0 ? <CanvasJSChart options={options}
			/> 
			: <p>אין נתונים במערכת.</p>}

		</div>
	);
}
export default Pie;