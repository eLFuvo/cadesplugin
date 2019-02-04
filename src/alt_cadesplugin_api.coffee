###*
Библиотека для работы с плагином КриптоПРО
Версия 0.0.8 (beta)
Поддерживает плагин версии 2.0.12245
Репозиторий https://github.com/bankrot/cadesplugin
###

###*
Хранилище для инстанса
@property altCadespluginApiInstance
@type {AltCadesPlugin}
###
altCadespluginApiInstance = null

###*
@class AltCadesPlugin
###
AltCadesPlugin = class

  ###*
  Если TRUE значит плагин уже был проверен (но не факт что удачно)
  @property checked
  @type {Boolean}
  @default false
  ###
  checked: false

  ###*
  К этому объекту будет обращаться скрипт плагина
  @property cadesplugin
  @type {Object}
  ###
  cadesplugin: {}

  ###*
  DOM элемент плагина
  @property pluginObject
  ###
  pluginObject: null

  ###*
  Время ожидания ответа от плагина (для версии без NPAPI)
  @property timeout
  @type {Number}
  ###
  timeout: 20000

  ###*
  На основе webkit
  @property isWebkit
  @type {Boolean}
  ###
  isWebkit: do ->
    return navigator.userAgent.match(/chrome/i) or navigator.userAgent.match(/opera/i)

  ###*
  Internet Explorer
  @property isIE
  @type {Boolean}
  ###
  isIE: do ->
    return (navigator.appName is 'Microsoft Internet Explorer') or navigator.userAgent.match(/Trident\/./i)

  CAPICOM_LOCAL_MACHINE_STORE: 1
  CAPICOM_CURRENT_USER_STORE: 2
  CADESCOM_LOCAL_MACHINE_STORE: 1
  CADESCOM_CURRENT_USER_STORE: 2
  CADESCOM_CONTAINER_STORE: 100

  CAPICOM_MY_STORE: "My"

  CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED: 2

  CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME: 1

  CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED: 0
  CADESCOM_XML_SIGNATURE_TYPE_ENVELOPING: 1
  CADESCOM_XML_SIGNATURE_TYPE_TEMPLATE: 2

  XmlDsigGost3410UrlObsolete: "http://www.w3.org/2001/04/xmldsig-more#gostr34102001-gostr3411"
  XmlDsigGost3411UrlObsolete: "http://www.w3.org/2001/04/xmldsig-more#gostr3411"
  XmlDsigGost3410Url: "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102001-gostr3411"
  XmlDsigGost3411Url: "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr3411"

  CADESCOM_CADES_DEFAULT: 0
  CADESCOM_CADES_BES: 1
  CADESCOM_CADES_T: 0x5
  CADESCOM_CADES_X_LONG_TYPE_1: 0x5d

  CADESCOM_ENCODE_BASE64: 0
  CADESCOM_ENCODE_BINARY: 1
  CADESCOM_ENCODE_ANY: -1

  CAPICOM_CERTIFICATE_INCLUDE_CHAIN_EXCEPT_ROOT: 0
  CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN: 1
  CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY: 2

  CAPICOM_CERT_INFO_SUBJECT_SIMPLE_NAME: 0
  CAPICOM_CERT_INFO_ISSUER_SIMPLE_NAME: 1

  CAPICOM_CERTIFICATE_FIND_SHA1_HASH: 0
  CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME: 1
  CAPICOM_CERTIFICATE_FIND_ISSUER_NAME: 2
  CAPICOM_CERTIFICATE_FIND_ROOT_NAME: 3
  CAPICOM_CERTIFICATE_FIND_TEMPLATE_NAME: 4
  CAPICOM_CERTIFICATE_FIND_EXTENSION: 5
  CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY: 6
  CAPICOM_CERTIFICATE_FIND_APPLICATION_POLICY: 7
  CAPICOM_CERTIFICATE_FIND_CERTIFICATE_POLICY: 8
  CAPICOM_CERTIFICATE_FIND_TIME_VALID: 9
  CAPICOM_CERTIFICATE_FIND_TIME_NOT_YET_VALID: 10
  CAPICOM_CERTIFICATE_FIND_TIME_EXPIRED: 11
  CAPICOM_CERTIFICATE_FIND_KEY_USAGE: 12

  CAPICOM_DIGITAL_SIGNATURE_KEY_USAGE: 128

  CAPICOM_PROPID_ENHKEY_USAGE: 9

  CAPICOM_OID_OTHER: 0
  CAPICOM_OID_KEY_USAGE_EXTENSION: 10

  CAPICOM_EKU_CLIENT_AUTH: 2
  CAPICOM_EKU_SMARTCARD_LOGON: 5
  CAPICOM_EKU_OTHER: 0

  CAPICOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME: 0
  CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_NAME: 1
  CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_DESCRIPTION: 2
  CADESCOM_ATTRIBUTE_OTHER: -1

  CADESCOM_STRING_TO_UCS2LE: 0
  CADESCOM_BASE64_TO_BINARY: 1

  CADESCOM_DISPLAY_DATA_NONE: 0
  CADESCOM_DISPLAY_DATA_CONTENT: 1
  CADESCOM_DISPLAY_DATA_ATTRIBUTE: 2

  CADESCOM_ENCRYPTION_ALGORITHM_RC2: 0
  CADESCOM_ENCRYPTION_ALGORITHM_RC4: 1
  CADESCOM_ENCRYPTION_ALGORITHM_DES: 2
  CADESCOM_ENCRYPTION_ALGORITHM_3DES: 3
  CADESCOM_ENCRYPTION_ALGORITHM_AES: 4
  CADESCOM_ENCRYPTION_ALGORITHM_GOST_28147_89: 25

  CADESCOM_HASH_ALGORITHM_SHA1: 0
  CADESCOM_HASH_ALGORITHM_MD2: 1
  CADESCOM_HASH_ALGORITHM_MD4: 2
  CADESCOM_HASH_ALGORITHM_MD5: 3
  CADESCOM_HASH_ALGORITHM_SHA_256: 4
  CADESCOM_HASH_ALGORITHM_SHA_384: 5
  CADESCOM_HASH_ALGORITHM_SHA_512: 6
  CADESCOM_HASH_ALGORITHM_CP_GOST_3411: 100
  CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256: 101
  CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_512: 102

  LOG_LEVEL_DEBUG: 4
  LOG_LEVEL_INFO: 2
  LOG_LEVEL_ERROR: 1

  ###*
  Конструктор
  @method constructor
  @param options {Object} Опции
  @param [options.timeout] {Number} Время ожидания ответа плагина, в мс. По умолчанию 20000
  ###
  constructor: (options = {})->
    if altCadespluginApiInstance
      return altCadespluginApiInstance

    if options.timeout
      @timeout = options.timeout

    @cadesplugin.JSModuleVersion = '2.0'
    @cadesplugin.async_spawn = @asyncSpawn
    @cadesplugin.set = (object)=>
      @pluginObject = object
    window.cadesplugin = @cadesplugin

    altCadespluginApiInstance = @

  ###*
  Необходимый метод, его вызывает скрипт плагина
  @method asyncSpawn
  @param generatorFunc {Function} Колбэк
  ###
  asyncSpawn: (generatorFunc)->
    continuer = (verb, arg)->
      try
        result = generator[verb](arg)
      catch err
        return Promise.reject(err)
      if result.done
        return result.value
      else
        return Promise.resolve(result.value).then onFulfilled, onRejected
    generator = generatorFunc(Array.prototype.slice.call(arguments, 1))
    onFulfilled = continuer.bind continuer, 'next'
    onRejected = continuer.bind continuer, 'throw'
    return onFulfilled()

  ###*
  Инициализирует работу плагина в браузере без NPAPI (Например Google Chrome)
  @method init
  @return {jQuery.Deferred} Deferred объект
  ###
  init: =>
    # если плагин уже проверен, то возвращаем resolved промис
    if @checked
      return $.when()

    if @isWebkit
      return @initWebkit()
    else
      return @initNpapi()

  ###*
  Инициализирует плагин в webkit-браузерах
  @method initWebkit
  ###
  initWebkit: ->

    deferred = $.Deferred()

    # подключаем файл из плагина
    $.getScript 'chrome-extension://iifchhfnnmpdbibifmljnfjhpififfog/nmcades_plugin_api.js'
    .then =>
      window.postMessage 'cadesplugin_echo_request', '*'
    .fail =>
      deferred.reject 'plugin_not_installed'

    # обработчик события по загрузке плагина
    $(window).on 'message', (event)=>
      if event?.originalEvent?.data isnt 'cadesplugin_loaded'
        return
      setTimeout (->
        cpcsp_chrome_nmcades.check_chrome_plugin (=>
          @checked = true
          deferred.resolve()
        ), ((message)=>
          @checked = true
          deferred.reject message
        )
      ), 0

    # если через @timeout мс плагин все еще не вернул ответ, значит ошибка
    setTimeout (=>
      unless @checked
        deferred.reject 'timeout'
    ), @timeout

    return deferred

  ###*
  Инициализирует плагин в режиме NPAPI
  @method initNpapi
  ###
  initNpapi: ->
    deferred = $.Deferred()
    $(window).on 'load', (event)=>
      @loadNpapiPlugin()
      @checked = true
      result = @checkNpapiPlugin()
      if result is true
        deferred.resolve()
      else
        deferred.reject result
    return deferred

  ###*
  Загружает NPAPI плагин
  @method loadNpapiPlugin
  ###
  loadNpapiPlugin: ->
    object = $ '<object id="cadesplugin_object" type="application/x-cades" style="visibility:hidden;"></object>'
    $('body').append object
    @pluginObject = object[0]

    if @isIE
      ieObject = $ '<object id="certEnrollClassFactory" classid="clsid:884e2049-217d-11da-b2a4-000e7bbb2b09" style="visibility:hidden;"></object>'
      $('body').append ieObject

  ###*
  Проверяет плагин и возвращает true если проверка пройдена или строку с кодом ошибки
  @method checkNpapiPlugin
  ###
  checkNpapiPlugin: ->
    try
      @createObject 'CAdESCOM.About'
      return true
    catch error
      # Объект создать не удалось, проверим, установлен ли
      # вообще плагин. Такая возможность есть не во всех браузерах
      mimetype = navigator.mimeTypes['application/x-cades']
      if mimetype
        plugin = mimetype.enabledPlugin
        if plugin
          return 'plugin_not_loaded_but_object_cannot_create'
        else
          return 'error_on_plugin_load'
      else
        return 'plugin_unreachable'

  # Функция активации объектов КриптоПро ЭЦП Browser plug-in
  createObject: (name)->
    if @isIE
      # В Internet Explorer создаются COM-объекты
      if name.match /X509Enrollment/i
        try
          # Объекты CertEnroll создаются через CX509EnrollmentWebClassFactory
          return $('certEnrollClassFactory')[0].CreateObject name
        catch error
          throw 'setup_https_for_x509enrollment'

      # Объекты CAPICOM и CAdESCOM создаются обычным способом
      return new ActiveXObject(name)

    # В Firefox, Safari создаются объекты NPAPI
    return @pluginObject.CreateObject name

  ###*
  Возвращает параметр из объекта
  @method getParam
  @param objectName {Object|String} Уже созданный объект, или ранее полученный параметр, или название объекта
  @param paramName {Object|String} Имя параметра.
    Или объект с ключами method и args на случай если параметр нужно получить через выполнение функции
  @return {jQuery.Deferred} Deferred объект с разультатом выполнения в качестве аргумента колбэка
  ###
  getParam: (objectName, paramName)=>

    deferred = $.Deferred()

    if @isWebkit

      if typeof objectName is 'string'
        nativePromiseChain = @pluginObject.CreateObjectAsync objectName
        .then (object)=>
          if paramName
            @extractParam object, paramName
          else
            return object
      else
        nativePromiseChain = @extractParam objectName, paramName
      nativePromiseChain.then deferred.resolve, deferred.reject

    else

      try
        if typeof objectName is 'string'
          result = @createObject objectName
          if paramName
            result = @extractParam result, paramName
        else
          result = @extractParam objectName, paramName
        deferred.resolve result
      catch error
        deferred.reject error.message

    return deferred

  ###*
  Возвращает параметр объекта либо результат выполнения метода объекта (если param это объект)
  @method extractParam
  @param object {Object} Объект из которого надо получить параметр
  @param param {Object|String} Какой параметр надо получить (или какой метод выполнить)
  ###
  extractParam: (object, param)->
    if typeof param is 'object'
      # Здесь можно было бы использовать object[param.method].apply object, param.args
      # Но в IE у внешних объектов нет матода .apply
      switch param.args.length
        when 0 then object[param.method]()
        when 1 then object[param.method](param.args[0])
        when 2 then object[param.method](param.args[0], param.args[1])
        when 3 then object[param.method](param.args[0], param.args[1], param.args[2])
        when 4 then object[param.method](param.args[0], param.args[1], param.args[2], param.args[3])
    else
      return object[param]

  ###*
  Возвращает последний параметр из цепочки
  Например вызов altCadesPlugin.get('CAdESCOM.About', 'PluginVersion', 'MajorVersion') вернет MajorVersion в колбэк
  @method get
  @param objectName {Object|String} Уже созданный объект, или ранее полученный параметр, или название объекта
  @param paramName {String} Имя параметра. Таких параметров можно передавать неограниченное количество.
  @return {jQuery.Deferred} Deferred объект с разультатом выполнения в качестве аргумента колбэка
  ###
  get: (objectName, paramName, args...)=>
    @getParam objectName, paramName
    .then (object)=>
      if args.length > 0
        args.unshift object
        return @get.apply @, args
      else
        return object

  ###*
  Записывает данные в передаваемый объект
  Если плагин работает без NPAPI, то параметр записывается через метод propset_ParamName
  @method set
  @param object {Object} Объект плагина куда надо записать данные
  @param paramName {String} Название записываемого параметра
  @param value Значение параметра
  @return {jQuery.Deferred}
  ###
  set: (object, paramName, value)=>
    if @isWebkit
      param =
        method: 'propset_' + paramName
        args: [value]
      return @get object, param
    else
      deferred = $.Deferred()
      try
        object[paramName] = value
        deferred.resolve()
      catch error
        deferred.reject error.message
      return deferred

  ###*
  Возвращает объект с версиями плагина
  @method getVersion
  @return {jQuery.Deferred} В первый аргумент колбэка передается объект с ключами major, minor, build, full
  ###
  getVersion: ->
    $.when(
      @get 'CAdESCOM.About', 'PluginVersion', 'MajorVersion'
      @get 'CAdESCOM.About', 'PluginVersion', 'MinorVersion'
      @get 'CAdESCOM.About', 'PluginVersion', 'BuildVersion'
    )
    .then (major, minor, build)->
      result =
        major: major
        minor: minor
        build: build
        full: major + '.' + minor + '.' + build
      return result

  ###*
  Возвращает версию КриптоПРО CSP
  @method getCSPVersion
  @return {jQuery.Deferred} В первый аргумент колбэка передается объект с ключами major, minor, build, full
  ###
  getCSPVersion: ->
    $.when(
      @get 'CAdESCOM.About', {method: 'CSPVersion', args: ['', 75]}, 'MajorVersion'
      @get 'CAdESCOM.About', {method: 'CSPVersion', args: ['', 75]}, 'MinorVersion'
      @get 'CAdESCOM.About', {method: 'CSPVersion', args: ['', 75]}, 'BuildVersion'
    )
    .then (major, minor, build)->
      result =
        major: major
        minor: minor
        build: build
        full: major + '.' + minor + '.' + build
      return result

  ###*
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
  ###
  getCertificates: ->
    store = null
    certificates = null
    certificatesList = []
    @get 'CAdESCOM.Store'
    .then (_store)=>
      store = _store
      @get store, {method: 'Open', args: []}
    .then =>
      @get store, 'Certificates'
    .then (_certificates)=>
      certificates = _certificates
      @get certificates, 'Count'
    .then (count)=>
      unless count
        store.Close()
        return $.Deferred -> @reject 'certificates_not_found'

      # перебираем сертификаты, проверяем их на валидность, сохраняем всю инфу
      chain = $.when()
      $.each [1..count], (i, index)=>
        certificate = null
        chain = chain.then =>
          @get certificates, {method: 'Item', args: [index]}
        .then (certificate_)=>
          certificate = certificate_
          $.when(
            @get certificate, 'SubjectName'
            @get certificate, 'IssuerName'
            @get certificate, 'ValidFromDate'
            @get certificate, 'ValidToDate'
            @get certificate, {method: 'PublicKey', args: []}, 'Algorithm', 'FriendlyName'
            @get certificate, {method: 'HasPrivateKey', args: []}
            @get certificate, {method: 'IsValid', args: []}, 'Result'
            @get certificate, 'Thumbprint'
          )
        .then (subject, issuer, validFrom, validTo, algorithm, hasPrivateKey, isValid, thumbprint)=>
          if ((new Date()) < (new Date(validTo))) and hasPrivateKey and isValid
            certificatesList.push
              subject: subject
              issuer: issuer
              validFrom: validFrom
              validTo: validTo
              algorithm: algorithm
              hasPrivateKey: hasPrivateKey
              isValid: isValid
              thumbprint: thumbprint
              certificate: certificate
        .then null, =>
          return $.Deferred -> @reject 'certificate_read_error'

      return chain
    .then =>
      unless certificatesList.length
        return $.Deferred -> @reject 'valid_certificates_not_found'
      else
        return certificatesList

  ###*
  Подписывает данные
  @method signData
  @param data [String} Строка которую надо зашифровать (подписать)
  @param certificate {Object} Объект сертификата полученный из плагина
  @return {jQuery.Deferred} В первый аргумент колбэка передается зашифрованная строка
  ###
  signData: (data, certificate)->
    signer = null
    signedData = null

    @get 'CAdESCOM.CPSigner'
    .then (signer_)=>
      signer = signer_

      # следующая часть нужна только для webkit плагина
      unless @isWebkit
        return

      attribute1 = null
      attribute2 = null

      @get 'CAdESCOM.CPAttribute'
      .then (attribute1_)=>
        attribute1 = attribute1_
        @set attribute1, 'Name', 0
      .then =>
        @set attribute1, 'Value', new Date()
      .then =>
        @get signer, 'AuthenticatedAttributes2', {method: 'Add', args: [attribute1]}
      .then =>
        @get 'CADESCOM.CPAttribute'
      .then (attribute2_)=>
        attribute2 = attribute2_
        @set attribute2, 'Name', 1
      .then =>
        @set attribute2, 'Value', 'Document Name'
      .then =>
        @get signer, 'AuthenticatedAttributes2', {method: 'Add', args: [attribute2]}

    .then =>
      @set signer, 'Certificate', certificate
    .then =>
      @get 'CAdESCOM.CadesSignedData'
    .then (signedData_)=>
      signedData = signedData_
      @set signedData, 'Content', data
    .then =>
      @set signer, 'Options', @.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN
    .then =>
      @get signedData, {method: 'SignCades', args: [signer, @.CADESCOM_CADES_BES]}
    .then (signature)=>
      return signature

  ###*
  Подписывает данные в Base64
  @method signData
  @param data [String} Строка которую надо зашифровать (подписать)
  @param certificate {Object} Объект сертификата полученный из плагина
  @return {jQuery.Deferred} В первый аргумент колбэка передается зашифрованная строка
  ###
  signDataBase64: (data, certificate)->
    signer = null
    signedData = null

    @get 'CAdESCOM.CPSigner'
      .then (signer_)=>
        signer = signer_

        # следующая часть нужна только для webkit плагина
        unless @isWebkit
          return

        attribute1 = null
        attribute2 = null

        @get 'CAdESCOM.CPAttribute'
          .then (attribute1_)=>
            attribute1 = attribute1_
            @set attribute1, 'Name', 0
          .then =>
            @set attribute1, 'Value', new Date()
          .then =>
            @get signer, 'AuthenticatedAttributes2', {method: 'Add', args: [attribute1]}
          .then =>
            @get 'CADESCOM.CPAttribute'
          .then (attribute2_)=>
            attribute2 = attribute2_
            @set attribute2, 'Name', 1
          .then =>
            @set attribute2, 'Value', 'Document Name'
          .then =>
            @get signer, 'AuthenticatedAttributes2', {method: 'Add', args: [attribute2]}

      .then =>
        @set signer, 'Certificate', certificate
      .then =>
        @get 'CAdESCOM.CadesSignedData'
      .then (signedData_)=>
       signedData = signedData_
       signedData.ContentEncoding = @.CADESCOM_BASE64_TO_BINARY
       @set signedData, 'Content', Base64.encode(data)
      .then =>
       @set signer, 'Options', @.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN
      .then =>
       @get signedData, {method: 'SignCades', args: [signer, @.CADESCOM_CADES_BES]}
      .then (signature)=>
        return signature
  ###*
  Проверяет подписанные данные
  @method verifySign
  @param signature [String} Подпись
  @param isBase64 [Boolean} данные в base64?
  @return {jQuery.Deferred}
  ###
  verifySign: (signature)->
    signedData = null
    @get 'CAdESCOM.CadesSignedData'
      .then (signedData_)=>
       signedData = signedData_
      .then =>
        return signedData.VerifyCades(signature, @.CADESCOM_CADES_BES)
