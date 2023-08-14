$(document).ready(function() {
    // Add a click event handler to the <p> tag
    $("#emailLink").click(function() {
        // Prepare the email details
        const subject = "Enquiry on accounting service";
        const body = "I'm interested in your services. Please get in touch.";

        // Create the mailto link with pre-filled subject and body
        const mailtoLink = `mailto:consultant@wer1.sg?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Open the user's default email client
        window.location.href = mailtoLink;
    });

    $("#phoneLink").click(function () {
        window.location.href = "tel:+6565144693";
    });

    $("#phoneFab").click(function () {
        window.location.href = "tel:+6565144693";
    });
});