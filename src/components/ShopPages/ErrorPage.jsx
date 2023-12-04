import { useRouteError } from "react-router-dom";
import styles from "./OtherPages.module.css";

function ErrorPage() {
    let error = useRouteError();

    return (
        error && <div className={styles.errorMessage}
        >
            <p>A network error was encountered.</p>
            <p>Please try again later.</p>
        </div>
    )
}

export default ErrorPage;