import { useState } from "react";
import PropTypes from "prop-types";
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight, mdiCircle, mdiCircleOutline } from '@mdi/js';
import styles from "./ImageCarousel.module.css";

function ImageCarousel({ images }) {
    const [displayedImageId, setDisplayedImageId] = useState(0);

    function handleChangeImage(arrowBtn) {
        if (arrowBtn.className === `${styles.leftArrow}`) {
            (displayedImageId - 1) >= 0 
                ? setDisplayedImageId(displayedImageId - 1)
                : setDisplayedImageId(images.length - 1);
        } else if (arrowBtn.className === `${styles.rightArrow}`) {
            (displayedImageId + 1) <= images.length - 1
                ? setDisplayedImageId(displayedImageId + 1)
                : setDisplayedImageId(0);
        }
    }

    return (
        <>
            <div className={styles.carousel}>
                <button 
                    className={styles.leftArrow}
                    onClick={(e) => handleChangeImage(
                        e.target.closest("button")
                    )} 
                    type="button"
                >
                    <Icon 
                        className={`${styles.arrow} ${styles.filter}`} 
                        path={mdiChevronLeft} 
                    />
                </button>
                <div className={styles.imgWrapper}>
                    <img 
                        className={styles.productImage} 
                        src={`${images[displayedImageId]}`} 
                        alt="" 
                    />
                </div>
                <button 
                    className={styles.rightArrow}
                    onClick={(e) => handleChangeImage(
                        e.target.closest("button")
                    )} 
                    type="button"
                >
                    <Icon 
                        className={`${styles.arrow} ${styles.filter}`} 
                        path={mdiChevronRight} 
                    />
                </button>
                <div className={styles.circlesWrapper}>
                    {images.map((_, index) => {
                        if (index === displayedImageId) {
                            return (
                                <Icon 
                                    className={`${styles.circle} ${styles.filter}`} 
                                    path={mdiCircle} 
                                    key={index}
                                />
                            )
                        } else {
                            return (
                                <Icon 
                                    className={`${styles.circle} ${styles.filter}`} 
                                    path={mdiCircleOutline} 
                                    key={index}
                                />
                            )
                        }
                    })}
                </div>
            </div>
        </>
    )
}

ImageCarousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default ImageCarousel;