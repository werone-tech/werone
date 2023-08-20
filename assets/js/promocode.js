$(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('promo');
    if(param !== null && param.length > 0){
         $("#contact #promoApplied").text("Promo code \"".concat(param.toUpperCase() ,"\" is applied successfully"))
         $("#contact #promoApplied").addClass('d-block');
         $("#contact input#promocode").val(param);
         $("#contact input#promocode").attr('readonly', true);
         $("#contact #message").attr("placeholder", "Which service are you interested in *");
         $('#contact #tnc').html("By submitting this form, you are agreeing to our company's <a href=\"pdpa/pdpa.html\">Privacy Data Protection Act (PDPA)</a> policy and <a href=\"promotion/tnc.html\">promotion T&C</a>.");
         $('#contact #contactButton').html("Redeem Voucher");
      
        $('html, body').animate({
          scrollTop: $("#contact").offset().top
        },1000);
      
    }
  });
  