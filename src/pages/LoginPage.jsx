import MobileInput from "../components/auth/MobileInput.jsx";
import OTPVerification from "../components/auth/OTPVerification.jsx";
import { useState } from 'react';

const LoginPage = () => {
  const [step, setStep] = useState('mobile'); // 'mobile' or 'otp'

  return (
    <div style={{ padding: '2rem' }}>
      {step === 'mobile' && <MobileInput setStep={setStep} />}
      {step === 'otp' && <OTPVerification />}
    </div>
  );
};

export default LoginPage; 