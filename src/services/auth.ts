import api from "../Configs/api";
import type { AxiosResponse, AxiosError } from "axios";

interface ApiResult<T = any> {
  response?: AxiosResponse<T>;
  error?: AxiosError;
}

const sendOtp = async (mobile: string): Promise<ApiResult> => {
  try {
    const response = await api.post("auth/send-otp", { mobile });
    return { response };
  } catch (error) {
    return { error: error as AxiosError };
  }
};

const checkOtp = async (
  mobile: string,
  code: string
): Promise<ApiResult> => {
  try {
    const response = await api.post("auth/check-otp", { mobile, code });
    return { response };
  } catch (error) {
    return { error: error as AxiosError };
  }
};

export { sendOtp, checkOtp };
