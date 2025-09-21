import type { AxiosError } from "axios";
import { checkOtp } from "../../services/auth";
import { setCookie } from "../../utils/cookie";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/user";

interface CheckOtpFormProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  mobile: string;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}
interface ErrorResponse { message: string; }

const CheckOtpForm = ({ setStep, mobile, code, setCode }: CheckOtpFormProps) => {
  const { refetch } = useQuery({ queryKey: ["profile"], queryFn: getProfile });
  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (code.length !== 5) return;

    const { response, error } = await checkOtp(mobile, code);

    if (response) {
      setCookie(response.data);
      await refetch();
      navigate("/");
    }

    if (error) {
      const err = error as AxiosError<ErrorResponse>;
      console.log(err.response?.data.message);
    }
  };

  return (
    <form onSubmit={submitHandler} className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">تایید کد پیامک شده</h2>
        <p className="text-gray-600 text-sm leading-6">
          کد ارسال شده به شماره <span className="font-semibold">{mobile}</span> را وارد کنید.
        </p>
      </div>

      <div>
        <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
          کد تایید
        </label>
        <input
          type="text"
          id="otp"
          value={code}
          maxLength={5}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          className="my-4 py-2 block w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500 sm:text-sm tracking-widest text-center"
          placeholder="12345"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg transition-colors"
        >
          ورود
        </button>
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2.5 rounded-lg transition-colors"
        >
          تغییر شماره
        </button>
      </div>
    </form>
  );
};

export default CheckOtpForm;
