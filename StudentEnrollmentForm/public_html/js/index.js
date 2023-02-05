
  


        var jpdbBaseURL = "http://api.login2explore.com:5577";
        var jpdbIRL = "/api/irl";
        var jpdbIML = "/api/iml";
        var stuDBName = "COLLEGE-DB";
        var stuRelationName = "PROJECT-TABLE";
        var connToken = "90932719|-31949276649078418|90954707";
        $("#stuid").focus();
                
        
                function saveRecNo2LS(jsonObj) { 
                var lvData = JSON.parse(jsonObj.data); 
                localStorage.setItem("recno", lvData.rec_no);
                
                function getEmpIdAsJsonObj() {
                var stuid= $("#empid").val();
                var jsonStr = {
                            id: stuid
                            };
                             return JSON.stringify(jsonStr);
                         }
                         
                                    
         function filldata(jsonObj) { 
                saveRecNo2LS(jsonObj);
                var record = JSON.parse(jsonObj.data).record;
                //$("#stuid").val(record.stuid);
                $("#stuname").val(record.name);
                $("#stuclass").val(record.class);
                $("#stubirthdate").val(record.stubirthdate);
                $("#stuaddress").val(record.stuaddress);                       
                $("#enrollment_Date").val(record.enrollment_Date);
                
              }

function resetForm() {

    $("#stuid").val("");
    $("#stuname").val("");
    $("#stuclass").val("");
    $("#stubirthdate").val("");
    $("#stuaddress").val("");
    $("#stuid").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#stuid").focus();
}

function validateData() {
    var stuid, stuname, stuclass, stubirthdate, stuaddress, enrollment_Date;
    stuid = $("#stuid").val();
    stuname = $("#stuname").val();
    stuclass = $("#stuclass").val();
    stubirthdate = $("#stubirthdate").val();
    stuaddress = $("#stuaddress").val();
    enrollment_Date = $("#enrollment_Date").val();

    if (stuid === "") {
        alert("Student ID missing");
        $("#stuid").focus();
        return "";
    }
    if (stuname === "") {
        alert("Student name missing");
        $("#stuname").focus();
        return "";
    }
    if (stuclass === "") {
        alert("Student classs is missing");
        $("#stuclass").focus();
        return "";
    }
    if (stubirthdate === "") {
        alert("Student birth date is missing");
        $("#stubirthdate").focus();
        return "";
    }
    if (stuaddress === "") {
        alert("Student address is missing");
        $("#stuaddress").focus();
        return "";
    }
    if (stubirthdate === "") {
        alert("Student name missing");
        $("#stubirthdate").focus();
        return "";
    }

    if (enrollment_Date === "") {
        alert("Student enrollment_Date is  missing");
        $("#stubirthdate").focus();
        return "";
    }
    var jsonStrobj = {

            stuid: stuid,
            name: stuname,
            class: stuclass,
            birthdate:stubirthdate,
            stuaddress:stuaddress,
            enrollment_Date: enrollment_Date
            };
              return JSON.stringify(jsonStrobj);
        }
        
function getStu() {

            var stuIdJsonObj = getStuIdAsJsonObj();
            var getRequest = createGET_BY_KEYRequest(connToken, stuDBName, stuRelationName, stuIdJsonObj);
            jQuery.ajaxSetup({async: false});
            var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL); 
            jQuery.ajaxSetup = ({async: true});
            if (resJsonObj.status === 400) {
             $("#reset").prop("disabled",false);
             $("#save").prop("disabled", false);
             $("#stuname").focus();
              }
        else if (resJsonObj.status === 200) {

        $("#empid").prop("disabled", true);
        fillData(resJsonObj);
        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("stuname").focus();

       }
    }
function saveData() {
    var jsonStrobj = validateData();
    if (jsonStrobj === '') {
        return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrobj, stuDBName, stuRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $('#stuid').focus();
}
        function changeData() {

        $("#change").prop("disabled",true); 
        jsonChg = validateData();

                var updateRequest = createUPDATERecordRequest(connToken, jsonChg, stuDBName, stuRelationName, localStorage.getItem("recno"));
                jQuery.ajaxSetup =({async: false});
                var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
                jQuery.ajaxSetup = ({async: true});
                console.log(resJsonObj);        
                resetForm();
                $("#stuid").focus();
            }}