/*!
 * Cinici main js
 * http://cinici.az/
 * @author
 * @author-url
 * @version 0.2.1
 * @updated 2020-06-29 */

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');

var ajax_send = false;

function show_snackbar(text) {
      var x = document.getElementById("snackbar");
      x.className = "show";
      x.innerText = text;
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
    }

// product filter ajax
if (window.location.href.indexOf('collection') > -1) {

    $('.back-to-top').click(function () {
        $('html, body').animate({
            scrollTop: 30
        }, 500);
    });
    if ($(window).scrollTop() > 400) {
        $('.back-to-top').fadeIn();
    }

    $(window).scroll(function () {
        if ($(window).scrollTop() > 400) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }

        let startLoadPlace = $(window).width() > 768 ? 200 : 1300;

        if ($(window).scrollTop() > ($(document).height() - $(window).height() - startLoadPlace)) {
            if (pageCount > page && !ajax_send) {
                ajax_send = true;
                let curl = window.location.search;
                if (curl) {
                    sendReguest(`${window.location.href}&page=${page + 1}`, true);
                } else {
                    sendReguest(`${window.location.href}?page=${page + 1}`, true);
                }

            }
        }
    });

    // sendReguest(window.location.href);
}

function sendReguest(url, autoLoad = false) {
    if (!autoLoad) {
        let loadingHtml = `
            <div class="loading-container">
               <img src="/static/cinici_new/images/icons/loader.svg" alt="loading" />
            </div>`;
        $('#products-container').html(loadingHtml);
    }

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json', // added data type
        success: function (res) {
            ajax_send = false;
            showProducts(res, autoLoad);
        }
    });


}

function showProducts(responseData, autoLoad) {
    let html = '';

    if (responseData.data.length) {
        page = responseData.currentPage;
        pageCount = responseData.pageCount;

        for (let item of responseData.data) {
            let price;
            if (item.hasOwnProperty('price')) {
                price = `<span>${item.price}</span>`;
            } else {
                price = `<span class="line-through">${item.oldPrice}</span><span class="pink">${item.newPrice}</span>`;
            }
            html += `
                        <a href="${item.url}" class="product-item">
                            <div class="product-image-container">
                                <img src="${item.image}" alt="${item.title}" />
                            </div>
                            <div>
                                <h5 class="name">${item.title}</h5>
                                <p class="code">Kod: ${item.code}</p>
                                <p class="price">
                                    ${price}    
                                </p>
                            </div>
                       </a>`;
        }

        html += `<div class="none-item"></div>`;

    } else {
        page = responseData.currentPage;
        pageCount = responseData.pageCount;
        html += `
                <div class="no-data">
                    <p>Axtarış kriteriyalarınıza uyğun məhsul tapılmadı.</p>
                </div>`

    }

    if (autoLoad) {
        $('.none-item').remove();
        $("#products-container").append(html);
    } else {
        $("#products-container").html(html);
    }
}

