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

// function updateSV(MaSV){
//     sv.lst.find(x=>x.MaSV==MaSV)
//     $("#txtMSSV").val(sv.MaSV);
//     $("#txtHoTen").val(sv.HoTen);
//     $("#txtMLop").val(sv.Lop);
//     if(sv.GioiTinh == "Nam"){
//         $("#radioNam").prop('checked',true);
//     }
//     else{
//         $("#radioNu").prop('checked',true);
//     }
//     $("#txtNgaySinh").val(sv.NgaySinh);
// }

function updateSV(mssv, index) {
    fetch('http://localhost:3000/students')
      .then(response => response.json())
      .then(students => {
        console.log(students); // This will log the array of students to the console
  
        // Use forEach() to iterate over each student in the array
        students.forEach((student, i) => {
          if (i === index) {
            console.log(student);
            document.querySelector("#currentID").value = index;
            document.querySelector("#txtCodeEdit").value = student.MaSV;
            document.querySelector("#txtNameEdit").value = student.HoTen;
            document.querySelector("#txtClassEdit").value = student.Lop;
            document.querySelector("#dateEdit").value = student.NgaySinh;
  
            if (student.GioiTinh === "Nam") {
              document.querySelector('#male').checked = true;
            }
            if (student.GioiTinh === "Nữ") {
              document.querySelector('#female').checked = true;
            }
  
            // Show the modal
            $('#modalEdit').modal('show');
          }
        });
      })
      .catch(error => {
        console.error();
        // Handle the error here
      });
  
    // Get the modal
    var modal = document.getElementById("modalEdit");
  
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
  
    // When the user clicks the button, open the modal
    modal.style.display = "block";
  
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    }
  
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }
  

function delSV(MaSV){
    if(confirm("Bạn có chắc chắn muốn xóa không?")){
        $.ajax({
            method: "DELETE",
            url: "http://localhost:3000/students",
            data: {
                "MaSV": MaSV,
            }
        })
            .done(function (res) {
                if(res.success) {
                    alert(res.msg);
                    getStudents();
                }
                else alert(res.msg);
            }).fail(function (jqXHR, textStatus, errorThrown) { console.log(textStatus) });
    }
}

