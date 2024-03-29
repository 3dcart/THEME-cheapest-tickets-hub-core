function update_flyoutcart() {
	/*if (window["_3d_cart"] != undefined) {
        if (_3d_cart.oid == 0)
            return;
        // jQuery('#floating-cart .minicart-items').text(_3d_cart.itemsum);
        jQuery('#floating-cart').fadeIn(300);
        return;
    }*/
    jQuery.ajax({
        url: '/frontapi.asp',
        dataType: 'json',
        type: 'GET',
        cache: false,
        data: {
            module: 'cartajax',
        },
        success: function (data) {
            if (data.ItemsInCart != undefined) {
                if (data.ItemsInCart.length > 0) {
                    jQuery('#floating-cart').fadeIn(300);
                }
            }
        },
        error: function (objError) {
            //alert('Error');
            return;
        }
    });
}

function addcart_callback(productDiv, data) {
    jQuery(productDiv).addClass('ajaxcart-complete');
    setTimeout(function () { jQuery(productDiv).removeClass('ajaxcart-complete'); }, 1000);

    var itemsInCart = 0;
    var subtotal = 0;

    jQuery(data.ItemsInCart).each(function (index, item) {
        itemsInCart += item.qty;
        subtotal += (item.price * item.qty);
    });
    //minicart - subtotal
    jQuery('.minicart-items').text(itemsInCart);
    update_flyoutcart();

    var currency = jQuery('body').data('currency');
    jQuery('.minicart-subtotal').text(currency + subtotal);
   
}

function mailinglist_callfront(form) {
    jQuery(form).find('.mailinglist-input').prop('disabled', true);
    jQuery(form).find('.mailinglist-submit').prop('disabled', true);
    jQuery(form).find('#mailing-btn-txt').addClass('hidden');
    jQuery(form).find('#mailing-btn-load').removeClass('hidden');

    jQuery('#mailinglist-response').slideUp(300);
    jQuery('#mailinglist-response div').addClass('hidden');
}

function mailinglist_response(form, response) {

    jQuery(form).find('.mailinglist-input').prop("disabled", false);
    jQuery(form).find('.mailinglist-submit').prop("disabled", false);


    if (response == 1 || response == 3) {
        jQuery('#mailinglist-response .mailinglist-subscribed').removeClass('hidden');
        jQuery('#mailinglist-response').slideDown(300);
        jQuery('.mailinglist-input').attr( 'aria-invalid', 'false');
    }
    else if (response == -1) {
        jQuery('#mailinglist-response .mailinglist-unsubscribed').removeClass('hidden');
        jQuery('#mailinglist-response').slideDown(300);
        jQuery('.mailinglist-input').attr( 'aria-invalid', 'false');
    }
    else if (response == 2) {
        jQuery('#mailinglist-response .mailinglist-error').removeClass('hidden');
        jQuery('#mailinglist-response').slideDown(300);
        jQuery('.mailinglist-input').attr( 'aria-invalid', 'true');
    }

    jQuery(form).find('#mailing-btn-txt').removeClass('hidden');
    jQuery(form).find('#mailing-btn-load').addClass('hidden');

}

function moveMenu() {
    var respWidth = window.innerWidth;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("safari/") !== -1 && ua.indexOf("chrom") === -1) {
        respWidth = jQuery(window).width();
    }

    if (respWidth < 1024) {
        jQuery('#menulinks').appendTo('#mobile-menulinks');
        jQuery('#categories').appendTo('#mobile-categories');
    }
    else {
        jQuery('#menulinks').appendTo('#menulinks-outer');
        jQuery('#mobile-categories #categories').insertAfter('.cat-menu .widget-header');
    }
}

jQuery(document).ready(function () {

    update_flyoutcart();

    jQuery('#mobile-menu-trigger, .navbar-toggle').click(function (e) {
        e.preventDefault();

        jQuery('#mobile-menu').show(0, function () {
            jQuery('body').addClass('menu-open');
        });
    });

    jQuery('.mobile-menu-close').click(function (e) {
        e.preventDefault();

        jQuery('body').removeClass('menu-open');
        setTimeout(function () {
            jQuery('#mobile-menu').hide(0);
        }, 250);
    });


    var respWidth = window.innerWidth;
    if (respWidth >= 767) {
    	jQuery('#categories .dropdown').hover(function () {
    		jQuery(this).find('.dropdown-menu').first().stop(true, true).delay(250).slideDown('fast');

    	}, function () {
    		jQuery(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp('fast');

    	});

    	jQuery('#categories .dropdown > a').click(function () {
    		location.href = this.href;
    	});
    }

});

jQuery(window).load(function () {
    moveMenu();
});
jQuery(window).resize(function () {
    moveMenu();
});

jQuery(function ($) {
	$('#categories .dropdown').hover(function () {
		$(this).find('.dropdown-menu').first().stop(true, true).delay(250).slideDown();

	}, function () {
		$(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp();

	});

	$('#categories .dropdown > a').click(function () {
		location.href = this.href;
	});

});

jQuery(function () { 
	jQuery('.navbar-nav .dropdown > a').attr("aria-expanded","false");
	jQuery('.navbar-nav .dropdown > a').attr("aria-haspopup","true");
    jQuery('.navbar-nav .dropdown > a').hover(function (e) {
        var menuItem = jQuery( e.currentTarget );

        if (menuItem.attr( 'aria-expanded') === 'true') {
            jQuery(this).attr( 'aria-expanded', 'false');
        } else {
            jQuery(this).attr( 'aria-expanded', 'true');
        }
    });
});
setTimeout(function(){
      $('.antiCls').css("visibility", "visible");
  }, 800);