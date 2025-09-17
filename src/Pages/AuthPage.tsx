import { useState } from "react"
import CheckOtpForm from "../Components/Template/CheckOtpForm"
import SendOtpForm from "../Components/Template/SendOtpForm"

function AuthPage() {
    //state for forms 1,2
    const [step , setStep] = useState<number>(1);
    //state for mobile
    const [mobile , setMobile] = useState<string>("");
    //state for code otp
    const [code , setCode] = useState<string>("");
  return (
    <div>
        {step === 1 && <SendOtpForm setStep={setStep} mobile={mobile} setMobile={setMobile}/>}
        {step === 2 && <CheckOtpForm setStep={setStep} mobile={mobile} code={code} setCode={setCode}/>}
    </div>
  )
}

export default AuthPage