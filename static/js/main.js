$(document).ready(function () {
    const pageUrl = window.location.href;
    if (pageUrl.indexOf('login') !== -1) {
        if (pageUrl.indexOf('forget=true') !== -1) {
            $('.forget-container').css('display', 'flex');
        }
    }

    $(".all-orders-title").click(function (e) {
        e.stopPropagation();
        $(".select").toggle();
    });

    /* Filter section codes start  */

    let sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        checkedItemsValues,
        i,
        previousCheckedFilterName,
        previousCheckedName;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[1]) {
            checkedItemsValues = sParameterName[1].split(',');
            $("input[name='" + sParameterName[0] + "']").each(function (index, inputEL) {
                if (checkedItemsValues.indexOf(inputEL.value) !== -1) {
                    inputEL.checked = true;
                    if($(inputEL).closest('.submenu').css('display') === 'none') {
                        $(inputEL).closest('.submenu').css('display', 'block')
                    }
                    if($(inputEL).closest('.subfilter-container').css('display') === 'none') {
                        $(inputEL).closest('.subfilter-container').css('display', 'block')
                    }
                    if (sParameterName[0] !== 'size') {
                        previousCheckedFilterName = sParameterName[0];
                        previousCheckedName = sParameterName[0];

                        if (sParameterName[0] === 'clothes') {
                            $('.clothe-size-container').css('display', 'flex');
                            $('.shoes-size-container').css('display', 'none');
                            $('.aksesuar-size-container').css('display', 'none');
                        } else if (sParameterName[0] === 'clothes') {
                            $('.clothe-size-container').css('display', 'none');
                            $('.shoes-size-container').css('display', 'none');
                            $('.aksesuar-size-container').css('display', 'flex');
                        } else if (sParameterName[0] === 'shoes') {
                            $('.clothe-size-container').css('display', 'none');
                            $('.shoes-size-container').css('display', 'flex');
                            $('.aksesuar-size-container').css('display', 'none');
                        }
                    }
                }
            });
        }
    }

    $('.filter li').click(function () {
        $('.filter li').removeClass('selected');
        $(this).addClass('selected');
    });

    $('.subfilter-title').click(function () {
        if($(this).next().css('display') === 'none') {
            $(this).closest('.submenu').find("input[type='checkbox']:checked").each(function (index, item) {
                item.checked = false;
            });
        }
        $(this).next().find(".filter-item").each(function (index, item) {
            item.click();
        });
        $(this).next().slideToggle();
    });

    $('.filter-item').change(function () {
        console.log('changed');
        const mainUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        const filterName = $(this).attr('name');
        const filterValue = $(this).val();
        const filterChecked = $(this).prop("checked");
        let urlParams = window.location.search;

        if (filterName !== previousCheckedName) {
            if (filterName === 'clothes') {
                $('.clothe-size-container').css('display', 'flex');
                $('.shoes-size-container').css('display', 'none');
                $('.aksesuar-size-container').css('display', 'none');
            } else if (filterName === 'clothes') {
                $('.clothe-size-container').css('display', 'none');
                $('.shoes-size-container').css('display', 'none');
                $('.aksesuar-size-container').css('display', 'flex');
            } else if (filterName === 'shoes') {
                $('.clothe-size-container').css('display', 'none');
                $('.shoes-size-container').css('display', 'flex');
                $('.aksesuar-size-container').css('display', 'none');
            }
        }

        if (
            filterName !== 'size' &&
            (previousCheckedFilterName !== 'size' || previousCheckedName !== filterName) &&
            previousCheckedFilterName !== filterName &&
            previousCheckedFilterName !== undefined
        ) {
            $("input[name='" + previousCheckedName + "']:checked").each(function (index, obj) {
                obj.checked = false;
                urlParams = '';
            });
            $("input[name='size']:checked").each(function (index, obj) {
                obj.checked = false;
            });
        }

        if (urlParams) {
            let currentPageVariables = urlParams.split('&');
            let iterations = currentPageVariables.length;
            urlParams = '';

            for (let k = 0; k < currentPageVariables.length; k++) {

                if (filterChecked && currentPageVariables[k].indexOf(filterName) !== -1) {
                    if (k !== 0) {
                        urlParams += `&${currentPageVariables[k]},${filterValue}`;
                    } else {
                        urlParams += `${currentPageVariables[k]},${filterValue}`;
                    }

                } else if (!filterChecked && currentPageVariables[k].indexOf(filterName) !== -1) {

                    let sections = currentPageVariables[k].split('=');
                    let itemsArray = sections[1].split(',');
                    var j = itemsArray.indexOf(filterValue);
                    if (j !== -1) itemsArray.splice(j, 1);

                    if (itemsArray.length) {
                        if (k !== 0) {
                            urlParams += `&${sections[0]}=${itemsArray.join(',')}`
                        } else {
                            urlParams += `${sections[0]}=${itemsArray.join(',')}`
                        }

                    } else {
                        currentPageVariables[k] = '';
                    }

                } else if (filterChecked && !--iterations && window.location.search.indexOf(filterName) === -1) {
                    if (k !== 0) {
                        urlParams += `&${currentPageVariables[k]}&${filterName}=${filterValue}`;
                    } else {
                        urlParams += `${currentPageVariables[k]}&${filterName}=${filterValue}`;
                    }

                } else if (currentPageVariables[k].indexOf(filterName) === -1) {
                    if (k !== 0) {
                        if (currentPageVariables[0] === '') {
                            urlParams += `?${currentPageVariables[k]}`;
                        } else {
                            urlParams += `&${currentPageVariables[k]}`;
                        }

                    } else {
                        urlParams += `${currentPageVariables[k]}`;
                    }
                }
            }

        } else {
            urlParams += `?${filterName}=${filterValue}`;
        }

        window.history.replaceState({path: `${mainUrl}${urlParams}`}, '', `${mainUrl}${urlParams}`);
        sendReguest(window.location.href);
        if (filterName !== 'size') {
            previousCheckedName = filterName;
        }
        previousCheckedFilterName = filterName;
    });

    $(".size-top-section").click(function (e) {
        e.stopPropagation();
        $(".queue-ul").hide();
        $(".size-ul").slideToggle("slow");
    });

    $('.sort-filter-item').change(function () {
        const mainUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        let sortValue = $(this).val();
        let cUrl = window.location.search;

        if (cUrl) {
            if (cUrl.indexOf('sort_by') !== -1) {
                if (sortValue === 'asc') {
                    cUrl = cUrl.replace("desc", "asc");
                } else if (sortValue === 'desc') {
                    cUrl = cUrl.replace("asc", "desc");
                }
            } else {
                cUrl += `&sort_by=${$(this).val()}`;
            }
        } else {
            cUrl += `?sort_by=${$(this).val()}`
        }

        window.history.replaceState({path: `${mainUrl}${cUrl}`}, '', `${mainUrl}${cUrl}`);
        sendReguest(window.location.href);
    });

    /* Filter section codes end  */

    $('.container').click(function () {
        $('.select').hide();
        // $('.queue-ul').hide();
    });

    $(".dropdown-filter-item").click(function (event) {
        $(event.target).next('.submenu').slideToggle('slow', function () {
        });
    });

    $(".queue-top-container").click(function (e) {
        e.stopPropagation();
        $(".size-ul").hide();
        $(".queue-ul").slideToggle("slow");
    });


    $('.size-radios .radio-wrapper').click(function () {
        if (!$(this).hasClass('deactivate')) {
            $('.size-radios .radio-wrapper').removeClass('active');
            $(this).addClass('active');
        }
    });


    $('.buy').click(function () {
        if ($('.color input').is(':checked') && $('.radio-wrapper input').is(':checked')) {
            $(".alert").removeClass('flex-alert');
        } else if ($('.radio-wrapper input').length) {
            if ($('.color input').is(':checked')) {
                $(".alert").removeClass('flex-alert');
            } else {
                $(".alert p").text("Rəng seçilməyib");
                $(".alert").addClass('flex-alert');
            }
        }
        else {
            $(".alert").addClass('flex-alert');
            // setTimeout(function(){
            //     $(".alert").removeClass('flex-start');
            //     },5000);
        }
    });

    $('.exit-icon').click(function () {
        $(".alert").removeClass('flex-alert');
    });

    $('.close-alert').click(function () {
        $(this).parent('.alert-container').hide();
    })


    $(".registration-btn").click(function () {
        $('.upper-side input').filter(function () {
            if ($.trim(this.value).length == 0) {
                $(this).css("border", "1px solid #E4013A");
                $(this).attr("placeholder", "Bu xana boş buraxıla bilməz");
                $(this).val('');
                $(this).addClass('pink-text');
            } else {
                $(this).css("border", "1px solid #DCDCDC");
            }
        });
    });


    /*
    * Header menu hover codes start
    * */

    $(".menu-item").hover(function () {
        const activeClassName = 'active';

        $(this).children('.submenu-container').css('display', 'flex');
        $(this).find('.submenu-content').css('height', 'min-content');
        $(this).find('.main-menu > span').css('border-top', '0.1rem solid #272727');
        $(".age-filter-item").removeClass(activeClassName);
        $(".age-filter-item:first-child").addClass(activeClassName);
    });
    $(".menu-item").mouseleave(function () {
        $(this).children('.submenu-container').css('display', 'none');
        $(this).find('.submenu-content').css('height', '0rem');
        $(this).find('.main-menu > span').css('border-top', '0.1rem solid #ffffff');
    });

    $(".menu-item .submenu-content").mouseleave(function () {
        $(this).parent('.submenu-container').css('display', 'none');
    });

    $(".age-filter-item").hover(function () {
        const className = 'active';
        if (!$(this).hasClass(className)) {
            $(".age-filter-item").removeClass(className);
            $(this).addClass(className);
        }
        //$(this).addClass('active')
    })

    /*
    * Header menu hover codes end
    * */

    /*
    * Header scroll css codes start
    * */

    let loadedScroll = $(window).scrollTop();
    defineHeaderType(loadedScroll);

    $(document.body).on('touchmove', onScroll); // for mobile
    $(window).on('scroll', onScroll);

    function onScroll() {
        let scroll = $(window).scrollTop();
        defineHeaderType(scroll);
    }

    function defineHeaderType(scroll) {
        const className = 'scrolled';

        if (scroll > 25) {
            addClass('.forget-container', className);
            addClass('.header-content-top', className);
            addClass('.image-popup-container', className);
        } else {
            removeClass('.forget-container', className);
            removeClass('.header-content-top', className);
            removeClass('.image-popup-container', className);
        }
    }

    /*
    * Header scroll css codes end
    * */

    /* Header user and shopping icon hover start */

    $(".user-container").hover(function () {
        const activeClassName = 'active';
        removeClass('.shopping-container', activeClassName);
        addClass(this, activeClassName);
    });
    $(".shopping-container").hover(function () {
        const activeClassName = 'active';
        removeClass('.user-container', activeClassName);
        addClass(this, activeClassName);
    });
    $(".header-top-right").mouseleave(function () {
        const activeClassName = 'active';
        removeClass('.user-container', activeClassName);
        removeClass('.shopping-container', activeClassName);
    });
    $('.header-login-content.logged').mouseleave(function () {
        const activeClassName = 'active';
        removeClass('.user-logged-container', activeClassName);
    });
    $('.header-login-content.basket').mouseleave(function () {
        const activeClassName = 'active';
        removeClass('.shopping-container', activeClassName);
    });

    $('.header-search').hover(function () {
        const activeClassName = 'active';
        removeClass('.user-container', activeClassName);
        removeClass('.shopping-container', activeClassName);
    });

    /* Header user and shopping icon hover end */

    /* Header search icon container */
    $('.search-icon').click(function () {
        addClass($('.search-container'), 'active');
    });
    $('.close-search-form').click(function () {
        removeClass($('.search-container'), 'active');
    });
    /* Header search icon container */

    /* User Name hover start */
    $(".user-logged-container").hover(function () {
        const activeClassName = 'active';
        addClass(this, activeClassName);
        removeClass('.user-container', activeClassName);
        removeClass('.shopping-container', activeClassName);
    });
    $(".user-logged-container").mouseleave(function () {
        const activeClassName = 'active';
        removeClass(this, activeClassName);
    });
    /* User Name hover end */

    /* Forgot password modal start */

    $('.forget-password').click(function () {
        $('.forget-container').css('display', 'flex');
    });
    $('.close-forget-modal').click(function () {
        $('.forget-container').css('display', 'none');
    })

    /* Forgot password modal end */


    /* Mobile menu codes start */

    $('.header-mobil-menu-icon').click(function () {
        openCloseMobileMenu(this);
    });
    $('.mobile-main-menus a').click(function () {
        openCloseMobileMenu('.header-mobil-menu-icon');
    });
    $('.mobile-logged-menu').click(function () {
        openCloseMobileMenu('.header-mobil-menu-icon');
    });
    $('.mobile-login-link').click(function () {
        openCloseMobileMenu('.header-mobil-menu-icon');
    });
    $('.mobile-register-link').click(function () {
        openCloseMobileMenu('.header-mobil-menu-icon');
    });

    $('.with-submenu.show .menu-text').click(function () {
        const showClass = 'show';
        const activeClass = 'active';

        removeClass($('.with-submenu'), showClass);
        removeClass($('.with-submenu'), activeClass);

        $(this).parents('.with-submenu').each(function () {
            addClass($(this), activeClass);
        });
        $(this).parents('li').each(function () {
            addClass($(this), activeClass);
        });

        removeClass($('.menu-text'), activeClass);
        // addClass($(this).parent(), activeClass);
        addClass($(this), activeClass);

        removeClass($(this).next(), showClass);
        addClass($(this).next(), showClass);
    });

    $('.lang-menu-text').click(function () {
        const showClass = 'show';
        const activeClass = 'active';

        removeClass($('.lang-with-submenu'), showClass);
        removeClass($('.lang-with-submenu'), activeClass);

        $(this).parents('.lang-with-submenu').each(function () {
            addClass($(this), activeClass);
        });
        $(this).parents('li').each(function () {
            addClass($(this), activeClass);
        });

        removeClass($('.lang-menu-text'), activeClass);
        addClass($(this), activeClass);

        removeClass($(this).next(), showClass);
        addClass($(this).next(), showClass);
    });

    $('.back-menu').click(function (e) {
        e.stopPropagation();
        const showClass = 'show';
        const activeClass = 'active';

        removeClass($(this).parent().next(), showClass);
        removeClass($(this).parent(), activeClass);
        removeClass($(this).closest('li'), activeClass);
        removeClass($(this).closest('.with-submenu'), activeClass);

        addClass($(this).closest('.with-submenu'), showClass);
        addClass($(this).closest('.with-submenu').prev(), activeClass);
        addClass($(this).closest('.with-submenu').parent(), activeClass);
    });

    $('.lang-back-menu').click(function (e) {
        e.stopPropagation();
        const showClass = 'show';
        const activeClass = 'active';

        removeClass($(this).parent().next(), showClass);
        removeClass($(this).parent(), activeClass);
        removeClass($(this).closest('li'), activeClass);
        removeClass($(this).closest('.lang-with-submenu'), activeClass);

        addClass($(this).closest('.lang-with-submenu'), showClass);
        addClass($(this).closest('.lang-with-submenu').prev(), activeClass);
        addClass($(this).closest('.lang-with-submenu').parent(), activeClass);
    });


    /* Mobile menu codes end*/

    /* Mobile filter start */

    $('.mobile-filter-right').click(function () {
        $('.woman-collection-left').fadeIn();
        $('.queue-ul').fadeOut();
        $('.size-ul').fadeOut();
        $('body').css('overflow', 'hidden');
    });
    $('.close-mobile-filter').click(function () {
        $('.woman-collection-left').fadeOut();
        $('body').css('overflow', 'initial');
    });

    /* Mobile filter end */


    /* Reusable functions start */

    function openCloseMobileMenu(element) {
        $(".mobile-menu-section").fadeToggle();
        $(".mobile-menu-content").animate({width: 'toggle'}, 350);
        if ($(element).hasClass('opened')) {
            removeClass(element, 'opened');
            $(element).attr('src', 'http://127.0.0.1:8000/static/images/icons/mobile-menu-icon.svg');
        } else {
            addClass(element, 'opened');
            $(element).attr('src', 'http://127.0.0.1:8000/static/images/icons/mobile-close-icon.svg');
        }
    }

    function addClass(whereAdd, className) {
        if (!$(whereAdd).hasClass(className)) {
            $(whereAdd).addClass(className);
        }
    }

    function removeClass(whereAdd, className) {
        if ($(whereAdd).hasClass(className)) {
            $(whereAdd).removeClass(className);
        }
    }

    function toggleClass(whereAdd, className) {
        if ($(whereAdd).hasClass(className)) {
            $(whereAdd).removeClass(className);
        } else {
            $(whereAdd).addClass(className);
        }
    }

    /* Reusable functions end */

});
