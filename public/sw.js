(() => {
  // node_modules/workbox-core/_version.js
  try {
    self["workbox:core:6.5.3"] && _();
  } catch (e) {
  }

  // node_modules/workbox-core/_private/logger.js
  var logger = true ? null : (() => {
    if (!("__WB_DISABLE_DEV_LOGS" in self)) {
      self.__WB_DISABLE_DEV_LOGS = false;
    }
    let inGroup = false;
    const methodToColorMap = {
      debug: `#7f8c8d`,
      log: `#2ecc71`,
      warn: `#f39c12`,
      error: `#c0392b`,
      groupCollapsed: `#3498db`,
      groupEnd: null
    };
    const print = function(method, args) {
      if (self.__WB_DISABLE_DEV_LOGS) {
        return;
      }
      if (method === "groupCollapsed") {
        if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
          console[method](...args);
          return;
        }
      }
      const styles = [
        `background: ${methodToColorMap[method]}`,
        `border-radius: 0.5em`,
        `color: white`,
        `font-weight: bold`,
        `padding: 2px 0.5em`
      ];
      const logPrefix = inGroup ? [] : ["%cworkbox", styles.join(";")];
      console[method](...logPrefix, ...args);
      if (method === "groupCollapsed") {
        inGroup = true;
      }
      if (method === "groupEnd") {
        inGroup = false;
      }
    };
    const api = {};
    const loggerMethods = Object.keys(methodToColorMap);
    for (const key of loggerMethods) {
      const method = key;
      api[method] = (...args) => {
        print(method, args);
      };
    }
    return api;
  })();

  // node_modules/workbox-core/models/messages/messageGenerator.js
  var fallback = (code, ...args) => {
    let msg = code;
    if (args.length > 0) {
      msg += ` :: ${JSON.stringify(args)}`;
    }
    return msg;
  };
  var messageGenerator = true ? fallback : generatorFunction;

  // node_modules/workbox-core/_private/WorkboxError.js
  var WorkboxError = class extends Error {
    constructor(errorCode, details) {
      const message = messageGenerator(errorCode, details);
      super(message);
      this.name = errorCode;
      this.details = details;
    }
  };

  // node_modules/workbox-core/models/quotaErrorCallbacks.js
  var quotaErrorCallbacks = /* @__PURE__ */ new Set();

  // node_modules/workbox-core/registerQuotaErrorCallback.js
  function registerQuotaErrorCallback(callback) {
    if (false) {
      finalAssertExports.isType(callback, "function", {
        moduleName: "workbox-core",
        funcName: "register",
        paramName: "callback"
      });
    }
    quotaErrorCallbacks.add(callback);
    if (false) {
      logger.log("Registered a callback to respond to quota errors.", callback);
    }
  }

  // node_modules/workbox-core/_private/cacheNames.js
  var _cacheNameDetails = {
    googleAnalytics: "googleAnalytics",
    precache: "precache-v2",
    prefix: "workbox",
    runtime: "runtime",
    suffix: typeof registration !== "undefined" ? registration.scope : ""
  };
  var _createCacheName = (cacheName) => {
    return [_cacheNameDetails.prefix, cacheName, _cacheNameDetails.suffix].filter((value) => value && value.length > 0).join("-");
  };
  var eachCacheNameDetail = (fn) => {
    for (const key of Object.keys(_cacheNameDetails)) {
      fn(key);
    }
  };
  var cacheNames = {
    updateDetails: (details) => {
      eachCacheNameDetail((key) => {
        if (typeof details[key] === "string") {
          _cacheNameDetails[key] = details[key];
        }
      });
    },
    getGoogleAnalyticsName: (userCacheName) => {
      return userCacheName || _createCacheName(_cacheNameDetails.googleAnalytics);
    },
    getPrecacheName: (userCacheName) => {
      return userCacheName || _createCacheName(_cacheNameDetails.precache);
    },
    getPrefix: () => {
      return _cacheNameDetails.prefix;
    },
    getRuntimeName: (userCacheName) => {
      return userCacheName || _createCacheName(_cacheNameDetails.runtime);
    },
    getSuffix: () => {
      return _cacheNameDetails.suffix;
    }
  };

  // node_modules/workbox-core/_private/cacheMatchIgnoreParams.js
  function stripParams(fullURL, ignoreParams) {
    const strippedURL = new URL(fullURL);
    for (const param of ignoreParams) {
      strippedURL.searchParams.delete(param);
    }
    return strippedURL.href;
  }
  async function cacheMatchIgnoreParams(cache, request, ignoreParams, matchOptions) {
    const strippedRequestURL = stripParams(request.url, ignoreParams);
    if (request.url === strippedRequestURL) {
      return cache.match(request, matchOptions);
    }
    const keysOptions = Object.assign(Object.assign({}, matchOptions), { ignoreSearch: true });
    const cacheKeys = await cache.keys(request, keysOptions);
    for (const cacheKey of cacheKeys) {
      const strippedCacheKeyURL = stripParams(cacheKey.url, ignoreParams);
      if (strippedRequestURL === strippedCacheKeyURL) {
        return cache.match(cacheKey, matchOptions);
      }
    }
    return;
  }

  // node_modules/workbox-core/_private/canConstructResponseFromBodyStream.js
  var supportStatus;
  function canConstructResponseFromBodyStream() {
    if (supportStatus === void 0) {
      const testResponse = new Response("");
      if ("body" in testResponse) {
        try {
          new Response(testResponse.body);
          supportStatus = true;
        } catch (error) {
          supportStatus = false;
        }
      }
      supportStatus = false;
    }
    return supportStatus;
  }

  // node_modules/workbox-core/_private/dontWaitFor.js
  function dontWaitFor(promise) {
    void promise.then(() => {
    });
  }

  // node_modules/workbox-core/_private/Deferred.js
  var Deferred = class {
    constructor() {
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    }
  };

  // node_modules/workbox-core/_private/executeQuotaErrorCallbacks.js
  async function executeQuotaErrorCallbacks() {
    if (false) {
      logger.log(`About to run ${quotaErrorCallbacks.size} callbacks to clean up caches.`);
    }
    for (const callback of quotaErrorCallbacks) {
      await callback();
      if (false) {
        logger.log(callback, "is complete.");
      }
    }
    if (false) {
      logger.log("Finished running callbacks.");
    }
  }

  // node_modules/workbox-core/_private/getFriendlyURL.js
  var getFriendlyURL = (url) => {
    const urlObj = new URL(String(url), location.href);
    return urlObj.href.replace(new RegExp(`^${location.origin}`), "");
  };

  // node_modules/workbox-core/_private/timeout.js
  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // node_modules/workbox-core/_private/waitUntil.js
  function waitUntil(event, asyncFn) {
    const returnPromise = asyncFn();
    event.waitUntil(returnPromise);
    return returnPromise;
  }

  // node_modules/workbox-core/copyResponse.js
  async function copyResponse(response, modifier) {
    let origin = null;
    if (response.url) {
      const responseURL = new URL(response.url);
      origin = responseURL.origin;
    }
    if (origin !== self.location.origin) {
      throw new WorkboxError("cross-origin-copy-response", { origin });
    }
    const clonedResponse = response.clone();
    const responseInit = {
      headers: new Headers(clonedResponse.headers),
      status: clonedResponse.status,
      statusText: clonedResponse.statusText
    };
    const modifiedResponseInit = modifier ? modifier(responseInit) : responseInit;
    const body = canConstructResponseFromBodyStream() ? clonedResponse.body : await clonedResponse.blob();
    return new Response(body, modifiedResponseInit);
  }

  // node_modules/workbox-core/clientsClaim.js
  function clientsClaim() {
    self.addEventListener("activate", () => self.clients.claim());
  }

  // node_modules/workbox-precaching/_version.js
  try {
    self["workbox:precaching:6.5.3"] && _();
  } catch (e) {
  }

  // node_modules/workbox-precaching/utils/createCacheKey.js
  var REVISION_SEARCH_PARAM = "__WB_REVISION__";
  function createCacheKey(entry) {
    if (!entry) {
      throw new WorkboxError("add-to-cache-list-unexpected-type", { entry });
    }
    if (typeof entry === "string") {
      const urlObject = new URL(entry, location.href);
      return {
        cacheKey: urlObject.href,
        url: urlObject.href
      };
    }
    const { revision, url } = entry;
    if (!url) {
      throw new WorkboxError("add-to-cache-list-unexpected-type", { entry });
    }
    if (!revision) {
      const urlObject = new URL(url, location.href);
      return {
        cacheKey: urlObject.href,
        url: urlObject.href
      };
    }
    const cacheKeyURL = new URL(url, location.href);
    const originalURL = new URL(url, location.href);
    cacheKeyURL.searchParams.set(REVISION_SEARCH_PARAM, revision);
    return {
      cacheKey: cacheKeyURL.href,
      url: originalURL.href
    };
  }

  // node_modules/workbox-precaching/utils/PrecacheInstallReportPlugin.js
  var PrecacheInstallReportPlugin = class {
    constructor() {
      this.updatedURLs = [];
      this.notUpdatedURLs = [];
      this.handlerWillStart = async ({ request, state }) => {
        if (state) {
          state.originalRequest = request;
        }
      };
      this.cachedResponseWillBeUsed = async ({ event, state, cachedResponse }) => {
        if (event.type === "install") {
          if (state && state.originalRequest && state.originalRequest instanceof Request) {
            const url = state.originalRequest.url;
            if (cachedResponse) {
              this.notUpdatedURLs.push(url);
            } else {
              this.updatedURLs.push(url);
            }
          }
        }
        return cachedResponse;
      };
    }
  };

  // node_modules/workbox-precaching/utils/PrecacheCacheKeyPlugin.js
  var PrecacheCacheKeyPlugin = class {
    constructor({ precacheController: precacheController2 }) {
      this.cacheKeyWillBeUsed = async ({ request, params }) => {
        const cacheKey = (params === null || params === void 0 ? void 0 : params.cacheKey) || this._precacheController.getCacheKeyForURL(request.url);
        return cacheKey ? new Request(cacheKey, { headers: request.headers }) : request;
      };
      this._precacheController = precacheController2;
    }
  };

  // node_modules/workbox-strategies/_version.js
  try {
    self["workbox:strategies:6.5.3"] && _();
  } catch (e) {
  }

  // node_modules/workbox-strategies/StrategyHandler.js
  function toRequest(input) {
    return typeof input === "string" ? new Request(input) : input;
  }
  var StrategyHandler = class {
    constructor(strategy, options) {
      this._cacheKeys = {};
      if (false) {
        finalAssertExports.isInstance(options.event, ExtendableEvent, {
          moduleName: "workbox-strategies",
          className: "StrategyHandler",
          funcName: "constructor",
          paramName: "options.event"
        });
      }
      Object.assign(this, options);
      this.event = options.event;
      this._strategy = strategy;
      this._handlerDeferred = new Deferred();
      this._extendLifetimePromises = [];
      this._plugins = [...strategy.plugins];
      this._pluginStateMap = /* @__PURE__ */ new Map();
      for (const plugin of this._plugins) {
        this._pluginStateMap.set(plugin, {});
      }
      this.event.waitUntil(this._handlerDeferred.promise);
    }
    async fetch(input) {
      const { event } = this;
      let request = toRequest(input);
      if (request.mode === "navigate" && event instanceof FetchEvent && event.preloadResponse) {
        const possiblePreloadResponse = await event.preloadResponse;
        if (possiblePreloadResponse) {
          if (false) {
            logger.log(`Using a preloaded navigation response for '${getFriendlyURL(request.url)}'`);
          }
          return possiblePreloadResponse;
        }
      }
      const originalRequest = this.hasCallback("fetchDidFail") ? request.clone() : null;
      try {
        for (const cb of this.iterateCallbacks("requestWillFetch")) {
          request = await cb({ request: request.clone(), event });
        }
      } catch (err) {
        if (err instanceof Error) {
          throw new WorkboxError("plugin-error-request-will-fetch", {
            thrownErrorMessage: err.message
          });
        }
      }
      const pluginFilteredRequest = request.clone();
      try {
        let fetchResponse;
        fetchResponse = await fetch(request, request.mode === "navigate" ? void 0 : this._strategy.fetchOptions);
        if (false) {
          logger.debug(`Network request for '${getFriendlyURL(request.url)}' returned a response with status '${fetchResponse.status}'.`);
        }
        for (const callback of this.iterateCallbacks("fetchDidSucceed")) {
          fetchResponse = await callback({
            event,
            request: pluginFilteredRequest,
            response: fetchResponse
          });
        }
        return fetchResponse;
      } catch (error) {
        if (false) {
          logger.log(`Network request for '${getFriendlyURL(request.url)}' threw an error.`, error);
        }
        if (originalRequest) {
          await this.runCallbacks("fetchDidFail", {
            error,
            event,
            originalRequest: originalRequest.clone(),
            request: pluginFilteredRequest.clone()
          });
        }
        throw error;
      }
    }
    async fetchAndCachePut(input) {
      const response = await this.fetch(input);
      const responseClone = response.clone();
      void this.waitUntil(this.cachePut(input, responseClone));
      return response;
    }
    async cacheMatch(key) {
      const request = toRequest(key);
      let cachedResponse;
      const { cacheName, matchOptions } = this._strategy;
      const effectiveRequest = await this.getCacheKey(request, "read");
      const multiMatchOptions = Object.assign(Object.assign({}, matchOptions), { cacheName });
      cachedResponse = await caches.match(effectiveRequest, multiMatchOptions);
      if (false) {
        if (cachedResponse) {
          logger.debug(`Found a cached response in '${cacheName}'.`);
        } else {
          logger.debug(`No cached response found in '${cacheName}'.`);
        }
      }
      for (const callback of this.iterateCallbacks("cachedResponseWillBeUsed")) {
        cachedResponse = await callback({
          cacheName,
          matchOptions,
          cachedResponse,
          request: effectiveRequest,
          event: this.event
        }) || void 0;
      }
      return cachedResponse;
    }
    async cachePut(key, response) {
      const request = toRequest(key);
      await timeout(0);
      const effectiveRequest = await this.getCacheKey(request, "write");
      if (false) {
        if (effectiveRequest.method && effectiveRequest.method !== "GET") {
          throw new WorkboxError("attempt-to-cache-non-get-request", {
            url: getFriendlyURL(effectiveRequest.url),
            method: effectiveRequest.method
          });
        }
        const vary = response.headers.get("Vary");
        if (vary) {
          logger.debug(`The response for ${getFriendlyURL(effectiveRequest.url)} has a 'Vary: ${vary}' header. Consider setting the {ignoreVary: true} option on your strategy to ensure cache matching and deletion works as expected.`);
        }
      }
      if (!response) {
        if (false) {
          logger.error(`Cannot cache non-existent response for '${getFriendlyURL(effectiveRequest.url)}'.`);
        }
        throw new WorkboxError("cache-put-with-no-response", {
          url: getFriendlyURL(effectiveRequest.url)
        });
      }
      const responseToCache = await this._ensureResponseSafeToCache(response);
      if (!responseToCache) {
        if (false) {
          logger.debug(`Response '${getFriendlyURL(effectiveRequest.url)}' will not be cached.`, responseToCache);
        }
        return false;
      }
      const { cacheName, matchOptions } = this._strategy;
      const cache = await self.caches.open(cacheName);
      const hasCacheUpdateCallback = this.hasCallback("cacheDidUpdate");
      const oldResponse = hasCacheUpdateCallback ? await cacheMatchIgnoreParams(
        cache,
        effectiveRequest.clone(),
        ["__WB_REVISION__"],
        matchOptions
      ) : null;
      if (false) {
        logger.debug(`Updating the '${cacheName}' cache with a new Response for ${getFriendlyURL(effectiveRequest.url)}.`);
      }
      try {
        await cache.put(effectiveRequest, hasCacheUpdateCallback ? responseToCache.clone() : responseToCache);
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === "QuotaExceededError") {
            await executeQuotaErrorCallbacks();
          }
          throw error;
        }
      }
      for (const callback of this.iterateCallbacks("cacheDidUpdate")) {
        await callback({
          cacheName,
          oldResponse,
          newResponse: responseToCache.clone(),
          request: effectiveRequest,
          event: this.event
        });
      }
      return true;
    }
    async getCacheKey(request, mode) {
      const key = `${request.url} | ${mode}`;
      if (!this._cacheKeys[key]) {
        let effectiveRequest = request;
        for (const callback of this.iterateCallbacks("cacheKeyWillBeUsed")) {
          effectiveRequest = toRequest(await callback({
            mode,
            request: effectiveRequest,
            event: this.event,
            params: this.params
          }));
        }
        this._cacheKeys[key] = effectiveRequest;
      }
      return this._cacheKeys[key];
    }
    hasCallback(name) {
      for (const plugin of this._strategy.plugins) {
        if (name in plugin) {
          return true;
        }
      }
      return false;
    }
    async runCallbacks(name, param) {
      for (const callback of this.iterateCallbacks(name)) {
        await callback(param);
      }
    }
    *iterateCallbacks(name) {
      for (const plugin of this._strategy.plugins) {
        if (typeof plugin[name] === "function") {
          const state = this._pluginStateMap.get(plugin);
          const statefulCallback = (param) => {
            const statefulParam = Object.assign(Object.assign({}, param), { state });
            return plugin[name](statefulParam);
          };
          yield statefulCallback;
        }
      }
    }
    waitUntil(promise) {
      this._extendLifetimePromises.push(promise);
      return promise;
    }
    async doneWaiting() {
      let promise;
      while (promise = this._extendLifetimePromises.shift()) {
        await promise;
      }
    }
    destroy() {
      this._handlerDeferred.resolve(null);
    }
    async _ensureResponseSafeToCache(response) {
      let responseToCache = response;
      let pluginsUsed = false;
      for (const callback of this.iterateCallbacks("cacheWillUpdate")) {
        responseToCache = await callback({
          request: this.request,
          response: responseToCache,
          event: this.event
        }) || void 0;
        pluginsUsed = true;
        if (!responseToCache) {
          break;
        }
      }
      if (!pluginsUsed) {
        if (responseToCache && responseToCache.status !== 200) {
          responseToCache = void 0;
        }
        if (false) {
          if (responseToCache) {
            if (responseToCache.status !== 200) {
              if (responseToCache.status === 0) {
                logger.warn(`The response for '${this.request.url}' is an opaque response. The caching strategy that you're using will not cache opaque responses by default.`);
              } else {
                logger.debug(`The response for '${this.request.url}' returned a status code of '${response.status}' and won't be cached as a result.`);
              }
            }
          }
        }
      }
      return responseToCache;
    }
  };

  // node_modules/workbox-strategies/Strategy.js
  var Strategy = class {
    constructor(options = {}) {
      this.cacheName = cacheNames.getRuntimeName(options.cacheName);
      this.plugins = options.plugins || [];
      this.fetchOptions = options.fetchOptions;
      this.matchOptions = options.matchOptions;
    }
    handle(options) {
      const [responseDone] = this.handleAll(options);
      return responseDone;
    }
    handleAll(options) {
      if (options instanceof FetchEvent) {
        options = {
          event: options,
          request: options.request
        };
      }
      const event = options.event;
      const request = typeof options.request === "string" ? new Request(options.request) : options.request;
      const params = "params" in options ? options.params : void 0;
      const handler = new StrategyHandler(this, { event, request, params });
      const responseDone = this._getResponse(handler, request, event);
      const handlerDone = this._awaitComplete(responseDone, handler, request, event);
      return [responseDone, handlerDone];
    }
    async _getResponse(handler, request, event) {
      await handler.runCallbacks("handlerWillStart", { event, request });
      let response = void 0;
      try {
        response = await this._handle(request, handler);
        if (!response || response.type === "error") {
          throw new WorkboxError("no-response", { url: request.url });
        }
      } catch (error) {
        if (error instanceof Error) {
          for (const callback of handler.iterateCallbacks("handlerDidError")) {
            response = await callback({ error, event, request });
            if (response) {
              break;
            }
          }
        }
        if (!response) {
          throw error;
        } else if (false) {
          logger.log(`While responding to '${getFriendlyURL(request.url)}', an ${error instanceof Error ? error.toString() : ""} error occurred. Using a fallback response provided by a handlerDidError plugin.`);
        }
      }
      for (const callback of handler.iterateCallbacks("handlerWillRespond")) {
        response = await callback({ event, request, response });
      }
      return response;
    }
    async _awaitComplete(responseDone, handler, request, event) {
      let response;
      let error;
      try {
        response = await responseDone;
      } catch (error2) {
      }
      try {
        await handler.runCallbacks("handlerDidRespond", {
          event,
          request,
          response
        });
        await handler.doneWaiting();
      } catch (waitUntilError) {
        if (waitUntilError instanceof Error) {
          error = waitUntilError;
        }
      }
      await handler.runCallbacks("handlerDidComplete", {
        event,
        request,
        response,
        error
      });
      handler.destroy();
      if (error) {
        throw error;
      }
    }
  };

  // node_modules/workbox-precaching/PrecacheStrategy.js
  var PrecacheStrategy = class extends Strategy {
    constructor(options = {}) {
      options.cacheName = cacheNames.getPrecacheName(options.cacheName);
      super(options);
      this._fallbackToNetwork = options.fallbackToNetwork === false ? false : true;
      this.plugins.push(PrecacheStrategy.copyRedirectedCacheableResponsesPlugin);
    }
    async _handle(request, handler) {
      const response = await handler.cacheMatch(request);
      if (response) {
        return response;
      }
      if (handler.event && handler.event.type === "install") {
        return await this._handleInstall(request, handler);
      }
      return await this._handleFetch(request, handler);
    }
    async _handleFetch(request, handler) {
      let response;
      const params = handler.params || {};
      if (this._fallbackToNetwork) {
        if (false) {
          logger.warn(`The precached response for ${getFriendlyURL(request.url)} in ${this.cacheName} was not found. Falling back to the network.`);
        }
        const integrityInManifest = params.integrity;
        const integrityInRequest = request.integrity;
        const noIntegrityConflict = !integrityInRequest || integrityInRequest === integrityInManifest;
        response = await handler.fetch(new Request(request, {
          integrity: request.mode !== "no-cors" ? integrityInRequest || integrityInManifest : void 0
        }));
        if (integrityInManifest && noIntegrityConflict && request.mode !== "no-cors") {
          this._useDefaultCacheabilityPluginIfNeeded();
          const wasCached = await handler.cachePut(request, response.clone());
          if (false) {
            if (wasCached) {
              logger.log(`A response for ${getFriendlyURL(request.url)} was used to "repair" the precache.`);
            }
          }
        }
      } else {
        throw new WorkboxError("missing-precache-entry", {
          cacheName: this.cacheName,
          url: request.url
        });
      }
      if (false) {
        const cacheKey = params.cacheKey || await handler.getCacheKey(request, "read");
        logger.groupCollapsed(`Precaching is responding to: ` + getFriendlyURL(request.url));
        logger.log(`Serving the precached url: ${getFriendlyURL(cacheKey instanceof Request ? cacheKey.url : cacheKey)}`);
        logger.groupCollapsed(`View request details here.`);
        logger.log(request);
        logger.groupEnd();
        logger.groupCollapsed(`View response details here.`);
        logger.log(response);
        logger.groupEnd();
        logger.groupEnd();
      }
      return response;
    }
    async _handleInstall(request, handler) {
      this._useDefaultCacheabilityPluginIfNeeded();
      const response = await handler.fetch(request);
      const wasCached = await handler.cachePut(request, response.clone());
      if (!wasCached) {
        throw new WorkboxError("bad-precaching-response", {
          url: request.url,
          status: response.status
        });
      }
      return response;
    }
    _useDefaultCacheabilityPluginIfNeeded() {
      let defaultPluginIndex = null;
      let cacheWillUpdatePluginCount = 0;
      for (const [index, plugin] of this.plugins.entries()) {
        if (plugin === PrecacheStrategy.copyRedirectedCacheableResponsesPlugin) {
          continue;
        }
        if (plugin === PrecacheStrategy.defaultPrecacheCacheabilityPlugin) {
          defaultPluginIndex = index;
        }
        if (plugin.cacheWillUpdate) {
          cacheWillUpdatePluginCount++;
        }
      }
      if (cacheWillUpdatePluginCount === 0) {
        this.plugins.push(PrecacheStrategy.defaultPrecacheCacheabilityPlugin);
      } else if (cacheWillUpdatePluginCount > 1 && defaultPluginIndex !== null) {
        this.plugins.splice(defaultPluginIndex, 1);
      }
    }
  };
  PrecacheStrategy.defaultPrecacheCacheabilityPlugin = {
    async cacheWillUpdate({ response }) {
      if (!response || response.status >= 400) {
        return null;
      }
      return response;
    }
  };
  PrecacheStrategy.copyRedirectedCacheableResponsesPlugin = {
    async cacheWillUpdate({ response }) {
      return response.redirected ? await copyResponse(response) : response;
    }
  };

  // node_modules/workbox-precaching/PrecacheController.js
  var PrecacheController = class {
    constructor({ cacheName, plugins = [], fallbackToNetwork = true } = {}) {
      this._urlsToCacheKeys = /* @__PURE__ */ new Map();
      this._urlsToCacheModes = /* @__PURE__ */ new Map();
      this._cacheKeysToIntegrities = /* @__PURE__ */ new Map();
      this._strategy = new PrecacheStrategy({
        cacheName: cacheNames.getPrecacheName(cacheName),
        plugins: [
          ...plugins,
          new PrecacheCacheKeyPlugin({ precacheController: this })
        ],
        fallbackToNetwork
      });
      this.install = this.install.bind(this);
      this.activate = this.activate.bind(this);
    }
    get strategy() {
      return this._strategy;
    }
    precache(entries) {
      this.addToCacheList(entries);
      if (!this._installAndActiveListenersAdded) {
        self.addEventListener("install", this.install);
        self.addEventListener("activate", this.activate);
        this._installAndActiveListenersAdded = true;
      }
    }
    addToCacheList(entries) {
      if (false) {
        finalAssertExports.isArray(entries, {
          moduleName: "workbox-precaching",
          className: "PrecacheController",
          funcName: "addToCacheList",
          paramName: "entries"
        });
      }
      const urlsToWarnAbout = [];
      for (const entry of entries) {
        if (typeof entry === "string") {
          urlsToWarnAbout.push(entry);
        } else if (entry && entry.revision === void 0) {
          urlsToWarnAbout.push(entry.url);
        }
        const { cacheKey, url } = createCacheKey(entry);
        const cacheMode = typeof entry !== "string" && entry.revision ? "reload" : "default";
        if (this._urlsToCacheKeys.has(url) && this._urlsToCacheKeys.get(url) !== cacheKey) {
          throw new WorkboxError("add-to-cache-list-conflicting-entries", {
            firstEntry: this._urlsToCacheKeys.get(url),
            secondEntry: cacheKey
          });
        }
        if (typeof entry !== "string" && entry.integrity) {
          if (this._cacheKeysToIntegrities.has(cacheKey) && this._cacheKeysToIntegrities.get(cacheKey) !== entry.integrity) {
            throw new WorkboxError("add-to-cache-list-conflicting-integrities", {
              url
            });
          }
          this._cacheKeysToIntegrities.set(cacheKey, entry.integrity);
        }
        this._urlsToCacheKeys.set(url, cacheKey);
        this._urlsToCacheModes.set(url, cacheMode);
        if (urlsToWarnAbout.length > 0) {
          const warningMessage = `Workbox is precaching URLs without revision info: ${urlsToWarnAbout.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;
          if (true) {
            console.warn(warningMessage);
          } else {
            logger.warn(warningMessage);
          }
        }
      }
    }
    install(event) {
      return waitUntil(event, async () => {
        const installReportPlugin = new PrecacheInstallReportPlugin();
        this.strategy.plugins.push(installReportPlugin);
        for (const [url, cacheKey] of this._urlsToCacheKeys) {
          const integrity = this._cacheKeysToIntegrities.get(cacheKey);
          const cacheMode = this._urlsToCacheModes.get(url);
          const request = new Request(url, {
            integrity,
            cache: cacheMode,
            credentials: "same-origin"
          });
          await Promise.all(this.strategy.handleAll({
            params: { cacheKey },
            request,
            event
          }));
        }
        const { updatedURLs, notUpdatedURLs } = installReportPlugin;
        if (false) {
          printInstallDetails(updatedURLs, notUpdatedURLs);
        }
        return { updatedURLs, notUpdatedURLs };
      });
    }
    activate(event) {
      return waitUntil(event, async () => {
        const cache = await self.caches.open(this.strategy.cacheName);
        const currentlyCachedRequests = await cache.keys();
        const expectedCacheKeys = new Set(this._urlsToCacheKeys.values());
        const deletedURLs = [];
        for (const request of currentlyCachedRequests) {
          if (!expectedCacheKeys.has(request.url)) {
            await cache.delete(request);
            deletedURLs.push(request.url);
          }
        }
        if (false) {
          printCleanupDetails(deletedURLs);
        }
        return { deletedURLs };
      });
    }
    getURLsToCacheKeys() {
      return this._urlsToCacheKeys;
    }
    getCachedURLs() {
      return [...this._urlsToCacheKeys.keys()];
    }
    getCacheKeyForURL(url) {
      const urlObject = new URL(url, location.href);
      return this._urlsToCacheKeys.get(urlObject.href);
    }
    getIntegrityForCacheKey(cacheKey) {
      return this._cacheKeysToIntegrities.get(cacheKey);
    }
    async matchPrecache(request) {
      const url = request instanceof Request ? request.url : request;
      const cacheKey = this.getCacheKeyForURL(url);
      if (cacheKey) {
        const cache = await self.caches.open(this.strategy.cacheName);
        return cache.match(cacheKey);
      }
      return void 0;
    }
    createHandlerBoundToURL(url) {
      const cacheKey = this.getCacheKeyForURL(url);
      if (!cacheKey) {
        throw new WorkboxError("non-precached-url", { url });
      }
      return (options) => {
        options.request = new Request(url);
        options.params = Object.assign({ cacheKey }, options.params);
        return this.strategy.handle(options);
      };
    }
  };

  // node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js
  var precacheController;
  var getOrCreatePrecacheController = () => {
    if (!precacheController) {
      precacheController = new PrecacheController();
    }
    return precacheController;
  };

  // node_modules/workbox-routing/_version.js
  try {
    self["workbox:routing:6.5.3"] && _();
  } catch (e) {
  }

  // node_modules/workbox-routing/utils/constants.js
  var defaultMethod = "GET";

  // node_modules/workbox-routing/utils/normalizeHandler.js
  var normalizeHandler = (handler) => {
    if (handler && typeof handler === "object") {
      if (false) {
        finalAssertExports.hasMethod(handler, "handle", {
          moduleName: "workbox-routing",
          className: "Route",
          funcName: "constructor",
          paramName: "handler"
        });
      }
      return handler;
    } else {
      if (false) {
        finalAssertExports.isType(handler, "function", {
          moduleName: "workbox-routing",
          className: "Route",
          funcName: "constructor",
          paramName: "handler"
        });
      }
      return { handle: handler };
    }
  };

  // node_modules/workbox-routing/Route.js
  var Route = class {
    constructor(match, handler, method = defaultMethod) {
      if (false) {
        finalAssertExports.isType(match, "function", {
          moduleName: "workbox-routing",
          className: "Route",
          funcName: "constructor",
          paramName: "match"
        });
        if (method) {
          finalAssertExports.isOneOf(method, validMethods, { paramName: "method" });
        }
      }
      this.handler = normalizeHandler(handler);
      this.match = match;
      this.method = method;
    }
    setCatchHandler(handler) {
      this.catchHandler = normalizeHandler(handler);
    }
  };

  // node_modules/workbox-routing/RegExpRoute.js
  var RegExpRoute = class extends Route {
    constructor(regExp, handler, method) {
      if (false) {
        finalAssertExports.isInstance(regExp, RegExp, {
          moduleName: "workbox-routing",
          className: "RegExpRoute",
          funcName: "constructor",
          paramName: "pattern"
        });
      }
      const match = ({ url }) => {
        const result = regExp.exec(url.href);
        if (!result) {
          return;
        }
        if (url.origin !== location.origin && result.index !== 0) {
          if (false) {
            logger.debug(`The regular expression '${regExp.toString()}' only partially matched against the cross-origin URL '${url.toString()}'. RegExpRoute's will only handle cross-origin requests if they match the entire URL.`);
          }
          return;
        }
        return result.slice(1);
      };
      super(match, handler, method);
    }
  };

  // node_modules/workbox-routing/Router.js
  var Router = class {
    constructor() {
      this._routes = /* @__PURE__ */ new Map();
      this._defaultHandlerMap = /* @__PURE__ */ new Map();
    }
    get routes() {
      return this._routes;
    }
    addFetchListener() {
      self.addEventListener("fetch", (event) => {
        const { request } = event;
        const responsePromise = this.handleRequest({ request, event });
        if (responsePromise) {
          event.respondWith(responsePromise);
        }
      });
    }
    addCacheListener() {
      self.addEventListener("message", (event) => {
        if (event.data && event.data.type === "CACHE_URLS") {
          const { payload } = event.data;
          if (false) {
            logger.debug(`Caching URLs from the window`, payload.urlsToCache);
          }
          const requestPromises = Promise.all(payload.urlsToCache.map((entry) => {
            if (typeof entry === "string") {
              entry = [entry];
            }
            const request = new Request(...entry);
            return this.handleRequest({ request, event });
          }));
          event.waitUntil(requestPromises);
          if (event.ports && event.ports[0]) {
            void requestPromises.then(() => event.ports[0].postMessage(true));
          }
        }
      });
    }
    handleRequest({ request, event }) {
      if (false) {
        finalAssertExports.isInstance(request, Request, {
          moduleName: "workbox-routing",
          className: "Router",
          funcName: "handleRequest",
          paramName: "options.request"
        });
      }
      const url = new URL(request.url, location.href);
      if (!url.protocol.startsWith("http")) {
        if (false) {
          logger.debug(`Workbox Router only supports URLs that start with 'http'.`);
        }
        return;
      }
      const sameOrigin = url.origin === location.origin;
      const { params, route } = this.findMatchingRoute({
        event,
        request,
        sameOrigin,
        url
      });
      let handler = route && route.handler;
      const debugMessages = [];
      if (false) {
        if (handler) {
          debugMessages.push([`Found a route to handle this request:`, route]);
          if (params) {
            debugMessages.push([
              `Passing the following params to the route's handler:`,
              params
            ]);
          }
        }
      }
      const method = request.method;
      if (!handler && this._defaultHandlerMap.has(method)) {
        if (false) {
          debugMessages.push(`Failed to find a matching route. Falling back to the default handler for ${method}.`);
        }
        handler = this._defaultHandlerMap.get(method);
      }
      if (!handler) {
        if (false) {
          logger.debug(`No route found for: ${getFriendlyURL(url)}`);
        }
        return;
      }
      if (false) {
        logger.groupCollapsed(`Router is responding to: ${getFriendlyURL(url)}`);
        debugMessages.forEach((msg) => {
          if (Array.isArray(msg)) {
            logger.log(...msg);
          } else {
            logger.log(msg);
          }
        });
        logger.groupEnd();
      }
      let responsePromise;
      try {
        responsePromise = handler.handle({ url, request, event, params });
      } catch (err) {
        responsePromise = Promise.reject(err);
      }
      const catchHandler = route && route.catchHandler;
      if (responsePromise instanceof Promise && (this._catchHandler || catchHandler)) {
        responsePromise = responsePromise.catch(async (err) => {
          if (catchHandler) {
            if (false) {
              logger.groupCollapsed(`Error thrown when responding to:  ${getFriendlyURL(url)}. Falling back to route's Catch Handler.`);
              logger.error(`Error thrown by:`, route);
              logger.error(err);
              logger.groupEnd();
            }
            try {
              return await catchHandler.handle({ url, request, event, params });
            } catch (catchErr) {
              if (catchErr instanceof Error) {
                err = catchErr;
              }
            }
          }
          if (this._catchHandler) {
            if (false) {
              logger.groupCollapsed(`Error thrown when responding to:  ${getFriendlyURL(url)}. Falling back to global Catch Handler.`);
              logger.error(`Error thrown by:`, route);
              logger.error(err);
              logger.groupEnd();
            }
            return this._catchHandler.handle({ url, request, event });
          }
          throw err;
        });
      }
      return responsePromise;
    }
    findMatchingRoute({ url, sameOrigin, request, event }) {
      const routes = this._routes.get(request.method) || [];
      for (const route of routes) {
        let params;
        const matchResult = route.match({ url, sameOrigin, request, event });
        if (matchResult) {
          if (false) {
            if (matchResult instanceof Promise) {
              logger.warn(`While routing ${getFriendlyURL(url)}, an async matchCallback function was used. Please convert the following route to use a synchronous matchCallback function:`, route);
            }
          }
          params = matchResult;
          if (Array.isArray(params) && params.length === 0) {
            params = void 0;
          } else if (matchResult.constructor === Object && Object.keys(matchResult).length === 0) {
            params = void 0;
          } else if (typeof matchResult === "boolean") {
            params = void 0;
          }
          return { route, params };
        }
      }
      return {};
    }
    setDefaultHandler(handler, method = defaultMethod) {
      this._defaultHandlerMap.set(method, normalizeHandler(handler));
    }
    setCatchHandler(handler) {
      this._catchHandler = normalizeHandler(handler);
    }
    registerRoute(route) {
      if (false) {
        finalAssertExports.isType(route, "object", {
          moduleName: "workbox-routing",
          className: "Router",
          funcName: "registerRoute",
          paramName: "route"
        });
        finalAssertExports.hasMethod(route, "match", {
          moduleName: "workbox-routing",
          className: "Router",
          funcName: "registerRoute",
          paramName: "route"
        });
        finalAssertExports.isType(route.handler, "object", {
          moduleName: "workbox-routing",
          className: "Router",
          funcName: "registerRoute",
          paramName: "route"
        });
        finalAssertExports.hasMethod(route.handler, "handle", {
          moduleName: "workbox-routing",
          className: "Router",
          funcName: "registerRoute",
          paramName: "route.handler"
        });
        finalAssertExports.isType(route.method, "string", {
          moduleName: "workbox-routing",
          className: "Router",
          funcName: "registerRoute",
          paramName: "route.method"
        });
      }
      if (!this._routes.has(route.method)) {
        this._routes.set(route.method, []);
      }
      this._routes.get(route.method).push(route);
    }
    unregisterRoute(route) {
      if (!this._routes.has(route.method)) {
        throw new WorkboxError("unregister-route-but-not-found-with-method", {
          method: route.method
        });
      }
      const routeIndex = this._routes.get(route.method).indexOf(route);
      if (routeIndex > -1) {
        this._routes.get(route.method).splice(routeIndex, 1);
      } else {
        throw new WorkboxError("unregister-route-route-not-registered");
      }
    }
  };

  // node_modules/workbox-routing/utils/getOrCreateDefaultRouter.js
  var defaultRouter;
  var getOrCreateDefaultRouter = () => {
    if (!defaultRouter) {
      defaultRouter = new Router();
      defaultRouter.addFetchListener();
      defaultRouter.addCacheListener();
    }
    return defaultRouter;
  };

  // node_modules/workbox-routing/registerRoute.js
  function registerRoute(capture, handler, method) {
    let route;
    if (typeof capture === "string") {
      const captureUrl = new URL(capture, location.href);
      if (false) {
        if (!(capture.startsWith("/") || capture.startsWith("http"))) {
          throw new WorkboxError("invalid-string", {
            moduleName: "workbox-routing",
            funcName: "registerRoute",
            paramName: "capture"
          });
        }
        const valueToCheck = capture.startsWith("http") ? captureUrl.pathname : capture;
        const wildcards = "[*:?+]";
        if (new RegExp(`${wildcards}`).exec(valueToCheck)) {
          logger.debug(`The '$capture' parameter contains an Express-style wildcard character (${wildcards}). Strings are now always interpreted as exact matches; use a RegExp for partial or wildcard matches.`);
        }
      }
      const matchCallback = ({ url }) => {
        if (false) {
          if (url.pathname === captureUrl.pathname && url.origin !== captureUrl.origin) {
            logger.debug(`${capture} only partially matches the cross-origin URL ${url.toString()}. This route will only handle cross-origin requests if they match the entire URL.`);
          }
        }
        return url.href === captureUrl.href;
      };
      route = new Route(matchCallback, handler, method);
    } else if (capture instanceof RegExp) {
      route = new RegExpRoute(capture, handler, method);
    } else if (typeof capture === "function") {
      route = new Route(capture, handler, method);
    } else if (capture instanceof Route) {
      route = capture;
    } else {
      throw new WorkboxError("unsupported-route-type", {
        moduleName: "workbox-routing",
        funcName: "registerRoute",
        paramName: "capture"
      });
    }
    const defaultRouter2 = getOrCreateDefaultRouter();
    defaultRouter2.registerRoute(route);
    return route;
  }

  // node_modules/workbox-precaching/utils/removeIgnoredSearchParams.js
  function removeIgnoredSearchParams(urlObject, ignoreURLParametersMatching = []) {
    for (const paramName of [...urlObject.searchParams.keys()]) {
      if (ignoreURLParametersMatching.some((regExp) => regExp.test(paramName))) {
        urlObject.searchParams.delete(paramName);
      }
    }
    return urlObject;
  }

  // node_modules/workbox-precaching/utils/generateURLVariations.js
  function* generateURLVariations(url, { ignoreURLParametersMatching = [/^utm_/, /^fbclid$/], directoryIndex = "index.html", cleanURLs = true, urlManipulation } = {}) {
    const urlObject = new URL(url, location.href);
    urlObject.hash = "";
    yield urlObject.href;
    const urlWithoutIgnoredParams = removeIgnoredSearchParams(urlObject, ignoreURLParametersMatching);
    yield urlWithoutIgnoredParams.href;
    if (directoryIndex && urlWithoutIgnoredParams.pathname.endsWith("/")) {
      const directoryURL = new URL(urlWithoutIgnoredParams.href);
      directoryURL.pathname += directoryIndex;
      yield directoryURL.href;
    }
    if (cleanURLs) {
      const cleanURL = new URL(urlWithoutIgnoredParams.href);
      cleanURL.pathname += ".html";
      yield cleanURL.href;
    }
    if (urlManipulation) {
      const additionalURLs = urlManipulation({ url: urlObject });
      for (const urlToAttempt of additionalURLs) {
        yield urlToAttempt.href;
      }
    }
  }

  // node_modules/workbox-precaching/PrecacheRoute.js
  var PrecacheRoute = class extends Route {
    constructor(precacheController2, options) {
      const match = ({ request }) => {
        const urlsToCacheKeys = precacheController2.getURLsToCacheKeys();
        for (const possibleURL of generateURLVariations(request.url, options)) {
          const cacheKey = urlsToCacheKeys.get(possibleURL);
          if (cacheKey) {
            const integrity = precacheController2.getIntegrityForCacheKey(cacheKey);
            return { cacheKey, integrity };
          }
        }
        if (false) {
          logger.debug(`Precaching did not find a match for ` + getFriendlyURL(request.url));
        }
        return;
      };
      super(match, precacheController2.strategy);
    }
  };

  // node_modules/workbox-precaching/addRoute.js
  function addRoute(options) {
    const precacheController2 = getOrCreatePrecacheController();
    const precacheRoute = new PrecacheRoute(precacheController2, options);
    registerRoute(precacheRoute);
  }

  // node_modules/workbox-precaching/utils/deleteOutdatedCaches.js
  var SUBSTRING_TO_FIND = "-precache-";
  var deleteOutdatedCaches = async (currentPrecacheName, substringToFind = SUBSTRING_TO_FIND) => {
    const cacheNames3 = await self.caches.keys();
    const cacheNamesToDelete = cacheNames3.filter((cacheName) => {
      return cacheName.includes(substringToFind) && cacheName.includes(self.registration.scope) && cacheName !== currentPrecacheName;
    });
    await Promise.all(cacheNamesToDelete.map((cacheName) => self.caches.delete(cacheName)));
    return cacheNamesToDelete;
  };

  // node_modules/workbox-precaching/cleanupOutdatedCaches.js
  function cleanupOutdatedCaches() {
    self.addEventListener("activate", (event) => {
      const cacheName = cacheNames.getPrecacheName();
      event.waitUntil(deleteOutdatedCaches(cacheName).then((cachesDeleted) => {
        if (false) {
          if (cachesDeleted.length > 0) {
            logger.log(`The following out-of-date precaches were cleaned up automatically:`, cachesDeleted);
          }
        }
      }));
    });
  }

  // node_modules/workbox-precaching/precache.js
  function precache(entries) {
    const precacheController2 = getOrCreatePrecacheController();
    precacheController2.precache(entries);
  }

  // node_modules/workbox-precaching/precacheAndRoute.js
  function precacheAndRoute(entries, options) {
    precache(entries);
    addRoute(options);
  }

  // node_modules/workbox-strategies/CacheFirst.js
  var CacheFirst = class extends Strategy {
    async _handle(request, handler) {
      const logs = [];
      if (false) {
        finalAssertExports.isInstance(request, Request, {
          moduleName: "workbox-strategies",
          className: this.constructor.name,
          funcName: "makeRequest",
          paramName: "request"
        });
      }
      let response = await handler.cacheMatch(request);
      let error = void 0;
      if (!response) {
        if (false) {
          logs.push(`No response found in the '${this.cacheName}' cache. Will respond with a network request.`);
        }
        try {
          response = await handler.fetchAndCachePut(request);
        } catch (err) {
          if (err instanceof Error) {
            error = err;
          }
        }
        if (false) {
          if (response) {
            logs.push(`Got response from network.`);
          } else {
            logs.push(`Unable to get a response from the network.`);
          }
        }
      } else {
        if (false) {
          logs.push(`Found a cached response in the '${this.cacheName}' cache.`);
        }
      }
      if (false) {
        logger.groupCollapsed(messages2.strategyStart(this.constructor.name, request));
        for (const log of logs) {
          logger.log(log);
        }
        messages2.printFinalResponse(response);
        logger.groupEnd();
      }
      if (!response) {
        throw new WorkboxError("no-response", { url: request.url, error });
      }
      return response;
    }
  };

  // node_modules/workbox-strategies/plugins/cacheOkAndOpaquePlugin.js
  var cacheOkAndOpaquePlugin = {
    cacheWillUpdate: async ({ response }) => {
      if (response.status === 200 || response.status === 0) {
        return response;
      }
      return null;
    }
  };

  // node_modules/workbox-strategies/NetworkFirst.js
  var NetworkFirst = class extends Strategy {
    constructor(options = {}) {
      super(options);
      if (!this.plugins.some((p) => "cacheWillUpdate" in p)) {
        this.plugins.unshift(cacheOkAndOpaquePlugin);
      }
      this._networkTimeoutSeconds = options.networkTimeoutSeconds || 0;
      if (false) {
        if (this._networkTimeoutSeconds) {
          finalAssertExports.isType(this._networkTimeoutSeconds, "number", {
            moduleName: "workbox-strategies",
            className: this.constructor.name,
            funcName: "constructor",
            paramName: "networkTimeoutSeconds"
          });
        }
      }
    }
    async _handle(request, handler) {
      const logs = [];
      if (false) {
        finalAssertExports.isInstance(request, Request, {
          moduleName: "workbox-strategies",
          className: this.constructor.name,
          funcName: "handle",
          paramName: "makeRequest"
        });
      }
      const promises = [];
      let timeoutId;
      if (this._networkTimeoutSeconds) {
        const { id, promise } = this._getTimeoutPromise({ request, logs, handler });
        timeoutId = id;
        promises.push(promise);
      }
      const networkPromise = this._getNetworkPromise({
        timeoutId,
        request,
        logs,
        handler
      });
      promises.push(networkPromise);
      const response = await handler.waitUntil((async () => {
        return await handler.waitUntil(Promise.race(promises)) || await networkPromise;
      })());
      if (false) {
        logger.groupCollapsed(messages2.strategyStart(this.constructor.name, request));
        for (const log of logs) {
          logger.log(log);
        }
        messages2.printFinalResponse(response);
        logger.groupEnd();
      }
      if (!response) {
        throw new WorkboxError("no-response", { url: request.url });
      }
      return response;
    }
    _getTimeoutPromise({ request, logs, handler }) {
      let timeoutId;
      const timeoutPromise = new Promise((resolve) => {
        const onNetworkTimeout = async () => {
          if (false) {
            logs.push(`Timing out the network response at ${this._networkTimeoutSeconds} seconds.`);
          }
          resolve(await handler.cacheMatch(request));
        };
        timeoutId = setTimeout(onNetworkTimeout, this._networkTimeoutSeconds * 1e3);
      });
      return {
        promise: timeoutPromise,
        id: timeoutId
      };
    }
    async _getNetworkPromise({ timeoutId, request, logs, handler }) {
      let error;
      let response;
      try {
        response = await handler.fetchAndCachePut(request);
      } catch (fetchError) {
        if (fetchError instanceof Error) {
          error = fetchError;
        }
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (false) {
        if (response) {
          logs.push(`Got response from network.`);
        } else {
          logs.push(`Unable to get a response from the network. Will respond with a cached response.`);
        }
      }
      if (error || !response) {
        response = await handler.cacheMatch(request);
        if (false) {
          if (response) {
            logs.push(`Found a cached response in the '${this.cacheName}' cache.`);
          } else {
            logs.push(`No response found in the '${this.cacheName}' cache.`);
          }
        }
      }
      return response;
    }
  };

  // node_modules/workbox-strategies/StaleWhileRevalidate.js
  var StaleWhileRevalidate = class extends Strategy {
    constructor(options = {}) {
      super(options);
      if (!this.plugins.some((p) => "cacheWillUpdate" in p)) {
        this.plugins.unshift(cacheOkAndOpaquePlugin);
      }
    }
    async _handle(request, handler) {
      const logs = [];
      if (false) {
        finalAssertExports.isInstance(request, Request, {
          moduleName: "workbox-strategies",
          className: this.constructor.name,
          funcName: "handle",
          paramName: "request"
        });
      }
      const fetchAndCachePromise = handler.fetchAndCachePut(request).catch(() => {
      });
      void handler.waitUntil(fetchAndCachePromise);
      let response = await handler.cacheMatch(request);
      let error;
      if (response) {
        if (false) {
          logs.push(`Found a cached response in the '${this.cacheName}' cache. Will update with the network response in the background.`);
        }
      } else {
        if (false) {
          logs.push(`No response found in the '${this.cacheName}' cache. Will wait for the network response.`);
        }
        try {
          response = await fetchAndCachePromise;
        } catch (err) {
          if (err instanceof Error) {
            error = err;
          }
        }
      }
      if (false) {
        logger.groupCollapsed(messages2.strategyStart(this.constructor.name, request));
        for (const log of logs) {
          logger.log(log);
        }
        messages2.printFinalResponse(response);
        logger.groupEnd();
      }
      if (!response) {
        throw new WorkboxError("no-response", { url: request.url, error });
      }
      return response;
    }
  };

  // node_modules/workbox-cacheable-response/_version.js
  try {
    self["workbox:cacheable-response:6.5.3"] && _();
  } catch (e) {
  }

  // node_modules/workbox-cacheable-response/CacheableResponse.js
  var CacheableResponse = class {
    constructor(config = {}) {
      if (false) {
        if (!(config.statuses || config.headers)) {
          throw new WorkboxError("statuses-or-headers-required", {
            moduleName: "workbox-cacheable-response",
            className: "CacheableResponse",
            funcName: "constructor"
          });
        }
        if (config.statuses) {
          finalAssertExports.isArray(config.statuses, {
            moduleName: "workbox-cacheable-response",
            className: "CacheableResponse",
            funcName: "constructor",
            paramName: "config.statuses"
          });
        }
        if (config.headers) {
          finalAssertExports.isType(config.headers, "object", {
            moduleName: "workbox-cacheable-response",
            className: "CacheableResponse",
            funcName: "constructor",
            paramName: "config.headers"
          });
        }
      }
      this._statuses = config.statuses;
      this._headers = config.headers;
    }
    isResponseCacheable(response) {
      if (false) {
        finalAssertExports.isInstance(response, Response, {
          moduleName: "workbox-cacheable-response",
          className: "CacheableResponse",
          funcName: "isResponseCacheable",
          paramName: "response"
        });
      }
      let cacheable = true;
      if (this._statuses) {
        cacheable = this._statuses.includes(response.status);
      }
      if (this._headers && cacheable) {
        cacheable = Object.keys(this._headers).some((headerName) => {
          return response.headers.get(headerName) === this._headers[headerName];
        });
      }
      if (false) {
        if (!cacheable) {
          logger.groupCollapsed(`The request for '${getFriendlyURL(response.url)}' returned a response that does not meet the criteria for being cached.`);
          logger.groupCollapsed(`View cacheability criteria here.`);
          logger.log(`Cacheable statuses: ` + JSON.stringify(this._statuses));
          logger.log(`Cacheable headers: ` + JSON.stringify(this._headers, null, 2));
          logger.groupEnd();
          const logFriendlyHeaders = {};
          response.headers.forEach((value, key) => {
            logFriendlyHeaders[key] = value;
          });
          logger.groupCollapsed(`View response status and headers here.`);
          logger.log(`Response status: ${response.status}`);
          logger.log(`Response headers: ` + JSON.stringify(logFriendlyHeaders, null, 2));
          logger.groupEnd();
          logger.groupCollapsed(`View full response details here.`);
          logger.log(response.headers);
          logger.log(response);
          logger.groupEnd();
          logger.groupEnd();
        }
      }
      return cacheable;
    }
  };

  // node_modules/workbox-cacheable-response/CacheableResponsePlugin.js
  var CacheableResponsePlugin = class {
    constructor(config) {
      this.cacheWillUpdate = async ({ response }) => {
        if (this._cacheableResponse.isResponseCacheable(response)) {
          return response;
        }
        return null;
      };
      this._cacheableResponse = new CacheableResponse(config);
    }
  };

  // node_modules/idb/build/wrap-idb-value.js
  var instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);
  var idbProxyableTypes;
  var cursorAdvanceMethods;
  function getIdbProxyableTypes() {
    return idbProxyableTypes || (idbProxyableTypes = [
      IDBDatabase,
      IDBObjectStore,
      IDBIndex,
      IDBCursor,
      IDBTransaction
    ]);
  }
  function getCursorAdvanceMethods() {
    return cursorAdvanceMethods || (cursorAdvanceMethods = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey
    ]);
  }
  var cursorRequestMap = /* @__PURE__ */ new WeakMap();
  var transactionDoneMap = /* @__PURE__ */ new WeakMap();
  var transactionStoreNamesMap = /* @__PURE__ */ new WeakMap();
  var transformCache = /* @__PURE__ */ new WeakMap();
  var reverseTransformCache = /* @__PURE__ */ new WeakMap();
  function promisifyRequest(request) {
    const promise = new Promise((resolve, reject) => {
      const unlisten = () => {
        request.removeEventListener("success", success);
        request.removeEventListener("error", error);
      };
      const success = () => {
        resolve(wrap(request.result));
        unlisten();
      };
      const error = () => {
        reject(request.error);
        unlisten();
      };
      request.addEventListener("success", success);
      request.addEventListener("error", error);
    });
    promise.then((value) => {
      if (value instanceof IDBCursor) {
        cursorRequestMap.set(value, request);
      }
    }).catch(() => {
    });
    reverseTransformCache.set(promise, request);
    return promise;
  }
  function cacheDonePromiseForTransaction(tx) {
    if (transactionDoneMap.has(tx))
      return;
    const done = new Promise((resolve, reject) => {
      const unlisten = () => {
        tx.removeEventListener("complete", complete);
        tx.removeEventListener("error", error);
        tx.removeEventListener("abort", error);
      };
      const complete = () => {
        resolve();
        unlisten();
      };
      const error = () => {
        reject(tx.error || new DOMException("AbortError", "AbortError"));
        unlisten();
      };
      tx.addEventListener("complete", complete);
      tx.addEventListener("error", error);
      tx.addEventListener("abort", error);
    });
    transactionDoneMap.set(tx, done);
  }
  var idbProxyTraps = {
    get(target, prop, receiver) {
      if (target instanceof IDBTransaction) {
        if (prop === "done")
          return transactionDoneMap.get(target);
        if (prop === "objectStoreNames") {
          return target.objectStoreNames || transactionStoreNamesMap.get(target);
        }
        if (prop === "store") {
          return receiver.objectStoreNames[1] ? void 0 : receiver.objectStore(receiver.objectStoreNames[0]);
        }
      }
      return wrap(target[prop]);
    },
    set(target, prop, value) {
      target[prop] = value;
      return true;
    },
    has(target, prop) {
      if (target instanceof IDBTransaction && (prop === "done" || prop === "store")) {
        return true;
      }
      return prop in target;
    }
  };
  function replaceTraps(callback) {
    idbProxyTraps = callback(idbProxyTraps);
  }
  function wrapFunction(func) {
    if (func === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype)) {
      return function(storeNames, ...args) {
        const tx = func.call(unwrap(this), storeNames, ...args);
        transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
        return wrap(tx);
      };
    }
    if (getCursorAdvanceMethods().includes(func)) {
      return function(...args) {
        func.apply(unwrap(this), args);
        return wrap(cursorRequestMap.get(this));
      };
    }
    return function(...args) {
      return wrap(func.apply(unwrap(this), args));
    };
  }
  function transformCachableValue(value) {
    if (typeof value === "function")
      return wrapFunction(value);
    if (value instanceof IDBTransaction)
      cacheDonePromiseForTransaction(value);
    if (instanceOfAny(value, getIdbProxyableTypes()))
      return new Proxy(value, idbProxyTraps);
    return value;
  }
  function wrap(value) {
    if (value instanceof IDBRequest)
      return promisifyRequest(value);
    if (transformCache.has(value))
      return transformCache.get(value);
    const newValue = transformCachableValue(value);
    if (newValue !== value) {
      transformCache.set(value, newValue);
      reverseTransformCache.set(newValue, value);
    }
    return newValue;
  }
  var unwrap = (value) => reverseTransformCache.get(value);

  // node_modules/idb/build/index.js
  function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
    const request = indexedDB.open(name, version);
    const openPromise = wrap(request);
    if (upgrade) {
      request.addEventListener("upgradeneeded", (event) => {
        upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction));
      });
    }
    if (blocked)
      request.addEventListener("blocked", () => blocked());
    openPromise.then((db) => {
      if (terminated)
        db.addEventListener("close", () => terminated());
      if (blocking)
        db.addEventListener("versionchange", () => blocking());
    }).catch(() => {
    });
    return openPromise;
  }
  function deleteDB(name, { blocked } = {}) {
    const request = indexedDB.deleteDatabase(name);
    if (blocked)
      request.addEventListener("blocked", () => blocked());
    return wrap(request).then(() => void 0);
  }
  var readMethods = ["get", "getKey", "getAll", "getAllKeys", "count"];
  var writeMethods = ["put", "add", "delete", "clear"];
  var cachedMethods = /* @__PURE__ */ new Map();
  function getMethod(target, prop) {
    if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === "string")) {
      return;
    }
    if (cachedMethods.get(prop))
      return cachedMethods.get(prop);
    const targetFuncName = prop.replace(/FromIndex$/, "");
    const useIndex = prop !== targetFuncName;
    const isWrite = writeMethods.includes(targetFuncName);
    if (!(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))) {
      return;
    }
    const method = async function(storeName, ...args) {
      const tx = this.transaction(storeName, isWrite ? "readwrite" : "readonly");
      let target2 = tx.store;
      if (useIndex)
        target2 = target2.index(args.shift());
      return (await Promise.all([
        target2[targetFuncName](...args),
        isWrite && tx.done
      ]))[0];
    };
    cachedMethods.set(prop, method);
    return method;
  }
  replaceTraps((oldTraps) => ({
    ...oldTraps,
    get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
    has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
  }));

  // node_modules/workbox-expiration/_version.js
  try {
    self["workbox:expiration:6.5.3"] && _();
  } catch (e) {
  }

  // node_modules/workbox-expiration/models/CacheTimestampsModel.js
  var DB_NAME = "workbox-expiration";
  var CACHE_OBJECT_STORE = "cache-entries";
  var normalizeURL = (unNormalizedUrl) => {
    const url = new URL(unNormalizedUrl, location.href);
    url.hash = "";
    return url.href;
  };
  var CacheTimestampsModel = class {
    constructor(cacheName) {
      this._db = null;
      this._cacheName = cacheName;
    }
    _upgradeDb(db) {
      const objStore = db.createObjectStore(CACHE_OBJECT_STORE, { keyPath: "id" });
      objStore.createIndex("cacheName", "cacheName", { unique: false });
      objStore.createIndex("timestamp", "timestamp", { unique: false });
    }
    _upgradeDbAndDeleteOldDbs(db) {
      this._upgradeDb(db);
      if (this._cacheName) {
        void deleteDB(this._cacheName);
      }
    }
    async setTimestamp(url, timestamp) {
      url = normalizeURL(url);
      const entry = {
        url,
        timestamp,
        cacheName: this._cacheName,
        id: this._getId(url)
      };
      const db = await this.getDb();
      const tx = db.transaction(CACHE_OBJECT_STORE, "readwrite", {
        durability: "relaxed"
      });
      await tx.store.put(entry);
      await tx.done;
    }
    async getTimestamp(url) {
      const db = await this.getDb();
      const entry = await db.get(CACHE_OBJECT_STORE, this._getId(url));
      return entry === null || entry === void 0 ? void 0 : entry.timestamp;
    }
    async expireEntries(minTimestamp, maxCount) {
      const db = await this.getDb();
      let cursor = await db.transaction(CACHE_OBJECT_STORE).store.index("timestamp").openCursor(null, "prev");
      const entriesToDelete = [];
      let entriesNotDeletedCount = 0;
      while (cursor) {
        const result = cursor.value;
        if (result.cacheName === this._cacheName) {
          if (minTimestamp && result.timestamp < minTimestamp || maxCount && entriesNotDeletedCount >= maxCount) {
            entriesToDelete.push(cursor.value);
          } else {
            entriesNotDeletedCount++;
          }
        }
        cursor = await cursor.continue();
      }
      const urlsDeleted = [];
      for (const entry of entriesToDelete) {
        await db.delete(CACHE_OBJECT_STORE, entry.id);
        urlsDeleted.push(entry.url);
      }
      return urlsDeleted;
    }
    _getId(url) {
      return this._cacheName + "|" + normalizeURL(url);
    }
    async getDb() {
      if (!this._db) {
        this._db = await openDB(DB_NAME, 1, {
          upgrade: this._upgradeDbAndDeleteOldDbs.bind(this)
        });
      }
      return this._db;
    }
  };

  // node_modules/workbox-expiration/CacheExpiration.js
  var CacheExpiration = class {
    constructor(cacheName, config = {}) {
      this._isRunning = false;
      this._rerunRequested = false;
      if (false) {
        finalAssertExports.isType(cacheName, "string", {
          moduleName: "workbox-expiration",
          className: "CacheExpiration",
          funcName: "constructor",
          paramName: "cacheName"
        });
        if (!(config.maxEntries || config.maxAgeSeconds)) {
          throw new WorkboxError("max-entries-or-age-required", {
            moduleName: "workbox-expiration",
            className: "CacheExpiration",
            funcName: "constructor"
          });
        }
        if (config.maxEntries) {
          finalAssertExports.isType(config.maxEntries, "number", {
            moduleName: "workbox-expiration",
            className: "CacheExpiration",
            funcName: "constructor",
            paramName: "config.maxEntries"
          });
        }
        if (config.maxAgeSeconds) {
          finalAssertExports.isType(config.maxAgeSeconds, "number", {
            moduleName: "workbox-expiration",
            className: "CacheExpiration",
            funcName: "constructor",
            paramName: "config.maxAgeSeconds"
          });
        }
      }
      this._maxEntries = config.maxEntries;
      this._maxAgeSeconds = config.maxAgeSeconds;
      this._matchOptions = config.matchOptions;
      this._cacheName = cacheName;
      this._timestampModel = new CacheTimestampsModel(cacheName);
    }
    async expireEntries() {
      if (this._isRunning) {
        this._rerunRequested = true;
        return;
      }
      this._isRunning = true;
      const minTimestamp = this._maxAgeSeconds ? Date.now() - this._maxAgeSeconds * 1e3 : 0;
      const urlsExpired = await this._timestampModel.expireEntries(minTimestamp, this._maxEntries);
      const cache = await self.caches.open(this._cacheName);
      for (const url of urlsExpired) {
        await cache.delete(url, this._matchOptions);
      }
      if (false) {
        if (urlsExpired.length > 0) {
          logger.groupCollapsed(`Expired ${urlsExpired.length} ${urlsExpired.length === 1 ? "entry" : "entries"} and removed ${urlsExpired.length === 1 ? "it" : "them"} from the '${this._cacheName}' cache.`);
          logger.log(`Expired the following ${urlsExpired.length === 1 ? "URL" : "URLs"}:`);
          urlsExpired.forEach((url) => logger.log(`    ${url}`));
          logger.groupEnd();
        } else {
          logger.debug(`Cache expiration ran and found no entries to remove.`);
        }
      }
      this._isRunning = false;
      if (this._rerunRequested) {
        this._rerunRequested = false;
        dontWaitFor(this.expireEntries());
      }
    }
    async updateTimestamp(url) {
      if (false) {
        finalAssertExports.isType(url, "string", {
          moduleName: "workbox-expiration",
          className: "CacheExpiration",
          funcName: "updateTimestamp",
          paramName: "url"
        });
      }
      await this._timestampModel.setTimestamp(url, Date.now());
    }
    async isURLExpired(url) {
      if (!this._maxAgeSeconds) {
        if (false) {
          throw new WorkboxError(`expired-test-without-max-age`, {
            methodName: "isURLExpired",
            paramName: "maxAgeSeconds"
          });
        }
        return false;
      } else {
        const timestamp = await this._timestampModel.getTimestamp(url);
        const expireOlderThan = Date.now() - this._maxAgeSeconds * 1e3;
        return timestamp !== void 0 ? timestamp < expireOlderThan : true;
      }
    }
    async delete() {
      this._rerunRequested = false;
      await this._timestampModel.expireEntries(Infinity);
    }
  };

  // node_modules/workbox-expiration/ExpirationPlugin.js
  var ExpirationPlugin = class {
    constructor(config = {}) {
      this.cachedResponseWillBeUsed = async ({ event, request, cacheName, cachedResponse }) => {
        if (!cachedResponse) {
          return null;
        }
        const isFresh = this._isResponseDateFresh(cachedResponse);
        const cacheExpiration = this._getCacheExpiration(cacheName);
        dontWaitFor(cacheExpiration.expireEntries());
        const updateTimestampDone = cacheExpiration.updateTimestamp(request.url);
        if (event) {
          try {
            event.waitUntil(updateTimestampDone);
          } catch (error) {
            if (false) {
              if ("request" in event) {
                logger.warn(`Unable to ensure service worker stays alive when updating cache entry for '${getFriendlyURL(event.request.url)}'.`);
              }
            }
          }
        }
        return isFresh ? cachedResponse : null;
      };
      this.cacheDidUpdate = async ({ cacheName, request }) => {
        if (false) {
          finalAssertExports.isType(cacheName, "string", {
            moduleName: "workbox-expiration",
            className: "Plugin",
            funcName: "cacheDidUpdate",
            paramName: "cacheName"
          });
          finalAssertExports.isInstance(request, Request, {
            moduleName: "workbox-expiration",
            className: "Plugin",
            funcName: "cacheDidUpdate",
            paramName: "request"
          });
        }
        const cacheExpiration = this._getCacheExpiration(cacheName);
        await cacheExpiration.updateTimestamp(request.url);
        await cacheExpiration.expireEntries();
      };
      if (false) {
        if (!(config.maxEntries || config.maxAgeSeconds)) {
          throw new WorkboxError("max-entries-or-age-required", {
            moduleName: "workbox-expiration",
            className: "Plugin",
            funcName: "constructor"
          });
        }
        if (config.maxEntries) {
          finalAssertExports.isType(config.maxEntries, "number", {
            moduleName: "workbox-expiration",
            className: "Plugin",
            funcName: "constructor",
            paramName: "config.maxEntries"
          });
        }
        if (config.maxAgeSeconds) {
          finalAssertExports.isType(config.maxAgeSeconds, "number", {
            moduleName: "workbox-expiration",
            className: "Plugin",
            funcName: "constructor",
            paramName: "config.maxAgeSeconds"
          });
        }
      }
      this._config = config;
      this._maxAgeSeconds = config.maxAgeSeconds;
      this._cacheExpirations = /* @__PURE__ */ new Map();
      if (config.purgeOnQuotaError) {
        registerQuotaErrorCallback(() => this.deleteCacheAndMetadata());
      }
    }
    _getCacheExpiration(cacheName) {
      if (cacheName === cacheNames.getRuntimeName()) {
        throw new WorkboxError("expire-custom-caches-only");
      }
      let cacheExpiration = this._cacheExpirations.get(cacheName);
      if (!cacheExpiration) {
        cacheExpiration = new CacheExpiration(cacheName, this._config);
        this._cacheExpirations.set(cacheName, cacheExpiration);
      }
      return cacheExpiration;
    }
    _isResponseDateFresh(cachedResponse) {
      if (!this._maxAgeSeconds) {
        return true;
      }
      const dateHeaderTimestamp = this._getDateHeaderTimestamp(cachedResponse);
      if (dateHeaderTimestamp === null) {
        return true;
      }
      const now = Date.now();
      return dateHeaderTimestamp >= now - this._maxAgeSeconds * 1e3;
    }
    _getDateHeaderTimestamp(cachedResponse) {
      if (!cachedResponse.headers.has("date")) {
        return null;
      }
      const dateHeader = cachedResponse.headers.get("date");
      const parsedDate = new Date(dateHeader);
      const headerTime = parsedDate.getTime();
      if (isNaN(headerTime)) {
        return null;
      }
      return headerTime;
    }
    async deleteCacheAndMetadata() {
      for (const [cacheName, cacheExpiration] of this._cacheExpirations) {
        await self.caches.delete(cacheName);
        await cacheExpiration.delete();
      }
      this._cacheExpirations = /* @__PURE__ */ new Map();
    }
  };

  // node_modules/workbox-recipes/_version.js
  try {
    self["workbox:recipes:6.5.3"] && _();
  } catch (e) {
  }

  // node_modules/workbox-recipes/googleFontsCache.js
  function googleFontsCache(options = {}) {
    const sheetCacheName = `${options.cachePrefix || "google-fonts"}-stylesheets`;
    const fontCacheName = `${options.cachePrefix || "google-fonts"}-webfonts`;
    const maxAgeSeconds = options.maxAgeSeconds || 60 * 60 * 24 * 365;
    const maxEntries = options.maxEntries || 30;
    registerRoute(({ url }) => url.origin === "https://fonts.googleapis.com", new StaleWhileRevalidate({
      cacheName: sheetCacheName
    }));
    registerRoute(({ url }) => url.origin === "https://fonts.gstatic.com", new CacheFirst({
      cacheName: fontCacheName,
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200]
        }),
        new ExpirationPlugin({
          maxAgeSeconds,
          maxEntries
        })
      ]
    }));
  }

  // src-pwa/custom-service-worker.js
  self.skipWaiting();
  clientsClaim();
  precacheAndRoute([{"revision":"4e9df72260ddba693d544a3d31d56530","url":"favicon.ico"},{"revision":"c18800ada3eda5b38f1fc5e2d5cae10f","url":"icons/apple-icon-120x120.png"},{"revision":"95190973a27f346a2082ae1cd9c0abaf","url":"icons/apple-icon-152x152.png"},{"revision":"3f925bc01e8bc0f3d7cd4617ccc3738a","url":"icons/apple-icon-167x167.png"},{"revision":"ac3da4ecb9574c46f87dce8ea71612be","url":"icons/apple-icon-180x180.png"},{"revision":"18e086bf3afe309323afe930620cba90","url":"icons/apple-launch-1125x2436.png"},{"revision":"da4b2b7c0b976732ca4dbe6d55afee24","url":"icons/apple-launch-1170x2532.png"},{"revision":"4fffaa30f986f26ed8d4c3e947be8701","url":"icons/apple-launch-1242x2208.png"},{"revision":"5bff93bfe08778caffcd964a30a32339","url":"icons/apple-launch-1242x2688.png"},{"revision":"5d753ec8e1c1182642e4b5986c2d7cd7","url":"icons/apple-launch-1284x2778.png"},{"revision":"e9b24abcbf3b05e9d2be07b9186f89fd","url":"icons/apple-launch-1536x2048.png"},{"revision":"06fa13bfac043a05084bf9b150ad1121","url":"icons/apple-launch-1620x2160.png"},{"revision":"a35254b91b97fdba7a468de7dd44d454","url":"icons/apple-launch-1668x2224.png"},{"revision":"74f173233ae7810c05847c8c5c77155b","url":"icons/apple-launch-1668x2388.png"},{"revision":"f2aa0c2556bfa8e0af8f4b5a1a4b7e4c","url":"icons/apple-launch-2048x2732.png"},{"revision":"e6c5d9cccba54faf07b1a16b462a9d06","url":"icons/apple-launch-750x1334.png"},{"revision":"b8ba1fd65e523a5b5e5b0037175d98f1","url":"icons/apple-launch-828x1792.png"},{"revision":"f98ce64a97081d84147cd8723792201e","url":"icons/favicon-128x128.png"},{"revision":"1a02032274e46ee3b440a38550106fe3","url":"icons/favicon-16x16.png"},{"revision":"416389947164ff036b2d1a2dd3855e23","url":"icons/favicon-32x32.png"},{"revision":"d5e473cd2e3911dd5f7ff3b02a7db962","url":"icons/favicon-96x96.png"},{"revision":"f98ce64a97081d84147cd8723792201e","url":"icons/icon-128x128.png"},{"revision":"d0b6aa54c442f6142581c7fa95b4d6a0","url":"icons/icon-192x192.png"},{"revision":"8d3f351140fb51c5cb880498ff91c7cc","url":"icons/icon-256x256.png"},{"revision":"d24650479c8c698dbad71e155d3b3ec5","url":"icons/icon-384x384.png"},{"revision":"093c6dbb842b8e346c0a38e87de0cd23","url":"icons/icon-512x512.png"},{"revision":"f3a7cbd49251ee2bcba3db06febffcc3","url":"icons/ms-icon-144x144.png"},{"revision":"f71c562d12ece59f74dae009de4aa668","url":"icons/safari-pinned-tab.svg"},{"revision":"e2e9999dd2cc813625d7dfca93b292eb","url":"images/icon-alt.png"},{"revision":"5a8a8aab31d2047dce2c6db8aea24e4e","url":"images/icon.png"},{"revision":"48cecb72dc8b91c141c3e25a7ddff4dc","url":"images/login-bg.jpg"},{"revision":"1bcd0ad4920234aeac30ef4a880fb985","url":"images/logo-alt.png"},{"revision":"c472d09ddd4b604a7b3841b19bd0bac1","url":"images/logo.png"}]);
  cleanupOutdatedCaches();
  googleFontsCache({
    cachePrefix: "google-fonts",
    maxEntries: 60
  });
  registerRoute(
    ({ url }) => url.pathname.startsWith("/posts"),
    new NetworkFirst()
  );
  registerRoute(
    ({ url }) => url.href.startsWith("http"),
    new StaleWhileRevalidate()
  );
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtY29yZS9fdmVyc2lvbi5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1jb3JlL19wcml2YXRlL2xvZ2dlci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1jb3JlL21vZGVscy9tZXNzYWdlcy9tZXNzYWdlR2VuZXJhdG9yLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LWNvcmUvX3ByaXZhdGUvV29ya2JveEVycm9yLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LWNvcmUvbW9kZWxzL3F1b3RhRXJyb3JDYWxsYmFja3MuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtY29yZS9yZWdpc3RlclF1b3RhRXJyb3JDYWxsYmFjay5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1jb3JlL19wcml2YXRlL2NhY2hlTmFtZXMuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtY29yZS9fcHJpdmF0ZS9jYWNoZU1hdGNoSWdub3JlUGFyYW1zLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LWNvcmUvX3ByaXZhdGUvY2FuQ29uc3RydWN0UmVzcG9uc2VGcm9tQm9keVN0cmVhbS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1jb3JlL19wcml2YXRlL2RvbnRXYWl0Rm9yLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LWNvcmUvX3ByaXZhdGUvRGVmZXJyZWQuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtY29yZS9fcHJpdmF0ZS9leGVjdXRlUXVvdGFFcnJvckNhbGxiYWNrcy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1jb3JlL19wcml2YXRlL2dldEZyaWVuZGx5VVJMLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LWNvcmUvX3ByaXZhdGUvdGltZW91dC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1jb3JlL19wcml2YXRlL3dhaXRVbnRpbC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1jb3JlL2NvcHlSZXNwb25zZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1jb3JlL2NsaWVudHNDbGFpbS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1wcmVjYWNoaW5nL192ZXJzaW9uLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LXByZWNhY2hpbmcvdXRpbHMvY3JlYXRlQ2FjaGVLZXkuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtcHJlY2FjaGluZy91dGlscy9QcmVjYWNoZUluc3RhbGxSZXBvcnRQbHVnaW4uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtcHJlY2FjaGluZy91dGlscy9QcmVjYWNoZUNhY2hlS2V5UGx1Z2luLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LXN0cmF0ZWdpZXMvX3ZlcnNpb24uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtc3RyYXRlZ2llcy9TdHJhdGVneUhhbmRsZXIuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtc3RyYXRlZ2llcy9TdHJhdGVneS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1wcmVjYWNoaW5nL1ByZWNhY2hlU3RyYXRlZ3kuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtcHJlY2FjaGluZy9QcmVjYWNoZUNvbnRyb2xsZXIuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtcHJlY2FjaGluZy91dGlscy9nZXRPckNyZWF0ZVByZWNhY2hlQ29udHJvbGxlci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1yb3V0aW5nL192ZXJzaW9uLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LXJvdXRpbmcvdXRpbHMvY29uc3RhbnRzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LXJvdXRpbmcvdXRpbHMvbm9ybWFsaXplSGFuZGxlci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1yb3V0aW5nL1JvdXRlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LXJvdXRpbmcvUmVnRXhwUm91dGUuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtcm91dGluZy9Sb3V0ZXIuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtcm91dGluZy91dGlscy9nZXRPckNyZWF0ZURlZmF1bHRSb3V0ZXIuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtcm91dGluZy9yZWdpc3RlclJvdXRlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LXByZWNhY2hpbmcvdXRpbHMvcmVtb3ZlSWdub3JlZFNlYXJjaFBhcmFtcy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1wcmVjYWNoaW5nL3V0aWxzL2dlbmVyYXRlVVJMVmFyaWF0aW9ucy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1wcmVjYWNoaW5nL1ByZWNhY2hlUm91dGUuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtcHJlY2FjaGluZy9hZGRSb3V0ZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1wcmVjYWNoaW5nL3V0aWxzL2RlbGV0ZU91dGRhdGVkQ2FjaGVzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LXByZWNhY2hpbmcvY2xlYW51cE91dGRhdGVkQ2FjaGVzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LXByZWNhY2hpbmcvcHJlY2FjaGUuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtcHJlY2FjaGluZy9wcmVjYWNoZUFuZFJvdXRlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LXN0cmF0ZWdpZXMvQ2FjaGVGaXJzdC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1zdHJhdGVnaWVzL3BsdWdpbnMvY2FjaGVPa0FuZE9wYXF1ZVBsdWdpbi5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1zdHJhdGVnaWVzL05ldHdvcmtGaXJzdC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1zdHJhdGVnaWVzL1N0YWxlV2hpbGVSZXZhbGlkYXRlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LWNhY2hlYWJsZS1yZXNwb25zZS9fdmVyc2lvbi5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1jYWNoZWFibGUtcmVzcG9uc2UvQ2FjaGVhYmxlUmVzcG9uc2UuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtY2FjaGVhYmxlLXJlc3BvbnNlL0NhY2hlYWJsZVJlc3BvbnNlUGx1Z2luLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pZGIvYnVpbGQvd3JhcC1pZGItdmFsdWUuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2lkYi9idWlsZC9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1leHBpcmF0aW9uL192ZXJzaW9uLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LWV4cGlyYXRpb24vbW9kZWxzL0NhY2hlVGltZXN0YW1wc01vZGVsLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LWV4cGlyYXRpb24vQ2FjaGVFeHBpcmF0aW9uLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LWV4cGlyYXRpb24vRXhwaXJhdGlvblBsdWdpbi5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1yZWNpcGVzL192ZXJzaW9uLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LXJlY2lwZXMvZ29vZ2xlRm9udHNDYWNoZS5qcyIsICIuLi8uLi9zcmMtcHdhL2N1c3RvbS1zZXJ2aWNlLXdvcmtlci5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBAdHMtaWdub3JlXG50cnkge1xuICAgIHNlbGZbJ3dvcmtib3g6Y29yZTo2LjUuMyddICYmIF8oKTtcbn1cbmNhdGNoIChlKSB7IH1cbiIsICIvKlxuICBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0ICcuLi9fdmVyc2lvbi5qcyc7XG5jb25zdCBsb2dnZXIgPSAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJ1xuICAgID8gbnVsbFxuICAgIDogKCgpID0+IHtcbiAgICAgICAgLy8gRG9uJ3Qgb3ZlcndyaXRlIHRoaXMgdmFsdWUgaWYgaXQncyBhbHJlYWR5IHNldC5cbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvd29ya2JveC9wdWxsLzIyODQjaXNzdWVjb21tZW50LTU2MDQ3MDkyM1xuICAgICAgICBpZiAoISgnX19XQl9ESVNBQkxFX0RFVl9MT0dTJyBpbiBzZWxmKSkge1xuICAgICAgICAgICAgc2VsZi5fX1dCX0RJU0FCTEVfREVWX0xPR1MgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaW5Hcm91cCA9IGZhbHNlO1xuICAgICAgICBjb25zdCBtZXRob2RUb0NvbG9yTWFwID0ge1xuICAgICAgICAgICAgZGVidWc6IGAjN2Y4YzhkYCxcbiAgICAgICAgICAgIGxvZzogYCMyZWNjNzFgLFxuICAgICAgICAgICAgd2FybjogYCNmMzljMTJgLFxuICAgICAgICAgICAgZXJyb3I6IGAjYzAzOTJiYCxcbiAgICAgICAgICAgIGdyb3VwQ29sbGFwc2VkOiBgIzM0OThkYmAsXG4gICAgICAgICAgICBncm91cEVuZDogbnVsbCwgLy8gTm8gY29sb3JlZCBwcmVmaXggb24gZ3JvdXBFbmRcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcHJpbnQgPSBmdW5jdGlvbiAobWV0aG9kLCBhcmdzKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5fX1dCX0RJU0FCTEVfREVWX0xPR1MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWV0aG9kID09PSAnZ3JvdXBDb2xsYXBzZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gU2FmYXJpIGRvZXNuJ3QgcHJpbnQgYWxsIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQoKSBhcmd1bWVudHM6XG4gICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE4Mjc1NFxuICAgICAgICAgICAgICAgIGlmICgvXigoPyFjaHJvbWV8YW5kcm9pZCkuKSpzYWZhcmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGVbbWV0aG9kXSguLi5hcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHN0eWxlcyA9IFtcbiAgICAgICAgICAgICAgICBgYmFja2dyb3VuZDogJHttZXRob2RUb0NvbG9yTWFwW21ldGhvZF19YCxcbiAgICAgICAgICAgICAgICBgYm9yZGVyLXJhZGl1czogMC41ZW1gLFxuICAgICAgICAgICAgICAgIGBjb2xvcjogd2hpdGVgLFxuICAgICAgICAgICAgICAgIGBmb250LXdlaWdodDogYm9sZGAsXG4gICAgICAgICAgICAgICAgYHBhZGRpbmc6IDJweCAwLjVlbWAsXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgLy8gV2hlbiBpbiBhIGdyb3VwLCB0aGUgd29ya2JveCBwcmVmaXggaXMgbm90IGRpc3BsYXllZC5cbiAgICAgICAgICAgIGNvbnN0IGxvZ1ByZWZpeCA9IGluR3JvdXAgPyBbXSA6IFsnJWN3b3JrYm94Jywgc3R5bGVzLmpvaW4oJzsnKV07XG4gICAgICAgICAgICBjb25zb2xlW21ldGhvZF0oLi4ubG9nUHJlZml4LCAuLi5hcmdzKTtcbiAgICAgICAgICAgIGlmIChtZXRob2QgPT09ICdncm91cENvbGxhcHNlZCcpIHtcbiAgICAgICAgICAgICAgICBpbkdyb3VwID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtZXRob2QgPT09ICdncm91cEVuZCcpIHtcbiAgICAgICAgICAgICAgICBpbkdyb3VwID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXR5cGVzXG4gICAgICAgIGNvbnN0IGFwaSA9IHt9O1xuICAgICAgICBjb25zdCBsb2dnZXJNZXRob2RzID0gT2JqZWN0LmtleXMobWV0aG9kVG9Db2xvck1hcCk7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIGxvZ2dlck1ldGhvZHMpIHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IGtleTtcbiAgICAgICAgICAgIGFwaVttZXRob2RdID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgICAgICBwcmludChtZXRob2QsIGFyZ3MpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXBpO1xuICAgIH0pKCkpO1xuZXhwb3J0IHsgbG9nZ2VyIH07XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgbWVzc2FnZXMgfSBmcm9tICcuL21lc3NhZ2VzLmpzJztcbmltcG9ydCAnLi4vLi4vX3ZlcnNpb24uanMnO1xuY29uc3QgZmFsbGJhY2sgPSAoY29kZSwgLi4uYXJncykgPT4ge1xuICAgIGxldCBtc2cgPSBjb2RlO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbXNnICs9IGAgOjogJHtKU09OLnN0cmluZ2lmeShhcmdzKX1gO1xuICAgIH1cbiAgICByZXR1cm4gbXNnO1xufTtcbmNvbnN0IGdlbmVyYXRvckZ1bmN0aW9uID0gKGNvZGUsIGRldGFpbHMgPSB7fSkgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBtZXNzYWdlc1tjb2RlXTtcbiAgICBpZiAoIW1lc3NhZ2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmFibGUgdG8gZmluZCBtZXNzYWdlIGZvciBjb2RlICcke2NvZGV9Jy5gKTtcbiAgICB9XG4gICAgcmV0dXJuIG1lc3NhZ2UoZGV0YWlscyk7XG59O1xuZXhwb3J0IGNvbnN0IG1lc3NhZ2VHZW5lcmF0b3IgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nID8gZmFsbGJhY2sgOiBnZW5lcmF0b3JGdW5jdGlvbjtcbiIsICIvKlxuICBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgeyBtZXNzYWdlR2VuZXJhdG9yIH0gZnJvbSAnLi4vbW9kZWxzL21lc3NhZ2VzL21lc3NhZ2VHZW5lcmF0b3IuanMnO1xuaW1wb3J0ICcuLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIFdvcmtib3ggZXJyb3JzIHNob3VsZCBiZSB0aHJvd24gd2l0aCB0aGlzIGNsYXNzLlxuICogVGhpcyBhbGxvd3MgdXNlIHRvIGVuc3VyZSB0aGUgdHlwZSBlYXNpbHkgaW4gdGVzdHMsXG4gKiBoZWxwcyBkZXZlbG9wZXJzIGlkZW50aWZ5IGVycm9ycyBmcm9tIHdvcmtib3hcbiAqIGVhc2lseSBhbmQgYWxsb3dzIHVzZSB0byBvcHRpbWlzZSBlcnJvclxuICogbWVzc2FnZXMgY29ycmVjdGx5LlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmNsYXNzIFdvcmtib3hFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlcnJvckNvZGUgVGhlIGVycm9yIGNvZGUgdGhhdFxuICAgICAqIGlkZW50aWZpZXMgdGhpcyBwYXJ0aWN1bGFyIGVycm9yLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0PX0gZGV0YWlscyBBbnkgcmVsZXZhbnQgYXJndW1lbnRzXG4gICAgICogdGhhdCB3aWxsIGhlbHAgZGV2ZWxvcGVycyBpZGVudGlmeSBpc3N1ZXMgc2hvdWxkXG4gICAgICogYmUgYWRkZWQgYXMgYSBrZXkgb24gdGhlIGNvbnRleHQgb2JqZWN0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGVycm9yQ29kZSwgZGV0YWlscykge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gbWVzc2FnZUdlbmVyYXRvcihlcnJvckNvZGUsIGRldGFpbHMpO1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5uYW1lID0gZXJyb3JDb2RlO1xuICAgICAgICB0aGlzLmRldGFpbHMgPSBkZXRhaWxzO1xuICAgIH1cbn1cbmV4cG9ydCB7IFdvcmtib3hFcnJvciB9O1xuIiwgIi8qXG4gIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCAnLi4vX3ZlcnNpb24uanMnO1xuLy8gQ2FsbGJhY2tzIHRvIGJlIGV4ZWN1dGVkIHdoZW5ldmVyIHRoZXJlJ3MgYSBxdW90YSBlcnJvci5cbi8vIENhbid0IGNoYW5nZSBGdW5jdGlvbiB0eXBlIHJpZ2h0IG5vdy5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXR5cGVzXG5jb25zdCBxdW90YUVycm9yQ2FsbGJhY2tzID0gbmV3IFNldCgpO1xuZXhwb3J0IHsgcXVvdGFFcnJvckNhbGxiYWNrcyB9O1xuIiwgIi8qXG4gIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4vX3ByaXZhdGUvbG9nZ2VyLmpzJztcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJy4vX3ByaXZhdGUvYXNzZXJ0LmpzJztcbmltcG9ydCB7IHF1b3RhRXJyb3JDYWxsYmFja3MgfSBmcm9tICcuL21vZGVscy9xdW90YUVycm9yQ2FsbGJhY2tzLmpzJztcbmltcG9ydCAnLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIEFkZHMgYSBmdW5jdGlvbiB0byB0aGUgc2V0IG9mIHF1b3RhRXJyb3JDYWxsYmFja3MgdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIGlmXG4gKiB0aGVyZSdzIGEgcXVvdGEgZXJyb3IuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEBtZW1iZXJvZiB3b3JrYm94LWNvcmVcbiAqL1xuLy8gQ2FuJ3QgY2hhbmdlIEZ1bmN0aW9uIHR5cGVcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXR5cGVzXG5mdW5jdGlvbiByZWdpc3RlclF1b3RhRXJyb3JDYWxsYmFjayhjYWxsYmFjaykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGFzc2VydC5pc1R5cGUoY2FsbGJhY2ssICdmdW5jdGlvbicsIHtcbiAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LWNvcmUnLFxuICAgICAgICAgICAgZnVuY05hbWU6ICdyZWdpc3RlcicsXG4gICAgICAgICAgICBwYXJhbU5hbWU6ICdjYWxsYmFjaycsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBxdW90YUVycm9yQ2FsbGJhY2tzLmFkZChjYWxsYmFjayk7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgbG9nZ2VyLmxvZygnUmVnaXN0ZXJlZCBhIGNhbGxiYWNrIHRvIHJlc3BvbmQgdG8gcXVvdGEgZXJyb3JzLicsIGNhbGxiYWNrKTtcbiAgICB9XG59XG5leHBvcnQgeyByZWdpc3RlclF1b3RhRXJyb3JDYWxsYmFjayB9O1xuIiwgIi8qXG4gIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCAnLi4vX3ZlcnNpb24uanMnO1xuY29uc3QgX2NhY2hlTmFtZURldGFpbHMgPSB7XG4gICAgZ29vZ2xlQW5hbHl0aWNzOiAnZ29vZ2xlQW5hbHl0aWNzJyxcbiAgICBwcmVjYWNoZTogJ3ByZWNhY2hlLXYyJyxcbiAgICBwcmVmaXg6ICd3b3JrYm94JyxcbiAgICBydW50aW1lOiAncnVudGltZScsXG4gICAgc3VmZml4OiB0eXBlb2YgcmVnaXN0cmF0aW9uICE9PSAndW5kZWZpbmVkJyA/IHJlZ2lzdHJhdGlvbi5zY29wZSA6ICcnLFxufTtcbmNvbnN0IF9jcmVhdGVDYWNoZU5hbWUgPSAoY2FjaGVOYW1lKSA9PiB7XG4gICAgcmV0dXJuIFtfY2FjaGVOYW1lRGV0YWlscy5wcmVmaXgsIGNhY2hlTmFtZSwgX2NhY2hlTmFtZURldGFpbHMuc3VmZml4XVxuICAgICAgICAuZmlsdGVyKCh2YWx1ZSkgPT4gdmFsdWUgJiYgdmFsdWUubGVuZ3RoID4gMClcbiAgICAgICAgLmpvaW4oJy0nKTtcbn07XG5jb25zdCBlYWNoQ2FjaGVOYW1lRGV0YWlsID0gKGZuKSA9PiB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoX2NhY2hlTmFtZURldGFpbHMpKSB7XG4gICAgICAgIGZuKGtleSk7XG4gICAgfVxufTtcbmV4cG9ydCBjb25zdCBjYWNoZU5hbWVzID0ge1xuICAgIHVwZGF0ZURldGFpbHM6IChkZXRhaWxzKSA9PiB7XG4gICAgICAgIGVhY2hDYWNoZU5hbWVEZXRhaWwoKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkZXRhaWxzW2tleV0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgX2NhY2hlTmFtZURldGFpbHNba2V5XSA9IGRldGFpbHNba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRHb29nbGVBbmFseXRpY3NOYW1lOiAodXNlckNhY2hlTmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gdXNlckNhY2hlTmFtZSB8fCBfY3JlYXRlQ2FjaGVOYW1lKF9jYWNoZU5hbWVEZXRhaWxzLmdvb2dsZUFuYWx5dGljcyk7XG4gICAgfSxcbiAgICBnZXRQcmVjYWNoZU5hbWU6ICh1c2VyQ2FjaGVOYW1lKSA9PiB7XG4gICAgICAgIHJldHVybiB1c2VyQ2FjaGVOYW1lIHx8IF9jcmVhdGVDYWNoZU5hbWUoX2NhY2hlTmFtZURldGFpbHMucHJlY2FjaGUpO1xuICAgIH0sXG4gICAgZ2V0UHJlZml4OiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBfY2FjaGVOYW1lRGV0YWlscy5wcmVmaXg7XG4gICAgfSxcbiAgICBnZXRSdW50aW1lTmFtZTogKHVzZXJDYWNoZU5hbWUpID0+IHtcbiAgICAgICAgcmV0dXJuIHVzZXJDYWNoZU5hbWUgfHwgX2NyZWF0ZUNhY2hlTmFtZShfY2FjaGVOYW1lRGV0YWlscy5ydW50aW1lKTtcbiAgICB9LFxuICAgIGdldFN1ZmZpeDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gX2NhY2hlTmFtZURldGFpbHMuc3VmZml4O1xuICAgIH0sXG59O1xuIiwgIi8qXG4gIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTENcbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbmZ1bmN0aW9uIHN0cmlwUGFyYW1zKGZ1bGxVUkwsIGlnbm9yZVBhcmFtcykge1xuICAgIGNvbnN0IHN0cmlwcGVkVVJMID0gbmV3IFVSTChmdWxsVVJMKTtcbiAgICBmb3IgKGNvbnN0IHBhcmFtIG9mIGlnbm9yZVBhcmFtcykge1xuICAgICAgICBzdHJpcHBlZFVSTC5zZWFyY2hQYXJhbXMuZGVsZXRlKHBhcmFtKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0cmlwcGVkVVJMLmhyZWY7XG59XG4vKipcbiAqIE1hdGNoZXMgYW4gaXRlbSBpbiB0aGUgY2FjaGUsIGlnbm9yaW5nIHNwZWNpZmljIFVSTCBwYXJhbXMuIFRoaXMgaXMgc2ltaWxhclxuICogdG8gdGhlIGBpZ25vcmVTZWFyY2hgIG9wdGlvbiwgYnV0IGl0IGFsbG93cyB5b3UgdG8gaWdub3JlIGp1c3Qgc3BlY2lmaWNcbiAqIHBhcmFtcyAod2hpbGUgY29udGludWluZyB0byBtYXRjaCBvbiB0aGUgb3RoZXJzKS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtDYWNoZX0gY2FjaGVcbiAqIEBwYXJhbSB7UmVxdWVzdH0gcmVxdWVzdFxuICogQHBhcmFtIHtPYmplY3R9IG1hdGNoT3B0aW9uc1xuICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBpZ25vcmVQYXJhbXNcbiAqIEByZXR1cm4ge1Byb21pc2U8UmVzcG9uc2V8dW5kZWZpbmVkPn1cbiAqL1xuYXN5bmMgZnVuY3Rpb24gY2FjaGVNYXRjaElnbm9yZVBhcmFtcyhjYWNoZSwgcmVxdWVzdCwgaWdub3JlUGFyYW1zLCBtYXRjaE9wdGlvbnMpIHtcbiAgICBjb25zdCBzdHJpcHBlZFJlcXVlc3RVUkwgPSBzdHJpcFBhcmFtcyhyZXF1ZXN0LnVybCwgaWdub3JlUGFyYW1zKTtcbiAgICAvLyBJZiB0aGUgcmVxdWVzdCBkb2Vzbid0IGluY2x1ZGUgYW55IGlnbm9yZWQgcGFyYW1zLCBtYXRjaCBhcyBub3JtYWwuXG4gICAgaWYgKHJlcXVlc3QudXJsID09PSBzdHJpcHBlZFJlcXVlc3RVUkwpIHtcbiAgICAgICAgcmV0dXJuIGNhY2hlLm1hdGNoKHJlcXVlc3QsIG1hdGNoT3B0aW9ucyk7XG4gICAgfVxuICAgIC8vIE90aGVyd2lzZSwgbWF0Y2ggYnkgY29tcGFyaW5nIGtleXNcbiAgICBjb25zdCBrZXlzT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbWF0Y2hPcHRpb25zKSwgeyBpZ25vcmVTZWFyY2g6IHRydWUgfSk7XG4gICAgY29uc3QgY2FjaGVLZXlzID0gYXdhaXQgY2FjaGUua2V5cyhyZXF1ZXN0LCBrZXlzT3B0aW9ucyk7XG4gICAgZm9yIChjb25zdCBjYWNoZUtleSBvZiBjYWNoZUtleXMpIHtcbiAgICAgICAgY29uc3Qgc3RyaXBwZWRDYWNoZUtleVVSTCA9IHN0cmlwUGFyYW1zKGNhY2hlS2V5LnVybCwgaWdub3JlUGFyYW1zKTtcbiAgICAgICAgaWYgKHN0cmlwcGVkUmVxdWVzdFVSTCA9PT0gc3RyaXBwZWRDYWNoZUtleVVSTCkge1xuICAgICAgICAgICAgcmV0dXJuIGNhY2hlLm1hdGNoKGNhY2hlS2V5LCBtYXRjaE9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybjtcbn1cbmV4cG9ydCB7IGNhY2hlTWF0Y2hJZ25vcmVQYXJhbXMgfTtcbiIsICIvKlxuICBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbmxldCBzdXBwb3J0U3RhdHVzO1xuLyoqXG4gKiBBIHV0aWxpdHkgZnVuY3Rpb24gdGhhdCBkZXRlcm1pbmVzIHdoZXRoZXIgdGhlIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0c1xuICogY29uc3RydWN0aW5nIGEgbmV3IGBSZXNwb25zZWAgZnJvbSBhIGByZXNwb25zZS5ib2R5YCBzdHJlYW0uXG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn0gYHRydWVgLCBpZiB0aGUgY3VycmVudCBicm93c2VyIGNhbiBzdWNjZXNzZnVsbHlcbiAqICAgICBjb25zdHJ1Y3QgYSBgUmVzcG9uc2VgIGZyb20gYSBgcmVzcG9uc2UuYm9keWAgc3RyZWFtLCBgZmFsc2VgIG90aGVyd2lzZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjYW5Db25zdHJ1Y3RSZXNwb25zZUZyb21Cb2R5U3RyZWFtKCkge1xuICAgIGlmIChzdXBwb3J0U3RhdHVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgdGVzdFJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKCcnKTtcbiAgICAgICAgaWYgKCdib2R5JyBpbiB0ZXN0UmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbmV3IFJlc3BvbnNlKHRlc3RSZXNwb25zZS5ib2R5KTtcbiAgICAgICAgICAgICAgICBzdXBwb3J0U3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHN1cHBvcnRTdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdXBwb3J0U3RhdHVzID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBzdXBwb3J0U3RhdHVzO1xufVxuZXhwb3J0IHsgY2FuQ29uc3RydWN0UmVzcG9uc2VGcm9tQm9keVN0cmVhbSB9O1xuIiwgIi8qXG4gIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbi8qKlxuICogQSBoZWxwZXIgZnVuY3Rpb24gdGhhdCBwcmV2ZW50cyBhIHByb21pc2UgZnJvbSBiZWluZyBmbGFnZ2VkIGFzIHVudXNlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICoqL1xuZXhwb3J0IGZ1bmN0aW9uIGRvbnRXYWl0Rm9yKHByb21pc2UpIHtcbiAgICAvLyBFZmZlY3RpdmUgbm8tb3AuXG4gICAgdm9pZCBwcm9taXNlLnRoZW4oKCkgPT4geyB9KTtcbn1cbiIsICIvKlxuICBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbi8qKlxuICogVGhlIERlZmVycmVkIGNsYXNzIGNvbXBvc2VzIFByb21pc2VzIGluIGEgd2F5IHRoYXQgYWxsb3dzIGZvciB0aGVtIHRvIGJlXG4gKiByZXNvbHZlZCBvciByZWplY3RlZCBmcm9tIG91dHNpZGUgdGhlIGNvbnN0cnVjdG9yLiBJbiBtb3N0IGNhc2VzIHByb21pc2VzXG4gKiBzaG91bGQgYmUgdXNlZCBkaXJlY3RseSwgYnV0IERlZmVycmVkcyBjYW4gYmUgbmVjZXNzYXJ5IHdoZW4gdGhlIGxvZ2ljIHRvXG4gKiByZXNvbHZlIGEgcHJvbWlzZSBtdXN0IGJlIHNlcGFyYXRlLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmNsYXNzIERlZmVycmVkIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcHJvbWlzZSBhbmQgZXhwb3NlcyBpdHMgcmVzb2x2ZSBhbmQgcmVqZWN0IGZ1bmN0aW9ucyBhcyBtZXRob2RzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICAgICAgdGhpcy5yZWplY3QgPSByZWplY3Q7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydCB7IERlZmVycmVkIH07XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi4vX3ByaXZhdGUvbG9nZ2VyLmpzJztcbmltcG9ydCB7IHF1b3RhRXJyb3JDYWxsYmFja3MgfSBmcm9tICcuLi9tb2RlbHMvcXVvdGFFcnJvckNhbGxiYWNrcy5qcyc7XG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbi8qKlxuICogUnVucyBhbGwgb2YgdGhlIGNhbGxiYWNrIGZ1bmN0aW9ucywgb25lIGF0IGEgdGltZSBzZXF1ZW50aWFsbHksIGluIHRoZSBvcmRlclxuICogaW4gd2hpY2ggdGhleSB3ZXJlIHJlZ2lzdGVyZWQuXG4gKlxuICogQG1lbWJlcm9mIHdvcmtib3gtY29yZVxuICogQHByaXZhdGVcbiAqL1xuYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZVF1b3RhRXJyb3JDYWxsYmFja3MoKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhgQWJvdXQgdG8gcnVuICR7cXVvdGFFcnJvckNhbGxiYWNrcy5zaXplfSBgICtcbiAgICAgICAgICAgIGBjYWxsYmFja3MgdG8gY2xlYW4gdXAgY2FjaGVzLmApO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGNhbGxiYWNrIG9mIHF1b3RhRXJyb3JDYWxsYmFja3MpIHtcbiAgICAgICAgYXdhaXQgY2FsbGJhY2soKTtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coY2FsbGJhY2ssICdpcyBjb21wbGV0ZS4nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBsb2dnZXIubG9nKCdGaW5pc2hlZCBydW5uaW5nIGNhbGxiYWNrcy4nKTtcbiAgICB9XG59XG5leHBvcnQgeyBleGVjdXRlUXVvdGFFcnJvckNhbGxiYWNrcyB9O1xuIiwgIi8qXG4gIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCAnLi4vX3ZlcnNpb24uanMnO1xuY29uc3QgZ2V0RnJpZW5kbHlVUkwgPSAodXJsKSA9PiB7XG4gICAgY29uc3QgdXJsT2JqID0gbmV3IFVSTChTdHJpbmcodXJsKSwgbG9jYXRpb24uaHJlZik7XG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvd29ya2JveC9pc3N1ZXMvMjMyM1xuICAgIC8vIFdlIHdhbnQgdG8gaW5jbHVkZSBldmVyeXRoaW5nLCBleGNlcHQgZm9yIHRoZSBvcmlnaW4gaWYgaXQncyBzYW1lLW9yaWdpbi5cbiAgICByZXR1cm4gdXJsT2JqLmhyZWYucmVwbGFjZShuZXcgUmVnRXhwKGBeJHtsb2NhdGlvbi5vcmlnaW59YCksICcnKTtcbn07XG5leHBvcnQgeyBnZXRGcmllbmRseVVSTCB9O1xuIiwgIi8qXG4gIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbi8qKlxuICogUmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyBhbmQgdGhlIHBhc3NlZCBudW1iZXIgb2YgbWlsbGlzZWNvbmRzLlxuICogVGhpcyB1dGlsaXR5IGlzIGFuIGFzeW5jL2F3YWl0LWZyaWVuZGx5IHZlcnNpb24gb2YgYHNldFRpbWVvdXRgLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBtc1xuICogQHJldHVybiB7UHJvbWlzZX1cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0aW1lb3V0KG1zKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XG59XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMjAgR29vZ2xlIExMQ1xuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCAnLi4vX3ZlcnNpb24uanMnO1xuLyoqXG4gKiBBIHV0aWxpdHkgbWV0aG9kIHRoYXQgbWFrZXMgaXQgZWFzaWVyIHRvIHVzZSBgZXZlbnQud2FpdFVudGlsYCB3aXRoXG4gKiBhc3luYyBmdW5jdGlvbnMgYW5kIHJldHVybiB0aGUgcmVzdWx0LlxuICpcbiAqIEBwYXJhbSB7RXh0ZW5kYWJsZUV2ZW50fSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gYXN5bmNGblxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiB3YWl0VW50aWwoZXZlbnQsIGFzeW5jRm4pIHtcbiAgICBjb25zdCByZXR1cm5Qcm9taXNlID0gYXN5bmNGbigpO1xuICAgIGV2ZW50LndhaXRVbnRpbChyZXR1cm5Qcm9taXNlKTtcbiAgICByZXR1cm4gcmV0dXJuUHJvbWlzZTtcbn1cbmV4cG9ydCB7IHdhaXRVbnRpbCB9O1xuIiwgIi8qXG4gIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IGNhbkNvbnN0cnVjdFJlc3BvbnNlRnJvbUJvZHlTdHJlYW0gfSBmcm9tICcuL19wcml2YXRlL2NhbkNvbnN0cnVjdFJlc3BvbnNlRnJvbUJvZHlTdHJlYW0uanMnO1xuaW1wb3J0IHsgV29ya2JveEVycm9yIH0gZnJvbSAnLi9fcHJpdmF0ZS9Xb3JrYm94RXJyb3IuanMnO1xuaW1wb3J0ICcuL192ZXJzaW9uLmpzJztcbi8qKlxuICogQWxsb3dzIGRldmVsb3BlcnMgdG8gY29weSBhIHJlc3BvbnNlIGFuZCBtb2RpZnkgaXRzIGBoZWFkZXJzYCwgYHN0YXR1c2AsXG4gKiBvciBgc3RhdHVzVGV4dGAgdmFsdWVzICh0aGUgdmFsdWVzIHNldHRhYmxlIHZpYSBhXG4gKiBbYFJlc3BvbnNlSW5pdGBde0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9SZXNwb25zZS9SZXNwb25zZSNTeW50YXh9XG4gKiBvYmplY3QgaW4gdGhlIGNvbnN0cnVjdG9yKS5cbiAqIFRvIG1vZGlmeSB0aGVzZSB2YWx1ZXMsIHBhc3MgYSBmdW5jdGlvbiBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50LiBUaGF0XG4gKiBmdW5jdGlvbiB3aWxsIGJlIGludm9rZWQgd2l0aCBhIHNpbmdsZSBvYmplY3Qgd2l0aCB0aGUgcmVzcG9uc2UgcHJvcGVydGllc1xuICogYHtoZWFkZXJzLCBzdGF0dXMsIHN0YXR1c1RleHR9YC4gVGhlIHJldHVybiB2YWx1ZSBvZiB0aGlzIGZ1bmN0aW9uIHdpbGxcbiAqIGJlIHVzZWQgYXMgdGhlIGBSZXNwb25zZUluaXRgIGZvciB0aGUgbmV3IGBSZXNwb25zZWAuIFRvIGNoYW5nZSB0aGUgdmFsdWVzXG4gKiBlaXRoZXIgbW9kaWZ5IHRoZSBwYXNzZWQgcGFyYW1ldGVyKHMpIGFuZCByZXR1cm4gaXQsIG9yIHJldHVybiBhIHRvdGFsbHlcbiAqIG5ldyBvYmplY3QuXG4gKlxuICogVGhpcyBtZXRob2QgaXMgaW50ZW50aW9uYWxseSBsaW1pdGVkIHRvIHNhbWUtb3JpZ2luIHJlc3BvbnNlcywgcmVnYXJkbGVzcyBvZlxuICogd2hldGhlciBDT1JTIHdhcyB1c2VkIG9yIG5vdC5cbiAqXG4gKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNwb25zZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbW9kaWZpZXJcbiAqIEBtZW1iZXJvZiB3b3JrYm94LWNvcmVcbiAqL1xuYXN5bmMgZnVuY3Rpb24gY29weVJlc3BvbnNlKHJlc3BvbnNlLCBtb2RpZmllcikge1xuICAgIGxldCBvcmlnaW4gPSBudWxsO1xuICAgIC8vIElmIHJlc3BvbnNlLnVybCBpc24ndCBzZXQsIGFzc3VtZSBpdCdzIGNyb3NzLW9yaWdpbiBhbmQga2VlcCBvcmlnaW4gbnVsbC5cbiAgICBpZiAocmVzcG9uc2UudXJsKSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlVVJMID0gbmV3IFVSTChyZXNwb25zZS51cmwpO1xuICAgICAgICBvcmlnaW4gPSByZXNwb25zZVVSTC5vcmlnaW47XG4gICAgfVxuICAgIGlmIChvcmlnaW4gIT09IHNlbGYubG9jYXRpb24ub3JpZ2luKSB7XG4gICAgICAgIHRocm93IG5ldyBXb3JrYm94RXJyb3IoJ2Nyb3NzLW9yaWdpbi1jb3B5LXJlc3BvbnNlJywgeyBvcmlnaW4gfSk7XG4gICAgfVxuICAgIGNvbnN0IGNsb25lZFJlc3BvbnNlID0gcmVzcG9uc2UuY2xvbmUoKTtcbiAgICAvLyBDcmVhdGUgYSBmcmVzaCBgUmVzcG9uc2VJbml0YCBvYmplY3QgYnkgY2xvbmluZyB0aGUgaGVhZGVycy5cbiAgICBjb25zdCByZXNwb25zZUluaXQgPSB7XG4gICAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKGNsb25lZFJlc3BvbnNlLmhlYWRlcnMpLFxuICAgICAgICBzdGF0dXM6IGNsb25lZFJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogY2xvbmVkUmVzcG9uc2Uuc3RhdHVzVGV4dCxcbiAgICB9O1xuICAgIC8vIEFwcGx5IGFueSB1c2VyIG1vZGlmaWNhdGlvbnMuXG4gICAgY29uc3QgbW9kaWZpZWRSZXNwb25zZUluaXQgPSBtb2RpZmllciA/IG1vZGlmaWVyKHJlc3BvbnNlSW5pdCkgOiByZXNwb25zZUluaXQ7XG4gICAgLy8gQ3JlYXRlIHRoZSBuZXcgcmVzcG9uc2UgZnJvbSB0aGUgYm9keSBzdHJlYW0gYW5kIGBSZXNwb25zZUluaXRgXG4gICAgLy8gbW9kaWZpY2F0aW9ucy4gTm90ZTogbm90IGFsbCBicm93c2VycyBzdXBwb3J0IHRoZSBSZXNwb25zZS5ib2R5IHN0cmVhbSxcbiAgICAvLyBzbyBmYWxsIGJhY2sgdG8gcmVhZGluZyB0aGUgZW50aXJlIGJvZHkgaW50byBtZW1vcnkgYXMgYSBibG9iLlxuICAgIGNvbnN0IGJvZHkgPSBjYW5Db25zdHJ1Y3RSZXNwb25zZUZyb21Cb2R5U3RyZWFtKClcbiAgICAgICAgPyBjbG9uZWRSZXNwb25zZS5ib2R5XG4gICAgICAgIDogYXdhaXQgY2xvbmVkUmVzcG9uc2UuYmxvYigpO1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoYm9keSwgbW9kaWZpZWRSZXNwb25zZUluaXQpO1xufVxuZXhwb3J0IHsgY29weVJlc3BvbnNlIH07XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0ICcuL192ZXJzaW9uLmpzJztcbi8qKlxuICogQ2xhaW0gYW55IGN1cnJlbnRseSBhdmFpbGFibGUgY2xpZW50cyBvbmNlIHRoZSBzZXJ2aWNlIHdvcmtlclxuICogYmVjb21lcyBhY3RpdmUuIFRoaXMgaXMgbm9ybWFsbHkgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIGBza2lwV2FpdGluZygpYC5cbiAqXG4gKiBAbWVtYmVyb2Ygd29ya2JveC1jb3JlXG4gKi9cbmZ1bmN0aW9uIGNsaWVudHNDbGFpbSgpIHtcbiAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2FjdGl2YXRlJywgKCkgPT4gc2VsZi5jbGllbnRzLmNsYWltKCkpO1xufVxuZXhwb3J0IHsgY2xpZW50c0NsYWltIH07XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBAdHMtaWdub3JlXG50cnkge1xuICAgIHNlbGZbJ3dvcmtib3g6cHJlY2FjaGluZzo2LjUuMyddICYmIF8oKTtcbn1cbmNhdGNoIChlKSB7IH1cbiIsICIvKlxuICBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgeyBXb3JrYm94RXJyb3IgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvV29ya2JveEVycm9yLmpzJztcbmltcG9ydCAnLi4vX3ZlcnNpb24uanMnO1xuLy8gTmFtZSBvZiB0aGUgc2VhcmNoIHBhcmFtZXRlciB1c2VkIHRvIHN0b3JlIHJldmlzaW9uIGluZm8uXG5jb25zdCBSRVZJU0lPTl9TRUFSQ0hfUEFSQU0gPSAnX19XQl9SRVZJU0lPTl9fJztcbi8qKlxuICogQ29udmVydHMgYSBtYW5pZmVzdCBlbnRyeSBpbnRvIGEgdmVyc2lvbmVkIFVSTCBzdWl0YWJsZSBmb3IgcHJlY2FjaGluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxzdHJpbmd9IGVudHJ5XG4gKiBAcmV0dXJuIHtzdHJpbmd9IEEgVVJMIHdpdGggdmVyc2lvbmluZyBpbmZvLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbWVtYmVyb2Ygd29ya2JveC1wcmVjYWNoaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDYWNoZUtleShlbnRyeSkge1xuICAgIGlmICghZW50cnkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFdvcmtib3hFcnJvcignYWRkLXRvLWNhY2hlLWxpc3QtdW5leHBlY3RlZC10eXBlJywgeyBlbnRyeSB9KTtcbiAgICB9XG4gICAgLy8gSWYgYSBwcmVjYWNoZSBtYW5pZmVzdCBlbnRyeSBpcyBhIHN0cmluZywgaXQncyBhc3N1bWVkIHRvIGJlIGEgdmVyc2lvbmVkXG4gICAgLy8gVVJMLCBsaWtlICcvYXBwLmFiY2QxMjM0LmpzJy4gUmV0dXJuIGFzLWlzLlxuICAgIGlmICh0eXBlb2YgZW50cnkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IHVybE9iamVjdCA9IG5ldyBVUkwoZW50cnksIGxvY2F0aW9uLmhyZWYpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2FjaGVLZXk6IHVybE9iamVjdC5ocmVmLFxuICAgICAgICAgICAgdXJsOiB1cmxPYmplY3QuaHJlZixcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29uc3QgeyByZXZpc2lvbiwgdXJsIH0gPSBlbnRyeTtcbiAgICBpZiAoIXVybCkge1xuICAgICAgICB0aHJvdyBuZXcgV29ya2JveEVycm9yKCdhZGQtdG8tY2FjaGUtbGlzdC11bmV4cGVjdGVkLXR5cGUnLCB7IGVudHJ5IH0pO1xuICAgIH1cbiAgICAvLyBJZiB0aGVyZSdzIGp1c3QgYSBVUkwgYW5kIG5vIHJldmlzaW9uLCB0aGVuIGl0J3MgYWxzbyBhc3N1bWVkIHRvIGJlIGFcbiAgICAvLyB2ZXJzaW9uZWQgVVJMLlxuICAgIGlmICghcmV2aXNpb24pIHtcbiAgICAgICAgY29uc3QgdXJsT2JqZWN0ID0gbmV3IFVSTCh1cmwsIGxvY2F0aW9uLmhyZWYpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2FjaGVLZXk6IHVybE9iamVjdC5ocmVmLFxuICAgICAgICAgICAgdXJsOiB1cmxPYmplY3QuaHJlZixcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLy8gT3RoZXJ3aXNlLCBjb25zdHJ1Y3QgYSBwcm9wZXJseSB2ZXJzaW9uZWQgVVJMIHVzaW5nIHRoZSBjdXN0b20gV29ya2JveFxuICAgIC8vIHNlYXJjaCBwYXJhbWV0ZXIgYWxvbmcgd2l0aCB0aGUgcmV2aXNpb24gaW5mby5cbiAgICBjb25zdCBjYWNoZUtleVVSTCA9IG5ldyBVUkwodXJsLCBsb2NhdGlvbi5ocmVmKTtcbiAgICBjb25zdCBvcmlnaW5hbFVSTCA9IG5ldyBVUkwodXJsLCBsb2NhdGlvbi5ocmVmKTtcbiAgICBjYWNoZUtleVVSTC5zZWFyY2hQYXJhbXMuc2V0KFJFVklTSU9OX1NFQVJDSF9QQVJBTSwgcmV2aXNpb24pO1xuICAgIHJldHVybiB7XG4gICAgICAgIGNhY2hlS2V5OiBjYWNoZUtleVVSTC5ocmVmLFxuICAgICAgICB1cmw6IG9yaWdpbmFsVVJMLmhyZWYsXG4gICAgfTtcbn1cbiIsICIvKlxuICBDb3B5cmlnaHQgMjAyMCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbi8qKlxuICogQSBwbHVnaW4sIGRlc2lnbmVkIHRvIGJlIHVzZWQgd2l0aCBQcmVjYWNoZUNvbnRyb2xsZXIsIHRvIGRldGVybWluZSB0aGVcbiAqIG9mIGFzc2V0cyB0aGF0IHdlcmUgdXBkYXRlZCAob3Igbm90IHVwZGF0ZWQpIGR1cmluZyB0aGUgaW5zdGFsbCBldmVudC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5jbGFzcyBQcmVjYWNoZUluc3RhbGxSZXBvcnRQbHVnaW4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZWRVUkxzID0gW107XG4gICAgICAgIHRoaXMubm90VXBkYXRlZFVSTHMgPSBbXTtcbiAgICAgICAgdGhpcy5oYW5kbGVyV2lsbFN0YXJ0ID0gYXN5bmMgKHsgcmVxdWVzdCwgc3RhdGUsIH0pID0+IHtcbiAgICAgICAgICAgIC8vIFRPRE86IGBzdGF0ZWAgc2hvdWxkIG5ldmVyIGJlIHVuZGVmaW5lZC4uLlxuICAgICAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgc3RhdGUub3JpZ2luYWxSZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jYWNoZWRSZXNwb25zZVdpbGxCZVVzZWQgPSBhc3luYyAoeyBldmVudCwgc3RhdGUsIGNhY2hlZFJlc3BvbnNlLCB9KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2luc3RhbGwnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlICYmXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLm9yaWdpbmFsUmVxdWVzdCAmJlxuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5vcmlnaW5hbFJlcXVlc3QgaW5zdGFuY2VvZiBSZXF1ZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGBzdGF0ZWAgc2hvdWxkIG5ldmVyIGJlIHVuZGVmaW5lZC4uLlxuICAgICAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBzdGF0ZS5vcmlnaW5hbFJlcXVlc3QudXJsO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FjaGVkUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90VXBkYXRlZFVSTHMucHVzaCh1cmwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVkVVJMcy5wdXNoKHVybCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkUmVzcG9uc2U7XG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0IHsgUHJlY2FjaGVJbnN0YWxsUmVwb3J0UGx1Z2luIH07XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMjAgR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0ICcuLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIEEgcGx1Z2luLCBkZXNpZ25lZCB0byBiZSB1c2VkIHdpdGggUHJlY2FjaGVDb250cm9sbGVyLCB0byB0cmFuc2xhdGUgVVJMcyBpbnRvXG4gKiB0aGUgY29ycmVzcG9uZGluZyBjYWNoZSBrZXksIGJhc2VkIG9uIHRoZSBjdXJyZW50IHJldmlzaW9uIGluZm8uXG4gKlxuICogQHByaXZhdGVcbiAqL1xuY2xhc3MgUHJlY2FjaGVDYWNoZUtleVBsdWdpbiB7XG4gICAgY29uc3RydWN0b3IoeyBwcmVjYWNoZUNvbnRyb2xsZXIgfSkge1xuICAgICAgICB0aGlzLmNhY2hlS2V5V2lsbEJlVXNlZCA9IGFzeW5jICh7IHJlcXVlc3QsIHBhcmFtcywgfSkgPT4ge1xuICAgICAgICAgICAgLy8gUGFyYW1zIGlzIHR5cGUgYW55LCBjYW4ndCBjaGFuZ2UgcmlnaHQgbm93LlxuICAgICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgICAgICAgICAgIGNvbnN0IGNhY2hlS2V5ID0gKHBhcmFtcyA9PT0gbnVsbCB8fCBwYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhcmFtcy5jYWNoZUtleSkgfHxcbiAgICAgICAgICAgICAgICB0aGlzLl9wcmVjYWNoZUNvbnRyb2xsZXIuZ2V0Q2FjaGVLZXlGb3JVUkwocmVxdWVzdC51cmwpO1xuICAgICAgICAgICAgLyogZXNsaW50LWVuYWJsZSAqL1xuICAgICAgICAgICAgcmV0dXJuIGNhY2hlS2V5XG4gICAgICAgICAgICAgICAgPyBuZXcgUmVxdWVzdChjYWNoZUtleSwgeyBoZWFkZXJzOiByZXF1ZXN0LmhlYWRlcnMgfSlcbiAgICAgICAgICAgICAgICA6IHJlcXVlc3Q7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3ByZWNhY2hlQ29udHJvbGxlciA9IHByZWNhY2hlQ29udHJvbGxlcjtcbiAgICB9XG59XG5leHBvcnQgeyBQcmVjYWNoZUNhY2hlS2V5UGx1Z2luIH07XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBAdHMtaWdub3JlXG50cnkge1xuICAgIHNlbGZbJ3dvcmtib3g6c3RyYXRlZ2llczo2LjUuMyddICYmIF8oKTtcbn1cbmNhdGNoIChlKSB7IH1cbiIsICIvKlxuICBDb3B5cmlnaHQgMjAyMCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvYXNzZXJ0LmpzJztcbmltcG9ydCB7IGNhY2hlTWF0Y2hJZ25vcmVQYXJhbXMgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvY2FjaGVNYXRjaElnbm9yZVBhcmFtcy5qcyc7XG5pbXBvcnQgeyBEZWZlcnJlZCB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9EZWZlcnJlZC5qcyc7XG5pbXBvcnQgeyBleGVjdXRlUXVvdGFFcnJvckNhbGxiYWNrcyB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9leGVjdXRlUXVvdGFFcnJvckNhbGxiYWNrcy5qcyc7XG5pbXBvcnQgeyBnZXRGcmllbmRseVVSTCB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9nZXRGcmllbmRseVVSTC5qcyc7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvbG9nZ2VyLmpzJztcbmltcG9ydCB7IHRpbWVvdXQgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvdGltZW91dC5qcyc7XG5pbXBvcnQgeyBXb3JrYm94RXJyb3IgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvV29ya2JveEVycm9yLmpzJztcbmltcG9ydCAnLi9fdmVyc2lvbi5qcyc7XG5mdW5jdGlvbiB0b1JlcXVlc3QoaW5wdXQpIHtcbiAgICByZXR1cm4gdHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJyA/IG5ldyBSZXF1ZXN0KGlucHV0KSA6IGlucHV0O1xufVxuLyoqXG4gKiBBIGNsYXNzIGNyZWF0ZWQgZXZlcnkgdGltZSBhIFN0cmF0ZWd5IGluc3RhbmNlIGluc3RhbmNlIGNhbGxzXG4gKiB7QGxpbmsgd29ya2JveC1zdHJhdGVnaWVzLlN0cmF0ZWd5fmhhbmRsZX0gb3JcbiAqIHtAbGluayB3b3JrYm94LXN0cmF0ZWdpZXMuU3RyYXRlZ3l+aGFuZGxlQWxsfSB0aGF0IHdyYXBzIGFsbCBmZXRjaCBhbmRcbiAqIGNhY2hlIGFjdGlvbnMgYXJvdW5kIHBsdWdpbiBjYWxsYmFja3MgYW5kIGtlZXBzIHRyYWNrIG9mIHdoZW4gdGhlIHN0cmF0ZWd5XG4gKiBpcyBcImRvbmVcIiAoaS5lLiBhbGwgYWRkZWQgYGV2ZW50LndhaXRVbnRpbCgpYCBwcm9taXNlcyBoYXZlIHJlc29sdmVkKS5cbiAqXG4gKiBAbWVtYmVyb2Ygd29ya2JveC1zdHJhdGVnaWVzXG4gKi9cbmNsYXNzIFN0cmF0ZWd5SGFuZGxlciB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBhc3NvY2lhdGVkIHdpdGggdGhlIHBhc3NlZCBzdHJhdGVneSBhbmQgZXZlbnRcbiAgICAgKiB0aGF0J3MgaGFuZGxpbmcgdGhlIHJlcXVlc3QuXG4gICAgICpcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgYWxzbyBpbml0aWFsaXplcyB0aGUgc3RhdGUgdGhhdCB3aWxsIGJlIHBhc3NlZCB0byBlYWNoIG9mXG4gICAgICogdGhlIHBsdWdpbnMgaGFuZGxpbmcgdGhpcyByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHt3b3JrYm94LXN0cmF0ZWdpZXMuU3RyYXRlZ3l9IHN0cmF0ZWd5XG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge1JlcXVlc3R8c3RyaW5nfSBvcHRpb25zLnJlcXVlc3QgQSByZXF1ZXN0IHRvIHJ1biB0aGlzIHN0cmF0ZWd5IGZvci5cbiAgICAgKiBAcGFyYW0ge0V4dGVuZGFibGVFdmVudH0gb3B0aW9ucy5ldmVudCBUaGUgZXZlbnQgYXNzb2NpYXRlZCB3aXRoIHRoZVxuICAgICAqICAgICByZXF1ZXN0LlxuICAgICAqIEBwYXJhbSB7VVJMfSBbb3B0aW9ucy51cmxdXG4gICAgICogQHBhcmFtIHsqfSBbb3B0aW9ucy5wYXJhbXNdIFRoZSByZXR1cm4gdmFsdWUgZnJvbSB0aGVcbiAgICAgKiAgICAge0BsaW5rIHdvcmtib3gtcm91dGluZ35tYXRjaENhbGxiYWNrfSAoaWYgYXBwbGljYWJsZSkuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Ioc3RyYXRlZ3ksIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fY2FjaGVLZXlzID0ge307XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgcmVxdWVzdCB0aGUgc3RyYXRlZ3kgaXMgcGVyZm9ybWluZyAocGFzc2VkIHRvIHRoZSBzdHJhdGVneSdzXG4gICAgICAgICAqIGBoYW5kbGUoKWAgb3IgYGhhbmRsZUFsbCgpYCBtZXRob2QpLlxuICAgICAgICAgKiBAbmFtZSByZXF1ZXN0XG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKiBAdHlwZSB7UmVxdWVzdH1cbiAgICAgICAgICogQG1lbWJlcm9mIHdvcmtib3gtc3RyYXRlZ2llcy5TdHJhdGVneUhhbmRsZXJcbiAgICAgICAgICovXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZXZlbnQgYXNzb2NpYXRlZCB3aXRoIHRoaXMgcmVxdWVzdC5cbiAgICAgICAgICogQG5hbWUgZXZlbnRcbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqIEB0eXBlIHtFeHRlbmRhYmxlRXZlbnR9XG4gICAgICAgICAqIEBtZW1iZXJvZiB3b3JrYm94LXN0cmF0ZWdpZXMuU3RyYXRlZ3lIYW5kbGVyXG4gICAgICAgICAqL1xuICAgICAgICAvKipcbiAgICAgICAgICogQSBgVVJMYCBpbnN0YW5jZSBvZiBgcmVxdWVzdC51cmxgIChpZiBwYXNzZWQgdG8gdGhlIHN0cmF0ZWd5J3NcbiAgICAgICAgICogYGhhbmRsZSgpYCBvciBgaGFuZGxlQWxsKClgIG1ldGhvZCkuXG4gICAgICAgICAqIE5vdGU6IHRoZSBgdXJsYCBwYXJhbSB3aWxsIGJlIHByZXNlbnQgaWYgdGhlIHN0cmF0ZWd5IHdhcyBpbnZva2VkXG4gICAgICAgICAqIGZyb20gYSB3b3JrYm94IGBSb3V0ZWAgb2JqZWN0LlxuICAgICAgICAgKiBAbmFtZSB1cmxcbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqIEB0eXBlIHtVUkx8dW5kZWZpbmVkfVxuICAgICAgICAgKiBAbWVtYmVyb2Ygd29ya2JveC1zdHJhdGVnaWVzLlN0cmF0ZWd5SGFuZGxlclxuICAgICAgICAgKi9cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgYHBhcmFtYCB2YWx1ZSAoaWYgcGFzc2VkIHRvIHRoZSBzdHJhdGVneSdzXG4gICAgICAgICAqIGBoYW5kbGUoKWAgb3IgYGhhbmRsZUFsbCgpYCBtZXRob2QpLlxuICAgICAgICAgKiBOb3RlOiB0aGUgYHBhcmFtYCBwYXJhbSB3aWxsIGJlIHByZXNlbnQgaWYgdGhlIHN0cmF0ZWd5IHdhcyBpbnZva2VkXG4gICAgICAgICAqIGZyb20gYSB3b3JrYm94IGBSb3V0ZWAgb2JqZWN0IGFuZCB0aGVcbiAgICAgICAgICoge0BsaW5rIHdvcmtib3gtcm91dGluZ35tYXRjaENhbGxiYWNrfSByZXR1cm5lZFxuICAgICAgICAgKiBhIHRydXRoeSB2YWx1ZSAoaXQgd2lsbCBiZSB0aGF0IHZhbHVlKS5cbiAgICAgICAgICogQG5hbWUgcGFyYW1zXG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKiBAdHlwZSB7Knx1bmRlZmluZWR9XG4gICAgICAgICAqIEBtZW1iZXJvZiB3b3JrYm94LXN0cmF0ZWdpZXMuU3RyYXRlZ3lIYW5kbGVyXG4gICAgICAgICAqL1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgYXNzZXJ0LmlzSW5zdGFuY2Uob3B0aW9ucy5ldmVudCwgRXh0ZW5kYWJsZUV2ZW50LCB7XG4gICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtc3RyYXRlZ2llcycsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnU3RyYXRlZ3lIYW5kbGVyJyxcbiAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ2NvbnN0cnVjdG9yJyxcbiAgICAgICAgICAgICAgICBwYXJhbU5hbWU6ICdvcHRpb25zLmV2ZW50JyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuZXZlbnQgPSBvcHRpb25zLmV2ZW50O1xuICAgICAgICB0aGlzLl9zdHJhdGVneSA9IHN0cmF0ZWd5O1xuICAgICAgICB0aGlzLl9oYW5kbGVyRGVmZXJyZWQgPSBuZXcgRGVmZXJyZWQoKTtcbiAgICAgICAgdGhpcy5fZXh0ZW5kTGlmZXRpbWVQcm9taXNlcyA9IFtdO1xuICAgICAgICAvLyBDb3B5IHRoZSBwbHVnaW5zIGxpc3QgKHNpbmNlIGl0J3MgbXV0YWJsZSBvbiB0aGUgc3RyYXRlZ3kpLFxuICAgICAgICAvLyBzbyBhbnkgbXV0YXRpb25zIGRvbid0IGFmZmVjdCB0aGlzIGhhbmRsZXIgaW5zdGFuY2UuXG4gICAgICAgIHRoaXMuX3BsdWdpbnMgPSBbLi4uc3RyYXRlZ3kucGx1Z2luc107XG4gICAgICAgIHRoaXMuX3BsdWdpblN0YXRlTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBmb3IgKGNvbnN0IHBsdWdpbiBvZiB0aGlzLl9wbHVnaW5zKSB7XG4gICAgICAgICAgICB0aGlzLl9wbHVnaW5TdGF0ZU1hcC5zZXQocGx1Z2luLCB7fSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ldmVudC53YWl0VW50aWwodGhpcy5faGFuZGxlckRlZmVycmVkLnByb21pc2UpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGZXRjaGVzIGEgZ2l2ZW4gcmVxdWVzdCAoYW5kIGludm9rZXMgYW55IGFwcGxpY2FibGUgcGx1Z2luIGNhbGxiYWNrXG4gICAgICogbWV0aG9kcykgdXNpbmcgdGhlIGBmZXRjaE9wdGlvbnNgIChmb3Igbm9uLW5hdmlnYXRpb24gcmVxdWVzdHMpIGFuZFxuICAgICAqIGBwbHVnaW5zYCBkZWZpbmVkIG9uIHRoZSBgU3RyYXRlZ3lgIG9iamVjdC5cbiAgICAgKlxuICAgICAqIFRoZSBmb2xsb3dpbmcgcGx1Z2luIGxpZmVjeWNsZSBtZXRob2RzIGFyZSBpbnZva2VkIHdoZW4gdXNpbmcgdGhpcyBtZXRob2Q6XG4gICAgICogLSBgcmVxdWVzdFdpbGxGZXRjaCgpYFxuICAgICAqIC0gYGZldGNoRGlkU3VjY2VlZCgpYFxuICAgICAqIC0gYGZldGNoRGlkRmFpbCgpYFxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0fHN0cmluZ30gaW5wdXQgVGhlIFVSTCBvciByZXF1ZXN0IHRvIGZldGNoLlxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8UmVzcG9uc2U+fVxuICAgICAqL1xuICAgIGFzeW5jIGZldGNoKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHsgZXZlbnQgfSA9IHRoaXM7XG4gICAgICAgIGxldCByZXF1ZXN0ID0gdG9SZXF1ZXN0KGlucHV0KTtcbiAgICAgICAgaWYgKHJlcXVlc3QubW9kZSA9PT0gJ25hdmlnYXRlJyAmJlxuICAgICAgICAgICAgZXZlbnQgaW5zdGFuY2VvZiBGZXRjaEV2ZW50ICYmXG4gICAgICAgICAgICBldmVudC5wcmVsb2FkUmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnN0IHBvc3NpYmxlUHJlbG9hZFJlc3BvbnNlID0gKGF3YWl0IGV2ZW50LnByZWxvYWRSZXNwb25zZSk7XG4gICAgICAgICAgICBpZiAocG9zc2libGVQcmVsb2FkUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBVc2luZyBhIHByZWxvYWRlZCBuYXZpZ2F0aW9uIHJlc3BvbnNlIGZvciBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGAnJHtnZXRGcmllbmRseVVSTChyZXF1ZXN0LnVybCl9J2ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zc2libGVQcmVsb2FkUmVzcG9uc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSBmZXRjaERpZEZhaWwgcGx1Z2luLCB3ZSBuZWVkIHRvIHNhdmUgYSBjbG9uZSBvZiB0aGVcbiAgICAgICAgLy8gb3JpZ2luYWwgcmVxdWVzdCBiZWZvcmUgaXQncyBlaXRoZXIgbW9kaWZpZWQgYnkgYSByZXF1ZXN0V2lsbEZldGNoXG4gICAgICAgIC8vIHBsdWdpbiBvciBiZWZvcmUgdGhlIG9yaWdpbmFsIHJlcXVlc3QncyBib2R5IGlzIGNvbnN1bWVkIHZpYSBmZXRjaCgpLlxuICAgICAgICBjb25zdCBvcmlnaW5hbFJlcXVlc3QgPSB0aGlzLmhhc0NhbGxiYWNrKCdmZXRjaERpZEZhaWwnKVxuICAgICAgICAgICAgPyByZXF1ZXN0LmNsb25lKClcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgY2Igb2YgdGhpcy5pdGVyYXRlQ2FsbGJhY2tzKCdyZXF1ZXN0V2lsbEZldGNoJykpIHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0ID0gYXdhaXQgY2IoeyByZXF1ZXN0OiByZXF1ZXN0LmNsb25lKCksIGV2ZW50IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBXb3JrYm94RXJyb3IoJ3BsdWdpbi1lcnJvci1yZXF1ZXN0LXdpbGwtZmV0Y2gnLCB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93bkVycm9yTWVzc2FnZTogZXJyLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhlIHJlcXVlc3QgY2FuIGJlIGFsdGVyZWQgYnkgcGx1Z2lucyB3aXRoIGByZXF1ZXN0V2lsbEZldGNoYCBtYWtpbmdcbiAgICAgICAgLy8gdGhlIG9yaWdpbmFsIHJlcXVlc3QgKG1vc3QgbGlrZWx5IGZyb20gYSBgZmV0Y2hgIGV2ZW50KSBkaWZmZXJlbnRcbiAgICAgICAgLy8gZnJvbSB0aGUgUmVxdWVzdCB3ZSBtYWtlLiBQYXNzIGJvdGggdG8gYGZldGNoRGlkRmFpbGAgdG8gYWlkIGRlYnVnZ2luZy5cbiAgICAgICAgY29uc3QgcGx1Z2luRmlsdGVyZWRSZXF1ZXN0ID0gcmVxdWVzdC5jbG9uZSgpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGZldGNoUmVzcG9uc2U7XG4gICAgICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZS93b3JrYm94L2lzc3Vlcy8xNzk2XG4gICAgICAgICAgICBmZXRjaFJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocmVxdWVzdCwgcmVxdWVzdC5tb2RlID09PSAnbmF2aWdhdGUnID8gdW5kZWZpbmVkIDogdGhpcy5fc3RyYXRlZ3kuZmV0Y2hPcHRpb25zKTtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGBOZXR3b3JrIHJlcXVlc3QgZm9yIGAgK1xuICAgICAgICAgICAgICAgICAgICBgJyR7Z2V0RnJpZW5kbHlVUkwocmVxdWVzdC51cmwpfScgcmV0dXJuZWQgYSByZXNwb25zZSB3aXRoIGAgK1xuICAgICAgICAgICAgICAgICAgICBgc3RhdHVzICcke2ZldGNoUmVzcG9uc2Uuc3RhdHVzfScuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNhbGxiYWNrIG9mIHRoaXMuaXRlcmF0ZUNhbGxiYWNrcygnZmV0Y2hEaWRTdWNjZWVkJykpIHtcbiAgICAgICAgICAgICAgICBmZXRjaFJlc3BvbnNlID0gYXdhaXQgY2FsbGJhY2soe1xuICAgICAgICAgICAgICAgICAgICBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdDogcGx1Z2luRmlsdGVyZWRSZXF1ZXN0LFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZTogZmV0Y2hSZXNwb25zZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmZXRjaFJlc3BvbnNlO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBOZXR3b3JrIHJlcXVlc3QgZm9yIGAgK1xuICAgICAgICAgICAgICAgICAgICBgJyR7Z2V0RnJpZW5kbHlVUkwocmVxdWVzdC51cmwpfScgdGhyZXcgYW4gZXJyb3IuYCwgZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gYG9yaWdpbmFsUmVxdWVzdGAgd2lsbCBvbmx5IGV4aXN0IGlmIGEgYGZldGNoRGlkRmFpbGAgY2FsbGJhY2tcbiAgICAgICAgICAgIC8vIGlzIGJlaW5nIHVzZWQgKHNlZSBhYm92ZSkuXG4gICAgICAgICAgICBpZiAob3JpZ2luYWxSZXF1ZXN0KSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5ydW5DYWxsYmFja3MoJ2ZldGNoRGlkRmFpbCcsIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yLFxuICAgICAgICAgICAgICAgICAgICBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxSZXF1ZXN0OiBvcmlnaW5hbFJlcXVlc3QuY2xvbmUoKSxcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdDogcGx1Z2luRmlsdGVyZWRSZXF1ZXN0LmNsb25lKCksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxscyBgdGhpcy5mZXRjaCgpYCBhbmQgKGluIHRoZSBiYWNrZ3JvdW5kKSBydW5zIGB0aGlzLmNhY2hlUHV0KClgIG9uXG4gICAgICogdGhlIHJlc3BvbnNlIGdlbmVyYXRlZCBieSBgdGhpcy5mZXRjaCgpYC5cbiAgICAgKlxuICAgICAqIFRoZSBjYWxsIHRvIGB0aGlzLmNhY2hlUHV0KClgIGF1dG9tYXRpY2FsbHkgaW52b2tlcyBgdGhpcy53YWl0VW50aWwoKWAsXG4gICAgICogc28geW91IGRvIG5vdCBoYXZlIHRvIG1hbnVhbGx5IGNhbGwgYHdhaXRVbnRpbCgpYCBvbiB0aGUgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlcXVlc3R8c3RyaW5nfSBpbnB1dCBUaGUgcmVxdWVzdCBvciBVUkwgdG8gZmV0Y2ggYW5kIGNhY2hlLlxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8UmVzcG9uc2U+fVxuICAgICAqL1xuICAgIGFzeW5jIGZldGNoQW5kQ2FjaGVQdXQoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmZldGNoKGlucHV0KTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2VDbG9uZSA9IHJlc3BvbnNlLmNsb25lKCk7XG4gICAgICAgIHZvaWQgdGhpcy53YWl0VW50aWwodGhpcy5jYWNoZVB1dChpbnB1dCwgcmVzcG9uc2VDbG9uZSkpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hdGNoZXMgYSByZXF1ZXN0IGZyb20gdGhlIGNhY2hlIChhbmQgaW52b2tlcyBhbnkgYXBwbGljYWJsZSBwbHVnaW5cbiAgICAgKiBjYWxsYmFjayBtZXRob2RzKSB1c2luZyB0aGUgYGNhY2hlTmFtZWAsIGBtYXRjaE9wdGlvbnNgLCBhbmQgYHBsdWdpbnNgXG4gICAgICogZGVmaW5lZCBvbiB0aGUgc3RyYXRlZ3kgb2JqZWN0LlxuICAgICAqXG4gICAgICogVGhlIGZvbGxvd2luZyBwbHVnaW4gbGlmZWN5Y2xlIG1ldGhvZHMgYXJlIGludm9rZWQgd2hlbiB1c2luZyB0aGlzIG1ldGhvZDpcbiAgICAgKiAtIGNhY2hlS2V5V2lsbEJ5VXNlZCgpXG4gICAgICogLSBjYWNoZWRSZXNwb25zZVdpbGxCeVVzZWQoKVxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0fHN0cmluZ30ga2V5IFRoZSBSZXF1ZXN0IG9yIFVSTCB0byB1c2UgYXMgdGhlIGNhY2hlIGtleS5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPFJlc3BvbnNlfHVuZGVmaW5lZD59IEEgbWF0Y2hpbmcgcmVzcG9uc2UsIGlmIGZvdW5kLlxuICAgICAqL1xuICAgIGFzeW5jIGNhY2hlTWF0Y2goa2V5KSB7XG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSB0b1JlcXVlc3Qoa2V5KTtcbiAgICAgICAgbGV0IGNhY2hlZFJlc3BvbnNlO1xuICAgICAgICBjb25zdCB7IGNhY2hlTmFtZSwgbWF0Y2hPcHRpb25zIH0gPSB0aGlzLl9zdHJhdGVneTtcbiAgICAgICAgY29uc3QgZWZmZWN0aXZlUmVxdWVzdCA9IGF3YWl0IHRoaXMuZ2V0Q2FjaGVLZXkocmVxdWVzdCwgJ3JlYWQnKTtcbiAgICAgICAgY29uc3QgbXVsdGlNYXRjaE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1hdGNoT3B0aW9ucyksIHsgY2FjaGVOYW1lIH0pO1xuICAgICAgICBjYWNoZWRSZXNwb25zZSA9IGF3YWl0IGNhY2hlcy5tYXRjaChlZmZlY3RpdmVSZXF1ZXN0LCBtdWx0aU1hdGNoT3B0aW9ucyk7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBpZiAoY2FjaGVkUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoYEZvdW5kIGEgY2FjaGVkIHJlc3BvbnNlIGluICcke2NhY2hlTmFtZX0nLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGBObyBjYWNoZWQgcmVzcG9uc2UgZm91bmQgaW4gJyR7Y2FjaGVOYW1lfScuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiB0aGlzLml0ZXJhdGVDYWxsYmFja3MoJ2NhY2hlZFJlc3BvbnNlV2lsbEJlVXNlZCcpKSB7XG4gICAgICAgICAgICBjYWNoZWRSZXNwb25zZSA9XG4gICAgICAgICAgICAgICAgKGF3YWl0IGNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgY2FjaGVOYW1lLFxuICAgICAgICAgICAgICAgICAgICBtYXRjaE9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIGNhY2hlZFJlc3BvbnNlLFxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0OiBlZmZlY3RpdmVSZXF1ZXN0LFxuICAgICAgICAgICAgICAgICAgICBldmVudDogdGhpcy5ldmVudCxcbiAgICAgICAgICAgICAgICB9KSkgfHwgdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYWNoZWRSZXNwb25zZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHV0cyBhIHJlcXVlc3QvcmVzcG9uc2UgcGFpciBpbiB0aGUgY2FjaGUgKGFuZCBpbnZva2VzIGFueSBhcHBsaWNhYmxlXG4gICAgICogcGx1Z2luIGNhbGxiYWNrIG1ldGhvZHMpIHVzaW5nIHRoZSBgY2FjaGVOYW1lYCBhbmQgYHBsdWdpbnNgIGRlZmluZWQgb25cbiAgICAgKiB0aGUgc3RyYXRlZ3kgb2JqZWN0LlxuICAgICAqXG4gICAgICogVGhlIGZvbGxvd2luZyBwbHVnaW4gbGlmZWN5Y2xlIG1ldGhvZHMgYXJlIGludm9rZWQgd2hlbiB1c2luZyB0aGlzIG1ldGhvZDpcbiAgICAgKiAtIGNhY2hlS2V5V2lsbEJ5VXNlZCgpXG4gICAgICogLSBjYWNoZVdpbGxVcGRhdGUoKVxuICAgICAqIC0gY2FjaGVEaWRVcGRhdGUoKVxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0fHN0cmluZ30ga2V5IFRoZSByZXF1ZXN0IG9yIFVSTCB0byB1c2UgYXMgdGhlIGNhY2hlIGtleS5cbiAgICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNwb25zZSBUaGUgcmVzcG9uc2UgdG8gY2FjaGUuXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxib29sZWFuPn0gYGZhbHNlYCBpZiBhIGNhY2hlV2lsbFVwZGF0ZSBjYXVzZWQgdGhlIHJlc3BvbnNlXG4gICAgICogbm90IGJlIGNhY2hlZCwgYW5kIGB0cnVlYCBvdGhlcndpc2UuXG4gICAgICovXG4gICAgYXN5bmMgY2FjaGVQdXQoa2V5LCByZXNwb25zZSkge1xuICAgICAgICBjb25zdCByZXF1ZXN0ID0gdG9SZXF1ZXN0KGtleSk7XG4gICAgICAgIC8vIFJ1biBpbiB0aGUgbmV4dCB0YXNrIHRvIGF2b2lkIGJsb2NraW5nIG90aGVyIGNhY2hlIHJlYWRzLlxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdzNjL1NlcnZpY2VXb3JrZXIvaXNzdWVzLzEzOTdcbiAgICAgICAgYXdhaXQgdGltZW91dCgwKTtcbiAgICAgICAgY29uc3QgZWZmZWN0aXZlUmVxdWVzdCA9IGF3YWl0IHRoaXMuZ2V0Q2FjaGVLZXkocmVxdWVzdCwgJ3dyaXRlJyk7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBpZiAoZWZmZWN0aXZlUmVxdWVzdC5tZXRob2QgJiYgZWZmZWN0aXZlUmVxdWVzdC5tZXRob2QgIT09ICdHRVQnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFdvcmtib3hFcnJvcignYXR0ZW1wdC10by1jYWNoZS1ub24tZ2V0LXJlcXVlc3QnLCB7XG4gICAgICAgICAgICAgICAgICAgIHVybDogZ2V0RnJpZW5kbHlVUkwoZWZmZWN0aXZlUmVxdWVzdC51cmwpLFxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IGVmZmVjdGl2ZVJlcXVlc3QubWV0aG9kLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvd29ya2JveC9pc3N1ZXMvMjgxOFxuICAgICAgICAgICAgY29uc3QgdmFyeSA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdWYXJ5Jyk7XG4gICAgICAgICAgICBpZiAodmFyeSkge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgVGhlIHJlc3BvbnNlIGZvciAke2dldEZyaWVuZGx5VVJMKGVmZmVjdGl2ZVJlcXVlc3QudXJsKX0gYCArXG4gICAgICAgICAgICAgICAgICAgIGBoYXMgYSAnVmFyeTogJHt2YXJ5fScgaGVhZGVyLiBgICtcbiAgICAgICAgICAgICAgICAgICAgYENvbnNpZGVyIHNldHRpbmcgdGhlIHtpZ25vcmVWYXJ5OiB0cnVlfSBvcHRpb24gb24geW91ciBzdHJhdGVneSBgICtcbiAgICAgICAgICAgICAgICAgICAgYHRvIGVuc3VyZSBjYWNoZSBtYXRjaGluZyBhbmQgZGVsZXRpb24gd29ya3MgYXMgZXhwZWN0ZWQuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyZXNwb25zZSkge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoYENhbm5vdCBjYWNoZSBub24tZXhpc3RlbnQgcmVzcG9uc2UgZm9yIGAgK1xuICAgICAgICAgICAgICAgICAgICBgJyR7Z2V0RnJpZW5kbHlVUkwoZWZmZWN0aXZlUmVxdWVzdC51cmwpfScuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBuZXcgV29ya2JveEVycm9yKCdjYWNoZS1wdXQtd2l0aC1uby1yZXNwb25zZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6IGdldEZyaWVuZGx5VVJMKGVmZmVjdGl2ZVJlcXVlc3QudXJsKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlVG9DYWNoZSA9IGF3YWl0IHRoaXMuX2Vuc3VyZVJlc3BvbnNlU2FmZVRvQ2FjaGUocmVzcG9uc2UpO1xuICAgICAgICBpZiAoIXJlc3BvbnNlVG9DYWNoZSkge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoYFJlc3BvbnNlICcke2dldEZyaWVuZGx5VVJMKGVmZmVjdGl2ZVJlcXVlc3QudXJsKX0nIGAgK1xuICAgICAgICAgICAgICAgICAgICBgd2lsbCBub3QgYmUgY2FjaGVkLmAsIHJlc3BvbnNlVG9DYWNoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBjYWNoZU5hbWUsIG1hdGNoT3B0aW9ucyB9ID0gdGhpcy5fc3RyYXRlZ3k7XG4gICAgICAgIGNvbnN0IGNhY2hlID0gYXdhaXQgc2VsZi5jYWNoZXMub3BlbihjYWNoZU5hbWUpO1xuICAgICAgICBjb25zdCBoYXNDYWNoZVVwZGF0ZUNhbGxiYWNrID0gdGhpcy5oYXNDYWxsYmFjaygnY2FjaGVEaWRVcGRhdGUnKTtcbiAgICAgICAgY29uc3Qgb2xkUmVzcG9uc2UgPSBoYXNDYWNoZVVwZGF0ZUNhbGxiYWNrXG4gICAgICAgICAgICA/IGF3YWl0IGNhY2hlTWF0Y2hJZ25vcmVQYXJhbXMoXG4gICAgICAgICAgICAvLyBUT0RPKHBoaWxpcHdhbHRvbik6IHRoZSBgX19XQl9SRVZJU0lPTl9fYCBwYXJhbSBpcyBhIHByZWNhY2hpbmdcbiAgICAgICAgICAgIC8vIGZlYXR1cmUuIENvbnNpZGVyIGludG8gd2F5cyB0byBvbmx5IGFkZCB0aGlzIGJlaGF2aW9yIGlmIHVzaW5nXG4gICAgICAgICAgICAvLyBwcmVjYWNoaW5nLlxuICAgICAgICAgICAgY2FjaGUsIGVmZmVjdGl2ZVJlcXVlc3QuY2xvbmUoKSwgWydfX1dCX1JFVklTSU9OX18nXSwgbWF0Y2hPcHRpb25zKVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGBVcGRhdGluZyB0aGUgJyR7Y2FjaGVOYW1lfScgY2FjaGUgd2l0aCBhIG5ldyBSZXNwb25zZSBgICtcbiAgICAgICAgICAgICAgICBgZm9yICR7Z2V0RnJpZW5kbHlVUkwoZWZmZWN0aXZlUmVxdWVzdC51cmwpfS5gKTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgY2FjaGUucHV0KGVmZmVjdGl2ZVJlcXVlc3QsIGhhc0NhY2hlVXBkYXRlQ2FsbGJhY2sgPyByZXNwb25zZVRvQ2FjaGUuY2xvbmUoKSA6IHJlc3BvbnNlVG9DYWNoZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgIC8vIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRE9NRXhjZXB0aW9uI2V4Y2VwdGlvbi1RdW90YUV4Y2VlZGVkRXJyb3JcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IubmFtZSA9PT0gJ1F1b3RhRXhjZWVkZWRFcnJvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZXhlY3V0ZVF1b3RhRXJyb3JDYWxsYmFja3MoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiB0aGlzLml0ZXJhdGVDYWxsYmFja3MoJ2NhY2hlRGlkVXBkYXRlJykpIHtcbiAgICAgICAgICAgIGF3YWl0IGNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICBjYWNoZU5hbWUsXG4gICAgICAgICAgICAgICAgb2xkUmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgbmV3UmVzcG9uc2U6IHJlc3BvbnNlVG9DYWNoZS5jbG9uZSgpLFxuICAgICAgICAgICAgICAgIHJlcXVlc3Q6IGVmZmVjdGl2ZVJlcXVlc3QsXG4gICAgICAgICAgICAgICAgZXZlbnQ6IHRoaXMuZXZlbnQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHRoZSBsaXN0IG9mIHBsdWdpbnMgZm9yIHRoZSBgY2FjaGVLZXlXaWxsQmVVc2VkYCBjYWxsYmFjaywgYW5kXG4gICAgICogZXhlY3V0ZXMgYW55IG9mIHRob3NlIGNhbGxiYWNrcyBmb3VuZCBpbiBzZXF1ZW5jZS4gVGhlIGZpbmFsIGBSZXF1ZXN0YFxuICAgICAqIG9iamVjdCByZXR1cm5lZCBieSB0aGUgbGFzdCBwbHVnaW4gaXMgdHJlYXRlZCBhcyB0aGUgY2FjaGUga2V5IGZvciBjYWNoZVxuICAgICAqIHJlYWRzIGFuZC9vciB3cml0ZXMuIElmIG5vIGBjYWNoZUtleVdpbGxCZVVzZWRgIHBsdWdpbiBjYWxsYmFja3MgaGF2ZVxuICAgICAqIGJlZW4gcmVnaXN0ZXJlZCwgdGhlIHBhc3NlZCByZXF1ZXN0IGlzIHJldHVybmVkIHVubW9kaWZpZWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVxdWVzdH0gcmVxdWVzdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxSZXF1ZXN0Pn1cbiAgICAgKi9cbiAgICBhc3luYyBnZXRDYWNoZUtleShyZXF1ZXN0LCBtb2RlKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGAke3JlcXVlc3QudXJsfSB8ICR7bW9kZX1gO1xuICAgICAgICBpZiAoIXRoaXMuX2NhY2hlS2V5c1trZXldKSB7XG4gICAgICAgICAgICBsZXQgZWZmZWN0aXZlUmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNhbGxiYWNrIG9mIHRoaXMuaXRlcmF0ZUNhbGxiYWNrcygnY2FjaGVLZXlXaWxsQmVVc2VkJykpIHtcbiAgICAgICAgICAgICAgICBlZmZlY3RpdmVSZXF1ZXN0ID0gdG9SZXF1ZXN0KGF3YWl0IGNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgbW9kZSxcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdDogZWZmZWN0aXZlUmVxdWVzdCxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IHRoaXMuZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIC8vIHBhcmFtcyBoYXMgYSB0eXBlIGFueSBjYW4ndCBjaGFuZ2UgcmlnaHQgbm93LlxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHRoaXMucGFyYW1zLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fY2FjaGVLZXlzW2tleV0gPSBlZmZlY3RpdmVSZXF1ZXN0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZUtleXNba2V5XTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBzdHJhdGVneSBoYXMgYXQgbGVhc3Qgb25lIHBsdWdpbiB3aXRoIHRoZSBnaXZlblxuICAgICAqIGNhbGxiYWNrLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGNhbGxiYWNrIHRvIGNoZWNrIGZvci5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuICAgIGhhc0NhbGxiYWNrKG5hbWUpIHtcbiAgICAgICAgZm9yIChjb25zdCBwbHVnaW4gb2YgdGhpcy5fc3RyYXRlZ3kucGx1Z2lucykge1xuICAgICAgICAgICAgaWYgKG5hbWUgaW4gcGx1Z2luKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSdW5zIGFsbCBwbHVnaW4gY2FsbGJhY2tzIG1hdGNoaW5nIHRoZSBnaXZlbiBuYW1lLCBpbiBvcmRlciwgcGFzc2luZyB0aGVcbiAgICAgKiBnaXZlbiBwYXJhbSBvYmplY3QgKG1lcmdlZCBpdGggdGhlIGN1cnJlbnQgcGx1Z2luIHN0YXRlKSBhcyB0aGUgb25seVxuICAgICAqIGFyZ3VtZW50LlxuICAgICAqXG4gICAgICogTm90ZTogc2luY2UgdGhpcyBtZXRob2QgcnVucyBhbGwgcGx1Z2lucywgaXQncyBub3Qgc3VpdGFibGUgZm9yIGNhc2VzXG4gICAgICogd2hlcmUgdGhlIHJldHVybiB2YWx1ZSBvZiBhIGNhbGxiYWNrIG5lZWRzIHRvIGJlIGFwcGxpZWQgcHJpb3IgdG8gY2FsbGluZ1xuICAgICAqIHRoZSBuZXh0IGNhbGxiYWNrLiBTZWVcbiAgICAgKiB7QGxpbmsgd29ya2JveC1zdHJhdGVnaWVzLlN0cmF0ZWd5SGFuZGxlciNpdGVyYXRlQ2FsbGJhY2tzfVxuICAgICAqIGJlbG93IGZvciBob3cgdG8gaGFuZGxlIHRoYXQgY2FzZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBjYWxsYmFjayB0byBydW4gd2l0aGluIGVhY2ggcGx1Z2luLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbSBUaGUgb2JqZWN0IHRvIHBhc3MgYXMgdGhlIGZpcnN0IChhbmQgb25seSkgcGFyYW1cbiAgICAgKiAgICAgd2hlbiBleGVjdXRpbmcgZWFjaCBjYWxsYmFjay4gVGhpcyBvYmplY3Qgd2lsbCBiZSBtZXJnZWQgd2l0aCB0aGVcbiAgICAgKiAgICAgY3VycmVudCBwbHVnaW4gc3RhdGUgcHJpb3IgdG8gY2FsbGJhY2sgZXhlY3V0aW9uLlxuICAgICAqL1xuICAgIGFzeW5jIHJ1bkNhbGxiYWNrcyhuYW1lLCBwYXJhbSkge1xuICAgICAgICBmb3IgKGNvbnN0IGNhbGxiYWNrIG9mIHRoaXMuaXRlcmF0ZUNhbGxiYWNrcyhuYW1lKSkge1xuICAgICAgICAgICAgLy8gVE9ETyhwaGlsaXB3YWx0b24pOiBub3Qgc3VyZSB3aHkgYGFueWAgaXMgbmVlZGVkLiBJdCBzZWVtcyBsaWtlXG4gICAgICAgICAgICAvLyB0aGlzIHNob3VsZCB3b3JrIHdpdGggYGFzIFdvcmtib3hQbHVnaW5DYWxsYmFja1BhcmFtW0NdYC5cbiAgICAgICAgICAgIGF3YWl0IGNhbGxiYWNrKHBhcmFtKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBY2NlcHRzIGEgY2FsbGJhY2sgYW5kIHJldHVybnMgYW4gaXRlcmFibGUgb2YgbWF0Y2hpbmcgcGx1Z2luIGNhbGxiYWNrcyxcbiAgICAgKiB3aGVyZSBlYWNoIGNhbGxiYWNrIGlzIHdyYXBwZWQgd2l0aCB0aGUgY3VycmVudCBoYW5kbGVyIHN0YXRlIChpLmUuIHdoZW5cbiAgICAgKiB5b3UgY2FsbCBlYWNoIGNhbGxiYWNrLCB3aGF0ZXZlciBvYmplY3QgcGFyYW1ldGVyIHlvdSBwYXNzIGl0IHdpbGxcbiAgICAgKiBiZSBtZXJnZWQgd2l0aCB0aGUgcGx1Z2luJ3MgY3VycmVudCBzdGF0ZSkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBmbyB0aGUgY2FsbGJhY2sgdG8gcnVuXG4gICAgICogQHJldHVybiB7QXJyYXk8RnVuY3Rpb24+fVxuICAgICAqL1xuICAgICppdGVyYXRlQ2FsbGJhY2tzKG5hbWUpIHtcbiAgICAgICAgZm9yIChjb25zdCBwbHVnaW4gb2YgdGhpcy5fc3RyYXRlZ3kucGx1Z2lucykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwbHVnaW5bbmFtZV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuX3BsdWdpblN0YXRlTWFwLmdldChwbHVnaW4pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXRlZnVsQ2FsbGJhY2sgPSAocGFyYW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhdGVmdWxQYXJhbSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgcGFyYW0pLCB7IHN0YXRlIH0pO1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPKHBoaWxpcHdhbHRvbik6IG5vdCBzdXJlIHdoeSBgYW55YCBpcyBuZWVkZWQuIEl0IHNlZW1zIGxpa2VcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBzaG91bGQgd29yayB3aXRoIGBhcyBXb3JrYm94UGx1Z2luQ2FsbGJhY2tQYXJhbVtDXWAuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwbHVnaW5bbmFtZV0oc3RhdGVmdWxQYXJhbSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB5aWVsZCBzdGF0ZWZ1bENhbGxiYWNrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBwcm9taXNlIHRvIHRoZVxuICAgICAqIFtleHRlbmQgbGlmZXRpbWUgcHJvbWlzZXNde0BsaW5rIGh0dHBzOi8vdzNjLmdpdGh1Yi5pby9TZXJ2aWNlV29ya2VyLyNleHRlbmRhYmxlZXZlbnQtZXh0ZW5kLWxpZmV0aW1lLXByb21pc2VzfVxuICAgICAqIG9mIHRoZSBldmVudCBldmVudCBhc3NvY2lhdGVkIHdpdGggdGhlIHJlcXVlc3QgYmVpbmcgaGFuZGxlZCAodXN1YWxseSBhXG4gICAgICogYEZldGNoRXZlbnRgKS5cbiAgICAgKlxuICAgICAqIE5vdGU6IHlvdSBjYW4gYXdhaXRcbiAgICAgKiB7QGxpbmsgd29ya2JveC1zdHJhdGVnaWVzLlN0cmF0ZWd5SGFuZGxlcn5kb25lV2FpdGluZ31cbiAgICAgKiB0byBrbm93IHdoZW4gYWxsIGFkZGVkIHByb21pc2VzIGhhdmUgc2V0dGxlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UHJvbWlzZX0gcHJvbWlzZSBBIHByb21pc2UgdG8gYWRkIHRvIHRoZSBleHRlbmQgbGlmZXRpbWUgcHJvbWlzZXNcbiAgICAgKiAgICAgb2YgdGhlIGV2ZW50IHRoYXQgdHJpZ2dlcmVkIHRoZSByZXF1ZXN0LlxuICAgICAqL1xuICAgIHdhaXRVbnRpbChwcm9taXNlKSB7XG4gICAgICAgIHRoaXMuX2V4dGVuZExpZmV0aW1lUHJvbWlzZXMucHVzaChwcm9taXNlKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgb25jZSBhbGwgcHJvbWlzZXMgcGFzc2VkIHRvXG4gICAgICoge0BsaW5rIHdvcmtib3gtc3RyYXRlZ2llcy5TdHJhdGVneUhhbmRsZXJ+d2FpdFVudGlsfVxuICAgICAqIGhhdmUgc2V0dGxlZC5cbiAgICAgKlxuICAgICAqIE5vdGU6IGFueSB3b3JrIGRvbmUgYWZ0ZXIgYGRvbmVXYWl0aW5nKClgIHNldHRsZXMgc2hvdWxkIGJlIG1hbnVhbGx5XG4gICAgICogcGFzc2VkIHRvIGFuIGV2ZW50J3MgYHdhaXRVbnRpbCgpYCBtZXRob2QgKG5vdCB0aGlzIGhhbmRsZXInc1xuICAgICAqIGB3YWl0VW50aWwoKWAgbWV0aG9kKSwgb3RoZXJ3aXNlIHRoZSBzZXJ2aWNlIHdvcmtlciB0aHJlYWQgbXkgYmUga2lsbGVkXG4gICAgICogcHJpb3IgdG8geW91ciB3b3JrIGNvbXBsZXRpbmcuXG4gICAgICovXG4gICAgYXN5bmMgZG9uZVdhaXRpbmcoKSB7XG4gICAgICAgIGxldCBwcm9taXNlO1xuICAgICAgICB3aGlsZSAoKHByb21pc2UgPSB0aGlzLl9leHRlbmRMaWZldGltZVByb21pc2VzLnNoaWZ0KCkpKSB7XG4gICAgICAgICAgICBhd2FpdCBwcm9taXNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0b3BzIHJ1bm5pbmcgdGhlIHN0cmF0ZWd5IGFuZCBpbW1lZGlhdGVseSByZXNvbHZlcyBhbnkgcGVuZGluZ1xuICAgICAqIGB3YWl0VW50aWwoKWAgcHJvbWlzZXMuXG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5faGFuZGxlckRlZmVycmVkLnJlc29sdmUobnVsbCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIHdpbGwgY2FsbCBjYWNoZVdpbGxVcGRhdGUgb24gdGhlIGF2YWlsYWJsZSBwbHVnaW5zIChvciB1c2VcbiAgICAgKiBzdGF0dXMgPT09IDIwMCkgdG8gZGV0ZXJtaW5lIGlmIHRoZSBSZXNwb25zZSBpcyBzYWZlIGFuZCB2YWxpZCB0byBjYWNoZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVxdWVzdH0gb3B0aW9ucy5yZXF1ZXN0XG4gICAgICogQHBhcmFtIHtSZXNwb25zZX0gb3B0aW9ucy5yZXNwb25zZVxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8UmVzcG9uc2V8dW5kZWZpbmVkPn1cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgYXN5bmMgX2Vuc3VyZVJlc3BvbnNlU2FmZVRvQ2FjaGUocmVzcG9uc2UpIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlVG9DYWNoZSA9IHJlc3BvbnNlO1xuICAgICAgICBsZXQgcGx1Z2luc1VzZWQgPSBmYWxzZTtcbiAgICAgICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiB0aGlzLml0ZXJhdGVDYWxsYmFja3MoJ2NhY2hlV2lsbFVwZGF0ZScpKSB7XG4gICAgICAgICAgICByZXNwb25zZVRvQ2FjaGUgPVxuICAgICAgICAgICAgICAgIChhd2FpdCBjYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3Q6IHRoaXMucmVxdWVzdCxcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlVG9DYWNoZSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IHRoaXMuZXZlbnQsXG4gICAgICAgICAgICAgICAgfSkpIHx8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHBsdWdpbnNVc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2VUb0NhY2hlKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFwbHVnaW5zVXNlZCkge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlVG9DYWNoZSAmJiByZXNwb25zZVRvQ2FjaGUuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZVRvQ2FjaGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZVRvQ2FjaGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlVG9DYWNoZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlVG9DYWNoZS5zdGF0dXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIud2FybihgVGhlIHJlc3BvbnNlIGZvciAnJHt0aGlzLnJlcXVlc3QudXJsfScgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBpcyBhbiBvcGFxdWUgcmVzcG9uc2UuIFRoZSBjYWNoaW5nIHN0cmF0ZWd5IHRoYXQgeW91J3JlIGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgdXNpbmcgd2lsbCBub3QgY2FjaGUgb3BhcXVlIHJlc3BvbnNlcyBieSBkZWZhdWx0LmApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGBUaGUgcmVzcG9uc2UgZm9yICcke3RoaXMucmVxdWVzdC51cmx9JyBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYHJldHVybmVkIGEgc3RhdHVzIGNvZGUgb2YgJyR7cmVzcG9uc2Uuc3RhdHVzfScgYW5kIHdvbid0IGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgYmUgY2FjaGVkIGFzIGEgcmVzdWx0LmApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZVRvQ2FjaGU7XG4gICAgfVxufVxuZXhwb3J0IHsgU3RyYXRlZ3lIYW5kbGVyIH07XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMjAgR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgY2FjaGVOYW1lcyB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9jYWNoZU5hbWVzLmpzJztcbmltcG9ydCB7IFdvcmtib3hFcnJvciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9Xb3JrYm94RXJyb3IuanMnO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2xvZ2dlci5qcyc7XG5pbXBvcnQgeyBnZXRGcmllbmRseVVSTCB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9nZXRGcmllbmRseVVSTC5qcyc7XG5pbXBvcnQgeyBTdHJhdGVneUhhbmRsZXIgfSBmcm9tICcuL1N0cmF0ZWd5SGFuZGxlci5qcyc7XG5pbXBvcnQgJy4vX3ZlcnNpb24uanMnO1xuLyoqXG4gKiBBbiBhYnN0cmFjdCBiYXNlIGNsYXNzIHRoYXQgYWxsIG90aGVyIHN0cmF0ZWd5IGNsYXNzZXMgbXVzdCBleHRlbmQgZnJvbTpcbiAqXG4gKiBAbWVtYmVyb2Ygd29ya2JveC1zdHJhdGVnaWVzXG4gKi9cbmNsYXNzIFN0cmF0ZWd5IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBzdHJhdGVneSBhbmQgc2V0cyBhbGwgZG9jdW1lbnRlZCBvcHRpb25cbiAgICAgKiBwcm9wZXJ0aWVzIGFzIHB1YmxpYyBpbnN0YW5jZSBwcm9wZXJ0aWVzLlxuICAgICAqXG4gICAgICogTm90ZTogaWYgYSBjdXN0b20gc3RyYXRlZ3kgY2xhc3MgZXh0ZW5kcyB0aGUgYmFzZSBTdHJhdGVneSBjbGFzcyBhbmQgZG9lc1xuICAgICAqIG5vdCBuZWVkIG1vcmUgdGhhbiB0aGVzZSBwcm9wZXJ0aWVzLCBpdCBkb2VzIG5vdCBuZWVkIHRvIGRlZmluZSBpdHMgb3duXG4gICAgICogY29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmNhY2hlTmFtZV0gQ2FjaGUgbmFtZSB0byBzdG9yZSBhbmQgcmV0cmlldmVcbiAgICAgKiByZXF1ZXN0cy4gRGVmYXVsdHMgdG8gdGhlIGNhY2hlIG5hbWVzIHByb3ZpZGVkIGJ5XG4gICAgICoge0BsaW5rIHdvcmtib3gtY29yZS5jYWNoZU5hbWVzfS5cbiAgICAgKiBAcGFyYW0ge0FycmF5PE9iamVjdD59IFtvcHRpb25zLnBsdWdpbnNdIFtQbHVnaW5zXXtAbGluayBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS93ZWIvdG9vbHMvd29ya2JveC9ndWlkZXMvdXNpbmctcGx1Z2luc31cbiAgICAgKiB0byB1c2UgaW4gY29uanVuY3Rpb24gd2l0aCB0aGlzIGNhY2hpbmcgc3RyYXRlZ3kuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLmZldGNoT3B0aW9uc10gVmFsdWVzIHBhc3NlZCBhbG9uZyB0byB0aGVcbiAgICAgKiBbYGluaXRgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2luZG93T3JXb3JrZXJHbG9iYWxTY29wZS9mZXRjaCNQYXJhbWV0ZXJzKVxuICAgICAqIG9mIFtub24tbmF2aWdhdGlvbl0oaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZS93b3JrYm94L2lzc3Vlcy8xNzk2KVxuICAgICAqIGBmZXRjaCgpYCByZXF1ZXN0cyBtYWRlIGJ5IHRoaXMgc3RyYXRlZ3kuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLm1hdGNoT3B0aW9uc10gVGhlXG4gICAgICogW2BDYWNoZVF1ZXJ5T3B0aW9uc2Bde0BsaW5rIGh0dHBzOi8vdzNjLmdpdGh1Yi5pby9TZXJ2aWNlV29ya2VyLyNkaWN0ZGVmLWNhY2hlcXVlcnlvcHRpb25zfVxuICAgICAqIGZvciBhbnkgYGNhY2hlLm1hdGNoKClgIG9yIGBjYWNoZS5wdXQoKWAgY2FsbHMgbWFkZSBieSB0aGlzIHN0cmF0ZWd5LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ2FjaGUgbmFtZSB0byBzdG9yZSBhbmQgcmV0cmlldmVcbiAgICAgICAgICogcmVxdWVzdHMuIERlZmF1bHRzIHRvIHRoZSBjYWNoZSBuYW1lcyBwcm92aWRlZCBieVxuICAgICAgICAgKiB7QGxpbmsgd29ya2JveC1jb3JlLmNhY2hlTmFtZXN9LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jYWNoZU5hbWUgPSBjYWNoZU5hbWVzLmdldFJ1bnRpbWVOYW1lKG9wdGlvbnMuY2FjaGVOYW1lKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBsaXN0XG4gICAgICAgICAqIFtQbHVnaW5zXXtAbGluayBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS93ZWIvdG9vbHMvd29ya2JveC9ndWlkZXMvdXNpbmctcGx1Z2luc31cbiAgICAgICAgICogdXNlZCBieSB0aGlzIHN0cmF0ZWd5LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7QXJyYXk8T2JqZWN0Pn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucGx1Z2lucyA9IG9wdGlvbnMucGx1Z2lucyB8fCBbXTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZhbHVlcyBwYXNzZWQgYWxvbmcgdG8gdGhlXG4gICAgICAgICAqIFtgaW5pdGBde0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XaW5kb3dPcldvcmtlckdsb2JhbFNjb3BlL2ZldGNoI1BhcmFtZXRlcnN9XG4gICAgICAgICAqIG9mIGFsbCBmZXRjaCgpIHJlcXVlc3RzIG1hZGUgYnkgdGhpcyBzdHJhdGVneS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZmV0Y2hPcHRpb25zID0gb3B0aW9ucy5mZXRjaE9wdGlvbnM7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGVcbiAgICAgICAgICogW2BDYWNoZVF1ZXJ5T3B0aW9uc2Bde0BsaW5rIGh0dHBzOi8vdzNjLmdpdGh1Yi5pby9TZXJ2aWNlV29ya2VyLyNkaWN0ZGVmLWNhY2hlcXVlcnlvcHRpb25zfVxuICAgICAgICAgKiBmb3IgYW55IGBjYWNoZS5tYXRjaCgpYCBvciBgY2FjaGUucHV0KClgIGNhbGxzIG1hZGUgYnkgdGhpcyBzdHJhdGVneS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubWF0Y2hPcHRpb25zID0gb3B0aW9ucy5tYXRjaE9wdGlvbnM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYSByZXF1ZXN0IHN0cmF0ZWd5IGFuZCByZXR1cm5zIGEgYFByb21pc2VgIHRoYXQgd2lsbCByZXNvbHZlIHdpdGhcbiAgICAgKiBhIGBSZXNwb25zZWAsIGludm9raW5nIGFsbCByZWxldmFudCBwbHVnaW4gY2FsbGJhY2tzLlxuICAgICAqXG4gICAgICogV2hlbiBhIHN0cmF0ZWd5IGluc3RhbmNlIGlzIHJlZ2lzdGVyZWQgd2l0aCBhIFdvcmtib3hcbiAgICAgKiB7QGxpbmsgd29ya2JveC1yb3V0aW5nLlJvdXRlfSwgdGhpcyBtZXRob2QgaXMgYXV0b21hdGljYWxseVxuICAgICAqIGNhbGxlZCB3aGVuIHRoZSByb3V0ZSBtYXRjaGVzLlxuICAgICAqXG4gICAgICogQWx0ZXJuYXRpdmVseSwgdGhpcyBtZXRob2QgY2FuIGJlIHVzZWQgaW4gYSBzdGFuZGFsb25lIGBGZXRjaEV2ZW50YFxuICAgICAqIGxpc3RlbmVyIGJ5IHBhc3NpbmcgaXQgdG8gYGV2ZW50LnJlc3BvbmRXaXRoKClgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtGZXRjaEV2ZW50fE9iamVjdH0gb3B0aW9ucyBBIGBGZXRjaEV2ZW50YCBvciBhbiBvYmplY3Qgd2l0aCB0aGVcbiAgICAgKiAgICAgcHJvcGVydGllcyBsaXN0ZWQgYmVsb3cuXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0fHN0cmluZ30gb3B0aW9ucy5yZXF1ZXN0IEEgcmVxdWVzdCB0byBydW4gdGhpcyBzdHJhdGVneSBmb3IuXG4gICAgICogQHBhcmFtIHtFeHRlbmRhYmxlRXZlbnR9IG9wdGlvbnMuZXZlbnQgVGhlIGV2ZW50IGFzc29jaWF0ZWQgd2l0aCB0aGVcbiAgICAgKiAgICAgcmVxdWVzdC5cbiAgICAgKiBAcGFyYW0ge1VSTH0gW29wdGlvbnMudXJsXVxuICAgICAqIEBwYXJhbSB7Kn0gW29wdGlvbnMucGFyYW1zXVxuICAgICAqL1xuICAgIGhhbmRsZShvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IFtyZXNwb25zZURvbmVdID0gdGhpcy5oYW5kbGVBbGwob3B0aW9ucyk7XG4gICAgICAgIHJldHVybiByZXNwb25zZURvbmU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNpbWlsYXIgdG8ge0BsaW5rIHdvcmtib3gtc3RyYXRlZ2llcy5TdHJhdGVneX5oYW5kbGV9LCBidXRcbiAgICAgKiBpbnN0ZWFkIG9mIGp1c3QgcmV0dXJuaW5nIGEgYFByb21pc2VgIHRoYXQgcmVzb2x2ZXMgdG8gYSBgUmVzcG9uc2VgIGl0XG4gICAgICogaXQgd2lsbCByZXR1cm4gYW4gdHVwbGUgb2YgYFtyZXNwb25zZSwgZG9uZV1gIHByb21pc2VzLCB3aGVyZSB0aGUgZm9ybWVyXG4gICAgICogKGByZXNwb25zZWApIGlzIGVxdWl2YWxlbnQgdG8gd2hhdCBgaGFuZGxlKClgIHJldHVybnMsIGFuZCB0aGUgbGF0dGVyIGlzIGFcbiAgICAgKiBQcm9taXNlIHRoYXQgd2lsbCByZXNvbHZlIG9uY2UgYW55IHByb21pc2VzIHRoYXQgd2VyZSBhZGRlZCB0b1xuICAgICAqIGBldmVudC53YWl0VW50aWwoKWAgYXMgcGFydCBvZiBwZXJmb3JtaW5nIHRoZSBzdHJhdGVneSBoYXZlIGNvbXBsZXRlZC5cbiAgICAgKlxuICAgICAqIFlvdSBjYW4gYXdhaXQgdGhlIGBkb25lYCBwcm9taXNlIHRvIGVuc3VyZSBhbnkgZXh0cmEgd29yayBwZXJmb3JtZWQgYnlcbiAgICAgKiB0aGUgc3RyYXRlZ3kgKHVzdWFsbHkgY2FjaGluZyByZXNwb25zZXMpIGNvbXBsZXRlcyBzdWNjZXNzZnVsbHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0ZldGNoRXZlbnR8T2JqZWN0fSBvcHRpb25zIEEgYEZldGNoRXZlbnRgIG9yIGFuIG9iamVjdCB3aXRoIHRoZVxuICAgICAqICAgICBwcm9wZXJ0aWVzIGxpc3RlZCBiZWxvdy5cbiAgICAgKiBAcGFyYW0ge1JlcXVlc3R8c3RyaW5nfSBvcHRpb25zLnJlcXVlc3QgQSByZXF1ZXN0IHRvIHJ1biB0aGlzIHN0cmF0ZWd5IGZvci5cbiAgICAgKiBAcGFyYW0ge0V4dGVuZGFibGVFdmVudH0gb3B0aW9ucy5ldmVudCBUaGUgZXZlbnQgYXNzb2NpYXRlZCB3aXRoIHRoZVxuICAgICAqICAgICByZXF1ZXN0LlxuICAgICAqIEBwYXJhbSB7VVJMfSBbb3B0aW9ucy51cmxdXG4gICAgICogQHBhcmFtIHsqfSBbb3B0aW9ucy5wYXJhbXNdXG4gICAgICogQHJldHVybiB7QXJyYXk8UHJvbWlzZT59IEEgdHVwbGUgb2YgW3Jlc3BvbnNlLCBkb25lXVxuICAgICAqICAgICBwcm9taXNlcyB0aGF0IGNhbiBiZSB1c2VkIHRvIGRldGVybWluZSB3aGVuIHRoZSByZXNwb25zZSByZXNvbHZlcyBhc1xuICAgICAqICAgICB3ZWxsIGFzIHdoZW4gdGhlIGhhbmRsZXIgaGFzIGNvbXBsZXRlZCBhbGwgaXRzIHdvcmsuXG4gICAgICovXG4gICAgaGFuZGxlQWxsKG9wdGlvbnMpIHtcbiAgICAgICAgLy8gQWxsb3cgZm9yIGZsZXhpYmxlIG9wdGlvbnMgdG8gYmUgcGFzc2VkLlxuICAgICAgICBpZiAob3B0aW9ucyBpbnN0YW5jZW9mIEZldGNoRXZlbnQpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgZXZlbnQ6IG9wdGlvbnMsXG4gICAgICAgICAgICAgICAgcmVxdWVzdDogb3B0aW9ucy5yZXF1ZXN0LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBldmVudCA9IG9wdGlvbnMuZXZlbnQ7XG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSB0eXBlb2Ygb3B0aW9ucy5yZXF1ZXN0ID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgPyBuZXcgUmVxdWVzdChvcHRpb25zLnJlcXVlc3QpXG4gICAgICAgICAgICA6IG9wdGlvbnMucmVxdWVzdDtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gJ3BhcmFtcycgaW4gb3B0aW9ucyA/IG9wdGlvbnMucGFyYW1zIDogdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gbmV3IFN0cmF0ZWd5SGFuZGxlcih0aGlzLCB7IGV2ZW50LCByZXF1ZXN0LCBwYXJhbXMgfSk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlRG9uZSA9IHRoaXMuX2dldFJlc3BvbnNlKGhhbmRsZXIsIHJlcXVlc3QsIGV2ZW50KTtcbiAgICAgICAgY29uc3QgaGFuZGxlckRvbmUgPSB0aGlzLl9hd2FpdENvbXBsZXRlKHJlc3BvbnNlRG9uZSwgaGFuZGxlciwgcmVxdWVzdCwgZXZlbnQpO1xuICAgICAgICAvLyBSZXR1cm4gYW4gYXJyYXkgb2YgcHJvbWlzZXMsIHN1aXRhYmxlIGZvciB1c2Ugd2l0aCBQcm9taXNlLmFsbCgpLlxuICAgICAgICByZXR1cm4gW3Jlc3BvbnNlRG9uZSwgaGFuZGxlckRvbmVdO1xuICAgIH1cbiAgICBhc3luYyBfZ2V0UmVzcG9uc2UoaGFuZGxlciwgcmVxdWVzdCwgZXZlbnQpIHtcbiAgICAgICAgYXdhaXQgaGFuZGxlci5ydW5DYWxsYmFja3MoJ2hhbmRsZXJXaWxsU3RhcnQnLCB7IGV2ZW50LCByZXF1ZXN0IH0pO1xuICAgICAgICBsZXQgcmVzcG9uc2UgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2hhbmRsZShyZXF1ZXN0LCBoYW5kbGVyKTtcbiAgICAgICAgICAgIC8vIFRoZSBcIm9mZmljaWFsXCIgU3RyYXRlZ3kgc3ViY2xhc3NlcyBhbGwgdGhyb3cgdGhpcyBlcnJvciBhdXRvbWF0aWNhbGx5LFxuICAgICAgICAgICAgLy8gYnV0IGluIGNhc2UgYSB0aGlyZC1wYXJ0eSBTdHJhdGVneSBkb2Vzbid0LCBlbnN1cmUgdGhhdCB3ZSBoYXZlIGFcbiAgICAgICAgICAgIC8vIGNvbnNpc3RlbnQgZmFpbHVyZSB3aGVuIHRoZXJlJ3Mgbm8gcmVzcG9uc2Ugb3IgYW4gZXJyb3IgcmVzcG9uc2UuXG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnR5cGUgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgV29ya2JveEVycm9yKCduby1yZXNwb25zZScsIHsgdXJsOiByZXF1ZXN0LnVybCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiBoYW5kbGVyLml0ZXJhdGVDYWxsYmFja3MoJ2hhbmRsZXJEaWRFcnJvcicpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gYXdhaXQgY2FsbGJhY2soeyBlcnJvciwgZXZlbnQsIHJlcXVlc3QgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgV2hpbGUgcmVzcG9uZGluZyB0byAnJHtnZXRGcmllbmRseVVSTChyZXF1ZXN0LnVybCl9JywgYCArXG4gICAgICAgICAgICAgICAgICAgIGBhbiAke2Vycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci50b1N0cmluZygpIDogJyd9IGVycm9yIG9jY3VycmVkLiBVc2luZyBhIGZhbGxiYWNrIHJlc3BvbnNlIHByb3ZpZGVkIGJ5IGAgK1xuICAgICAgICAgICAgICAgICAgICBgYSBoYW5kbGVyRGlkRXJyb3IgcGx1Z2luLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgaGFuZGxlci5pdGVyYXRlQ2FsbGJhY2tzKCdoYW5kbGVyV2lsbFJlc3BvbmQnKSkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCBjYWxsYmFjayh7IGV2ZW50LCByZXF1ZXN0LCByZXNwb25zZSB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuICAgIGFzeW5jIF9hd2FpdENvbXBsZXRlKHJlc3BvbnNlRG9uZSwgaGFuZGxlciwgcmVxdWVzdCwgZXZlbnQpIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlO1xuICAgICAgICBsZXQgZXJyb3I7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IGF3YWl0IHJlc3BvbnNlRG9uZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIElnbm9yZSBlcnJvcnMsIGFzIHJlc3BvbnNlIGVycm9ycyBzaG91bGQgYmUgY2F1Z2h0IHZpYSB0aGUgYHJlc3BvbnNlYFxuICAgICAgICAgICAgLy8gcHJvbWlzZSBhYm92ZS4gVGhlIGBkb25lYCBwcm9taXNlIHdpbGwgb25seSB0aHJvdyBmb3IgZXJyb3JzIGluXG4gICAgICAgICAgICAvLyBwcm9taXNlcyBwYXNzZWQgdG8gYGhhbmRsZXIud2FpdFVudGlsKClgLlxuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBoYW5kbGVyLnJ1bkNhbGxiYWNrcygnaGFuZGxlckRpZFJlc3BvbmQnLCB7XG4gICAgICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgICAgICAgICByZXNwb25zZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXdhaXQgaGFuZGxlci5kb25lV2FpdGluZygpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoICh3YWl0VW50aWxFcnJvcikge1xuICAgICAgICAgICAgaWYgKHdhaXRVbnRpbEVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICBlcnJvciA9IHdhaXRVbnRpbEVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGF3YWl0IGhhbmRsZXIucnVuQ2FsbGJhY2tzKCdoYW5kbGVyRGlkQ29tcGxldGUnLCB7XG4gICAgICAgICAgICBldmVudCxcbiAgICAgICAgICAgIHJlcXVlc3QsXG4gICAgICAgICAgICByZXNwb25zZSxcbiAgICAgICAgICAgIGVycm9yOiBlcnJvcixcbiAgICAgICAgfSk7XG4gICAgICAgIGhhbmRsZXIuZGVzdHJveSgpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IHsgU3RyYXRlZ3kgfTtcbi8qKlxuICogQ2xhc3NlcyBleHRlbmRpbmcgdGhlIGBTdHJhdGVneWAgYmFzZWQgY2xhc3Mgc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCxcbiAqIGFuZCBsZXZlcmFnZSB0aGUge0BsaW5rIHdvcmtib3gtc3RyYXRlZ2llcy5TdHJhdGVneUhhbmRsZXJ9XG4gKiBhcmcgdG8gcGVyZm9ybSBhbGwgZmV0Y2hpbmcgYW5kIGNhY2hlIGxvZ2ljLCB3aGljaCB3aWxsIGVuc3VyZSBhbGwgcmVsZXZhbnRcbiAqIGNhY2hlLCBjYWNoZSBvcHRpb25zLCBmZXRjaCBvcHRpb25zIGFuZCBwbHVnaW5zIGFyZSB1c2VkIChwZXIgdGhlIGN1cnJlbnRcbiAqIHN0cmF0ZWd5IGluc3RhbmNlKS5cbiAqXG4gKiBAbmFtZSBfaGFuZGxlXG4gKiBAaW5zdGFuY2VcbiAqIEBhYnN0cmFjdFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge1JlcXVlc3R9IHJlcXVlc3RcbiAqIEBwYXJhbSB7d29ya2JveC1zdHJhdGVnaWVzLlN0cmF0ZWd5SGFuZGxlcn0gaGFuZGxlclxuICogQHJldHVybiB7UHJvbWlzZTxSZXNwb25zZT59XG4gKlxuICogQG1lbWJlcm9mIHdvcmtib3gtc3RyYXRlZ2llcy5TdHJhdGVneVxuICovXG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMjAgR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgY29weVJlc3BvbnNlIH0gZnJvbSAnd29ya2JveC1jb3JlL2NvcHlSZXNwb25zZS5qcyc7XG5pbXBvcnQgeyBjYWNoZU5hbWVzIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2NhY2hlTmFtZXMuanMnO1xuaW1wb3J0IHsgZ2V0RnJpZW5kbHlVUkwgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvZ2V0RnJpZW5kbHlVUkwuanMnO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2xvZ2dlci5qcyc7XG5pbXBvcnQgeyBXb3JrYm94RXJyb3IgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvV29ya2JveEVycm9yLmpzJztcbmltcG9ydCB7IFN0cmF0ZWd5IH0gZnJvbSAnd29ya2JveC1zdHJhdGVnaWVzL1N0cmF0ZWd5LmpzJztcbmltcG9ydCAnLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIEEge0BsaW5rIHdvcmtib3gtc3RyYXRlZ2llcy5TdHJhdGVneX0gaW1wbGVtZW50YXRpb25cbiAqIHNwZWNpZmljYWxseSBkZXNpZ25lZCB0byB3b3JrIHdpdGhcbiAqIHtAbGluayB3b3JrYm94LXByZWNhY2hpbmcuUHJlY2FjaGVDb250cm9sbGVyfVxuICogdG8gYm90aCBjYWNoZSBhbmQgZmV0Y2ggcHJlY2FjaGVkIGFzc2V0cy5cbiAqXG4gKiBOb3RlOiBhbiBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzIGlzIGNyZWF0ZWQgYXV0b21hdGljYWxseSB3aGVuIGNyZWF0aW5nIGFcbiAqIGBQcmVjYWNoZUNvbnRyb2xsZXJgOyBpdCdzIGdlbmVyYWxseSBub3QgbmVjZXNzYXJ5IHRvIGNyZWF0ZSB0aGlzIHlvdXJzZWxmLlxuICpcbiAqIEBleHRlbmRzIHdvcmtib3gtc3RyYXRlZ2llcy5TdHJhdGVneVxuICogQG1lbWJlcm9mIHdvcmtib3gtcHJlY2FjaGluZ1xuICovXG5jbGFzcyBQcmVjYWNoZVN0cmF0ZWd5IGV4dGVuZHMgU3RyYXRlZ3kge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5jYWNoZU5hbWVdIENhY2hlIG5hbWUgdG8gc3RvcmUgYW5kIHJldHJpZXZlXG4gICAgICogcmVxdWVzdHMuIERlZmF1bHRzIHRvIHRoZSBjYWNoZSBuYW1lcyBwcm92aWRlZCBieVxuICAgICAqIHtAbGluayB3b3JrYm94LWNvcmUuY2FjaGVOYW1lc30uXG4gICAgICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSBbb3B0aW9ucy5wbHVnaW5zXSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vd2ViL3Rvb2xzL3dvcmtib3gvZ3VpZGVzL3VzaW5nLXBsdWdpbnN8UGx1Z2luc31cbiAgICAgKiB0byB1c2UgaW4gY29uanVuY3Rpb24gd2l0aCB0aGlzIGNhY2hpbmcgc3RyYXRlZ3kuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLmZldGNoT3B0aW9uc10gVmFsdWVzIHBhc3NlZCBhbG9uZyB0byB0aGVcbiAgICAgKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dpbmRvd09yV29ya2VyR2xvYmFsU2NvcGUvZmV0Y2gjUGFyYW1ldGVyc3xpbml0fVxuICAgICAqIG9mIGFsbCBmZXRjaCgpIHJlcXVlc3RzIG1hZGUgYnkgdGhpcyBzdHJhdGVneS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMubWF0Y2hPcHRpb25zXSBUaGVcbiAgICAgKiB7QGxpbmsgaHR0cHM6Ly93M2MuZ2l0aHViLmlvL1NlcnZpY2VXb3JrZXIvI2RpY3RkZWYtY2FjaGVxdWVyeW9wdGlvbnN8Q2FjaGVRdWVyeU9wdGlvbnN9XG4gICAgICogZm9yIGFueSBgY2FjaGUubWF0Y2goKWAgb3IgYGNhY2hlLnB1dCgpYCBjYWxscyBtYWRlIGJ5IHRoaXMgc3RyYXRlZ3kuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5mYWxsYmFja1RvTmV0d29yaz10cnVlXSBXaGV0aGVyIHRvIGF0dGVtcHQgdG9cbiAgICAgKiBnZXQgdGhlIHJlc3BvbnNlIGZyb20gdGhlIG5ldHdvcmsgaWYgdGhlcmUncyBhIHByZWNhY2hlIG1pc3MuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIG9wdGlvbnMuY2FjaGVOYW1lID0gY2FjaGVOYW1lcy5nZXRQcmVjYWNoZU5hbWUob3B0aW9ucy5jYWNoZU5hbWUpO1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fZmFsbGJhY2tUb05ldHdvcmsgPVxuICAgICAgICAgICAgb3B0aW9ucy5mYWxsYmFja1RvTmV0d29yayA9PT0gZmFsc2UgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgIC8vIFJlZGlyZWN0ZWQgcmVzcG9uc2VzIGNhbm5vdCBiZSB1c2VkIHRvIHNhdGlzZnkgYSBuYXZpZ2F0aW9uIHJlcXVlc3QsIHNvXG4gICAgICAgIC8vIGFueSByZWRpcmVjdGVkIHJlc3BvbnNlIG11c3QgYmUgXCJjb3BpZWRcIiByYXRoZXIgdGhhbiBjbG9uZWQsIHNvIHRoZSBuZXdcbiAgICAgICAgLy8gcmVzcG9uc2UgZG9lc24ndCBjb250YWluIHRoZSBgcmVkaXJlY3RlZGAgZmxhZy4gU2VlOlxuICAgICAgICAvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD02NjkzNjMmZGVzYz0yI2MxXG4gICAgICAgIHRoaXMucGx1Z2lucy5wdXNoKFByZWNhY2hlU3RyYXRlZ3kuY29weVJlZGlyZWN0ZWRDYWNoZWFibGVSZXNwb25zZXNQbHVnaW4pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7UmVxdWVzdHxzdHJpbmd9IHJlcXVlc3QgQSByZXF1ZXN0IHRvIHJ1biB0aGlzIHN0cmF0ZWd5IGZvci5cbiAgICAgKiBAcGFyYW0ge3dvcmtib3gtc3RyYXRlZ2llcy5TdHJhdGVneUhhbmRsZXJ9IGhhbmRsZXIgVGhlIGV2ZW50IHRoYXRcbiAgICAgKiAgICAgdHJpZ2dlcmVkIHRoZSByZXF1ZXN0LlxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8UmVzcG9uc2U+fVxuICAgICAqL1xuICAgIGFzeW5jIF9oYW5kbGUocmVxdWVzdCwgaGFuZGxlcikge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGhhbmRsZXIuY2FjaGVNYXRjaChyZXF1ZXN0KTtcbiAgICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhpcyBpcyBhbiBgaW5zdGFsbGAgZXZlbnQgZm9yIGFuIGVudHJ5IHRoYXQgaXNuJ3QgYWxyZWFkeSBjYWNoZWQsXG4gICAgICAgIC8vIHRoZW4gcG9wdWxhdGUgdGhlIGNhY2hlLlxuICAgICAgICBpZiAoaGFuZGxlci5ldmVudCAmJiBoYW5kbGVyLmV2ZW50LnR5cGUgPT09ICdpbnN0YWxsJykge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX2hhbmRsZUluc3RhbGwocmVxdWVzdCwgaGFuZGxlcik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gR2V0dGluZyBoZXJlIG1lYW5zIHNvbWV0aGluZyB3ZW50IHdyb25nLiBBbiBlbnRyeSB0aGF0IHNob3VsZCBoYXZlIGJlZW5cbiAgICAgICAgLy8gcHJlY2FjaGVkIHdhc24ndCBmb3VuZCBpbiB0aGUgY2FjaGUuXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9oYW5kbGVGZXRjaChyZXF1ZXN0LCBoYW5kbGVyKTtcbiAgICB9XG4gICAgYXN5bmMgX2hhbmRsZUZldGNoKHJlcXVlc3QsIGhhbmRsZXIpIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlO1xuICAgICAgICBjb25zdCBwYXJhbXMgPSAoaGFuZGxlci5wYXJhbXMgfHwge30pO1xuICAgICAgICAvLyBGYWxsIGJhY2sgdG8gdGhlIG5ldHdvcmsgaWYgd2UncmUgY29uZmlndXJlZCB0byBkbyBzby5cbiAgICAgICAgaWYgKHRoaXMuX2ZhbGxiYWNrVG9OZXR3b3JrKSB7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIGxvZ2dlci53YXJuKGBUaGUgcHJlY2FjaGVkIHJlc3BvbnNlIGZvciBgICtcbiAgICAgICAgICAgICAgICAgICAgYCR7Z2V0RnJpZW5kbHlVUkwocmVxdWVzdC51cmwpfSBpbiAke3RoaXMuY2FjaGVOYW1lfSB3YXMgbm90IGAgK1xuICAgICAgICAgICAgICAgICAgICBgZm91bmQuIEZhbGxpbmcgYmFjayB0byB0aGUgbmV0d29yay5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGludGVncml0eUluTWFuaWZlc3QgPSBwYXJhbXMuaW50ZWdyaXR5O1xuICAgICAgICAgICAgY29uc3QgaW50ZWdyaXR5SW5SZXF1ZXN0ID0gcmVxdWVzdC5pbnRlZ3JpdHk7XG4gICAgICAgICAgICBjb25zdCBub0ludGVncml0eUNvbmZsaWN0ID0gIWludGVncml0eUluUmVxdWVzdCB8fCBpbnRlZ3JpdHlJblJlcXVlc3QgPT09IGludGVncml0eUluTWFuaWZlc3Q7XG4gICAgICAgICAgICAvLyBEbyBub3QgYWRkIGludGVncml0eSBpZiB0aGUgb3JpZ2luYWwgcmVxdWVzdCBpcyBuby1jb3JzXG4gICAgICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZS93b3JrYm94L2lzc3Vlcy8zMDk2XG4gICAgICAgICAgICByZXNwb25zZSA9IGF3YWl0IGhhbmRsZXIuZmV0Y2gobmV3IFJlcXVlc3QocmVxdWVzdCwge1xuICAgICAgICAgICAgICAgIGludGVncml0eTogcmVxdWVzdC5tb2RlICE9PSAnbm8tY29ycydcbiAgICAgICAgICAgICAgICAgICAgPyBpbnRlZ3JpdHlJblJlcXVlc3QgfHwgaW50ZWdyaXR5SW5NYW5pZmVzdFxuICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIC8vIEl0J3Mgb25seSBcInNhZmVcIiB0byByZXBhaXIgdGhlIGNhY2hlIGlmIHdlJ3JlIHVzaW5nIFNSSSB0byBndWFyYW50ZWVcbiAgICAgICAgICAgIC8vIHRoYXQgdGhlIHJlc3BvbnNlIG1hdGNoZXMgdGhlIHByZWNhY2hlIG1hbmlmZXN0J3MgZXhwZWN0YXRpb25zLFxuICAgICAgICAgICAgLy8gYW5kIHRoZXJlJ3MgZWl0aGVyIGEpIG5vIGludGVncml0eSBwcm9wZXJ0eSBpbiB0aGUgaW5jb21pbmcgcmVxdWVzdFxuICAgICAgICAgICAgLy8gb3IgYikgdGhlcmUgaXMgYW4gaW50ZWdyaXR5LCBhbmQgaXQgbWF0Y2hlcyB0aGUgcHJlY2FjaGUgbWFuaWZlc3QuXG4gICAgICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZS93b3JrYm94L2lzc3Vlcy8yODU4XG4gICAgICAgICAgICAvLyBBbHNvIGlmIHRoZSBvcmlnaW5hbCByZXF1ZXN0IHVzZXJzIG5vLWNvcnMgd2UgZG9uJ3QgdXNlIGludGVncml0eS5cbiAgICAgICAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3dvcmtib3gvaXNzdWVzLzMwOTZcbiAgICAgICAgICAgIGlmIChpbnRlZ3JpdHlJbk1hbmlmZXN0ICYmXG4gICAgICAgICAgICAgICAgbm9JbnRlZ3JpdHlDb25mbGljdCAmJlxuICAgICAgICAgICAgICAgIHJlcXVlc3QubW9kZSAhPT0gJ25vLWNvcnMnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXNlRGVmYXVsdENhY2hlYWJpbGl0eVBsdWdpbklmTmVlZGVkKCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2FzQ2FjaGVkID0gYXdhaXQgaGFuZGxlci5jYWNoZVB1dChyZXF1ZXN0LCByZXNwb25zZS5jbG9uZSgpKTtcbiAgICAgICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAod2FzQ2FjaGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBBIHJlc3BvbnNlIGZvciAke2dldEZyaWVuZGx5VVJMKHJlcXVlc3QudXJsKX0gYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYHdhcyB1c2VkIHRvIFwicmVwYWlyXCIgdGhlIHByZWNhY2hlLmApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gVGhpcyBzaG91bGRuJ3Qgbm9ybWFsbHkgaGFwcGVuLCBidXQgdGhlcmUgYXJlIGVkZ2UgY2FzZXM6XG4gICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3dvcmtib3gvaXNzdWVzLzE0NDFcbiAgICAgICAgICAgIHRocm93IG5ldyBXb3JrYm94RXJyb3IoJ21pc3NpbmctcHJlY2FjaGUtZW50cnknLCB7XG4gICAgICAgICAgICAgICAgY2FjaGVOYW1lOiB0aGlzLmNhY2hlTmFtZSxcbiAgICAgICAgICAgICAgICB1cmw6IHJlcXVlc3QudXJsLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhY2hlS2V5ID0gcGFyYW1zLmNhY2hlS2V5IHx8IChhd2FpdCBoYW5kbGVyLmdldENhY2hlS2V5KHJlcXVlc3QsICdyZWFkJykpO1xuICAgICAgICAgICAgLy8gV29ya2JveCBpcyBnb2luZyB0byBoYW5kbGUgdGhlIHJvdXRlLlxuICAgICAgICAgICAgLy8gcHJpbnQgdGhlIHJvdXRpbmcgZGV0YWlscyB0byB0aGUgY29uc29sZS5cbiAgICAgICAgICAgIGxvZ2dlci5ncm91cENvbGxhcHNlZChgUHJlY2FjaGluZyBpcyByZXNwb25kaW5nIHRvOiBgICsgZ2V0RnJpZW5kbHlVUkwocmVxdWVzdC51cmwpKTtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coYFNlcnZpbmcgdGhlIHByZWNhY2hlZCB1cmw6ICR7Z2V0RnJpZW5kbHlVUkwoY2FjaGVLZXkgaW5zdGFuY2VvZiBSZXF1ZXN0ID8gY2FjaGVLZXkudXJsIDogY2FjaGVLZXkpfWApO1xuICAgICAgICAgICAgbG9nZ2VyLmdyb3VwQ29sbGFwc2VkKGBWaWV3IHJlcXVlc3QgZGV0YWlscyBoZXJlLmApO1xuICAgICAgICAgICAgbG9nZ2VyLmxvZyhyZXF1ZXN0KTtcbiAgICAgICAgICAgIGxvZ2dlci5ncm91cEVuZCgpO1xuICAgICAgICAgICAgbG9nZ2VyLmdyb3VwQ29sbGFwc2VkKGBWaWV3IHJlc3BvbnNlIGRldGFpbHMgaGVyZS5gKTtcbiAgICAgICAgICAgIGxvZ2dlci5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgbG9nZ2VyLmdyb3VwRW5kKCk7XG4gICAgICAgICAgICBsb2dnZXIuZ3JvdXBFbmQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuICAgIGFzeW5jIF9oYW5kbGVJbnN0YWxsKHJlcXVlc3QsIGhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5fdXNlRGVmYXVsdENhY2hlYWJpbGl0eVBsdWdpbklmTmVlZGVkKCk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgaGFuZGxlci5mZXRjaChyZXF1ZXN0KTtcbiAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGRlZmVyIGNhY2hlUHV0KCkgdW50aWwgYWZ0ZXIgd2Uga25vdyB0aGUgcmVzcG9uc2VcbiAgICAgICAgLy8gc2hvdWxkIGJlIGNhY2hlZDsgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvd29ya2JveC9pc3N1ZXMvMjczN1xuICAgICAgICBjb25zdCB3YXNDYWNoZWQgPSBhd2FpdCBoYW5kbGVyLmNhY2hlUHV0KHJlcXVlc3QsIHJlc3BvbnNlLmNsb25lKCkpO1xuICAgICAgICBpZiAoIXdhc0NhY2hlZCkge1xuICAgICAgICAgICAgLy8gVGhyb3dpbmcgaGVyZSB3aWxsIGxlYWQgdG8gdGhlIGBpbnN0YWxsYCBoYW5kbGVyIGZhaWxpbmcsIHdoaWNoXG4gICAgICAgICAgICAvLyB3ZSB3YW50IHRvIGRvIGlmICphbnkqIG9mIHRoZSByZXNwb25zZXMgYXJlbid0IHNhZmUgdG8gY2FjaGUuXG4gICAgICAgICAgICB0aHJvdyBuZXcgV29ya2JveEVycm9yKCdiYWQtcHJlY2FjaGluZy1yZXNwb25zZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6IHJlcXVlc3QudXJsLFxuICAgICAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyBjb21wbGV4LCBhcyB0aGVyZSBhIG51bWJlciBvZiB0aGluZ3MgdG8gYWNjb3VudCBmb3I6XG4gICAgICpcbiAgICAgKiBUaGUgYHBsdWdpbnNgIGFycmF5IGNhbiBiZSBzZXQgYXQgY29uc3RydWN0aW9uLCBhbmQvb3IgaXQgbWlnaHQgYmUgYWRkZWQgdG9cbiAgICAgKiB0byBhdCBhbnkgdGltZSBiZWZvcmUgdGhlIHN0cmF0ZWd5IGlzIHVzZWQuXG4gICAgICpcbiAgICAgKiBBdCB0aGUgdGltZSB0aGUgc3RyYXRlZ3kgaXMgdXNlZCAoaS5lLiBkdXJpbmcgYW4gYGluc3RhbGxgIGV2ZW50KSwgdGhlcmVcbiAgICAgKiBuZWVkcyB0byBiZSBhdCBsZWFzdCBvbmUgcGx1Z2luIHRoYXQgaW1wbGVtZW50cyBgY2FjaGVXaWxsVXBkYXRlYCBpbiB0aGVcbiAgICAgKiBhcnJheSwgb3RoZXIgdGhhbiBgY29weVJlZGlyZWN0ZWRDYWNoZWFibGVSZXNwb25zZXNQbHVnaW5gLlxuICAgICAqXG4gICAgICogLSBJZiB0aGlzIG1ldGhvZCBpcyBjYWxsZWQgYW5kIHRoZXJlIGFyZSBubyBzdWl0YWJsZSBgY2FjaGVXaWxsVXBkYXRlYFxuICAgICAqIHBsdWdpbnMsIHdlIG5lZWQgdG8gYWRkIGBkZWZhdWx0UHJlY2FjaGVDYWNoZWFiaWxpdHlQbHVnaW5gLlxuICAgICAqXG4gICAgICogLSBJZiB0aGlzIG1ldGhvZCBpcyBjYWxsZWQgYW5kIHRoZXJlIGlzIGV4YWN0bHkgb25lIGBjYWNoZVdpbGxVcGRhdGVgLCB0aGVuXG4gICAgICogd2UgZG9uJ3QgaGF2ZSB0byBkbyBhbnl0aGluZyAodGhpcyBtaWdodCBiZSBhIHByZXZpb3VzbHkgYWRkZWRcbiAgICAgKiBgZGVmYXVsdFByZWNhY2hlQ2FjaGVhYmlsaXR5UGx1Z2luYCwgb3IgaXQgbWlnaHQgYmUgYSBjdXN0b20gcGx1Z2luKS5cbiAgICAgKlxuICAgICAqIC0gSWYgdGhpcyBtZXRob2QgaXMgY2FsbGVkIGFuZCB0aGVyZSBpcyBtb3JlIHRoYW4gb25lIGBjYWNoZVdpbGxVcGRhdGVgLFxuICAgICAqIHRoZW4gd2UgbmVlZCB0byBjaGVjayBpZiBvbmUgaXMgYGRlZmF1bHRQcmVjYWNoZUNhY2hlYWJpbGl0eVBsdWdpbmAuIElmIHNvLFxuICAgICAqIHdlIG5lZWQgdG8gcmVtb3ZlIGl0LiAoVGhpcyBzaXR1YXRpb24gaXMgdW5saWtlbHksIGJ1dCBpdCBjb3VsZCBoYXBwZW4gaWZcbiAgICAgKiB0aGUgc3RyYXRlZ3kgaXMgdXNlZCBtdWx0aXBsZSB0aW1lcywgdGhlIGZpcnN0IHdpdGhvdXQgYSBgY2FjaGVXaWxsVXBkYXRlYCxcbiAgICAgKiBhbmQgdGhlbiBsYXRlciBvbiBhZnRlciBtYW51YWxseSBhZGRpbmcgYSBjdXN0b20gYGNhY2hlV2lsbFVwZGF0ZWAuKVxuICAgICAqXG4gICAgICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvd29ya2JveC9pc3N1ZXMvMjczNyBmb3IgbW9yZSBjb250ZXh0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfdXNlRGVmYXVsdENhY2hlYWJpbGl0eVBsdWdpbklmTmVlZGVkKCkge1xuICAgICAgICBsZXQgZGVmYXVsdFBsdWdpbkluZGV4ID0gbnVsbDtcbiAgICAgICAgbGV0IGNhY2hlV2lsbFVwZGF0ZVBsdWdpbkNvdW50ID0gMDtcbiAgICAgICAgZm9yIChjb25zdCBbaW5kZXgsIHBsdWdpbl0gb2YgdGhpcy5wbHVnaW5zLmVudHJpZXMoKSkge1xuICAgICAgICAgICAgLy8gSWdub3JlIHRoZSBjb3B5IHJlZGlyZWN0ZWQgcGx1Z2luIHdoZW4gZGV0ZXJtaW5pbmcgd2hhdCB0byBkby5cbiAgICAgICAgICAgIGlmIChwbHVnaW4gPT09IFByZWNhY2hlU3RyYXRlZ3kuY29weVJlZGlyZWN0ZWRDYWNoZWFibGVSZXNwb25zZXNQbHVnaW4pIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFNhdmUgdGhlIGRlZmF1bHQgcGx1Z2luJ3MgaW5kZXgsIGluIGNhc2UgaXQgbmVlZHMgdG8gYmUgcmVtb3ZlZC5cbiAgICAgICAgICAgIGlmIChwbHVnaW4gPT09IFByZWNhY2hlU3RyYXRlZ3kuZGVmYXVsdFByZWNhY2hlQ2FjaGVhYmlsaXR5UGx1Z2luKSB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFBsdWdpbkluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGx1Z2luLmNhY2hlV2lsbFVwZGF0ZSkge1xuICAgICAgICAgICAgICAgIGNhY2hlV2lsbFVwZGF0ZVBsdWdpbkNvdW50Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhY2hlV2lsbFVwZGF0ZVBsdWdpbkNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbnMucHVzaChQcmVjYWNoZVN0cmF0ZWd5LmRlZmF1bHRQcmVjYWNoZUNhY2hlYWJpbGl0eVBsdWdpbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2FjaGVXaWxsVXBkYXRlUGx1Z2luQ291bnQgPiAxICYmIGRlZmF1bHRQbHVnaW5JbmRleCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gT25seSByZW1vdmUgdGhlIGRlZmF1bHQgcGx1Z2luOyBtdWx0aXBsZSBjdXN0b20gcGx1Z2lucyBhcmUgYWxsb3dlZC5cbiAgICAgICAgICAgIHRoaXMucGx1Z2lucy5zcGxpY2UoZGVmYXVsdFBsdWdpbkluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBOb3RoaW5nIG5lZWRzIHRvIGJlIGRvbmUgaWYgY2FjaGVXaWxsVXBkYXRlUGx1Z2luQ291bnQgaXMgMVxuICAgIH1cbn1cblByZWNhY2hlU3RyYXRlZ3kuZGVmYXVsdFByZWNhY2hlQ2FjaGVhYmlsaXR5UGx1Z2luID0ge1xuICAgIGFzeW5jIGNhY2hlV2lsbFVwZGF0ZSh7IHJlc3BvbnNlIH0pIHtcbiAgICAgICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgPj0gNDAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSxcbn07XG5QcmVjYWNoZVN0cmF0ZWd5LmNvcHlSZWRpcmVjdGVkQ2FjaGVhYmxlUmVzcG9uc2VzUGx1Z2luID0ge1xuICAgIGFzeW5jIGNhY2hlV2lsbFVwZGF0ZSh7IHJlc3BvbnNlIH0pIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnJlZGlyZWN0ZWQgPyBhd2FpdCBjb3B5UmVzcG9uc2UocmVzcG9uc2UpIDogcmVzcG9uc2U7XG4gICAgfSxcbn07XG5leHBvcnQgeyBQcmVjYWNoZVN0cmF0ZWd5IH07XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2Fzc2VydC5qcyc7XG5pbXBvcnQgeyBjYWNoZU5hbWVzIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2NhY2hlTmFtZXMuanMnO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2xvZ2dlci5qcyc7XG5pbXBvcnQgeyBXb3JrYm94RXJyb3IgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvV29ya2JveEVycm9yLmpzJztcbmltcG9ydCB7IHdhaXRVbnRpbCB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS93YWl0VW50aWwuanMnO1xuaW1wb3J0IHsgY3JlYXRlQ2FjaGVLZXkgfSBmcm9tICcuL3V0aWxzL2NyZWF0ZUNhY2hlS2V5LmpzJztcbmltcG9ydCB7IFByZWNhY2hlSW5zdGFsbFJlcG9ydFBsdWdpbiB9IGZyb20gJy4vdXRpbHMvUHJlY2FjaGVJbnN0YWxsUmVwb3J0UGx1Z2luLmpzJztcbmltcG9ydCB7IFByZWNhY2hlQ2FjaGVLZXlQbHVnaW4gfSBmcm9tICcuL3V0aWxzL1ByZWNhY2hlQ2FjaGVLZXlQbHVnaW4uanMnO1xuaW1wb3J0IHsgcHJpbnRDbGVhbnVwRGV0YWlscyB9IGZyb20gJy4vdXRpbHMvcHJpbnRDbGVhbnVwRGV0YWlscy5qcyc7XG5pbXBvcnQgeyBwcmludEluc3RhbGxEZXRhaWxzIH0gZnJvbSAnLi91dGlscy9wcmludEluc3RhbGxEZXRhaWxzLmpzJztcbmltcG9ydCB7IFByZWNhY2hlU3RyYXRlZ3kgfSBmcm9tICcuL1ByZWNhY2hlU3RyYXRlZ3kuanMnO1xuaW1wb3J0ICcuL192ZXJzaW9uLmpzJztcbi8qKlxuICogUGVyZm9ybXMgZWZmaWNpZW50IHByZWNhY2hpbmcgb2YgYXNzZXRzLlxuICpcbiAqIEBtZW1iZXJvZiB3b3JrYm94LXByZWNhY2hpbmdcbiAqL1xuY2xhc3MgUHJlY2FjaGVDb250cm9sbGVyIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgUHJlY2FjaGVDb250cm9sbGVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5jYWNoZU5hbWVdIFRoZSBjYWNoZSB0byB1c2UgZm9yIHByZWNhY2hpbmcuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnBsdWdpbnNdIFBsdWdpbnMgdG8gdXNlIHdoZW4gcHJlY2FjaGluZyBhcyB3ZWxsXG4gICAgICogYXMgcmVzcG9uZGluZyB0byBmZXRjaCBldmVudHMgZm9yIHByZWNhY2hlZCBhc3NldHMuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5mYWxsYmFja1RvTmV0d29yaz10cnVlXSBXaGV0aGVyIHRvIGF0dGVtcHQgdG9cbiAgICAgKiBnZXQgdGhlIHJlc3BvbnNlIGZyb20gdGhlIG5ldHdvcmsgaWYgdGhlcmUncyBhIHByZWNhY2hlIG1pc3MuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoeyBjYWNoZU5hbWUsIHBsdWdpbnMgPSBbXSwgZmFsbGJhY2tUb05ldHdvcmsgPSB0cnVlLCB9ID0ge30pIHtcbiAgICAgICAgdGhpcy5fdXJsc1RvQ2FjaGVLZXlzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLl91cmxzVG9DYWNoZU1vZGVzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLl9jYWNoZUtleXNUb0ludGVncml0aWVzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLl9zdHJhdGVneSA9IG5ldyBQcmVjYWNoZVN0cmF0ZWd5KHtcbiAgICAgICAgICAgIGNhY2hlTmFtZTogY2FjaGVOYW1lcy5nZXRQcmVjYWNoZU5hbWUoY2FjaGVOYW1lKSxcbiAgICAgICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAgICAgICAuLi5wbHVnaW5zLFxuICAgICAgICAgICAgICAgIG5ldyBQcmVjYWNoZUNhY2hlS2V5UGx1Z2luKHsgcHJlY2FjaGVDb250cm9sbGVyOiB0aGlzIH0pLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGZhbGxiYWNrVG9OZXR3b3JrLFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gQmluZCB0aGUgaW5zdGFsbCBhbmQgYWN0aXZhdGUgbWV0aG9kcyB0byB0aGUgaW5zdGFuY2UuXG4gICAgICAgIHRoaXMuaW5zdGFsbCA9IHRoaXMuaW5zdGFsbC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmFjdGl2YXRlID0gdGhpcy5hY3RpdmF0ZS5iaW5kKHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7d29ya2JveC1wcmVjYWNoaW5nLlByZWNhY2hlU3RyYXRlZ3l9IFRoZSBzdHJhdGVneSBjcmVhdGVkIGJ5IHRoaXMgY29udHJvbGxlciBhbmRcbiAgICAgKiB1c2VkIHRvIGNhY2hlIGFzc2V0cyBhbmQgcmVzcG9uZCB0byBmZXRjaCBldmVudHMuXG4gICAgICovXG4gICAgZ2V0IHN0cmF0ZWd5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RyYXRlZ3k7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgaXRlbXMgdG8gdGhlIHByZWNhY2hlIGxpc3QsIHJlbW92aW5nIGFueSBkdXBsaWNhdGVzIGFuZFxuICAgICAqIHN0b3JlcyB0aGUgZmlsZXMgaW4gdGhlXG4gICAgICoge0BsaW5rIHdvcmtib3gtY29yZS5jYWNoZU5hbWVzfFwicHJlY2FjaGUgY2FjaGVcIn0gd2hlbiB0aGUgc2VydmljZVxuICAgICAqIHdvcmtlciBpbnN0YWxscy5cbiAgICAgKlxuICAgICAqIFRoaXMgbWV0aG9kIGNhbiBiZSBjYWxsZWQgbXVsdGlwbGUgdGltZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5PE9iamVjdHxzdHJpbmc+fSBbZW50cmllcz1bXV0gQXJyYXkgb2YgZW50cmllcyB0byBwcmVjYWNoZS5cbiAgICAgKi9cbiAgICBwcmVjYWNoZShlbnRyaWVzKSB7XG4gICAgICAgIHRoaXMuYWRkVG9DYWNoZUxpc3QoZW50cmllcyk7XG4gICAgICAgIGlmICghdGhpcy5faW5zdGFsbEFuZEFjdGl2ZUxpc3RlbmVyc0FkZGVkKSB7XG4gICAgICAgICAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2luc3RhbGwnLCB0aGlzLmluc3RhbGwpO1xuICAgICAgICAgICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdhY3RpdmF0ZScsIHRoaXMuYWN0aXZhdGUpO1xuICAgICAgICAgICAgdGhpcy5faW5zdGFsbEFuZEFjdGl2ZUxpc3RlbmVyc0FkZGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCB3aWxsIGFkZCBpdGVtcyB0byB0aGUgcHJlY2FjaGUgbGlzdCwgcmVtb3ZpbmcgZHVwbGljYXRlc1xuICAgICAqIGFuZCBlbnN1cmluZyB0aGUgaW5mb3JtYXRpb24gaXMgdmFsaWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5PHdvcmtib3gtcHJlY2FjaGluZy5QcmVjYWNoZUNvbnRyb2xsZXIuUHJlY2FjaGVFbnRyeXxzdHJpbmc+fSBlbnRyaWVzXG4gICAgICogICAgIEFycmF5IG9mIGVudHJpZXMgdG8gcHJlY2FjaGUuXG4gICAgICovXG4gICAgYWRkVG9DYWNoZUxpc3QoZW50cmllcykge1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgYXNzZXJ0LmlzQXJyYXkoZW50cmllcywge1xuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LXByZWNhY2hpbmcnLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ1ByZWNhY2hlQ29udHJvbGxlcicsXG4gICAgICAgICAgICAgICAgZnVuY05hbWU6ICdhZGRUb0NhY2hlTGlzdCcsXG4gICAgICAgICAgICAgICAgcGFyYW1OYW1lOiAnZW50cmllcycsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1cmxzVG9XYXJuQWJvdXQgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzKSB7XG4gICAgICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZS93b3JrYm94L2lzc3Vlcy8yMjU5XG4gICAgICAgICAgICBpZiAodHlwZW9mIGVudHJ5ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHVybHNUb1dhcm5BYm91dC5wdXNoKGVudHJ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGVudHJ5ICYmIGVudHJ5LnJldmlzaW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB1cmxzVG9XYXJuQWJvdXQucHVzaChlbnRyeS51cmwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgeyBjYWNoZUtleSwgdXJsIH0gPSBjcmVhdGVDYWNoZUtleShlbnRyeSk7XG4gICAgICAgICAgICBjb25zdCBjYWNoZU1vZGUgPSB0eXBlb2YgZW50cnkgIT09ICdzdHJpbmcnICYmIGVudHJ5LnJldmlzaW9uID8gJ3JlbG9hZCcgOiAnZGVmYXVsdCc7XG4gICAgICAgICAgICBpZiAodGhpcy5fdXJsc1RvQ2FjaGVLZXlzLmhhcyh1cmwpICYmXG4gICAgICAgICAgICAgICAgdGhpcy5fdXJsc1RvQ2FjaGVLZXlzLmdldCh1cmwpICE9PSBjYWNoZUtleSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBXb3JrYm94RXJyb3IoJ2FkZC10by1jYWNoZS1saXN0LWNvbmZsaWN0aW5nLWVudHJpZXMnLCB7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0RW50cnk6IHRoaXMuX3VybHNUb0NhY2hlS2V5cy5nZXQodXJsKSxcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kRW50cnk6IGNhY2hlS2V5LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBlbnRyeSAhPT0gJ3N0cmluZycgJiYgZW50cnkuaW50ZWdyaXR5KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NhY2hlS2V5c1RvSW50ZWdyaXRpZXMuaGFzKGNhY2hlS2V5KSAmJlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUtleXNUb0ludGVncml0aWVzLmdldChjYWNoZUtleSkgIT09IGVudHJ5LmludGVncml0eSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgV29ya2JveEVycm9yKCdhZGQtdG8tY2FjaGUtbGlzdC1jb25mbGljdGluZy1pbnRlZ3JpdGllcycsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlS2V5c1RvSW50ZWdyaXRpZXMuc2V0KGNhY2hlS2V5LCBlbnRyeS5pbnRlZ3JpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdXJsc1RvQ2FjaGVLZXlzLnNldCh1cmwsIGNhY2hlS2V5KTtcbiAgICAgICAgICAgIHRoaXMuX3VybHNUb0NhY2hlTW9kZXMuc2V0KHVybCwgY2FjaGVNb2RlKTtcbiAgICAgICAgICAgIGlmICh1cmxzVG9XYXJuQWJvdXQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHdhcm5pbmdNZXNzYWdlID0gYFdvcmtib3ggaXMgcHJlY2FjaGluZyBVUkxzIHdpdGhvdXQgcmV2aXNpb24gYCArXG4gICAgICAgICAgICAgICAgICAgIGBpbmZvOiAke3VybHNUb1dhcm5BYm91dC5qb2luKCcsICcpfVxcblRoaXMgaXMgZ2VuZXJhbGx5IE5PVCBzYWZlLiBgICtcbiAgICAgICAgICAgICAgICAgICAgYExlYXJuIG1vcmUgYXQgaHR0cHM6Ly9iaXQubHkvd2ItcHJlY2FjaGVgO1xuICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFVzZSBjb25zb2xlIGRpcmVjdGx5IHRvIGRpc3BsYXkgdGhpcyB3YXJuaW5nIHdpdGhvdXQgYmxvYXRpbmdcbiAgICAgICAgICAgICAgICAgICAgLy8gYnVuZGxlIHNpemVzIGJ5IHB1bGxpbmcgaW4gYWxsIG9mIHRoZSBsb2dnZXIgY29kZWJhc2UgaW4gcHJvZC5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKHdhcm5pbmdNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci53YXJuKHdhcm5pbmdNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJlY2FjaGVzIG5ldyBhbmQgdXBkYXRlZCBhc3NldHMuIENhbGwgdGhpcyBtZXRob2QgZnJvbSB0aGUgc2VydmljZSB3b3JrZXJcbiAgICAgKiBpbnN0YWxsIGV2ZW50LlxuICAgICAqXG4gICAgICogTm90ZTogdGhpcyBtZXRob2QgY2FsbHMgYGV2ZW50LndhaXRVbnRpbCgpYCBmb3IgeW91LCBzbyB5b3UgZG8gbm90IG5lZWRcbiAgICAgKiB0byBjYWxsIGl0IHlvdXJzZWxmIGluIHlvdXIgZXZlbnQgaGFuZGxlcnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V4dGVuZGFibGVFdmVudH0gZXZlbnRcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPHdvcmtib3gtcHJlY2FjaGluZy5JbnN0YWxsUmVzdWx0Pn1cbiAgICAgKi9cbiAgICBpbnN0YWxsKGV2ZW50KSB7XG4gICAgICAgIC8vIHdhaXRVbnRpbCByZXR1cm5zIFByb21pc2U8YW55PlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1yZXR1cm5cbiAgICAgICAgcmV0dXJuIHdhaXRVbnRpbChldmVudCwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5zdGFsbFJlcG9ydFBsdWdpbiA9IG5ldyBQcmVjYWNoZUluc3RhbGxSZXBvcnRQbHVnaW4oKTtcbiAgICAgICAgICAgIHRoaXMuc3RyYXRlZ3kucGx1Z2lucy5wdXNoKGluc3RhbGxSZXBvcnRQbHVnaW4pO1xuICAgICAgICAgICAgLy8gQ2FjaGUgZW50cmllcyBvbmUgYXQgYSB0aW1lLlxuICAgICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvd29ya2JveC9pc3N1ZXMvMjUyOFxuICAgICAgICAgICAgZm9yIChjb25zdCBbdXJsLCBjYWNoZUtleV0gb2YgdGhpcy5fdXJsc1RvQ2FjaGVLZXlzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW50ZWdyaXR5ID0gdGhpcy5fY2FjaGVLZXlzVG9JbnRlZ3JpdGllcy5nZXQoY2FjaGVLZXkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhY2hlTW9kZSA9IHRoaXMuX3VybHNUb0NhY2hlTW9kZXMuZ2V0KHVybCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHVybCwge1xuICAgICAgICAgICAgICAgICAgICBpbnRlZ3JpdHksXG4gICAgICAgICAgICAgICAgICAgIGNhY2hlOiBjYWNoZU1vZGUsXG4gICAgICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHRoaXMuc3RyYXRlZ3kuaGFuZGxlQWxsKHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7IGNhY2hlS2V5IH0sXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LFxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHsgdXBkYXRlZFVSTHMsIG5vdFVwZGF0ZWRVUkxzIH0gPSBpbnN0YWxsUmVwb3J0UGx1Z2luO1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBwcmludEluc3RhbGxEZXRhaWxzKHVwZGF0ZWRVUkxzLCBub3RVcGRhdGVkVVJMcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyB1cGRhdGVkVVJMcywgbm90VXBkYXRlZFVSTHMgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgYXNzZXRzIHRoYXQgYXJlIG5vIGxvbmdlciBwcmVzZW50IGluIHRoZSBjdXJyZW50IHByZWNhY2hlIG1hbmlmZXN0LlxuICAgICAqIENhbGwgdGhpcyBtZXRob2QgZnJvbSB0aGUgc2VydmljZSB3b3JrZXIgYWN0aXZhdGUgZXZlbnQuXG4gICAgICpcbiAgICAgKiBOb3RlOiB0aGlzIG1ldGhvZCBjYWxscyBgZXZlbnQud2FpdFVudGlsKClgIGZvciB5b3UsIHNvIHlvdSBkbyBub3QgbmVlZFxuICAgICAqIHRvIGNhbGwgaXQgeW91cnNlbGYgaW4geW91ciBldmVudCBoYW5kbGVycy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXh0ZW5kYWJsZUV2ZW50fSBldmVudFxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8d29ya2JveC1wcmVjYWNoaW5nLkNsZWFudXBSZXN1bHQ+fVxuICAgICAqL1xuICAgIGFjdGl2YXRlKGV2ZW50KSB7XG4gICAgICAgIC8vIHdhaXRVbnRpbCByZXR1cm5zIFByb21pc2U8YW55PlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1yZXR1cm5cbiAgICAgICAgcmV0dXJuIHdhaXRVbnRpbChldmVudCwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2FjaGUgPSBhd2FpdCBzZWxmLmNhY2hlcy5vcGVuKHRoaXMuc3RyYXRlZ3kuY2FjaGVOYW1lKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRseUNhY2hlZFJlcXVlc3RzID0gYXdhaXQgY2FjaGUua2V5cygpO1xuICAgICAgICAgICAgY29uc3QgZXhwZWN0ZWRDYWNoZUtleXMgPSBuZXcgU2V0KHRoaXMuX3VybHNUb0NhY2hlS2V5cy52YWx1ZXMoKSk7XG4gICAgICAgICAgICBjb25zdCBkZWxldGVkVVJMcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCByZXF1ZXN0IG9mIGN1cnJlbnRseUNhY2hlZFJlcXVlc3RzKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFleHBlY3RlZENhY2hlS2V5cy5oYXMocmVxdWVzdC51cmwpKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGNhY2hlLmRlbGV0ZShyZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlZFVSTHMucHVzaChyZXF1ZXN0LnVybCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBwcmludENsZWFudXBEZXRhaWxzKGRlbGV0ZWRVUkxzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IGRlbGV0ZWRVUkxzIH07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbWFwcGluZyBvZiBhIHByZWNhY2hlZCBVUkwgdG8gdGhlIGNvcnJlc3BvbmRpbmcgY2FjaGUga2V5LCB0YWtpbmdcbiAgICAgKiBpbnRvIGFjY291bnQgdGhlIHJldmlzaW9uIGluZm9ybWF0aW9uIGZvciB0aGUgVVJMLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TWFwPHN0cmluZywgc3RyaW5nPn0gQSBVUkwgdG8gY2FjaGUga2V5IG1hcHBpbmcuXG4gICAgICovXG4gICAgZ2V0VVJMc1RvQ2FjaGVLZXlzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXJsc1RvQ2FjaGVLZXlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBhbGwgdGhlIFVSTHMgdGhhdCBoYXZlIGJlZW4gcHJlY2FjaGVkIGJ5IHRoZSBjdXJyZW50XG4gICAgICogc2VydmljZSB3b3JrZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtBcnJheTxzdHJpbmc+fSBUaGUgcHJlY2FjaGVkIFVSTHMuXG4gICAgICovXG4gICAgZ2V0Q2FjaGVkVVJMcygpIHtcbiAgICAgICAgcmV0dXJuIFsuLi50aGlzLl91cmxzVG9DYWNoZUtleXMua2V5cygpXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY2FjaGUga2V5IHVzZWQgZm9yIHN0b3JpbmcgYSBnaXZlbiBVUkwuIElmIHRoYXQgVVJMIGlzXG4gICAgICogdW52ZXJzaW9uZWQsIGxpa2UgYC9pbmRleC5odG1sJywgdGhlbiB0aGUgY2FjaGUga2V5IHdpbGwgYmUgdGhlIG9yaWdpbmFsXG4gICAgICogVVJMIHdpdGggYSBzZWFyY2ggcGFyYW1ldGVyIGFwcGVuZGVkIHRvIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBBIFVSTCB3aG9zZSBjYWNoZSBrZXkgeW91IHdhbnQgdG8gbG9vayB1cC5cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSB2ZXJzaW9uZWQgVVJMIHRoYXQgY29ycmVzcG9uZHMgdG8gYSBjYWNoZSBrZXlcbiAgICAgKiBmb3IgdGhlIG9yaWdpbmFsIFVSTCwgb3IgdW5kZWZpbmVkIGlmIHRoYXQgVVJMIGlzbid0IHByZWNhY2hlZC5cbiAgICAgKi9cbiAgICBnZXRDYWNoZUtleUZvclVSTCh1cmwpIHtcbiAgICAgICAgY29uc3QgdXJsT2JqZWN0ID0gbmV3IFVSTCh1cmwsIGxvY2F0aW9uLmhyZWYpO1xuICAgICAgICByZXR1cm4gdGhpcy5fdXJsc1RvQ2FjaGVLZXlzLmdldCh1cmxPYmplY3QuaHJlZik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgQSBjYWNoZSBrZXkgd2hvc2UgU1JJIHlvdSB3YW50IHRvIGxvb2sgdXAuXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgc3VicmVzb3VyY2UgaW50ZWdyaXR5IGFzc29jaWF0ZWQgd2l0aCB0aGUgY2FjaGUga2V5LFxuICAgICAqIG9yIHVuZGVmaW5lZCBpZiBpdCdzIG5vdCBzZXQuXG4gICAgICovXG4gICAgZ2V0SW50ZWdyaXR5Rm9yQ2FjaGVLZXkoY2FjaGVLZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlS2V5c1RvSW50ZWdyaXRpZXMuZ2V0KGNhY2hlS2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhpcyBhY3RzIGFzIGEgZHJvcC1pbiByZXBsYWNlbWVudCBmb3JcbiAgICAgKiBbYGNhY2hlLm1hdGNoKClgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ2FjaGUvbWF0Y2gpXG4gICAgICogd2l0aCB0aGUgZm9sbG93aW5nIGRpZmZlcmVuY2VzOlxuICAgICAqXG4gICAgICogLSBJdCBrbm93cyB3aGF0IHRoZSBuYW1lIG9mIHRoZSBwcmVjYWNoZSBpcywgYW5kIG9ubHkgY2hlY2tzIGluIHRoYXQgY2FjaGUuXG4gICAgICogLSBJdCBhbGxvd3MgeW91IHRvIHBhc3MgaW4gYW4gXCJvcmlnaW5hbFwiIFVSTCB3aXRob3V0IHZlcnNpb25pbmcgcGFyYW1ldGVycyxcbiAgICAgKiBhbmQgaXQgd2lsbCBhdXRvbWF0aWNhbGx5IGxvb2sgdXAgdGhlIGNvcnJlY3QgY2FjaGUga2V5IGZvciB0aGUgY3VycmVudGx5XG4gICAgICogYWN0aXZlIHJldmlzaW9uIG9mIHRoYXQgVVJMLlxuICAgICAqXG4gICAgICogRS5nLiwgYG1hdGNoUHJlY2FjaGUoJ2luZGV4Lmh0bWwnKWAgd2lsbCBmaW5kIHRoZSBjb3JyZWN0IHByZWNhY2hlZFxuICAgICAqIHJlc3BvbnNlIGZvciB0aGUgY3VycmVudGx5IGFjdGl2ZSBzZXJ2aWNlIHdvcmtlciwgZXZlbiBpZiB0aGUgYWN0dWFsIGNhY2hlXG4gICAgICoga2V5IGlzIGAnL2luZGV4Lmh0bWw/X19XQl9SRVZJU0lPTl9fPTEyMzRhYmNkJ2AuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xSZXF1ZXN0fSByZXF1ZXN0IFRoZSBrZXkgKHdpdGhvdXQgcmV2aXNpb25pbmcgcGFyYW1ldGVycylcbiAgICAgKiB0byBsb29rIHVwIGluIHRoZSBwcmVjYWNoZS5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPFJlc3BvbnNlfHVuZGVmaW5lZD59XG4gICAgICovXG4gICAgYXN5bmMgbWF0Y2hQcmVjYWNoZShyZXF1ZXN0KSB7XG4gICAgICAgIGNvbnN0IHVybCA9IHJlcXVlc3QgaW5zdGFuY2VvZiBSZXF1ZXN0ID8gcmVxdWVzdC51cmwgOiByZXF1ZXN0O1xuICAgICAgICBjb25zdCBjYWNoZUtleSA9IHRoaXMuZ2V0Q2FjaGVLZXlGb3JVUkwodXJsKTtcbiAgICAgICAgaWYgKGNhY2hlS2V5KSB7XG4gICAgICAgICAgICBjb25zdCBjYWNoZSA9IGF3YWl0IHNlbGYuY2FjaGVzLm9wZW4odGhpcy5zdHJhdGVneS5jYWNoZU5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuIGNhY2hlLm1hdGNoKGNhY2hlS2V5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBsb29rcyB1cCBgdXJsYCBpbiB0aGUgcHJlY2FjaGUgKHRha2luZyBpbnRvXG4gICAgICogYWNjb3VudCByZXZpc2lvbiBpbmZvcm1hdGlvbiksIGFuZCByZXR1cm5zIHRoZSBjb3JyZXNwb25kaW5nIGBSZXNwb25zZWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBwcmVjYWNoZWQgVVJMIHdoaWNoIHdpbGwgYmUgdXNlZCB0byBsb29rdXAgdGhlXG4gICAgICogYFJlc3BvbnNlYC5cbiAgICAgKiBAcmV0dXJuIHt3b3JrYm94LXJvdXRpbmd+aGFuZGxlckNhbGxiYWNrfVxuICAgICAqL1xuICAgIGNyZWF0ZUhhbmRsZXJCb3VuZFRvVVJMKHVybCkge1xuICAgICAgICBjb25zdCBjYWNoZUtleSA9IHRoaXMuZ2V0Q2FjaGVLZXlGb3JVUkwodXJsKTtcbiAgICAgICAgaWYgKCFjYWNoZUtleSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFdvcmtib3hFcnJvcignbm9uLXByZWNhY2hlZC11cmwnLCB7IHVybCB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKG9wdGlvbnMpID0+IHtcbiAgICAgICAgICAgIG9wdGlvbnMucmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHVybCk7XG4gICAgICAgICAgICBvcHRpb25zLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oeyBjYWNoZUtleSB9LCBvcHRpb25zLnBhcmFtcyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdHJhdGVneS5oYW5kbGUob3B0aW9ucyk7XG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0IHsgUHJlY2FjaGVDb250cm9sbGVyIH07XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgUHJlY2FjaGVDb250cm9sbGVyIH0gZnJvbSAnLi4vUHJlY2FjaGVDb250cm9sbGVyLmpzJztcbmltcG9ydCAnLi4vX3ZlcnNpb24uanMnO1xubGV0IHByZWNhY2hlQ29udHJvbGxlcjtcbi8qKlxuICogQHJldHVybiB7UHJlY2FjaGVDb250cm9sbGVyfVxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IGdldE9yQ3JlYXRlUHJlY2FjaGVDb250cm9sbGVyID0gKCkgPT4ge1xuICAgIGlmICghcHJlY2FjaGVDb250cm9sbGVyKSB7XG4gICAgICAgIHByZWNhY2hlQ29udHJvbGxlciA9IG5ldyBQcmVjYWNoZUNvbnRyb2xsZXIoKTtcbiAgICB9XG4gICAgcmV0dXJuIHByZWNhY2hlQ29udHJvbGxlcjtcbn07XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBAdHMtaWdub3JlXG50cnkge1xuICAgIHNlbGZbJ3dvcmtib3g6cm91dGluZzo2LjUuMyddICYmIF8oKTtcbn1cbmNhdGNoIChlKSB7IH1cbiIsICIvKlxuICBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbi8qKlxuICogVGhlIGRlZmF1bHQgSFRUUCBtZXRob2QsICdHRVQnLCB1c2VkIHdoZW4gdGhlcmUncyBubyBzcGVjaWZpYyBtZXRob2RcbiAqIGNvbmZpZ3VyZWQgZm9yIGEgcm91dGUuXG4gKlxuICogQHR5cGUge3N0cmluZ31cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgZGVmYXVsdE1ldGhvZCA9ICdHRVQnO1xuLyoqXG4gKiBUaGUgbGlzdCBvZiB2YWxpZCBIVFRQIG1ldGhvZHMgYXNzb2NpYXRlZCB3aXRoIHJlcXVlc3RzIHRoYXQgY291bGQgYmUgcm91dGVkLlxuICpcbiAqIEB0eXBlIHtBcnJheTxzdHJpbmc+fVxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCB2YWxpZE1ldGhvZHMgPSBbXG4gICAgJ0RFTEVURScsXG4gICAgJ0dFVCcsXG4gICAgJ0hFQUQnLFxuICAgICdQQVRDSCcsXG4gICAgJ1BPU1QnLFxuICAgICdQVVQnLFxuXTtcbiIsICIvKlxuICBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvYXNzZXJ0LmpzJztcbmltcG9ydCAnLi4vX3ZlcnNpb24uanMnO1xuLyoqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCl8T2JqZWN0fSBoYW5kbGVyIEVpdGhlciBhIGZ1bmN0aW9uLCBvciBhbiBvYmplY3Qgd2l0aCBhXG4gKiAnaGFuZGxlJyBtZXRob2QuXG4gKiBAcmV0dXJuIHtPYmplY3R9IEFuIG9iamVjdCB3aXRoIGEgaGFuZGxlIG1ldGhvZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplSGFuZGxlciA9IChoYW5kbGVyKSA9PiB7XG4gICAgaWYgKGhhbmRsZXIgJiYgdHlwZW9mIGhhbmRsZXIgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBhc3NlcnQuaGFzTWV0aG9kKGhhbmRsZXIsICdoYW5kbGUnLCB7XG4gICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtcm91dGluZycsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnUm91dGUnLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAnY29uc3RydWN0b3InLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ2hhbmRsZXInLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhhbmRsZXI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgYXNzZXJ0LmlzVHlwZShoYW5kbGVyLCAnZnVuY3Rpb24nLCB7XG4gICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtcm91dGluZycsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnUm91dGUnLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAnY29uc3RydWN0b3InLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ2hhbmRsZXInLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgaGFuZGxlOiBoYW5kbGVyIH07XG4gICAgfVxufTtcbiIsICIvKlxuICBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvYXNzZXJ0LmpzJztcbmltcG9ydCB7IGRlZmF1bHRNZXRob2QsIHZhbGlkTWV0aG9kcyB9IGZyb20gJy4vdXRpbHMvY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IG5vcm1hbGl6ZUhhbmRsZXIgfSBmcm9tICcuL3V0aWxzL25vcm1hbGl6ZUhhbmRsZXIuanMnO1xuaW1wb3J0ICcuL192ZXJzaW9uLmpzJztcbi8qKlxuICogQSBgUm91dGVgIGNvbnNpc3RzIG9mIGEgcGFpciBvZiBjYWxsYmFjayBmdW5jdGlvbnMsIFwibWF0Y2hcIiBhbmQgXCJoYW5kbGVyXCIuXG4gKiBUaGUgXCJtYXRjaFwiIGNhbGxiYWNrIGRldGVybWluZSBpZiBhIHJvdXRlIHNob3VsZCBiZSB1c2VkIHRvIFwiaGFuZGxlXCIgYVxuICogcmVxdWVzdCBieSByZXR1cm5pbmcgYSBub24tZmFsc3kgdmFsdWUgaWYgaXQgY2FuLiBUaGUgXCJoYW5kbGVyXCIgY2FsbGJhY2tcbiAqIGlzIGNhbGxlZCB3aGVuIHRoZXJlIGlzIGEgbWF0Y2ggYW5kIHNob3VsZCByZXR1cm4gYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXNcbiAqIHRvIGEgYFJlc3BvbnNlYC5cbiAqXG4gKiBAbWVtYmVyb2Ygd29ya2JveC1yb3V0aW5nXG4gKi9cbmNsYXNzIFJvdXRlIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RvciBmb3IgUm91dGUgY2xhc3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3dvcmtib3gtcm91dGluZ35tYXRjaENhbGxiYWNrfSBtYXRjaFxuICAgICAqIEEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBkZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHJvdXRlIG1hdGNoZXMgYSBnaXZlblxuICAgICAqIGBmZXRjaGAgZXZlbnQgYnkgcmV0dXJuaW5nIGEgbm9uLWZhbHN5IHZhbHVlLlxuICAgICAqIEBwYXJhbSB7d29ya2JveC1yb3V0aW5nfmhhbmRsZXJDYWxsYmFja30gaGFuZGxlciBBIGNhbGxiYWNrXG4gICAgICogZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgUHJvbWlzZSByZXNvbHZpbmcgdG8gYSBSZXNwb25zZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW21ldGhvZD0nR0VUJ10gVGhlIEhUVFAgbWV0aG9kIHRvIG1hdGNoIHRoZSBSb3V0ZVxuICAgICAqIGFnYWluc3QuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobWF0Y2gsIGhhbmRsZXIsIG1ldGhvZCA9IGRlZmF1bHRNZXRob2QpIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGFzc2VydC5pc1R5cGUobWF0Y2gsICdmdW5jdGlvbicsIHtcbiAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1yb3V0aW5nJyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdSb3V0ZScsXG4gICAgICAgICAgICAgICAgZnVuY05hbWU6ICdjb25zdHJ1Y3RvcicsXG4gICAgICAgICAgICAgICAgcGFyYW1OYW1lOiAnbWF0Y2gnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0LmlzT25lT2YobWV0aG9kLCB2YWxpZE1ldGhvZHMsIHsgcGFyYW1OYW1lOiAnbWV0aG9kJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBUaGVzZSB2YWx1ZXMgYXJlIHJlZmVyZW5jZWQgZGlyZWN0bHkgYnkgUm91dGVyIHNvIGNhbm5vdCBiZVxuICAgICAgICAvLyBhbHRlcmVkIGJ5IG1pbmlmaWNhdG9uLlxuICAgICAgICB0aGlzLmhhbmRsZXIgPSBub3JtYWxpemVIYW5kbGVyKGhhbmRsZXIpO1xuICAgICAgICB0aGlzLm1hdGNoID0gbWF0Y2g7XG4gICAgICAgIHRoaXMubWV0aG9kID0gbWV0aG9kO1xuICAgIH1cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7d29ya2JveC1yb3V0aW5nLWhhbmRsZXJDYWxsYmFja30gaGFuZGxlciBBIGNhbGxiYWNrXG4gICAgICogZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgUHJvbWlzZSByZXNvbHZpbmcgdG8gYSBSZXNwb25zZVxuICAgICAqL1xuICAgIHNldENhdGNoSGFuZGxlcihoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMuY2F0Y2hIYW5kbGVyID0gbm9ybWFsaXplSGFuZGxlcihoYW5kbGVyKTtcbiAgICB9XG59XG5leHBvcnQgeyBSb3V0ZSB9O1xuIiwgIi8qXG4gIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9hc3NlcnQuanMnO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2xvZ2dlci5qcyc7XG5pbXBvcnQgeyBSb3V0ZSB9IGZyb20gJy4vUm91dGUuanMnO1xuaW1wb3J0ICcuL192ZXJzaW9uLmpzJztcbi8qKlxuICogUmVnRXhwUm91dGUgbWFrZXMgaXQgZWFzeSB0byBjcmVhdGUgYSByZWd1bGFyIGV4cHJlc3Npb24gYmFzZWRcbiAqIHtAbGluayB3b3JrYm94LXJvdXRpbmcuUm91dGV9LlxuICpcbiAqIEZvciBzYW1lLW9yaWdpbiByZXF1ZXN0cyB0aGUgUmVnRXhwIG9ubHkgbmVlZHMgdG8gbWF0Y2ggcGFydCBvZiB0aGUgVVJMLiBGb3JcbiAqIHJlcXVlc3RzIGFnYWluc3QgdGhpcmQtcGFydHkgc2VydmVycywgeW91IG11c3QgZGVmaW5lIGEgUmVnRXhwIHRoYXQgbWF0Y2hlc1xuICogdGhlIHN0YXJ0IG9mIHRoZSBVUkwuXG4gKlxuICogQG1lbWJlcm9mIHdvcmtib3gtcm91dGluZ1xuICogQGV4dGVuZHMgd29ya2JveC1yb3V0aW5nLlJvdXRlXG4gKi9cbmNsYXNzIFJlZ0V4cFJvdXRlIGV4dGVuZHMgUm91dGUge1xuICAgIC8qKlxuICAgICAqIElmIHRoZSByZWd1bGFyIGV4cHJlc3Npb24gY29udGFpbnNcbiAgICAgKiBbY2FwdHVyZSBncm91cHNde0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1JlZ0V4cCNncm91cGluZy1iYWNrLXJlZmVyZW5jZXN9LFxuICAgICAqIHRoZSBjYXB0dXJlZCB2YWx1ZXMgd2lsbCBiZSBwYXNzZWQgdG8gdGhlXG4gICAgICoge0BsaW5rIHdvcmtib3gtcm91dGluZ35oYW5kbGVyQ2FsbGJhY2t9IGBwYXJhbXNgXG4gICAgICogYXJndW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlZ0V4cH0gcmVnRXhwIFRoZSByZWd1bGFyIGV4cHJlc3Npb24gdG8gbWF0Y2ggYWdhaW5zdCBVUkxzLlxuICAgICAqIEBwYXJhbSB7d29ya2JveC1yb3V0aW5nfmhhbmRsZXJDYWxsYmFja30gaGFuZGxlciBBIGNhbGxiYWNrXG4gICAgICogZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgUHJvbWlzZSByZXN1bHRpbmcgaW4gYSBSZXNwb25zZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW21ldGhvZD0nR0VUJ10gVGhlIEhUVFAgbWV0aG9kIHRvIG1hdGNoIHRoZSBSb3V0ZVxuICAgICAqIGFnYWluc3QuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVnRXhwLCBoYW5kbGVyLCBtZXRob2QpIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGFzc2VydC5pc0luc3RhbmNlKHJlZ0V4cCwgUmVnRXhwLCB7XG4gICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtcm91dGluZycsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnUmVnRXhwUm91dGUnLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAnY29uc3RydWN0b3InLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ3BhdHRlcm4nLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWF0Y2ggPSAoeyB1cmwgfSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVnRXhwLmV4ZWModXJsLmhyZWYpO1xuICAgICAgICAgICAgLy8gUmV0dXJuIGltbWVkaWF0ZWx5IGlmIHRoZXJlJ3Mgbm8gbWF0Y2guXG4gICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFJlcXVpcmUgdGhhdCB0aGUgbWF0Y2ggc3RhcnQgYXQgdGhlIGZpcnN0IGNoYXJhY3RlciBpbiB0aGUgVVJMIHN0cmluZ1xuICAgICAgICAgICAgLy8gaWYgaXQncyBhIGNyb3NzLW9yaWdpbiByZXF1ZXN0LlxuICAgICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvd29ya2JveC9pc3N1ZXMvMjgxIGZvciB0aGUgY29udGV4dFxuICAgICAgICAgICAgLy8gYmVoaW5kIHRoaXMgYmVoYXZpb3IuXG4gICAgICAgICAgICBpZiAodXJsLm9yaWdpbiAhPT0gbG9jYXRpb24ub3JpZ2luICYmIHJlc3VsdC5pbmRleCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiAnJHtyZWdFeHAudG9TdHJpbmcoKX0nIG9ubHkgcGFydGlhbGx5IG1hdGNoZWQgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgYWdhaW5zdCB0aGUgY3Jvc3Mtb3JpZ2luIFVSTCAnJHt1cmwudG9TdHJpbmcoKX0nLiBSZWdFeHBSb3V0ZSdzIHdpbGwgb25seSBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGBoYW5kbGUgY3Jvc3Mtb3JpZ2luIHJlcXVlc3RzIGlmIHRoZXkgbWF0Y2ggdGhlIGVudGlyZSBVUkwuYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIHRoZSByb3V0ZSBtYXRjaGVzLCBidXQgdGhlcmUgYXJlbid0IGFueSBjYXB0dXJlIGdyb3VwcyBkZWZpbmVkLCB0aGVuXG4gICAgICAgICAgICAvLyB0aGlzIHdpbGwgcmV0dXJuIFtdLCB3aGljaCBpcyB0cnV0aHkgYW5kIHRoZXJlZm9yZSBzdWZmaWNpZW50IHRvXG4gICAgICAgICAgICAvLyBpbmRpY2F0ZSBhIG1hdGNoLlxuICAgICAgICAgICAgLy8gSWYgdGhlcmUgYXJlIGNhcHR1cmUgZ3JvdXBzLCB0aGVuIGl0IHdpbGwgcmV0dXJuIHRoZWlyIHZhbHVlcy5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuc2xpY2UoMSk7XG4gICAgICAgIH07XG4gICAgICAgIHN1cGVyKG1hdGNoLCBoYW5kbGVyLCBtZXRob2QpO1xuICAgIH1cbn1cbmV4cG9ydCB7IFJlZ0V4cFJvdXRlIH07XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2Fzc2VydC5qcyc7XG5pbXBvcnQgeyBnZXRGcmllbmRseVVSTCB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9nZXRGcmllbmRseVVSTC5qcyc7XG5pbXBvcnQgeyBkZWZhdWx0TWV0aG9kIH0gZnJvbSAnLi91dGlscy9jb25zdGFudHMuanMnO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2xvZ2dlci5qcyc7XG5pbXBvcnQgeyBub3JtYWxpemVIYW5kbGVyIH0gZnJvbSAnLi91dGlscy9ub3JtYWxpemVIYW5kbGVyLmpzJztcbmltcG9ydCB7IFdvcmtib3hFcnJvciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9Xb3JrYm94RXJyb3IuanMnO1xuaW1wb3J0ICcuL192ZXJzaW9uLmpzJztcbi8qKlxuICogVGhlIFJvdXRlciBjYW4gYmUgdXNlZCB0byBwcm9jZXNzIGEgYEZldGNoRXZlbnRgIHVzaW5nIG9uZSBvciBtb3JlXG4gKiB7QGxpbmsgd29ya2JveC1yb3V0aW5nLlJvdXRlfSwgcmVzcG9uZGluZyB3aXRoIGEgYFJlc3BvbnNlYCBpZlxuICogYSBtYXRjaGluZyByb3V0ZSBleGlzdHMuXG4gKlxuICogSWYgbm8gcm91dGUgbWF0Y2hlcyBhIGdpdmVuIGEgcmVxdWVzdCwgdGhlIFJvdXRlciB3aWxsIHVzZSBhIFwiZGVmYXVsdFwiXG4gKiBoYW5kbGVyIGlmIG9uZSBpcyBkZWZpbmVkLlxuICpcbiAqIFNob3VsZCB0aGUgbWF0Y2hpbmcgUm91dGUgdGhyb3cgYW4gZXJyb3IsIHRoZSBSb3V0ZXIgd2lsbCB1c2UgYSBcImNhdGNoXCJcbiAqIGhhbmRsZXIgaWYgb25lIGlzIGRlZmluZWQgdG8gZ3JhY2VmdWxseSBkZWFsIHdpdGggaXNzdWVzIGFuZCByZXNwb25kIHdpdGggYVxuICogUmVxdWVzdC5cbiAqXG4gKiBJZiBhIHJlcXVlc3QgbWF0Y2hlcyBtdWx0aXBsZSByb3V0ZXMsIHRoZSAqKmVhcmxpZXN0KiogcmVnaXN0ZXJlZCByb3V0ZSB3aWxsXG4gKiBiZSB1c2VkIHRvIHJlc3BvbmQgdG8gdGhlIHJlcXVlc3QuXG4gKlxuICogQG1lbWJlcm9mIHdvcmtib3gtcm91dGluZ1xuICovXG5jbGFzcyBSb3V0ZXIge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IFJvdXRlci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fcm91dGVzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLl9kZWZhdWx0SGFuZGxlck1hcCA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybiB7TWFwPHN0cmluZywgQXJyYXk8d29ya2JveC1yb3V0aW5nLlJvdXRlPj59IHJvdXRlcyBBIGBNYXBgIG9mIEhUVFBcbiAgICAgKiBtZXRob2QgbmFtZSAoJ0dFVCcsIGV0Yy4pIHRvIGFuIGFycmF5IG9mIGFsbCB0aGUgY29ycmVzcG9uZGluZyBgUm91dGVgXG4gICAgICogaW5zdGFuY2VzIHRoYXQgYXJlIHJlZ2lzdGVyZWQuXG4gICAgICovXG4gICAgZ2V0IHJvdXRlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JvdXRlcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIGZldGNoIGV2ZW50IGxpc3RlbmVyIHRvIHJlc3BvbmQgdG8gZXZlbnRzIHdoZW4gYSByb3V0ZSBtYXRjaGVzXG4gICAgICogdGhlIGV2ZW50J3MgcmVxdWVzdC5cbiAgICAgKi9cbiAgICBhZGRGZXRjaExpc3RlbmVyKCkge1xuICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8yODM1NyNpc3N1ZWNvbW1lbnQtNDM2NDg0NzA1XG4gICAgICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignZmV0Y2gnLCAoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IHJlcXVlc3QgfSA9IGV2ZW50O1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VQcm9taXNlID0gdGhpcy5oYW5kbGVSZXF1ZXN0KHsgcmVxdWVzdCwgZXZlbnQgfSk7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2VQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucmVzcG9uZFdpdGgocmVzcG9uc2VQcm9taXNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbWVzc2FnZSBldmVudCBsaXN0ZW5lciBmb3IgVVJMcyB0byBjYWNoZSBmcm9tIHRoZSB3aW5kb3cuXG4gICAgICogVGhpcyBpcyB1c2VmdWwgdG8gY2FjaGUgcmVzb3VyY2VzIGxvYWRlZCBvbiB0aGUgcGFnZSBwcmlvciB0byB3aGVuIHRoZVxuICAgICAqIHNlcnZpY2Ugd29ya2VyIHN0YXJ0ZWQgY29udHJvbGxpbmcgaXQuXG4gICAgICpcbiAgICAgKiBUaGUgZm9ybWF0IG9mIHRoZSBtZXNzYWdlIGRhdGEgc2VudCBmcm9tIHRoZSB3aW5kb3cgc2hvdWxkIGJlIGFzIGZvbGxvd3MuXG4gICAgICogV2hlcmUgdGhlIGB1cmxzVG9DYWNoZWAgYXJyYXkgbWF5IGNvbnNpc3Qgb2YgVVJMIHN0cmluZ3Mgb3IgYW4gYXJyYXkgb2ZcbiAgICAgKiBVUkwgc3RyaW5nICsgYHJlcXVlc3RJbml0YCBvYmplY3QgKHRoZSBzYW1lIGFzIHlvdSdkIHBhc3MgdG8gYGZldGNoKClgKS5cbiAgICAgKlxuICAgICAqIGBgYFxuICAgICAqIHtcbiAgICAgKiAgIHR5cGU6ICdDQUNIRV9VUkxTJyxcbiAgICAgKiAgIHBheWxvYWQ6IHtcbiAgICAgKiAgICAgdXJsc1RvQ2FjaGU6IFtcbiAgICAgKiAgICAgICAnLi9zY3JpcHQxLmpzJyxcbiAgICAgKiAgICAgICAnLi9zY3JpcHQyLmpzJyxcbiAgICAgKiAgICAgICBbJy4vc2NyaXB0My5qcycsIHttb2RlOiAnbm8tY29ycyd9XSxcbiAgICAgKiAgICAgXSxcbiAgICAgKiAgIH0sXG4gICAgICogfVxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGFkZENhY2hlTGlzdGVuZXIoKSB7XG4gICAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzI4MzU3I2lzc3VlY29tbWVudC00MzY0ODQ3MDVcbiAgICAgICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKChldmVudCkgPT4ge1xuICAgICAgICAgICAgLy8gZXZlbnQuZGF0YSBpcyB0eXBlICdhbnknXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1tZW1iZXItYWNjZXNzXG4gICAgICAgICAgICBpZiAoZXZlbnQuZGF0YSAmJiBldmVudC5kYXRhLnR5cGUgPT09ICdDQUNIRV9VUkxTJykge1xuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFzc2lnbm1lbnRcbiAgICAgICAgICAgICAgICBjb25zdCB7IHBheWxvYWQgfSA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGBDYWNoaW5nIFVSTHMgZnJvbSB0aGUgd2luZG93YCwgcGF5bG9hZC51cmxzVG9DYWNoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVlc3RQcm9taXNlcyA9IFByb21pc2UuYWxsKHBheWxvYWQudXJsc1RvQ2FjaGUubWFwKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVudHJ5ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50cnkgPSBbZW50cnldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdCguLi5lbnRyeSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3QoeyByZXF1ZXN0LCBldmVudCB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyhwaGlsaXB3YWx0b24pOiBUeXBlU2NyaXB0IGVycm9ycyB3aXRob3V0IHRoaXMgdHlwZWNhc3QgZm9yXG4gICAgICAgICAgICAgICAgICAgIC8vIHNvbWUgcmVhc29uIChwcm9iYWJseSBhIGJ1ZykuIFRoZSByZWFsIHR5cGUgaGVyZSBzaG91bGQgd29yayBidXRcbiAgICAgICAgICAgICAgICAgICAgLy8gZG9lc24ndDogYEFycmF5PFByb21pc2U8UmVzcG9uc2U+IHwgdW5kZWZpbmVkPmAuXG4gICAgICAgICAgICAgICAgfSkpOyAvLyBUeXBlU2NyaXB0XG4gICAgICAgICAgICAgICAgZXZlbnQud2FpdFVudGlsKHJlcXVlc3RQcm9taXNlcyk7XG4gICAgICAgICAgICAgICAgLy8gSWYgYSBNZXNzYWdlQ2hhbm5lbCB3YXMgdXNlZCwgcmVwbHkgdG8gdGhlIG1lc3NhZ2Ugb24gc3VjY2Vzcy5cbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQucG9ydHMgJiYgZXZlbnQucG9ydHNbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdm9pZCByZXF1ZXN0UHJvbWlzZXMudGhlbigoKSA9PiBldmVudC5wb3J0c1swXS5wb3N0TWVzc2FnZSh0cnVlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFwcGx5IHRoZSByb3V0aW5nIHJ1bGVzIHRvIGEgRmV0Y2hFdmVudCBvYmplY3QgdG8gZ2V0IGEgUmVzcG9uc2UgZnJvbSBhblxuICAgICAqIGFwcHJvcHJpYXRlIFJvdXRlJ3MgaGFuZGxlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0fSBvcHRpb25zLnJlcXVlc3QgVGhlIHJlcXVlc3QgdG8gaGFuZGxlLlxuICAgICAqIEBwYXJhbSB7RXh0ZW5kYWJsZUV2ZW50fSBvcHRpb25zLmV2ZW50IFRoZSBldmVudCB0aGF0IHRyaWdnZXJlZCB0aGVcbiAgICAgKiAgICAgcmVxdWVzdC5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPFJlc3BvbnNlPnx1bmRlZmluZWR9IEEgcHJvbWlzZSBpcyByZXR1cm5lZCBpZiBhXG4gICAgICogICAgIHJlZ2lzdGVyZWQgcm91dGUgY2FuIGhhbmRsZSB0aGUgcmVxdWVzdC4gSWYgdGhlcmUgaXMgbm8gbWF0Y2hpbmdcbiAgICAgKiAgICAgcm91dGUgYW5kIHRoZXJlJ3Mgbm8gYGRlZmF1bHRIYW5kbGVyYCwgYHVuZGVmaW5lZGAgaXMgcmV0dXJuZWQuXG4gICAgICovXG4gICAgaGFuZGxlUmVxdWVzdCh7IHJlcXVlc3QsIGV2ZW50LCB9KSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBhc3NlcnQuaXNJbnN0YW5jZShyZXF1ZXN0LCBSZXF1ZXN0LCB7XG4gICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtcm91dGluZycsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnUm91dGVyJyxcbiAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ2hhbmRsZVJlcXVlc3QnLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ29wdGlvbnMucmVxdWVzdCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHJlcXVlc3QudXJsLCBsb2NhdGlvbi5ocmVmKTtcbiAgICAgICAgaWYgKCF1cmwucHJvdG9jb2wuc3RhcnRzV2l0aCgnaHR0cCcpKSB7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgV29ya2JveCBSb3V0ZXIgb25seSBzdXBwb3J0cyBVUkxzIHRoYXQgc3RhcnQgd2l0aCAnaHR0cCcuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2FtZU9yaWdpbiA9IHVybC5vcmlnaW4gPT09IGxvY2F0aW9uLm9yaWdpbjtcbiAgICAgICAgY29uc3QgeyBwYXJhbXMsIHJvdXRlIH0gPSB0aGlzLmZpbmRNYXRjaGluZ1JvdXRlKHtcbiAgICAgICAgICAgIGV2ZW50LFxuICAgICAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgICAgIHNhbWVPcmlnaW4sXG4gICAgICAgICAgICB1cmwsXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgaGFuZGxlciA9IHJvdXRlICYmIHJvdXRlLmhhbmRsZXI7XG4gICAgICAgIGNvbnN0IGRlYnVnTWVzc2FnZXMgPSBbXTtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgZGVidWdNZXNzYWdlcy5wdXNoKFtgRm91bmQgYSByb3V0ZSB0byBoYW5kbGUgdGhpcyByZXF1ZXN0OmAsIHJvdXRlXSk7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcykge1xuICAgICAgICAgICAgICAgICAgICBkZWJ1Z01lc3NhZ2VzLnB1c2goW1xuICAgICAgICAgICAgICAgICAgICAgICAgYFBhc3NpbmcgdGhlIGZvbGxvd2luZyBwYXJhbXMgdG8gdGhlIHJvdXRlJ3MgaGFuZGxlcjpgLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLFxuICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgd2UgZG9uJ3QgaGF2ZSBhIGhhbmRsZXIgYmVjYXVzZSB0aGVyZSB3YXMgbm8gbWF0Y2hpbmcgcm91dGUsIHRoZW5cbiAgICAgICAgLy8gZmFsbCBiYWNrIHRvIGRlZmF1bHRIYW5kbGVyIGlmIHRoYXQncyBkZWZpbmVkLlxuICAgICAgICBjb25zdCBtZXRob2QgPSByZXF1ZXN0Lm1ldGhvZDtcbiAgICAgICAgaWYgKCFoYW5kbGVyICYmIHRoaXMuX2RlZmF1bHRIYW5kbGVyTWFwLmhhcyhtZXRob2QpKSB7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIGRlYnVnTWVzc2FnZXMucHVzaChgRmFpbGVkIHRvIGZpbmQgYSBtYXRjaGluZyByb3V0ZS4gRmFsbGluZyBgICtcbiAgICAgICAgICAgICAgICAgICAgYGJhY2sgdG8gdGhlIGRlZmF1bHQgaGFuZGxlciBmb3IgJHttZXRob2R9LmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaGFuZGxlciA9IHRoaXMuX2RlZmF1bHRIYW5kbGVyTWFwLmdldChtZXRob2QpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaGFuZGxlcikge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICAvLyBObyBoYW5kbGVyIHNvIFdvcmtib3ggd2lsbCBkbyBub3RoaW5nLiBJZiBsb2dzIGlzIHNldCBvZiBkZWJ1Z1xuICAgICAgICAgICAgICAgIC8vIGkuZS4gdmVyYm9zZSwgd2Ugc2hvdWxkIHByaW50IG91dCB0aGlzIGluZm9ybWF0aW9uLlxuICAgICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgTm8gcm91dGUgZm91bmQgZm9yOiAke2dldEZyaWVuZGx5VVJMKHVybCl9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIC8vIFdlIGhhdmUgYSBoYW5kbGVyLCBtZWFuaW5nIFdvcmtib3ggaXMgZ29pbmcgdG8gaGFuZGxlIHRoZSByb3V0ZS5cbiAgICAgICAgICAgIC8vIHByaW50IHRoZSByb3V0aW5nIGRldGFpbHMgdG8gdGhlIGNvbnNvbGUuXG4gICAgICAgICAgICBsb2dnZXIuZ3JvdXBDb2xsYXBzZWQoYFJvdXRlciBpcyByZXNwb25kaW5nIHRvOiAke2dldEZyaWVuZGx5VVJMKHVybCl9YCk7XG4gICAgICAgICAgICBkZWJ1Z01lc3NhZ2VzLmZvckVhY2goKG1zZykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG1zZykpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyguLi5tc2cpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhtc2cpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbG9nZ2VyLmdyb3VwRW5kKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gV3JhcCBpbiB0cnkgYW5kIGNhdGNoIGluIGNhc2UgdGhlIGhhbmRsZSBtZXRob2QgdGhyb3dzIGEgc3luY2hyb25vdXNcbiAgICAgICAgLy8gZXJyb3IuIEl0IHNob3VsZCBzdGlsbCBjYWxsYmFjayB0byB0aGUgY2F0Y2ggaGFuZGxlci5cbiAgICAgICAgbGV0IHJlc3BvbnNlUHJvbWlzZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3BvbnNlUHJvbWlzZSA9IGhhbmRsZXIuaGFuZGxlKHsgdXJsLCByZXF1ZXN0LCBldmVudCwgcGFyYW1zIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlUHJvbWlzZSA9IFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gR2V0IHJvdXRlJ3MgY2F0Y2ggaGFuZGxlciwgaWYgaXQgZXhpc3RzXG4gICAgICAgIGNvbnN0IGNhdGNoSGFuZGxlciA9IHJvdXRlICYmIHJvdXRlLmNhdGNoSGFuZGxlcjtcbiAgICAgICAgaWYgKHJlc3BvbnNlUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UgJiZcbiAgICAgICAgICAgICh0aGlzLl9jYXRjaEhhbmRsZXIgfHwgY2F0Y2hIYW5kbGVyKSkge1xuICAgICAgICAgICAgcmVzcG9uc2VQcm9taXNlID0gcmVzcG9uc2VQcm9taXNlLmNhdGNoKGFzeW5jIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSdzIGEgcm91dGUgY2F0Y2ggaGFuZGxlciwgcHJvY2VzcyB0aGF0IGZpcnN0XG4gICAgICAgICAgICAgICAgaWYgKGNhdGNoSGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3RpbGwgaW5jbHVkZSBVUkwgaGVyZSBhcyBpdCB3aWxsIGJlIGFzeW5jIGZyb20gdGhlIGNvbnNvbGUgZ3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFuZCBtYXkgbm90IG1ha2Ugc2Vuc2Ugd2l0aG91dCB0aGUgVVJMXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZ3JvdXBDb2xsYXBzZWQoYEVycm9yIHRocm93biB3aGVuIHJlc3BvbmRpbmcgdG86IGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAgJHtnZXRGcmllbmRseVVSTCh1cmwpfS4gRmFsbGluZyBiYWNrIHRvIHJvdXRlJ3MgQ2F0Y2ggSGFuZGxlci5gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgRXJyb3IgdGhyb3duIGJ5OmAsIHJvdXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmdyb3VwRW5kKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBjYXRjaEhhbmRsZXIuaGFuZGxlKHsgdXJsLCByZXF1ZXN0LCBldmVudCwgcGFyYW1zIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChjYXRjaEVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhdGNoRXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnIgPSBjYXRjaEVycjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2F0Y2hIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTdGlsbCBpbmNsdWRlIFVSTCBoZXJlIGFzIGl0IHdpbGwgYmUgYXN5bmMgZnJvbSB0aGUgY29uc29sZSBncm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYW5kIG1heSBub3QgbWFrZSBzZW5zZSB3aXRob3V0IHRoZSBVUkxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2dlci5ncm91cENvbGxhcHNlZChgRXJyb3IgdGhyb3duIHdoZW4gcmVzcG9uZGluZyB0bzogYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYCAke2dldEZyaWVuZGx5VVJMKHVybCl9LiBGYWxsaW5nIGJhY2sgdG8gZ2xvYmFsIENhdGNoIEhhbmRsZXIuYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoYEVycm9yIHRocm93biBieTpgLCByb3V0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2dlci5ncm91cEVuZCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jYXRjaEhhbmRsZXIuaGFuZGxlKHsgdXJsLCByZXF1ZXN0LCBldmVudCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlUHJvbWlzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGEgcmVxdWVzdCBhbmQgVVJMIChhbmQgb3B0aW9uYWxseSBhbiBldmVudCkgYWdhaW5zdCB0aGUgbGlzdCBvZlxuICAgICAqIHJlZ2lzdGVyZWQgcm91dGVzLCBhbmQgaWYgdGhlcmUncyBhIG1hdGNoLCByZXR1cm5zIHRoZSBjb3JyZXNwb25kaW5nXG4gICAgICogcm91dGUgYWxvbmcgd2l0aCBhbnkgcGFyYW1zIGdlbmVyYXRlZCBieSB0aGUgbWF0Y2guXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7VVJMfSBvcHRpb25zLnVybFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5zYW1lT3JpZ2luIFRoZSByZXN1bHQgb2YgY29tcGFyaW5nIGB1cmwub3JpZ2luYFxuICAgICAqICAgICBhZ2FpbnN0IHRoZSBjdXJyZW50IG9yaWdpbi5cbiAgICAgKiBAcGFyYW0ge1JlcXVlc3R9IG9wdGlvbnMucmVxdWVzdCBUaGUgcmVxdWVzdCB0byBtYXRjaC5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBvcHRpb25zLmV2ZW50IFRoZSBjb3JyZXNwb25kaW5nIGV2ZW50LlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQW4gb2JqZWN0IHdpdGggYHJvdXRlYCBhbmQgYHBhcmFtc2AgcHJvcGVydGllcy5cbiAgICAgKiAgICAgVGhleSBhcmUgcG9wdWxhdGVkIGlmIGEgbWF0Y2hpbmcgcm91dGUgd2FzIGZvdW5kIG9yIGB1bmRlZmluZWRgXG4gICAgICogICAgIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBmaW5kTWF0Y2hpbmdSb3V0ZSh7IHVybCwgc2FtZU9yaWdpbiwgcmVxdWVzdCwgZXZlbnQsIH0pIHtcbiAgICAgICAgY29uc3Qgcm91dGVzID0gdGhpcy5fcm91dGVzLmdldChyZXF1ZXN0Lm1ldGhvZCkgfHwgW107XG4gICAgICAgIGZvciAoY29uc3Qgcm91dGUgb2Ygcm91dGVzKSB7XG4gICAgICAgICAgICBsZXQgcGFyYW1zO1xuICAgICAgICAgICAgLy8gcm91dGUubWF0Y2ggcmV0dXJucyB0eXBlIGFueSwgbm90IHBvc3NpYmxlIHRvIGNoYW5nZSByaWdodCBub3cuXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hc3NpZ25tZW50XG4gICAgICAgICAgICBjb25zdCBtYXRjaFJlc3VsdCA9IHJvdXRlLm1hdGNoKHsgdXJsLCBzYW1lT3JpZ2luLCByZXF1ZXN0LCBldmVudCB9KTtcbiAgICAgICAgICAgIGlmIChtYXRjaFJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdhcm4gZGV2ZWxvcGVycyB0aGF0IHVzaW5nIGFuIGFzeW5jIG1hdGNoQ2FsbGJhY2sgaXMgYWxtb3N0IGFsd2F5c1xuICAgICAgICAgICAgICAgICAgICAvLyBub3QgdGhlIHJpZ2h0IHRoaW5nIHRvIGRvLlxuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hSZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIud2FybihgV2hpbGUgcm91dGluZyAke2dldEZyaWVuZGx5VVJMKHVybCl9LCBhbiBhc3luYyBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgbWF0Y2hDYWxsYmFjayBmdW5jdGlvbiB3YXMgdXNlZC4gUGxlYXNlIGNvbnZlcnQgdGhlIGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBmb2xsb3dpbmcgcm91dGUgdG8gdXNlIGEgc3luY2hyb25vdXMgbWF0Y2hDYWxsYmFjayBmdW5jdGlvbjpgLCByb3V0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvd29ya2JveC9pc3N1ZXMvMjA3OVxuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFzc2lnbm1lbnRcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSBtYXRjaFJlc3VsdDtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJhbXMpICYmIHBhcmFtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSW5zdGVhZCBvZiBwYXNzaW5nIGFuIGVtcHR5IGFycmF5IGluIGFzIHBhcmFtcywgdXNlIHVuZGVmaW5lZC5cbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChtYXRjaFJlc3VsdC5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0ICYmIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMobWF0Y2hSZXN1bHQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJbnN0ZWFkIG9mIHBhc3NpbmcgYW4gZW1wdHkgb2JqZWN0IGluIGFzIHBhcmFtcywgdXNlIHVuZGVmaW5lZC5cbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgbWF0Y2hSZXN1bHQgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBGb3IgdGhlIGJvb2xlYW4gdmFsdWUgdHJ1ZSAocmF0aGVyIHRoYW4ganVzdCBzb21ldGhpbmcgdHJ1dGgteSksXG4gICAgICAgICAgICAgICAgICAgIC8vIGRvbid0IHNldCBwYXJhbXMuXG4gICAgICAgICAgICAgICAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3dvcmtib3gvcHVsbC8yMTM0I2lzc3VlY29tbWVudC01MTM5MjQzNTNcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gZWFybHkgaWYgaGF2ZSBhIG1hdGNoLlxuICAgICAgICAgICAgICAgIHJldHVybiB7IHJvdXRlLCBwYXJhbXMgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBJZiBubyBtYXRjaCB3YXMgZm91bmQgYWJvdmUsIHJldHVybiBhbmQgZW1wdHkgb2JqZWN0LlxuICAgICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlZmluZSBhIGRlZmF1bHQgYGhhbmRsZXJgIHRoYXQncyBjYWxsZWQgd2hlbiBubyByb3V0ZXMgZXhwbGljaXRseVxuICAgICAqIG1hdGNoIHRoZSBpbmNvbWluZyByZXF1ZXN0LlxuICAgICAqXG4gICAgICogRWFjaCBIVFRQIG1ldGhvZCAoJ0dFVCcsICdQT1NUJywgZXRjLikgZ2V0cyBpdHMgb3duIGRlZmF1bHQgaGFuZGxlci5cbiAgICAgKlxuICAgICAqIFdpdGhvdXQgYSBkZWZhdWx0IGhhbmRsZXIsIHVubWF0Y2hlZCByZXF1ZXN0cyB3aWxsIGdvIGFnYWluc3QgdGhlXG4gICAgICogbmV0d29yayBhcyBpZiB0aGVyZSB3ZXJlIG5vIHNlcnZpY2Ugd29ya2VyIHByZXNlbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3dvcmtib3gtcm91dGluZ35oYW5kbGVyQ2FsbGJhY2t9IGhhbmRsZXIgQSBjYWxsYmFja1xuICAgICAqIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIFByb21pc2UgcmVzdWx0aW5nIGluIGEgUmVzcG9uc2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFttZXRob2Q9J0dFVCddIFRoZSBIVFRQIG1ldGhvZCB0byBhc3NvY2lhdGUgd2l0aCB0aGlzXG4gICAgICogZGVmYXVsdCBoYW5kbGVyLiBFYWNoIG1ldGhvZCBoYXMgaXRzIG93biBkZWZhdWx0LlxuICAgICAqL1xuICAgIHNldERlZmF1bHRIYW5kbGVyKGhhbmRsZXIsIG1ldGhvZCA9IGRlZmF1bHRNZXRob2QpIHtcbiAgICAgICAgdGhpcy5fZGVmYXVsdEhhbmRsZXJNYXAuc2V0KG1ldGhvZCwgbm9ybWFsaXplSGFuZGxlcihoYW5kbGVyKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIElmIGEgUm91dGUgdGhyb3dzIGFuIGVycm9yIHdoaWxlIGhhbmRsaW5nIGEgcmVxdWVzdCwgdGhpcyBgaGFuZGxlcmBcbiAgICAgKiB3aWxsIGJlIGNhbGxlZCBhbmQgZ2l2ZW4gYSBjaGFuY2UgdG8gcHJvdmlkZSBhIHJlc3BvbnNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHt3b3JrYm94LXJvdXRpbmd+aGFuZGxlckNhbGxiYWNrfSBoYW5kbGVyIEEgY2FsbGJhY2tcbiAgICAgKiBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBQcm9taXNlIHJlc3VsdGluZyBpbiBhIFJlc3BvbnNlLlxuICAgICAqL1xuICAgIHNldENhdGNoSGFuZGxlcihoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMuX2NhdGNoSGFuZGxlciA9IG5vcm1hbGl6ZUhhbmRsZXIoaGFuZGxlcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBhIHJvdXRlIHdpdGggdGhlIHJvdXRlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7d29ya2JveC1yb3V0aW5nLlJvdXRlfSByb3V0ZSBUaGUgcm91dGUgdG8gcmVnaXN0ZXIuXG4gICAgICovXG4gICAgcmVnaXN0ZXJSb3V0ZShyb3V0ZSkge1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgYXNzZXJ0LmlzVHlwZShyb3V0ZSwgJ29iamVjdCcsIHtcbiAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1yb3V0aW5nJyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdSb3V0ZXInLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAncmVnaXN0ZXJSb3V0ZScsXG4gICAgICAgICAgICAgICAgcGFyYW1OYW1lOiAncm91dGUnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3NlcnQuaGFzTWV0aG9kKHJvdXRlLCAnbWF0Y2gnLCB7XG4gICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtcm91dGluZycsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnUm91dGVyJyxcbiAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ3JlZ2lzdGVyUm91dGUnLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ3JvdXRlJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXNzZXJ0LmlzVHlwZShyb3V0ZS5oYW5kbGVyLCAnb2JqZWN0Jywge1xuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LXJvdXRpbmcnLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ1JvdXRlcicsXG4gICAgICAgICAgICAgICAgZnVuY05hbWU6ICdyZWdpc3RlclJvdXRlJyxcbiAgICAgICAgICAgICAgICBwYXJhbU5hbWU6ICdyb3V0ZScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFzc2VydC5oYXNNZXRob2Qocm91dGUuaGFuZGxlciwgJ2hhbmRsZScsIHtcbiAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1yb3V0aW5nJyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdSb3V0ZXInLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAncmVnaXN0ZXJSb3V0ZScsXG4gICAgICAgICAgICAgICAgcGFyYW1OYW1lOiAncm91dGUuaGFuZGxlcicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFzc2VydC5pc1R5cGUocm91dGUubWV0aG9kLCAnc3RyaW5nJywge1xuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LXJvdXRpbmcnLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ1JvdXRlcicsXG4gICAgICAgICAgICAgICAgZnVuY05hbWU6ICdyZWdpc3RlclJvdXRlJyxcbiAgICAgICAgICAgICAgICBwYXJhbU5hbWU6ICdyb3V0ZS5tZXRob2QnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9yb3V0ZXMuaGFzKHJvdXRlLm1ldGhvZCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlcy5zZXQocm91dGUubWV0aG9kLCBbXSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gR2l2ZSBwcmVjZWRlbmNlIHRvIGFsbCBvZiB0aGUgZWFybGllciByb3V0ZXMgYnkgYWRkaW5nIHRoaXMgYWRkaXRpb25hbFxuICAgICAgICAvLyByb3V0ZSB0byB0aGUgZW5kIG9mIHRoZSBhcnJheS5cbiAgICAgICAgdGhpcy5fcm91dGVzLmdldChyb3V0ZS5tZXRob2QpLnB1c2gocm91dGUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVbnJlZ2lzdGVycyBhIHJvdXRlIHdpdGggdGhlIHJvdXRlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7d29ya2JveC1yb3V0aW5nLlJvdXRlfSByb3V0ZSBUaGUgcm91dGUgdG8gdW5yZWdpc3Rlci5cbiAgICAgKi9cbiAgICB1bnJlZ2lzdGVyUm91dGUocm91dGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb3V0ZXMuaGFzKHJvdXRlLm1ldGhvZCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBXb3JrYm94RXJyb3IoJ3VucmVnaXN0ZXItcm91dGUtYnV0LW5vdC1mb3VuZC13aXRoLW1ldGhvZCcsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IHJvdXRlLm1ldGhvZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJvdXRlSW5kZXggPSB0aGlzLl9yb3V0ZXMuZ2V0KHJvdXRlLm1ldGhvZCkuaW5kZXhPZihyb3V0ZSk7XG4gICAgICAgIGlmIChyb3V0ZUluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlcy5nZXQocm91dGUubWV0aG9kKS5zcGxpY2Uocm91dGVJbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgV29ya2JveEVycm9yKCd1bnJlZ2lzdGVyLXJvdXRlLXJvdXRlLW5vdC1yZWdpc3RlcmVkJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgeyBSb3V0ZXIgfTtcbiIsICIvKlxuICBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICcuLi9Sb3V0ZXIuanMnO1xuaW1wb3J0ICcuLi9fdmVyc2lvbi5qcyc7XG5sZXQgZGVmYXVsdFJvdXRlcjtcbi8qKlxuICogQ3JlYXRlcyBhIG5ldywgc2luZ2xldG9uIFJvdXRlciBpbnN0YW5jZSBpZiBvbmUgZG9lcyBub3QgZXhpc3QuIElmIG9uZVxuICogZG9lcyBhbHJlYWR5IGV4aXN0LCB0aGF0IGluc3RhbmNlIGlzIHJldHVybmVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcmV0dXJuIHtSb3V0ZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRPckNyZWF0ZURlZmF1bHRSb3V0ZXIgPSAoKSA9PiB7XG4gICAgaWYgKCFkZWZhdWx0Um91dGVyKSB7XG4gICAgICAgIGRlZmF1bHRSb3V0ZXIgPSBuZXcgUm91dGVyKCk7XG4gICAgICAgIC8vIFRoZSBoZWxwZXJzIHRoYXQgdXNlIHRoZSBkZWZhdWx0IFJvdXRlciBhc3N1bWUgdGhlc2UgbGlzdGVuZXJzIGV4aXN0LlxuICAgICAgICBkZWZhdWx0Um91dGVyLmFkZEZldGNoTGlzdGVuZXIoKTtcbiAgICAgICAgZGVmYXVsdFJvdXRlci5hZGRDYWNoZUxpc3RlbmVyKCk7XG4gICAgfVxuICAgIHJldHVybiBkZWZhdWx0Um91dGVyO1xufTtcbiIsICIvKlxuICBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvbG9nZ2VyLmpzJztcbmltcG9ydCB7IFdvcmtib3hFcnJvciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9Xb3JrYm94RXJyb3IuanMnO1xuaW1wb3J0IHsgUm91dGUgfSBmcm9tICcuL1JvdXRlLmpzJztcbmltcG9ydCB7IFJlZ0V4cFJvdXRlIH0gZnJvbSAnLi9SZWdFeHBSb3V0ZS5qcyc7XG5pbXBvcnQgeyBnZXRPckNyZWF0ZURlZmF1bHRSb3V0ZXIgfSBmcm9tICcuL3V0aWxzL2dldE9yQ3JlYXRlRGVmYXVsdFJvdXRlci5qcyc7XG5pbXBvcnQgJy4vX3ZlcnNpb24uanMnO1xuLyoqXG4gKiBFYXNpbHkgcmVnaXN0ZXIgYSBSZWdFeHAsIHN0cmluZywgb3IgZnVuY3Rpb24gd2l0aCBhIGNhY2hpbmdcbiAqIHN0cmF0ZWd5IHRvIGEgc2luZ2xldG9uIFJvdXRlciBpbnN0YW5jZS5cbiAqXG4gKiBUaGlzIG1ldGhvZCB3aWxsIGdlbmVyYXRlIGEgUm91dGUgZm9yIHlvdSBpZiBuZWVkZWQgYW5kXG4gKiBjYWxsIHtAbGluayB3b3JrYm94LXJvdXRpbmcuUm91dGVyI3JlZ2lzdGVyUm91dGV9LlxuICpcbiAqIEBwYXJhbSB7UmVnRXhwfHN0cmluZ3x3b3JrYm94LXJvdXRpbmcuUm91dGV+bWF0Y2hDYWxsYmFja3x3b3JrYm94LXJvdXRpbmcuUm91dGV9IGNhcHR1cmVcbiAqIElmIHRoZSBjYXB0dXJlIHBhcmFtIGlzIGEgYFJvdXRlYCwgYWxsIG90aGVyIGFyZ3VtZW50cyB3aWxsIGJlIGlnbm9yZWQuXG4gKiBAcGFyYW0ge3dvcmtib3gtcm91dGluZ35oYW5kbGVyQ2FsbGJhY2t9IFtoYW5kbGVyXSBBIGNhbGxiYWNrXG4gKiBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBQcm9taXNlIHJlc3VsdGluZyBpbiBhIFJlc3BvbnNlLiBUaGlzIHBhcmFtZXRlclxuICogaXMgcmVxdWlyZWQgaWYgYGNhcHR1cmVgIGlzIG5vdCBhIGBSb3V0ZWAgb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmd9IFttZXRob2Q9J0dFVCddIFRoZSBIVFRQIG1ldGhvZCB0byBtYXRjaCB0aGUgUm91dGVcbiAqIGFnYWluc3QuXG4gKiBAcmV0dXJuIHt3b3JrYm94LXJvdXRpbmcuUm91dGV9IFRoZSBnZW5lcmF0ZWQgYFJvdXRlYC5cbiAqXG4gKiBAbWVtYmVyb2Ygd29ya2JveC1yb3V0aW5nXG4gKi9cbmZ1bmN0aW9uIHJlZ2lzdGVyUm91dGUoY2FwdHVyZSwgaGFuZGxlciwgbWV0aG9kKSB7XG4gICAgbGV0IHJvdXRlO1xuICAgIGlmICh0eXBlb2YgY2FwdHVyZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgY2FwdHVyZVVybCA9IG5ldyBVUkwoY2FwdHVyZSwgbG9jYXRpb24uaHJlZik7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBpZiAoIShjYXB0dXJlLnN0YXJ0c1dpdGgoJy8nKSB8fCBjYXB0dXJlLnN0YXJ0c1dpdGgoJ2h0dHAnKSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgV29ya2JveEVycm9yKCdpbnZhbGlkLXN0cmluZycsIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtcm91dGluZycsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAncmVnaXN0ZXJSb3V0ZScsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ2NhcHR1cmUnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gV2Ugd2FudCB0byBjaGVjayBpZiBFeHByZXNzLXN0eWxlIHdpbGRjYXJkcyBhcmUgaW4gdGhlIHBhdGhuYW1lIG9ubHkuXG4gICAgICAgICAgICAvLyBUT0RPOiBSZW1vdmUgdGhpcyBsb2cgbWVzc2FnZSBpbiB2NC5cbiAgICAgICAgICAgIGNvbnN0IHZhbHVlVG9DaGVjayA9IGNhcHR1cmUuc3RhcnRzV2l0aCgnaHR0cCcpXG4gICAgICAgICAgICAgICAgPyBjYXB0dXJlVXJsLnBhdGhuYW1lXG4gICAgICAgICAgICAgICAgOiBjYXB0dXJlO1xuICAgICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9waWxsYXJqcy9wYXRoLXRvLXJlZ2V4cCNwYXJhbWV0ZXJzXG4gICAgICAgICAgICBjb25zdCB3aWxkY2FyZHMgPSAnWyo6PytdJztcbiAgICAgICAgICAgIGlmIChuZXcgUmVnRXhwKGAke3dpbGRjYXJkc31gKS5leGVjKHZhbHVlVG9DaGVjaykpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoYFRoZSAnJGNhcHR1cmUnIHBhcmFtZXRlciBjb250YWlucyBhbiBFeHByZXNzLXN0eWxlIHdpbGRjYXJkIGAgK1xuICAgICAgICAgICAgICAgICAgICBgY2hhcmFjdGVyICgke3dpbGRjYXJkc30pLiBTdHJpbmdzIGFyZSBub3cgYWx3YXlzIGludGVycHJldGVkIGFzIGAgK1xuICAgICAgICAgICAgICAgICAgICBgZXhhY3QgbWF0Y2hlczsgdXNlIGEgUmVnRXhwIGZvciBwYXJ0aWFsIG9yIHdpbGRjYXJkIG1hdGNoZXMuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWF0Y2hDYWxsYmFjayA9ICh7IHVybCB9KSA9PiB7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIGlmICh1cmwucGF0aG5hbWUgPT09IGNhcHR1cmVVcmwucGF0aG5hbWUgJiZcbiAgICAgICAgICAgICAgICAgICAgdXJsLm9yaWdpbiAhPT0gY2FwdHVyZVVybC5vcmlnaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGAke2NhcHR1cmV9IG9ubHkgcGFydGlhbGx5IG1hdGNoZXMgdGhlIGNyb3NzLW9yaWdpbiBVUkwgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgJHt1cmwudG9TdHJpbmcoKX0uIFRoaXMgcm91dGUgd2lsbCBvbmx5IGhhbmRsZSBjcm9zcy1vcmlnaW4gcmVxdWVzdHMgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgaWYgdGhleSBtYXRjaCB0aGUgZW50aXJlIFVSTC5gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdXJsLmhyZWYgPT09IGNhcHR1cmVVcmwuaHJlZjtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gSWYgYGNhcHR1cmVgIGlzIGEgc3RyaW5nIHRoZW4gYGhhbmRsZXJgIGFuZCBgbWV0aG9kYCBtdXN0IGJlIHByZXNlbnQuXG4gICAgICAgIHJvdXRlID0gbmV3IFJvdXRlKG1hdGNoQ2FsbGJhY2ssIGhhbmRsZXIsIG1ldGhvZCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNhcHR1cmUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgLy8gSWYgYGNhcHR1cmVgIGlzIGEgYFJlZ0V4cGAgdGhlbiBgaGFuZGxlcmAgYW5kIGBtZXRob2RgIG11c3QgYmUgcHJlc2VudC5cbiAgICAgICAgcm91dGUgPSBuZXcgUmVnRXhwUm91dGUoY2FwdHVyZSwgaGFuZGxlciwgbWV0aG9kKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGNhcHR1cmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gSWYgYGNhcHR1cmVgIGlzIGEgZnVuY3Rpb24gdGhlbiBgaGFuZGxlcmAgYW5kIGBtZXRob2RgIG11c3QgYmUgcHJlc2VudC5cbiAgICAgICAgcm91dGUgPSBuZXcgUm91dGUoY2FwdHVyZSwgaGFuZGxlciwgbWV0aG9kKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY2FwdHVyZSBpbnN0YW5jZW9mIFJvdXRlKSB7XG4gICAgICAgIHJvdXRlID0gY2FwdHVyZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBXb3JrYm94RXJyb3IoJ3Vuc3VwcG9ydGVkLXJvdXRlLXR5cGUnLCB7XG4gICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1yb3V0aW5nJyxcbiAgICAgICAgICAgIGZ1bmNOYW1lOiAncmVnaXN0ZXJSb3V0ZScsXG4gICAgICAgICAgICBwYXJhbU5hbWU6ICdjYXB0dXJlJyxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IGRlZmF1bHRSb3V0ZXIgPSBnZXRPckNyZWF0ZURlZmF1bHRSb3V0ZXIoKTtcbiAgICBkZWZhdWx0Um91dGVyLnJlZ2lzdGVyUm91dGUocm91dGUpO1xuICAgIHJldHVybiByb3V0ZTtcbn1cbmV4cG9ydCB7IHJlZ2lzdGVyUm91dGUgfTtcbiIsICIvKlxuICBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbi8qKlxuICogUmVtb3ZlcyBhbnkgVVJMIHNlYXJjaCBwYXJhbWV0ZXJzIHRoYXQgc2hvdWxkIGJlIGlnbm9yZWQuXG4gKlxuICogQHBhcmFtIHtVUkx9IHVybE9iamVjdCBUaGUgb3JpZ2luYWwgVVJMLlxuICogQHBhcmFtIHtBcnJheTxSZWdFeHA+fSBpZ25vcmVVUkxQYXJhbWV0ZXJzTWF0Y2hpbmcgUmVnRXhwcyB0byB0ZXN0IGFnYWluc3RcbiAqIGVhY2ggc2VhcmNoIHBhcmFtZXRlciBuYW1lLiBNYXRjaGVzIG1lYW4gdGhhdCB0aGUgc2VhcmNoIHBhcmFtZXRlciBzaG91bGQgYmVcbiAqIGlnbm9yZWQuXG4gKiBAcmV0dXJuIHtVUkx9IFRoZSBVUkwgd2l0aCBhbnkgaWdub3JlZCBzZWFyY2ggcGFyYW1ldGVycyByZW1vdmVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbWVtYmVyb2Ygd29ya2JveC1wcmVjYWNoaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVJZ25vcmVkU2VhcmNoUGFyYW1zKHVybE9iamVjdCwgaWdub3JlVVJMUGFyYW1ldGVyc01hdGNoaW5nID0gW10pIHtcbiAgICAvLyBDb252ZXJ0IHRoZSBpdGVyYWJsZSBpbnRvIGFuIGFycmF5IGF0IHRoZSBzdGFydCBvZiB0aGUgbG9vcCB0byBtYWtlIHN1cmVcbiAgICAvLyBkZWxldGlvbiBkb2Vzbid0IG1lc3MgdXAgaXRlcmF0aW9uLlxuICAgIGZvciAoY29uc3QgcGFyYW1OYW1lIG9mIFsuLi51cmxPYmplY3Quc2VhcmNoUGFyYW1zLmtleXMoKV0pIHtcbiAgICAgICAgaWYgKGlnbm9yZVVSTFBhcmFtZXRlcnNNYXRjaGluZy5zb21lKChyZWdFeHApID0+IHJlZ0V4cC50ZXN0KHBhcmFtTmFtZSkpKSB7XG4gICAgICAgICAgICB1cmxPYmplY3Quc2VhcmNoUGFyYW1zLmRlbGV0ZShwYXJhbU5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1cmxPYmplY3Q7XG59XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgcmVtb3ZlSWdub3JlZFNlYXJjaFBhcmFtcyB9IGZyb20gJy4vcmVtb3ZlSWdub3JlZFNlYXJjaFBhcmFtcy5qcyc7XG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbi8qKlxuICogR2VuZXJhdG9yIGZ1bmN0aW9uIHRoYXQgeWllbGRzIHBvc3NpYmxlIHZhcmlhdGlvbnMgb24gdGhlIG9yaWdpbmFsIFVSTCB0b1xuICogY2hlY2ssIG9uZSBhdCBhIHRpbWUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqXG4gKiBAcHJpdmF0ZVxuICogQG1lbWJlcm9mIHdvcmtib3gtcHJlY2FjaGluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24qIGdlbmVyYXRlVVJMVmFyaWF0aW9ucyh1cmwsIHsgaWdub3JlVVJMUGFyYW1ldGVyc01hdGNoaW5nID0gWy9edXRtXy8sIC9eZmJjbGlkJC9dLCBkaXJlY3RvcnlJbmRleCA9ICdpbmRleC5odG1sJywgY2xlYW5VUkxzID0gdHJ1ZSwgdXJsTWFuaXB1bGF0aW9uLCB9ID0ge30pIHtcbiAgICBjb25zdCB1cmxPYmplY3QgPSBuZXcgVVJMKHVybCwgbG9jYXRpb24uaHJlZik7XG4gICAgdXJsT2JqZWN0Lmhhc2ggPSAnJztcbiAgICB5aWVsZCB1cmxPYmplY3QuaHJlZjtcbiAgICBjb25zdCB1cmxXaXRob3V0SWdub3JlZFBhcmFtcyA9IHJlbW92ZUlnbm9yZWRTZWFyY2hQYXJhbXModXJsT2JqZWN0LCBpZ25vcmVVUkxQYXJhbWV0ZXJzTWF0Y2hpbmcpO1xuICAgIHlpZWxkIHVybFdpdGhvdXRJZ25vcmVkUGFyYW1zLmhyZWY7XG4gICAgaWYgKGRpcmVjdG9yeUluZGV4ICYmIHVybFdpdGhvdXRJZ25vcmVkUGFyYW1zLnBhdGhuYW1lLmVuZHNXaXRoKCcvJykpIHtcbiAgICAgICAgY29uc3QgZGlyZWN0b3J5VVJMID0gbmV3IFVSTCh1cmxXaXRob3V0SWdub3JlZFBhcmFtcy5ocmVmKTtcbiAgICAgICAgZGlyZWN0b3J5VVJMLnBhdGhuYW1lICs9IGRpcmVjdG9yeUluZGV4O1xuICAgICAgICB5aWVsZCBkaXJlY3RvcnlVUkwuaHJlZjtcbiAgICB9XG4gICAgaWYgKGNsZWFuVVJMcykge1xuICAgICAgICBjb25zdCBjbGVhblVSTCA9IG5ldyBVUkwodXJsV2l0aG91dElnbm9yZWRQYXJhbXMuaHJlZik7XG4gICAgICAgIGNsZWFuVVJMLnBhdGhuYW1lICs9ICcuaHRtbCc7XG4gICAgICAgIHlpZWxkIGNsZWFuVVJMLmhyZWY7XG4gICAgfVxuICAgIGlmICh1cmxNYW5pcHVsYXRpb24pIHtcbiAgICAgICAgY29uc3QgYWRkaXRpb25hbFVSTHMgPSB1cmxNYW5pcHVsYXRpb24oeyB1cmw6IHVybE9iamVjdCB9KTtcbiAgICAgICAgZm9yIChjb25zdCB1cmxUb0F0dGVtcHQgb2YgYWRkaXRpb25hbFVSTHMpIHtcbiAgICAgICAgICAgIHlpZWxkIHVybFRvQXR0ZW1wdC5ocmVmO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwgIi8qXG4gIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9sb2dnZXIuanMnO1xuaW1wb3J0IHsgZ2V0RnJpZW5kbHlVUkwgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvZ2V0RnJpZW5kbHlVUkwuanMnO1xuaW1wb3J0IHsgUm91dGUgfSBmcm9tICd3b3JrYm94LXJvdXRpbmcvUm91dGUuanMnO1xuaW1wb3J0IHsgZ2VuZXJhdGVVUkxWYXJpYXRpb25zIH0gZnJvbSAnLi91dGlscy9nZW5lcmF0ZVVSTFZhcmlhdGlvbnMuanMnO1xuaW1wb3J0ICcuL192ZXJzaW9uLmpzJztcbi8qKlxuICogQSBzdWJjbGFzcyBvZiB7QGxpbmsgd29ya2JveC1yb3V0aW5nLlJvdXRlfSB0aGF0IHRha2VzIGFcbiAqIHtAbGluayB3b3JrYm94LXByZWNhY2hpbmcuUHJlY2FjaGVDb250cm9sbGVyfVxuICogaW5zdGFuY2UgYW5kIHVzZXMgaXQgdG8gbWF0Y2ggaW5jb21pbmcgcmVxdWVzdHMgYW5kIGhhbmRsZSBmZXRjaGluZ1xuICogcmVzcG9uc2VzIGZyb20gdGhlIHByZWNhY2hlLlxuICpcbiAqIEBtZW1iZXJvZiB3b3JrYm94LXByZWNhY2hpbmdcbiAqIEBleHRlbmRzIHdvcmtib3gtcm91dGluZy5Sb3V0ZVxuICovXG5jbGFzcyBQcmVjYWNoZVJvdXRlIGV4dGVuZHMgUm91dGUge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7UHJlY2FjaGVDb250cm9sbGVyfSBwcmVjYWNoZUNvbnRyb2xsZXIgQSBgUHJlY2FjaGVDb250cm9sbGVyYFxuICAgICAqIGluc3RhbmNlIHVzZWQgdG8gYm90aCBtYXRjaCByZXF1ZXN0cyBhbmQgcmVzcG9uZCB0byBmZXRjaCBldmVudHMuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBPcHRpb25zIHRvIGNvbnRyb2wgaG93IHJlcXVlc3RzIGFyZSBtYXRjaGVkXG4gICAgICogYWdhaW5zdCB0aGUgbGlzdCBvZiBwcmVjYWNoZWQgVVJMcy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuZGlyZWN0b3J5SW5kZXg9aW5kZXguaHRtbF0gVGhlIGBkaXJlY3RvcnlJbmRleGAgd2lsbFxuICAgICAqIGNoZWNrIGNhY2hlIGVudHJpZXMgZm9yIGEgVVJMcyBlbmRpbmcgd2l0aCAnLycgdG8gc2VlIGlmIHRoZXJlIGlzIGEgaGl0IHdoZW5cbiAgICAgKiBhcHBlbmRpbmcgdGhlIGBkaXJlY3RvcnlJbmRleGAgdmFsdWUuXG4gICAgICogQHBhcmFtIHtBcnJheTxSZWdFeHA+fSBbb3B0aW9ucy5pZ25vcmVVUkxQYXJhbWV0ZXJzTWF0Y2hpbmc9Wy9edXRtXy8sIC9eZmJjbGlkJC9dXSBBblxuICAgICAqIGFycmF5IG9mIHJlZ2V4J3MgdG8gcmVtb3ZlIHNlYXJjaCBwYXJhbXMgd2hlbiBsb29raW5nIGZvciBhIGNhY2hlIG1hdGNoLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuY2xlYW5VUkxzPXRydWVdIFRoZSBgY2xlYW5VUkxzYCBvcHRpb24gd2lsbFxuICAgICAqIGNoZWNrIHRoZSBjYWNoZSBmb3IgdGhlIFVSTCB3aXRoIGEgYC5odG1sYCBhZGRlZCB0byB0aGUgZW5kIG9mIHRoZSBlbmQuXG4gICAgICogQHBhcmFtIHt3b3JrYm94LXByZWNhY2hpbmd+dXJsTWFuaXB1bGF0aW9ufSBbb3B0aW9ucy51cmxNYW5pcHVsYXRpb25dXG4gICAgICogVGhpcyBpcyBhIGZ1bmN0aW9uIHRoYXQgc2hvdWxkIHRha2UgYSBVUkwgYW5kIHJldHVybiBhbiBhcnJheSBvZlxuICAgICAqIGFsdGVybmF0aXZlIFVSTHMgdGhhdCBzaG91bGQgYmUgY2hlY2tlZCBmb3IgcHJlY2FjaGUgbWF0Y2hlcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwcmVjYWNoZUNvbnRyb2xsZXIsIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSAoeyByZXF1ZXN0LCB9KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1cmxzVG9DYWNoZUtleXMgPSBwcmVjYWNoZUNvbnRyb2xsZXIuZ2V0VVJMc1RvQ2FjaGVLZXlzKCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHBvc3NpYmxlVVJMIG9mIGdlbmVyYXRlVVJMVmFyaWF0aW9ucyhyZXF1ZXN0LnVybCwgb3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjYWNoZUtleSA9IHVybHNUb0NhY2hlS2V5cy5nZXQocG9zc2libGVVUkwpO1xuICAgICAgICAgICAgICAgIGlmIChjYWNoZUtleSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnRlZ3JpdHkgPSBwcmVjYWNoZUNvbnRyb2xsZXIuZ2V0SW50ZWdyaXR5Rm9yQ2FjaGVLZXkoY2FjaGVLZXkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBjYWNoZUtleSwgaW50ZWdyaXR5IH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoYFByZWNhY2hpbmcgZGlkIG5vdCBmaW5kIGEgbWF0Y2ggZm9yIGAgKyBnZXRGcmllbmRseVVSTChyZXF1ZXN0LnVybCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgICAgICBzdXBlcihtYXRjaCwgcHJlY2FjaGVDb250cm9sbGVyLnN0cmF0ZWd5KTtcbiAgICB9XG59XG5leHBvcnQgeyBQcmVjYWNoZVJvdXRlIH07XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IHJlZ2lzdGVyUm91dGUgfSBmcm9tICd3b3JrYm94LXJvdXRpbmcvcmVnaXN0ZXJSb3V0ZS5qcyc7XG5pbXBvcnQgeyBnZXRPckNyZWF0ZVByZWNhY2hlQ29udHJvbGxlciB9IGZyb20gJy4vdXRpbHMvZ2V0T3JDcmVhdGVQcmVjYWNoZUNvbnRyb2xsZXIuanMnO1xuaW1wb3J0IHsgUHJlY2FjaGVSb3V0ZSB9IGZyb20gJy4vUHJlY2FjaGVSb3V0ZS5qcyc7XG5pbXBvcnQgJy4vX3ZlcnNpb24uanMnO1xuLyoqXG4gKiBBZGQgYSBgZmV0Y2hgIGxpc3RlbmVyIHRvIHRoZSBzZXJ2aWNlIHdvcmtlciB0aGF0IHdpbGxcbiAqIHJlc3BvbmQgdG9cbiAqIFtuZXR3b3JrIHJlcXVlc3RzXXtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvU2VydmljZV9Xb3JrZXJfQVBJL1VzaW5nX1NlcnZpY2VfV29ya2VycyNDdXN0b21fcmVzcG9uc2VzX3RvX3JlcXVlc3RzfVxuICogd2l0aCBwcmVjYWNoZWQgYXNzZXRzLlxuICpcbiAqIFJlcXVlc3RzIGZvciBhc3NldHMgdGhhdCBhcmVuJ3QgcHJlY2FjaGVkLCB0aGUgYEZldGNoRXZlbnRgIHdpbGwgbm90IGJlXG4gKiByZXNwb25kZWQgdG8sIGFsbG93aW5nIHRoZSBldmVudCB0byBmYWxsIHRocm91Z2ggdG8gb3RoZXIgYGZldGNoYCBldmVudFxuICogbGlzdGVuZXJzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gU2VlIHRoZSB7QGxpbmsgd29ya2JveC1wcmVjYWNoaW5nLlByZWNhY2hlUm91dGV9XG4gKiBvcHRpb25zLlxuICpcbiAqIEBtZW1iZXJvZiB3b3JrYm94LXByZWNhY2hpbmdcbiAqL1xuZnVuY3Rpb24gYWRkUm91dGUob3B0aW9ucykge1xuICAgIGNvbnN0IHByZWNhY2hlQ29udHJvbGxlciA9IGdldE9yQ3JlYXRlUHJlY2FjaGVDb250cm9sbGVyKCk7XG4gICAgY29uc3QgcHJlY2FjaGVSb3V0ZSA9IG5ldyBQcmVjYWNoZVJvdXRlKHByZWNhY2hlQ29udHJvbGxlciwgb3B0aW9ucyk7XG4gICAgcmVnaXN0ZXJSb3V0ZShwcmVjYWNoZVJvdXRlKTtcbn1cbmV4cG9ydCB7IGFkZFJvdXRlIH07XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0ICcuLi9fdmVyc2lvbi5qcyc7XG5jb25zdCBTVUJTVFJJTkdfVE9fRklORCA9ICctcHJlY2FjaGUtJztcbi8qKlxuICogQ2xlYW5zIHVwIGluY29tcGF0aWJsZSBwcmVjYWNoZXMgdGhhdCB3ZXJlIGNyZWF0ZWQgYnkgb2xkZXIgdmVyc2lvbnMgb2ZcbiAqIFdvcmtib3gsIGJ5IGEgc2VydmljZSB3b3JrZXIgcmVnaXN0ZXJlZCB1bmRlciB0aGUgY3VycmVudCBzY29wZS5cbiAqXG4gKiBUaGlzIGlzIG1lYW50IHRvIGJlIGNhbGxlZCBhcyBwYXJ0IG9mIHRoZSBgYWN0aXZhdGVgIGV2ZW50LlxuICpcbiAqIFRoaXMgc2hvdWxkIGJlIHNhZmUgdG8gdXNlIGFzIGxvbmcgYXMgeW91IGRvbid0IGluY2x1ZGUgYHN1YnN0cmluZ1RvRmluZGBcbiAqIChkZWZhdWx0aW5nIHRvIGAtcHJlY2FjaGUtYCkgaW4geW91ciBub24tcHJlY2FjaGUgY2FjaGUgbmFtZXMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGN1cnJlbnRQcmVjYWNoZU5hbWUgVGhlIGNhY2hlIG5hbWUgY3VycmVudGx5IGluIHVzZSBmb3JcbiAqIHByZWNhY2hpbmcuIFRoaXMgY2FjaGUgd29uJ3QgYmUgZGVsZXRlZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3Vic3RyaW5nVG9GaW5kPSctcHJlY2FjaGUtJ10gQ2FjaGUgbmFtZXMgd2hpY2ggaW5jbHVkZSB0aGlzXG4gKiBzdWJzdHJpbmcgd2lsbCBiZSBkZWxldGVkIChleGNsdWRpbmcgYGN1cnJlbnRQcmVjYWNoZU5hbWVgKS5cbiAqIEByZXR1cm4ge0FycmF5PHN0cmluZz59IEEgbGlzdCBvZiBhbGwgdGhlIGNhY2hlIG5hbWVzIHRoYXQgd2VyZSBkZWxldGVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbWVtYmVyb2Ygd29ya2JveC1wcmVjYWNoaW5nXG4gKi9cbmNvbnN0IGRlbGV0ZU91dGRhdGVkQ2FjaGVzID0gYXN5bmMgKGN1cnJlbnRQcmVjYWNoZU5hbWUsIHN1YnN0cmluZ1RvRmluZCA9IFNVQlNUUklOR19UT19GSU5EKSA9PiB7XG4gICAgY29uc3QgY2FjaGVOYW1lcyA9IGF3YWl0IHNlbGYuY2FjaGVzLmtleXMoKTtcbiAgICBjb25zdCBjYWNoZU5hbWVzVG9EZWxldGUgPSBjYWNoZU5hbWVzLmZpbHRlcigoY2FjaGVOYW1lKSA9PiB7XG4gICAgICAgIHJldHVybiAoY2FjaGVOYW1lLmluY2x1ZGVzKHN1YnN0cmluZ1RvRmluZCkgJiZcbiAgICAgICAgICAgIGNhY2hlTmFtZS5pbmNsdWRlcyhzZWxmLnJlZ2lzdHJhdGlvbi5zY29wZSkgJiZcbiAgICAgICAgICAgIGNhY2hlTmFtZSAhPT0gY3VycmVudFByZWNhY2hlTmFtZSk7XG4gICAgfSk7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoY2FjaGVOYW1lc1RvRGVsZXRlLm1hcCgoY2FjaGVOYW1lKSA9PiBzZWxmLmNhY2hlcy5kZWxldGUoY2FjaGVOYW1lKSkpO1xuICAgIHJldHVybiBjYWNoZU5hbWVzVG9EZWxldGU7XG59O1xuZXhwb3J0IHsgZGVsZXRlT3V0ZGF0ZWRDYWNoZXMgfTtcbiIsICIvKlxuICBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgeyBjYWNoZU5hbWVzIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2NhY2hlTmFtZXMuanMnO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2xvZ2dlci5qcyc7XG5pbXBvcnQgeyBkZWxldGVPdXRkYXRlZENhY2hlcyB9IGZyb20gJy4vdXRpbHMvZGVsZXRlT3V0ZGF0ZWRDYWNoZXMuanMnO1xuaW1wb3J0ICcuL192ZXJzaW9uLmpzJztcbi8qKlxuICogQWRkcyBhbiBgYWN0aXZhdGVgIGV2ZW50IGxpc3RlbmVyIHdoaWNoIHdpbGwgY2xlYW4gdXAgaW5jb21wYXRpYmxlXG4gKiBwcmVjYWNoZXMgdGhhdCB3ZXJlIGNyZWF0ZWQgYnkgb2xkZXIgdmVyc2lvbnMgb2YgV29ya2JveC5cbiAqXG4gKiBAbWVtYmVyb2Ygd29ya2JveC1wcmVjYWNoaW5nXG4gKi9cbmZ1bmN0aW9uIGNsZWFudXBPdXRkYXRlZENhY2hlcygpIHtcbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8yODM1NyNpc3N1ZWNvbW1lbnQtNDM2NDg0NzA1XG4gICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdhY3RpdmF0ZScsICgoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgY2FjaGVOYW1lID0gY2FjaGVOYW1lcy5nZXRQcmVjYWNoZU5hbWUoKTtcbiAgICAgICAgZXZlbnQud2FpdFVudGlsKGRlbGV0ZU91dGRhdGVkQ2FjaGVzKGNhY2hlTmFtZSkudGhlbigoY2FjaGVzRGVsZXRlZCkgPT4ge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2FjaGVzRGVsZXRlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFRoZSBmb2xsb3dpbmcgb3V0LW9mLWRhdGUgcHJlY2FjaGVzIHdlcmUgY2xlYW5lZCB1cCBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGBhdXRvbWF0aWNhbGx5OmAsIGNhY2hlc0RlbGV0ZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgIH0pKTtcbn1cbmV4cG9ydCB7IGNsZWFudXBPdXRkYXRlZENhY2hlcyB9O1xuIiwgIi8qXG4gIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IGdldE9yQ3JlYXRlUHJlY2FjaGVDb250cm9sbGVyIH0gZnJvbSAnLi91dGlscy9nZXRPckNyZWF0ZVByZWNhY2hlQ29udHJvbGxlci5qcyc7XG5pbXBvcnQgJy4vX3ZlcnNpb24uanMnO1xuLyoqXG4gKiBBZGRzIGl0ZW1zIHRvIHRoZSBwcmVjYWNoZSBsaXN0LCByZW1vdmluZyBhbnkgZHVwbGljYXRlcyBhbmRcbiAqIHN0b3JlcyB0aGUgZmlsZXMgaW4gdGhlXG4gKiB7QGxpbmsgd29ya2JveC1jb3JlLmNhY2hlTmFtZXN8XCJwcmVjYWNoZSBjYWNoZVwifSB3aGVuIHRoZSBzZXJ2aWNlXG4gKiB3b3JrZXIgaW5zdGFsbHMuXG4gKlxuICogVGhpcyBtZXRob2QgY2FuIGJlIGNhbGxlZCBtdWx0aXBsZSB0aW1lcy5cbiAqXG4gKiBQbGVhc2Ugbm90ZTogVGhpcyBtZXRob2QgKip3aWxsIG5vdCoqIHNlcnZlIGFueSBvZiB0aGUgY2FjaGVkIGZpbGVzIGZvciB5b3UuXG4gKiBJdCBvbmx5IHByZWNhY2hlcyBmaWxlcy4gVG8gcmVzcG9uZCB0byBhIG5ldHdvcmsgcmVxdWVzdCB5b3UgY2FsbFxuICoge0BsaW5rIHdvcmtib3gtcHJlY2FjaGluZy5hZGRSb3V0ZX0uXG4gKlxuICogSWYgeW91IGhhdmUgYSBzaW5nbGUgYXJyYXkgb2YgZmlsZXMgdG8gcHJlY2FjaGUsIHlvdSBjYW4ganVzdCBjYWxsXG4gKiB7QGxpbmsgd29ya2JveC1wcmVjYWNoaW5nLnByZWNhY2hlQW5kUm91dGV9LlxuICpcbiAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0fHN0cmluZz59IFtlbnRyaWVzPVtdXSBBcnJheSBvZiBlbnRyaWVzIHRvIHByZWNhY2hlLlxuICpcbiAqIEBtZW1iZXJvZiB3b3JrYm94LXByZWNhY2hpbmdcbiAqL1xuZnVuY3Rpb24gcHJlY2FjaGUoZW50cmllcykge1xuICAgIGNvbnN0IHByZWNhY2hlQ29udHJvbGxlciA9IGdldE9yQ3JlYXRlUHJlY2FjaGVDb250cm9sbGVyKCk7XG4gICAgcHJlY2FjaGVDb250cm9sbGVyLnByZWNhY2hlKGVudHJpZXMpO1xufVxuZXhwb3J0IHsgcHJlY2FjaGUgfTtcbiIsICIvKlxuICBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgeyBhZGRSb3V0ZSB9IGZyb20gJy4vYWRkUm91dGUuanMnO1xuaW1wb3J0IHsgcHJlY2FjaGUgfSBmcm9tICcuL3ByZWNhY2hlLmpzJztcbmltcG9ydCAnLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIFRoaXMgbWV0aG9kIHdpbGwgYWRkIGVudHJpZXMgdG8gdGhlIHByZWNhY2hlIGxpc3QgYW5kIGFkZCBhIHJvdXRlIHRvXG4gKiByZXNwb25kIHRvIGZldGNoIGV2ZW50cy5cbiAqXG4gKiBUaGlzIGlzIGEgY29udmVuaWVuY2UgbWV0aG9kIHRoYXQgd2lsbCBjYWxsXG4gKiB7QGxpbmsgd29ya2JveC1wcmVjYWNoaW5nLnByZWNhY2hlfSBhbmRcbiAqIHtAbGluayB3b3JrYm94LXByZWNhY2hpbmcuYWRkUm91dGV9IGluIGEgc2luZ2xlIGNhbGwuXG4gKlxuICogQHBhcmFtIHtBcnJheTxPYmplY3R8c3RyaW5nPn0gZW50cmllcyBBcnJheSBvZiBlbnRyaWVzIHRvIHByZWNhY2hlLlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBTZWUgdGhlXG4gKiB7QGxpbmsgd29ya2JveC1wcmVjYWNoaW5nLlByZWNhY2hlUm91dGV9IG9wdGlvbnMuXG4gKlxuICogQG1lbWJlcm9mIHdvcmtib3gtcHJlY2FjaGluZ1xuICovXG5mdW5jdGlvbiBwcmVjYWNoZUFuZFJvdXRlKGVudHJpZXMsIG9wdGlvbnMpIHtcbiAgICBwcmVjYWNoZShlbnRyaWVzKTtcbiAgICBhZGRSb3V0ZShvcHRpb25zKTtcbn1cbmV4cG9ydCB7IHByZWNhY2hlQW5kUm91dGUgfTtcbiIsICIvKlxuICBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvYXNzZXJ0LmpzJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9sb2dnZXIuanMnO1xuaW1wb3J0IHsgV29ya2JveEVycm9yIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL1dvcmtib3hFcnJvci5qcyc7XG5pbXBvcnQgeyBTdHJhdGVneSB9IGZyb20gJy4vU3RyYXRlZ3kuanMnO1xuaW1wb3J0IHsgbWVzc2FnZXMgfSBmcm9tICcuL3V0aWxzL21lc3NhZ2VzLmpzJztcbmltcG9ydCAnLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIEFuIGltcGxlbWVudGF0aW9uIG9mIGEgW2NhY2hlLWZpcnN0XShodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2RvY3Mvd29ya2JveC9jYWNoaW5nLXN0cmF0ZWdpZXMtb3ZlcnZpZXcvI2NhY2hlLWZpcnN0LWZhbGxpbmctYmFjay10by1uZXR3b3JrKVxuICogcmVxdWVzdCBzdHJhdGVneS5cbiAqXG4gKiBBIGNhY2hlIGZpcnN0IHN0cmF0ZWd5IGlzIHVzZWZ1bCBmb3IgYXNzZXRzIHRoYXQgaGF2ZSBiZWVuIHJldmlzaW9uZWQsXG4gKiBzdWNoIGFzIFVSTHMgbGlrZSBgL3N0eWxlcy9leGFtcGxlLmE4ZjVmMS5jc3NgLCBzaW5jZSB0aGV5XG4gKiBjYW4gYmUgY2FjaGVkIGZvciBsb25nIHBlcmlvZHMgb2YgdGltZS5cbiAqXG4gKiBJZiB0aGUgbmV0d29yayByZXF1ZXN0IGZhaWxzLCBhbmQgdGhlcmUgaXMgbm8gY2FjaGUgbWF0Y2gsIHRoaXMgd2lsbCB0aHJvd1xuICogYSBgV29ya2JveEVycm9yYCBleGNlcHRpb24uXG4gKlxuICogQGV4dGVuZHMgd29ya2JveC1zdHJhdGVnaWVzLlN0cmF0ZWd5XG4gKiBAbWVtYmVyb2Ygd29ya2JveC1zdHJhdGVnaWVzXG4gKi9cbmNsYXNzIENhY2hlRmlyc3QgZXh0ZW5kcyBTdHJhdGVneSB7XG4gICAgLyoqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge1JlcXVlc3R8c3RyaW5nfSByZXF1ZXN0IEEgcmVxdWVzdCB0byBydW4gdGhpcyBzdHJhdGVneSBmb3IuXG4gICAgICogQHBhcmFtIHt3b3JrYm94LXN0cmF0ZWdpZXMuU3RyYXRlZ3lIYW5kbGVyfSBoYW5kbGVyIFRoZSBldmVudCB0aGF0XG4gICAgICogICAgIHRyaWdnZXJlZCB0aGUgcmVxdWVzdC5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPFJlc3BvbnNlPn1cbiAgICAgKi9cbiAgICBhc3luYyBfaGFuZGxlKHJlcXVlc3QsIGhhbmRsZXIpIHtcbiAgICAgICAgY29uc3QgbG9ncyA9IFtdO1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgYXNzZXJ0LmlzSW5zdGFuY2UocmVxdWVzdCwgUmVxdWVzdCwge1xuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LXN0cmF0ZWdpZXMnLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogdGhpcy5jb25zdHJ1Y3Rvci5uYW1lLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAnbWFrZVJlcXVlc3QnLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ3JlcXVlc3QnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgaGFuZGxlci5jYWNoZU1hdGNoKHJlcXVlc3QpO1xuICAgICAgICBsZXQgZXJyb3IgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgbG9ncy5wdXNoKGBObyByZXNwb25zZSBmb3VuZCBpbiB0aGUgJyR7dGhpcy5jYWNoZU5hbWV9JyBjYWNoZS4gYCArXG4gICAgICAgICAgICAgICAgICAgIGBXaWxsIHJlc3BvbmQgd2l0aCBhIG5ldHdvcmsgcmVxdWVzdC5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCBoYW5kbGVyLmZldGNoQW5kQ2FjaGVQdXQocmVxdWVzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gZXJyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ3MucHVzaChgR290IHJlc3BvbnNlIGZyb20gbmV0d29yay5gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ3MucHVzaChgVW5hYmxlIHRvIGdldCBhIHJlc3BvbnNlIGZyb20gdGhlIG5ldHdvcmsuYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBsb2dzLnB1c2goYEZvdW5kIGEgY2FjaGVkIHJlc3BvbnNlIGluIHRoZSAnJHt0aGlzLmNhY2hlTmFtZX0nIGNhY2hlLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBsb2dnZXIuZ3JvdXBDb2xsYXBzZWQobWVzc2FnZXMuc3RyYXRlZ3lTdGFydCh0aGlzLmNvbnN0cnVjdG9yLm5hbWUsIHJlcXVlc3QpKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbG9nIG9mIGxvZ3MpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGxvZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtZXNzYWdlcy5wcmludEZpbmFsUmVzcG9uc2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgbG9nZ2VyLmdyb3VwRW5kKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyZXNwb25zZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFdvcmtib3hFcnJvcignbm8tcmVzcG9uc2UnLCB7IHVybDogcmVxdWVzdC51cmwsIGVycm9yIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG59XG5leHBvcnQgeyBDYWNoZUZpcnN0IH07XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0ICcuLi9fdmVyc2lvbi5qcyc7XG5leHBvcnQgY29uc3QgY2FjaGVPa0FuZE9wYXF1ZVBsdWdpbiA9IHtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgdmFsaWQgcmVzcG9uc2UgKHRvIGFsbG93IGNhY2hpbmcpIGlmIHRoZSBzdGF0dXMgaXMgMjAwIChPSykgb3JcbiAgICAgKiAwIChvcGFxdWUpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSBvcHRpb25zLnJlc3BvbnNlXG4gICAgICogQHJldHVybiB7UmVzcG9uc2V8bnVsbH1cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgY2FjaGVXaWxsVXBkYXRlOiBhc3luYyAoeyByZXNwb25zZSB9KSA9PiB7XG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCB8fCByZXNwb25zZS5zdGF0dXMgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxufTtcbiIsICIvKlxuICBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvYXNzZXJ0LmpzJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9sb2dnZXIuanMnO1xuaW1wb3J0IHsgV29ya2JveEVycm9yIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL1dvcmtib3hFcnJvci5qcyc7XG5pbXBvcnQgeyBjYWNoZU9rQW5kT3BhcXVlUGx1Z2luIH0gZnJvbSAnLi9wbHVnaW5zL2NhY2hlT2tBbmRPcGFxdWVQbHVnaW4uanMnO1xuaW1wb3J0IHsgU3RyYXRlZ3kgfSBmcm9tICcuL1N0cmF0ZWd5LmpzJztcbmltcG9ydCB7IG1lc3NhZ2VzIH0gZnJvbSAnLi91dGlscy9tZXNzYWdlcy5qcyc7XG5pbXBvcnQgJy4vX3ZlcnNpb24uanMnO1xuLyoqXG4gKiBBbiBpbXBsZW1lbnRhdGlvbiBvZiBhXG4gKiBbbmV0d29yayBmaXJzdF0oaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9kb2NzL3dvcmtib3gvY2FjaGluZy1zdHJhdGVnaWVzLW92ZXJ2aWV3LyNuZXR3b3JrLWZpcnN0LWZhbGxpbmctYmFjay10by1jYWNoZSlcbiAqIHJlcXVlc3Qgc3RyYXRlZ3kuXG4gKlxuICogQnkgZGVmYXVsdCwgdGhpcyBzdHJhdGVneSB3aWxsIGNhY2hlIHJlc3BvbnNlcyB3aXRoIGEgMjAwIHN0YXR1cyBjb2RlIGFzXG4gKiB3ZWxsIGFzIFtvcGFxdWUgcmVzcG9uc2VzXShodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2RvY3Mvd29ya2JveC9jYWNoaW5nLXJlc291cmNlcy1kdXJpbmctcnVudGltZS8jb3BhcXVlLXJlc3BvbnNlcykuXG4gKiBPcGFxdWUgcmVzcG9uc2VzIGFyZSBhcmUgY3Jvc3Mtb3JpZ2luIHJlcXVlc3RzIHdoZXJlIHRoZSByZXNwb25zZSBkb2Vzbid0XG4gKiBzdXBwb3J0IFtDT1JTXShodHRwczovL2VuYWJsZS1jb3JzLm9yZy8pLlxuICpcbiAqIElmIHRoZSBuZXR3b3JrIHJlcXVlc3QgZmFpbHMsIGFuZCB0aGVyZSBpcyBubyBjYWNoZSBtYXRjaCwgdGhpcyB3aWxsIHRocm93XG4gKiBhIGBXb3JrYm94RXJyb3JgIGV4Y2VwdGlvbi5cbiAqXG4gKiBAZXh0ZW5kcyB3b3JrYm94LXN0cmF0ZWdpZXMuU3RyYXRlZ3lcbiAqIEBtZW1iZXJvZiB3b3JrYm94LXN0cmF0ZWdpZXNcbiAqL1xuY2xhc3MgTmV0d29ya0ZpcnN0IGV4dGVuZHMgU3RyYXRlZ3kge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuY2FjaGVOYW1lXSBDYWNoZSBuYW1lIHRvIHN0b3JlIGFuZCByZXRyaWV2ZVxuICAgICAqIHJlcXVlc3RzLiBEZWZhdWx0cyB0byBjYWNoZSBuYW1lcyBwcm92aWRlZCBieVxuICAgICAqIHtAbGluayB3b3JrYm94LWNvcmUuY2FjaGVOYW1lc30uXG4gICAgICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSBbb3B0aW9ucy5wbHVnaW5zXSBbUGx1Z2luc117QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vd2ViL3Rvb2xzL3dvcmtib3gvZ3VpZGVzL3VzaW5nLXBsdWdpbnN9XG4gICAgICogdG8gdXNlIGluIGNvbmp1bmN0aW9uIHdpdGggdGhpcyBjYWNoaW5nIHN0cmF0ZWd5LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5mZXRjaE9wdGlvbnNdIFZhbHVlcyBwYXNzZWQgYWxvbmcgdG8gdGhlXG4gICAgICogW2Bpbml0YF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dpbmRvd09yV29ya2VyR2xvYmFsU2NvcGUvZmV0Y2gjUGFyYW1ldGVycylcbiAgICAgKiBvZiBbbm9uLW5hdmlnYXRpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvd29ya2JveC9pc3N1ZXMvMTc5NilcbiAgICAgKiBgZmV0Y2goKWAgcmVxdWVzdHMgbWFkZSBieSB0aGlzIHN0cmF0ZWd5LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5tYXRjaE9wdGlvbnNdIFtgQ2FjaGVRdWVyeU9wdGlvbnNgXShodHRwczovL3czYy5naXRodWIuaW8vU2VydmljZVdvcmtlci8jZGljdGRlZi1jYWNoZXF1ZXJ5b3B0aW9ucylcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubmV0d29ya1RpbWVvdXRTZWNvbmRzXSBJZiBzZXQsIGFueSBuZXR3b3JrIHJlcXVlc3RzXG4gICAgICogdGhhdCBmYWlsIHRvIHJlc3BvbmQgd2l0aGluIHRoZSB0aW1lb3V0IHdpbGwgZmFsbGJhY2sgdG8gdGhlIGNhY2hlLlxuICAgICAqXG4gICAgICogVGhpcyBvcHRpb24gY2FuIGJlIHVzZWQgdG8gY29tYmF0XG4gICAgICogXCJbbGllLWZpXXtAbGluayBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS93ZWIvZnVuZGFtZW50YWxzL3BlcmZvcm1hbmNlL3Bvb3ItY29ubmVjdGl2aXR5LyNsaWUtZml9XCJcbiAgICAgKiBzY2VuYXJpb3MuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICAvLyBJZiB0aGlzIGluc3RhbmNlIGNvbnRhaW5zIG5vIHBsdWdpbnMgd2l0aCBhICdjYWNoZVdpbGxVcGRhdGUnIGNhbGxiYWNrLFxuICAgICAgICAvLyBwcmVwZW5kIHRoZSBgY2FjaGVPa0FuZE9wYXF1ZVBsdWdpbmAgcGx1Z2luIHRvIHRoZSBwbHVnaW5zIGxpc3QuXG4gICAgICAgIGlmICghdGhpcy5wbHVnaW5zLnNvbWUoKHApID0+ICdjYWNoZVdpbGxVcGRhdGUnIGluIHApKSB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbnMudW5zaGlmdChjYWNoZU9rQW5kT3BhcXVlUGx1Z2luKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9uZXR3b3JrVGltZW91dFNlY29uZHMgPSBvcHRpb25zLm5ldHdvcmtUaW1lb3V0U2Vjb25kcyB8fCAwO1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX25ldHdvcmtUaW1lb3V0U2Vjb25kcykge1xuICAgICAgICAgICAgICAgIGFzc2VydC5pc1R5cGUodGhpcy5fbmV0d29ya1RpbWVvdXRTZWNvbmRzLCAnbnVtYmVyJywge1xuICAgICAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1zdHJhdGVnaWVzJyxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiB0aGlzLmNvbnN0cnVjdG9yLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAnY29uc3RydWN0b3InLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbU5hbWU6ICduZXR3b3JrVGltZW91dFNlY29uZHMnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0fHN0cmluZ30gcmVxdWVzdCBBIHJlcXVlc3QgdG8gcnVuIHRoaXMgc3RyYXRlZ3kgZm9yLlxuICAgICAqIEBwYXJhbSB7d29ya2JveC1zdHJhdGVnaWVzLlN0cmF0ZWd5SGFuZGxlcn0gaGFuZGxlciBUaGUgZXZlbnQgdGhhdFxuICAgICAqICAgICB0cmlnZ2VyZWQgdGhlIHJlcXVlc3QuXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxSZXNwb25zZT59XG4gICAgICovXG4gICAgYXN5bmMgX2hhbmRsZShyZXF1ZXN0LCBoYW5kbGVyKSB7XG4gICAgICAgIGNvbnN0IGxvZ3MgPSBbXTtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGFzc2VydC5pc0luc3RhbmNlKHJlcXVlc3QsIFJlcXVlc3QsIHtcbiAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1zdHJhdGVnaWVzJyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IHRoaXMuY29uc3RydWN0b3IubmFtZSxcbiAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ2hhbmRsZScsXG4gICAgICAgICAgICAgICAgcGFyYW1OYW1lOiAnbWFrZVJlcXVlc3QnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcbiAgICAgICAgbGV0IHRpbWVvdXRJZDtcbiAgICAgICAgaWYgKHRoaXMuX25ldHdvcmtUaW1lb3V0U2Vjb25kcykge1xuICAgICAgICAgICAgY29uc3QgeyBpZCwgcHJvbWlzZSB9ID0gdGhpcy5fZ2V0VGltZW91dFByb21pc2UoeyByZXF1ZXN0LCBsb2dzLCBoYW5kbGVyIH0pO1xuICAgICAgICAgICAgdGltZW91dElkID0gaWQ7XG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHByb21pc2UpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5ldHdvcmtQcm9taXNlID0gdGhpcy5fZ2V0TmV0d29ya1Byb21pc2Uoe1xuICAgICAgICAgICAgdGltZW91dElkLFxuICAgICAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgICAgIGxvZ3MsXG4gICAgICAgICAgICBoYW5kbGVyLFxuICAgICAgICB9KTtcbiAgICAgICAgcHJvbWlzZXMucHVzaChuZXR3b3JrUHJvbWlzZSk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgaGFuZGxlci53YWl0VW50aWwoKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIC8vIFByb21pc2UucmFjZSgpIHdpbGwgcmVzb2x2ZSBhcyBzb29uIGFzIHRoZSBmaXJzdCBwcm9taXNlIHJlc29sdmVzLlxuICAgICAgICAgICAgcmV0dXJuICgoYXdhaXQgaGFuZGxlci53YWl0VW50aWwoUHJvbWlzZS5yYWNlKHByb21pc2VzKSkpIHx8XG4gICAgICAgICAgICAgICAgLy8gSWYgUHJvbWlzZS5yYWNlKCkgcmVzb2x2ZWQgd2l0aCBudWxsLCBpdCBtaWdodCBiZSBkdWUgdG8gYSBuZXR3b3JrXG4gICAgICAgICAgICAgICAgLy8gdGltZW91dCArIGEgY2FjaGUgbWlzcy4gSWYgdGhhdCB3ZXJlIHRvIGhhcHBlbiwgd2UnZCByYXRoZXIgd2FpdCB1bnRpbFxuICAgICAgICAgICAgICAgIC8vIHRoZSBuZXR3b3JrUHJvbWlzZSByZXNvbHZlcyBpbnN0ZWFkIG9mIHJldHVybmluZyBudWxsLlxuICAgICAgICAgICAgICAgIC8vIE5vdGUgdGhhdCBpdCdzIGZpbmUgdG8gYXdhaXQgYW4gYWxyZWFkeS1yZXNvbHZlZCBwcm9taXNlLCBzbyB3ZSBkb24ndFxuICAgICAgICAgICAgICAgIC8vIGhhdmUgdG8gY2hlY2sgdG8gc2VlIGlmIGl0J3Mgc3RpbGwgXCJpbiBmbGlnaHRcIi5cbiAgICAgICAgICAgICAgICAoYXdhaXQgbmV0d29ya1Byb21pc2UpKTtcbiAgICAgICAgfSkoKSk7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBsb2dnZXIuZ3JvdXBDb2xsYXBzZWQobWVzc2FnZXMuc3RyYXRlZ3lTdGFydCh0aGlzLmNvbnN0cnVjdG9yLm5hbWUsIHJlcXVlc3QpKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbG9nIG9mIGxvZ3MpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGxvZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtZXNzYWdlcy5wcmludEZpbmFsUmVzcG9uc2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgbG9nZ2VyLmdyb3VwRW5kKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyZXNwb25zZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFdvcmtib3hFcnJvcignbm8tcmVzcG9uc2UnLCB7IHVybDogcmVxdWVzdC51cmwgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7UmVxdWVzdH0gb3B0aW9ucy5yZXF1ZXN0XG4gICAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5sb2dzIEEgcmVmZXJlbmNlIHRvIHRoZSBsb2dzIGFycmF5XG4gICAgICogQHBhcmFtIHtFdmVudH0gb3B0aW9ucy5ldmVudFxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8UmVzcG9uc2U+fVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfZ2V0VGltZW91dFByb21pc2UoeyByZXF1ZXN0LCBsb2dzLCBoYW5kbGVyLCB9KSB7XG4gICAgICAgIGxldCB0aW1lb3V0SWQ7XG4gICAgICAgIGNvbnN0IHRpbWVvdXRQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9uTmV0d29ya1RpbWVvdXQgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9ncy5wdXNoKGBUaW1pbmcgb3V0IHRoZSBuZXR3b3JrIHJlc3BvbnNlIGF0IGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYCR7dGhpcy5fbmV0d29ya1RpbWVvdXRTZWNvbmRzfSBzZWNvbmRzLmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXNvbHZlKGF3YWl0IGhhbmRsZXIuY2FjaGVNYXRjaChyZXF1ZXN0KSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGltZW91dElkID0gc2V0VGltZW91dChvbk5ldHdvcmtUaW1lb3V0LCB0aGlzLl9uZXR3b3JrVGltZW91dFNlY29uZHMgKiAxMDAwKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwcm9taXNlOiB0aW1lb3V0UHJvbWlzZSxcbiAgICAgICAgICAgIGlkOiB0aW1lb3V0SWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQHBhcmFtIHtudW1iZXJ8dW5kZWZpbmVkfSBvcHRpb25zLnRpbWVvdXRJZFxuICAgICAqIEBwYXJhbSB7UmVxdWVzdH0gb3B0aW9ucy5yZXF1ZXN0XG4gICAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5sb2dzIEEgcmVmZXJlbmNlIHRvIHRoZSBsb2dzIEFycmF5LlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IG9wdGlvbnMuZXZlbnRcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPFJlc3BvbnNlPn1cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgYXN5bmMgX2dldE5ldHdvcmtQcm9taXNlKHsgdGltZW91dElkLCByZXF1ZXN0LCBsb2dzLCBoYW5kbGVyLCB9KSB7XG4gICAgICAgIGxldCBlcnJvcjtcbiAgICAgICAgbGV0IHJlc3BvbnNlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCBoYW5kbGVyLmZldGNoQW5kQ2FjaGVQdXQocmVxdWVzdCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGZldGNoRXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChmZXRjaEVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICBlcnJvciA9IGZldGNoRXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRpbWVvdXRJZCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGxvZ3MucHVzaChgR290IHJlc3BvbnNlIGZyb20gbmV0d29yay5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZ3MucHVzaChgVW5hYmxlIHRvIGdldCBhIHJlc3BvbnNlIGZyb20gdGhlIG5ldHdvcmsuIFdpbGwgcmVzcG9uZCBgICtcbiAgICAgICAgICAgICAgICAgICAgYHdpdGggYSBjYWNoZWQgcmVzcG9uc2UuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yIHx8ICFyZXNwb25zZSkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCBoYW5kbGVyLmNhY2hlTWF0Y2gocmVxdWVzdCk7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBsb2dzLnB1c2goYEZvdW5kIGEgY2FjaGVkIHJlc3BvbnNlIGluIHRoZSAnJHt0aGlzLmNhY2hlTmFtZX0nYCArIGAgY2FjaGUuYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsb2dzLnB1c2goYE5vIHJlc3BvbnNlIGZvdW5kIGluIHRoZSAnJHt0aGlzLmNhY2hlTmFtZX0nIGNhY2hlLmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxufVxuZXhwb3J0IHsgTmV0d29ya0ZpcnN0IH07XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2Fzc2VydC5qcyc7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvbG9nZ2VyLmpzJztcbmltcG9ydCB7IFdvcmtib3hFcnJvciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9Xb3JrYm94RXJyb3IuanMnO1xuaW1wb3J0IHsgY2FjaGVPa0FuZE9wYXF1ZVBsdWdpbiB9IGZyb20gJy4vcGx1Z2lucy9jYWNoZU9rQW5kT3BhcXVlUGx1Z2luLmpzJztcbmltcG9ydCB7IFN0cmF0ZWd5IH0gZnJvbSAnLi9TdHJhdGVneS5qcyc7XG5pbXBvcnQgeyBtZXNzYWdlcyB9IGZyb20gJy4vdXRpbHMvbWVzc2FnZXMuanMnO1xuaW1wb3J0ICcuL192ZXJzaW9uLmpzJztcbi8qKlxuICogQW4gaW1wbGVtZW50YXRpb24gb2YgYVxuICogW3N0YWxlLXdoaWxlLXJldmFsaWRhdGVdKGh0dHBzOi8vZGV2ZWxvcGVyLmNocm9tZS5jb20vZG9jcy93b3JrYm94L2NhY2hpbmctc3RyYXRlZ2llcy1vdmVydmlldy8jc3RhbGUtd2hpbGUtcmV2YWxpZGF0ZSlcbiAqIHJlcXVlc3Qgc3RyYXRlZ3kuXG4gKlxuICogUmVzb3VyY2VzIGFyZSByZXF1ZXN0ZWQgZnJvbSBib3RoIHRoZSBjYWNoZSBhbmQgdGhlIG5ldHdvcmsgaW4gcGFyYWxsZWwuXG4gKiBUaGUgc3RyYXRlZ3kgd2lsbCByZXNwb25kIHdpdGggdGhlIGNhY2hlZCB2ZXJzaW9uIGlmIGF2YWlsYWJsZSwgb3RoZXJ3aXNlXG4gKiB3YWl0IGZvciB0aGUgbmV0d29yayByZXNwb25zZS4gVGhlIGNhY2hlIGlzIHVwZGF0ZWQgd2l0aCB0aGUgbmV0d29yayByZXNwb25zZVxuICogd2l0aCBlYWNoIHN1Y2Nlc3NmdWwgcmVxdWVzdC5cbiAqXG4gKiBCeSBkZWZhdWx0LCB0aGlzIHN0cmF0ZWd5IHdpbGwgY2FjaGUgcmVzcG9uc2VzIHdpdGggYSAyMDAgc3RhdHVzIGNvZGUgYXNcbiAqIHdlbGwgYXMgW29wYXF1ZSByZXNwb25zZXNdKGh0dHBzOi8vZGV2ZWxvcGVyLmNocm9tZS5jb20vZG9jcy93b3JrYm94L2NhY2hpbmctcmVzb3VyY2VzLWR1cmluZy1ydW50aW1lLyNvcGFxdWUtcmVzcG9uc2VzKS5cbiAqIE9wYXF1ZSByZXNwb25zZXMgYXJlIGNyb3NzLW9yaWdpbiByZXF1ZXN0cyB3aGVyZSB0aGUgcmVzcG9uc2UgZG9lc24ndFxuICogc3VwcG9ydCBbQ09SU10oaHR0cHM6Ly9lbmFibGUtY29ycy5vcmcvKS5cbiAqXG4gKiBJZiB0aGUgbmV0d29yayByZXF1ZXN0IGZhaWxzLCBhbmQgdGhlcmUgaXMgbm8gY2FjaGUgbWF0Y2gsIHRoaXMgd2lsbCB0aHJvd1xuICogYSBgV29ya2JveEVycm9yYCBleGNlcHRpb24uXG4gKlxuICogQGV4dGVuZHMgd29ya2JveC1zdHJhdGVnaWVzLlN0cmF0ZWd5XG4gKiBAbWVtYmVyb2Ygd29ya2JveC1zdHJhdGVnaWVzXG4gKi9cbmNsYXNzIFN0YWxlV2hpbGVSZXZhbGlkYXRlIGV4dGVuZHMgU3RyYXRlZ3kge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuY2FjaGVOYW1lXSBDYWNoZSBuYW1lIHRvIHN0b3JlIGFuZCByZXRyaWV2ZVxuICAgICAqIHJlcXVlc3RzLiBEZWZhdWx0cyB0byBjYWNoZSBuYW1lcyBwcm92aWRlZCBieVxuICAgICAqIHtAbGluayB3b3JrYm94LWNvcmUuY2FjaGVOYW1lc30uXG4gICAgICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSBbb3B0aW9ucy5wbHVnaW5zXSBbUGx1Z2luc117QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vd2ViL3Rvb2xzL3dvcmtib3gvZ3VpZGVzL3VzaW5nLXBsdWdpbnN9XG4gICAgICogdG8gdXNlIGluIGNvbmp1bmN0aW9uIHdpdGggdGhpcyBjYWNoaW5nIHN0cmF0ZWd5LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5mZXRjaE9wdGlvbnNdIFZhbHVlcyBwYXNzZWQgYWxvbmcgdG8gdGhlXG4gICAgICogW2Bpbml0YF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dpbmRvd09yV29ya2VyR2xvYmFsU2NvcGUvZmV0Y2gjUGFyYW1ldGVycylcbiAgICAgKiBvZiBbbm9uLW5hdmlnYXRpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvd29ya2JveC9pc3N1ZXMvMTc5NilcbiAgICAgKiBgZmV0Y2goKWAgcmVxdWVzdHMgbWFkZSBieSB0aGlzIHN0cmF0ZWd5LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5tYXRjaE9wdGlvbnNdIFtgQ2FjaGVRdWVyeU9wdGlvbnNgXShodHRwczovL3czYy5naXRodWIuaW8vU2VydmljZVdvcmtlci8jZGljdGRlZi1jYWNoZXF1ZXJ5b3B0aW9ucylcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIC8vIElmIHRoaXMgaW5zdGFuY2UgY29udGFpbnMgbm8gcGx1Z2lucyB3aXRoIGEgJ2NhY2hlV2lsbFVwZGF0ZScgY2FsbGJhY2ssXG4gICAgICAgIC8vIHByZXBlbmQgdGhlIGBjYWNoZU9rQW5kT3BhcXVlUGx1Z2luYCBwbHVnaW4gdG8gdGhlIHBsdWdpbnMgbGlzdC5cbiAgICAgICAgaWYgKCF0aGlzLnBsdWdpbnMuc29tZSgocCkgPT4gJ2NhY2hlV2lsbFVwZGF0ZScgaW4gcCkpIHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2lucy51bnNoaWZ0KGNhY2hlT2tBbmRPcGFxdWVQbHVnaW4pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0fHN0cmluZ30gcmVxdWVzdCBBIHJlcXVlc3QgdG8gcnVuIHRoaXMgc3RyYXRlZ3kgZm9yLlxuICAgICAqIEBwYXJhbSB7d29ya2JveC1zdHJhdGVnaWVzLlN0cmF0ZWd5SGFuZGxlcn0gaGFuZGxlciBUaGUgZXZlbnQgdGhhdFxuICAgICAqICAgICB0cmlnZ2VyZWQgdGhlIHJlcXVlc3QuXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxSZXNwb25zZT59XG4gICAgICovXG4gICAgYXN5bmMgX2hhbmRsZShyZXF1ZXN0LCBoYW5kbGVyKSB7XG4gICAgICAgIGNvbnN0IGxvZ3MgPSBbXTtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGFzc2VydC5pc0luc3RhbmNlKHJlcXVlc3QsIFJlcXVlc3QsIHtcbiAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1zdHJhdGVnaWVzJyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IHRoaXMuY29uc3RydWN0b3IubmFtZSxcbiAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ2hhbmRsZScsXG4gICAgICAgICAgICAgICAgcGFyYW1OYW1lOiAncmVxdWVzdCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmZXRjaEFuZENhY2hlUHJvbWlzZSA9IGhhbmRsZXIuZmV0Y2hBbmRDYWNoZVB1dChyZXF1ZXN0KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBTd2FsbG93IHRoaXMgZXJyb3IgYmVjYXVzZSBhICduby1yZXNwb25zZScgZXJyb3Igd2lsbCBiZSB0aHJvd24gaW5cbiAgICAgICAgICAgIC8vIG1haW4gaGFuZGxlciByZXR1cm4gZmxvdy4gVGhpcyB3aWxsIGJlIGluIHRoZSBgd2FpdFVudGlsKClgIGZsb3cuXG4gICAgICAgIH0pO1xuICAgICAgICB2b2lkIGhhbmRsZXIud2FpdFVudGlsKGZldGNoQW5kQ2FjaGVQcm9taXNlKTtcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgaGFuZGxlci5jYWNoZU1hdGNoKHJlcXVlc3QpO1xuICAgICAgICBsZXQgZXJyb3I7XG4gICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBsb2dzLnB1c2goYEZvdW5kIGEgY2FjaGVkIHJlc3BvbnNlIGluIHRoZSAnJHt0aGlzLmNhY2hlTmFtZX0nYCArXG4gICAgICAgICAgICAgICAgICAgIGAgY2FjaGUuIFdpbGwgdXBkYXRlIHdpdGggdGhlIG5ldHdvcmsgcmVzcG9uc2UgaW4gdGhlIGJhY2tncm91bmQuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIGxvZ3MucHVzaChgTm8gcmVzcG9uc2UgZm91bmQgaW4gdGhlICcke3RoaXMuY2FjaGVOYW1lfScgY2FjaGUuIGAgK1xuICAgICAgICAgICAgICAgICAgICBgV2lsbCB3YWl0IGZvciB0aGUgbmV0d29yayByZXNwb25zZS5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgLy8gTk9URShwaGlsaXB3YWx0b24pOiBSZWFsbHkgYW5ub3lpbmcgdGhhdCB3ZSBoYXZlIHRvIHR5cGUgY2FzdCBoZXJlLlxuICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMjAwMDZcbiAgICAgICAgICAgICAgICByZXNwb25zZSA9IChhd2FpdCBmZXRjaEFuZENhY2hlUHJvbWlzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gZXJyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgbG9nZ2VyLmdyb3VwQ29sbGFwc2VkKG1lc3NhZ2VzLnN0cmF0ZWd5U3RhcnQodGhpcy5jb25zdHJ1Y3Rvci5uYW1lLCByZXF1ZXN0KSk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGxvZyBvZiBsb2dzKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhsb2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWVzc2FnZXMucHJpbnRGaW5hbFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIGxvZ2dlci5ncm91cEVuZCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBXb3JrYm94RXJyb3IoJ25vLXJlc3BvbnNlJywgeyB1cmw6IHJlcXVlc3QudXJsLCBlcnJvciB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxufVxuZXhwb3J0IHsgU3RhbGVXaGlsZVJldmFsaWRhdGUgfTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbi8vIEB0cy1pZ25vcmVcbnRyeSB7XG4gICAgc2VsZlsnd29ya2JveDpjYWNoZWFibGUtcmVzcG9uc2U6Ni41LjMnXSAmJiBfKCk7XG59XG5jYXRjaCAoZSkgeyB9XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2Fzc2VydC5qcyc7XG5pbXBvcnQgeyBXb3JrYm94RXJyb3IgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvV29ya2JveEVycm9yLmpzJztcbmltcG9ydCB7IGdldEZyaWVuZGx5VVJMIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2dldEZyaWVuZGx5VVJMLmpzJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9sb2dnZXIuanMnO1xuaW1wb3J0ICcuL192ZXJzaW9uLmpzJztcbi8qKlxuICogVGhpcyBjbGFzcyBhbGxvd3MgeW91IHRvIHNldCB1cCBydWxlcyBkZXRlcm1pbmluZyB3aGF0XG4gKiBzdGF0dXMgY29kZXMgYW5kL29yIGhlYWRlcnMgbmVlZCB0byBiZSBwcmVzZW50IGluIG9yZGVyIGZvciBhXG4gKiBbYFJlc3BvbnNlYF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1Jlc3BvbnNlKVxuICogdG8gYmUgY29uc2lkZXJlZCBjYWNoZWFibGUuXG4gKlxuICogQG1lbWJlcm9mIHdvcmtib3gtY2FjaGVhYmxlLXJlc3BvbnNlXG4gKi9cbmNsYXNzIENhY2hlYWJsZVJlc3BvbnNlIHtcbiAgICAvKipcbiAgICAgKiBUbyBjb25zdHJ1Y3QgYSBuZXcgQ2FjaGVhYmxlUmVzcG9uc2UgaW5zdGFuY2UgeW91IG11c3QgcHJvdmlkZSBhdCBsZWFzdFxuICAgICAqIG9uZSBvZiB0aGUgYGNvbmZpZ2AgcHJvcGVydGllcy5cbiAgICAgKlxuICAgICAqIElmIGJvdGggYHN0YXR1c2VzYCBhbmQgYGhlYWRlcnNgIGFyZSBzcGVjaWZpZWQsIHRoZW4gYm90aCBjb25kaXRpb25zIG11c3RcbiAgICAgKiBiZSBtZXQgZm9yIHRoZSBgUmVzcG9uc2VgIHRvIGJlIGNvbnNpZGVyZWQgY2FjaGVhYmxlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gW2NvbmZpZy5zdGF0dXNlc10gT25lIG9yIG1vcmUgc3RhdHVzIGNvZGVzIHRoYXQgYVxuICAgICAqIGBSZXNwb25zZWAgY2FuIGhhdmUgYW5kIGJlIGNvbnNpZGVyZWQgY2FjaGVhYmxlLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZyxzdHJpbmc+fSBbY29uZmlnLmhlYWRlcnNdIEEgbWFwcGluZyBvZiBoZWFkZXIgbmFtZXNcbiAgICAgKiBhbmQgZXhwZWN0ZWQgdmFsdWVzIHRoYXQgYSBgUmVzcG9uc2VgIGNhbiBoYXZlIGFuZCBiZSBjb25zaWRlcmVkIGNhY2hlYWJsZS5cbiAgICAgKiBJZiBtdWx0aXBsZSBoZWFkZXJzIGFyZSBwcm92aWRlZCwgb25seSBvbmUgbmVlZHMgdG8gYmUgcHJlc2VudC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcgPSB7fSkge1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgaWYgKCEoY29uZmlnLnN0YXR1c2VzIHx8IGNvbmZpZy5oZWFkZXJzKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBXb3JrYm94RXJyb3IoJ3N0YXR1c2VzLW9yLWhlYWRlcnMtcmVxdWlyZWQnLCB7XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LWNhY2hlYWJsZS1yZXNwb25zZScsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ0NhY2hlYWJsZVJlc3BvbnNlJyxcbiAgICAgICAgICAgICAgICAgICAgZnVuY05hbWU6ICdjb25zdHJ1Y3RvcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29uZmlnLnN0YXR1c2VzKSB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0LmlzQXJyYXkoY29uZmlnLnN0YXR1c2VzLCB7XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LWNhY2hlYWJsZS1yZXNwb25zZScsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ0NhY2hlYWJsZVJlc3BvbnNlJyxcbiAgICAgICAgICAgICAgICAgICAgZnVuY05hbWU6ICdjb25zdHJ1Y3RvcicsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ2NvbmZpZy5zdGF0dXNlcycsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29uZmlnLmhlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICBhc3NlcnQuaXNUeXBlKGNvbmZpZy5oZWFkZXJzLCAnb2JqZWN0Jywge1xuICAgICAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1jYWNoZWFibGUtcmVzcG9uc2UnLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdDYWNoZWFibGVSZXNwb25zZScsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAnY29uc3RydWN0b3InLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbU5hbWU6ICdjb25maWcuaGVhZGVycycsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RhdHVzZXMgPSBjb25maWcuc3RhdHVzZXM7XG4gICAgICAgIHRoaXMuX2hlYWRlcnMgPSBjb25maWcuaGVhZGVycztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGEgcmVzcG9uc2UgdG8gc2VlIHdoZXRoZXIgaXQncyBjYWNoZWFibGUgb3Igbm90LCBiYXNlZCBvbiB0aGlzXG4gICAgICogb2JqZWN0J3MgY29uZmlndXJhdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVzcG9uc2V9IHJlc3BvbnNlIFRoZSByZXNwb25zZSB3aG9zZSBjYWNoZWFiaWxpdHkgaXMgYmVpbmdcbiAgICAgKiBjaGVja2VkLlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgYFJlc3BvbnNlYCBpcyBjYWNoZWFibGUsIGFuZCBgZmFsc2VgXG4gICAgICogb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIGlzUmVzcG9uc2VDYWNoZWFibGUocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGFzc2VydC5pc0luc3RhbmNlKHJlc3BvbnNlLCBSZXNwb25zZSwge1xuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LWNhY2hlYWJsZS1yZXNwb25zZScsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnQ2FjaGVhYmxlUmVzcG9uc2UnLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAnaXNSZXNwb25zZUNhY2hlYWJsZScsXG4gICAgICAgICAgICAgICAgcGFyYW1OYW1lOiAncmVzcG9uc2UnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNhY2hlYWJsZSA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLl9zdGF0dXNlcykge1xuICAgICAgICAgICAgY2FjaGVhYmxlID0gdGhpcy5fc3RhdHVzZXMuaW5jbHVkZXMocmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5faGVhZGVycyAmJiBjYWNoZWFibGUpIHtcbiAgICAgICAgICAgIGNhY2hlYWJsZSA9IE9iamVjdC5rZXlzKHRoaXMuX2hlYWRlcnMpLnNvbWUoKGhlYWRlck5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuaGVhZGVycy5nZXQoaGVhZGVyTmFtZSkgPT09IHRoaXMuX2hlYWRlcnNbaGVhZGVyTmFtZV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgaWYgKCFjYWNoZWFibGUpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZ3JvdXBDb2xsYXBzZWQoYFRoZSByZXF1ZXN0IGZvciBgICtcbiAgICAgICAgICAgICAgICAgICAgYCcke2dldEZyaWVuZGx5VVJMKHJlc3BvbnNlLnVybCl9JyByZXR1cm5lZCBhIHJlc3BvbnNlIHRoYXQgZG9lcyBgICtcbiAgICAgICAgICAgICAgICAgICAgYG5vdCBtZWV0IHRoZSBjcml0ZXJpYSBmb3IgYmVpbmcgY2FjaGVkLmApO1xuICAgICAgICAgICAgICAgIGxvZ2dlci5ncm91cENvbGxhcHNlZChgVmlldyBjYWNoZWFiaWxpdHkgY3JpdGVyaWEgaGVyZS5gKTtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBDYWNoZWFibGUgc3RhdHVzZXM6IGAgKyBKU09OLnN0cmluZ2lmeSh0aGlzLl9zdGF0dXNlcykpO1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYENhY2hlYWJsZSBoZWFkZXJzOiBgICsgSlNPTi5zdHJpbmdpZnkodGhpcy5faGVhZGVycywgbnVsbCwgMikpO1xuICAgICAgICAgICAgICAgIGxvZ2dlci5ncm91cEVuZCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxvZ0ZyaWVuZGx5SGVhZGVycyA9IHt9O1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmhlYWRlcnMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsb2dGcmllbmRseUhlYWRlcnNba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGxvZ2dlci5ncm91cENvbGxhcHNlZChgVmlldyByZXNwb25zZSBzdGF0dXMgYW5kIGhlYWRlcnMgaGVyZS5gKTtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXNwb25zZSBzdGF0dXM6ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFJlc3BvbnNlIGhlYWRlcnM6IGAgKyBKU09OLnN0cmluZ2lmeShsb2dGcmllbmRseUhlYWRlcnMsIG51bGwsIDIpKTtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZ3JvdXBFbmQoKTtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZ3JvdXBDb2xsYXBzZWQoYFZpZXcgZnVsbCByZXNwb25zZSBkZXRhaWxzIGhlcmUuYCk7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhyZXNwb25zZS5oZWFkZXJzKTtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZ3JvdXBFbmQoKTtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZ3JvdXBFbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FjaGVhYmxlO1xuICAgIH1cbn1cbmV4cG9ydCB7IENhY2hlYWJsZVJlc3BvbnNlIH07XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgQ2FjaGVhYmxlUmVzcG9uc2UsIH0gZnJvbSAnLi9DYWNoZWFibGVSZXNwb25zZS5qcyc7XG5pbXBvcnQgJy4vX3ZlcnNpb24uanMnO1xuLyoqXG4gKiBBIGNsYXNzIGltcGxlbWVudGluZyB0aGUgYGNhY2hlV2lsbFVwZGF0ZWAgbGlmZWN5Y2xlIGNhbGxiYWNrLiBUaGlzIG1ha2VzIGl0XG4gKiBlYXNpZXIgdG8gYWRkIGluIGNhY2hlYWJpbGl0eSBjaGVja3MgdG8gcmVxdWVzdHMgbWFkZSB2aWEgV29ya2JveCdzIGJ1aWx0LWluXG4gKiBzdHJhdGVnaWVzLlxuICpcbiAqIEBtZW1iZXJvZiB3b3JrYm94LWNhY2hlYWJsZS1yZXNwb25zZVxuICovXG5jbGFzcyBDYWNoZWFibGVSZXNwb25zZVBsdWdpbiB7XG4gICAgLyoqXG4gICAgICogVG8gY29uc3RydWN0IGEgbmV3IENhY2hlYWJsZVJlc3BvbnNlUGx1Z2luIGluc3RhbmNlIHlvdSBtdXN0IHByb3ZpZGUgYXRcbiAgICAgKiBsZWFzdCBvbmUgb2YgdGhlIGBjb25maWdgIHByb3BlcnRpZXMuXG4gICAgICpcbiAgICAgKiBJZiBib3RoIGBzdGF0dXNlc2AgYW5kIGBoZWFkZXJzYCBhcmUgc3BlY2lmaWVkLCB0aGVuIGJvdGggY29uZGl0aW9ucyBtdXN0XG4gICAgICogYmUgbWV0IGZvciB0aGUgYFJlc3BvbnNlYCB0byBiZSBjb25zaWRlcmVkIGNhY2hlYWJsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtjb25maWcuc3RhdHVzZXNdIE9uZSBvciBtb3JlIHN0YXR1cyBjb2RlcyB0aGF0IGFcbiAgICAgKiBgUmVzcG9uc2VgIGNhbiBoYXZlIGFuZCBiZSBjb25zaWRlcmVkIGNhY2hlYWJsZS5cbiAgICAgKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsc3RyaW5nPn0gW2NvbmZpZy5oZWFkZXJzXSBBIG1hcHBpbmcgb2YgaGVhZGVyIG5hbWVzXG4gICAgICogYW5kIGV4cGVjdGVkIHZhbHVlcyB0aGF0IGEgYFJlc3BvbnNlYCBjYW4gaGF2ZSBhbmQgYmUgY29uc2lkZXJlZCBjYWNoZWFibGUuXG4gICAgICogSWYgbXVsdGlwbGUgaGVhZGVycyBhcmUgcHJvdmlkZWQsIG9ubHkgb25lIG5lZWRzIHRvIGJlIHByZXNlbnQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSBvcHRpb25zLnJlc3BvbnNlXG4gICAgICAgICAqIEByZXR1cm4ge1Jlc3BvbnNlfG51bGx9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNhY2hlV2lsbFVwZGF0ZSA9IGFzeW5jICh7IHJlc3BvbnNlIH0pID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jYWNoZWFibGVSZXNwb25zZS5pc1Jlc3BvbnNlQ2FjaGVhYmxlKHJlc3BvbnNlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9jYWNoZWFibGVSZXNwb25zZSA9IG5ldyBDYWNoZWFibGVSZXNwb25zZShjb25maWcpO1xuICAgIH1cbn1cbmV4cG9ydCB7IENhY2hlYWJsZVJlc3BvbnNlUGx1Z2luIH07XG4iLCAiY29uc3QgaW5zdGFuY2VPZkFueSA9IChvYmplY3QsIGNvbnN0cnVjdG9ycykgPT4gY29uc3RydWN0b3JzLnNvbWUoKGMpID0+IG9iamVjdCBpbnN0YW5jZW9mIGMpO1xuXG5sZXQgaWRiUHJveHlhYmxlVHlwZXM7XG5sZXQgY3Vyc29yQWR2YW5jZU1ldGhvZHM7XG4vLyBUaGlzIGlzIGEgZnVuY3Rpb24gdG8gcHJldmVudCBpdCB0aHJvd2luZyB1cCBpbiBub2RlIGVudmlyb25tZW50cy5cbmZ1bmN0aW9uIGdldElkYlByb3h5YWJsZVR5cGVzKCkge1xuICAgIHJldHVybiAoaWRiUHJveHlhYmxlVHlwZXMgfHxcbiAgICAgICAgKGlkYlByb3h5YWJsZVR5cGVzID0gW1xuICAgICAgICAgICAgSURCRGF0YWJhc2UsXG4gICAgICAgICAgICBJREJPYmplY3RTdG9yZSxcbiAgICAgICAgICAgIElEQkluZGV4LFxuICAgICAgICAgICAgSURCQ3Vyc29yLFxuICAgICAgICAgICAgSURCVHJhbnNhY3Rpb24sXG4gICAgICAgIF0pKTtcbn1cbi8vIFRoaXMgaXMgYSBmdW5jdGlvbiB0byBwcmV2ZW50IGl0IHRocm93aW5nIHVwIGluIG5vZGUgZW52aXJvbm1lbnRzLlxuZnVuY3Rpb24gZ2V0Q3Vyc29yQWR2YW5jZU1ldGhvZHMoKSB7XG4gICAgcmV0dXJuIChjdXJzb3JBZHZhbmNlTWV0aG9kcyB8fFxuICAgICAgICAoY3Vyc29yQWR2YW5jZU1ldGhvZHMgPSBbXG4gICAgICAgICAgICBJREJDdXJzb3IucHJvdG90eXBlLmFkdmFuY2UsXG4gICAgICAgICAgICBJREJDdXJzb3IucHJvdG90eXBlLmNvbnRpbnVlLFxuICAgICAgICAgICAgSURCQ3Vyc29yLnByb3RvdHlwZS5jb250aW51ZVByaW1hcnlLZXksXG4gICAgICAgIF0pKTtcbn1cbmNvbnN0IGN1cnNvclJlcXVlc3RNYXAgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgdHJhbnNhY3Rpb25Eb25lTWFwID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHRyYW5zYWN0aW9uU3RvcmVOYW1lc01hcCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCB0cmFuc2Zvcm1DYWNoZSA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCByZXZlcnNlVHJhbnNmb3JtQ2FjaGUgPSBuZXcgV2Vha01hcCgpO1xuZnVuY3Rpb24gcHJvbWlzaWZ5UmVxdWVzdChyZXF1ZXN0KSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgdW5saXN0ZW4gPSAoKSA9PiB7XG4gICAgICAgICAgICByZXF1ZXN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3N1Y2Nlc3MnLCBzdWNjZXNzKTtcbiAgICAgICAgICAgIHJlcXVlc3QucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvcik7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHdyYXAocmVxdWVzdC5yZXN1bHQpKTtcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGVycm9yID0gKCkgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KHJlcXVlc3QuZXJyb3IpO1xuICAgICAgICAgICAgdW5saXN0ZW4oKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdzdWNjZXNzJywgc3VjY2Vzcyk7XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvcik7XG4gICAgfSk7XG4gICAgcHJvbWlzZVxuICAgICAgICAudGhlbigodmFsdWUpID0+IHtcbiAgICAgICAgLy8gU2luY2UgY3Vyc29yaW5nIHJldXNlcyB0aGUgSURCUmVxdWVzdCAoKnNpZ2gqKSwgd2UgY2FjaGUgaXQgZm9yIGxhdGVyIHJldHJpZXZhbFxuICAgICAgICAvLyAoc2VlIHdyYXBGdW5jdGlvbikuXG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIElEQkN1cnNvcikge1xuICAgICAgICAgICAgY3Vyc29yUmVxdWVzdE1hcC5zZXQodmFsdWUsIHJlcXVlc3QpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENhdGNoaW5nIHRvIGF2b2lkIFwiVW5jYXVnaHQgUHJvbWlzZSBleGNlcHRpb25zXCJcbiAgICB9KVxuICAgICAgICAuY2F0Y2goKCkgPT4geyB9KTtcbiAgICAvLyBUaGlzIG1hcHBpbmcgZXhpc3RzIGluIHJldmVyc2VUcmFuc2Zvcm1DYWNoZSBidXQgZG9lc24ndCBkb2Vzbid0IGV4aXN0IGluIHRyYW5zZm9ybUNhY2hlLiBUaGlzXG4gICAgLy8gaXMgYmVjYXVzZSB3ZSBjcmVhdGUgbWFueSBwcm9taXNlcyBmcm9tIGEgc2luZ2xlIElEQlJlcXVlc3QuXG4gICAgcmV2ZXJzZVRyYW5zZm9ybUNhY2hlLnNldChwcm9taXNlLCByZXF1ZXN0KTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cbmZ1bmN0aW9uIGNhY2hlRG9uZVByb21pc2VGb3JUcmFuc2FjdGlvbih0eCkge1xuICAgIC8vIEVhcmx5IGJhaWwgaWYgd2UndmUgYWxyZWFkeSBjcmVhdGVkIGEgZG9uZSBwcm9taXNlIGZvciB0aGlzIHRyYW5zYWN0aW9uLlxuICAgIGlmICh0cmFuc2FjdGlvbkRvbmVNYXAuaGFzKHR4KSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IGRvbmUgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHVubGlzdGVuID0gKCkgPT4ge1xuICAgICAgICAgICAgdHgucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29tcGxldGUnLCBjb21wbGV0ZSk7XG4gICAgICAgICAgICB0eC5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9yKTtcbiAgICAgICAgICAgIHR4LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgZXJyb3IpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGVycm9yID0gKCkgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KHR4LmVycm9yIHx8IG5ldyBET01FeGNlcHRpb24oJ0Fib3J0RXJyb3InLCAnQWJvcnRFcnJvcicpKTtcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XG4gICAgICAgIH07XG4gICAgICAgIHR4LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbXBsZXRlJywgY29tcGxldGUpO1xuICAgICAgICB0eC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9yKTtcbiAgICAgICAgdHguYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBlcnJvcik7XG4gICAgfSk7XG4gICAgLy8gQ2FjaGUgaXQgZm9yIGxhdGVyIHJldHJpZXZhbC5cbiAgICB0cmFuc2FjdGlvbkRvbmVNYXAuc2V0KHR4LCBkb25lKTtcbn1cbmxldCBpZGJQcm94eVRyYXBzID0ge1xuICAgIGdldCh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSB7XG4gICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBJREJUcmFuc2FjdGlvbikge1xuICAgICAgICAgICAgLy8gU3BlY2lhbCBoYW5kbGluZyBmb3IgdHJhbnNhY3Rpb24uZG9uZS5cbiAgICAgICAgICAgIGlmIChwcm9wID09PSAnZG9uZScpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyYW5zYWN0aW9uRG9uZU1hcC5nZXQodGFyZ2V0KTtcbiAgICAgICAgICAgIC8vIFBvbHlmaWxsIGZvciBvYmplY3RTdG9yZU5hbWVzIGJlY2F1c2Ugb2YgRWRnZS5cbiAgICAgICAgICAgIGlmIChwcm9wID09PSAnb2JqZWN0U3RvcmVOYW1lcycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0Lm9iamVjdFN0b3JlTmFtZXMgfHwgdHJhbnNhY3Rpb25TdG9yZU5hbWVzTWFwLmdldCh0YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTWFrZSB0eC5zdG9yZSByZXR1cm4gdGhlIG9ubHkgc3RvcmUgaW4gdGhlIHRyYW5zYWN0aW9uLCBvciB1bmRlZmluZWQgaWYgdGhlcmUgYXJlIG1hbnkuXG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gJ3N0b3JlJykge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWNlaXZlci5vYmplY3RTdG9yZU5hbWVzWzFdXG4gICAgICAgICAgICAgICAgICAgID8gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgIDogcmVjZWl2ZXIub2JqZWN0U3RvcmUocmVjZWl2ZXIub2JqZWN0U3RvcmVOYW1lc1swXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gRWxzZSB0cmFuc2Zvcm0gd2hhdGV2ZXIgd2UgZ2V0IGJhY2suXG4gICAgICAgIHJldHVybiB3cmFwKHRhcmdldFtwcm9wXSk7XG4gICAgfSxcbiAgICBzZXQodGFyZ2V0LCBwcm9wLCB2YWx1ZSkge1xuICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBoYXModGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBJREJUcmFuc2FjdGlvbiAmJlxuICAgICAgICAgICAgKHByb3AgPT09ICdkb25lJyB8fCBwcm9wID09PSAnc3RvcmUnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByb3AgaW4gdGFyZ2V0O1xuICAgIH0sXG59O1xuZnVuY3Rpb24gcmVwbGFjZVRyYXBzKGNhbGxiYWNrKSB7XG4gICAgaWRiUHJveHlUcmFwcyA9IGNhbGxiYWNrKGlkYlByb3h5VHJhcHMpO1xufVxuZnVuY3Rpb24gd3JhcEZ1bmN0aW9uKGZ1bmMpIHtcbiAgICAvLyBEdWUgdG8gZXhwZWN0ZWQgb2JqZWN0IGVxdWFsaXR5ICh3aGljaCBpcyBlbmZvcmNlZCBieSB0aGUgY2FjaGluZyBpbiBgd3JhcGApLCB3ZVxuICAgIC8vIG9ubHkgY3JlYXRlIG9uZSBuZXcgZnVuYyBwZXIgZnVuYy5cbiAgICAvLyBFZGdlIGRvZXNuJ3Qgc3VwcG9ydCBvYmplY3RTdG9yZU5hbWVzIChib29vKSwgc28gd2UgcG9seWZpbGwgaXQgaGVyZS5cbiAgICBpZiAoZnVuYyA9PT0gSURCRGF0YWJhc2UucHJvdG90eXBlLnRyYW5zYWN0aW9uICYmXG4gICAgICAgICEoJ29iamVjdFN0b3JlTmFtZXMnIGluIElEQlRyYW5zYWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdG9yZU5hbWVzLCAuLi5hcmdzKSB7XG4gICAgICAgICAgICBjb25zdCB0eCA9IGZ1bmMuY2FsbCh1bndyYXAodGhpcyksIHN0b3JlTmFtZXMsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgdHJhbnNhY3Rpb25TdG9yZU5hbWVzTWFwLnNldCh0eCwgc3RvcmVOYW1lcy5zb3J0ID8gc3RvcmVOYW1lcy5zb3J0KCkgOiBbc3RvcmVOYW1lc10pO1xuICAgICAgICAgICAgcmV0dXJuIHdyYXAodHgpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvLyBDdXJzb3IgbWV0aG9kcyBhcmUgc3BlY2lhbCwgYXMgdGhlIGJlaGF2aW91ciBpcyBhIGxpdHRsZSBtb3JlIGRpZmZlcmVudCB0byBzdGFuZGFyZCBJREIuIEluXG4gICAgLy8gSURCLCB5b3UgYWR2YW5jZSB0aGUgY3Vyc29yIGFuZCB3YWl0IGZvciBhIG5ldyAnc3VjY2Vzcycgb24gdGhlIElEQlJlcXVlc3QgdGhhdCBnYXZlIHlvdSB0aGVcbiAgICAvLyBjdXJzb3IuIEl0J3Mga2luZGEgbGlrZSBhIHByb21pc2UgdGhhdCBjYW4gcmVzb2x2ZSB3aXRoIG1hbnkgdmFsdWVzLiBUaGF0IGRvZXNuJ3QgbWFrZSBzZW5zZVxuICAgIC8vIHdpdGggcmVhbCBwcm9taXNlcywgc28gZWFjaCBhZHZhbmNlIG1ldGhvZHMgcmV0dXJucyBhIG5ldyBwcm9taXNlIGZvciB0aGUgY3Vyc29yIG9iamVjdCwgb3JcbiAgICAvLyB1bmRlZmluZWQgaWYgdGhlIGVuZCBvZiB0aGUgY3Vyc29yIGhhcyBiZWVuIHJlYWNoZWQuXG4gICAgaWYgKGdldEN1cnNvckFkdmFuY2VNZXRob2RzKCkuaW5jbHVkZXMoZnVuYykpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICAgICAgICAvLyBDYWxsaW5nIHRoZSBvcmlnaW5hbCBmdW5jdGlvbiB3aXRoIHRoZSBwcm94eSBhcyAndGhpcycgY2F1c2VzIElMTEVHQUwgSU5WT0NBVElPTiwgc28gd2UgdXNlXG4gICAgICAgICAgICAvLyB0aGUgb3JpZ2luYWwgb2JqZWN0LlxuICAgICAgICAgICAgZnVuYy5hcHBseSh1bndyYXAodGhpcyksIGFyZ3MpO1xuICAgICAgICAgICAgcmV0dXJuIHdyYXAoY3Vyc29yUmVxdWVzdE1hcC5nZXQodGhpcykpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgICAgLy8gQ2FsbGluZyB0aGUgb3JpZ2luYWwgZnVuY3Rpb24gd2l0aCB0aGUgcHJveHkgYXMgJ3RoaXMnIGNhdXNlcyBJTExFR0FMIElOVk9DQVRJT04sIHNvIHdlIHVzZVxuICAgICAgICAvLyB0aGUgb3JpZ2luYWwgb2JqZWN0LlxuICAgICAgICByZXR1cm4gd3JhcChmdW5jLmFwcGx5KHVud3JhcCh0aGlzKSwgYXJncykpO1xuICAgIH07XG59XG5mdW5jdGlvbiB0cmFuc2Zvcm1DYWNoYWJsZVZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgcmV0dXJuIHdyYXBGdW5jdGlvbih2YWx1ZSk7XG4gICAgLy8gVGhpcyBkb2Vzbid0IHJldHVybiwgaXQganVzdCBjcmVhdGVzIGEgJ2RvbmUnIHByb21pc2UgZm9yIHRoZSB0cmFuc2FjdGlvbixcbiAgICAvLyB3aGljaCBpcyBsYXRlciByZXR1cm5lZCBmb3IgdHJhbnNhY3Rpb24uZG9uZSAoc2VlIGlkYk9iamVjdEhhbmRsZXIpLlxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIElEQlRyYW5zYWN0aW9uKVxuICAgICAgICBjYWNoZURvbmVQcm9taXNlRm9yVHJhbnNhY3Rpb24odmFsdWUpO1xuICAgIGlmIChpbnN0YW5jZU9mQW55KHZhbHVlLCBnZXRJZGJQcm94eWFibGVUeXBlcygpKSlcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eSh2YWx1ZSwgaWRiUHJveHlUcmFwcyk7XG4gICAgLy8gUmV0dXJuIHRoZSBzYW1lIHZhbHVlIGJhY2sgaWYgd2UncmUgbm90IGdvaW5nIHRvIHRyYW5zZm9ybSBpdC5cbiAgICByZXR1cm4gdmFsdWU7XG59XG5mdW5jdGlvbiB3cmFwKHZhbHVlKSB7XG4gICAgLy8gV2Ugc29tZXRpbWVzIGdlbmVyYXRlIG11bHRpcGxlIHByb21pc2VzIGZyb20gYSBzaW5nbGUgSURCUmVxdWVzdCAoZWcgd2hlbiBjdXJzb3JpbmcpLCBiZWNhdXNlXG4gICAgLy8gSURCIGlzIHdlaXJkIGFuZCBhIHNpbmdsZSBJREJSZXF1ZXN0IGNhbiB5aWVsZCBtYW55IHJlc3BvbnNlcywgc28gdGhlc2UgY2FuJ3QgYmUgY2FjaGVkLlxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIElEQlJlcXVlc3QpXG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHZhbHVlKTtcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IHRyYW5zZm9ybWVkIHRoaXMgdmFsdWUgYmVmb3JlLCByZXVzZSB0aGUgdHJhbnNmb3JtZWQgdmFsdWUuXG4gICAgLy8gVGhpcyBpcyBmYXN0ZXIsIGJ1dCBpdCBhbHNvIHByb3ZpZGVzIG9iamVjdCBlcXVhbGl0eS5cbiAgICBpZiAodHJhbnNmb3JtQ2FjaGUuaGFzKHZhbHVlKSlcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybUNhY2hlLmdldCh2YWx1ZSk7XG4gICAgY29uc3QgbmV3VmFsdWUgPSB0cmFuc2Zvcm1DYWNoYWJsZVZhbHVlKHZhbHVlKTtcbiAgICAvLyBOb3QgYWxsIHR5cGVzIGFyZSB0cmFuc2Zvcm1lZC5cbiAgICAvLyBUaGVzZSBtYXkgYmUgcHJpbWl0aXZlIHR5cGVzLCBzbyB0aGV5IGNhbid0IGJlIFdlYWtNYXAga2V5cy5cbiAgICBpZiAobmV3VmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgIHRyYW5zZm9ybUNhY2hlLnNldCh2YWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICByZXZlcnNlVHJhbnNmb3JtQ2FjaGUuc2V0KG5ld1ZhbHVlLCB2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBuZXdWYWx1ZTtcbn1cbmNvbnN0IHVud3JhcCA9ICh2YWx1ZSkgPT4gcmV2ZXJzZVRyYW5zZm9ybUNhY2hlLmdldCh2YWx1ZSk7XG5cbmV4cG9ydCB7IHJldmVyc2VUcmFuc2Zvcm1DYWNoZSBhcyBhLCBpbnN0YW5jZU9mQW55IGFzIGksIHJlcGxhY2VUcmFwcyBhcyByLCB1bndyYXAgYXMgdSwgd3JhcCBhcyB3IH07XG4iLCAiaW1wb3J0IHsgdyBhcyB3cmFwLCByIGFzIHJlcGxhY2VUcmFwcyB9IGZyb20gJy4vd3JhcC1pZGItdmFsdWUuanMnO1xuZXhwb3J0IHsgdSBhcyB1bndyYXAsIHcgYXMgd3JhcCB9IGZyb20gJy4vd3JhcC1pZGItdmFsdWUuanMnO1xuXG4vKipcbiAqIE9wZW4gYSBkYXRhYmFzZS5cbiAqXG4gKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBkYXRhYmFzZS5cbiAqIEBwYXJhbSB2ZXJzaW9uIFNjaGVtYSB2ZXJzaW9uLlxuICogQHBhcmFtIGNhbGxiYWNrcyBBZGRpdGlvbmFsIGNhbGxiYWNrcy5cbiAqL1xuZnVuY3Rpb24gb3BlbkRCKG5hbWUsIHZlcnNpb24sIHsgYmxvY2tlZCwgdXBncmFkZSwgYmxvY2tpbmcsIHRlcm1pbmF0ZWQgfSA9IHt9KSB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGluZGV4ZWREQi5vcGVuKG5hbWUsIHZlcnNpb24pO1xuICAgIGNvbnN0IG9wZW5Qcm9taXNlID0gd3JhcChyZXF1ZXN0KTtcbiAgICBpZiAodXBncmFkZSkge1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3VwZ3JhZGVuZWVkZWQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHVwZ3JhZGUod3JhcChyZXF1ZXN0LnJlc3VsdCksIGV2ZW50Lm9sZFZlcnNpb24sIGV2ZW50Lm5ld1ZlcnNpb24sIHdyYXAocmVxdWVzdC50cmFuc2FjdGlvbikpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGJsb2NrZWQpXG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignYmxvY2tlZCcsICgpID0+IGJsb2NrZWQoKSk7XG4gICAgb3BlblByb21pc2VcbiAgICAgICAgLnRoZW4oKGRiKSA9PiB7XG4gICAgICAgIGlmICh0ZXJtaW5hdGVkKVxuICAgICAgICAgICAgZGIuYWRkRXZlbnRMaXN0ZW5lcignY2xvc2UnLCAoKSA9PiB0ZXJtaW5hdGVkKCkpO1xuICAgICAgICBpZiAoYmxvY2tpbmcpXG4gICAgICAgICAgICBkYi5hZGRFdmVudExpc3RlbmVyKCd2ZXJzaW9uY2hhbmdlJywgKCkgPT4gYmxvY2tpbmcoKSk7XG4gICAgfSlcbiAgICAgICAgLmNhdGNoKCgpID0+IHsgfSk7XG4gICAgcmV0dXJuIG9wZW5Qcm9taXNlO1xufVxuLyoqXG4gKiBEZWxldGUgYSBkYXRhYmFzZS5cbiAqXG4gKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBkYXRhYmFzZS5cbiAqL1xuZnVuY3Rpb24gZGVsZXRlREIobmFtZSwgeyBibG9ja2VkIH0gPSB7fSkge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBpbmRleGVkREIuZGVsZXRlRGF0YWJhc2UobmFtZSk7XG4gICAgaWYgKGJsb2NrZWQpXG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignYmxvY2tlZCcsICgpID0+IGJsb2NrZWQoKSk7XG4gICAgcmV0dXJuIHdyYXAocmVxdWVzdCkudGhlbigoKSA9PiB1bmRlZmluZWQpO1xufVxuXG5jb25zdCByZWFkTWV0aG9kcyA9IFsnZ2V0JywgJ2dldEtleScsICdnZXRBbGwnLCAnZ2V0QWxsS2V5cycsICdjb3VudCddO1xuY29uc3Qgd3JpdGVNZXRob2RzID0gWydwdXQnLCAnYWRkJywgJ2RlbGV0ZScsICdjbGVhciddO1xuY29uc3QgY2FjaGVkTWV0aG9kcyA9IG5ldyBNYXAoKTtcbmZ1bmN0aW9uIGdldE1ldGhvZCh0YXJnZXQsIHByb3ApIHtcbiAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBJREJEYXRhYmFzZSAmJlxuICAgICAgICAhKHByb3AgaW4gdGFyZ2V0KSAmJlxuICAgICAgICB0eXBlb2YgcHJvcCA9PT0gJ3N0cmluZycpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNhY2hlZE1ldGhvZHMuZ2V0KHByb3ApKVxuICAgICAgICByZXR1cm4gY2FjaGVkTWV0aG9kcy5nZXQocHJvcCk7XG4gICAgY29uc3QgdGFyZ2V0RnVuY05hbWUgPSBwcm9wLnJlcGxhY2UoL0Zyb21JbmRleCQvLCAnJyk7XG4gICAgY29uc3QgdXNlSW5kZXggPSBwcm9wICE9PSB0YXJnZXRGdW5jTmFtZTtcbiAgICBjb25zdCBpc1dyaXRlID0gd3JpdGVNZXRob2RzLmluY2x1ZGVzKHRhcmdldEZ1bmNOYW1lKTtcbiAgICBpZiAoXG4gICAgLy8gQmFpbCBpZiB0aGUgdGFyZ2V0IGRvZXNuJ3QgZXhpc3Qgb24gdGhlIHRhcmdldC4gRWcsIGdldEFsbCBpc24ndCBpbiBFZGdlLlxuICAgICEodGFyZ2V0RnVuY05hbWUgaW4gKHVzZUluZGV4ID8gSURCSW5kZXggOiBJREJPYmplY3RTdG9yZSkucHJvdG90eXBlKSB8fFxuICAgICAgICAhKGlzV3JpdGUgfHwgcmVhZE1ldGhvZHMuaW5jbHVkZXModGFyZ2V0RnVuY05hbWUpKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG1ldGhvZCA9IGFzeW5jIGZ1bmN0aW9uIChzdG9yZU5hbWUsIC4uLmFyZ3MpIHtcbiAgICAgICAgLy8gaXNXcml0ZSA/ICdyZWFkd3JpdGUnIDogdW5kZWZpbmVkIGd6aXBwcyBiZXR0ZXIsIGJ1dCBmYWlscyBpbiBFZGdlIDooXG4gICAgICAgIGNvbnN0IHR4ID0gdGhpcy50cmFuc2FjdGlvbihzdG9yZU5hbWUsIGlzV3JpdGUgPyAncmVhZHdyaXRlJyA6ICdyZWFkb25seScpO1xuICAgICAgICBsZXQgdGFyZ2V0ID0gdHguc3RvcmU7XG4gICAgICAgIGlmICh1c2VJbmRleClcbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5pbmRleChhcmdzLnNoaWZ0KCkpO1xuICAgICAgICAvLyBNdXN0IHJlamVjdCBpZiBvcCByZWplY3RzLlxuICAgICAgICAvLyBJZiBpdCdzIGEgd3JpdGUgb3BlcmF0aW9uLCBtdXN0IHJlamVjdCBpZiB0eC5kb25lIHJlamVjdHMuXG4gICAgICAgIC8vIE11c3QgcmVqZWN0IHdpdGggb3AgcmVqZWN0aW9uIGZpcnN0LlxuICAgICAgICAvLyBNdXN0IHJlc29sdmUgd2l0aCBvcCB2YWx1ZS5cbiAgICAgICAgLy8gTXVzdCBoYW5kbGUgYm90aCBwcm9taXNlcyAobm8gdW5oYW5kbGVkIHJlamVjdGlvbnMpXG4gICAgICAgIHJldHVybiAoYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgdGFyZ2V0W3RhcmdldEZ1bmNOYW1lXSguLi5hcmdzKSxcbiAgICAgICAgICAgIGlzV3JpdGUgJiYgdHguZG9uZSxcbiAgICAgICAgXSkpWzBdO1xuICAgIH07XG4gICAgY2FjaGVkTWV0aG9kcy5zZXQocHJvcCwgbWV0aG9kKTtcbiAgICByZXR1cm4gbWV0aG9kO1xufVxucmVwbGFjZVRyYXBzKChvbGRUcmFwcykgPT4gKHtcbiAgICAuLi5vbGRUcmFwcyxcbiAgICBnZXQ6ICh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSA9PiBnZXRNZXRob2QodGFyZ2V0LCBwcm9wKSB8fCBvbGRUcmFwcy5nZXQodGFyZ2V0LCBwcm9wLCByZWNlaXZlciksXG4gICAgaGFzOiAodGFyZ2V0LCBwcm9wKSA9PiAhIWdldE1ldGhvZCh0YXJnZXQsIHByb3ApIHx8IG9sZFRyYXBzLmhhcyh0YXJnZXQsIHByb3ApLFxufSkpO1xuXG5leHBvcnQgeyBkZWxldGVEQiwgb3BlbkRCIH07XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBAdHMtaWdub3JlXG50cnkge1xuICAgIHNlbGZbJ3dvcmtib3g6ZXhwaXJhdGlvbjo2LjUuMyddICYmIF8oKTtcbn1cbmNhdGNoIChlKSB7IH1cbiIsICIvKlxuICBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgeyBvcGVuREIsIGRlbGV0ZURCIH0gZnJvbSAnaWRiJztcbmltcG9ydCAnLi4vX3ZlcnNpb24uanMnO1xuY29uc3QgREJfTkFNRSA9ICd3b3JrYm94LWV4cGlyYXRpb24nO1xuY29uc3QgQ0FDSEVfT0JKRUNUX1NUT1JFID0gJ2NhY2hlLWVudHJpZXMnO1xuY29uc3Qgbm9ybWFsaXplVVJMID0gKHVuTm9ybWFsaXplZFVybCkgPT4ge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwodW5Ob3JtYWxpemVkVXJsLCBsb2NhdGlvbi5ocmVmKTtcbiAgICB1cmwuaGFzaCA9ICcnO1xuICAgIHJldHVybiB1cmwuaHJlZjtcbn07XG4vKipcbiAqIFJldHVybnMgdGhlIHRpbWVzdGFtcCBtb2RlbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5jbGFzcyBDYWNoZVRpbWVzdGFtcHNNb2RlbCB7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2FjaGVOYW1lXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNhY2hlTmFtZSkge1xuICAgICAgICB0aGlzLl9kYiA9IG51bGw7XG4gICAgICAgIHRoaXMuX2NhY2hlTmFtZSA9IGNhY2hlTmFtZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYW4gdXBncmFkZSBvZiBpbmRleGVkREIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0lEQlBEYXRhYmFzZTxDYWNoZURiU2NoZW1hPn0gZGJcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3VwZ3JhZGVEYihkYikge1xuICAgICAgICAvLyBUT0RPKHBoaWxpcHdhbHRvbik6IEVkZ2VIVE1MIGRvZXNuJ3Qgc3VwcG9ydCBhcnJheXMgYXMgYSBrZXlQYXRoLCBzbyB3ZVxuICAgICAgICAvLyBoYXZlIHRvIHVzZSB0aGUgYGlkYCBrZXlQYXRoIGhlcmUgYW5kIGNyZWF0ZSBvdXIgb3duIHZhbHVlcyAoYVxuICAgICAgICAvLyBjb25jYXRlbmF0aW9uIG9mIGB1cmwgKyBjYWNoZU5hbWVgKSBpbnN0ZWFkIG9mIHNpbXBseSB1c2luZ1xuICAgICAgICAvLyBga2V5UGF0aDogWyd1cmwnLCAnY2FjaGVOYW1lJ11gLCB3aGljaCBpcyBzdXBwb3J0ZWQgaW4gb3RoZXIgYnJvd3NlcnMuXG4gICAgICAgIGNvbnN0IG9ialN0b3JlID0gZGIuY3JlYXRlT2JqZWN0U3RvcmUoQ0FDSEVfT0JKRUNUX1NUT1JFLCB7IGtleVBhdGg6ICdpZCcgfSk7XG4gICAgICAgIC8vIFRPRE8ocGhpbGlwd2FsdG9uKTogb25jZSB3ZSBkb24ndCBoYXZlIHRvIHN1cHBvcnQgRWRnZUhUTUwsIHdlIGNhblxuICAgICAgICAvLyBjcmVhdGUgYSBzaW5nbGUgaW5kZXggd2l0aCB0aGUga2V5UGF0aCBgWydjYWNoZU5hbWUnLCAndGltZXN0YW1wJ11gXG4gICAgICAgIC8vIGluc3RlYWQgb2YgZG9pbmcgYm90aCB0aGVzZSBpbmRleGVzLlxuICAgICAgICBvYmpTdG9yZS5jcmVhdGVJbmRleCgnY2FjaGVOYW1lJywgJ2NhY2hlTmFtZScsIHsgdW5pcXVlOiBmYWxzZSB9KTtcbiAgICAgICAgb2JqU3RvcmUuY3JlYXRlSW5kZXgoJ3RpbWVzdGFtcCcsICd0aW1lc3RhbXAnLCB7IHVuaXF1ZTogZmFsc2UgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIHVwZ3JhZGUgb2YgaW5kZXhlZERCIGFuZCBkZWxldGVzIGRlcHJlY2F0ZWQgREJzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtJREJQRGF0YWJhc2U8Q2FjaGVEYlNjaGVtYT59IGRiXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF91cGdyYWRlRGJBbmREZWxldGVPbGREYnMoZGIpIHtcbiAgICAgICAgdGhpcy5fdXBncmFkZURiKGRiKTtcbiAgICAgICAgaWYgKHRoaXMuX2NhY2hlTmFtZSkge1xuICAgICAgICAgICAgdm9pZCBkZWxldGVEQih0aGlzLl9jYWNoZU5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZXN0YW1wXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGFzeW5jIHNldFRpbWVzdGFtcCh1cmwsIHRpbWVzdGFtcCkge1xuICAgICAgICB1cmwgPSBub3JtYWxpemVVUkwodXJsKTtcbiAgICAgICAgY29uc3QgZW50cnkgPSB7XG4gICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICB0aW1lc3RhbXAsXG4gICAgICAgICAgICBjYWNoZU5hbWU6IHRoaXMuX2NhY2hlTmFtZSxcbiAgICAgICAgICAgIC8vIENyZWF0aW5nIGFuIElEIGZyb20gdGhlIFVSTCBhbmQgY2FjaGUgbmFtZSB3b24ndCBiZSBuZWNlc3Nhcnkgb25jZVxuICAgICAgICAgICAgLy8gRWRnZSBzd2l0Y2hlcyB0byBDaHJvbWl1bSBhbmQgYWxsIGJyb3dzZXJzIHdlIHN1cHBvcnQgd29yayB3aXRoXG4gICAgICAgICAgICAvLyBhcnJheSBrZXlQYXRocy5cbiAgICAgICAgICAgIGlkOiB0aGlzLl9nZXRJZCh1cmwpLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBkYiA9IGF3YWl0IHRoaXMuZ2V0RGIoKTtcbiAgICAgICAgY29uc3QgdHggPSBkYi50cmFuc2FjdGlvbihDQUNIRV9PQkpFQ1RfU1RPUkUsICdyZWFkd3JpdGUnLCB7XG4gICAgICAgICAgICBkdXJhYmlsaXR5OiAncmVsYXhlZCcsXG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCB0eC5zdG9yZS5wdXQoZW50cnkpO1xuICAgICAgICBhd2FpdCB0eC5kb25lO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB0aW1lc3RhbXAgc3RvcmVkIGZvciBhIGdpdmVuIFVSTC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAcmV0dXJuIHtudW1iZXIgfCB1bmRlZmluZWR9XG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGFzeW5jIGdldFRpbWVzdGFtcCh1cmwpIHtcbiAgICAgICAgY29uc3QgZGIgPSBhd2FpdCB0aGlzLmdldERiKCk7XG4gICAgICAgIGNvbnN0IGVudHJ5ID0gYXdhaXQgZGIuZ2V0KENBQ0hFX09CSkVDVF9TVE9SRSwgdGhpcy5fZ2V0SWQodXJsKSk7XG4gICAgICAgIHJldHVybiBlbnRyeSA9PT0gbnVsbCB8fCBlbnRyeSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZW50cnkudGltZXN0YW1wO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJdGVyYXRlcyB0aHJvdWdoIGFsbCB0aGUgZW50cmllcyBpbiB0aGUgb2JqZWN0IHN0b3JlIChmcm9tIG5ld2VzdCB0b1xuICAgICAqIG9sZGVzdCkgYW5kIHJlbW92ZXMgZW50cmllcyBvbmNlIGVpdGhlciBgbWF4Q291bnRgIGlzIHJlYWNoZWQgb3IgdGhlXG4gICAgICogZW50cnkncyB0aW1lc3RhbXAgaXMgbGVzcyB0aGFuIGBtaW5UaW1lc3RhbXBgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1pblRpbWVzdGFtcFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtYXhDb3VudFxuICAgICAqIEByZXR1cm4ge0FycmF5PHN0cmluZz59XG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGFzeW5jIGV4cGlyZUVudHJpZXMobWluVGltZXN0YW1wLCBtYXhDb3VudCkge1xuICAgICAgICBjb25zdCBkYiA9IGF3YWl0IHRoaXMuZ2V0RGIoKTtcbiAgICAgICAgbGV0IGN1cnNvciA9IGF3YWl0IGRiXG4gICAgICAgICAgICAudHJhbnNhY3Rpb24oQ0FDSEVfT0JKRUNUX1NUT1JFKVxuICAgICAgICAgICAgLnN0b3JlLmluZGV4KCd0aW1lc3RhbXAnKVxuICAgICAgICAgICAgLm9wZW5DdXJzb3IobnVsbCwgJ3ByZXYnKTtcbiAgICAgICAgY29uc3QgZW50cmllc1RvRGVsZXRlID0gW107XG4gICAgICAgIGxldCBlbnRyaWVzTm90RGVsZXRlZENvdW50ID0gMDtcbiAgICAgICAgd2hpbGUgKGN1cnNvcikge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gY3Vyc29yLnZhbHVlO1xuICAgICAgICAgICAgLy8gVE9ETyhwaGlsaXB3YWx0b24pOiBvbmNlIHdlIGNhbiB1c2UgYSBtdWx0aS1rZXkgaW5kZXgsIHdlXG4gICAgICAgICAgICAvLyB3b24ndCBoYXZlIHRvIGNoZWNrIGBjYWNoZU5hbWVgIGhlcmUuXG4gICAgICAgICAgICBpZiAocmVzdWx0LmNhY2hlTmFtZSA9PT0gdGhpcy5fY2FjaGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgLy8gRGVsZXRlIGFuIGVudHJ5IGlmIGl0J3Mgb2xkZXIgdGhhbiB0aGUgbWF4IGFnZSBvclxuICAgICAgICAgICAgICAgIC8vIGlmIHdlIGFscmVhZHkgaGF2ZSB0aGUgbWF4IG51bWJlciBhbGxvd2VkLlxuICAgICAgICAgICAgICAgIGlmICgobWluVGltZXN0YW1wICYmIHJlc3VsdC50aW1lc3RhbXAgPCBtaW5UaW1lc3RhbXApIHx8XG4gICAgICAgICAgICAgICAgICAgIChtYXhDb3VudCAmJiBlbnRyaWVzTm90RGVsZXRlZENvdW50ID49IG1heENvdW50KSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPKHBoaWxpcHdhbHRvbik6IHdlIHNob3VsZCBiZSBhYmxlIHRvIGRlbGV0ZSB0aGVcbiAgICAgICAgICAgICAgICAgICAgLy8gZW50cnkgcmlnaHQgaGVyZSwgYnV0IGRvaW5nIHNvIGNhdXNlcyBhbiBpdGVyYXRpb25cbiAgICAgICAgICAgICAgICAgICAgLy8gYnVnIGluIFNhZmFyaSBzdGFibGUgKGZpeGVkIGluIFRQKS4gSW5zdGVhZCB3ZSBjYW5cbiAgICAgICAgICAgICAgICAgICAgLy8gc3RvcmUgdGhlIGtleXMgb2YgdGhlIGVudHJpZXMgdG8gZGVsZXRlLCBhbmQgdGhlblxuICAgICAgICAgICAgICAgICAgICAvLyBkZWxldGUgdGhlIHNlcGFyYXRlIHRyYW5zYWN0aW9ucy5cbiAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZS93b3JrYm94L2lzc3Vlcy8xOTc4XG4gICAgICAgICAgICAgICAgICAgIC8vIGN1cnNvci5kZWxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gV2Ugb25seSBuZWVkIHRvIHJldHVybiB0aGUgVVJMLCBub3QgdGhlIHdob2xlIGVudHJ5LlxuICAgICAgICAgICAgICAgICAgICBlbnRyaWVzVG9EZWxldGUucHVzaChjdXJzb3IudmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZW50cmllc05vdERlbGV0ZWRDb3VudCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnNvciA9IGF3YWl0IGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRPRE8ocGhpbGlwd2FsdG9uKTogb25jZSB0aGUgU2FmYXJpIGJ1ZyBpbiB0aGUgZm9sbG93aW5nIGlzc3VlIGlzIGZpeGVkLFxuICAgICAgICAvLyB3ZSBzaG91bGQgYmUgYWJsZSB0byByZW1vdmUgdGhpcyBsb29wIGFuZCBkbyB0aGUgZW50cnkgZGVsZXRpb24gaW4gdGhlXG4gICAgICAgIC8vIGN1cnNvciBsb29wIGFib3ZlOlxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3dvcmtib3gvaXNzdWVzLzE5NzhcbiAgICAgICAgY29uc3QgdXJsc0RlbGV0ZWQgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzVG9EZWxldGUpIHtcbiAgICAgICAgICAgIGF3YWl0IGRiLmRlbGV0ZShDQUNIRV9PQkpFQ1RfU1RPUkUsIGVudHJ5LmlkKTtcbiAgICAgICAgICAgIHVybHNEZWxldGVkLnB1c2goZW50cnkudXJsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXJsc0RlbGV0ZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRha2VzIGEgVVJMIGFuZCByZXR1cm5zIGFuIElEIHRoYXQgd2lsbCBiZSB1bmlxdWUgaW4gdGhlIG9iamVjdCBzdG9yZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9nZXRJZCh1cmwpIHtcbiAgICAgICAgLy8gQ3JlYXRpbmcgYW4gSUQgZnJvbSB0aGUgVVJMIGFuZCBjYWNoZSBuYW1lIHdvbid0IGJlIG5lY2Vzc2FyeSBvbmNlXG4gICAgICAgIC8vIEVkZ2Ugc3dpdGNoZXMgdG8gQ2hyb21pdW0gYW5kIGFsbCBicm93c2VycyB3ZSBzdXBwb3J0IHdvcmsgd2l0aFxuICAgICAgICAvLyBhcnJheSBrZXlQYXRocy5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlTmFtZSArICd8JyArIG5vcm1hbGl6ZVVSTCh1cmwpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIG9wZW4gY29ubmVjdGlvbiB0byB0aGUgZGF0YWJhc2UuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGFzeW5jIGdldERiKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2RiKSB7XG4gICAgICAgICAgICB0aGlzLl9kYiA9IGF3YWl0IG9wZW5EQihEQl9OQU1FLCAxLCB7XG4gICAgICAgICAgICAgICAgdXBncmFkZTogdGhpcy5fdXBncmFkZURiQW5kRGVsZXRlT2xkRGJzLmJpbmQodGhpcyksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZGI7XG4gICAgfVxufVxuZXhwb3J0IHsgQ2FjaGVUaW1lc3RhbXBzTW9kZWwgfTtcbiIsICIvKlxuICBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvYXNzZXJ0LmpzJztcbmltcG9ydCB7IGRvbnRXYWl0Rm9yIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2RvbnRXYWl0Rm9yLmpzJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9sb2dnZXIuanMnO1xuaW1wb3J0IHsgV29ya2JveEVycm9yIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL1dvcmtib3hFcnJvci5qcyc7XG5pbXBvcnQgeyBDYWNoZVRpbWVzdGFtcHNNb2RlbCB9IGZyb20gJy4vbW9kZWxzL0NhY2hlVGltZXN0YW1wc01vZGVsLmpzJztcbmltcG9ydCAnLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIFRoZSBgQ2FjaGVFeHBpcmF0aW9uYCBjbGFzcyBhbGxvd3MgeW91IGRlZmluZSBhbiBleHBpcmF0aW9uIGFuZCAvIG9yXG4gKiBsaW1pdCBvbiB0aGUgbnVtYmVyIG9mIHJlc3BvbnNlcyBzdG9yZWQgaW4gYVxuICogW2BDYWNoZWBdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DYWNoZSkuXG4gKlxuICogQG1lbWJlcm9mIHdvcmtib3gtZXhwaXJhdGlvblxuICovXG5jbGFzcyBDYWNoZUV4cGlyYXRpb24ge1xuICAgIC8qKlxuICAgICAqIFRvIGNvbnN0cnVjdCBhIG5ldyBDYWNoZUV4cGlyYXRpb24gaW5zdGFuY2UgeW91IG11c3QgcHJvdmlkZSBhdCBsZWFzdFxuICAgICAqIG9uZSBvZiB0aGUgYGNvbmZpZ2AgcHJvcGVydGllcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjYWNoZU5hbWUgTmFtZSBvZiB0aGUgY2FjaGUgdG8gYXBwbHkgcmVzdHJpY3Rpb25zIHRvLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2NvbmZpZy5tYXhFbnRyaWVzXSBUaGUgbWF4aW11bSBudW1iZXIgb2YgZW50cmllcyB0byBjYWNoZS5cbiAgICAgKiBFbnRyaWVzIHVzZWQgdGhlIGxlYXN0IHdpbGwgYmUgcmVtb3ZlZCBhcyB0aGUgbWF4aW11bSBpcyByZWFjaGVkLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbY29uZmlnLm1heEFnZVNlY29uZHNdIFRoZSBtYXhpbXVtIGFnZSBvZiBhbiBlbnRyeSBiZWZvcmVcbiAgICAgKiBpdCdzIHRyZWF0ZWQgYXMgc3RhbGUgYW5kIHJlbW92ZWQuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtjb25maWcubWF0Y2hPcHRpb25zXSBUaGUgW2BDYWNoZVF1ZXJ5T3B0aW9uc2BdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DYWNoZS9kZWxldGUjUGFyYW1ldGVycylcbiAgICAgKiB0aGF0IHdpbGwgYmUgdXNlZCB3aGVuIGNhbGxpbmcgYGRlbGV0ZSgpYCBvbiB0aGUgY2FjaGUuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY2FjaGVOYW1lLCBjb25maWcgPSB7fSkge1xuICAgICAgICB0aGlzLl9pc1J1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcmVydW5SZXF1ZXN0ZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGFzc2VydC5pc1R5cGUoY2FjaGVOYW1lLCAnc3RyaW5nJywge1xuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LWV4cGlyYXRpb24nLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ0NhY2hlRXhwaXJhdGlvbicsXG4gICAgICAgICAgICAgICAgZnVuY05hbWU6ICdjb25zdHJ1Y3RvcicsXG4gICAgICAgICAgICAgICAgcGFyYW1OYW1lOiAnY2FjaGVOYW1lJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCEoY29uZmlnLm1heEVudHJpZXMgfHwgY29uZmlnLm1heEFnZVNlY29uZHMpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFdvcmtib3hFcnJvcignbWF4LWVudHJpZXMtb3ItYWdlLXJlcXVpcmVkJywge1xuICAgICAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1leHBpcmF0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnQ2FjaGVFeHBpcmF0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgZnVuY05hbWU6ICdjb25zdHJ1Y3RvcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29uZmlnLm1heEVudHJpZXMpIHtcbiAgICAgICAgICAgICAgICBhc3NlcnQuaXNUeXBlKGNvbmZpZy5tYXhFbnRyaWVzLCAnbnVtYmVyJywge1xuICAgICAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1leHBpcmF0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnQ2FjaGVFeHBpcmF0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgZnVuY05hbWU6ICdjb25zdHJ1Y3RvcicsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ2NvbmZpZy5tYXhFbnRyaWVzJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb25maWcubWF4QWdlU2Vjb25kcykge1xuICAgICAgICAgICAgICAgIGFzc2VydC5pc1R5cGUoY29uZmlnLm1heEFnZVNlY29uZHMsICdudW1iZXInLCB7XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LWV4cGlyYXRpb24nLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdDYWNoZUV4cGlyYXRpb24nLFxuICAgICAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ2NvbnN0cnVjdG9yJyxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1OYW1lOiAnY29uZmlnLm1heEFnZVNlY29uZHMnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21heEVudHJpZXMgPSBjb25maWcubWF4RW50cmllcztcbiAgICAgICAgdGhpcy5fbWF4QWdlU2Vjb25kcyA9IGNvbmZpZy5tYXhBZ2VTZWNvbmRzO1xuICAgICAgICB0aGlzLl9tYXRjaE9wdGlvbnMgPSBjb25maWcubWF0Y2hPcHRpb25zO1xuICAgICAgICB0aGlzLl9jYWNoZU5hbWUgPSBjYWNoZU5hbWU7XG4gICAgICAgIHRoaXMuX3RpbWVzdGFtcE1vZGVsID0gbmV3IENhY2hlVGltZXN0YW1wc01vZGVsKGNhY2hlTmFtZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEV4cGlyZXMgZW50cmllcyBmb3IgdGhlIGdpdmVuIGNhY2hlIGFuZCBnaXZlbiBjcml0ZXJpYS5cbiAgICAgKi9cbiAgICBhc3luYyBleHBpcmVFbnRyaWVzKCkge1xuICAgICAgICBpZiAodGhpcy5faXNSdW5uaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXJ1blJlcXVlc3RlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNSdW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgbWluVGltZXN0YW1wID0gdGhpcy5fbWF4QWdlU2Vjb25kc1xuICAgICAgICAgICAgPyBEYXRlLm5vdygpIC0gdGhpcy5fbWF4QWdlU2Vjb25kcyAqIDEwMDBcbiAgICAgICAgICAgIDogMDtcbiAgICAgICAgY29uc3QgdXJsc0V4cGlyZWQgPSBhd2FpdCB0aGlzLl90aW1lc3RhbXBNb2RlbC5leHBpcmVFbnRyaWVzKG1pblRpbWVzdGFtcCwgdGhpcy5fbWF4RW50cmllcyk7XG4gICAgICAgIC8vIERlbGV0ZSBVUkxzIGZyb20gdGhlIGNhY2hlXG4gICAgICAgIGNvbnN0IGNhY2hlID0gYXdhaXQgc2VsZi5jYWNoZXMub3Blbih0aGlzLl9jYWNoZU5hbWUpO1xuICAgICAgICBmb3IgKGNvbnN0IHVybCBvZiB1cmxzRXhwaXJlZCkge1xuICAgICAgICAgICAgYXdhaXQgY2FjaGUuZGVsZXRlKHVybCwgdGhpcy5fbWF0Y2hPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgaWYgKHVybHNFeHBpcmVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZ3JvdXBDb2xsYXBzZWQoYEV4cGlyZWQgJHt1cmxzRXhwaXJlZC5sZW5ndGh9IGAgK1xuICAgICAgICAgICAgICAgICAgICBgJHt1cmxzRXhwaXJlZC5sZW5ndGggPT09IDEgPyAnZW50cnknIDogJ2VudHJpZXMnfSBhbmQgcmVtb3ZlZCBgICtcbiAgICAgICAgICAgICAgICAgICAgYCR7dXJsc0V4cGlyZWQubGVuZ3RoID09PSAxID8gJ2l0JyA6ICd0aGVtJ30gZnJvbSB0aGUgYCArXG4gICAgICAgICAgICAgICAgICAgIGAnJHt0aGlzLl9jYWNoZU5hbWV9JyBjYWNoZS5gKTtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBFeHBpcmVkIHRoZSBmb2xsb3dpbmcgJHt1cmxzRXhwaXJlZC5sZW5ndGggPT09IDEgPyAnVVJMJyA6ICdVUkxzJ306YCk7XG4gICAgICAgICAgICAgICAgdXJsc0V4cGlyZWQuZm9yRWFjaCgodXJsKSA9PiBsb2dnZXIubG9nKGAgICAgJHt1cmx9YCkpO1xuICAgICAgICAgICAgICAgIGxvZ2dlci5ncm91cEVuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGBDYWNoZSBleHBpcmF0aW9uIHJhbiBhbmQgZm91bmQgbm8gZW50cmllcyB0byByZW1vdmUuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNSdW5uaW5nID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLl9yZXJ1blJlcXVlc3RlZCkge1xuICAgICAgICAgICAgdGhpcy5fcmVydW5SZXF1ZXN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGRvbnRXYWl0Rm9yKHRoaXMuZXhwaXJlRW50cmllcygpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHRpbWVzdGFtcCBmb3IgdGhlIGdpdmVuIFVSTC4gVGhpcyBlbnN1cmVzIHRoZSB3aGVuXG4gICAgICogcmVtb3ZpbmcgZW50cmllcyBiYXNlZCBvbiBtYXhpbXVtIGVudHJpZXMsIG1vc3QgcmVjZW50bHkgdXNlZFxuICAgICAqIGlzIGFjY3VyYXRlIG9yIHdoZW4gZXhwaXJpbmcsIHRoZSB0aW1lc3RhbXAgaXMgdXAtdG8tZGF0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKi9cbiAgICBhc3luYyB1cGRhdGVUaW1lc3RhbXAodXJsKSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBhc3NlcnQuaXNUeXBlKHVybCwgJ3N0cmluZycsIHtcbiAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1leHBpcmF0aW9uJyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdDYWNoZUV4cGlyYXRpb24nLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAndXBkYXRlVGltZXN0YW1wJyxcbiAgICAgICAgICAgICAgICBwYXJhbU5hbWU6ICd1cmwnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5fdGltZXN0YW1wTW9kZWwuc2V0VGltZXN0YW1wKHVybCwgRGF0ZS5ub3coKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbiBiZSB1c2VkIHRvIGNoZWNrIGlmIGEgVVJMIGhhcyBleHBpcmVkIG9yIG5vdCBiZWZvcmUgaXQncyB1c2VkLlxuICAgICAqXG4gICAgICogVGhpcyByZXF1aXJlcyBhIGxvb2sgdXAgZnJvbSBJbmRleGVkREIsIHNvIGNhbiBiZSBzbG93LlxuICAgICAqXG4gICAgICogTm90ZTogVGhpcyBtZXRob2Qgd2lsbCBub3QgcmVtb3ZlIHRoZSBjYWNoZWQgZW50cnksIGNhbGxcbiAgICAgKiBgZXhwaXJlRW50cmllcygpYCB0byByZW1vdmUgaW5kZXhlZERCIGFuZCBDYWNoZSBlbnRyaWVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG4gICAgYXN5bmMgaXNVUkxFeHBpcmVkKHVybCkge1xuICAgICAgICBpZiAoIXRoaXMuX21heEFnZVNlY29uZHMpIHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFdvcmtib3hFcnJvcihgZXhwaXJlZC10ZXN0LXdpdGhvdXQtbWF4LWFnZWAsIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kTmFtZTogJ2lzVVJMRXhwaXJlZCcsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ21heEFnZVNlY29uZHMnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgdGltZXN0YW1wID0gYXdhaXQgdGhpcy5fdGltZXN0YW1wTW9kZWwuZ2V0VGltZXN0YW1wKHVybCk7XG4gICAgICAgICAgICBjb25zdCBleHBpcmVPbGRlclRoYW4gPSBEYXRlLm5vdygpIC0gdGhpcy5fbWF4QWdlU2Vjb25kcyAqIDEwMDA7XG4gICAgICAgICAgICByZXR1cm4gdGltZXN0YW1wICE9PSB1bmRlZmluZWQgPyB0aW1lc3RhbXAgPCBleHBpcmVPbGRlclRoYW4gOiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIEluZGV4ZWREQiBvYmplY3Qgc3RvcmUgdXNlZCB0byBrZWVwIHRyYWNrIG9mIGNhY2hlIGV4cGlyYXRpb25cbiAgICAgKiBtZXRhZGF0YS5cbiAgICAgKi9cbiAgICBhc3luYyBkZWxldGUoKSB7XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBkb24ndCBhdHRlbXB0IGFub3RoZXIgcmVydW4gaWYgd2UncmUgY2FsbGVkIGluIHRoZSBtaWRkbGUgb2ZcbiAgICAgICAgLy8gYSBjYWNoZSBleHBpcmF0aW9uLlxuICAgICAgICB0aGlzLl9yZXJ1blJlcXVlc3RlZCA9IGZhbHNlO1xuICAgICAgICBhd2FpdCB0aGlzLl90aW1lc3RhbXBNb2RlbC5leHBpcmVFbnRyaWVzKEluZmluaXR5KTsgLy8gRXhwaXJlcyBhbGwuXG4gICAgfVxufVxuZXhwb3J0IHsgQ2FjaGVFeHBpcmF0aW9uIH07XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2Fzc2VydC5qcyc7XG5pbXBvcnQgeyBjYWNoZU5hbWVzIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2NhY2hlTmFtZXMuanMnO1xuaW1wb3J0IHsgZG9udFdhaXRGb3IgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvZG9udFdhaXRGb3IuanMnO1xuaW1wb3J0IHsgZ2V0RnJpZW5kbHlVUkwgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvZ2V0RnJpZW5kbHlVUkwuanMnO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2xvZ2dlci5qcyc7XG5pbXBvcnQgeyByZWdpc3RlclF1b3RhRXJyb3JDYWxsYmFjayB9IGZyb20gJ3dvcmtib3gtY29yZS9yZWdpc3RlclF1b3RhRXJyb3JDYWxsYmFjay5qcyc7XG5pbXBvcnQgeyBXb3JrYm94RXJyb3IgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvV29ya2JveEVycm9yLmpzJztcbmltcG9ydCB7IENhY2hlRXhwaXJhdGlvbiB9IGZyb20gJy4vQ2FjaGVFeHBpcmF0aW9uLmpzJztcbmltcG9ydCAnLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIFRoaXMgcGx1Z2luIGNhbiBiZSB1c2VkIGluIGEgYHdvcmtib3gtc3RyYXRlZ3lgIHRvIHJlZ3VsYXJseSBlbmZvcmNlIGFcbiAqIGxpbWl0IG9uIHRoZSBhZ2UgYW5kIC8gb3IgdGhlIG51bWJlciBvZiBjYWNoZWQgcmVxdWVzdHMuXG4gKlxuICogSXQgY2FuIG9ubHkgYmUgdXNlZCB3aXRoIGB3b3JrYm94LXN0cmF0ZWd5YCBpbnN0YW5jZXMgdGhhdCBoYXZlIGFcbiAqIFtjdXN0b20gYGNhY2hlTmFtZWAgcHJvcGVydHkgc2V0XSgvd2ViL3Rvb2xzL3dvcmtib3gvZ3VpZGVzL2NvbmZpZ3VyZS13b3JrYm94I2N1c3RvbV9jYWNoZV9uYW1lc19pbl9zdHJhdGVnaWVzKS5cbiAqIEluIG90aGVyIHdvcmRzLCBpdCBjYW4ndCBiZSB1c2VkIHRvIGV4cGlyZSBlbnRyaWVzIGluIHN0cmF0ZWd5IHRoYXQgdXNlcyB0aGVcbiAqIGRlZmF1bHQgcnVudGltZSBjYWNoZSBuYW1lLlxuICpcbiAqIFdoZW5ldmVyIGEgY2FjaGVkIHJlc3BvbnNlIGlzIHVzZWQgb3IgdXBkYXRlZCwgdGhpcyBwbHVnaW4gd2lsbCBsb29rXG4gKiBhdCB0aGUgYXNzb2NpYXRlZCBjYWNoZSBhbmQgcmVtb3ZlIGFueSBvbGQgb3IgZXh0cmEgcmVzcG9uc2VzLlxuICpcbiAqIFdoZW4gdXNpbmcgYG1heEFnZVNlY29uZHNgLCByZXNwb25zZXMgbWF5IGJlIHVzZWQgKm9uY2UqIGFmdGVyIGV4cGlyaW5nXG4gKiBiZWNhdXNlIHRoZSBleHBpcmF0aW9uIGNsZWFuIHVwIHdpbGwgbm90IGhhdmUgb2NjdXJyZWQgdW50aWwgKmFmdGVyKiB0aGVcbiAqIGNhY2hlZCByZXNwb25zZSBoYXMgYmVlbiB1c2VkLiBJZiB0aGUgcmVzcG9uc2UgaGFzIGEgXCJEYXRlXCIgaGVhZGVyLCB0aGVuXG4gKiBhIGxpZ2h0IHdlaWdodCBleHBpcmF0aW9uIGNoZWNrIGlzIHBlcmZvcm1lZCBhbmQgdGhlIHJlc3BvbnNlIHdpbGwgbm90IGJlXG4gKiB1c2VkIGltbWVkaWF0ZWx5LlxuICpcbiAqIFdoZW4gdXNpbmcgYG1heEVudHJpZXNgLCB0aGUgZW50cnkgbGVhc3QtcmVjZW50bHkgcmVxdWVzdGVkIHdpbGwgYmUgcmVtb3ZlZFxuICogZnJvbSB0aGUgY2FjaGUgZmlyc3QuXG4gKlxuICogQG1lbWJlcm9mIHdvcmtib3gtZXhwaXJhdGlvblxuICovXG5jbGFzcyBFeHBpcmF0aW9uUGx1Z2luIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0V4cGlyYXRpb25QbHVnaW5PcHRpb25zfSBjb25maWdcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2NvbmZpZy5tYXhFbnRyaWVzXSBUaGUgbWF4aW11bSBudW1iZXIgb2YgZW50cmllcyB0byBjYWNoZS5cbiAgICAgKiBFbnRyaWVzIHVzZWQgdGhlIGxlYXN0IHdpbGwgYmUgcmVtb3ZlZCBhcyB0aGUgbWF4aW11bSBpcyByZWFjaGVkLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbY29uZmlnLm1heEFnZVNlY29uZHNdIFRoZSBtYXhpbXVtIGFnZSBvZiBhbiBlbnRyeSBiZWZvcmVcbiAgICAgKiBpdCdzIHRyZWF0ZWQgYXMgc3RhbGUgYW5kIHJlbW92ZWQuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtjb25maWcubWF0Y2hPcHRpb25zXSBUaGUgW2BDYWNoZVF1ZXJ5T3B0aW9uc2BdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DYWNoZS9kZWxldGUjUGFyYW1ldGVycylcbiAgICAgKiB0aGF0IHdpbGwgYmUgdXNlZCB3aGVuIGNhbGxpbmcgYGRlbGV0ZSgpYCBvbiB0aGUgY2FjaGUuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbY29uZmlnLnB1cmdlT25RdW90YUVycm9yXSBXaGV0aGVyIHRvIG9wdCB0aGlzIGNhY2hlIGluIHRvXG4gICAgICogYXV0b21hdGljIGRlbGV0aW9uIGlmIHRoZSBhdmFpbGFibGUgc3RvcmFnZSBxdW90YSBoYXMgYmVlbiBleGNlZWRlZC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcgPSB7fSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQSBcImxpZmVjeWNsZVwiIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSB0cmlnZ2VyZWQgYXV0b21hdGljYWxseSBieSB0aGVcbiAgICAgICAgICogYHdvcmtib3gtc3RyYXRlZ2llc2AgaGFuZGxlcnMgd2hlbiBhIGBSZXNwb25zZWAgaXMgYWJvdXQgdG8gYmUgcmV0dXJuZWRcbiAgICAgICAgICogZnJvbSBhIFtDYWNoZV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0NhY2hlKSB0b1xuICAgICAgICAgKiB0aGUgaGFuZGxlci4gSXQgYWxsb3dzIHRoZSBgUmVzcG9uc2VgIHRvIGJlIGluc3BlY3RlZCBmb3IgZnJlc2huZXNzIGFuZFxuICAgICAgICAgKiBwcmV2ZW50cyBpdCBmcm9tIGJlaW5nIHVzZWQgaWYgdGhlIGBSZXNwb25zZWAncyBgRGF0ZWAgaGVhZGVyIHZhbHVlIGlzXG4gICAgICAgICAqIG9sZGVyIHRoYW4gdGhlIGNvbmZpZ3VyZWQgYG1heEFnZVNlY29uZHNgLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5jYWNoZU5hbWUgTmFtZSBvZiB0aGUgY2FjaGUgdGhlIHJlc3BvbnNlIGlzIGluLlxuICAgICAgICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSBvcHRpb25zLmNhY2hlZFJlc3BvbnNlIFRoZSBgUmVzcG9uc2VgIG9iamVjdCB0aGF0J3MgYmVlblxuICAgICAgICAgKiAgICAgcmVhZCBmcm9tIGEgY2FjaGUgYW5kIHdob3NlIGZyZXNobmVzcyBzaG91bGQgYmUgY2hlY2tlZC5cbiAgICAgICAgICogQHJldHVybiB7UmVzcG9uc2V9IEVpdGhlciB0aGUgYGNhY2hlZFJlc3BvbnNlYCwgaWYgaXQnc1xuICAgICAgICAgKiAgICAgZnJlc2gsIG9yIGBudWxsYCBpZiB0aGUgYFJlc3BvbnNlYCBpcyBvbGRlciB0aGFuIGBtYXhBZ2VTZWNvbmRzYC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY2FjaGVkUmVzcG9uc2VXaWxsQmVVc2VkID0gYXN5bmMgKHsgZXZlbnQsIHJlcXVlc3QsIGNhY2hlTmFtZSwgY2FjaGVkUmVzcG9uc2UsIH0pID0+IHtcbiAgICAgICAgICAgIGlmICghY2FjaGVkUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGlzRnJlc2ggPSB0aGlzLl9pc1Jlc3BvbnNlRGF0ZUZyZXNoKGNhY2hlZFJlc3BvbnNlKTtcbiAgICAgICAgICAgIC8vIEV4cGlyZSBlbnRyaWVzIHRvIGVuc3VyZSB0aGF0IGV2ZW4gaWYgdGhlIGV4cGlyYXRpb24gZGF0ZSBoYXNcbiAgICAgICAgICAgIC8vIGV4cGlyZWQsIGl0J2xsIG9ubHkgYmUgdXNlZCBvbmNlLlxuICAgICAgICAgICAgY29uc3QgY2FjaGVFeHBpcmF0aW9uID0gdGhpcy5fZ2V0Q2FjaGVFeHBpcmF0aW9uKGNhY2hlTmFtZSk7XG4gICAgICAgICAgICBkb250V2FpdEZvcihjYWNoZUV4cGlyYXRpb24uZXhwaXJlRW50cmllcygpKTtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgbWV0YWRhdGEgZm9yIHRoZSByZXF1ZXN0IFVSTCB0byB0aGUgY3VycmVudCB0aW1lc3RhbXAsXG4gICAgICAgICAgICAvLyBidXQgZG9uJ3QgYGF3YWl0YCBpdCBhcyB3ZSBkb24ndCB3YW50IHRvIGJsb2NrIHRoZSByZXNwb25zZS5cbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZVRpbWVzdGFtcERvbmUgPSBjYWNoZUV4cGlyYXRpb24udXBkYXRlVGltZXN0YW1wKHJlcXVlc3QudXJsKTtcbiAgICAgICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LndhaXRVbnRpbCh1cGRhdGVUaW1lc3RhbXBEb25lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgZXZlbnQgbWF5IG5vdCBiZSBhIGZldGNoIGV2ZW50OyBvbmx5IGxvZyB0aGUgVVJMIGlmIGl0IGlzLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCdyZXF1ZXN0JyBpbiBldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2dlci53YXJuKGBVbmFibGUgdG8gZW5zdXJlIHNlcnZpY2Ugd29ya2VyIHN0YXlzIGFsaXZlIHdoZW4gYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGB1cGRhdGluZyBjYWNoZSBlbnRyeSBmb3IgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAnJHtnZXRGcmllbmRseVVSTChldmVudC5yZXF1ZXN0LnVybCl9Jy5gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpc0ZyZXNoID8gY2FjaGVkUmVzcG9uc2UgOiBudWxsO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQSBcImxpZmVjeWNsZVwiIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSB0cmlnZ2VyZWQgYXV0b21hdGljYWxseSBieSB0aGVcbiAgICAgICAgICogYHdvcmtib3gtc3RyYXRlZ2llc2AgaGFuZGxlcnMgd2hlbiBhbiBlbnRyeSBpcyBhZGRlZCB0byBhIGNhY2hlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5jYWNoZU5hbWUgTmFtZSBvZiB0aGUgY2FjaGUgdGhhdCB3YXMgdXBkYXRlZC5cbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucmVxdWVzdCBUaGUgUmVxdWVzdCBmb3IgdGhlIGNhY2hlZCBlbnRyeS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY2FjaGVEaWRVcGRhdGUgPSBhc3luYyAoeyBjYWNoZU5hbWUsIHJlcXVlc3QsIH0pID0+IHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0LmlzVHlwZShjYWNoZU5hbWUsICdzdHJpbmcnLCB7XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LWV4cGlyYXRpb24nLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdQbHVnaW4nLFxuICAgICAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ2NhY2hlRGlkVXBkYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1OYW1lOiAnY2FjaGVOYW1lJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBhc3NlcnQuaXNJbnN0YW5jZShyZXF1ZXN0LCBSZXF1ZXN0LCB7XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LWV4cGlyYXRpb24nLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdQbHVnaW4nLFxuICAgICAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ2NhY2hlRGlkVXBkYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1OYW1lOiAncmVxdWVzdCcsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjYWNoZUV4cGlyYXRpb24gPSB0aGlzLl9nZXRDYWNoZUV4cGlyYXRpb24oY2FjaGVOYW1lKTtcbiAgICAgICAgICAgIGF3YWl0IGNhY2hlRXhwaXJhdGlvbi51cGRhdGVUaW1lc3RhbXAocmVxdWVzdC51cmwpO1xuICAgICAgICAgICAgYXdhaXQgY2FjaGVFeHBpcmF0aW9uLmV4cGlyZUVudHJpZXMoKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGlmICghKGNvbmZpZy5tYXhFbnRyaWVzIHx8IGNvbmZpZy5tYXhBZ2VTZWNvbmRzKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBXb3JrYm94RXJyb3IoJ21heC1lbnRyaWVzLW9yLWFnZS1yZXF1aXJlZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtZXhwaXJhdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ1BsdWdpbicsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAnY29uc3RydWN0b3InLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbmZpZy5tYXhFbnRyaWVzKSB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0LmlzVHlwZShjb25maWcubWF4RW50cmllcywgJ251bWJlcicsIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtZXhwaXJhdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ1BsdWdpbicsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAnY29uc3RydWN0b3InLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbU5hbWU6ICdjb25maWcubWF4RW50cmllcycsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29uZmlnLm1heEFnZVNlY29uZHMpIHtcbiAgICAgICAgICAgICAgICBhc3NlcnQuaXNUeXBlKGNvbmZpZy5tYXhBZ2VTZWNvbmRzLCAnbnVtYmVyJywge1xuICAgICAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1leHBpcmF0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnUGx1Z2luJyxcbiAgICAgICAgICAgICAgICAgICAgZnVuY05hbWU6ICdjb25zdHJ1Y3RvcicsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ2NvbmZpZy5tYXhBZ2VTZWNvbmRzJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XG4gICAgICAgIHRoaXMuX21heEFnZVNlY29uZHMgPSBjb25maWcubWF4QWdlU2Vjb25kcztcbiAgICAgICAgdGhpcy5fY2FjaGVFeHBpcmF0aW9ucyA9IG5ldyBNYXAoKTtcbiAgICAgICAgaWYgKGNvbmZpZy5wdXJnZU9uUXVvdGFFcnJvcikge1xuICAgICAgICAgICAgcmVnaXN0ZXJRdW90YUVycm9yQ2FsbGJhY2soKCkgPT4gdGhpcy5kZWxldGVDYWNoZUFuZE1ldGFkYXRhKCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2ltcGxlIGhlbHBlciBtZXRob2QgdG8gcmV0dXJuIGEgQ2FjaGVFeHBpcmF0aW9uIGluc3RhbmNlIGZvciBhIGdpdmVuXG4gICAgICogY2FjaGUgbmFtZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjYWNoZU5hbWVcbiAgICAgKiBAcmV0dXJuIHtDYWNoZUV4cGlyYXRpb259XG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9nZXRDYWNoZUV4cGlyYXRpb24oY2FjaGVOYW1lKSB7XG4gICAgICAgIGlmIChjYWNoZU5hbWUgPT09IGNhY2hlTmFtZXMuZ2V0UnVudGltZU5hbWUoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFdvcmtib3hFcnJvcignZXhwaXJlLWN1c3RvbS1jYWNoZXMtb25seScpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjYWNoZUV4cGlyYXRpb24gPSB0aGlzLl9jYWNoZUV4cGlyYXRpb25zLmdldChjYWNoZU5hbWUpO1xuICAgICAgICBpZiAoIWNhY2hlRXhwaXJhdGlvbikge1xuICAgICAgICAgICAgY2FjaGVFeHBpcmF0aW9uID0gbmV3IENhY2hlRXhwaXJhdGlvbihjYWNoZU5hbWUsIHRoaXMuX2NvbmZpZyk7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZUV4cGlyYXRpb25zLnNldChjYWNoZU5hbWUsIGNhY2hlRXhwaXJhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNhY2hlRXhwaXJhdGlvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtSZXNwb25zZX0gY2FjaGVkUmVzcG9uc2VcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaXNSZXNwb25zZURhdGVGcmVzaChjYWNoZWRSZXNwb25zZSkge1xuICAgICAgICBpZiAoIXRoaXMuX21heEFnZVNlY29uZHMpIHtcbiAgICAgICAgICAgIC8vIFdlIGFyZW4ndCBleHBpcmluZyBieSBhZ2UsIHNvIHJldHVybiB0cnVlLCBpdCdzIGZyZXNoXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgJ2RhdGUnIGhlYWRlciB3aWxsIHN1ZmZpY2UgYSBxdWljayBleHBpcmF0aW9uIGNoZWNrLlxuICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZUxhYnMvc3ctdG9vbGJveC9pc3N1ZXMvMTY0IGZvclxuICAgICAgICAvLyBkaXNjdXNzaW9uLlxuICAgICAgICBjb25zdCBkYXRlSGVhZGVyVGltZXN0YW1wID0gdGhpcy5fZ2V0RGF0ZUhlYWRlclRpbWVzdGFtcChjYWNoZWRSZXNwb25zZSk7XG4gICAgICAgIGlmIChkYXRlSGVhZGVyVGltZXN0YW1wID09PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBVbmFibGUgdG8gcGFyc2UgZGF0ZSwgc28gYXNzdW1lIGl0J3MgZnJlc2guXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB3ZSBoYXZlIGEgdmFsaWQgaGVhZGVyVGltZSwgdGhlbiBvdXIgcmVzcG9uc2UgaXMgZnJlc2ggaWZmIHRoZVxuICAgICAgICAvLyBoZWFkZXJUaW1lIHBsdXMgbWF4QWdlU2Vjb25kcyBpcyBncmVhdGVyIHRoYW4gdGhlIGN1cnJlbnQgdGltZS5cbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgcmV0dXJuIGRhdGVIZWFkZXJUaW1lc3RhbXAgPj0gbm93IC0gdGhpcy5fbWF4QWdlU2Vjb25kcyAqIDEwMDA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIHdpbGwgZXh0cmFjdCB0aGUgZGF0YSBoZWFkZXIgYW5kIHBhcnNlIGl0IGludG8gYSB1c2VmdWxcbiAgICAgKiB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVzcG9uc2V9IGNhY2hlZFJlc3BvbnNlXG4gICAgICogQHJldHVybiB7bnVtYmVyfG51bGx9XG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9nZXREYXRlSGVhZGVyVGltZXN0YW1wKGNhY2hlZFJlc3BvbnNlKSB7XG4gICAgICAgIGlmICghY2FjaGVkUmVzcG9uc2UuaGVhZGVycy5oYXMoJ2RhdGUnKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0ZUhlYWRlciA9IGNhY2hlZFJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdkYXRlJyk7XG4gICAgICAgIGNvbnN0IHBhcnNlZERhdGUgPSBuZXcgRGF0ZShkYXRlSGVhZGVyKTtcbiAgICAgICAgY29uc3QgaGVhZGVyVGltZSA9IHBhcnNlZERhdGUuZ2V0VGltZSgpO1xuICAgICAgICAvLyBJZiB0aGUgRGF0ZSBoZWFkZXIgd2FzIGludmFsaWQgZm9yIHNvbWUgcmVhc29uLCBwYXJzZWREYXRlLmdldFRpbWUoKVxuICAgICAgICAvLyB3aWxsIHJldHVybiBOYU4uXG4gICAgICAgIGlmIChpc05hTihoZWFkZXJUaW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhlYWRlclRpbWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgYSBoZWxwZXIgbWV0aG9kIHRoYXQgcGVyZm9ybXMgdHdvIG9wZXJhdGlvbnM6XG4gICAgICpcbiAgICAgKiAtIERlbGV0ZXMgKmFsbCogdGhlIHVuZGVybHlpbmcgQ2FjaGUgaW5zdGFuY2VzIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHBsdWdpblxuICAgICAqIGluc3RhbmNlLCBieSBjYWxsaW5nIGNhY2hlcy5kZWxldGUoKSBvbiB5b3VyIGJlaGFsZi5cbiAgICAgKiAtIERlbGV0ZXMgdGhlIG1ldGFkYXRhIGZyb20gSW5kZXhlZERCIHVzZWQgdG8ga2VlcCB0cmFjayBvZiBleHBpcmF0aW9uXG4gICAgICogZGV0YWlscyBmb3IgZWFjaCBDYWNoZSBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqIFdoZW4gdXNpbmcgY2FjaGUgZXhwaXJhdGlvbiwgY2FsbGluZyB0aGlzIG1ldGhvZCBpcyBwcmVmZXJhYmxlIHRvIGNhbGxpbmdcbiAgICAgKiBgY2FjaGVzLmRlbGV0ZSgpYCBkaXJlY3RseSwgc2luY2UgdGhpcyB3aWxsIGVuc3VyZSB0aGF0IHRoZSBJbmRleGVkREJcbiAgICAgKiBtZXRhZGF0YSBpcyBhbHNvIGNsZWFubHkgcmVtb3ZlZCBhbmQgb3BlbiBJbmRleGVkREIgaW5zdGFuY2VzIGFyZSBkZWxldGVkLlxuICAgICAqXG4gICAgICogTm90ZSB0aGF0IGlmIHlvdSdyZSAqbm90KiB1c2luZyBjYWNoZSBleHBpcmF0aW9uIGZvciBhIGdpdmVuIGNhY2hlLCBjYWxsaW5nXG4gICAgICogYGNhY2hlcy5kZWxldGUoKWAgYW5kIHBhc3NpbmcgaW4gdGhlIGNhY2hlJ3MgbmFtZSBzaG91bGQgYmUgc3VmZmljaWVudC5cbiAgICAgKiBUaGVyZSBpcyBubyBXb3JrYm94LXNwZWNpZmljIG1ldGhvZCBuZWVkZWQgZm9yIGNsZWFudXAgaW4gdGhhdCBjYXNlLlxuICAgICAqL1xuICAgIGFzeW5jIGRlbGV0ZUNhY2hlQW5kTWV0YWRhdGEoKSB7XG4gICAgICAgIC8vIERvIHRoaXMgb25lIGF0IGEgdGltZSBpbnN0ZWFkIG9mIGFsbCBhdCBvbmNlIHZpYSBgUHJvbWlzZS5hbGwoKWAgdG9cbiAgICAgICAgLy8gcmVkdWNlIHRoZSBjaGFuY2Ugb2YgaW5jb25zaXN0ZW5jeSBpZiBhIHByb21pc2UgcmVqZWN0cy5cbiAgICAgICAgZm9yIChjb25zdCBbY2FjaGVOYW1lLCBjYWNoZUV4cGlyYXRpb25dIG9mIHRoaXMuX2NhY2hlRXhwaXJhdGlvbnMpIHtcbiAgICAgICAgICAgIGF3YWl0IHNlbGYuY2FjaGVzLmRlbGV0ZShjYWNoZU5hbWUpO1xuICAgICAgICAgICAgYXdhaXQgY2FjaGVFeHBpcmF0aW9uLmRlbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlc2V0IHRoaXMuX2NhY2hlRXhwaXJhdGlvbnMgdG8gaXRzIGluaXRpYWwgc3RhdGUuXG4gICAgICAgIHRoaXMuX2NhY2hlRXhwaXJhdGlvbnMgPSBuZXcgTWFwKCk7XG4gICAgfVxufVxuZXhwb3J0IHsgRXhwaXJhdGlvblBsdWdpbiB9O1xuIiwgIlwidXNlIHN0cmljdFwiO1xuLy8gQHRzLWlnbm9yZVxudHJ5IHtcbiAgICBzZWxmWyd3b3JrYm94OnJlY2lwZXM6Ni41LjMnXSAmJiBfKCk7XG59XG5jYXRjaCAoZSkgeyB9XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMjAgR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgcmVnaXN0ZXJSb3V0ZSB9IGZyb20gJ3dvcmtib3gtcm91dGluZy9yZWdpc3RlclJvdXRlLmpzJztcbmltcG9ydCB7IFN0YWxlV2hpbGVSZXZhbGlkYXRlIH0gZnJvbSAnd29ya2JveC1zdHJhdGVnaWVzL1N0YWxlV2hpbGVSZXZhbGlkYXRlLmpzJztcbmltcG9ydCB7IENhY2hlRmlyc3QgfSBmcm9tICd3b3JrYm94LXN0cmF0ZWdpZXMvQ2FjaGVGaXJzdC5qcyc7XG5pbXBvcnQgeyBDYWNoZWFibGVSZXNwb25zZVBsdWdpbiB9IGZyb20gJ3dvcmtib3gtY2FjaGVhYmxlLXJlc3BvbnNlL0NhY2hlYWJsZVJlc3BvbnNlUGx1Z2luLmpzJztcbmltcG9ydCB7IEV4cGlyYXRpb25QbHVnaW4gfSBmcm9tICd3b3JrYm94LWV4cGlyYXRpb24vRXhwaXJhdGlvblBsdWdpbi5qcyc7XG5pbXBvcnQgJy4vX3ZlcnNpb24uanMnO1xuLyoqXG4gKiBBbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgW0dvb2dsZSBmb250c117QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vd2ViL3Rvb2xzL3dvcmtib3gvZ3VpZGVzL2NvbW1vbi1yZWNpcGVzI2dvb2dsZV9mb250c30gY2FjaGluZyByZWNpcGVcbiAqXG4gKiBAbWVtYmVyb2Ygd29ya2JveC1yZWNpcGVzXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmNhY2hlUHJlZml4XSBDYWNoZSBwcmVmaXggZm9yIGNhY2hpbmcgc3R5bGVzaGVldHMgYW5kIHdlYmZvbnRzLiBEZWZhdWx0cyB0byBnb29nbGUtZm9udHNcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhBZ2VTZWNvbmRzXSBNYXhpbXVtIGFnZSwgaW4gc2Vjb25kcywgdGhhdCBmb250IGVudHJpZXMgd2lsbCBiZSBjYWNoZWQgZm9yLiBEZWZhdWx0cyB0byAxIHllYXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhFbnRyaWVzXSBNYXhpbXVtIG51bWJlciBvZiBmb250cyB0aGF0IHdpbGwgYmUgY2FjaGVkLiBEZWZhdWx0cyB0byAzMFxuICovXG5mdW5jdGlvbiBnb29nbGVGb250c0NhY2hlKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHNoZWV0Q2FjaGVOYW1lID0gYCR7b3B0aW9ucy5jYWNoZVByZWZpeCB8fCAnZ29vZ2xlLWZvbnRzJ30tc3R5bGVzaGVldHNgO1xuICAgIGNvbnN0IGZvbnRDYWNoZU5hbWUgPSBgJHtvcHRpb25zLmNhY2hlUHJlZml4IHx8ICdnb29nbGUtZm9udHMnfS13ZWJmb250c2A7XG4gICAgY29uc3QgbWF4QWdlU2Vjb25kcyA9IG9wdGlvbnMubWF4QWdlU2Vjb25kcyB8fCA2MCAqIDYwICogMjQgKiAzNjU7XG4gICAgY29uc3QgbWF4RW50cmllcyA9IG9wdGlvbnMubWF4RW50cmllcyB8fCAzMDtcbiAgICAvLyBDYWNoZSB0aGUgR29vZ2xlIEZvbnRzIHN0eWxlc2hlZXRzIHdpdGggYSBzdGFsZS13aGlsZS1yZXZhbGlkYXRlIHN0cmF0ZWd5LlxuICAgIHJlZ2lzdGVyUm91dGUoKHsgdXJsIH0pID0+IHVybC5vcmlnaW4gPT09ICdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tJywgbmV3IFN0YWxlV2hpbGVSZXZhbGlkYXRlKHtcbiAgICAgICAgY2FjaGVOYW1lOiBzaGVldENhY2hlTmFtZSxcbiAgICB9KSk7XG4gICAgLy8gQ2FjaGUgdGhlIHVuZGVybHlpbmcgZm9udCBmaWxlcyB3aXRoIGEgY2FjaGUtZmlyc3Qgc3RyYXRlZ3kgZm9yIDEgeWVhci5cbiAgICByZWdpc3RlclJvdXRlKCh7IHVybCB9KSA9PiB1cmwub3JpZ2luID09PSAnaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbScsIG5ldyBDYWNoZUZpcnN0KHtcbiAgICAgICAgY2FjaGVOYW1lOiBmb250Q2FjaGVOYW1lLFxuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgICBuZXcgQ2FjaGVhYmxlUmVzcG9uc2VQbHVnaW4oe1xuICAgICAgICAgICAgICAgIHN0YXR1c2VzOiBbMCwgMjAwXSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbmV3IEV4cGlyYXRpb25QbHVnaW4oe1xuICAgICAgICAgICAgICAgIG1heEFnZVNlY29uZHMsXG4gICAgICAgICAgICAgICAgbWF4RW50cmllcyxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICBdLFxuICAgIH0pKTtcbn1cbmV4cG9ydCB7IGdvb2dsZUZvbnRzQ2FjaGUgfTtcbiIsICIvKiBlc2xpbnQtZW52IHNlcnZpY2V3b3JrZXIgKi9cblxuLypcbiAqIFRoaXMgZmlsZSAod2hpY2ggd2lsbCBiZSB5b3VyIHNlcnZpY2Ugd29ya2VyKVxuICogaXMgcGlja2VkIHVwIGJ5IHRoZSBidWlsZCBzeXN0ZW0gT05MWSBpZlxuICogcXVhc2FyLmNvbmZpZy5qcyA+IHB3YSA+IHdvcmtib3hNb2RlIGlzIHNldCB0byBcImluamVjdE1hbmlmZXN0XCJcbiAqL1xuXG5pbXBvcnQgeyBjbGllbnRzQ2xhaW0gfSBmcm9tIFwid29ya2JveC1jb3JlXCI7XG5pbXBvcnQge1xuICBwcmVjYWNoZUFuZFJvdXRlLFxuICBjbGVhbnVwT3V0ZGF0ZWRDYWNoZXMsXG4gIGNyZWF0ZUhhbmRsZXJCb3VuZFRvVVJMLFxufSBmcm9tIFwid29ya2JveC1wcmVjYWNoaW5nXCI7XG5pbXBvcnQgeyByZWdpc3RlclJvdXRlLCBOYXZpZ2F0aW9uUm91dGUgfSBmcm9tIFwid29ya2JveC1yb3V0aW5nXCI7XG5pbXBvcnQgeyBTdGFsZVdoaWxlUmV2YWxpZGF0ZSwgTmV0d29ya0ZpcnN0IH0gZnJvbSBcIndvcmtib3gtc3RyYXRlZ2llc1wiO1xuaW1wb3J0IHsgZ29vZ2xlRm9udHNDYWNoZSB9IGZyb20gXCJ3b3JrYm94LXJlY2lwZXNcIjtcblxuc2VsZi5za2lwV2FpdGluZygpO1xuY2xpZW50c0NsYWltKCk7XG5cbi8vIFVzZSB3aXRoIHByZWNhY2hlIGluamVjdGlvblxucHJlY2FjaGVBbmRSb3V0ZShzZWxmLl9fV0JfTUFOSUZFU1QpO1xuXG5jbGVhbnVwT3V0ZGF0ZWRDYWNoZXMoKTtcblxuLy8gTm9uLVNTUiBmYWxsYmFjayB0byBpbmRleC5odG1sXG4vLyBQcm9kdWN0aW9uIFNTUiBmYWxsYmFjayB0byBvZmZsaW5lLmh0bWwgKGV4Y2VwdCBmb3IgZGV2KVxuLy8gaWYgKHByb2Nlc3MuZW52Lk1PREUgIT09IFwic3NyXCIgfHwgcHJvY2Vzcy5lbnYuUFJPRCkge1xuLy8gICByZWdpc3RlclJvdXRlKFxuLy8gICAgIG5ldyBOYXZpZ2F0aW9uUm91dGUoXG4vLyAgICAgICBjcmVhdGVIYW5kbGVyQm91bmRUb1VSTChwcm9jZXNzLmVudi5QV0FfRkFMTEJBQ0tfSFRNTCksXG4vLyAgICAgICB7IGRlbnlsaXN0OiBbL3N3XFwuanMkLywgL3dvcmtib3gtKC4pKlxcLmpzJC9dIH1cbi8vICAgICApXG4vLyAgICk7XG4vLyB9XG5cbi8vIENhY2hlIHRoZSBHb29nbGUgRm9udHMgc3R5bGVzaGVldHMgd2l0aCBhIHN0YWxlIHdoaWxlIHJldmFsaWRhdGUgc3RyYXRlZ3kuXG5nb29nbGVGb250c0NhY2hlKHtcbiAgY2FjaGVQcmVmaXg6IFwiZ29vZ2xlLWZvbnRzXCIsXG4gIG1heEVudHJpZXM6IDYwLFxufSk7XG5cbnJlZ2lzdGVyUm91dGUoXG4gICh7IHVybCB9KSA9PiB1cmwucGF0aG5hbWUuc3RhcnRzV2l0aChcIi9wb3N0c1wiKSxcbiAgbmV3IE5ldHdvcmtGaXJzdCgpXG4pO1xuXG5yZWdpc3RlclJvdXRlKFxuICAoeyB1cmwgfSkgPT4gdXJsLmhyZWYuc3RhcnRzV2l0aChcImh0dHBcIiksXG4gIG5ldyBTdGFsZVdoaWxlUmV2YWxpZGF0ZSgpXG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7QUFFQSxNQUFJO0FBQ0EsU0FBSyx5QkFBeUIsRUFBRTtBQUFBLEVBQ3BDLFNBQ08sR0FBUDtBQUFBLEVBQVk7OztBQ0VaLE1BQU0sU0FBVSxPQUNWLFFBQ0MsTUFBTTtBQUdMLFFBQUksRUFBRSwyQkFBMkIsT0FBTztBQUNwQyxXQUFLLHdCQUF3QjtBQUFBLElBQ2pDO0FBQ0EsUUFBSSxVQUFVO0FBQ2QsVUFBTSxtQkFBbUI7QUFBQSxNQUNyQixPQUFPO0FBQUEsTUFDUCxL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YUFBTztBQUFBLElBQ1g7QUFBQSxJQWlCQSxNQUFNLHlCQUF5QjtBQUczQixpQkFBVyxDQUFDLFdBQVcsZUFBZSxLQUFLLEtBQUssbUJBQW1CO0FBQy9ELGNBQU0sS0FBSyxPQUFPLE9BQU8sU0FBUztBQUNsQyxjQUFNLGdCQUFnQixPQUFPO0FBQUEsTUFDakM7QUFFQSxXQUFLLG9CQUFvQixvQkFBSSxJQUFJO0FBQUEsSUFDckM7QUFBQSxFQUNKOzs7QUMxUEEsTUFBSTtBQUNBLFNBQUssNEJBQTRCLEVBQUU7QUFBQSxFQUN2QyxTQUNPLEdBQVA7QUFBQSxFQUFZOzs7QUNrQlosV0FBUyxpQkFBaUIsVUFBVSxDQUFDLEdBQUc7QUFDcEMsVUFBTSxpQkFBaUIsR0FBRyxRQUFRLGVBQWU7QUFDakQsVUFBTSxnQkFBZ0IsR0FBRyxRQUFRLGVBQWU7QUFDaEQsVUFBTSxnQkFBZ0IsUUFBUSxpQkFBaUIsS0FBSyxLQUFLLEtBQUs7QUFDOUQsVUFBTSxhQUFhLFFBQVEsY0FBYztBQUV6QyxrQkFBYyxDQUFDLEVBQUUsSUFBSSxNQUFNLElBQUksV0FBVyxnQ0FBZ0MsSUFBSSxxQkFBcUI7QUFBQSxNQUMvRixXQUFXO0FBQUEsSUFDZixDQUFDLENBQUM7QUFFRixrQkFBYyxDQUFDLEVBQUUsSUFBSSxNQUFNLElBQUksV0FBVyw2QkFBNkIsSUFBSSxXQUFXO0FBQUEsTUFDbEYsV0FBVztBQUFBLE1BQ1gsU0FBUztBQUFBLFFBQ0wsSUFBSSx3QkFBd0I7QUFBQSxVQUN4QixVQUFVLENBQUMsR0FBRyxHQUFHO0FBQUEsUUFDckIsQ0FBQztBQUFBLFFBQ0QsSUFBSSxpQkFBaUI7QUFBQSxVQUNqQjtBQUFBLFVBQ0E7QUFBQSxRQUNKLENBQUM7QUFBQSxNQUNMO0FBQUEsSUFDSixDQUFDLENBQUM7QUFBQSxFQUNOOzs7QUMzQkEsT0FBSyxZQUFZO0FBQ2pCLGVBQWE7QUFHYixtQkFBaUIsS0FBSyxhQUFhO0FBRW5DLHdCQUFzQjtBQWN0QixtQkFBaUI7QUFBQSxJQUNmLGFBQWE7QUFBQSxJQUNiLFlBQVk7QUFBQSxFQUNkLENBQUM7QUFFRDtBQUFBLElBQ0UsQ0FBQyxFQUFFLElBQUksTUFBTSxJQUFJLFNBQVMsV0FBVyxRQUFRO0FBQUEsSUFDN0MsSUFBSSxhQUFhO0FBQUEsRUFDbkI7QUFFQTtBQUFBLElBQ0UsQ0FBQyxFQUFFLElBQUksTUFBTSxJQUFJLEtBQUssV0FBVyxNQUFNO0FBQUEsSUFDdkMsSUFBSSxxQkFBcUI7QUFBQSxFQUMzQjsiLAogICJuYW1lcyI6IFsicHJlY2FjaGVDb250cm9sbGVyIiwgImVycm9yIiwgImRlZmF1bHRSb3V0ZXIiLCAicHJlY2FjaGVDb250cm9sbGVyIiwgInByZWNhY2hlQ29udHJvbGxlciIsICJjYWNoZU5hbWVzIiwgInByZWNhY2hlQ29udHJvbGxlciIsICJtZXNzYWdlcyIsICJtZXNzYWdlcyIsICJtZXNzYWdlcyIsICJ0YXJnZXQiXQp9Cg==
