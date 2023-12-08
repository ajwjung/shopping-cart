import { useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight, mdiCircle, mdiCircleOutline, mdiClose } from '@mdi/js';
import styles from "./ImageCarousel.module.css";

function ImageCarousel({ images, wrapperClassName, imgWrapperClassName, imgClassName }) {
    const pageParam = useParams();
    const [displayedImageId, setDisplayedImageId] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    function handleChangeImage(arrowBtn) {
        if (arrowBtn.className === `${styles.leftArrow}`
        || arrowBtn.className === `${styles.fullLeftArrow}`) {
            (displayedImageId - 1) >= 0 
                ? setDisplayedImageId(displayedImageId - 1)
                : setDisplayedImageId(images.length - 1);
        } else if (arrowBtn.className === `${styles.rightArrow}`
        || arrowBtn.className === `${styles.fullRightArrow}`) {
            (displayedImageId + 1) <= images.length - 1
                ? setDisplayedImageId(displayedImageId + 1)
                : setDisplayedImageId(0);
        }
    }

    function toggleFullImageVisibility() {
        setIsVisible(!isVisible);
    }

    return (
        <>
            <div className={wrapperClassName}>
                <button 
                    className={styles.leftArrow}
                    onClick={(e) => handleChangeImage(
                        e.target.closest("button")
                    )}
                    aria-label="View previous product image"
                    type="button"
                >
                    <Icon 
                        className={`${styles.arrow} ${styles.filter}`} 
                        path={mdiChevronLeft} 
                    />
                </button>
                <div className={imgWrapperClassName}>
                    <img 
                        onClick={toggleFullImageVisibility} 
                        className={imgClassName} 
                        src={`${images[displayedImageId]}`} 
                        alt="Product image" 
                    />
                </div>
                {/* Only allow viewing full sized images on product page */}
                {Object.keys(pageParam)[0] === "productId" &&
                    <div className={isVisible ? styles.overlay : styles.hidden}></div>
                }
                {Object.keys(pageParam)[0] === "productId" &&
                    <div className={isVisible ? styles.fullViewWrapper : styles.hidden}>
                        <div className={styles.fullImageWrapper}>
                            <img
                                className={styles.fullImage}
                                src={`${images[displayedImageId]}`}
                                alt="Full sized product image"
                            />
                        </div>
                        <div className={styles.btnsContainer}>
                            <button 
                                onClick={toggleFullImageVisibility} 
                                className={styles.closeFullImgBtn} 
                                aria-label="Exit full view mode"
                                type="button"
                            >
                                <Icon className={styles.closeFullImgSvg} path={mdiClose} />
                            </button>
                            <div className={styles.arrowsWrapper}>
                                <button
                                    className={styles.fullLeftArrow}
                                    onClick={(e) => handleChangeImage(
                                        e.target.closest("button")
                                    )}
                                    aria-label="View previous product image"
                                    type="button"
                                >
                                    <Icon
                                        className={`${styles.fullViewArrow} ${styles.filter}`}
                                        path={mdiChevronLeft}
                                    />
                                </button>
                                <button
                                    className={styles.fullRightArrow}
                                    onClick={(e) => handleChangeImage(
                                        e.target.closest("button")
                                    )}
                                    aria-label="View next product image"
                                    type="button"
                                >
                                    <Icon
                                        className={`${styles.fullViewArrow} ${styles.filter}`}
                                        path={mdiChevronRight}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                }
                <button 
                    className={styles.rightArrow}
                    onClick={(e) => handleChangeImage(
                        e.target.closest("button")
                    )}
                    aria-label="View next product image"
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

ImageCarousel.defaultProps = {
    wrapperClassName: styles.carousel,
    imgWrapperClassName: styles.imgWrapper,
    imgClassName: styles.productImage,
}

ImageCarousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    wrapperClassName: PropTypes.string.isRequired,
    imgWrapperClassName: PropTypes.string.isRequired,
    imgClassName: PropTypes.string.isRequired,
}

export default ImageCarousel;