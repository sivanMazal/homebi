import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import ManagerDetails from './managerDetails';
import BuildAddress from './buildAddress';
import AddImages from './addImages';
import CheckAdminComp from '../checkAdminComp';
import { API_URL, doApiMethod, doApiMethodToken } from '../../store/services/service';
import { currentBuilding } from '../../store/features/buildingSlice';

const steps = ['על הבניין', 'הוספת תמונות', 'פרטי הוועד'];

export default function AddAndEditBuilding({ type }) {
  const [activeStep, setActiveStep] = useState(0);
  const [object, setObject] = useState(null);
  const [paymentFees, setPaymentFees] = useState(0);
  const [paymenttype, setPaymentType] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const building = useSelector(state => state.buildingSlice.building);

  useEffect(() => {
    if (activeStep == steps.length && type == "new") {
      addBuild();
    }
  }, [activeStep]);

  const addBuild = async () => {
    try {
      const url = API_URL + '/buildings';
      const { data } = await doApiMethod(url, "POST", object);
      console.log(data);
      // object._id
      dispatch(currentBuilding({ building: object }))
    }
    catch (err) {
      console.log(err.response.data);
    }
  }

  const updateBuild = async (obj) => {
    try {
      const url = API_URL + '/buildings/'+building._id;
      const { data } = await doApiMethodToken(url, "PUT", obj);
      console.log(data);
      obj.images = building.images;
      dispatch(currentBuilding({ building: obj }))
    }
    catch (err) {
      console.log(err.response.data);
    }
  }

  const onSubmit = (data) => {
    const o = { ...object }

    if (type == "new" || activeStep == 0)
      switch (activeStep) {
        case 0:
          console.log(activeStep,)
          if (type == "edit" || building) {
            console.log(data)
            data.lng = building.lng;
            data.lat = building.lat;
            data._id = building._id;
            setPaymentFees(data.paymentFees);
            setPaymentType(data.paymentType);
            updateBuild(data)
          }
          setPaymentFees(data.paymentFees);
          setPaymentType(data.paymentType);
          o.building = { ...data };
          setObject({ ...o });
          break;
        case 1:
          o.building.images = data;
          setObject({ ...o });
          break;
        case 2:
          o.manager = data;
          setObject({ ...o });
          break;
        default:
          break;
      }
    setActiveStep(activeStep + 1);
  }

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return <BuildAddress type={type} building={building} onSubmit={onSubmit} />;
      case 1:
        return <AddImages onSubmit={onSubmit} />;
      case 2:
        return <ManagerDetails onSubmit={onSubmit} type={type} paymentFees={paymentFees} paymentType={paymenttype} />;
      default:
        return;
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };



  return <React.Fragment>
    <Box sx={{ width: '70%', padding: "24px", margin: "auto", backgroundColor: "white", marginTop: "24px" }}>
      <h3 className="text-center mb-5">{id ? "עריכת בניין" : "הוספת בניין"}</h3>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>
                <h5 className='me-2 mt-1'>{label}</h5>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1, p: "24px" }}>
            <Alert severity="success" style={{ fontSize: "x-large" }}>
              <AlertTitle style={{ fontSize: "large" }}>  הבניין {id ? "עודכן" : "נוצר"} <strong>בהצלחה.</strong> </AlertTitle>
            </Alert>
          </Typography>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className='p-4'>{getStepContent()}</div>
        </React.Fragment>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          style={{ backgroundColor: "#94db9f", color: "white" }}
          color="inherit"
          disabled={activeStep === 0 || activeStep === steps.length - 1}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          חזרה
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />

      </Box>
    </Box>
  </React.Fragment>
}