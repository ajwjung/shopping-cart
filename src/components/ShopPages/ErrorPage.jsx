import { useRouteError } from "react-router-dom";
import styles from "./ErrorPage.module.css";

function ErrorPage() {
    let error = useRouteError();

    return (
        <div className={styles.errorMessage}
        >
            <p>A network error was encountered.</p>
            <p>Please try again later.</p>
        </div>
    )
}

export default ErrorPage;