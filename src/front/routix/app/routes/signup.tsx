import { useLocation } from "react-router";
import Header from "~/components/header";
interface SignupState {
    email: string;
    name: string;
}

export function loader() {

}

export default function SignupPage() {

    const location = useLocation();

    const state = location.state as SignupState | undefined;

    return (
        <>
            <Header />
            {
                state?.email
            },
            {state?.name}
        </>
    )

}