import UserContext from "@/context/userContext";
import { login } from "@/services/userService";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

export const useLoginHelper = (fromSignUp?: boolean) => {
    const router = useRouter();
    const context = useContext<any>(UserContext);

    return async (user: { email: string, password: string }) => {
        const errorMsg = 'Failed to Login';
        try {
            const result = await login(user);

            if (result && !(result instanceof AxiosError)) {
                if (fromSignUp) toast.success(`Login Successfully. Welcome ${result.user.name}`);
                context?.setUser(result.user);
                router.push('/profile/user');
            } else if (result instanceof AxiosError) {
                const axiosError = result as AxiosError<ErrorResponse>;
                const message = axiosError.response?.data?.message || errorMsg;
                toast.error('Error logging in: ' + message);
            } else {
                toast.error(errorMsg);
            }
        } catch (error) {
            toast.error('Unexpected error: ' + error);
        }
    };
};