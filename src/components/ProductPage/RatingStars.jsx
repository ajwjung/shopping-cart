import PropTypes from "prop-types";
import Icon from "@mdi/react";
import { mdiStar, mdiStarHalfFull, mdiStarOutline } from "@mdi/js";
import styles from "./ProductPage.module.css";

function RatingStars({ rating }) {
    if (rating > 0 && rating < 1) {
        return (
            <div className={styles.stars}>
                <Icon path={mdiStarHalfFull} />
                <Icon path={mdiStarOutline} />
                <Icon path={mdiStarOutline} />
                <Icon path={mdiStarOutline} />
                <Icon path={mdiStarOutline} />
            </div>
        );
    } else if (rating === 1) {
        return (
            <div className={styles.stars}>
                <Icon path={mdiStar} />
                <Icon path={mdiStarOutline} />
                <Icon path={mdiStarOutline} />
                <Icon path={mdiStarOutline} />
                <Icon path={mdiStarOutline} />
            </div>
        );
    } else if (rating > 1 && rating < 1.9) {
        return (
            <div className={styles.stars}>
                <Icon path={mdiStar} />
                <Icon path={mdiStarHalfFull} />
                <Icon path={mdiStarOutline} />
                <Icon path={mdiStarOutline} />
                <Icon path={mdiStarOutline} />
            </div>
        );
    } else if (rating >= 1.9 && rating <= 2.1) {
        return (
            <div className={styles.stars}>
                <Icon path={mdiStar} />
                <Icon path={mdiStar} />
                <Icon path={mdiStarOutline} />
                <Icon path={mdiStarOutline} />
                <Icon path={mdiStarOutline} />
            </div>
        )
    } else if (rating > 2.1 && rating < 2.9) {
        return (
            <div className={styles.stars}>
                <Icon path={mdiStar} />
                <Icon path={mdiStar} />
                <Icon path={mdiStarHalfFull} />
                <Icon path={mdiStarOutline} />
                <Icon path={mdiStarOutline} />
            </div>
        )
    } else if (rating >= 2.9 && rating <= 3) {
        return (
            <div className={styles.stars}>
                <Icon path={mdiStar} />
                <Icon path={mdiStar} />
                <Icon path={mdiStar} />
                <Icon path={mdiStarOutline} />
                <Icon path={mdiStarOutline} />
            </div>
        )
    } else if (rating > 3 && rating < 3.9) {
        return (
            <div className={styles.stars}>
                <Icon path={mdiStar} />
                <Icon path={mdiStar} />
                <Icon path={mdiStar} />
                <Icon path={mdiStarHalfFull} />
                <Icon path={mdiStarOutline} />
            </div>
        )
    } else if (rating >= 3.9 && rating <= 4.2) {
        return (
            <div className={styles.stars}>
                <Icon path={mdiStar} />
                <Icon path={mdiStar} />
                <Icon path={mdiStar} />
                <Icon path={mdiStar} />
                <Icon path={mdiStarOutline} />
            </div>
        )
    } else if (rating > 4.2 && rating < 4.85) {
        return (
            <div className={styles.stars}>
                <Icon path={mdiStar} />
                <Icon path={mdiStar} />
                <Icon path={mdiStar} />
                <Icon path={mdiStar} />
                <Icon path={mdiStarHalfFull} />
            </div>
        )
    } else if (rating >= 4.85 && rating <= 5) {
        return (
            <div className={styles.stars}>
                <Icon path={mdiStar} />
                <Icon path={mdiStar} />
                <Icon path={mdiStar} />
                <Icon path={mdiStar} />
                <Icon path={mdiStar} />
            </div>
        )
    }

    return (
        <span className={styles.stars}>
            <Icon path={mdiStarOutline} />
            <Icon path={mdiStarOutline} />
            <Icon path={mdiStarOutline} />
            <Icon path={mdiStarOutline} />
            <Icon path={mdiStarOutline} />
        </span>
    )
}

RatingStars.propTypes = {
    rating: PropTypes.number.isRequired
}

export default RatingStars;