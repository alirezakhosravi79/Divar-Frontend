interface SendOtpFormProps {
  mobile: string;
  setMobile: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const SendOtpForm: React.FC<SendOtpFormProps> = ({ mobile, setMobile, setStep }) => {
    
const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);
};

  return (
    <form className="font-vazir" onSubmit={submitHandler}>
      <p>ورود به حساب کاربری</p>
      <span>برای استفاده از سایت دیوار، لطفا شماره موبایل خود را وارد کنید. کد تایید
        به این شماره ارسال خواهد شد.</span>
        <label htmlFor="input">شماره موبایل خود را وارد کنید.</label>
        <input type="text" id="input" placeholder="شماره موبایل" value={mobile} onChange={e => setMobile(e.target.value)}/>
        <button className="bg-red-700 text-white" type="submit">ارسال کد تایید</button>
    </form>
  );
};

export default SendOtpForm;