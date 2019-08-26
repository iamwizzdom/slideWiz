/**
 * Name: slideWiz
 * Description: A slide-show library running on JQuery
 * Author: Wisdom Emenike
 * License: MIT
 * Version: 1.1.0
 * GitHub: https://github.com/iamwizzdom/slideWiz
 */

/**
 *
 * @param e
 */
$.fn.slideWiz = function (e) {

    /**
     *
     * @param element
     * @param e
     */
    const slideWiz = (element, e) => {

        'use strict';
        const FORWARD = 0;
        const BACKWARD = 1;

        /**
         *
         * @param variable
         * @returns {string}
         */
        const getType = (variable) => typeof variable;

        /**
         *
         * @param variable
         * @returns {boolean}
         */
        const isUndefined = (variable) => typeof variable === "undefined";

        /**
         *
         * @param variable
         * @returns {boolean}
         */
        const isBoolean = (variable) => typeof variable === "boolean";

        /**
         *
         * @param variable
         * @returns {boolean}
         */
        const isNumeric = (variable) => isNaN(variable) === false;

        /**
         *
         * @param variable
         * @returns {boolean}
         */
        const isArray = (variable) => Array.isArray(variable);

        /**
         *
         * @param variable
         * @returns {boolean}
         */
        const isObject = (variable) => typeof variable === "object";

        /**
         *
         * @param variable
         * @returns {boolean}
         */
        const isString = (variable) => typeof variable === "string";

        /**
         *
         * @param array
         * @param search
         * @returns {boolean}
         */
        const inArray = (array, search) => {
            if (!isArray(array)) throw "inArray expects" +
            " its first parameter to be an array";
            for (let x in array)
                if (array.hasOwnProperty(x))
                    if (array[x] === search) return true;
            return false;
        };

        /**
         *
         * @param animation
         * @returns {boolean}
         */
        const isValidAnimation = (animation) => inArray([
            'flip',
            'slice',
            'card',
            'fade',
            'box3D',
            'glide',
            'pixel'
        ], animation);

        /**
         *
         * @param array
         * @returns {object}
         */
        const arrayShuffle = (array) => {
            if (!isArray(array)) throw "arrayShuffle expects an array";
            let size = array.length, x;
            for (x in array) {
                let j = Math.floor((Math.random() * size));
                let random = array[j];
                if (array.hasOwnProperty(x)) {
                    array[j] = array[x];
                    array[x] = random;
                }
            }
            return array;
        };

        if (!isBoolean(e.auto)) throw "slideWiz expects the 'auto' attribute to be a boolean, " + getType(e.auto) + " given.";

        if (!isNumeric(e.speed) || e.speed < 1000) throw "slideWiz expects the 'speed' attribute to be numeric milliseconds starting from 1000, " + getType(e.speed) + " given.";

        if (!isString(e.animation) && !isArray(e.animation)) throw "slideWiz expects the 'animation' attribute to be a string or an array, " + getType(e.animation) + " given.";

        if (!isArray(e.file)) throw "slideWiz expects the 'file' attribute to be an array, " + getType(e.file) + " parsed.";

        if (!isUndefined(e.col) && !isNumeric(e.col)) throw "slideWiz expects the 'col' attribute to be numeric, " + getType(e.col) + " given.";

        if (!isUndefined(e.row) && !isNumeric(e.row)) throw "slideWiz expects the 'row' attribute to be numeric, " + getType(e.row) + " given.";

        e.animation = (isArray(e.animation) ? arrayShuffle(e.animation)[0] : e.animation);

        let move = true, position = 0, xTimeout = null, xxTimeout = null, pixelType = 0, pixelArray = [],
            col = (isNumeric(e.col) ? e.col : 30), row = (isNumeric(e.row) ? e.row : 6);

        const initSlide = () => {
            if (getMove() === true) slide(FORWARD);
        };

        if (isString(e.animation) && !isValidAnimation(e.animation)) throw "unsupported animation '" + e.animation + "'";

        /**
         *
         * @param index
         */
        const setPosition = (index) => {
            position = index;
        };

        /**
         *
         * @returns {number}
         */
        const getPosition = () => position;

        /**
         *
         * @param status
         */
        const setMove = (status) => {
            move = status;
        };

        /**
         *
         * @returns {boolean}
         */
        const getMove = () => move;

        /**
         *
         * @param position
         * @returns {void|*|jQuery}
         */
        const getMainImage = (position) => $('<img>').attr("src", e.file[position].src.main);

        /**
         *
         * @param position
         * @returns {void|*|jQuery}
         */
        const getCoverImage = (position) => $('<div>').attr("class", e.animation).append(
            $('<img>').attr("src", e.file[position].src.cover)
        );

        /**
         *
         * @param position
         * @returns {*}
         */
        const getDetail = (position) => {

            let slideDetailBox = $('<div>');

            if (isString(e.file[position].title)) {
                slideDetailBox.append(
                    $('<h3>').attr("class", "detail-title").html(e.file[position].title)
                );
            }

            if (isString(e.file[position].desc)) {

                let desc = e.file[position].desc, descSize = desc.length,
                    maxLength = (isNumeric(e.file[position].descLength) ?
                        (e.file[position].descLength > descSize ? descSize : e.file[position].descLength) : 130),
                    descShort = desc.substring(0, maxLength);

                slideDetailBox.append(
                    $('<span>').attr("class", "detail-desc").html(
                        descShort.substring(0, (descSize <= maxLength ? descSize : descShort.lastIndexOf(" "))) +
                        (descSize > maxLength ? "..." : "")
                    )
                );

            }

            if (isObject(e.file[position].button)) {

                if (isString(e.file[position].button.url)) {

                    slideDetailBox.append(
                        $('<a>').attr({'href': e.file[position].button.url, 'target': '_blanck'}).html(
                            $('<button>').attr({
                                class: "detail-button " + (isString(e.file[position].button.class) ?
                                    e.file[position].button.class : "")
                            }).html((
                                isString(e.file[position].button.text) ?
                                    e.file[position].button.text : "Button"
                            ))
                        )
                    );

                } else {

                    slideDetailBox.append(
                        $('<button>').attr({
                            class: "detail-button " + (isString(e.file[position].button.class) ?
                                e.file[position].button.class : "")
                        }).html((
                            isString(e.file[position].button.text) ?
                                e.file[position].button.text : "Button"
                        ))
                    );

                }
            }
            return slideDetailBox.children();
        };

        /**
         *
         * @param direction
         * @returns {boolean}
         */
        const slide = (direction) => {

            if (getMove() !== true) return false;

            setMove(false);

            if (xTimeout !== null) clearTimeout(xTimeout);

            let slideHolder = $('.slide-container .slide-holder'),
                slideContainer = $('.slide-container'),
                slideDetailBox = $('.slide-container .detail-box'),
                slideHolderChildren = slideHolder.children(),
                slideHolderChildrenLength = slideHolderChildren.length,
                slideDetailBoxHeight = 0,
                slideContainerHeight = slideContainer.innerHeight(),
                slideHolderHeight = slideHolder.innerHeight(),
                slideHolderMaxWidth = slideHolder.width(),
                slideHolderMaxHeight = slideHolder.height(),
                slideHolderMinWidth = (slideHolderMaxWidth / col),
                slideHolderMinHeight = (slideHolderMaxHeight / row),
                column = 0, columnX = 0, timeoutX = null,
                timeoutXX = null, timeoutXXX = null, position,
                firstRunner, secondRunner, thirdRunner, fourthRunner;

            switch (e.animation) {
                case"card":

                    if (direction === FORWARD) {

                        position = getPosition() === (e.file.length - 1) ? 0 : (getPosition() + 1);
                        slideHolder.append(getCoverImage(position).css('bottom', ('-' + slideHolderHeight + 'px')));

                    } else {

                        position = getPosition() === 0 ? (e.file.length - 1) : (getPosition() - 1);
                        slideHolder.prepend(getCoverImage(position).css('bottom', (slideHolderHeight + 'px')));

                    }

                    slideHolderChildren = slideHolder.children();
                    setPosition(position);

                    $('.slide-container .detail-box').css('bottom', '-' + slideContainerHeight + 'px');
                    $('.slide-container .main-image-box').css('top', '-320px');

                    if (direction === BACKWARD) {
                        $(slideHolderChildren[1]).css({
                            "z-index": "5"
                        });
                    }

                    timeoutX = setTimeout(() => {

                        $(slideHolderChildren[(direction === FORWARD ? 1 : 0)]).css({
                            'bottom': "0",
                            "z-index": "10"
                        });

                        timeoutXX = setTimeout(() => {

                            let position = getPosition();

                            slideDetailBox.html(
                                getDetail(position)
                            );

                            slideDetailBoxHeight = slideDetailBox.innerHeight();

                            slideDetailBox.css('bottom', ((slideContainerHeight - slideDetailBoxHeight) / 2));

                            if (isString(e.file[position].src.main)) {
                                $('.slide-container .main-image-box').html(
                                    getMainImage(position)
                                ).show().css('top', 50);
                            } else $('.slide-container .main-image-box').hide();

                            $(slideHolderChildren[(direction === FORWARD ? 0 : 1)]).detach();

                            setMove(true);
                            if (e.auto === true) xTimeout = setTimeout(initSlide, e.speed);
                            clearTimeout(timeoutX);
                            clearTimeout(timeoutXX);

                        }, 600);

                    }, 200);

                    break;

                case"fade":

                    if (direction === FORWARD) {

                        position = getPosition() === (e.file.length - 1) ? 0 : (getPosition() + 1);
                        slideHolder.append(getCoverImage(position).hide());

                    } else {

                        position = getPosition() === 0 ? (e.file.length - 1) : (getPosition() - 1);
                        slideHolder.prepend(getCoverImage(position).hide());

                    }

                    slideHolderChildren = slideHolder.children();
                    setPosition(position);

                    $('.slide-container .detail-box').css('bottom', '-' + slideContainerHeight + 'px');
                    $('.slide-container .main-image-box').css('top', '-320px');

                    timeoutX = setTimeout(() => {

                        $(slideHolderChildren[(direction === FORWARD ? 0 : 1)]).fadeOut(800, () => {

                            let position = getPosition();

                            slideDetailBox.html(
                                getDetail(position)
                            );

                            slideDetailBoxHeight = slideDetailBox.innerHeight();

                            slideDetailBox.css('bottom', ((slideContainerHeight - slideDetailBoxHeight) / 2));

                            if (isString(e.file[position].src.main)) {
                                $('.slide-container .main-image-box').html(
                                    getMainImage(position)
                                ).show().css('top', 50);
                            } else $('.slide-container .main-image-box').hide();

                            $(slideHolderChildren[(direction === FORWARD ? 1 : 0)]).fadeIn(800, () => {

                                $(slideHolderChildren[(direction === FORWARD ? 0 : 1)]).detach();

                                setMove(true);
                                if (e.auto === true) xTimeout = setTimeout(initSlide, e.speed);

                            });

                        });

                        clearTimeout(timeoutX);

                    }, 200);

                    break;

                case"box3D":

                    if (direction === FORWARD) {

                        position = getPosition() === (e.file.length - 1) ? 0 : (getPosition() + 1);
                        slideHolder.append(getCoverImage(position).hide());

                    } else {

                        position = getPosition() === 0 ? (e.file.length - 1) : (getPosition() - 1);
                        slideHolder.prepend(getCoverImage(position).hide());

                    }

                    slideHolderChildren = slideHolder.children();
                    setPosition(position);

                    $('.slide-container .detail-box').css('bottom', '-' + slideContainerHeight + 'px');
                    $('.slide-container .main-image-box').css('top', '-320px');

                    timeoutX = setTimeout(() => {

                        if (direction === FORWARD) {

                            $(slideHolderChildren[1]).show().children('img').css('object-fit', 'cover');

                        } else {

                            $(slideHolderChildren[1]).children('img').css('object-fit', '');

                        }

                        const callback = () => {

                            let position = getPosition();

                            slideDetailBox.html(
                                getDetail(position)
                            );

                            slideDetailBoxHeight = slideDetailBox.innerHeight();

                            slideDetailBox.css('bottom', ((slideContainerHeight - slideDetailBoxHeight) / 2));

                            if (isString(e.file[position].src.main)) {
                                $('.slide-container .main-image-box').html(
                                    getMainImage(position)
                                ).show().css('top', 50);
                            } else $('.slide-container .main-image-box').hide();

                            if (direction === BACKWARD) $(slideHolderChildren[0]).children('img').css('object-fit', 'cover');

                            $(slideHolderChildren[(direction === FORWARD ? 0 : 1)]).detach();

                            setMove(true);
                            if (e.auto === true) xTimeout = setTimeout(initSlide, e.speed);

                        };

                        if (direction === FORWARD) {

                            $(slideHolderChildren[0]).slideUp(1000, callback).children('img').css('object-fit', '');

                        } else {

                            $(slideHolderChildren[0]).slideDown(1000, callback);

                        }

                        clearTimeout(timeoutX);

                    }, 200);

                    break;

                case"glide":

                    if (direction === FORWARD) {

                        position = getPosition() === (e.file.length - 1) ? 0 : (getPosition() + 1);
                        slideHolder.append(getCoverImage(position).css('left', '-' + slideHolderMaxWidth + 'px'));

                    } else {

                        position = getPosition() === 0 ? (e.file.length - 1) : (getPosition() - 1);
                        slideHolder.prepend(getCoverImage(position).css('left', slideHolderMaxWidth + 'px'));

                    }

                    slideHolderChildren = slideHolder.children();
                    setPosition(position);

                    $('.slide-container .detail-box').css('bottom', '-' + slideContainerHeight + 'px');
                    $('.slide-container .main-image-box').css('top', '-320px');

                    if (direction === BACKWARD) {
                        $(slideHolderChildren[1]).css({
                            "z-index": "5"
                        });
                    }

                    timeoutX = setTimeout(() => {

                        $(slideHolderChildren[(direction === FORWARD ? 1 : 0)]).css({
                            'left': "0",
                            "z-index": "10"
                        });

                        timeoutXX = setTimeout(() => {

                            let position = getPosition();

                            slideDetailBox.html(
                                getDetail(position)
                            );

                            slideDetailBoxHeight = slideDetailBox.innerHeight();

                            slideDetailBox.css('bottom', ((slideContainerHeight - slideDetailBoxHeight) / 2));

                            if (isString(e.file[position].src.main)) {
                                $('.slide-container .main-image-box').html(
                                    getMainImage(position)
                                ).show().css('top', 50);
                            } else $('.slide-container .main-image-box').hide();

                            $(slideHolderChildren[(direction === FORWARD ? 0 : 1)]).detach();

                            setMove(true);
                            if (e.auto === true) xTimeout = setTimeout(initSlide, e.speed);
                            clearTimeout(timeoutX);
                            clearTimeout(timeoutXX);

                        }, 600);

                    }, 200);

                    break;

                case"slice":

                    if (direction === FORWARD) {

                        position = getPosition() === (e.file.length - 1) ? 0 : (getPosition() + 1);

                    } else {

                        position = getPosition() === 0 ? (e.file.length - 1) : (getPosition() - 1);
                        column = (col - 1);
                        columnX = (col - 1);

                    }

                    firstRunner = () => {

                        if (timeoutXXX !== null) clearTimeout(timeoutXXX);

                        if ((direction === BACKWARD ? columnX >= 0 : columnX <= slideHolderChildrenLength)) {

                            $(slideHolderChildren[columnX]).css({
                                width: slideHolderMinWidth + 'px',
                                top: (slideHolderMaxHeight + 10) + 'px'
                            }).children('img').css({
                                width: slideHolderMaxWidth + 'px',
                                'margin-left': '-' + (slideHolderMinWidth * columnX) + 'px'
                            });

                            direction === BACKWARD ? columnX-- : columnX++;
                            timeoutXXX = setTimeout(firstRunner, 30);

                        } else {
                            secondRunner();
                        }

                    };

                    firstRunner();

                    $('.slide-container .detail-box').css('bottom', '-' + slideContainerHeight + 'px');
                    $('.slide-container .main-image-box').css('top', '-320px');

                    secondRunner = () => {

                        setPosition(position);

                        timeoutX = setTimeout(() => {

                            let position = getPosition();

                            thirdRunner = () => {

                                if (timeoutXXX !== null) clearTimeout(timeoutXXX);

                                if ((direction === BACKWARD ? column >= 0 : column <= slideHolderChildrenLength)) {

                                    $(slideHolderChildren[column]).css({
                                        width: (slideHolderMinWidth + 'px'),
                                        top: 0
                                    }).children('img').css({
                                        width: (slideHolderMaxWidth + 'px'),
                                        'margin-left': ('-' + (slideHolderMinWidth * column) + 'px')
                                    }).attr('src', e.file[position].src.cover);

                                    direction === BACKWARD ? column-- : column++;
                                    timeoutXXX = setTimeout(thirdRunner, 30);

                                } else {
                                    fourthRunner();
                                }
                            };

                            thirdRunner();

                            fourthRunner = () => {

                                timeoutXX = setTimeout(() => {

                                    slideDetailBox.html(
                                        getDetail(position)
                                    );

                                    slideDetailBoxHeight = slideDetailBox.innerHeight();

                                    slideDetailBox.css('bottom', ((slideContainerHeight - slideDetailBoxHeight) / 2));

                                    if (isString(e.file[position].src.main)) {

                                        $('.slide-container .main-image-box').html(
                                            getMainImage(position)
                                        ).show().css('top', 50);
                                    } else $('.slide-container .main-image-box').hide();

                                    setMove(true);
                                    if (e.auto === true) xTimeout = setTimeout(initSlide, e.speed);
                                    clearTimeout(timeoutX);
                                    clearTimeout(timeoutXX);
                                    clearTimeout(timeoutXXX);

                                }, 300);

                            };

                        }, 200);

                    };

                    break;

                case"flip":

                    if (direction === FORWARD) {

                        position = getPosition() === (e.file.length - 1) ? 0 : (getPosition() + 1);

                    } else {

                        position = getPosition() === 0 ? (e.file.length - 1) : (getPosition() - 1);
                        column = (col - 1);

                    }

                    $('.slide-container .detail-box').css('bottom', '-' + slideContainerHeight + 'px');
                    $('.slide-container .main-image-box').css('top', '-320px');

                    secondRunner = () => {

                        setPosition(position);

                        timeoutX = setTimeout(() => {

                            let position = getPosition();

                            thirdRunner = () => {

                                if (timeoutXXX !== null) clearTimeout(timeoutXXX);

                                if ((direction === BACKWARD ? column >= 0 : column <= slideHolderChildrenLength)) {

                                    $(slideHolderChildren[column]).addClass('flipper').children('img').css({
                                        width: (slideHolderMaxWidth + 'px'),
                                        'margin-left': ('-' + (slideHolderMinWidth * column) + 'px')
                                    }).attr('src', e.file[position].src.cover);

                                    direction === BACKWARD ? column-- : column++;

                                    timeoutXXX = setTimeout(thirdRunner, (
                                        direction === BACKWARD ?
                                            (column >= 1 ? 40 : 200) :
                                            (column <= (slideHolderChildrenLength - 1) ? 40 : 200)
                                    ));

                                } else {
                                    slideHolderChildren.removeClass('flipper');
                                    fourthRunner();
                                }
                            };

                            thirdRunner();

                            fourthRunner = () => {

                                timeoutXX = setTimeout(() => {

                                    slideDetailBox.html(
                                        getDetail(position)
                                    );

                                    slideDetailBoxHeight = slideDetailBox.innerHeight();

                                    slideDetailBox.css('bottom', ((slideContainerHeight - slideDetailBoxHeight) / 2));

                                    if (isString(e.file[position].src.main)) {
                                        $('.slide-container .main-image-box').html(
                                            getMainImage(position)
                                        ).show().css('top', 50);
                                    } else $('.slide-container .main-image-box').hide();

                                    clearTimeout(timeoutX);
                                    clearTimeout(timeoutXX);
                                    clearTimeout(timeoutXXX);

                                    setMove(true);
                                    if (e.auto === true) xTimeout = setTimeout(initSlide, e.speed);

                                }, 300);

                            };

                        }, 300);

                    };

                    secondRunner();

                    break;

                case 'pixel':

                    if (direction === FORWARD) {

                        position = getPosition() === (e.file.length - 1) ? 0 : (getPosition() + 1);

                    } else {

                        position = getPosition() === 0 ? (e.file.length - 1) : (getPosition() - 1);

                    }

                    $('.slide-container .detail-box').css('bottom', '-' + slideContainerHeight + 'px');
                    $('.slide-container .main-image-box').css('top', '-320px');

                    setPosition(position);

                    timeoutX = setTimeout(() => {

                        let position = getPosition();

                        pixelArray = arrayShuffle(pixelArray);
                        slideHolderChildrenLength = pixelArray.length;

                        let slideImageHeight = $(slideHolderChildren[0]).children('img').innerHeight();

                        firstRunner = () => {

                            if (column < slideHolderChildrenLength) {

                                let pixel = pixelArray[column], pixelIndex = pixel['index'],
                                    pixelPosition = pixel['position'], pixelBatch = pixel['batch'],
                                    pixelWidth = 0, pixelMarginLeft = 0, pixelMarginTop = 0;

                                if (slideImageHeight < slideHolderMaxHeight) {

                                    slideImageHeight = (slideImageHeight + (slideHolderMaxHeight - slideImageHeight));
                                    pixelWidth = (slideHolderMaxHeight - slideImageHeight);
                                    pixelMarginLeft = (pixelWidth / 2);

                                } else if (slideImageHeight > slideHolderMaxHeight) {

                                    pixelMarginTop = ((slideImageHeight - slideHolderMaxHeight) / 2);

                                }

                                $(slideHolderChildren[pixelIndex]).addClass((pixelType === 0 ? 'pixel-scale' : 'pixel-rotate')).css({
                                    'width': (slideHolderMinWidth + 'px'),
                                    'height': (slideHolderMinHeight + 'px')
                                }).children('img').css({
                                    'width': ((slideHolderMaxWidth + pixelWidth) + 'px'),
                                    'height': (slideImageHeight + 'px'),
                                    'margin-left': ('-' + ((slideHolderMinWidth * pixelPosition) + pixelMarginLeft) + 'px'),
                                    'margin-top': ('-' + (pixelBatch > 0 ? ((slideHolderMinHeight * pixelBatch) + pixelMarginTop) : pixelMarginTop) + 'px')
                                }).attr('src', e.file[position].src.cover);

                                timeoutXXX = setTimeout(firstRunner, (column < (slideHolderChildrenLength - 1) ? 10 : 200));
                                column++;

                            } else {
                                slideHolderChildren.removeClass((pixelType === 0 ? 'pixel-scale' : 'pixel-rotate'));
                                secondRunner();
                            }

                        };

                        firstRunner();

                        secondRunner = () => {

                            timeoutXX = setTimeout(() => {

                                slideDetailBox.html(
                                    getDetail(position)
                                );

                                slideDetailBoxHeight = slideDetailBox.innerHeight();

                                slideDetailBox.css('bottom', ((slideContainerHeight - slideDetailBoxHeight) / 2));

                                if (isString(e.file[position].src.main)) {
                                    $('.slide-container .main-image-box').html(
                                        getMainImage(position)
                                    ).show().css('top', 50);
                                } else $('.slide-container .main-image-box').hide();

                                pixelType = (pixelType === 0 ? 1 : 0);

                                setMove(true);
                                if (e.auto === true) xTimeout = setTimeout(initSlide, e.speed);

                                clearTimeout(timeoutX);
                                clearTimeout(timeoutXX);
                                clearTimeout(timeoutXXX);

                            }, 300);

                        };

                    }, 200);

                    break;
            }
        };

        let slideContainerObject = $('<div>').attr('class', 'slide-container'),
            slideHolderObject = $('<div>').attr("class", "slide-holder"),
            mainImageBoxObject = $('<div>').attr('class', 'main-image-box'),
            slideDetailBoxObject = $('<div>').attr('class', 'detail-box'), i = 0;

        if (e.animation === 'slice' || e.animation === 'flip') {

            for (; i < col; i++) slideHolderObject.append(getCoverImage(0));

        } else if (e.animation === 'pixel') {

            for (let r = (col * row); i < r; i++) slideHolderObject.append(getCoverImage(0));

        } else {

            slideHolderObject.append(getCoverImage(0).css({
                'z-index': 10,
                'bottom': '0'
            }).children('img').css('object-fit', 'cover').parent());

        }

        if (isString(e.file[0].src.main)) mainImageBoxObject.append(getMainImage(0));

        slideDetailBoxObject.append(getDetail(0));

        $(element).append(slideContainerObject.append(slideHolderObject)
            .append(mainImageBoxObject).append(slideDetailBoxObject).append(
                $('<button>').attr({
                    class: "half-circle-prev",
                    title: "Previous"
                }).html(
                    $('<span>').html("&#10094;")
                ).click(() => {

                    if (getMove() === true) slide(BACKWARD);

                })
            ).append(
                $('<button>').attr({
                    class: "half-circle-next",
                    title: "Next"
                }).html(
                    $('<span>').html("&#10095;")
                ).click(() => {

                    if (getMove() === true) slide(FORWARD);

                })
            ));

        let slideDelay = setTimeout(() => {

            let slideHolderMaxWidth = $('.slide-holder').width(), slideHolderMaxHeight = $('.slide-holder').height(),
                slideHolderMinWidth = (slideHolderMaxWidth / col), slideHolderMinHeight = (slideHolderMaxHeight / row),
                slideHolderChildren = $('.slide-holder').children('div'),
                slideHolderChildrenLength = slideHolderChildren.length,
                slideImageHeight = $(slideHolderChildren[0]).children('img').innerHeight(), i = 0, x = col, p = 0,
                b = 0;

            const init = () => {

                let detail_box = $('.slide-container .detail-box'),
                    slide_container = $('.slide-container'),
                    container_height = slide_container.innerHeight(),
                    detail_height = detail_box.innerHeight();

                detail_box.css('bottom', ((container_height - detail_height) / 2));
                if (isString(e.file[0].src.main)) mainImageBoxObject.show().css('top', 50);
                else mainImageBoxObject.hide();

                if (e.auto === true) {

                    xxTimeout = setTimeout(() => {
                        initSlide();
                        clearTimeout(xxTimeout);
                    }, e.speed);

                }

                clearTimeout(slideDelay);
            };

            if (e.animation === 'slice') {

                for (; i < slideHolderChildrenLength; i++) {

                    $(slideHolderChildren[i]).css({width: slideHolderMinWidth + 'px', top: 0}).children('img').css({
                        width: slideHolderMaxWidth + 'px',
                        'margin-left': '-' + (slideHolderMinWidth * i) + 'px'
                    });

                    if (i >= (slideHolderChildrenLength - 1)) init();

                }

            } else if (e.animation === 'flip') {

                for (; i < slideHolderChildrenLength; i++) {

                    $(slideHolderChildren[i]).css('width', (slideHolderMinWidth + 'px')).children('img').css({
                        width: slideHolderMaxWidth + 'px',
                        'margin-left': '-' + (slideHolderMinWidth * i) + 'px'
                    });

                    if (i >= (slideHolderChildrenLength - 1)) init();

                }

            } else if (e.animation === 'pixel') {

                for (; i < slideHolderChildrenLength; i++) {

                    if (i >= x) {
                        x = x + col;
                        p = 0;
                        b++;
                    }

                    let pixelMap = [], pixelWidth = 0, pixelMarginLeft = 0, pixelMarginTop = 0;

                    pixelMap['index'] = i;
                    pixelMap['position'] = p;
                    pixelMap['batch'] = b;

                    if (slideImageHeight < slideHolderMaxHeight) {

                        slideImageHeight = (slideImageHeight + (slideHolderMaxHeight - slideImageHeight));
                        pixelWidth = (slideHolderMaxHeight - slideImageHeight);
                        pixelMarginLeft = (pixelWidth / 2);

                    } else if (slideImageHeight > slideHolderMaxHeight) {

                        pixelMarginTop = ((slideImageHeight - slideHolderMaxHeight) / 2);

                    }

                    $(slideHolderChildren[i]).css({
                        'width': (slideHolderMinWidth + 'px'),
                        'height': (slideHolderMinHeight + 'px')
                    }).children('img').css({
                        'width': ((slideHolderMaxWidth + pixelWidth) + 'px'),
                        'height': (slideImageHeight + 'px'),
                        'margin-left': ('-' + ((slideHolderMinWidth * p++) + pixelMarginLeft) + 'px'),
                        'margin-top': ('-' + (b > 0 ? ((slideHolderMinHeight * b) + pixelMarginTop) : pixelMarginTop) + 'px')
                    });

                    pixelArray.push(pixelMap);

                    if (i >= (slideHolderChildrenLength - 1)) init();

                }

            } else {
                init();
            }

        }, 300);

    };

    try {

        slideWiz(this, e);

    } catch (e) {

        console.error("slideWiz: " + e);

    }

};