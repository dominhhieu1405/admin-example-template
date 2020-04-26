var loading = '<div class="overlay-content" style="text-align:center; margin: 20px auto;">' +
                            '<img src="/Content/Themes/img/loading.gif" class="img-load" alt="loading..." />' +
                            '<p>Đang tải...</p></div>';

//#region Validate
$('.btnUpdateEditor').click(function () {
    tinyMCE.triggerSave();
});
if ($.fn.sortable != undefined)
{
    $('.sortable').sortable({
        start: function (event, ui) {
        },
        change: function (event, ui) {
            $('.btnChapterUpdateSortOrder').show();
        },
        update: function (event, ui) {
        }
    });
}

function goBack() {
    window.history.back();
}

if ($.fn.validate) {

    $.validator.addMethod('date',
        function (value, element) {
            return true; //Ignore validate with type date
    });

    var currForm = $(".formvalidate");
    currForm.removeData("validator");
    //currForm.removeData("unobtrusiveValidation");
    $.validator.unobtrusive.parse(currForm);


    var validator = currForm.validate({
        errorClass: 'text-error'
    });
    validator.settings.ignore = ':hidden:not(".include-valid")';
    $.validator.setDefaults({
        ignore: ''
    });
    //$('.btnCancelContent').click(function () {
    //    validator.cancelSubmit = true//remove error class on name elements and clear history
    //});
}

//#endregion


// ********** tác vụ danh sách truyện **********/
//#region Common

$('.selectAll').change(function () {
    $('input:checkbox[id^=' + this.value + ']').prop('checked', this.checked).change();
    $('.btnAction').toggle(this.checked);
});

$('input:checkbox[id^=Mangas]').change(function () {
    if($('input:checkbox[id^=Mangas]:checked').length > 0)
    {
        $('.btnAction').toggle(true);
    }else
    {
        $('.btnAction').toggle(false);
    }
});

$('input:checkbox[id^=Chapters]').change(function () {
    if ($('input:checkbox[id^=Chapters]:checked').length > 0) {
        $('.btnAction').toggle(true);
    } else {
        $('.btnAction').toggle(false);
    }
});

$('input:checkbox[id^=Comments]').change(function () {
    if ($('input:checkbox[id^=Comments]:checked').length > 0) {
        $('.btnAction').toggle(true);
    } else {
        $('.btnAction').toggle(false);
    }
});

$('.btnEditUrl').on('click', function () {
    $('#Url').removeAttr('readonly').focus();
});

$('.btnEditChangeUrl').on('click', function () {
    var that = $('.url-create');
    var txtName = $(that).val();
    if (txtName == null || txtName == '')
        return '';

    $.get('/GetTagInput/ToUrl?txt=' + txtName, function (response) {
        $('#Url').val(response);
    });

    $('#Url').removeAttr('readonly').focus();
});

$('.url-create').on('change', function () {
    var txtName = $(this).val();

    if (txtName == null || txtName == '')
        return '';
    
    if ($('#Id').val() == '' || $('#Id').val() == 0 || $('#Id').val() == undefined)
    {
        $.get('/GetTagInput/ToUrl?txt=' + txtName, function (response) {
            $('#Url').val(response);
        });
    }
});

//#endregion

//#region ReplacmentRule

$('.replacementrule-item').on('click', '.ckUpdateVisible', function () {
    var that = $(this);
    var ruleId = $(that).data('id');
    if (confirm('Bạn có chắc không?')) {
        //Gọi Ajax update
        $.ajax({
            type: "post",
            url: "/admin/ManageReplacementRule/AjaxUpdateVisible",
            data: { ruleId: ruleId },
            success: function (response) {
                if (response.status) {
                    toastr.success('Đã xóa thành công.', null, { closeButton: true });
                    $(that).closest('tr').fadeOut();
                } else {
                    toastr.error(response.message);
                }
            },
            error: function (request, status, error) {
                toastr.error('Có lỗi xảy.', null, { closeButton: true });
            }
        });
    }
});

$('.lstReplacement').on('click', '.btnUpdateFilter', function () {
    var that = $(this);
    var ruleId = $(that).data('id');
    var sortOrder = $(that).siblings('.inputFilter').val();
    if (sortOrder == null || sortOrder == '')
    {
        alert('Vui lòng nhập thứ tự cần sắp xếp');
        return false;
    }

    $.ajax({
        type: "post",
        url: "/admin/ManageReplacementRule/AjaxUpdateSortOrder",
        data: { ruleId: ruleId, sortOrder: sortOrder },
        success: function (response) {
            if (response.status) {
                toastr.success('Đã cập nhật thành công.', null, { closeButton: true, positionClass: "toast-bottom-left" });
            } else {
                toastr.error(response.message);
            }
        },
        error: function (request, status, error) {
            toastr.error('Có lỗi xảy.', null, { closeButton: true });
        }
    });
});

//#endregion

//#region Manage Category

