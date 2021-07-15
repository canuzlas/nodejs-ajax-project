$(document).ready(()=>{
    $('.socialupdate').click(function(){
        var id = $(this).attr('id')
        if($('#socialmedia_link').val().length <= 0){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Link Alanı Boş Bırakılamaz',
                timer: 3000
            })
        }
        data = {}
        data.id = id
        data.socialmedia_link = $('#socialmedia_link').val()
        $.ajax({
            method:"POST",
            url:"/admin/management/logged/updatesocial",
            data:data,
            success:function(callback){
                if(callback){
                    return Swal.fire({
                        icon: 'success',
                        title: 'Tebrikler!...',
                        text: 'Güncelleme İşlemi Başarılı',
                        timer: 3000
                    })
                }else{
                    return Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Sosyal Medya Güncellenemedi',
                        timer: 3000
                    })
                }
            }
        })  
    })


    var urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('social_status') === "notfind") {
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Sosyal Medya Bulunamadı.!',
            timer: 3000
        })
    } else if (urlParams.get('success') === "false") {
        return Swal.fire({
            icon: 'success',
            title: 'Tebrikler.!',
            text: 'Slider ekleme işleminiz başarılı..',
            timer: 2000
        })
    }
})