import { useState } from "react";
import { sendOtp } from "../../services/auth";

interface SendOtpFormProps {
  mobile: string;
  setMobile: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const SendOtpForm: React.FC<SendOtpFormProps> = ({
  mobile,
  setMobile,
  setStep,
}) => {
  const [errorMsg, setErrorMsg] = useState("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    const onlyDigits = /^[0-9]{11}$/;
    if (!onlyDigits.test(mobile)) {
      setErrorMsg("شماره باید دقیقا ۱۱ رقم و فقط عدد باشد");
      return;
    }
    if (!mobile.startsWith("09")) {
      setErrorMsg("شماره باید با 09 شروع شود");
      return;
    }

    const { response, error } = await sendOtp(mobile);
    if (response) setStep(2);
    if (error) console.log((error as any)?.response?.data?.message);
  };

  return (
    <form onSubmit={submitHandler} className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">ورود به حساب کاربری</h2>
        <p className="text-gray-600 text-sm leading-6">
          برای استفاده از دیوار، لطفاً شماره موبایل خود را وارد کنید.
          کد تایید به این شماره پیامک خواهد شد.
        </p>
      </div>

      <div>
        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
          شماره موبایل
        </label>
        <input
          type="text"
          id="mobile"
          value={mobile}
          maxLength={11}
          onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
          className="my-4 py-2 block w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500 sm:text-sm"
          placeholder="مثلا 09123456789"
        />
        {errorMsg && <p className="text-red-600 text-xs mt-1">{errorMsg}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg transition-colors"
      >
        ارسال کد تایید
      </button>
    </form>
  );
};

export default SendOtpForm;
