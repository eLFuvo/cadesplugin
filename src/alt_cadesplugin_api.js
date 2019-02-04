;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.AltCadesPlugin = factory();
  }
}(this, function() {

/**
Библиотека для работы с плагином КриптоПРО
Версия 0.0.8 (beta)
Поддерживает плагин версии 2.0.12245
Репозиторий https://github.com/bankrot/cadesplugin
 */

/**
Хранилище для инстанса
@property altCadespluginApiInstance
@type {AltCadesPlugin}
 */
var AltCadesPlugin, altCadespluginApiInstance,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  slice = [].slice;

altCadespluginApiInstance = null;


/**
@class AltCadesPlugin
 */

AltCadesPlugin = (function() {

  /**
  Если TRUE значит плагин уже был проверен (но не факт что удачно)
  @property checked
  @type {Boolean}
  @default false
   */
  _Class.prototype.checked = false;


  /**
  К этому объекту будет обращаться скрипт плагина
  @property cadesplugin
  @type {Object}
   */

  _Class.prototype.cadesplugin = {};


  /**
  DOM элемент плагина
  @property pluginObject
   */

  _Class.prototype.pluginObject = null;


  /**
  Время ожидания ответа от плагина (для версии без NPAPI)
  @property timeout
  @type {Number}
   */

  _Class.prototype.timeout = 20000;


  /**
  На основе webkit
  @property isWebkit
  @type {Boolean}
   */

  _Class.prototype.isWebkit = (function() {
    return navigator.userAgent.match(/chrome/i) || navigator.userAgent.match(/opera/i);
  })();


  /**
  Internet Explorer
  @property isIE
  @type {Boolean}
   */

  _Class.prototype.isIE = (function() {
    return (navigator.appName === 'Microsoft Internet Explorer') || navigator.userAgent.match(/Trident\/./i);
  })();

  _Class.prototype.CAPICOM_LOCAL_MACHINE_STORE = 1;

  _Class.prototype.CAPICOM_CURRENT_USER_STORE = 2;

  _Class.prototype.CADESCOM_LOCAL_MACHINE_STORE = 1;

  _Class.prototype.CADESCOM_CURRENT_USER_STORE = 2;

  _Class.prototype.CADESCOM_CONTAINER_STORE = 100;

  _Class.prototype.CAPICOM_MY_STORE = "My";

  _Class.prototype.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED = 2;

  _Class.prototype.CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME = 1;

  _Class.prototype.CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED = 0;

  _Class.prototype.CADESCOM_XML_SIGNATURE_TYPE_ENVELOPING = 1;

  _Class.prototype.CADESCOM_XML_SIGNATURE_TYPE_TEMPLATE = 2;

  _Class.prototype.XmlDsigGost3410UrlObsolete = "http://www.w3.org/2001/04/xmldsig-more#gostr34102001-gostr3411";

  _Class.prototype.XmlDsigGost3411UrlObsolete = "http://www.w3.org/2001/04/xmldsig-more#gostr3411";

  _Class.prototype.XmlDsigGost3410Url = "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102001-gostr3411";

  _Class.prototype.XmlDsigGost3411Url = "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr3411";

  _Class.prototype.CADESCOM_CADES_DEFAULT = 0;

  _Class.prototype.CADESCOM_CADES_BES = 1;

  _Class.prototype.CADESCOM_CADES_T = 0x5;

  _Class.prototype.CADESCOM_CADES_X_LONG_TYPE_1 = 0x5d;

  _Class.prototype.CADESCOM_ENCODE_BASE64 = 0;

  _Class.prototype.CADESCOM_ENCODE_BINARY = 1;

  _Class.prototype.CADESCOM_ENCODE_ANY = -1;

  _Class.prototype.CAPICOM_CERTIFICATE_INCLUDE_CHAIN_EXCEPT_ROOT = 0;

  _Class.prototype.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN = 1;

  _Class.prototype.CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY = 2;

  _Class.prototype.CAPICOM_CERT_INFO_SUBJECT_SIMPLE_NAME = 0;

  _Class.prototype.CAPICOM_CERT_INFO_ISSUER_SIMPLE_NAME = 1;

  _Class.prototype.CAPICOM_CERTIFICATE_FIND_SHA1_HASH = 0;

  _Class.prototype.CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME = 1;

  _Class.prototype.CAPICOM_CERTIFICATE_FIND_ISSUER_NAME = 2;

  _Class.prototype.CAPICOM_CERTIFICATE_FIND_ROOT_NAME = 3;

  _Class.prototype.CAPICOM_CERTIFICATE_FIND_TEMPLATE_NAME = 4;

  _Class.prototype.CAPICOM_CERTIFICATE_FIND_EXTENSION = 5;

  _Class.prototype.CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY = 6;

  _Class.prototype.CAPICOM_CERTIFICATE_FIND_APPLICATION_POLICY = 7;

  _Class.prototype.CAPICOM_CERTIFICATE_FIND_CERTIFICATE_POLICY = 8;

  _Class.prototype.CAPICOM_CERTIFICATE_FIND_TIME_VALID = 9;

  _Class.prototype.CAPICOM_CERTIFICATE_FIND_TIME_NOT_YET_VALID = 10;

  _Class.prototype.CAPICOM_CERTIFICATE_FIND_TIME_EXPIRED = 11;

  _Class.prototype.CAPICOM_CERTIFICATE_FIND_KEY_USAGE = 12;

  _Class.prototype.CAPICOM_DIGITAL_SIGNATURE_KEY_USAGE = 128;

  _Class.prototype.CAPICOM_PROPID_ENHKEY_USAGE = 9;

  _Class.prototype.CAPICOM_OID_OTHER = 0;

  _Class.prototype.CAPICOM_OID_KEY_USAGE_EXTENSION = 10;

  _Class.prototype.CAPICOM_EKU_CLIENT_AUTH = 2;

  _Class.prototype.CAPICOM_EKU_SMARTCARD_LOGON = 5;

  _Class.prototype.CAPICOM_EKU_OTHER = 0;

  _Class.prototype.CAPICOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME = 0;

  _Class.prototype.CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_NAME = 1;

  _Class.prototype.CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_DESCRIPTION = 2;

  _Class.prototype.CADESCOM_ATTRIBUTE_OTHER = -1;

  _Class.prototype.CADESCOM_STRING_TO_UCS2LE = 0;

  _Class.prototype.CADESCOM_BASE64_TO_BINARY = 1;

  _Class.prototype.CADESCOM_DISPLAY_DATA_NONE = 0;

  _Class.prototype.CADESCOM_DISPLAY_DATA_CONTENT = 1;

  _Class.prototype.CADESCOM_DISPLAY_DATA_ATTRIBUTE = 2;

  _Class.prototype.CADESCOM_ENCRYPTION_ALGORITHM_RC2 = 0;

  _Class.prototype.CADESCOM_ENCRYPTION_ALGORITHM_RC4 = 1;

  _Class.prototype.CADESCOM_ENCRYPTION_ALGORITHM_DES = 2;

  _Class.prototype.CADESCOM_ENCRYPTION_ALGORITHM_3DES = 3;

  _Class.prototype.CADESCOM_ENCRYPTION_ALGORITHM_AES = 4;

  _Class.prototype.CADESCOM_ENCRYPTION_ALGORITHM_GOST_28147_89 = 25;

  _Class.prototype.CADESCOM_HASH_ALGORITHM_SHA1 = 0;

  _Class.prototype.CADESCOM_HASH_ALGORITHM_MD2 = 1;

  _Class.prototype.CADESCOM_HASH_ALGORITHM_MD4 = 2;

  _Class.prototype.CADESCOM_HASH_ALGORITHM_MD5 = 3;

  _Class.prototype.CADESCOM_HASH_ALGORITHM_SHA_256 = 4;

  _Class.prototype.CADESCOM_HASH_ALGORITHM_SHA_384 = 5;

  _Class.prototype.CADESCOM_HASH_ALGORITHM_SHA_512 = 6;

  _Class.prototype.CADESCOM_HASH_ALGORITHM_CP_GOST_3411 = 100;

  _Class.prototype.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256 = 101;

  _Class.prototype.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_512 = 102;

  _Class.prototype.LOG_LEVEL_DEBUG = 4;

  _Class.prototype.LOG_LEVEL_INFO = 2;

  _Class.prototype.LOG_LEVEL_ERROR = 1;


  /**
  Конструктор
  @method constructor
  @param options {Object} Опции
  @param [options.timeout] {Number} Время ожидания ответа плагина, в мс. По умолчанию 20000
   */

  function _Class(options) {
    if (options == null) {
      options = {};
    }
    this.set = bind(this.set, this);
    this.get = bind(this.get, this);
    this.getParam = bind(this.getParam, this);
    this.init = bind(this.init, this);
    if (altCadespluginApiInstance) {
      return altCadespluginApiInstance;
    }
    if (options.timeout) {
      this.timeout = options.timeout;
    }
    this.cadesplugin.JSModuleVersion = '2.0';
    this.cadesplugin.async_spawn = this.asyncSpawn;
    this.cadesplugin.set = (function(_this) {
      return function(object) {
        return _this.pluginObject = object;
      };
    })(this);
    window.cadesplugin = this.cadesplugin;
    altCadespluginApiInstance = this;
  }


  /**
  Необходимый метод, его вызывает скрипт плагина
  @method asyncSpawn
  @param generatorFunc {Function} Колбэк
   */

  _Class.prototype.asyncSpawn = function(generatorFunc) {
    var continuer, generator, onFulfilled, onRejected;
    continuer = function(verb, arg) {
      var err, result;
      try {
        result = generator[verb](arg);
      } catch (error1) {
        err = error1;
        return Promise.reject(err);
      }
      if (result.done) {
        return result.value;
      } else {
        return Promise.resolve(result.value).then(onFulfilled, onRejected);
      }
    };
    generator = generatorFunc(Array.prototype.slice.call(arguments, 1));
    onFulfilled = continuer.bind(continuer, 'next');
    onRejected = continuer.bind(continuer, 'throw');
    return onFulfilled();
  };


  /**
  Инициализирует работу плагина в браузере без NPAPI (Например Google Chrome)
  @method init
  @return {jQuery.Deferred} Deferred объект
   */

  _Class.prototype.init = function() {
    if (this.checked) {
      return $.when();
    }
    if (this.isWebkit) {
      return this.initWebkit();
    } else {
      return this.initNpapi();
    }
  };


  /**
  Инициализирует плагин в webkit-браузерах
  @method initWebkit
   */

  _Class.prototype.initWebkit = function() {
    var deferred;
    deferred = $.Deferred();
    $.getScript('chrome-extension://iifchhfnnmpdbibifmljnfjhpififfog/nmcades_plugin_api.js').then((function(_this) {
      return function() {
        return window.postMessage('cadesplugin_echo_request', '*');
      };
    })(this)).fail((function(_this) {
      return function() {
        return deferred.reject('plugin_not_installed');
      };
    })(this));
    $(window).on('message', (function(_this) {
      return function(event) {
        var ref;
        if ((event != null ? (ref = event.originalEvent) != null ? ref.data : void 0 : void 0) !== 'cadesplugin_loaded') {
          return;
        }
        return setTimeout((function() {
          return cpcsp_chrome_nmcades.check_chrome_plugin(((function(_this) {
            return function() {
              _this.checked = true;
              return deferred.resolve();
            };
          })(this)), ((function(_this) {
            return function(message) {
              _this.checked = true;
              return deferred.reject(message);
            };
          })(this)));
        }), 0);
      };
    })(this));
    setTimeout(((function(_this) {
      return function() {
        if (!_this.checked) {
          return deferred.reject('timeout');
        }
      };
    })(this)), this.timeout);
    return deferred;
  };


  /**
  Инициализирует плагин в режиме NPAPI
  @method initNpapi
   */

  _Class.prototype.initNpapi = function() {
    var deferred;
    deferred = $.Deferred();
    $(window).on('load', (function(_this) {
      return function(event) {
        var result;
        _this.loadNpapiPlugin();
        _this.checked = true;
        result = _this.checkNpapiPlugin();
        if (result === true) {
          return deferred.resolve();
        } else {
          return deferred.reject(result);
        }
      };
    })(this));
    return deferred;
  };


  /**
  Загружает NPAPI плагин
  @method loadNpapiPlugin
   */

  _Class.prototype.loadNpapiPlugin = function() {
    var ieObject, object;
    object = $('<object id="cadesplugin_object" type="application/x-cades" style="visibility:hidden;"></object>');
    $('body').append(object);
    this.pluginObject = object[0];
    if (this.isIE) {
      ieObject = $('<object id="certEnrollClassFactory" classid="clsid:884e2049-217d-11da-b2a4-000e7bbb2b09" style="visibility:hidden;"></object>');
      return $('body').append(ieObject);
    }
  };


  /**
  Проверяет плагин и возвращает true если проверка пройдена или строку с кодом ошибки
  @method checkNpapiPlugin
   */

  _Class.prototype.checkNpapiPlugin = function() {
    var error, mimetype, plugin;
    try {
      this.createObject('CAdESCOM.About');
      return true;
    } catch (error1) {
      error = error1;
      mimetype = navigator.mimeTypes['application/x-cades'];
      if (mimetype) {
        plugin = mimetype.enabledPlugin;
        if (plugin) {
          return 'plugin_not_loaded_but_object_cannot_create';
        } else {
          return 'error_on_plugin_load';
        }
      } else {
        return 'plugin_unreachable';
      }
    }
  };

  _Class.prototype.createObject = function(name) {
    var error;
    if (this.isIE) {
      if (name.match(/X509Enrollment/i)) {
        try {
          return $('certEnrollClassFactory')[0].CreateObject(name);
        } catch (error1) {
          error = error1;
          throw 'setup_https_for_x509enrollment';
        }
      }
      return new ActiveXObject(name);
    }
    return this.pluginObject.CreateObject(name);
  };


  /**
  Возвращает параметр из объекта
  @method getParam
  @param objectName {Object|String} Уже созданный объект, или ранее полученный параметр, или название объекта
  @param paramName {Object|String} Имя параметра.
    Или объект с ключами method и args на случай если параметр нужно получить через выполнение функции
  @return {jQuery.Deferred} Deferred объект с разультатом выполнения в качестве аргумента колбэка
   */

  _Class.prototype.getParam = function(objectName, paramName) {
    var deferred, error, nativePromiseChain, result;
    deferred = $.Deferred();
    if (this.isWebkit) {
      if (typeof objectName === 'string') {
        nativePromiseChain = this.pluginObject.CreateObjectAsync(objectName).then((function(_this) {
          return function(object) {
            if (paramName) {
              return _this.extractParam(object, paramName);
            } else {
              return object;
            }
          };
        })(this));
      } else {
        nativePromiseChain = this.extractParam(objectName, paramName);
      }
      nativePromiseChain.then(deferred.resolve, deferred.reject);
    } else {
      try {
        if (typeof objectName === 'string') {
          result = this.createObject(objectName);
          if (paramName) {
            result = this.extractParam(result, paramName);
          }
        } else {
          result = this.extractParam(objectName, paramName);
        }
        deferred.resolve(result);
      } catch (error1) {
        error = error1;
        deferred.reject(error.message);
      }
    }
    return deferred;
  };


  /**
  Возвращает параметр объекта либо результат выполнения метода объекта (если param это объект)
  @method extractParam
  @param object {Object} Объект из которого надо получить параметр
  @param param {Object|String} Какой параметр надо получить (или какой метод выполнить)
   */

  _Class.prototype.extractParam = function(object, param) {
    if (typeof param === 'object') {
      switch (param.args.length) {
        case 0:
          return object[param.method]();
        case 1:
          return object[param.method](param.args[0]);
        case 2:
          return object[param.method](param.args[0], param.args[1]);
        case 3:
          return object[param.method](param.args[0], param.args[1], param.args[2]);
        case 4:
          return object[param.method](param.args[0], param.args[1], param.args[2], param.args[3]);
      }
    } else {
      return object[param];
    }
  };


  /**
  Возвращает последний параметр из цепочки
  Например вызов altCadesPlugin.get('CAdESCOM.About', 'PluginVersion', 'MajorVersion') вернет MajorVersion в колбэк
  @method get
  @param objectName {Object|String} Уже созданный объект, или ранее полученный параметр, или название объекта
  @param paramName {String} Имя параметра. Таких параметров можно передавать неограниченное количество.
  @return {jQuery.Deferred} Deferred объект с разультатом выполнения в качестве аргумента колбэка
   */

  _Class.prototype.get = function() {
    var args, objectName, paramName;
    objectName = arguments[0], paramName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
    return this.getParam(objectName, paramName).then((function(_this) {
      return function(object) {
        if (args.length > 0) {
          args.unshift(object);
          return _this.get.apply(_this, args);
        } else {
          return object;
        }
      };
    })(this));
  };


  /**
  Записывает данные в передаваемый объект
  Если плагин работает без NPAPI, то параметр записывается через метод propset_ParamName
  @method set
  @param object {Object} Объект плагина куда надо записать данные
  @param paramName {String} Название записываемого параметра
  @param value Значение параметра
  @return {jQuery.Deferred}
   */

  _Class.prototype.set = function(object, paramName, value) {
    var deferred, error, param;
    if (this.isWebkit) {
      param = {
        method: 'propset_' + paramName,
        args: [value]
      };
      return this.get(object, param);
    } else {
      deferred = $.Deferred();
      try {
        object[paramName] = value;
        deferred.resolve();
      } catch (error1) {
        error = error1;
        deferred.reject(error.message);
      }
      return deferred;
    }
  };


  /**
  Возвращает объект с версиями плагина
  @method getVersion
  @return {jQuery.Deferred} В первый аргумент колбэка передается объект с ключами major, minor, build, full
   */

  _Class.prototype.getVersion = function() {
    return $.when(this.get('CAdESCOM.About', 'PluginVersion', 'MajorVersion'), this.get('CAdESCOM.About', 'PluginVersion', 'MinorVersion'), this.get('CAdESCOM.About', 'PluginVersion', 'BuildVersion')).then(function(major, minor, build) {
      var result;
      result = {
        major: major,
        minor: minor,
        build: build,
        full: major + '.' + minor + '.' + build
      };
      return result;
    });
  };


  /**
  Возвращает версию КриптоПРО CSP
  @method getCSPVersion
  @return {jQuery.Deferred} В первый аргумент колбэка передается объект с ключами major, minor, build, full
   */

  _Class.prototype.getCSPVersion = function() {
    return $.when(this.get('CAdESCOM.About', {
      method: 'CSPVersion',
      args: ['', 75]
    }, 'MajorVersion'), this.get('CAdESCOM.About', {
      method: 'CSPVersion',
      args: ['', 75]
    }, 'MinorVersion'), this.get('CAdESCOM.About', {
      method: 'CSPVersion',
      args: ['', 75]
    }, 'BuildVersion')).then(function(major, minor, build) {
      var result;
      result = {
        major: major,
        minor: minor,
        build: build,
        full: major + '.' + minor + '.' + build
      };
      return result;
    });
  };


  /**
  Возвращает список сертификатов
  @method getCertificates
  @return {jQuery.Deferred} В первый аргумент колбэка передается массив,
    каждый элемент которого это объект со следующими ключами:
      subject: владелец сертификата
      issuer: издатель сертификата
      validFrom: дата начала действия сертификата, дата выдачи
      validTo: дата окночания действия сертификата
      algorithm: алгоритм шифрования
      hasPrivateKey: наличие закрытого ключа
      isValid: валидность
      thumbprint: слепок, хэш
      certificate: объект сертификата
    Если произошла ошибка, то передается строка с описанием ошибки:
    - certificates_not_found - Не найдено ни одного сертификата
    - valid_certificates_not_found - Не найдено ни одного валидного сертификата
    - certificate_read_error - Ошибка чтения одного из сертификатов
   */

  _Class.prototype.getCertificates = function() {
    var certificates, certificatesList, store;
    store = null;
    certificates = null;
    certificatesList = [];
    return this.get('CAdESCOM.Store').then((function(_this) {
      return function(_store) {
        store = _store;
        return _this.get(store, {
          method: 'Open',
          args: []
        });
      };
    })(this)).then((function(_this) {
      return function() {
        return _this.get(store, 'Certificates');
      };
    })(this)).then((function(_this) {
      return function(_certificates) {
        certificates = _certificates;
        return _this.get(certificates, 'Count');
      };
    })(this)).then((function(_this) {
      return function(count) {
        var chain, j, results;
        if (!count) {
          store.Close();
          return $.Deferred(function() {
            return this.reject('certificates_not_found');
          });
        }
        chain = $.when();
        $.each((function() {
          results = [];
          for (var j = 1; 1 <= count ? j <= count : j >= count; 1 <= count ? j++ : j--){ results.push(j); }
          return results;
        }).apply(this), function(i, index) {
          var certificate;
          certificate = null;
          return chain = chain.then(function() {
            return _this.get(certificates, {
              method: 'Item',
              args: [index]
            });
          }).then(function(certificate_) {
            certificate = certificate_;
            return $.when(_this.get(certificate, 'SubjectName'), _this.get(certificate, 'IssuerName'), _this.get(certificate, 'ValidFromDate'), _this.get(certificate, 'ValidToDate'), _this.get(certificate, {
              method: 'PublicKey',
              args: []
            }, 'Algorithm', 'FriendlyName'), _this.get(certificate, {
              method: 'HasPrivateKey',
              args: []
            }), _this.get(certificate, {
              method: 'IsValid',
              args: []
            }, 'Result'), _this.get(certificate, 'Thumbprint'));
          }).then(function(subject, issuer, validFrom, validTo, algorithm, hasPrivateKey, isValid, thumbprint) {
            if (((new Date()) < (new Date(validTo))) && hasPrivateKey && isValid) {
              return certificatesList.push({
                subject: subject,
                issuer: issuer,
                validFrom: validFrom,
                validTo: validTo,
                algorithm: algorithm,
                hasPrivateKey: hasPrivateKey,
                isValid: isValid,
                thumbprint: thumbprint,
                certificate: certificate
              });
            }
          }).then(null, function() {
            return $.Deferred(function() {
              return this.reject('certificate_read_error');
            });
          });
        });
        return chain;
      };
    })(this)).then((function(_this) {
      return function() {
        if (!certificatesList.length) {
          return $.Deferred(function() {
            return this.reject('valid_certificates_not_found');
          });
        } else {
          return certificatesList;
        }
      };
    })(this));
  };


  /**
  Подписывает данные
  @method signData
  @param data [String} Строка которую надо зашифровать (подписать)
  @param certificate {Object} Объект сертификата полученный из плагина
  @return {jQuery.Deferred} В первый аргумент колбэка передается зашифрованная строка
   */

  _Class.prototype.signData = function(data, certificate) {
    var signedData, signer;
    signer = null;
    signedData = null;
    return this.get('CAdESCOM.CPSigner').then((function(_this) {
      return function(signer_) {
        var attribute1, attribute2;
        signer = signer_;
        if (!_this.isWebkit) {
          return;
        }
        attribute1 = null;
        attribute2 = null;
        return _this.get('CAdESCOM.CPAttribute').then(function(attribute1_) {
          attribute1 = attribute1_;
          return _this.set(attribute1, 'Name', 0);
        }).then(function() {
          return _this.set(attribute1, 'Value', new Date());
        }).then(function() {
          return _this.get(signer, 'AuthenticatedAttributes2', {
            method: 'Add',
            args: [attribute1]
          });
        }).then(function() {
          return _this.get('CADESCOM.CPAttribute');
        }).then(function(attribute2_) {
          attribute2 = attribute2_;
          return _this.set(attribute2, 'Name', 1);
        }).then(function() {
          return _this.set(attribute2, 'Value', 'Document Name');
        }).then(function() {
          return _this.get(signer, 'AuthenticatedAttributes2', {
            method: 'Add',
            args: [attribute2]
          });
        });
      };
    })(this)).then((function(_this) {
      return function() {
        return _this.set(signer, 'Certificate', certificate);
      };
    })(this)).then((function(_this) {
      return function() {
        return _this.get('CAdESCOM.CadesSignedData');
      };
    })(this)).then((function(_this) {
      return function(signedData_) {
        signedData = signedData_;
        return _this.set(signedData, 'Content', data);
      };
    })(this)).then((function(_this) {
      return function() {
        return _this.set(signer, 'Options', _this.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN);
      };
    })(this)).then((function(_this) {
      return function() {
        return _this.get(signedData, {
          method: 'SignCades',
          args: [signer, _this.CADESCOM_CADES_BES]
        });
      };
    })(this)).then((function(_this) {
      return function(signature) {
        return signature;
      };
    })(this));
  };


  /**
  Подписывает данные в Base64
  @method signData
  @param data [String} Строка которую надо зашифровать (подписать)
  @param certificate {Object} Объект сертификата полученный из плагина
  @return {jQuery.Deferred} В первый аргумент колбэка передается зашифрованная строка
   */

  _Class.prototype.signDataBase64 = function(data, certificate) {
    var signedData, signer;
    signer = null;
    signedData = null;
    return this.get('CAdESCOM.CPSigner').then((function(_this) {
      return function(signer_) {
        var attribute1, attribute2;
        signer = signer_;
        if (!_this.isWebkit) {
          return;
        }
        attribute1 = null;
        attribute2 = null;
        return _this.get('CAdESCOM.CPAttribute').then(function(attribute1_) {
          attribute1 = attribute1_;
          return _this.set(attribute1, 'Name', 0);
        }).then(function() {
          return _this.set(attribute1, 'Value', new Date());
        }).then(function() {
          return _this.get(signer, 'AuthenticatedAttributes2', {
            method: 'Add',
            args: [attribute1]
          });
        }).then(function() {
          return _this.get('CADESCOM.CPAttribute');
        }).then(function(attribute2_) {
          attribute2 = attribute2_;
          return _this.set(attribute2, 'Name', 1);
        }).then(function() {
          return _this.set(attribute2, 'Value', 'Document Name');
        }).then(function() {
          return _this.get(signer, 'AuthenticatedAttributes2', {
            method: 'Add',
            args: [attribute2]
          });
        });
      };
    })(this)).then((function(_this) {
      return function() {
        return _this.set(signer, 'Certificate', certificate);
      };
    })(this)).then((function(_this) {
      return function() {
        return _this.get('CAdESCOM.CadesSignedData');
      };
    })(this)).then((function(_this) {
      return function(signedData_) {
        signedData = signedData_;
        signedData.ContentEncoding = _this.CADESCOM_BASE64_TO_BINARY;
        return _this.set(signedData, 'Content', Base64.encode(data));
      };
    })(this)).then((function(_this) {
      return function() {
        return _this.set(signer, 'Options', _this.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN);
      };
    })(this)).then((function(_this) {
      return function() {
        return _this.get(signedData, {
          method: 'SignCades',
          args: [signer, _this.CADESCOM_CADES_BES]
        });
      };
    })(this)).then((function(_this) {
      return function(signature) {
        return signature;
      };
    })(this));
  };

  return _Class;

})();

return AltCadesPlugin;
}));
