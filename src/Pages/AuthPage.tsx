import { useState } from "react"
import CheckOtpForm from "../Components/Template/CheckOtpForm"
import SendOtpForm from "../Components/Template/SendOtpForm"

function AuthPage() {
    //state for forms 1,2
    const [step , setStep] = useState(1);
    //state for mobile
    const [mobile , setMobile] = useState("");
    //state for code otp
    const [code , setCode] = useState("");
  return (
    <div>
        {step === 1 && <SendOtpForm />}
        {step === 2 && <CheckOtpForm />}
    </div>
  )
}

export default AuthPage