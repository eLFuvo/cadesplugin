var $logBlock, altCadesPlugin, certificatesList, init, signData, verifySign;

altCadesPlugin = null;

certificatesList = null;

$logBlock = null;

init = (function(_this) {
  return function() {
    var deferred;
    $logBlock = $('#ui-log-block');
    altCadesPlugin = new AltCadesPlugin();
    $logBlock.append('<h3>Проверка наличия плагина<h3>');
    if (bowser.chrome || bowser.firefox || bowser.msie) {
      deferred = altCadesPlugin.init();
    } else {
      deferred = $.Deferred(function() {
        return this.reject('Браузер не поддерживается');
      });
    }
    return deferred.then(function() {
      $logBlock.append('<p>Плагин подключен<p>');
      return $.when(altCadesPlugin.getVersion(), $.get('https://www.cryptopro.ru/sites/default/files/products/cades/latest_2_0.txt'));
    }).then(function(installedVersion, currentVersion) {
      var ref;
      if (installedVersion.full === ((ref = currentVersion[0]) != null ? ref.trim() : void 0)) {
        $logBlock.append('<p>У вас последняя версия плагина (' + installedVersion.full + ')<p>');
      } else {
        $logBlock.append('<p>У вас не последняя версия плагина. Рекомендуем обновить.<p>');
      }
      return altCadesPlugin.getCSPVersion();
    }).then(function(cspVersion) {
      $logBlock.append('<p>Версия CSP (' + cspVersion.full + ')<p>');
      return altCadesPlugin.getCertificates();
    }).then(function(certificatesList_) {
      var selectHtml;
      certificatesList = certificatesList_;
      $logBlock.append('<p>Количество валидных сертификатов ' + +certificatesList.length + '<p>');
      selectHtml = '<p><select id="ui-certificates-select">';
      $.each(certificatesList, function(index, certificate) {
        return selectHtml += '<option value="' + index + '">' + certificate.subject + ' ' + certificate.validFrom + '</option>';
      });
      selectHtml += '</select></p>';
      return $logBlock.append(selectHtml);
    }).then(function() {
      $logBlock.append("<p>\n  Введите данные которые надо подписать\n  <br>\n  <input id=\"ui-data-input\" style=\"width: 500px;\" value=\"Hello World\">\n</p>\n<p>\n  <label><input type=\"checkbox\" id=\"signBase64\"> Подписать как Base64 данные</label>\n</p>\n<p>\n  <button type=\"button\" id=\"ui-sign-button\">Подписать</button>&nbsp;&nbsp;\n  <button type=\"button\" id=\"ui-verify-button\" disabled=\"disabled\">Проверить подпись</button>\n</p>");
      $('#ui-sign-button').on('click', signData);
      return $('#ui-verify-button').on('click', verifySign);
    }).fail(function(message) {
      if (message) {
        return $logBlock.append('<p style="color: #E23131">' + message + '<p>');
      }
    });
  };
})(this);


/**
Подписывает данные введенные в поле ввода
@method signData
 */

signData = function() {
  var certificateIndex, data, isBase64;
  certificateIndex = +$('#ui-certificates-select').val();
  data = $('#ui-data-input').val();
  isBase64 = $('#signBase64').is(':checked');
  if (!data) {
    alert('Введите данные для подписывания');
  }
  if (isBase64) {
    return altCadesPlugin.signDataBase64(data, certificatesList[certificateIndex].certificate).then(function(signature) {
      $logBlock.append('<pre id="signature">' + signature + '</pre>');
      return $("#ui-verify-button").prop("disabled", false);
    }).fail(function(message) {
      if (message) {
        console.error(message);
        return $logBlock.append('<p style="color: #E23131">' + message + '<p>');
      }
    });
  }
  if (!isBase64) {
    return altCadesPlugin.signData(data, certificatesList[certificateIndex].certificate).then(function(signature) {
      $logBlock.append('<pre id="signature">' + signature + '</pre>');
      return $("#ui-verify-button").prop("disabled", false);
    }).fail(function(message) {
      if (message) {
        console.error(message);
        return $logBlock.append('<p style="color: #E23131">' + message + '<p>');
      }
    });
  }
};


/**
Проверка подписанных данных
@verifySign
 */

verifySign = function() {
  var signature;
  signature = $('#signature').text();
  return altCadesPlugin.verifySign(signature).then((function(_this) {
    return function() {
      return alert('Успешная проверка подписи');
    };
  })(this)).fail((function(_this) {
    return function(message) {
      alert('Подпись не действительна');
      return console.error(message);
    };
  })(this));
};

$(init);
