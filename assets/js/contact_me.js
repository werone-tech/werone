$(function() {

    $("#contact input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            $("#contact #contactButton").prop('disabled', true);
            $("#contact #contactButton").html('Sending');

            $("#contact .loading").addClass('d-block');
            $('#contact .error-message').removeClass('d-block');
            $('#contact .sent-message').removeClass('d-block');

            // get values from FORM
            var name = $("#contact input#name").val();
            var email = $("#contact input#email").val();
            var company = $("#contact input#companyName").val();
            var phone = $("#contact input#phone").val();
            var message = $("#contact textarea#message").val();
            var promocode = $("#contact input#promocode").val();
            
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
                promocode: promocode
            };
            try {
                fetch("https://script.google.com/macros/s/AKfycbzObKbBCqqNz7QF7zZZXIY-yuBETa_Z4jtJMIbm43Js0_3Jjf4ofH39p1ToMqI9C1Ck/exec", {
                    method: 'POST',
                    body: JSON.stringify(data),
                    redirect: "follow",
                    headers: {
                        'Content-Type': 'text/plain;charset=utf-8',
                    }
                }).then(res => {
                    if (!res.ok) {
                        // Fail message
                        $("#contact .loading").removeClass('d-block');
                        $('#contact .error-message').addClass('d-block');

                        window.gtag('event', 'form_submission_fail');
                    }
                    else{
                        // Success message

                        $("#contact .loading").removeClass('d-block');
                        $('#contact .error-message').removeClass('d-block');
                        $('#contact .sent-message').addClass('d-block');

        
                        window.gtag('event', 'form_submission_success');
                    }
    
        
                }).catch((error) => {
                    window.gtag('event', 'form_submission_error');
                }).finally(
                    () => {
                        $('#contact #contactForm').trigger("reset");
                        $("#contact #contactButton").html('Send Message');
                        $("#contact #contactButton").prop('disabled', false);
                        $("#contact .promoApplied").removeClassClass('d-block');
                    }
                );
            } catch (error) {
                // window.gtag('event', 'form_submission_error');
                $('#contact #contactForm').trigger("reset");
                $("#contact #contactButton").html('Send Message');
                $("#contact #contactButton").prop('disabled', false);
                $("#contact .promoApplied").removeClassClass('d-block');
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
$('#contact #name').focus(function() {
    $('#contact #success').html('');
});
