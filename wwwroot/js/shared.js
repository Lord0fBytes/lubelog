﻿function successToast(message) {
    Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        title: message,
        timerProgressBar: true,
        icon: "success",
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    })
}
function errorToast(message) {
    Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        title: message,
        timerProgressBar: true,
        icon: "error",
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    })
}
function viewVehicle(vehicleId) {
    window.location.href = `/Vehicle/Index?vehicleId=${vehicleId}`;
}
function saveVehicle(isEdit) {
    var vehicleId = getVehicleModelData().id;
    var vehicleYear = $("#inputYear").val();
    var vehicleMake = $("#inputMake").val();
    var vehicleModel = $("#inputModel").val();
    var vehicleLicensePlate = $("#inputLicensePlate").val();
    //validate
    var hasError = false;
    if (vehicleYear.trim() == '' || parseInt(vehicleYear) < 1900) {
        hasError = true;
        $("#inputYear").addClass("is-invalid");
    } else {
        $("#inputYear").removeClass("is-invalid");
    }
    if (vehicleMake.trim() == '') {
        hasError = true;
        $("#inputMake").addClass("is-invalid");
    } else {
        $("#inputMake").removeClass("is-invalid");
    }
    if (vehicleModel.trim() == '') {
        hasError = true;
        $("#inputModel").addClass("is-invalid");
    } else {
        $("#inputModel").removeClass("is-invalid");
    }
    if (vehicleLicensePlate.trim() == '') {
        hasError = true;
        $("#inputLicensePlate").addClass("is-invalid");
    } else {
        $("#inputLicensePlate").removeClass("is-invalid");
    }
    if (hasError) {
        return;
    }
    $.post('/Vehicle/SaveVehicle', {
        id: vehicleId,
        imageLocation: uploadedFile,
        year: vehicleYear,
        make: vehicleMake,
        model: vehicleModel,
        licensePlate: vehicleLicensePlate
    }, function (data) {
        if (data) {
            if (!isEdit) {
                successToast("Vehicle added");
                hideAddVehicleModal();
                loadGarage();
            }
            else {
                viewVehicle(vehicleId);
            }
        } else {
            errorToast("An error has occurred, please try again later.");
        }
    });
}
function uploadFileAsync() {
    let formData = new FormData();
    formData.append("file", $("#inputImage")[0].files[0]);
    $.ajax({
        url: "/Files/HandleFileUpload",
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (response) {
            if (response.trim() != '') {
                uploadedFile = response;
            }
        }
    });
}