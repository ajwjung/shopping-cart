import PropTypes from "prop-types";
import Icon from "@mdi/react";
import { mdiStar, mdiStarHalfFull, mdiStarOutline } from "@mdi/js";

function RatingStars({ rating }) {
    if (rating > 0 && rating < 1) {
        return <Icon path={mdiStarHalfFull} size={1} />;
    } else if (rating === 1) {
        return <Icon path={mdiStar} size={1} />;
    } else if (rating > 1 && rating < 1.9) {
        return (
            <>
                <Icon path={mdiStar} size={1} />
                <Icon path={mdiStarHalfFull} size={1} />
                <Icon path={mdiStarOutline} size={1} />
                <Icon path={mdiStarOutline} size={1} />
                <Icon path={mdiStarOutline} size={1} />
            </>
        );
    } else if (rating >= 1.9 && rating <= 2.1) {
        return (
            <>
                <Icon path={mdiStar} size={1} />
                <Icon path={mdiStar} size={1} />
                <Icon path={mdiStarOutline} size={1} />
                <Icon path={mdiStarOutline} size={1} />
                <Icon path={mdiStarOutline} size={1} />
            </>
        )
    } else if (rating > 2.1 && rating < 2.9) {
        return (
            <>
                <Icon path={mdiStar} size={1} />
                <Icon path={mdiStar} size={1} />
                <Icon path={mdiStarHalfFull} size={1} />
                <Icon path={mdiStarOutline} size={1} />
                <Icon path={mdiStarOutline} size={1} />
            </>
        )
    } else if (rating >= 2.9 && rating <= 3) {
        return (
            <>
                <Icon path={mdiStar} size={1} />
                <Icon path={mdiStar} size={1} />
                <Icon path={mdiStar} size={1} />
                <Icon path={mdiStarOutline} size={1} />
                <Icon path={mdiStarOutline} size={1} />
            </>
        )
    } else if (rating > 3 && rating < 3.9) {
        return (
            <>
                <Icon path={mdiStar} size={1} />
                <Icon path={mdiStar} size={1} />
                <Icon path={mdiStar} size={1} />
                <Icon path={mdiStarHalfFull} size={1} />
                <Icon path={mdiStarOutline} size={1} />
            </>
        )
    } else if (rating >= 3.9 && rating <= 4.2) {
        return (
            <>
                <Icon path={mdiStar} size={1} />
                <Icon path={mdiStar} size={1} />
                <Icon path={mdiStar} size={1} />
                <Icon path={mdiStar} size={1} />
                <Icon path={mdiStarOutline} size={1} />
            </>
        )
    } else if (rating > 4.2 && rating < 4.85) {
        return (
            <>
                <Icon path={mdiStar} size={1} />
                <Icon path={mdiStar} size={1} />
                <Icon path={mdiStar} size={1} />
                <Icon path={mdiStar} size={1} />
                <Icon path={mdiStarHalfFull} size={1} />
            </>
        )
    } else if (rating >= 4.85 && rating <= 5) {
        return (
            <>
                <Icon path={mdiStar} size={1} />
                <Icon path={mdiStar} size={1} />
                <Icon path={mdiStar} size={1} />
                <Icon path={mdiStar} size={1} />
                <Icon path={mdiStar} size={1} />
            </>
        )
    }

    return (
        <span className="ratingStars">
            <Icon path={mdiStarOutline} size={1} />
            <Icon path={mdiStarOutline} size={1} />
            <Icon path={mdiStarOutline} size={1} />
            <Icon path={mdiStarOutline} size={1} />
            <Icon path={mdiStarOutline} size={1} />
        </span>
    )
}

RatingStars.propTypes = {
    rating: PropTypes.number.isRequired
}

export default RatingStars;