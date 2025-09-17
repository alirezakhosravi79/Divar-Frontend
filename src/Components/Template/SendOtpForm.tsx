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

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
    console.log({ response, error });
  };

  return (
    <form className="font-vazir" onSubmit={submitHandler}>
      <p>ورود به حساب کاربری</p>
      <span>
        برای استفاده از سایت دیوار، لطفا شماره موبایل خود را وارد کنید. کد تایید
        به این شماره ارسال خواهد شد.
      </span>

      <label htmlFor="input">شماره موبایل خود را وارد کنید.</label>
      <input
        type="text"
        id="input"
        placeholder="شماره موبایل"
        value={mobile}
        maxLength={11}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, "");
          setMobile(value);
        }}
        className="border p-2 rounded"
      />

      {errorMsg && <p className="text-red-600 text-sm mt-1">{errorMsg}</p>}

      <button
        className="bg-red-700 text-white mt-3 px-4 py-2 rounded"
        type="submit"
      >
        ارسال کد تایید
      </button>
    </form>
  );
};

export default SendOtpForm;
