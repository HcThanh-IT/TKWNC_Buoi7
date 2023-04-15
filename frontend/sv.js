lst = [];
curItem = null;
$(function () {
    getStudents();
});
function getStudents() {
    fetch("http://localhost:3000/students")
        .then(res => { return res.json(); })
        .then(data => {
            lst = [];
            let i = 1;
            data.forEach(sv => {
                sv.STT = i++;
                lst.push(sv);
            });
            if (lst.length > 0) {
                $("#tbodySV").html("");
                $("#svTemplate").tmpl(lst).appendTo("#tbodySV");
            }
            else {
                str = "<caption>No DATA FOUND</caption>"
                $("#tbodySV").html(str);
            }
        })
        .catch(err => {
            str = "<caption>ERROR .....</caption>"
            $("#tbodySV").html(str);
        })
}
function createSV() {
    // console.log("Create SV .....");
    gt=$('input[name="GioiTinh"]:checked').val();
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/students",
        data: {
            "MaSV": $("#txtMSSV").val(),
            "HoTen": $("#txtHoTen").val(),
            "Lop": $("#txtLop").val(),
            "GioiTinh":gt,
            "NgaySinh": $("#txtNgaySinh").val(),
        //     "MaSV": "21662010",
        // "HoTen": "Đinh Lương Vĩnh Tú",
        // "Lop": "17CSI01",
        // "GioiTinh": "Nam",
        // "NgaySinh": "10/11/2003"
        }
    })
        .done(function (res) {
            if(res.success) alert(res.msg);
            else alert(res.msg);
        }).fail(function (jqXHR, textStatus, errorThrown) { console.log(textStatus) });
}