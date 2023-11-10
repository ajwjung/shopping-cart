import { useRouteError } from "react-router-dom";

function ErrorPage() {
    let error = useRouteError();

    return (
        error && <p>A network error was encountered</p>
    )
}

export default ErrorPage;