import { useLocation } from "react-router";
interface SignupState {
    email: string;
    name: string;
}

export default function SignupPage() {

    const location = useLocation();

    const state = location.state as SignupState | undefined;

    return (
        <>
            {
                state?.email
            },
            {state?.name}
        </>
    )

}