$('.category-item').on('click', '.ckCategoryVisible', function () {
    var that = $(this);
    var cateId = $(that).data('id');
    if (confirm('Bạn có chắc không?')) {
        $.ajax({
            type: "post",
            url: "/admin/ManageCategory/AjaxCategoryUpdateVisible",
            data: { cateId: cateId },
            success: function (response) {
                if (response.status) {
                    toastr.success('Đã xóa thành công.', null, { closeButton: true });
                    $(that).closest('tr').fadeOut();
                } else {
                    toastr.error(response.message);
                }
            },
            error: function (request, status, error) {
                toastr.error('Có lỗi xảy.', null, { closeButton: true });
            }
        });
    }
});

//#endregion

//#region Manage Translate

$('.translate-item').on('click', '.ckTranslateTeamVisible', function () {
    var that = $(this);
    var transId = $(that).data('id');
    if (confirm('Bạn có chắc không?')) {
        $.ajax({
            type: "post",
            url: "/admin/ManageTranslateTeam/AjaxUpdateVisible",
            data: { transId: transId },
            success: function (response) {
                if (response.status) {
                    toastr.success('Đã xóa thành công.', null, { closeButton: true });
                    $(that).closest('tr').fadeOut();
                } else {
                    toastr.error(response.message);
                }
            },
            error: function (request, status, error) {
                toastr.error('Có lỗi xảy.', null, { closeButton: true });
            }
        });
    }
});

//#endregion

//#region Manage Category

$('.author-item').on('click', '.ckAuthorVisible', function () {
    var that = $(this);
    var authorId = $(that).data('id');
    if (confirm('Bạn có chắc không?')) {
        $.ajax({
            type: "post",
            url: "/admin/ManageAuthor/AjaxUpdateVisible",
            data: { authorId: authorId },
            success: function (response) {
                if (response.status) {
                    toastr.success('Đã xóa thành công.', null, { closeButton: true });
                    $(that).closest('tr').fadeOut();
                } else {
                    toastr.error(response.message);
                }
            },
            error: function (request, status, error) {
                toastr.error('Có lỗi xảy.', null, { closeButton: true });
            }
        });
    }
});

//#endregion

//#region Chapters

$('.btnChapterSortOrder').on('click', function () {
    var that = $(this);
    var type = $(this).data('type');
    var mangaId = $(this).data('mangaid');
    toastr.warning('Đang xử lý...', null, { closeButton: false });

    $.get('/Admin/ManageChapter/PartialLoadChapterSort?type=' + type + '&mangaId=' + mangaId, function (data) {
        window.location.href = window.location.href;
        //$('.lstChapters').html(data);

        //if ($.fn.sortable != undefined)
        //{
        //    $(".sortable").sortable("destroy")
        //}
        //$('.lstChapters').find('.move').removeClass('move');
    });
});


$('.btnChapterUpdateSortOrder').on('click', function () {
    var mangaId = $(this).data('mangaid');
    var i = $(this).data('start');
    var array = [];
    $(".sortable tr").each(function () {
        var that = $(this)        
        array.push($(that).data('id') + ',' + i);
        i++;
    });

    i = $(this).data('start');

    $.ajax({
        type: 'POST',
        url: '/Admin/ManageChapter/AjaxUpdateSortOrder',
        data: { strData: array.join(';'), mangaId: mangaId },
        success: function (result) {
            if (!result.status) {
                toastr.error(result.message, null, { closeButton: true });
            }
        },
        error: function (data) {
            toastr.error('Có lỗi xảy ra', null, { closeButton: true });
        }
    });


   toastr.success('Đã cập nhật thứ tự thành công.', null, { closeButton: true });
   window.location.href = window.location.href;
});

$('.btnActionChapterMove').on('click', function () {
    var that = $(this);
    $('#modalMoveChapter').modal('show');
});

$(".frm-q-search").submit(function (e) {
    e.preventDefault();
    QuickSearch();
});
$(".frm-q-search input[type=text]").keyup(function () {
    QuickSearch();
});
function QuickSearch() {
    var keyword = $(".frm-q-search input[type=text]").val();
    if (keyword.length > 0) {
        $(".frm-q-search .result").show();
        setTimeout(function () {
            if (keyword == $(".frm-q-search input[type=text]").val()) {
                $.post("/ajax/Search/AjaxQuickSearch", { keyword: keyword, isFrontEnd : false }, function (data) {
                    $(".frm-q-search .result").html(data);
                });
            }
        }, 500);
    }
    else {
        $(".frm-q-search .result").hide();
    }
}

$('#modalMoveChapter').on('click', '.item-result', function () {
    var that = $(this);

    var mangaId = $(that).data('id');
    var mangaName = $(that).find('a').text();

    var html = '<div class="alert alert-warning alert-dismissible fade in mt15" role="alert">\
                    <input type="hidden" id="MangaIdMoveTo" name="MangaIdMoveTo" value="'+mangaId+'" />\
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                        <span aria-hidden="true">×</span>\
                    </button>'
                    + mangaName +
                '</div>';
    $('#MangaNameMoveTo').html(html);
    $('.mangaMoveto').show();
    $(".frm-q-search .result").hide();

    return false;
});