var checked_attr_name = "";
$(document).ready(function () {
    // ajax header setup
    $.ajaxSetup({
        headers: {
            'X-CSRFToken': csrftoken
        }
    });

    $(document).on("change", ".products-content input[type=radio]", function (e) {
        console.log("YESS");
        var checked_attr = $(this).val().split(" ");
        if (checked_attr_name === "") {
            checked_attr_name = $(this).attr("name");
        }
        var name_checked_attr = "input[type=radio][name=" + checked_attr_name + "]";
        $(name_checked_attr).change(function () {
            $('input[name=variant]').val("");
            $('input[type=radio]').prop('checked', false);
            $(name_checked_attr).prop('checked', false);
            $(this).prop('checked', true);
            $('input[type=radio]input[name!=' + checked_attr_name + ']').removeAttr('disabled');
        });
        var selector_list = '';
        for (var i = 0; i < checked_attr.length - 1; i++) {
            selector_list += "[value*=" + checked_attr[i] + "], ";
        }
        // $("input[type=radio]").not(selector_list.slice(0, -2)).not($(this)).attr('disabled', true);
        // if (checked_attr.length !== 3) {
        //     $("input[type=radio]" + selector_list.slice(0, -2)).prop('checked', true);
        // }
        $(name_checked_attr).removeAttr('disabled');
        if (checked_attr.length === 2) {
            var product_id = checked_attr[0];
            $('input[name=variant]').val(checked_attr[0]);
            $.ajax({
                url: '/getimage/?product=' + product_id,
                type: "GET",
                success: function (data) {
                    if (data) {
                        $(".products-content-left").html(data);
                        $('.large-product-slider').slick({
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            arrows: true,
                            fade: true,
                            asNavFor: '.small-product-slider',
                        });

                        $('.small-product-slider').slick({
                            vertical: true,
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            asNavFor: '.large-product-slider',
                            dots: false,
                            arrows: true,
                            centerMode: true,
                            focusOnSelect: true,
                            responsive: [
                                {
                                    breakpoint: 600,
                                    settings: {
                                        vertical: false,
                                        arrows: false,
                                        centerPadding: '10px'
                                    }
                                }
                            ]
                        });
                    }
                },
                error: function (xhr, errmsg, err) {
                    console.log(xhr.status + ": " + xhr.responseText);
                }
            });
        }
    });

    $(document).on("click", "#add_to_basket_form .buy", function (e) {
        e.preventDefault();
        var form = $(this).closest("form");
        var url = form.attr("action");
        var parent_product_id = $('input[name=variant]').val();
        var size_attr = $('.products-content .size-select');
        var color_attr = $('.products-content .color-select');
        var size_attr_leng = size_attr.length;
        var color_attr_leng = color_attr.length;
        var is_size_selected = $('.radio-wrapper input:checked')[0] !== undefined;
        var is_color_selected = $('.color input:checked')[0] !== undefined;
        var can_add_to_basket = true;
        if (size_attr_leng && !is_size_selected || color_attr_leng && !is_color_selected || (parent_product_id !== undefined && !parent_product_id)) {
            if (is_color_selected)
            {
                can_add_to_basket = true;
            }
            else
            {
                can_add_to_basket = false;
            }
        }
        var serialize = form.serialize();
        if (color_attr_leng) {
            var new_url = url.toString().split("/");
            var product_id = new_url[new_url.length === 6 ? 4 : 3];
            new_url[new_url.length === 6 ? 4 : 3] = parent_product_id;
            url = new_url.join("/");
            serialize = serialize + '&parent_product=' + product_id;
        }
        var message = $('#add_basket_error_nofication').text();
        var color_text = $("#add_basket_error_nofication_color").text();
        if (!can_add_to_basket) {
            // if (color_attr_leng && !size_attr_leng)  {
            //     show_error_message(color_text, 5000);
            // }
            // else {
            //     show_error_message(message, 5000);
            // }

        } else {
            $.ajax({
                url: url,
                data: serialize,
                type: "POST",
                success: function (data) {
                    if (data) {
                        $('#basket-icon').html(data);
                        $('.alert-container').show();
                        setTimeout(function () {
                            $('.alert-container').hide();
                        }, 3000);
                    }
                },
                error: function (err) {
                    console.log(err.responseText);
                    show_error_message(err.responseText.slice(1, -1), 5000);
                }
            });
        }

        // }
    });

    $("#base_login_form").submit(function (e) {
        e.preventDefault();
        var url = $(this).attr('action');
        var data = $(this).serialize();
        var form = $(this);
        var msg = $(".alert-msg");
        var redirect_url = $("#id_redirect_url").val();
        $.ajax({
            url: url,
            type: "POST",
            data: data,
            success: function (data) {
                if (data.login) {
                    msg.hide();
                    form[0].reset();
                    window.location.href = redirect_url;

                } else {
                    msg.show();
                    form[0].reset();
                }
            },
            error: function (xhr, errmsg, err) {
                // console.log(xhr, errmsg, err);
            } // end error: function
        });
    });

    $(".add_gift_card").click(function () {
       show_snackbar($(this).attr("data-add-text"));
    });

    $("#place_order_form").submit(function (e) {
        var selected = $('input:checked')[0] !== undefined;
        if (!selected) {
            show_snackbar($(this).attr("data-warning"));
            return false;
        }
    });
});
