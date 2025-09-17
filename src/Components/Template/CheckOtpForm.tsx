import type { AxiosError } from "axios";
import { checkOtp } from "../../services/auth";
import {setCookie} from "../../utils/cookie"

interface CheckOtpFormProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  mobile: string;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

interface ErrorResponse {
  message: string;
}

const CheckOtpForm = ({
  setStep,
  mobile,
  code,
  setCode,
}: CheckOtpFormProps) => {
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (code.length !== 5) return;

    const { response, error } = await checkOtp(mobile, code);
    console.log({response,error})

    if (response) {
      setCookie(response.data);
    }

    if (error) {
      const err = error as AxiosError<ErrorResponse>;
      console.log(err.response?.data.message);
    }
  };

  return (
    <form className="font-vazir" onSubmit={submitHandler}>
      <p>تایید کد اس ام اس شده</p>
      <span>کد پیامک شده به شماره "{mobile}" را وارد کنید.</span>
      <label htmlFor="input">کد تایید را وارد کنید</label>
      <input
        type="text"
        placeholder="کد تایید"
        id="input"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button type="submit" className="bg-green-500 mx-6">
        ورود
      </button>
      <button onClick={() => setStep(1)} className="bg-blue-500 mx-6">
        تغییر شماره موبایل
      </button>
    </form>
  );
};

export default CheckOtpForm;