$('#modalMoveChapter').on('click', '#btnChapterMoveSave', function () {

    if ($('#MangaIdMoveTo').length > 0)
    {
        if (confirm('Bạn có chắc không?'))
        {
            var dataArray = [];
            var mangaIdTo = $('#MangaIdMoveTo').val();
            var mangaIdFrom = $('#MangaId').val();
            $('input:checkbox[id^=Chapters]').filter(':checked').each(function () {
                dataArray.push($(this).prev().val());
            });

            if (dataArray.length > 0) {
                $.post("/admin/ManageChapter/AjaxMoveChapter", { mangaIdFrom: mangaIdFrom, mangaIdTo: mangaIdTo, chapterIds: dataArray.join(',') }, function (data) {
                    if (data.status) {
                        window.location.href = window.location.href;
                    }
                    else {
                        alert(data.message);
                    }
                });
            } else {
                alert('Vui lòng chọn chương cần chuyển!');
            }
        }
    }else
    {
        alert('Vui lòng chọn truyện cần chuyển');
    }
});

//#endregion

//#region Manage Staff

$('.deleteStaff').on('click', function () {
    if (confirm('Bạn có chắc không?'))
    {
        var that = $(this);
        var userId = $(that).data('id');

        $.post("/admin/ManageUser/AjaxDeleteUserStaff", { userId: userId }, function (data) {
            if (data.status) {
                $(that).closest('tr').fadeOut();
            }
            else {
                alert(data.message);
            }
        });
    }
});

$('#btnAddUserPay').on('click', function () {
    var userIds = $('#idAddUserStaff').val();

    if (userIds == '')
    {
        alert('Vui lòng nhập tên user!');

        return false;
    }

    $.post("/admin/ManageUser/AjaxAddUserStaff", { userIds: userIds }, function (data) {
        if (data.status) {
            window.location.href = window.location.href;
        }
        else {
            alert(data.message);
        }
    });
});


//#endregion

//#region Manga Report

$('.chkFixedChapter').on('click', function () {
    var that = $(this);
    if (confirm('Bạn có chắc không?')) {
        $.post("/admin/ManageManga/AjaxCheckIsFixed", { chapterId: $(that).data('id') }, function (data) {
            if (data.status) {
                $(that).closest('tr').fadeOut();
            }
            else {
                alert(data.message);
            }
        });
    }
});

function ViewMangaReport(chapterId,that) {
    $("#modalbody").html(loading);
    $.get('/admin/ManageManga/AjaxGetReportMangaDetail/?chapterId=' + chapterId, function (data) {
        $("#modalbody").html(data);
        $('#modalManga').modal('show');
        $('#modalTitle').text($(that).data('title'));
    });
}

//#endregion


//#region update UserTitle

$('.lstUser').on('click', '.btnChooseUserTitle', function () {
    var that = $(this);
    $('#modalUserName').text($(that).data('username'));
    $('#UserTitleIdModal').val($(that).data('usertitleid'));
    $('#UserIdModal').val($(that).data('id'));
});

$('#btnUpdateUserTitle').on('click', function () {
    var userId = $('#UserIdModal').val();
    var userTitleId = $('#UserTitleIdModal').val();

    if (userId == '' || userTitleId == '') {
        alert('Chưa có thông tin, vui lòng kiểm tra lại!');

        return false;
    }

    $.post("/admin/ManageUser/AjaxUpdateUserTitle", { userId: userId, userTitleId: userTitleId }, function (data) {
        if (data.status) {
            window.location.href = window.location.href;
        }
        else {
            alert(data.message);
        }
    });
});

//#endregion

function insertAtCaret(areaId, text) {
    var txtarea = document.getElementById(areaId);
    var scrollPos = txtarea.scrollTop;
    var strPos = 0;
    var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
        "ff" : (document.selection ? "ie" : false));
    if (br == "ie") {
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart('character', -txtarea.value.length);
        strPos = range.text.length;
    }
    else if (br == "ff") strPos = txtarea.selectionStart;

    var front = (txtarea.value).substring(0, strPos);
    var back = (txtarea.value).substring(strPos, txtarea.value.length);
    txtarea.value = front + text + back;
    strPos = strPos + text.length;
    if (br == "ie") {
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart('character', -txtarea.value.length);
        range.moveStart('character', strPos);
        range.moveEnd('character', 0);
        range.select();
    }
    else if (br == "ff") {
        txtarea.selectionStart = strPos;
        txtarea.selectionEnd = strPos;
        txtarea.focus();
    }
    txtarea.scrollTop = scrollPos;
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}

$(document).ready(function () {
    var $chkboxes = $('.chkbox_shift_select');
    var lastChecked = null;

    $chkboxes.click(function (e) {
        if (!lastChecked) {
            lastChecked = this;
            return;
        }

        if (e.shiftKey) {
            var start = $chkboxes.index(this);
            var end = $chkboxes.index(lastChecked);

            $chkboxes.slice(Math.min(start, end), Math.max(start, end) + 1).prop('checked', lastChecked.checked);

        }

        lastChecked = this;
    });
});
