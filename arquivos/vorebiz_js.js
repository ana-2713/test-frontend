$(function () {
  $("section.lp-product ul")
    .addClass("owl-carousel")
    .owlCarousel({
      dots: !1,
      loop: !0,
      margin: 20,
      nav: !0,
      navText: [
        "<i class='glyphicon glyphicon-chevron-left'></i>",
        "<i class='glyphicon glyphicon-chevron-right'></i>",
      ],
      autoplay: !0,
      autoplayTimeout: 8e3,
      responsive: {
        0: {
          items: 2,
        },
        768: {
          items: 2,
        },
        992: {
          items: 3,
        },
        1170: {
          items: 4,
        },
      },
    });
});

$(function () {
  $("#newsletterSubscribe").submit(function (e) {
    e.preventDefault();
    $.validity.setup({ outputMode: "label" });
    var that = $(this);
    var id = that.attr("id");
    if (validate_ajax(id)) {
      $("#newsletterEmail")
        .removeClass("newsletterEmail--incorrect")
        .addClass("newsletterEmail--success");

      var datos = {};

      datos.email = that.find("#newsletterEmail").val();

      $.ajax({
        accept: "application/vnd.vtex.ds.v10+json",
        contentType: "application/json; charset=utf-8",
        headers: {
          "X-VTEX-API-AppKey": "vtexappkey-lagranbodega-YWNBCQ",
          "X-VTEX-API-AppToken":
            "AZTRVQAFNQXFFDJJRDZIVOZRPEPEYUANFNEYHNTXWEDDJUINFAKVPHIMZBBRBWHTQKZRZKCEJCLQKWIVVCYXJEYYESZFMBWZXKMYUQOUXGLMVRBDTFVYXJJMMAMHLWSI",
          "REST-Range": "resources=0-49",
        },
        cache: false,
        crossDomain: true,
        data: JSON.stringify(datos),
        type: "POST",
        url: "/api/dataentities/CL/documents",
        beforeSend: function () {
          that.slideUp(500);
          that.find(".error-form").empty().slideUp(500);
          that.find(".loading-form").slideDown(500);
        },
        success: function (data, textStatus, xhr) {
          $("#newsletterSubscribe").slideDown(500).html("");
          $("#newsletter .flex-center h2").html("Gracias!");
          $("#newsletter .flex-center p").html(
            "Te has registrado correctamente en el boletín."
          );
          $("#newsletter").addClass("newsletter-subscribe--success");
          that.find(".loading-form").slideUp(500);
        },
        complete: function (xhr, textStatus) {
          if (xhr.status != 201) {
            that.slideDown(500);
            that.find(".loading-form").slideUp(500);
            that.find(".error-form").css("display", "block");
            that
              .find(".error-form")
              .html(
                "Error al enviar la información, favor de intentar nuevamente"
              );
          }
        },
      });
    }
    return false;
  });
});

function validate_ajax(id) {
  $.validity.start();
  $("#" + id + " #newsletterEmail")
    .require("Campo requerido")
    .assert(
      validate_user_newsletter($("#" + id + " #newsletterEmail").val()),
      "Usuario ya registrado"
    )
    .match("email", "Debe tener formato de email, ej. nombre@email.com");

  var result = $.validity.end();

  if ($("label[for='newsletterEmail']").length) {
    $("#newsletterEmail")
      .removeClass("newsletterEmail--success")
      .addClass("newsletterEmail--incorrect");
  } else {
    $("#newsletterEmail")
      .removeClass("newsletterEmail--incorrect")
      .addClass("newsletterEmail--success");
  }
  return result.valid;
}

function validate_radio(id) {
  var seleccionado = $(id).is(":checked");
  return seleccionado;
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function validate_correo(id) {
  $.validity.start();
  $("#" + id + " #newsletterEmail").require();
  var result = $.validity.end();
  return result.valid;
}

function validate_user_newsletter(email) {
  if (email != "") {
    var resultado = "";
    $.ajax({
      accept: "application/vnd.vtex.ds.v10+json",
      contentType: "application/json; charset=utf-8",
      headers: {
        "X-VTEX-API-AppKey": "vtexappkey-lagranbodega-YWNBCQ",
        "X-VTEX-API-AppToken":
          "AZTRVQAFNQXFFDJJRDZIVOZRPEPEYUANFNEYHNTXWEDDJUINFAKVPHIMZBBRBWHTQKZRZKCEJCLQKWIVVCYXJEYYESZFMBWZXKMYUQOUXGLMVRBDTFVYXJJMMAMHLWSI",
        "REST-Range": "resources=0-49",
      },
      cache: false,
      crossDomain: true,
      type: "GET",
      url:
        "/api/dataentities/CL/search?_where=(email=" +
        email +
        ")&_fields=email",
      async: false,
      success: function (data, textStatus, xhr) {
        if (data.length == 0) {
          resultado = true;
        } else {
          resultado = false;
        }
      },
    });
    return resultado;
  }
}
