import { useState } from "react";
import SendOtpForm from "../Components/Template/SendOtpForm";
import CheckOtpForm from "../Components/Template/CheckOtpForm";

function AuthPage() {
  const [step, setStep] = useState<number>(1);
  const [mobile, setMobile] = useState<string>("");
  const [code, setCode] = useState<string>("");

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6 sm:p-8">
        {/* لوگو یا عنوان بالای فرم */}
        <h1 className="font-vazir text-center text-red-600 font-extrabold text-3xl mb-6">
          دیوار
        </h1>

        {step === 1 && (
          <SendOtpForm setStep={setStep} mobile={mobile} setMobile={setMobile} />
        )}

        {step === 2 && (
          <CheckOtpForm
            setStep={setStep}
            mobile={mobile}
            code={code}
            setCode={setCode}
          />
        )}
      </div>
    </main>
  );
}

export default AuthPage;
