const longText = document.querySelector(".long_paragraph");
const showMoreLink = document.querySelector("#show-more-link");

showMoreLink.addEventListener("click", () => {

    longText.style.maxHeight = "none";
    showMoreLink.textContent = "Read More";
    longText.classList.remove("fade_shadow");
    showMoreLink.style.display = "none";
  
});


$(document).ready(function() {

    $('#voucherRedemption #agree-checkbox').change(function() {
        if ($(this).is(':checked')) {
          $('#voucherRedemption #redeemVoucherButton').prop('disabled', false);
        } else {
          $('#voucherRedemption #redeemVoucherButton').prop('disabled', true);
        }
      });

    $("#voucherRedemption input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            $("#voucherRedemption #contactButton").prop('disabled', true);
            $("#voucherRedemption #contactButton").html('Loading');

            $("#voucherRedemption .loading").addClass('d-block');
            $('#voucherRedemption .error-message').removeClass('d-block');
            $('#voucherRedemption .sent-message').removeClass('d-block');

            // get values from FORM
            var name = $("#voucherRedemption input#name").val();
            var email = $("#voucherRedemption input#email").val();
            var company = $("#voucherRedemption input#companyName").val();
            var phone = $("#voucherRedemption input#phone").val();
            var message = $("#voucherRedemption textarea#message").val();
            var promocode = $("#voucherRedemption input#promocode").val();
            
            if (company === null) {
                company = "";
            }

            if (promocode === null) {
                promocode = "";
            }
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            let data = {
                name: name,
                company: company,
                phone: phone,
                email: email,
                message: message,
                vouchercode: promocode
            };

            try {
                fetch("https://script.google.com/macros/s/AKfycbxsawcVKoyAqRln6nQzz9Nwd3vW_6lp1kAnC2Fo2Ra9O4EKcQpB2UhhB4wD3f8B6Q/exec", {
                    method: 'POST',
                    body: JSON.stringify(data),
                    redirect: "follow",
                    headers: {
                        'Content-Type': 'text/plain;charset=utf-8',
                    }
                }).then(res => {
                    if (!res.ok) {
                        // Fail message
                        $("#voucherRedemption .loading").removeClass('d-block');
                        $('#voucherRedemption .error-message').addClass('d-block');

                        window.gtag('event', 'form_submission_fail');
                    }
                    else{
                        // Success message

                        $("#voucherRedemption .loading").removeClass('d-block');
                        $('#voucherRedemption .error-message').removeClass('d-block');
                        $('#voucherRedemption .sent-message').addClass('d-block');

        
                        window.gtag('event', 'form_submission_success');
                    }
    
        
                }).catch((error) => {
                    window.gtag('event', 'form_submission_error');
                }).finally(
                    () => {
                        $('#voucherRedemption #contactForm').trigger("reset");
                        $("#voucherRedemption #contactButton").html('Redeem Now');
                        $("#voucherRedemption #contactButton").prop('disabled', false);
                        $("#voucherRedemption #message").attr("placeholder", "Your Message *");
                        $('#voucherRedemption #tnc').html("By submitting this form, you are agreeing to our company's <a href=\"pdpa/pdpa.html\">Privacy Data Protection Act (PDPA)</a> policy and promotion T&C.");
                    }
                );
            } catch (error) {
                // window.gtag('event', 'form_submission_error');
                $('#voucherRedemption #contactForm').trigger("reset");
                $("#voucherRedemption #contactButton").html('Redeem Now');
                $("#voucherRedemption #contactButton").prop('disabled', false);
                $("#voucherRedemption #message").attr("placeholder", "Your Message *");
                $('#voucherRedemption #tnc').html("By submitting this form, you are agreeing to our company's <a href=\"pdpa/pdpa.html\">Privacy Data Protection Act (PDPA)</a> policy and promotion T&C.");
            }
            
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#voucherRedemption #name').focus(function() {
    $('#voucherRedemption #success').html('');
});

