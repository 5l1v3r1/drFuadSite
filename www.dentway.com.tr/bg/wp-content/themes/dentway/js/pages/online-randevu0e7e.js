if(document.getElementById('appointment_form')) {
    var frmvalidator = new Validator('appointment_form');
    frmvalidator.EnableOnPageErrorDisplay();
    frmvalidator.EnableMsgsTogether();
    frmvalidator.addValidation('r_name', 'req', 'Lütfen adınızı yazınız.');
    frmvalidator.addValidation('r_email', 'req', 'Lütfen e-posta adresinizi yazınız.');
    frmvalidator.addValidation('r_email', 'email', 'Lütfen geçerli bir e-posta adresi yazınız.');
    frmvalidator.addValidation('r_phone', 'req', 'Lütfen telefon numaranızı yazınız.');
    frmvalidator.addValidation('r_center', 'dontselect=', 'Lütfen randevu merkezlerinden birini seçiniz.');
    frmvalidator.addValidation('r_access_via', 'selone_radio', 'Size ulaşımımız için bir tercih yapınız.');
    frmvalidator.setAddnlValidationFunction(dateValidation);
}

(function($){
    $(function(){

        const $online_randevu_message = $('#online-randevu-message');
        const $appointment_form = $('#appointment_form');

        $('#r_phone').inputmask({
            onincomplete: function(){
                $(this).addClass('is-invalid');
            },
            oncomplete: function(){
                $(this).removeClass('is-invalid');
            }
        });

        $('[data-src="#appointment"]').fancybox({
            afterClose: function(){
                $('#r_doctor').val('');
                $('.appointment-doctor-wrapper').addClass('d-none');
                $online_randevu_message.text('');
                $appointment_form.get(0).reset();
                $appointment_form.show();
            }
        });

        $('[data-src="#appointment"]').click(function(){
            const $this = $(this);
            const doctor_name = $this.data('doctor-name');
            $('.appointment-doctor-wrapper').removeClass('d-none');
            $('#r_doctor').val(doctor_name);
        });

        $appointment_form.submit(function(e){
            if(0 < document.error_disp_handler.all_msgs.length){
                //alert('Lütfen formu kontrol ediniz.');
                return false;
            }

            e.preventDefault();
            const $this = $(this);
            //loading
            $appointment_form.hide();
            $online_randevu_message.text('Formunuz gönderiliyor...');

            //ajax call
            $.ajax({
                "type": "POST",
                "url": window.home_url + "/wp-content/themes/dentway/handlers/online-randevu.php",
                "data": $this.serialize(),
                "dataType": "json"
            }).done(function(response){
                console.log(response);
                $online_randevu_message.text( response.message );

                if( response.success ) {
                    //result - success
                    if ( 'dataLayer' in window ) {
                        window.dataLayer.push({
                            'event':'VirtualPageview',
                            'virtualPageURL':'/dentway-randevu/success',
                            'virtualPageTitle' : 'Dentway Randevu Formu - Teşekkürler.'
                        });
                    }
                    $online_randevu_message
                        .removeClass('online-randevu-message--fail')
                        .addClass('online-randevu-message--success');
                    return;
                }

                //result - fail
                $online_randevu_message
                    .removeClass('online-randevu-message--fail')
                    .addClass('online-randevu-message--success');
            }).fail(function(){
                $online_randevu_message.text('Bir hata oluştu.');
            });
        });//appointment-form submit
    });//document ready
}(jQuery));

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function getToday() {
    var today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

function dateValidation(){
    (function($){
        var randevu_year = parseInt($('#r_year').val()),
            randevu_month = parseInt($('#r_month').val()) - 1,
            randevu_day = parseInt($('#r_day').val()),
            date = new Date(randevu_year, randevu_month, randevu_day);
        
        if(date.getMonth() > randevu_month){
            sfm_show_error_msg('Lütfen geçerli bir tarih seçiniz', document.getElementById('r_date'));
            return false;
        }
        if(date - getToday() < 0){
            sfm_show_error_msg('Lütfen randevu için gelecek bir tarih seçin.', document.getElementById('r_date'));
            return false;
        }
        
        $('#r_date').val(pad(randevu_day, 2) + '/' + pad(randevu_month + 1, 2) + '/' + randevu_year);
        return true;
    }(jQuery));
}