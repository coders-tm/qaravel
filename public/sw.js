(() => {
  // node_modules/workbox-core/_version.js
  try {
    self["workbox:core:6.5.3"] && _();
  } catch (e) {}

  // node_modules/workbox-core/_private/logger.js
  var logger = true
    ? null
    : (() => {
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
          groupEnd: null,
        };
        const print = function (method, args) {
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
            `padding: 2px 0.5em`,
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
        paramName: "callback",
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
    suffix: typeof registration !== "undefined" ? registration.scope : "",
  };
  var _createCacheName = (cacheName) => {
    return [_cacheNameDetails.prefix, cacheName, _cacheNameDetails.suffix]
      .filter((value) => value && value.length > 0)
      .join("-");
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
      return (
        userCacheName || _createCacheName(_cacheNameDetails.googleAnalytics)
      );
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
    },
  };

  // node_modules/workbox-core/_private/cacheMatchIgnoreParams.js
  function stripParams(fullURL, ignoreParams) {
    const strippedURL = new URL(fullURL);
    for (const param of ignoreParams) {
      strippedURL.searchParams.delete(param);
    }
    return strippedURL.href;
  }
  async function cacheMatchIgnoreParams(
    cache,
    request,
    ignoreParams,
    matchOptions
  ) {
    const strippedRequestURL = stripParams(request.url, ignoreParams);
    if (request.url === strippedRequestURL) {
      return cache.match(request, matchOptions);
    }
    const keysOptions = Object.assign(Object.assign({}, matchOptions), {
      ignoreSearch: true,
    });
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
    void promise.then(() => {});
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
      logger.log(
        `About to run ${quotaErrorCallbacks.size} callbacks to clean up caches.`
      );
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
      statusText: clonedResponse.statusText,
    };
    const modifiedResponseInit = modifier
      ? modifier(responseInit)
      : responseInit;
    const body = canConstructResponseFromBodyStream()
      ? clonedResponse.body
      : await clonedResponse.blob();
    return new Response(body, modifiedResponseInit);
  }

  // node_modules/workbox-core/clientsClaim.js
  function clientsClaim() {
    self.addEventListener("activate", () => self.clients.claim());
  }

  // node_modules/workbox-precaching/_version.js
  try {
    self["workbox:precaching:6.5.3"] && _();
  } catch (e) {}

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
        url: urlObject.href,
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
        url: urlObject.href,
      };
    }
    const cacheKeyURL = new URL(url, location.href);
    const originalURL = new URL(url, location.href);
    cacheKeyURL.searchParams.set(REVISION_SEARCH_PARAM, revision);
    return {
      cacheKey: cacheKeyURL.href,
      url: originalURL.href,
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
      this.cachedResponseWillBeUsed = async ({
        event,
        state,
        cachedResponse,
      }) => {
        if (event.type === "install") {
          if (
            state &&
            state.originalRequest &&
            state.originalRequest instanceof Request
          ) {
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
        const cacheKey =
          (params === null || params === void 0 ? void 0 : params.cacheKey) ||
          this._precacheController.getCacheKeyForURL(request.url);
        return cacheKey
          ? new Request(cacheKey, { headers: request.headers })
          : request;
      };
      this._precacheController = precacheController2;
    }
  };

  // node_modules/workbox-strategies/_version.js
  try {
    self["workbox:strategies:6.5.3"] && _();
  } catch (e) {}

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
          paramName: "options.event",
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
      if (
        request.mode === "navigate" &&
        event instanceof FetchEvent &&
        event.preloadResponse
      ) {
        const possiblePreloadResponse = await event.preloadResponse;
        if (possiblePreloadResponse) {
          if (false) {
            logger.log(
              `Using a preloaded navigation response for '${getFriendlyURL(
                request.url
              )}'`
            );
          }
          return possiblePreloadResponse;
        }
      }
      const originalRequest = this.hasCallback("fetchDidFail")
        ? request.clone()
        : null;
      try {
        for (const cb of this.iterateCallbacks("requestWillFetch")) {
          request = await cb({ request: request.clone(), event });
        }
      } catch (err) {
        if (err instanceof Error) {
          throw new WorkboxError("plugin-error-request-will-fetch", {
            thrownErrorMessage: err.message,
          });
        }
      }
      const pluginFilteredRequest = request.clone();
      try {
        let fetchResponse;
        fetchResponse = await fetch(
          request,
          request.mode === "navigate" ? void 0 : this._strategy.fetchOptions
        );
        if (false) {
          logger.debug(
            `Network request for '${getFriendlyURL(
              request.url
            )}' returned a response with status '${fetchResponse.status}'.`
          );
        }
        for (const callback of this.iterateCallbacks("fetchDidSucceed")) {
          fetchResponse = await callback({
            event,
            request: pluginFilteredRequest,
            response: fetchResponse,
          });
        }
        return fetchResponse;
      } catch (error) {
        if (false) {
          logger.log(
            `Network request for '${getFriendlyURL(
              request.url
            )}' threw an error.`,
            error
          );
        }
        if (originalRequest) {
          await this.runCallbacks("fetchDidFail", {
            error,
            event,
            originalRequest: originalRequest.clone(),
            request: pluginFilteredRequest.clone(),
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
      const multiMatchOptions = Object.assign(Object.assign({}, matchOptions), {
        cacheName,
      });
      cachedResponse = await caches.match(effectiveRequest, multiMatchOptions);
      if (false) {
        if (cachedResponse) {
          logger.debug(`Found a cached response in '${cacheName}'.`);
        } else {
          logger.debug(`No cached response found in '${cacheName}'.`);
        }
      }
      for (const callback of this.iterateCallbacks(
        "cachedResponseWillBeUsed"
      )) {
        cachedResponse =
          (await callback({
            cacheName,
            matchOptions,
            cachedResponse,
            request: effectiveRequest,
            event: this.event,
          })) || void 0;
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
            method: effectiveRequest.method,
          });
        }
        const vary = response.headers.get("Vary");
        if (vary) {
          logger.debug(
            `The response for ${getFriendlyURL(
              effectiveRequest.url
            )} has a 'Vary: ${vary}' header. Consider setting the {ignoreVary: true} option on your strategy to ensure cache matching and deletion works as expected.`
          );
        }
      }
      if (!response) {
        if (false) {
          logger.error(
            `Cannot cache non-existent response for '${getFriendlyURL(
              effectiveRequest.url
            )}'.`
          );
        }
        throw new WorkboxError("cache-put-with-no-response", {
          url: getFriendlyURL(effectiveRequest.url),
        });
      }
      const responseToCache = await this._ensureResponseSafeToCache(response);
      if (!responseToCache) {
        if (false) {
          logger.debug(
            `Response '${getFriendlyURL(
              effectiveRequest.url
            )}' will not be cached.`,
            responseToCache
          );
        }
        return false;
      }
      const { cacheName, matchOptions } = this._strategy;
      const cache = await self.caches.open(cacheName);
      const hasCacheUpdateCallback = this.hasCallback("cacheDidUpdate");
      const oldResponse = hasCacheUpdateCallback
        ? await cacheMatchIgnoreParams(
            cache,
            effectiveRequest.clone(),
            ["__WB_REVISION__"],
            matchOptions
          )
        : null;
      if (false) {
        logger.debug(
          `Updating the '${cacheName}' cache with a new Response for ${getFriendlyURL(
            effectiveRequest.url
          )}.`
        );
      }
      try {
        await cache.put(
          effectiveRequest,
          hasCacheUpdateCallback ? responseToCache.clone() : responseToCache
        );
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
          event: this.event,
        });
      }
      return true;
    }
    async getCacheKey(request, mode) {
      const key = `${request.url} | ${mode}`;
      if (!this._cacheKeys[key]) {
        let effectiveRequest = request;
        for (const callback of this.iterateCallbacks("cacheKeyWillBeUsed")) {
          effectiveRequest = toRequest(
            await callback({
              mode,
              request: effectiveRequest,
              event: this.event,
              params: this.params,
            })
          );
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
            const statefulParam = Object.assign(Object.assign({}, param), {
              state,
            });
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
      while ((promise = this._extendLifetimePromises.shift())) {
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
        responseToCache =
          (await callback({
            request: this.request,
            response: responseToCache,
            event: this.event,
          })) || void 0;
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
                logger.warn(
                  `The response for '${this.request.url}' is an opaque response. The caching strategy that you're using will not cache opaque responses by default.`
                );
              } else {
                logger.debug(
                  `The response for '${this.request.url}' returned a status code of '${response.status}' and won't be cached as a result.`
                );
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
          request: options.request,
        };
      }
      const event = options.event;
      const request =
        typeof options.request === "string"
          ? new Request(options.request)
          : options.request;
      const params = "params" in options ? options.params : void 0;
      const handler = new StrategyHandler(this, { event, request, params });
      const responseDone = this._getResponse(handler, request, event);
      const handlerDone = this._awaitComplete(
        responseDone,
        handler,
        request,
        event
      );
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
          logger.log(
            `While responding to '${getFriendlyURL(request.url)}', an ${
              error instanceof Error ? error.toString() : ""
            } error occurred. Using a fallback response provided by a handlerDidError plugin.`
          );
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
      } catch (error2) {}
      try {
        await handler.runCallbacks("handlerDidRespond", {
          event,
          request,
          response,
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
        error,
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
      this._fallbackToNetwork =
        options.fallbackToNetwork === false ? false : true;
      this.plugins.push(
        PrecacheStrategy.copyRedirectedCacheableResponsesPlugin
      );
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
          logger.warn(
            `The precached response for ${getFriendlyURL(request.url)} in ${
              this.cacheName
            } was not found. Falling back to the network.`
          );
        }
        const integrityInManifest = params.integrity;
        const integrityInRequest = request.integrity;
        const noIntegrityConflict =
          !integrityInRequest || integrityInRequest === integrityInManifest;
        response = await handler.fetch(
          new Request(request, {
            integrity:
              request.mode !== "no-cors"
                ? integrityInRequest || integrityInManifest
                : void 0,
          })
        );
        if (
          integrityInManifest &&
          noIntegrityConflict &&
          request.mode !== "no-cors"
        ) {
          this._useDefaultCacheabilityPluginIfNeeded();
          const wasCached = await handler.cachePut(request, response.clone());
          if (false) {
            if (wasCached) {
              logger.log(
                `A response for ${getFriendlyURL(
                  request.url
                )} was used to "repair" the precache.`
              );
            }
          }
        }
      } else {
        throw new WorkboxError("missing-precache-entry", {
          cacheName: this.cacheName,
          url: request.url,
        });
      }
      if (false) {
        const cacheKey =
          params.cacheKey || (await handler.getCacheKey(request, "read"));
        logger.groupCollapsed(
          `Precaching is responding to: ` + getFriendlyURL(request.url)
        );
        logger.log(
          `Serving the precached url: ${getFriendlyURL(
            cacheKey instanceof Request ? cacheKey.url : cacheKey
          )}`
        );
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
          status: response.status,
        });
      }
      return response;
    }
    _useDefaultCacheabilityPluginIfNeeded() {
      let defaultPluginIndex = null;
      let cacheWillUpdatePluginCount = 0;
      for (const [index, plugin] of this.plugins.entries()) {
        if (
          plugin === PrecacheStrategy.copyRedirectedCacheableResponsesPlugin
        ) {
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
      } else if (
        cacheWillUpdatePluginCount > 1 &&
        defaultPluginIndex !== null
      ) {
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
    },
  };
  PrecacheStrategy.copyRedirectedCacheableResponsesPlugin = {
    async cacheWillUpdate({ response }) {
      return response.redirected ? await copyResponse(response) : response;
    },
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
          new PrecacheCacheKeyPlugin({ precacheController: this }),
        ],
        fallbackToNetwork,
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
          paramName: "entries",
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
        const cacheMode =
          typeof entry !== "string" && entry.revision ? "reload" : "default";
        if (
          this._urlsToCacheKeys.has(url) &&
          this._urlsToCacheKeys.get(url) !== cacheKey
        ) {
          throw new WorkboxError("add-to-cache-list-conflicting-entries", {
            firstEntry: this._urlsToCacheKeys.get(url),
            secondEntry: cacheKey,
          });
        }
        if (typeof entry !== "string" && entry.integrity) {
          if (
            this._cacheKeysToIntegrities.has(cacheKey) &&
            this._cacheKeysToIntegrities.get(cacheKey) !== entry.integrity
          ) {
            throw new WorkboxError(
              "add-to-cache-list-conflicting-integrities",
              {
                url,
              }
            );
          }
          this._cacheKeysToIntegrities.set(cacheKey, entry.integrity);
        }
        this._urlsToCacheKeys.set(url, cacheKey);
        this._urlsToCacheModes.set(url, cacheMode);
        if (urlsToWarnAbout.length > 0) {
          const warningMessage = `Workbox is precaching URLs without revision info: ${urlsToWarnAbout.join(
            ", "
          )}
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
            credentials: "same-origin",
          });
          await Promise.all(
            this.strategy.handleAll({
              params: { cacheKey },
              request,
              event,
            })
          );
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
  } catch (e) {}

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
          paramName: "handler",
        });
      }
      return handler;
    } else {
      if (false) {
        finalAssertExports.isType(handler, "function", {
          moduleName: "workbox-routing",
          className: "Route",
          funcName: "constructor",
          paramName: "handler",
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
          paramName: "match",
        });
        if (method) {
          finalAssertExports.isOneOf(method, validMethods, {
            paramName: "method",
          });
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
          paramName: "pattern",
        });
      }
      const match = ({ url }) => {
        const result = regExp.exec(url.href);
        if (!result) {
          return;
        }
        if (url.origin !== location.origin && result.index !== 0) {
          if (false) {
            logger.debug(
              `The regular expression '${regExp.toString()}' only partially matched against the cross-origin URL '${url.toString()}'. RegExpRoute's will only handle cross-origin requests if they match the entire URL.`
            );
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
          const requestPromises = Promise.all(
            payload.urlsToCache.map((entry) => {
              if (typeof entry === "string") {
                entry = [entry];
              }
              const request = new Request(...entry);
              return this.handleRequest({ request, event });
            })
          );
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
          paramName: "options.request",
        });
      }
      const url = new URL(request.url, location.href);
      if (!url.protocol.startsWith("http")) {
        if (false) {
          logger.debug(
            `Workbox Router only supports URLs that start with 'http'.`
          );
        }
        return;
      }
      const sameOrigin = url.origin === location.origin;
      const { params, route } = this.findMatchingRoute({
        event,
        request,
        sameOrigin,
        url,
      });
      let handler = route && route.handler;
      const debugMessages = [];
      if (false) {
        if (handler) {
          debugMessages.push([`Found a route to handle this request:`, route]);
          if (params) {
            debugMessages.push([
              `Passing the following params to the route's handler:`,
              params,
            ]);
          }
        }
      }
      const method = request.method;
      if (!handler && this._defaultHandlerMap.has(method)) {
        if (false) {
          debugMessages.push(
            `Failed to find a matching route. Falling back to the default handler for ${method}.`
          );
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
        logger.groupCollapsed(
          `Router is responding to: ${getFriendlyURL(url)}`
        );
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
      if (
        responsePromise instanceof Promise &&
        (this._catchHandler || catchHandler)
      ) {
        responsePromise = responsePromise.catch(async (err) => {
          if (catchHandler) {
            if (false) {
              logger.groupCollapsed(
                `Error thrown when responding to:  ${getFriendlyURL(
                  url
                )}. Falling back to route's Catch Handler.`
              );
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
              logger.groupCollapsed(
                `Error thrown when responding to:  ${getFriendlyURL(
                  url
                )}. Falling back to global Catch Handler.`
              );
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
              logger.warn(
                `While routing ${getFriendlyURL(
                  url
                )}, an async matchCallback function was used. Please convert the following route to use a synchronous matchCallback function:`,
                route
              );
            }
          }
          params = matchResult;
          if (Array.isArray(params) && params.length === 0) {
            params = void 0;
          } else if (
            matchResult.constructor === Object &&
            Object.keys(matchResult).length === 0
          ) {
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
          paramName: "route",
        });
        finalAssertExports.hasMethod(route, "match", {
          moduleName: "workbox-routing",
          className: "Router",
          funcName: "registerRoute",
          paramName: "route",
        });
        finalAssertExports.isType(route.handler, "object", {
          moduleName: "workbox-routing",
          className: "Router",
          funcName: "registerRoute",
          paramName: "route",
        });
        finalAssertExports.hasMethod(route.handler, "handle", {
          moduleName: "workbox-routing",
          className: "Router",
          funcName: "registerRoute",
          paramName: "route.handler",
        });
        finalAssertExports.isType(route.method, "string", {
          moduleName: "workbox-routing",
          className: "Router",
          funcName: "registerRoute",
          paramName: "route.method",
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
          method: route.method,
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
            paramName: "capture",
          });
        }
        const valueToCheck = capture.startsWith("http")
          ? captureUrl.pathname
          : capture;
        const wildcards = "[*:?+]";
        if (new RegExp(`${wildcards}`).exec(valueToCheck)) {
          logger.debug(
            `The '$capture' parameter contains an Express-style wildcard character (${wildcards}). Strings are now always interpreted as exact matches; use a RegExp for partial or wildcard matches.`
          );
        }
      }
      const matchCallback = ({ url }) => {
        if (false) {
          if (
            url.pathname === captureUrl.pathname &&
            url.origin !== captureUrl.origin
          ) {
            logger.debug(
              `${capture} only partially matches the cross-origin URL ${url.toString()}. This route will only handle cross-origin requests if they match the entire URL.`
            );
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
        paramName: "capture",
      });
    }
    const defaultRouter2 = getOrCreateDefaultRouter();
    defaultRouter2.registerRoute(route);
    return route;
  }

  // node_modules/workbox-precaching/utils/removeIgnoredSearchParams.js
  function removeIgnoredSearchParams(
    urlObject,
    ignoreURLParametersMatching = []
  ) {
    for (const paramName of [...urlObject.searchParams.keys()]) {
      if (
        ignoreURLParametersMatching.some((regExp) => regExp.test(paramName))
      ) {
        urlObject.searchParams.delete(paramName);
      }
    }
    return urlObject;
  }

  // node_modules/workbox-precaching/utils/generateURLVariations.js
  function* generateURLVariations(
    url,
    {
      ignoreURLParametersMatching = [/^utm_/, /^fbclid$/],
      directoryIndex = "index.html",
      cleanURLs = true,
      urlManipulation,
    } = {}
  ) {
    const urlObject = new URL(url, location.href);
    urlObject.hash = "";
    yield urlObject.href;
    const urlWithoutIgnoredParams = removeIgnoredSearchParams(
      urlObject,
      ignoreURLParametersMatching
    );
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
            const integrity =
              precacheController2.getIntegrityForCacheKey(cacheKey);
            return { cacheKey, integrity };
          }
        }
        if (false) {
          logger.debug(
            `Precaching did not find a match for ` + getFriendlyURL(request.url)
          );
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
  var deleteOutdatedCaches = async (
    currentPrecacheName,
    substringToFind = SUBSTRING_TO_FIND
  ) => {
    const cacheNames3 = await self.caches.keys();
    const cacheNamesToDelete = cacheNames3.filter((cacheName) => {
      return (
        cacheName.includes(substringToFind) &&
        cacheName.includes(self.registration.scope) &&
        cacheName !== currentPrecacheName
      );
    });
    await Promise.all(
      cacheNamesToDelete.map((cacheName) => self.caches.delete(cacheName))
    );
    return cacheNamesToDelete;
  };

  // node_modules/workbox-precaching/cleanupOutdatedCaches.js
  function cleanupOutdatedCaches() {
    self.addEventListener("activate", (event) => {
      const cacheName = cacheNames.getPrecacheName();
      event.waitUntil(
        deleteOutdatedCaches(cacheName).then((cachesDeleted) => {
          if (false) {
            if (cachesDeleted.length > 0) {
              logger.log(
                `The following out-of-date precaches were cleaned up automatically:`,
                cachesDeleted
              );
            }
          }
        })
      );
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
          paramName: "request",
        });
      }
      let response = await handler.cacheMatch(request);
      let error = void 0;
      if (!response) {
        if (false) {
          logs.push(
            `No response found in the '${this.cacheName}' cache. Will respond with a network request.`
          );
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
          logs.push(
            `Found a cached response in the '${this.cacheName}' cache.`
          );
        }
      }
      if (false) {
        logger.groupCollapsed(
          messages2.strategyStart(this.constructor.name, request)
        );
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
    },
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
            paramName: "networkTimeoutSeconds",
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
          paramName: "makeRequest",
        });
      }
      const promises = [];
      let timeoutId;
      if (this._networkTimeoutSeconds) {
        const { id, promise } = this._getTimeoutPromise({
          request,
          logs,
          handler,
        });
        timeoutId = id;
        promises.push(promise);
      }
      const networkPromise = this._getNetworkPromise({
        timeoutId,
        request,
        logs,
        handler,
      });
      promises.push(networkPromise);
      const response = await handler.waitUntil(
        (async () => {
          return (
            (await handler.waitUntil(Promise.race(promises))) ||
            (await networkPromise)
          );
        })()
      );
      if (false) {
        logger.groupCollapsed(
          messages2.strategyStart(this.constructor.name, request)
        );
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
            logs.push(
              `Timing out the network response at ${this._networkTimeoutSeconds} seconds.`
            );
          }
          resolve(await handler.cacheMatch(request));
        };
        timeoutId = setTimeout(
          onNetworkTimeout,
          this._networkTimeoutSeconds * 1e3
        );
      });
      return {
        promise: timeoutPromise,
        id: timeoutId,
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
          logs.push(
            `Unable to get a response from the network. Will respond with a cached response.`
          );
        }
      }
      if (error || !response) {
        response = await handler.cacheMatch(request);
        if (false) {
          if (response) {
            logs.push(
              `Found a cached response in the '${this.cacheName}' cache.`
            );
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
          paramName: "request",
        });
      }
      const fetchAndCachePromise = handler
        .fetchAndCachePut(request)
        .catch(() => {});
      void handler.waitUntil(fetchAndCachePromise);
      let response = await handler.cacheMatch(request);
      let error;
      if (response) {
        if (false) {
          logs.push(
            `Found a cached response in the '${this.cacheName}' cache. Will update with the network response in the background.`
          );
        }
      } else {
        if (false) {
          logs.push(
            `No response found in the '${this.cacheName}' cache. Will wait for the network response.`
          );
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
        logger.groupCollapsed(
          messages2.strategyStart(this.constructor.name, request)
        );
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
  } catch (e) {}

  // node_modules/workbox-cacheable-response/CacheableResponse.js
  var CacheableResponse = class {
    constructor(config = {}) {
      if (false) {
        if (!(config.statuses || config.headers)) {
          throw new WorkboxError("statuses-or-headers-required", {
            moduleName: "workbox-cacheable-response",
            className: "CacheableResponse",
            funcName: "constructor",
          });
        }
        if (config.statuses) {
          finalAssertExports.isArray(config.statuses, {
            moduleName: "workbox-cacheable-response",
            className: "CacheableResponse",
            funcName: "constructor",
            paramName: "config.statuses",
          });
        }
        if (config.headers) {
          finalAssertExports.isType(config.headers, "object", {
            moduleName: "workbox-cacheable-response",
            className: "CacheableResponse",
            funcName: "constructor",
            paramName: "config.headers",
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
          paramName: "response",
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
          logger.groupCollapsed(
            `The request for '${getFriendlyURL(
              response.url
            )}' returned a response that does not meet the criteria for being cached.`
          );
          logger.groupCollapsed(`View cacheability criteria here.`);
          logger.log(`Cacheable statuses: ` + JSON.stringify(this._statuses));
          logger.log(
            `Cacheable headers: ` + JSON.stringify(this._headers, null, 2)
          );
          logger.groupEnd();
          const logFriendlyHeaders = {};
          response.headers.forEach((value, key) => {
            logFriendlyHeaders[key] = value;
          });
          logger.groupCollapsed(`View response status and headers here.`);
          logger.log(`Response status: ${response.status}`);
          logger.log(
            `Response headers: ` + JSON.stringify(logFriendlyHeaders, null, 2)
          );
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
  var instanceOfAny = (object, constructors) =>
    constructors.some((c) => object instanceof c);
  var idbProxyableTypes;
  var cursorAdvanceMethods;
  function getIdbProxyableTypes() {
    return (
      idbProxyableTypes ||
      (idbProxyableTypes = [
        IDBDatabase,
        IDBObjectStore,
        IDBIndex,
        IDBCursor,
        IDBTransaction,
      ])
    );
  }
  function getCursorAdvanceMethods() {
    return (
      cursorAdvanceMethods ||
      (cursorAdvanceMethods = [
        IDBCursor.prototype.advance,
        IDBCursor.prototype.continue,
        IDBCursor.prototype.continuePrimaryKey,
      ])
    );
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
    promise
      .then((value) => {
        if (value instanceof IDBCursor) {
          cursorRequestMap.set(value, request);
        }
      })
      .catch(() => {});
    reverseTransformCache.set(promise, request);
    return promise;
  }
  function cacheDonePromiseForTransaction(tx) {
    if (transactionDoneMap.has(tx)) return;
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
        if (prop === "done") return transactionDoneMap.get(target);
        if (prop === "objectStoreNames") {
          return (
            target.objectStoreNames || transactionStoreNamesMap.get(target)
          );
        }
        if (prop === "store") {
          return receiver.objectStoreNames[1]
            ? void 0
            : receiver.objectStore(receiver.objectStoreNames[0]);
        }
      }
      return wrap(target[prop]);
    },
    set(target, prop, value) {
      target[prop] = value;
      return true;
    },
    has(target, prop) {
      if (
        target instanceof IDBTransaction &&
        (prop === "done" || prop === "store")
      ) {
        return true;
      }
      return prop in target;
    },
  };
  function replaceTraps(callback) {
    idbProxyTraps = callback(idbProxyTraps);
  }
  function wrapFunction(func) {
    if (
      func === IDBDatabase.prototype.transaction &&
      !("objectStoreNames" in IDBTransaction.prototype)
    ) {
      return function (storeNames, ...args) {
        const tx = func.call(unwrap(this), storeNames, ...args);
        transactionStoreNamesMap.set(
          tx,
          storeNames.sort ? storeNames.sort() : [storeNames]
        );
        return wrap(tx);
      };
    }
    if (getCursorAdvanceMethods().includes(func)) {
      return function (...args) {
        func.apply(unwrap(this), args);
        return wrap(cursorRequestMap.get(this));
      };
    }
    return function (...args) {
      return wrap(func.apply(unwrap(this), args));
    };
  }
  function transformCachableValue(value) {
    if (typeof value === "function") return wrapFunction(value);
    if (value instanceof IDBTransaction) cacheDonePromiseForTransaction(value);
    if (instanceOfAny(value, getIdbProxyableTypes()))
      return new Proxy(value, idbProxyTraps);
    return value;
  }
  function wrap(value) {
    if (value instanceof IDBRequest) return promisifyRequest(value);
    if (transformCache.has(value)) return transformCache.get(value);
    const newValue = transformCachableValue(value);
    if (newValue !== value) {
      transformCache.set(value, newValue);
      reverseTransformCache.set(newValue, value);
    }
    return newValue;
  }
  var unwrap = (value) => reverseTransformCache.get(value);

  // node_modules/idb/build/index.js
  function openDB(
    name,
    version,
    { blocked, upgrade, blocking, terminated } = {}
  ) {
    const request = indexedDB.open(name, version);
    const openPromise = wrap(request);
    if (upgrade) {
      request.addEventListener("upgradeneeded", (event) => {
        upgrade(
          wrap(request.result),
          event.oldVersion,
          event.newVersion,
          wrap(request.transaction)
        );
      });
    }
    if (blocked) request.addEventListener("blocked", () => blocked());
    openPromise
      .then((db) => {
        if (terminated) db.addEventListener("close", () => terminated());
        if (blocking) db.addEventListener("versionchange", () => blocking());
      })
      .catch(() => {});
    return openPromise;
  }
  function deleteDB(name, { blocked } = {}) {
    const request = indexedDB.deleteDatabase(name);
    if (blocked) request.addEventListener("blocked", () => blocked());
    return wrap(request).then(() => void 0);
  }
  var readMethods = ["get", "getKey", "getAll", "getAllKeys", "count"];
  var writeMethods = ["put", "add", "delete", "clear"];
  var cachedMethods = /* @__PURE__ */ new Map();
  function getMethod(target, prop) {
    if (
      !(
        target instanceof IDBDatabase &&
        !(prop in target) &&
        typeof prop === "string"
      )
    ) {
      return;
    }
    if (cachedMethods.get(prop)) return cachedMethods.get(prop);
    const targetFuncName = prop.replace(/FromIndex$/, "");
    const useIndex = prop !== targetFuncName;
    const isWrite = writeMethods.includes(targetFuncName);
    if (
      !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) ||
      !(isWrite || readMethods.includes(targetFuncName))
    ) {
      return;
    }
    const method = async function (storeName, ...args) {
      const tx = this.transaction(
        storeName,
        isWrite ? "readwrite" : "readonly"
      );
      let target2 = tx.store;
      if (useIndex) target2 = target2.index(args.shift());
      return (
        await Promise.all([
          target2[targetFuncName](...args),
          isWrite && tx.done,
        ])
      )[0];
    };
    cachedMethods.set(prop, method);
    return method;
  }
  replaceTraps((oldTraps) => ({
    ...oldTraps,
    get: (target, prop, receiver) =>
      getMethod(target, prop) || oldTraps.get(target, prop, receiver),
    has: (target, prop) =>
      !!getMethod(target, prop) || oldTraps.has(target, prop),
  }));

  // node_modules/workbox-expiration/_version.js
  try {
    self["workbox:expiration:6.5.3"] && _();
  } catch (e) {}

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
      const objStore = db.createObjectStore(CACHE_OBJECT_STORE, {
        keyPath: "id",
      });
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
        id: this._getId(url),
      };
      const db = await this.getDb();
      const tx = db.transaction(CACHE_OBJECT_STORE, "readwrite", {
        durability: "relaxed",
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
      let cursor = await db
        .transaction(CACHE_OBJECT_STORE)
        .store.index("timestamp")
        .openCursor(null, "prev");
      const entriesToDelete = [];
      let entriesNotDeletedCount = 0;
      while (cursor) {
        const result = cursor.value;
        if (result.cacheName === this._cacheName) {
          if (
            (minTimestamp && result.timestamp < minTimestamp) ||
            (maxCount && entriesNotDeletedCount >= maxCount)
          ) {
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
          upgrade: this._upgradeDbAndDeleteOldDbs.bind(this),
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
          paramName: "cacheName",
        });
        if (!(config.maxEntries || config.maxAgeSeconds)) {
          throw new WorkboxError("max-entries-or-age-required", {
            moduleName: "workbox-expiration",
            className: "CacheExpiration",
            funcName: "constructor",
          });
        }
        if (config.maxEntries) {
          finalAssertExports.isType(config.maxEntries, "number", {
            moduleName: "workbox-expiration",
            className: "CacheExpiration",
            funcName: "constructor",
            paramName: "config.maxEntries",
          });
        }
        if (config.maxAgeSeconds) {
          finalAssertExports.isType(config.maxAgeSeconds, "number", {
            moduleName: "workbox-expiration",
            className: "CacheExpiration",
            funcName: "constructor",
            paramName: "config.maxAgeSeconds",
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
      const minTimestamp = this._maxAgeSeconds
        ? Date.now() - this._maxAgeSeconds * 1e3
        : 0;
      const urlsExpired = await this._timestampModel.expireEntries(
        minTimestamp,
        this._maxEntries
      );
      const cache = await self.caches.open(this._cacheName);
      for (const url of urlsExpired) {
        await cache.delete(url, this._matchOptions);
      }
      if (false) {
        if (urlsExpired.length > 0) {
          logger.groupCollapsed(
            `Expired ${urlsExpired.length} ${
              urlsExpired.length === 1 ? "entry" : "entries"
            } and removed ${
              urlsExpired.length === 1 ? "it" : "them"
            } from the '${this._cacheName}' cache.`
          );
          logger.log(
            `Expired the following ${
              urlsExpired.length === 1 ? "URL" : "URLs"
            }:`
          );
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
          paramName: "url",
        });
      }
      await this._timestampModel.setTimestamp(url, Date.now());
    }
    async isURLExpired(url) {
      if (!this._maxAgeSeconds) {
        if (false) {
          throw new WorkboxError(`expired-test-without-max-age`, {
            methodName: "isURLExpired",
            paramName: "maxAgeSeconds",
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
      this.cachedResponseWillBeUsed = async ({
        event,
        request,
        cacheName,
        cachedResponse,
      }) => {
        if (!cachedResponse) {
          return null;
        }
        const isFresh = this._isResponseDateFresh(cachedResponse);
        const cacheExpiration = this._getCacheExpiration(cacheName);
        dontWaitFor(cacheExpiration.expireEntries());
        const updateTimestampDone = cacheExpiration.updateTimestamp(
          request.url
        );
        if (event) {
          try {
            event.waitUntil(updateTimestampDone);
          } catch (error) {
            if (false) {
              if ("request" in event) {
                logger.warn(
                  `Unable to ensure service worker stays alive when updating cache entry for '${getFriendlyURL(
                    event.request.url
                  )}'.`
                );
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
            paramName: "cacheName",
          });
          finalAssertExports.isInstance(request, Request, {
            moduleName: "workbox-expiration",
            className: "Plugin",
            funcName: "cacheDidUpdate",
            paramName: "request",
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
            funcName: "constructor",
          });
        }
        if (config.maxEntries) {
          finalAssertExports.isType(config.maxEntries, "number", {
            moduleName: "workbox-expiration",
            className: "Plugin",
            funcName: "constructor",
            paramName: "config.maxEntries",
          });
        }
        if (config.maxAgeSeconds) {
          finalAssertExports.isType(config.maxAgeSeconds, "number", {
            moduleName: "workbox-expiration",
            className: "Plugin",
            funcName: "constructor",
            paramName: "config.maxAgeSeconds",
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
  } catch (e) {}

  // node_modules/workbox-recipes/googleFontsCache.js
  function googleFontsCache(options = {}) {
    const sheetCacheName = `${
      options.cachePrefix || "google-fonts"
    }-stylesheets`;
    const fontCacheName = `${options.cachePrefix || "google-fonts"}-webfonts`;
    const maxAgeSeconds = options.maxAgeSeconds || 60 * 60 * 24 * 365;
    const maxEntries = options.maxEntries || 30;
    registerRoute(
      ({ url }) => url.origin === "https://fonts.googleapis.com",
      new StaleWhileRevalidate({
        cacheName: sheetCacheName,
      })
    );
    registerRoute(
      ({ url }) => url.origin === "https://fonts.gstatic.com",
      new CacheFirst({
        cacheName: fontCacheName,
        plugins: [
          new CacheableResponsePlugin({
            statuses: [0, 200],
          }),
          new ExpirationPlugin({
            maxAgeSeconds,
            maxEntries,
          }),
        ],
      })
    );
  }

  // node_modules/workbox-background-sync/_version.js
  try {
    self["workbox:background-sync:6.5.3"] && _();
  } catch (e) {}

  // node_modules/workbox-background-sync/lib/QueueDb.js
  var DB_VERSION = 3;
  var DB_NAME2 = "workbox-background-sync";
  var REQUEST_OBJECT_STORE_NAME = "requests";
  var QUEUE_NAME_INDEX = "queueName";
  var QueueDb = class {
    constructor() {
      this._db = null;
    }
    async addEntry(entry) {
      const db = await this.getDb();
      const tx = db.transaction(REQUEST_OBJECT_STORE_NAME, "readwrite", {
        durability: "relaxed",
      });
      await tx.store.add(entry);
      await tx.done;
    }
    async getFirstEntryId() {
      const db = await this.getDb();
      const cursor = await db
        .transaction(REQUEST_OBJECT_STORE_NAME)
        .store.openCursor();
      return cursor === null || cursor === void 0 ? void 0 : cursor.value.id;
    }
    async getAllEntriesByQueueName(queueName) {
      const db = await this.getDb();
      const results = await db.getAllFromIndex(
        REQUEST_OBJECT_STORE_NAME,
        QUEUE_NAME_INDEX,
        IDBKeyRange.only(queueName)
      );
      return results ? results : new Array();
    }
    async getEntryCountByQueueName(queueName) {
      const db = await this.getDb();
      return db.countFromIndex(
        REQUEST_OBJECT_STORE_NAME,
        QUEUE_NAME_INDEX,
        IDBKeyRange.only(queueName)
      );
    }
    async deleteEntry(id) {
      const db = await this.getDb();
      await db.delete(REQUEST_OBJECT_STORE_NAME, id);
    }
    async getFirstEntryByQueueName(queueName) {
      return await this.getEndEntryFromIndex(
        IDBKeyRange.only(queueName),
        "next"
      );
    }
    async getLastEntryByQueueName(queueName) {
      return await this.getEndEntryFromIndex(
        IDBKeyRange.only(queueName),
        "prev"
      );
    }
    async getEndEntryFromIndex(query, direction) {
      const db = await this.getDb();
      const cursor = await db
        .transaction(REQUEST_OBJECT_STORE_NAME)
        .store.index(QUEUE_NAME_INDEX)
        .openCursor(query, direction);
      return cursor === null || cursor === void 0 ? void 0 : cursor.value;
    }
    async getDb() {
      if (!this._db) {
        this._db = await openDB(DB_NAME2, DB_VERSION, {
          upgrade: this._upgradeDb,
        });
      }
      return this._db;
    }
    _upgradeDb(db, oldVersion) {
      if (oldVersion > 0 && oldVersion < DB_VERSION) {
        if (db.objectStoreNames.contains(REQUEST_OBJECT_STORE_NAME)) {
          db.deleteObjectStore(REQUEST_OBJECT_STORE_NAME);
        }
      }
      const objStore = db.createObjectStore(REQUEST_OBJECT_STORE_NAME, {
        autoIncrement: true,
        keyPath: "id",
      });
      objStore.createIndex(QUEUE_NAME_INDEX, QUEUE_NAME_INDEX, {
        unique: false,
      });
    }
  };

  // node_modules/workbox-background-sync/lib/QueueStore.js
  var QueueStore = class {
    constructor(queueName) {
      this._queueName = queueName;
      this._queueDb = new QueueDb();
    }
    async pushEntry(entry) {
      if (false) {
        finalAssertExports.isType(entry, "object", {
          moduleName: "workbox-background-sync",
          className: "QueueStore",
          funcName: "pushEntry",
          paramName: "entry",
        });
        finalAssertExports.isType(entry.requestData, "object", {
          moduleName: "workbox-background-sync",
          className: "QueueStore",
          funcName: "pushEntry",
          paramName: "entry.requestData",
        });
      }
      delete entry.id;
      entry.queueName = this._queueName;
      await this._queueDb.addEntry(entry);
    }
    async unshiftEntry(entry) {
      if (false) {
        finalAssertExports.isType(entry, "object", {
          moduleName: "workbox-background-sync",
          className: "QueueStore",
          funcName: "unshiftEntry",
          paramName: "entry",
        });
        finalAssertExports.isType(entry.requestData, "object", {
          moduleName: "workbox-background-sync",
          className: "QueueStore",
          funcName: "unshiftEntry",
          paramName: "entry.requestData",
        });
      }
      const firstId = await this._queueDb.getFirstEntryId();
      if (firstId) {
        entry.id = firstId - 1;
      } else {
        delete entry.id;
      }
      entry.queueName = this._queueName;
      await this._queueDb.addEntry(entry);
    }
    async popEntry() {
      return this._removeEntry(
        await this._queueDb.getLastEntryByQueueName(this._queueName)
      );
    }
    async shiftEntry() {
      return this._removeEntry(
        await this._queueDb.getFirstEntryByQueueName(this._queueName)
      );
    }
    async getAll() {
      return await this._queueDb.getAllEntriesByQueueName(this._queueName);
    }
    async size() {
      return await this._queueDb.getEntryCountByQueueName(this._queueName);
    }
    async deleteEntry(id) {
      await this._queueDb.deleteEntry(id);
    }
    async _removeEntry(entry) {
      if (entry) {
        await this.deleteEntry(entry.id);
      }
      return entry;
    }
  };

  // node_modules/workbox-background-sync/lib/StorableRequest.js
  var serializableProperties = [
    "method",
    "referrer",
    "referrerPolicy",
    "mode",
    "credentials",
    "cache",
    "redirect",
    "integrity",
    "keepalive",
  ];
  var StorableRequest = class {
    constructor(requestData) {
      if (false) {
        finalAssertExports.isType(requestData, "object", {
          moduleName: "workbox-background-sync",
          className: "StorableRequest",
          funcName: "constructor",
          paramName: "requestData",
        });
        finalAssertExports.isType(requestData.url, "string", {
          moduleName: "workbox-background-sync",
          className: "StorableRequest",
          funcName: "constructor",
          paramName: "requestData.url",
        });
      }
      if (requestData["mode"] === "navigate") {
        requestData["mode"] = "same-origin";
      }
      this._requestData = requestData;
    }
    static async fromRequest(request) {
      const requestData = {
        url: request.url,
        headers: {},
      };
      if (request.method !== "GET") {
        requestData.body = await request.clone().arrayBuffer();
      }
      for (const [key, value] of request.headers.entries()) {
        requestData.headers[key] = value;
      }
      for (const prop of serializableProperties) {
        if (request[prop] !== void 0) {
          requestData[prop] = request[prop];
        }
      }
      return new StorableRequest(requestData);
    }
    toObject() {
      const requestData = Object.assign({}, this._requestData);
      requestData.headers = Object.assign({}, this._requestData.headers);
      if (requestData.body) {
        requestData.body = requestData.body.slice(0);
      }
      return requestData;
    }
    toRequest() {
      return new Request(this._requestData.url, this._requestData);
    }
    clone() {
      return new StorableRequest(this.toObject());
    }
  };

  // node_modules/workbox-background-sync/Queue.js
  var TAG_PREFIX = "workbox-background-sync";
  var MAX_RETENTION_TIME = 60 * 24 * 7;
  var queueNames = /* @__PURE__ */ new Set();
  var convertEntry = (queueStoreEntry) => {
    const queueEntry = {
      request: new StorableRequest(queueStoreEntry.requestData).toRequest(),
      timestamp: queueStoreEntry.timestamp,
    };
    if (queueStoreEntry.metadata) {
      queueEntry.metadata = queueStoreEntry.metadata;
    }
    return queueEntry;
  };
  var Queue = class {
    constructor(name, { forceSyncFallback, onSync, maxRetentionTime } = {}) {
      this._syncInProgress = false;
      this._requestsAddedDuringSync = false;
      if (queueNames.has(name)) {
        throw new WorkboxError("duplicate-queue-name", { name });
      } else {
        queueNames.add(name);
      }
      this._name = name;
      this._onSync = onSync || this.replayRequests;
      this._maxRetentionTime = maxRetentionTime || MAX_RETENTION_TIME;
      this._forceSyncFallback = Boolean(forceSyncFallback);
      this._queueStore = new QueueStore(this._name);
      this._addSyncListener();
    }
    get name() {
      return this._name;
    }
    async pushRequest(entry) {
      if (false) {
        finalAssertExports.isType(entry, "object", {
          moduleName: "workbox-background-sync",
          className: "Queue",
          funcName: "pushRequest",
          paramName: "entry",
        });
        finalAssertExports.isInstance(entry.request, Request, {
          moduleName: "workbox-background-sync",
          className: "Queue",
          funcName: "pushRequest",
          paramName: "entry.request",
        });
      }
      await this._addRequest(entry, "push");
    }
    async unshiftRequest(entry) {
      if (false) {
        finalAssertExports.isType(entry, "object", {
          moduleName: "workbox-background-sync",
          className: "Queue",
          funcName: "unshiftRequest",
          paramName: "entry",
        });
        finalAssertExports.isInstance(entry.request, Request, {
          moduleName: "workbox-background-sync",
          className: "Queue",
          funcName: "unshiftRequest",
          paramName: "entry.request",
        });
      }
      await this._addRequest(entry, "unshift");
    }
    async popRequest() {
      return this._removeRequest("pop");
    }
    async shiftRequest() {
      return this._removeRequest("shift");
    }
    async getAll() {
      const allEntries = await this._queueStore.getAll();
      const now = Date.now();
      const unexpiredEntries = [];
      for (const entry of allEntries) {
        const maxRetentionTimeInMs = this._maxRetentionTime * 60 * 1e3;
        if (now - entry.timestamp > maxRetentionTimeInMs) {
          await this._queueStore.deleteEntry(entry.id);
        } else {
          unexpiredEntries.push(convertEntry(entry));
        }
      }
      return unexpiredEntries;
    }
    async size() {
      return await this._queueStore.size();
    }
    async _addRequest(
      { request, metadata, timestamp = Date.now() },
      operation
    ) {
      const storableRequest = await StorableRequest.fromRequest(
        request.clone()
      );
      const entry = {
        requestData: storableRequest.toObject(),
        timestamp,
      };
      if (metadata) {
        entry.metadata = metadata;
      }
      switch (operation) {
        case "push":
          await this._queueStore.pushEntry(entry);
          break;
        case "unshift":
          await this._queueStore.unshiftEntry(entry);
          break;
      }
      if (false) {
        logger.log(
          `Request for '${getFriendlyURL(
            request.url
          )}' has been added to background sync queue '${this._name}'.`
        );
      }
      if (this._syncInProgress) {
        this._requestsAddedDuringSync = true;
      } else {
        await this.registerSync();
      }
    }
    async _removeRequest(operation) {
      const now = Date.now();
      let entry;
      switch (operation) {
        case "pop":
          entry = await this._queueStore.popEntry();
          break;
        case "shift":
          entry = await this._queueStore.shiftEntry();
          break;
      }
      if (entry) {
        const maxRetentionTimeInMs = this._maxRetentionTime * 60 * 1e3;
        if (now - entry.timestamp > maxRetentionTimeInMs) {
          return this._removeRequest(operation);
        }
        return convertEntry(entry);
      } else {
        return void 0;
      }
    }
    async replayRequests() {
      let entry;
      while ((entry = await this.shiftRequest())) {
        try {
          await fetch(entry.request.clone());
          if (false) {
            logger.log(
              `Request for '${getFriendlyURL(
                entry.request.url
              )}' has been replayed in queue '${this._name}'`
            );
          }
        } catch (error) {
          await this.unshiftRequest(entry);
          if (false) {
            logger.log(
              `Request for '${getFriendlyURL(
                entry.request.url
              )}' failed to replay, putting it back in queue '${this._name}'`
            );
          }
          throw new WorkboxError("queue-replay-failed", { name: this._name });
        }
      }
      if (false) {
        logger.log(
          `All requests in queue '${this.name}' have successfully replayed; the queue is now empty!`
        );
      }
    }
    async registerSync() {
      if ("sync" in self.registration && !this._forceSyncFallback) {
        try {
          await self.registration.sync.register(`${TAG_PREFIX}:${this._name}`);
        } catch (err) {
          if (false) {
            logger.warn(
              `Unable to register sync event for '${this._name}'.`,
              err
            );
          }
        }
      }
    }
    _addSyncListener() {
      if ("sync" in self.registration && !this._forceSyncFallback) {
        self.addEventListener("sync", (event) => {
          if (event.tag === `${TAG_PREFIX}:${this._name}`) {
            if (false) {
              logger.log(
                `Background sync for tag '${event.tag}' has been received`
              );
            }
            const syncComplete = async () => {
              this._syncInProgress = true;
              let syncError;
              try {
                await this._onSync({ queue: this });
              } catch (error) {
                if (error instanceof Error) {
                  syncError = error;
                  throw syncError;
                }
              } finally {
                if (
                  this._requestsAddedDuringSync &&
                  !(syncError && !event.lastChance)
                ) {
                  await this.registerSync();
                }
                this._syncInProgress = false;
                this._requestsAddedDuringSync = false;
              }
            };
            event.waitUntil(syncComplete());
          }
        });
      } else {
        if (false) {
          logger.log(`Background sync replaying without background sync event`);
        }
        void this._onSync({ queue: this });
      }
    }
    static get _queueNames() {
      return queueNames;
    }
  };

  // src-pwa/custom-service-worker.js
  self.skipWaiting();
  clientsClaim();
  precacheAndRoute([
    { revision: "4e9df72260ddba693d544a3d31d56530", url: "favicon.ico" },
    {
      revision: "c18800ada3eda5b38f1fc5e2d5cae10f",
      url: "icons/apple-icon-120x120.png",
    },
    {
      revision: "95190973a27f346a2082ae1cd9c0abaf",
      url: "icons/apple-icon-152x152.png",
    },
    {
      revision: "3f925bc01e8bc0f3d7cd4617ccc3738a",
      url: "icons/apple-icon-167x167.png",
    },
    {
      revision: "ac3da4ecb9574c46f87dce8ea71612be",
      url: "icons/apple-icon-180x180.png",
    },
    {
      revision: "18e086bf3afe309323afe930620cba90",
      url: "icons/apple-launch-1125x2436.png",
    },
    {
      revision: "da4b2b7c0b976732ca4dbe6d55afee24",
      url: "icons/apple-launch-1170x2532.png",
    },
    {
      revision: "4fffaa30f986f26ed8d4c3e947be8701",
      url: "icons/apple-launch-1242x2208.png",
    },
    {
      revision: "5bff93bfe08778caffcd964a30a32339",
      url: "icons/apple-launch-1242x2688.png",
    },
    {
      revision: "5d753ec8e1c1182642e4b5986c2d7cd7",
      url: "icons/apple-launch-1284x2778.png",
    },
    {
      revision: "e9b24abcbf3b05e9d2be07b9186f89fd",
      url: "icons/apple-launch-1536x2048.png",
    },
    {
      revision: "06fa13bfac043a05084bf9b150ad1121",
      url: "icons/apple-launch-1620x2160.png",
    },
    {
      revision: "a35254b91b97fdba7a468de7dd44d454",
      url: "icons/apple-launch-1668x2224.png",
    },
    {
      revision: "74f173233ae7810c05847c8c5c77155b",
      url: "icons/apple-launch-1668x2388.png",
    },
    {
      revision: "f2aa0c2556bfa8e0af8f4b5a1a4b7e4c",
      url: "icons/apple-launch-2048x2732.png",
    },
    {
      revision: "e6c5d9cccba54faf07b1a16b462a9d06",
      url: "icons/apple-launch-750x1334.png",
    },
    {
      revision: "b8ba1fd65e523a5b5e5b0037175d98f1",
      url: "icons/apple-launch-828x1792.png",
    },
    {
      revision: "f98ce64a97081d84147cd8723792201e",
      url: "icons/favicon-128x128.png",
    },
    {
      revision: "1a02032274e46ee3b440a38550106fe3",
      url: "icons/favicon-16x16.png",
    },
    {
      revision: "416389947164ff036b2d1a2dd3855e23",
      url: "icons/favicon-32x32.png",
    },
    {
      revision: "d5e473cd2e3911dd5f7ff3b02a7db962",
      url: "icons/favicon-96x96.png",
    },
    {
      revision: "f98ce64a97081d84147cd8723792201e",
      url: "icons/icon-128x128.png",
    },
    {
      revision: "d0b6aa54c442f6142581c7fa95b4d6a0",
      url: "icons/icon-192x192.png",
    },
    {
      revision: "8d3f351140fb51c5cb880498ff91c7cc",
      url: "icons/icon-256x256.png",
    },
    {
      revision: "d24650479c8c698dbad71e155d3b3ec5",
      url: "icons/icon-384x384.png",
    },
    {
      revision: "093c6dbb842b8e346c0a38e87de0cd23",
      url: "icons/icon-512x512.png",
    },
    {
      revision: "f3a7cbd49251ee2bcba3db06febffcc3",
      url: "icons/ms-icon-144x144.png",
    },
    {
      revision: "f71c562d12ece59f74dae009de4aa668",
      url: "icons/safari-pinned-tab.svg",
    },
    {
      revision: "e2e9999dd2cc813625d7dfca93b292eb",
      url: "images/icon-alt.png",
    },
    { revision: "5a8a8aab31d2047dce2c6db8aea24e4e", url: "images/icon.png" },
    {
      revision: "48cecb72dc8b91c141c3e25a7ddff4dc",
      url: "images/login-bg.jpg",
    },
    {
      revision: "1bcd0ad4920234aeac30ef4a880fb985",
      url: "images/logo-alt.png",
    },
    { revision: "c472d09ddd4b604a7b3841b19bd0bac1", url: "images/logo.png" },
  ]);
  var backgroundSyncSupported = "sync" in self.registration || false;
  console.log("BackgroundSyncSupported: ", backgroundSyncSupported);
  var createPostQueue;
  if (backgroundSyncSupported) {
    createPostQueue = new Queue("createPostQueue", {
      onSync: async ({ queue }) => {
        let entry;
        while ((entry = await queue.shiftRequest())) {
          try {
            await fetch(entry.request);
            console.log("Replay successful for request", entry.request);
            const channel = new BroadcastChannel("sw-messages");
            channel.postMessage({ msg: "offline-post-uploaded" });
          } catch (error) {
            console.error("Replay failed for request", entry.request, error);
            await queue.unshiftRequest(entry);
            throw error;
          }
        }
        console.log("Replay complete!");
      },
    });
  }
  cleanupOutdatedCaches();
  googleFontsCache({
    cachePrefix: "google-fonts",
    maxEntries: 60,
  });
  registerRoute(
    ({ url }) => url.pathname.startsWith("/posts"),
    new NetworkFirst({
      cacheName: "qaravel-api",
    })
  );
  registerRoute(
    ({ url }) => url.href.startsWith("http"),
    new StaleWhileRevalidate()
  );
  self.addEventListener("fetch", (event) => {
    if (backgroundSyncSupported) {
      if (event.request.url.endsWith("/posts/store")) {
        const promiseChain = fetch(event.request.clone()).catch((err) => {
          return createPostQueue.pushRequest({ request: event.request });
        });
        event.waitUntil(promiseChain);
      }
    }
  });
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtY29yZS9fdmVyc2lvbi5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1jb3JlL19wcml2YXRlL2xvZ2dlci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1jb3JlL21vZGVscy9tZXNzYWdlcy9tZXNzYWdlR2VuZXJhdG9yLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LWNvcmUvX3ByaXZhdGUvV29ya2JveEVycm9yLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LWNvcmUvbW9kZWxzL3F1b3RhRXJyb3JDYWxsYmFja3MuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtY29yZS9yZWdpc3RlclF1b3RhRXJyb3JDYWxsYmFjay5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1jb3JlL19wcml2YXRlL2NhY2hlTmFtZXMuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtY29yZS9fcHJpdmF0ZS9jYWNoZU1hdGNoSWdub3JlUGFyYW1zLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LWNvcmUvX3ByaXZhdGUvY2FuQ29uc3RydWN0UmVzcG9uc2VGcm9tQm9keVN0cmVhbS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1jb3JlL19wcml2YXRlL2RvbnRXYWl0Rm9yLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LWNvcmUvX3ByaXZhdGUvRGVmZXJyZWQuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtY29yZS9fcHJpdmF0ZS9leGVjdXRlUXVvdGFFcnJvckNhbGxiYWNrcy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1jb3JlL19wcml2YXRlL2dldEZyaWVuZGx5VVJMLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LWNvcmUvX3ByaXZhdGUvdGltZW91dC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1jb3JlL19wcml2YXRlL3dhaXRVbnRpbC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1jb3JlL2NvcHlSZXNwb25zZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1jb3JlL2NsaWVudHNDbGFpbS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1wcmVjYWNoaW5nL192ZXJzaW9uLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LXByZWNhY2hpbmcvdXRpbHMvY3JlYXRlQ2FjaGVLZXkuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtcHJlY2FjaGluZy91dGlscy9QcmVjYWNoZUluc3RhbGxSZXBvcnRQbHVnaW4uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtcHJlY2FjaGluZy91dGlscy9QcmVjYWNoZUNhY2hlS2V5UGx1Z2luLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LXN0cmF0ZWdpZXMvX3ZlcnNpb24uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtc3RyYXRlZ2llcy9TdHJhdGVneUhhbmRsZXIuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtc3RyYXRlZ2llcy9TdHJhdGVneS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1wcmVjYWNoaW5nL1ByZWNhY2hlU3RyYXRlZ3kuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtcHJlY2FjaGluZy9QcmVjYWNoZUNvbnRyb2xsZXIuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtcHJlY2FjaGluZy91dGlscy9nZXRPckNyZWF0ZVByZWNhY2hlQ29udHJvbGxlci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1yb3V0aW5nL192ZXJzaW9uLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LXJvdXRpbmcvdXRpbHMvY29uc3RhbnRzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LXJvdXRpbmcvdXRpbHMvbm9ybWFsaXplSGFuZGxlci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1yb3V0aW5nL1JvdXRlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LXJvdXRpbmcvUmVnRXhwUm91dGUuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtcm91dGluZy9Sb3V0ZXIuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtcm91dGluZy91dGlscy9nZXRPckNyZWF0ZURlZmF1bHRSb3V0ZXIuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtcm91dGluZy9yZWdpc3RlclJvdXRlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LXByZWNhY2hpbmcvdXRpbHMvcmVtb3ZlSWdub3JlZFNlYXJjaFBhcmFtcy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1wcmVjYWNoaW5nL3V0aWxzL2dlbmVyYXRlVVJMVmFyaWF0aW9ucy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1wcmVjYWNoaW5nL1ByZWNhY2hlUm91dGUuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtcHJlY2FjaGluZy9hZGRSb3V0ZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1wcmVjYWNoaW5nL3V0aWxzL2RlbGV0ZU91dGRhdGVkQ2FjaGVzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LXByZWNhY2hpbmcvY2xlYW51cE91dGRhdGVkQ2FjaGVzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LXByZWNhY2hpbmcvcHJlY2FjaGUuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtcHJlY2FjaGluZy9wcmVjYWNoZUFuZFJvdXRlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LXN0cmF0ZWdpZXMvQ2FjaGVGaXJzdC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1zdHJhdGVnaWVzL3BsdWdpbnMvY2FjaGVPa0FuZE9wYXF1ZVBsdWdpbi5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1zdHJhdGVnaWVzL05ldHdvcmtGaXJzdC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1zdHJhdGVnaWVzL1N0YWxlV2hpbGVSZXZhbGlkYXRlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LWNhY2hlYWJsZS1yZXNwb25zZS9fdmVyc2lvbi5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1jYWNoZWFibGUtcmVzcG9uc2UvQ2FjaGVhYmxlUmVzcG9uc2UuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtY2FjaGVhYmxlLXJlc3BvbnNlL0NhY2hlYWJsZVJlc3BvbnNlUGx1Z2luLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pZGIvYnVpbGQvd3JhcC1pZGItdmFsdWUuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2lkYi9idWlsZC9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1leHBpcmF0aW9uL192ZXJzaW9uLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LWV4cGlyYXRpb24vbW9kZWxzL0NhY2hlVGltZXN0YW1wc01vZGVsLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LWV4cGlyYXRpb24vQ2FjaGVFeHBpcmF0aW9uLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LWV4cGlyYXRpb24vRXhwaXJhdGlvblBsdWdpbi5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1yZWNpcGVzL192ZXJzaW9uLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LXJlY2lwZXMvZ29vZ2xlRm9udHNDYWNoZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1iYWNrZ3JvdW5kLXN5bmMvX3ZlcnNpb24uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmtib3gtYmFja2dyb3VuZC1zeW5jL2xpYi9RdWV1ZURiLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy93b3JrYm94LWJhY2tncm91bmQtc3luYy9saWIvUXVldWVTdG9yZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1iYWNrZ3JvdW5kLXN5bmMvbGliL1N0b3JhYmxlUmVxdWVzdC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvd29ya2JveC1iYWNrZ3JvdW5kLXN5bmMvUXVldWUuanMiLCAiLi4vLi4vc3JjLXB3YS9jdXN0b20tc2VydmljZS13b3JrZXIuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIlwidXNlIHN0cmljdFwiO1xuLy8gQHRzLWlnbm9yZVxudHJ5IHtcbiAgICBzZWxmWyd3b3JrYm94OmNvcmU6Ni41LjMnXSAmJiBfKCk7XG59XG5jYXRjaCAoZSkgeyB9XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCAnLi4vX3ZlcnNpb24uanMnO1xuY29uc3QgbG9nZ2VyID0gKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbidcbiAgICA/IG51bGxcbiAgICA6ICgoKSA9PiB7XG4gICAgICAgIC8vIERvbid0IG92ZXJ3cml0ZSB0aGlzIHZhbHVlIGlmIGl0J3MgYWxyZWFkeSBzZXQuXG4gICAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3dvcmtib3gvcHVsbC8yMjg0I2lzc3VlY29tbWVudC01NjA0NzA5MjNcbiAgICAgICAgaWYgKCEoJ19fV0JfRElTQUJMRV9ERVZfTE9HUycgaW4gc2VsZikpIHtcbiAgICAgICAgICAgIHNlbGYuX19XQl9ESVNBQkxFX0RFVl9MT0dTID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGluR3JvdXAgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgbWV0aG9kVG9Db2xvck1hcCA9IHtcbiAgICAgICAgICAgIGRlYnVnOiBgIzdmOGM4ZGAsXG4gICAgICAgICAgICBsb2c6IGAjMmVjYzcxYCxcbiAgICAgICAgICAgIHdhcm46IGAjZjM5YzEyYCxcbiAgICAgICAgICAgIGVycm9yOiBgI2MwMzkyYmAsXG4gICAgICAgICAgICBncm91cENvbGxhcHNlZDogYCMzNDk4ZGJgLFxuICAgICAgICAgICAgZ3JvdXBFbmQ6IG51bGwsIC8vIE5vIGNvbG9yZWQgcHJlZml4IG9uIGdyb3VwRW5kXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHByaW50ID0gZnVuY3Rpb24gKG1ldGhvZCwgYXJncykge1xuICAgICAgICAgICAgaWYgKHNlbGYuX19XQl9ESVNBQkxFX0RFVl9MT0dTKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1ldGhvZCA9PT0gJ2dyb3VwQ29sbGFwc2VkJykge1xuICAgICAgICAgICAgICAgIC8vIFNhZmFyaSBkb2Vzbid0IHByaW50IGFsbCBjb25zb2xlLmdyb3VwQ29sbGFwc2VkKCkgYXJndW1lbnRzOlxuICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xODI3NTRcbiAgICAgICAgICAgICAgICBpZiAoL14oKD8hY2hyb21lfGFuZHJvaWQpLikqc2FmYXJpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlW21ldGhvZF0oLi4uYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBzdHlsZXMgPSBbXG4gICAgICAgICAgICAgICAgYGJhY2tncm91bmQ6ICR7bWV0aG9kVG9Db2xvck1hcFttZXRob2RdfWAsXG4gICAgICAgICAgICAgICAgYGJvcmRlci1yYWRpdXM6IDAuNWVtYCxcbiAgICAgICAgICAgICAgICBgY29sb3I6IHdoaXRlYCxcbiAgICAgICAgICAgICAgICBgZm9udC13ZWlnaHQ6IGJvbGRgLFxuICAgICAgICAgICAgICAgIGBwYWRkaW5nOiAycHggMC41ZW1gLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIC8vIFdoZW4gaW4gYSBncm91cCwgdGhlIHdvcmtib3ggcHJlZml4IGlzIG5vdCBkaXNwbGF5ZWQuXG4gICAgICAgICAgICBjb25zdCBsb2dQcmVmaXggPSBpbkdyb3VwID8gW10gOiBbJyVjd29ya2JveCcsIHN0eWxlcy5qb2luKCc7JyldO1xuICAgICAgICAgICAgY29uc29sZVttZXRob2RdKC4uLmxvZ1ByZWZpeCwgLi4uYXJncyk7XG4gICAgICAgICAgICBpZiAobWV0aG9kID09PSAnZ3JvdXBDb2xsYXBzZWQnKSB7XG4gICAgICAgICAgICAgICAgaW5Hcm91cCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWV0aG9kID09PSAnZ3JvdXBFbmQnKSB7XG4gICAgICAgICAgICAgICAgaW5Hcm91cCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10eXBlc1xuICAgICAgICBjb25zdCBhcGkgPSB7fTtcbiAgICAgICAgY29uc3QgbG9nZ2VyTWV0aG9kcyA9IE9iamVjdC5rZXlzKG1ldGhvZFRvQ29sb3JNYXApO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBsb2dnZXJNZXRob2RzKSB7XG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSBrZXk7XG4gICAgICAgICAgICBhcGlbbWV0aG9kXSA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgcHJpbnQobWV0aG9kLCBhcmdzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFwaTtcbiAgICB9KSgpKTtcbmV4cG9ydCB7IGxvZ2dlciB9O1xuIiwgIi8qXG4gIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IG1lc3NhZ2VzIH0gZnJvbSAnLi9tZXNzYWdlcy5qcyc7XG5pbXBvcnQgJy4uLy4uL192ZXJzaW9uLmpzJztcbmNvbnN0IGZhbGxiYWNrID0gKGNvZGUsIC4uLmFyZ3MpID0+IHtcbiAgICBsZXQgbXNnID0gY29kZTtcbiAgICBpZiAoYXJncy5sZW5ndGggPiAwKSB7XG4gICAgICAgIG1zZyArPSBgIDo6ICR7SlNPTi5zdHJpbmdpZnkoYXJncyl9YDtcbiAgICB9XG4gICAgcmV0dXJuIG1zZztcbn07XG5jb25zdCBnZW5lcmF0b3JGdW5jdGlvbiA9IChjb2RlLCBkZXRhaWxzID0ge30pID0+IHtcbiAgICBjb25zdCBtZXNzYWdlID0gbWVzc2FnZXNbY29kZV07XG4gICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIGZpbmQgbWVzc2FnZSBmb3IgY29kZSAnJHtjb2RlfScuYCk7XG4gICAgfVxuICAgIHJldHVybiBtZXNzYWdlKGRldGFpbHMpO1xufTtcbmV4cG9ydCBjb25zdCBtZXNzYWdlR2VuZXJhdG9yID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyA/IGZhbGxiYWNrIDogZ2VuZXJhdG9yRnVuY3Rpb247XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgbWVzc2FnZUdlbmVyYXRvciB9IGZyb20gJy4uL21vZGVscy9tZXNzYWdlcy9tZXNzYWdlR2VuZXJhdG9yLmpzJztcbmltcG9ydCAnLi4vX3ZlcnNpb24uanMnO1xuLyoqXG4gKiBXb3JrYm94IGVycm9ycyBzaG91bGQgYmUgdGhyb3duIHdpdGggdGhpcyBjbGFzcy5cbiAqIFRoaXMgYWxsb3dzIHVzZSB0byBlbnN1cmUgdGhlIHR5cGUgZWFzaWx5IGluIHRlc3RzLFxuICogaGVscHMgZGV2ZWxvcGVycyBpZGVudGlmeSBlcnJvcnMgZnJvbSB3b3JrYm94XG4gKiBlYXNpbHkgYW5kIGFsbG93cyB1c2UgdG8gb3B0aW1pc2UgZXJyb3JcbiAqIG1lc3NhZ2VzIGNvcnJlY3RseS5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5jbGFzcyBXb3JrYm94RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXJyb3JDb2RlIFRoZSBlcnJvciBjb2RlIHRoYXRcbiAgICAgKiBpZGVudGlmaWVzIHRoaXMgcGFydGljdWxhciBlcnJvci5cbiAgICAgKiBAcGFyYW0ge09iamVjdD19IGRldGFpbHMgQW55IHJlbGV2YW50IGFyZ3VtZW50c1xuICAgICAqIHRoYXQgd2lsbCBoZWxwIGRldmVsb3BlcnMgaWRlbnRpZnkgaXNzdWVzIHNob3VsZFxuICAgICAqIGJlIGFkZGVkIGFzIGEga2V5IG9uIHRoZSBjb250ZXh0IG9iamVjdC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihlcnJvckNvZGUsIGRldGFpbHMpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IG1lc3NhZ2VHZW5lcmF0b3IoZXJyb3JDb2RlLCBkZXRhaWxzKTtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIHRoaXMubmFtZSA9IGVycm9yQ29kZTtcbiAgICAgICAgdGhpcy5kZXRhaWxzID0gZGV0YWlscztcbiAgICB9XG59XG5leHBvcnQgeyBXb3JrYm94RXJyb3IgfTtcbiIsICIvKlxuICBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbi8vIENhbGxiYWNrcyB0byBiZSBleGVjdXRlZCB3aGVuZXZlciB0aGVyZSdzIGEgcXVvdGEgZXJyb3IuXG4vLyBDYW4ndCBjaGFuZ2UgRnVuY3Rpb24gdHlwZSByaWdodCBub3cuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10eXBlc1xuY29uc3QgcXVvdGFFcnJvckNhbGxiYWNrcyA9IG5ldyBTZXQoKTtcbmV4cG9ydCB7IHF1b3RhRXJyb3JDYWxsYmFja3MgfTtcbiIsICIvKlxuICBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuL19wcml2YXRlL2xvZ2dlci5qcyc7XG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuL19wcml2YXRlL2Fzc2VydC5qcyc7XG5pbXBvcnQgeyBxdW90YUVycm9yQ2FsbGJhY2tzIH0gZnJvbSAnLi9tb2RlbHMvcXVvdGFFcnJvckNhbGxiYWNrcy5qcyc7XG5pbXBvcnQgJy4vX3ZlcnNpb24uanMnO1xuLyoqXG4gKiBBZGRzIGEgZnVuY3Rpb24gdG8gdGhlIHNldCBvZiBxdW90YUVycm9yQ2FsbGJhY2tzIHRoYXQgd2lsbCBiZSBleGVjdXRlZCBpZlxuICogdGhlcmUncyBhIHF1b3RhIGVycm9yLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAbWVtYmVyb2Ygd29ya2JveC1jb3JlXG4gKi9cbi8vIENhbid0IGNoYW5nZSBGdW5jdGlvbiB0eXBlXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10eXBlc1xuZnVuY3Rpb24gcmVnaXN0ZXJRdW90YUVycm9yQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBhc3NlcnQuaXNUeXBlKGNhbGxiYWNrLCAnZnVuY3Rpb24nLCB7XG4gICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1jb3JlJyxcbiAgICAgICAgICAgIGZ1bmNOYW1lOiAncmVnaXN0ZXInLFxuICAgICAgICAgICAgcGFyYW1OYW1lOiAnY2FsbGJhY2snLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcXVvdGFFcnJvckNhbGxiYWNrcy5hZGQoY2FsbGJhY2spO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGxvZ2dlci5sb2coJ1JlZ2lzdGVyZWQgYSBjYWxsYmFjayB0byByZXNwb25kIHRvIHF1b3RhIGVycm9ycy4nLCBjYWxsYmFjayk7XG4gICAgfVxufVxuZXhwb3J0IHsgcmVnaXN0ZXJRdW90YUVycm9yQ2FsbGJhY2sgfTtcbiIsICIvKlxuICBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbmNvbnN0IF9jYWNoZU5hbWVEZXRhaWxzID0ge1xuICAgIGdvb2dsZUFuYWx5dGljczogJ2dvb2dsZUFuYWx5dGljcycsXG4gICAgcHJlY2FjaGU6ICdwcmVjYWNoZS12MicsXG4gICAgcHJlZml4OiAnd29ya2JveCcsXG4gICAgcnVudGltZTogJ3J1bnRpbWUnLFxuICAgIHN1ZmZpeDogdHlwZW9mIHJlZ2lzdHJhdGlvbiAhPT0gJ3VuZGVmaW5lZCcgPyByZWdpc3RyYXRpb24uc2NvcGUgOiAnJyxcbn07XG5jb25zdCBfY3JlYXRlQ2FjaGVOYW1lID0gKGNhY2hlTmFtZSkgPT4ge1xuICAgIHJldHVybiBbX2NhY2hlTmFtZURldGFpbHMucHJlZml4LCBjYWNoZU5hbWUsIF9jYWNoZU5hbWVEZXRhaWxzLnN1ZmZpeF1cbiAgICAgICAgLmZpbHRlcigodmFsdWUpID0+IHZhbHVlICYmIHZhbHVlLmxlbmd0aCA+IDApXG4gICAgICAgIC5qb2luKCctJyk7XG59O1xuY29uc3QgZWFjaENhY2hlTmFtZURldGFpbCA9IChmbikgPT4ge1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKF9jYWNoZU5hbWVEZXRhaWxzKSkge1xuICAgICAgICBmbihrZXkpO1xuICAgIH1cbn07XG5leHBvcnQgY29uc3QgY2FjaGVOYW1lcyA9IHtcbiAgICB1cGRhdGVEZXRhaWxzOiAoZGV0YWlscykgPT4ge1xuICAgICAgICBlYWNoQ2FjaGVOYW1lRGV0YWlsKChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGV0YWlsc1trZXldID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIF9jYWNoZU5hbWVEZXRhaWxzW2tleV0gPSBkZXRhaWxzW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0R29vZ2xlQW5hbHl0aWNzTmFtZTogKHVzZXJDYWNoZU5hbWUpID0+IHtcbiAgICAgICAgcmV0dXJuIHVzZXJDYWNoZU5hbWUgfHwgX2NyZWF0ZUNhY2hlTmFtZShfY2FjaGVOYW1lRGV0YWlscy5nb29nbGVBbmFseXRpY3MpO1xuICAgIH0sXG4gICAgZ2V0UHJlY2FjaGVOYW1lOiAodXNlckNhY2hlTmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gdXNlckNhY2hlTmFtZSB8fCBfY3JlYXRlQ2FjaGVOYW1lKF9jYWNoZU5hbWVEZXRhaWxzLnByZWNhY2hlKTtcbiAgICB9LFxuICAgIGdldFByZWZpeDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gX2NhY2hlTmFtZURldGFpbHMucHJlZml4O1xuICAgIH0sXG4gICAgZ2V0UnVudGltZU5hbWU6ICh1c2VyQ2FjaGVOYW1lKSA9PiB7XG4gICAgICAgIHJldHVybiB1c2VyQ2FjaGVOYW1lIHx8IF9jcmVhdGVDYWNoZU5hbWUoX2NhY2hlTmFtZURldGFpbHMucnVudGltZSk7XG4gICAgfSxcbiAgICBnZXRTdWZmaXg6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIF9jYWNoZU5hbWVEZXRhaWxzLnN1ZmZpeDtcbiAgICB9LFxufTtcbiIsICIvKlxuICBDb3B5cmlnaHQgMjAyMCBHb29nbGUgTExDXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0ICcuLi9fdmVyc2lvbi5qcyc7XG5mdW5jdGlvbiBzdHJpcFBhcmFtcyhmdWxsVVJMLCBpZ25vcmVQYXJhbXMpIHtcbiAgICBjb25zdCBzdHJpcHBlZFVSTCA9IG5ldyBVUkwoZnVsbFVSTCk7XG4gICAgZm9yIChjb25zdCBwYXJhbSBvZiBpZ25vcmVQYXJhbXMpIHtcbiAgICAgICAgc3RyaXBwZWRVUkwuc2VhcmNoUGFyYW1zLmRlbGV0ZShwYXJhbSk7XG4gICAgfVxuICAgIHJldHVybiBzdHJpcHBlZFVSTC5ocmVmO1xufVxuLyoqXG4gKiBNYXRjaGVzIGFuIGl0ZW0gaW4gdGhlIGNhY2hlLCBpZ25vcmluZyBzcGVjaWZpYyBVUkwgcGFyYW1zLiBUaGlzIGlzIHNpbWlsYXJcbiAqIHRvIHRoZSBgaWdub3JlU2VhcmNoYCBvcHRpb24sIGJ1dCBpdCBhbGxvd3MgeW91IHRvIGlnbm9yZSBqdXN0IHNwZWNpZmljXG4gKiBwYXJhbXMgKHdoaWxlIGNvbnRpbnVpbmcgdG8gbWF0Y2ggb24gdGhlIG90aGVycykuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Q2FjaGV9IGNhY2hlXG4gKiBAcGFyYW0ge1JlcXVlc3R9IHJlcXVlc3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXRjaE9wdGlvbnNcbiAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gaWdub3JlUGFyYW1zXG4gKiBAcmV0dXJuIHtQcm9taXNlPFJlc3BvbnNlfHVuZGVmaW5lZD59XG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGNhY2hlTWF0Y2hJZ25vcmVQYXJhbXMoY2FjaGUsIHJlcXVlc3QsIGlnbm9yZVBhcmFtcywgbWF0Y2hPcHRpb25zKSB7XG4gICAgY29uc3Qgc3RyaXBwZWRSZXF1ZXN0VVJMID0gc3RyaXBQYXJhbXMocmVxdWVzdC51cmwsIGlnbm9yZVBhcmFtcyk7XG4gICAgLy8gSWYgdGhlIHJlcXVlc3QgZG9lc24ndCBpbmNsdWRlIGFueSBpZ25vcmVkIHBhcmFtcywgbWF0Y2ggYXMgbm9ybWFsLlxuICAgIGlmIChyZXF1ZXN0LnVybCA9PT0gc3RyaXBwZWRSZXF1ZXN0VVJMKSB7XG4gICAgICAgIHJldHVybiBjYWNoZS5tYXRjaChyZXF1ZXN0LCBtYXRjaE9wdGlvbnMpO1xuICAgIH1cbiAgICAvLyBPdGhlcndpc2UsIG1hdGNoIGJ5IGNvbXBhcmluZyBrZXlzXG4gICAgY29uc3Qga2V5c09wdGlvbnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1hdGNoT3B0aW9ucyksIHsgaWdub3JlU2VhcmNoOiB0cnVlIH0pO1xuICAgIGNvbnN0IGNhY2hlS2V5cyA9IGF3YWl0IGNhY2hlLmtleXMocmVxdWVzdCwga2V5c09wdGlvbnMpO1xuICAgIGZvciAoY29uc3QgY2FjaGVLZXkgb2YgY2FjaGVLZXlzKSB7XG4gICAgICAgIGNvbnN0IHN0cmlwcGVkQ2FjaGVLZXlVUkwgPSBzdHJpcFBhcmFtcyhjYWNoZUtleS51cmwsIGlnbm9yZVBhcmFtcyk7XG4gICAgICAgIGlmIChzdHJpcHBlZFJlcXVlc3RVUkwgPT09IHN0cmlwcGVkQ2FjaGVLZXlVUkwpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWNoZS5tYXRjaChjYWNoZUtleSwgbWF0Y2hPcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm47XG59XG5leHBvcnQgeyBjYWNoZU1hdGNoSWdub3JlUGFyYW1zIH07XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0ICcuLi9fdmVyc2lvbi5qcyc7XG5sZXQgc3VwcG9ydFN0YXR1cztcbi8qKlxuICogQSB1dGlsaXR5IGZ1bmN0aW9uIHRoYXQgZGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHNcbiAqIGNvbnN0cnVjdGluZyBhIG5ldyBgUmVzcG9uc2VgIGZyb20gYSBgcmVzcG9uc2UuYm9keWAgc3RyZWFtLlxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59IGB0cnVlYCwgaWYgdGhlIGN1cnJlbnQgYnJvd3NlciBjYW4gc3VjY2Vzc2Z1bGx5XG4gKiAgICAgY29uc3RydWN0IGEgYFJlc3BvbnNlYCBmcm9tIGEgYHJlc3BvbnNlLmJvZHlgIHN0cmVhbSwgYGZhbHNlYCBvdGhlcndpc2UuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2FuQ29uc3RydWN0UmVzcG9uc2VGcm9tQm9keVN0cmVhbSgpIHtcbiAgICBpZiAoc3VwcG9ydFN0YXR1cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IHRlc3RSZXNwb25zZSA9IG5ldyBSZXNwb25zZSgnJyk7XG4gICAgICAgIGlmICgnYm9keScgaW4gdGVzdFJlc3BvbnNlKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIG5ldyBSZXNwb25zZSh0ZXN0UmVzcG9uc2UuYm9keSk7XG4gICAgICAgICAgICAgICAgc3VwcG9ydFN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBzdXBwb3J0U3RhdHVzID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3VwcG9ydFN0YXR1cyA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gc3VwcG9ydFN0YXR1cztcbn1cbmV4cG9ydCB7IGNhbkNvbnN0cnVjdFJlc3BvbnNlRnJvbUJvZHlTdHJlYW0gfTtcbiIsICIvKlxuICBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0ICcuLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIEEgaGVscGVyIGZ1bmN0aW9uIHRoYXQgcHJldmVudHMgYSBwcm9taXNlIGZyb20gYmVpbmcgZmxhZ2dlZCBhcyB1bnVzZWQuXG4gKlxuICogQHByaXZhdGVcbiAqKi9cbmV4cG9ydCBmdW5jdGlvbiBkb250V2FpdEZvcihwcm9taXNlKSB7XG4gICAgLy8gRWZmZWN0aXZlIG5vLW9wLlxuICAgIHZvaWQgcHJvbWlzZS50aGVuKCgpID0+IHsgfSk7XG59XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0ICcuLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIFRoZSBEZWZlcnJlZCBjbGFzcyBjb21wb3NlcyBQcm9taXNlcyBpbiBhIHdheSB0aGF0IGFsbG93cyBmb3IgdGhlbSB0byBiZVxuICogcmVzb2x2ZWQgb3IgcmVqZWN0ZWQgZnJvbSBvdXRzaWRlIHRoZSBjb25zdHJ1Y3Rvci4gSW4gbW9zdCBjYXNlcyBwcm9taXNlc1xuICogc2hvdWxkIGJlIHVzZWQgZGlyZWN0bHksIGJ1dCBEZWZlcnJlZHMgY2FuIGJlIG5lY2Vzc2FyeSB3aGVuIHRoZSBsb2dpYyB0b1xuICogcmVzb2x2ZSBhIHByb21pc2UgbXVzdCBiZSBzZXBhcmF0ZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5jbGFzcyBEZWZlcnJlZCB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHByb21pc2UgYW5kIGV4cG9zZXMgaXRzIHJlc29sdmUgYW5kIHJlamVjdCBmdW5jdGlvbnMgYXMgbWV0aG9kcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICAgIHRoaXMucmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgeyBEZWZlcnJlZCB9O1xuIiwgIi8qXG4gIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4uL19wcml2YXRlL2xvZ2dlci5qcyc7XG5pbXBvcnQgeyBxdW90YUVycm9yQ2FsbGJhY2tzIH0gZnJvbSAnLi4vbW9kZWxzL3F1b3RhRXJyb3JDYWxsYmFja3MuanMnO1xuaW1wb3J0ICcuLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIFJ1bnMgYWxsIG9mIHRoZSBjYWxsYmFjayBmdW5jdGlvbnMsIG9uZSBhdCBhIHRpbWUgc2VxdWVudGlhbGx5LCBpbiB0aGUgb3JkZXJcbiAqIGluIHdoaWNoIHRoZXkgd2VyZSByZWdpc3RlcmVkLlxuICpcbiAqIEBtZW1iZXJvZiB3b3JrYm94LWNvcmVcbiAqIEBwcml2YXRlXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVRdW90YUVycm9yQ2FsbGJhY2tzKCkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGxvZ2dlci5sb2coYEFib3V0IHRvIHJ1biAke3F1b3RhRXJyb3JDYWxsYmFja3Muc2l6ZX0gYCArXG4gICAgICAgICAgICBgY2FsbGJhY2tzIHRvIGNsZWFuIHVwIGNhY2hlcy5gKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiBxdW90YUVycm9yQ2FsbGJhY2tzKSB7XG4gICAgICAgIGF3YWl0IGNhbGxiYWNrKCk7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBsb2dnZXIubG9nKGNhbGxiYWNrLCAnaXMgY29tcGxldGUuJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgbG9nZ2VyLmxvZygnRmluaXNoZWQgcnVubmluZyBjYWxsYmFja3MuJyk7XG4gICAgfVxufVxuZXhwb3J0IHsgZXhlY3V0ZVF1b3RhRXJyb3JDYWxsYmFja3MgfTtcbiIsICIvKlxuICBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbmNvbnN0IGdldEZyaWVuZGx5VVJMID0gKHVybCkgPT4ge1xuICAgIGNvbnN0IHVybE9iaiA9IG5ldyBVUkwoU3RyaW5nKHVybCksIGxvY2F0aW9uLmhyZWYpO1xuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3dvcmtib3gvaXNzdWVzLzIzMjNcbiAgICAvLyBXZSB3YW50IHRvIGluY2x1ZGUgZXZlcnl0aGluZywgZXhjZXB0IGZvciB0aGUgb3JpZ2luIGlmIGl0J3Mgc2FtZS1vcmlnaW4uXG4gICAgcmV0dXJuIHVybE9iai5ocmVmLnJlcGxhY2UobmV3IFJlZ0V4cChgXiR7bG9jYXRpb24ub3JpZ2lufWApLCAnJyk7XG59O1xuZXhwb3J0IHsgZ2V0RnJpZW5kbHlVUkwgfTtcbiIsICIvKlxuICBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0ICcuLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgYW5kIHRoZSBwYXNzZWQgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcy5cbiAqIFRoaXMgdXRpbGl0eSBpcyBhbiBhc3luYy9hd2FpdC1mcmllbmRseSB2ZXJzaW9uIG9mIGBzZXRUaW1lb3V0YC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gbXNcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGltZW91dChtcykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xufVxuIiwgIi8qXG4gIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTENcbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbi8qKlxuICogQSB1dGlsaXR5IG1ldGhvZCB0aGF0IG1ha2VzIGl0IGVhc2llciB0byB1c2UgYGV2ZW50LndhaXRVbnRpbGAgd2l0aFxuICogYXN5bmMgZnVuY3Rpb25zIGFuZCByZXR1cm4gdGhlIHJlc3VsdC5cbiAqXG4gKiBAcGFyYW0ge0V4dGVuZGFibGVFdmVudH0gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGFzeW5jRm5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gd2FpdFVudGlsKGV2ZW50LCBhc3luY0ZuKSB7XG4gICAgY29uc3QgcmV0dXJuUHJvbWlzZSA9IGFzeW5jRm4oKTtcbiAgICBldmVudC53YWl0VW50aWwocmV0dXJuUHJvbWlzZSk7XG4gICAgcmV0dXJuIHJldHVyblByb21pc2U7XG59XG5leHBvcnQgeyB3YWl0VW50aWwgfTtcbiIsICIvKlxuICBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgeyBjYW5Db25zdHJ1Y3RSZXNwb25zZUZyb21Cb2R5U3RyZWFtIH0gZnJvbSAnLi9fcHJpdmF0ZS9jYW5Db25zdHJ1Y3RSZXNwb25zZUZyb21Cb2R5U3RyZWFtLmpzJztcbmltcG9ydCB7IFdvcmtib3hFcnJvciB9IGZyb20gJy4vX3ByaXZhdGUvV29ya2JveEVycm9yLmpzJztcbmltcG9ydCAnLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIEFsbG93cyBkZXZlbG9wZXJzIHRvIGNvcHkgYSByZXNwb25zZSBhbmQgbW9kaWZ5IGl0cyBgaGVhZGVyc2AsIGBzdGF0dXNgLFxuICogb3IgYHN0YXR1c1RleHRgIHZhbHVlcyAodGhlIHZhbHVlcyBzZXR0YWJsZSB2aWEgYVxuICogW2BSZXNwb25zZUluaXRgXXtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvUmVzcG9uc2UvUmVzcG9uc2UjU3ludGF4fVxuICogb2JqZWN0IGluIHRoZSBjb25zdHJ1Y3RvcikuXG4gKiBUbyBtb2RpZnkgdGhlc2UgdmFsdWVzLCBwYXNzIGEgZnVuY3Rpb24gYXMgdGhlIHNlY29uZCBhcmd1bWVudC4gVGhhdFxuICogZnVuY3Rpb24gd2lsbCBiZSBpbnZva2VkIHdpdGggYSBzaW5nbGUgb2JqZWN0IHdpdGggdGhlIHJlc3BvbnNlIHByb3BlcnRpZXNcbiAqIGB7aGVhZGVycywgc3RhdHVzLCBzdGF0dXNUZXh0fWAuIFRoZSByZXR1cm4gdmFsdWUgb2YgdGhpcyBmdW5jdGlvbiB3aWxsXG4gKiBiZSB1c2VkIGFzIHRoZSBgUmVzcG9uc2VJbml0YCBmb3IgdGhlIG5ldyBgUmVzcG9uc2VgLiBUbyBjaGFuZ2UgdGhlIHZhbHVlc1xuICogZWl0aGVyIG1vZGlmeSB0aGUgcGFzc2VkIHBhcmFtZXRlcihzKSBhbmQgcmV0dXJuIGl0LCBvciByZXR1cm4gYSB0b3RhbGx5XG4gKiBuZXcgb2JqZWN0LlxuICpcbiAqIFRoaXMgbWV0aG9kIGlzIGludGVudGlvbmFsbHkgbGltaXRlZCB0byBzYW1lLW9yaWdpbiByZXNwb25zZXMsIHJlZ2FyZGxlc3Mgb2ZcbiAqIHdoZXRoZXIgQ09SUyB3YXMgdXNlZCBvciBub3QuXG4gKlxuICogQHBhcmFtIHtSZXNwb25zZX0gcmVzcG9uc2VcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1vZGlmaWVyXG4gKiBAbWVtYmVyb2Ygd29ya2JveC1jb3JlXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGNvcHlSZXNwb25zZShyZXNwb25zZSwgbW9kaWZpZXIpIHtcbiAgICBsZXQgb3JpZ2luID0gbnVsbDtcbiAgICAvLyBJZiByZXNwb25zZS51cmwgaXNuJ3Qgc2V0LCBhc3N1bWUgaXQncyBjcm9zcy1vcmlnaW4gYW5kIGtlZXAgb3JpZ2luIG51bGwuXG4gICAgaWYgKHJlc3BvbnNlLnVybCkge1xuICAgICAgICBjb25zdCByZXNwb25zZVVSTCA9IG5ldyBVUkwocmVzcG9uc2UudXJsKTtcbiAgICAgICAgb3JpZ2luID0gcmVzcG9uc2VVUkwub3JpZ2luO1xuICAgIH1cbiAgICBpZiAob3JpZ2luICE9PSBzZWxmLmxvY2F0aW9uLm9yaWdpbikge1xuICAgICAgICB0aHJvdyBuZXcgV29ya2JveEVycm9yKCdjcm9zcy1vcmlnaW4tY29weS1yZXNwb25zZScsIHsgb3JpZ2luIH0pO1xuICAgIH1cbiAgICBjb25zdCBjbG9uZWRSZXNwb25zZSA9IHJlc3BvbnNlLmNsb25lKCk7XG4gICAgLy8gQ3JlYXRlIGEgZnJlc2ggYFJlc3BvbnNlSW5pdGAgb2JqZWN0IGJ5IGNsb25pbmcgdGhlIGhlYWRlcnMuXG4gICAgY29uc3QgcmVzcG9uc2VJbml0ID0ge1xuICAgICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyhjbG9uZWRSZXNwb25zZS5oZWFkZXJzKSxcbiAgICAgICAgc3RhdHVzOiBjbG9uZWRSZXNwb25zZS5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IGNsb25lZFJlc3BvbnNlLnN0YXR1c1RleHQsXG4gICAgfTtcbiAgICAvLyBBcHBseSBhbnkgdXNlciBtb2RpZmljYXRpb25zLlxuICAgIGNvbnN0IG1vZGlmaWVkUmVzcG9uc2VJbml0ID0gbW9kaWZpZXIgPyBtb2RpZmllcihyZXNwb25zZUluaXQpIDogcmVzcG9uc2VJbml0O1xuICAgIC8vIENyZWF0ZSB0aGUgbmV3IHJlc3BvbnNlIGZyb20gdGhlIGJvZHkgc3RyZWFtIGFuZCBgUmVzcG9uc2VJbml0YFxuICAgIC8vIG1vZGlmaWNhdGlvbnMuIE5vdGU6IG5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB0aGUgUmVzcG9uc2UuYm9keSBzdHJlYW0sXG4gICAgLy8gc28gZmFsbCBiYWNrIHRvIHJlYWRpbmcgdGhlIGVudGlyZSBib2R5IGludG8gbWVtb3J5IGFzIGEgYmxvYi5cbiAgICBjb25zdCBib2R5ID0gY2FuQ29uc3RydWN0UmVzcG9uc2VGcm9tQm9keVN0cmVhbSgpXG4gICAgICAgID8gY2xvbmVkUmVzcG9uc2UuYm9keVxuICAgICAgICA6IGF3YWl0IGNsb25lZFJlc3BvbnNlLmJsb2IoKTtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKGJvZHksIG1vZGlmaWVkUmVzcG9uc2VJbml0KTtcbn1cbmV4cG9ydCB7IGNvcHlSZXNwb25zZSB9O1xuIiwgIi8qXG4gIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCAnLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIENsYWltIGFueSBjdXJyZW50bHkgYXZhaWxhYmxlIGNsaWVudHMgb25jZSB0aGUgc2VydmljZSB3b3JrZXJcbiAqIGJlY29tZXMgYWN0aXZlLiBUaGlzIGlzIG5vcm1hbGx5IHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCBgc2tpcFdhaXRpbmcoKWAuXG4gKlxuICogQG1lbWJlcm9mIHdvcmtib3gtY29yZVxuICovXG5mdW5jdGlvbiBjbGllbnRzQ2xhaW0oKSB7XG4gICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdhY3RpdmF0ZScsICgpID0+IHNlbGYuY2xpZW50cy5jbGFpbSgpKTtcbn1cbmV4cG9ydCB7IGNsaWVudHNDbGFpbSB9O1xuIiwgIlwidXNlIHN0cmljdFwiO1xuLy8gQHRzLWlnbm9yZVxudHJ5IHtcbiAgICBzZWxmWyd3b3JrYm94OnByZWNhY2hpbmc6Ni41LjMnXSAmJiBfKCk7XG59XG5jYXRjaCAoZSkgeyB9XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgV29ya2JveEVycm9yIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL1dvcmtib3hFcnJvci5qcyc7XG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbi8vIE5hbWUgb2YgdGhlIHNlYXJjaCBwYXJhbWV0ZXIgdXNlZCB0byBzdG9yZSByZXZpc2lvbiBpbmZvLlxuY29uc3QgUkVWSVNJT05fU0VBUkNIX1BBUkFNID0gJ19fV0JfUkVWSVNJT05fXyc7XG4vKipcbiAqIENvbnZlcnRzIGEgbWFuaWZlc3QgZW50cnkgaW50byBhIHZlcnNpb25lZCBVUkwgc3VpdGFibGUgZm9yIHByZWNhY2hpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8c3RyaW5nfSBlbnRyeVxuICogQHJldHVybiB7c3RyaW5nfSBBIFVSTCB3aXRoIHZlcnNpb25pbmcgaW5mby5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG1lbWJlcm9mIHdvcmtib3gtcHJlY2FjaGluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ2FjaGVLZXkoZW50cnkpIHtcbiAgICBpZiAoIWVudHJ5KSB7XG4gICAgICAgIHRocm93IG5ldyBXb3JrYm94RXJyb3IoJ2FkZC10by1jYWNoZS1saXN0LXVuZXhwZWN0ZWQtdHlwZScsIHsgZW50cnkgfSk7XG4gICAgfVxuICAgIC8vIElmIGEgcHJlY2FjaGUgbWFuaWZlc3QgZW50cnkgaXMgYSBzdHJpbmcsIGl0J3MgYXNzdW1lZCB0byBiZSBhIHZlcnNpb25lZFxuICAgIC8vIFVSTCwgbGlrZSAnL2FwcC5hYmNkMTIzNC5qcycuIFJldHVybiBhcy1pcy5cbiAgICBpZiAodHlwZW9mIGVudHJ5ID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zdCB1cmxPYmplY3QgPSBuZXcgVVJMKGVudHJ5LCBsb2NhdGlvbi5ocmVmKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNhY2hlS2V5OiB1cmxPYmplY3QuaHJlZixcbiAgICAgICAgICAgIHVybDogdXJsT2JqZWN0LmhyZWYsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IHsgcmV2aXNpb24sIHVybCB9ID0gZW50cnk7XG4gICAgaWYgKCF1cmwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFdvcmtib3hFcnJvcignYWRkLXRvLWNhY2hlLWxpc3QtdW5leHBlY3RlZC10eXBlJywgeyBlbnRyeSB9KTtcbiAgICB9XG4gICAgLy8gSWYgdGhlcmUncyBqdXN0IGEgVVJMIGFuZCBubyByZXZpc2lvbiwgdGhlbiBpdCdzIGFsc28gYXNzdW1lZCB0byBiZSBhXG4gICAgLy8gdmVyc2lvbmVkIFVSTC5cbiAgICBpZiAoIXJldmlzaW9uKSB7XG4gICAgICAgIGNvbnN0IHVybE9iamVjdCA9IG5ldyBVUkwodXJsLCBsb2NhdGlvbi5ocmVmKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNhY2hlS2V5OiB1cmxPYmplY3QuaHJlZixcbiAgICAgICAgICAgIHVybDogdXJsT2JqZWN0LmhyZWYsXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8vIE90aGVyd2lzZSwgY29uc3RydWN0IGEgcHJvcGVybHkgdmVyc2lvbmVkIFVSTCB1c2luZyB0aGUgY3VzdG9tIFdvcmtib3hcbiAgICAvLyBzZWFyY2ggcGFyYW1ldGVyIGFsb25nIHdpdGggdGhlIHJldmlzaW9uIGluZm8uXG4gICAgY29uc3QgY2FjaGVLZXlVUkwgPSBuZXcgVVJMKHVybCwgbG9jYXRpb24uaHJlZik7XG4gICAgY29uc3Qgb3JpZ2luYWxVUkwgPSBuZXcgVVJMKHVybCwgbG9jYXRpb24uaHJlZik7XG4gICAgY2FjaGVLZXlVUkwuc2VhcmNoUGFyYW1zLnNldChSRVZJU0lPTl9TRUFSQ0hfUEFSQU0sIHJldmlzaW9uKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBjYWNoZUtleTogY2FjaGVLZXlVUkwuaHJlZixcbiAgICAgICAgdXJsOiBvcmlnaW5hbFVSTC5ocmVmLFxuICAgIH07XG59XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMjAgR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0ICcuLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIEEgcGx1Z2luLCBkZXNpZ25lZCB0byBiZSB1c2VkIHdpdGggUHJlY2FjaGVDb250cm9sbGVyLCB0byBkZXRlcm1pbmUgdGhlXG4gKiBvZiBhc3NldHMgdGhhdCB3ZXJlIHVwZGF0ZWQgKG9yIG5vdCB1cGRhdGVkKSBkdXJpbmcgdGhlIGluc3RhbGwgZXZlbnQuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuY2xhc3MgUHJlY2FjaGVJbnN0YWxsUmVwb3J0UGx1Z2luIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy51cGRhdGVkVVJMcyA9IFtdO1xuICAgICAgICB0aGlzLm5vdFVwZGF0ZWRVUkxzID0gW107XG4gICAgICAgIHRoaXMuaGFuZGxlcldpbGxTdGFydCA9IGFzeW5jICh7IHJlcXVlc3QsIHN0YXRlLCB9KSA9PiB7XG4gICAgICAgICAgICAvLyBUT0RPOiBgc3RhdGVgIHNob3VsZCBuZXZlciBiZSB1bmRlZmluZWQuLi5cbiAgICAgICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgICAgICAgIHN0YXRlLm9yaWdpbmFsUmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY2FjaGVkUmVzcG9uc2VXaWxsQmVVc2VkID0gYXN5bmMgKHsgZXZlbnQsIHN0YXRlLCBjYWNoZWRSZXNwb25zZSwgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICdpbnN0YWxsJykge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSAmJlxuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5vcmlnaW5hbFJlcXVlc3QgJiZcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUub3JpZ2luYWxSZXF1ZXN0IGluc3RhbmNlb2YgUmVxdWVzdCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBgc3RhdGVgIHNob3VsZCBuZXZlciBiZSB1bmRlZmluZWQuLi5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXJsID0gc3RhdGUub3JpZ2luYWxSZXF1ZXN0LnVybDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhY2hlZFJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdFVwZGF0ZWRVUkxzLnB1c2godXJsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlZFVSTHMucHVzaCh1cmwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFJlc3BvbnNlO1xuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydCB7IFByZWNhY2hlSW5zdGFsbFJlcG9ydFBsdWdpbiB9O1xuIiwgIi8qXG4gIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCAnLi4vX3ZlcnNpb24uanMnO1xuLyoqXG4gKiBBIHBsdWdpbiwgZGVzaWduZWQgdG8gYmUgdXNlZCB3aXRoIFByZWNhY2hlQ29udHJvbGxlciwgdG8gdHJhbnNsYXRlIFVSTHMgaW50b1xuICogdGhlIGNvcnJlc3BvbmRpbmcgY2FjaGUga2V5LCBiYXNlZCBvbiB0aGUgY3VycmVudCByZXZpc2lvbiBpbmZvLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmNsYXNzIFByZWNhY2hlQ2FjaGVLZXlQbHVnaW4ge1xuICAgIGNvbnN0cnVjdG9yKHsgcHJlY2FjaGVDb250cm9sbGVyIH0pIHtcbiAgICAgICAgdGhpcy5jYWNoZUtleVdpbGxCZVVzZWQgPSBhc3luYyAoeyByZXF1ZXN0LCBwYXJhbXMsIH0pID0+IHtcbiAgICAgICAgICAgIC8vIFBhcmFtcyBpcyB0eXBlIGFueSwgY2FuJ3QgY2hhbmdlIHJpZ2h0IG5vdy5cbiAgICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlICovXG4gICAgICAgICAgICBjb25zdCBjYWNoZUtleSA9IChwYXJhbXMgPT09IG51bGwgfHwgcGFyYW1zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYXJhbXMuY2FjaGVLZXkpIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJlY2FjaGVDb250cm9sbGVyLmdldENhY2hlS2V5Rm9yVVJMKHJlcXVlc3QudXJsKTtcbiAgICAgICAgICAgIC8qIGVzbGludC1lbmFibGUgKi9cbiAgICAgICAgICAgIHJldHVybiBjYWNoZUtleVxuICAgICAgICAgICAgICAgID8gbmV3IFJlcXVlc3QoY2FjaGVLZXksIHsgaGVhZGVyczogcmVxdWVzdC5oZWFkZXJzIH0pXG4gICAgICAgICAgICAgICAgOiByZXF1ZXN0O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9wcmVjYWNoZUNvbnRyb2xsZXIgPSBwcmVjYWNoZUNvbnRyb2xsZXI7XG4gICAgfVxufVxuZXhwb3J0IHsgUHJlY2FjaGVDYWNoZUtleVBsdWdpbiB9O1xuIiwgIlwidXNlIHN0cmljdFwiO1xuLy8gQHRzLWlnbm9yZVxudHJ5IHtcbiAgICBzZWxmWyd3b3JrYm94OnN0cmF0ZWdpZXM6Ni41LjMnXSAmJiBfKCk7XG59XG5jYXRjaCAoZSkgeyB9XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMjAgR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2Fzc2VydC5qcyc7XG5pbXBvcnQgeyBjYWNoZU1hdGNoSWdub3JlUGFyYW1zIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2NhY2hlTWF0Y2hJZ25vcmVQYXJhbXMuanMnO1xuaW1wb3J0IHsgRGVmZXJyZWQgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvRGVmZXJyZWQuanMnO1xuaW1wb3J0IHsgZXhlY3V0ZVF1b3RhRXJyb3JDYWxsYmFja3MgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvZXhlY3V0ZVF1b3RhRXJyb3JDYWxsYmFja3MuanMnO1xuaW1wb3J0IHsgZ2V0RnJpZW5kbHlVUkwgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvZ2V0RnJpZW5kbHlVUkwuanMnO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2xvZ2dlci5qcyc7XG5pbXBvcnQgeyB0aW1lb3V0IH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL3RpbWVvdXQuanMnO1xuaW1wb3J0IHsgV29ya2JveEVycm9yIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL1dvcmtib3hFcnJvci5qcyc7XG5pbXBvcnQgJy4vX3ZlcnNpb24uanMnO1xuZnVuY3Rpb24gdG9SZXF1ZXN0KGlucHV0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycgPyBuZXcgUmVxdWVzdChpbnB1dCkgOiBpbnB1dDtcbn1cbi8qKlxuICogQSBjbGFzcyBjcmVhdGVkIGV2ZXJ5IHRpbWUgYSBTdHJhdGVneSBpbnN0YW5jZSBpbnN0YW5jZSBjYWxsc1xuICoge0BsaW5rIHdvcmtib3gtc3RyYXRlZ2llcy5TdHJhdGVneX5oYW5kbGV9IG9yXG4gKiB7QGxpbmsgd29ya2JveC1zdHJhdGVnaWVzLlN0cmF0ZWd5fmhhbmRsZUFsbH0gdGhhdCB3cmFwcyBhbGwgZmV0Y2ggYW5kXG4gKiBjYWNoZSBhY3Rpb25zIGFyb3VuZCBwbHVnaW4gY2FsbGJhY2tzIGFuZCBrZWVwcyB0cmFjayBvZiB3aGVuIHRoZSBzdHJhdGVneVxuICogaXMgXCJkb25lXCIgKGkuZS4gYWxsIGFkZGVkIGBldmVudC53YWl0VW50aWwoKWAgcHJvbWlzZXMgaGF2ZSByZXNvbHZlZCkuXG4gKlxuICogQG1lbWJlcm9mIHdvcmtib3gtc3RyYXRlZ2llc1xuICovXG5jbGFzcyBTdHJhdGVneUhhbmRsZXIge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2UgYXNzb2NpYXRlZCB3aXRoIHRoZSBwYXNzZWQgc3RyYXRlZ3kgYW5kIGV2ZW50XG4gICAgICogdGhhdCdzIGhhbmRsaW5nIHRoZSByZXF1ZXN0LlxuICAgICAqXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGFsc28gaW5pdGlhbGl6ZXMgdGhlIHN0YXRlIHRoYXQgd2lsbCBiZSBwYXNzZWQgdG8gZWFjaCBvZlxuICAgICAqIHRoZSBwbHVnaW5zIGhhbmRsaW5nIHRoaXMgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7d29ya2JveC1zdHJhdGVnaWVzLlN0cmF0ZWd5fSBzdHJhdGVneVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0fHN0cmluZ30gb3B0aW9ucy5yZXF1ZXN0IEEgcmVxdWVzdCB0byBydW4gdGhpcyBzdHJhdGVneSBmb3IuXG4gICAgICogQHBhcmFtIHtFeHRlbmRhYmxlRXZlbnR9IG9wdGlvbnMuZXZlbnQgVGhlIGV2ZW50IGFzc29jaWF0ZWQgd2l0aCB0aGVcbiAgICAgKiAgICAgcmVxdWVzdC5cbiAgICAgKiBAcGFyYW0ge1VSTH0gW29wdGlvbnMudXJsXVxuICAgICAqIEBwYXJhbSB7Kn0gW29wdGlvbnMucGFyYW1zXSBUaGUgcmV0dXJuIHZhbHVlIGZyb20gdGhlXG4gICAgICogICAgIHtAbGluayB3b3JrYm94LXJvdXRpbmd+bWF0Y2hDYWxsYmFja30gKGlmIGFwcGxpY2FibGUpLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHN0cmF0ZWd5LCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX2NhY2hlS2V5cyA9IHt9O1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHJlcXVlc3QgdGhlIHN0cmF0ZWd5IGlzIHBlcmZvcm1pbmcgKHBhc3NlZCB0byB0aGUgc3RyYXRlZ3knc1xuICAgICAgICAgKiBgaGFuZGxlKClgIG9yIGBoYW5kbGVBbGwoKWAgbWV0aG9kKS5cbiAgICAgICAgICogQG5hbWUgcmVxdWVzdFxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICogQHR5cGUge1JlcXVlc3R9XG4gICAgICAgICAqIEBtZW1iZXJvZiB3b3JrYm94LXN0cmF0ZWdpZXMuU3RyYXRlZ3lIYW5kbGVyXG4gICAgICAgICAqL1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGV2ZW50IGFzc29jaWF0ZWQgd2l0aCB0aGlzIHJlcXVlc3QuXG4gICAgICAgICAqIEBuYW1lIGV2ZW50XG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKiBAdHlwZSB7RXh0ZW5kYWJsZUV2ZW50fVxuICAgICAgICAgKiBAbWVtYmVyb2Ygd29ya2JveC1zdHJhdGVnaWVzLlN0cmF0ZWd5SGFuZGxlclxuICAgICAgICAgKi9cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgYFVSTGAgaW5zdGFuY2Ugb2YgYHJlcXVlc3QudXJsYCAoaWYgcGFzc2VkIHRvIHRoZSBzdHJhdGVneSdzXG4gICAgICAgICAqIGBoYW5kbGUoKWAgb3IgYGhhbmRsZUFsbCgpYCBtZXRob2QpLlxuICAgICAgICAgKiBOb3RlOiB0aGUgYHVybGAgcGFyYW0gd2lsbCBiZSBwcmVzZW50IGlmIHRoZSBzdHJhdGVneSB3YXMgaW52b2tlZFxuICAgICAgICAgKiBmcm9tIGEgd29ya2JveCBgUm91dGVgIG9iamVjdC5cbiAgICAgICAgICogQG5hbWUgdXJsXG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKiBAdHlwZSB7VVJMfHVuZGVmaW5lZH1cbiAgICAgICAgICogQG1lbWJlcm9mIHdvcmtib3gtc3RyYXRlZ2llcy5TdHJhdGVneUhhbmRsZXJcbiAgICAgICAgICovXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGBwYXJhbWAgdmFsdWUgKGlmIHBhc3NlZCB0byB0aGUgc3RyYXRlZ3knc1xuICAgICAgICAgKiBgaGFuZGxlKClgIG9yIGBoYW5kbGVBbGwoKWAgbWV0aG9kKS5cbiAgICAgICAgICogTm90ZTogdGhlIGBwYXJhbWAgcGFyYW0gd2lsbCBiZSBwcmVzZW50IGlmIHRoZSBzdHJhdGVneSB3YXMgaW52b2tlZFxuICAgICAgICAgKiBmcm9tIGEgd29ya2JveCBgUm91dGVgIG9iamVjdCBhbmQgdGhlXG4gICAgICAgICAqIHtAbGluayB3b3JrYm94LXJvdXRpbmd+bWF0Y2hDYWxsYmFja30gcmV0dXJuZWRcbiAgICAgICAgICogYSB0cnV0aHkgdmFsdWUgKGl0IHdpbGwgYmUgdGhhdCB2YWx1ZSkuXG4gICAgICAgICAqIEBuYW1lIHBhcmFtc1xuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICogQHR5cGUgeyp8dW5kZWZpbmVkfVxuICAgICAgICAgKiBAbWVtYmVyb2Ygd29ya2JveC1zdHJhdGVnaWVzLlN0cmF0ZWd5SGFuZGxlclxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGFzc2VydC5pc0luc3RhbmNlKG9wdGlvbnMuZXZlbnQsIEV4dGVuZGFibGVFdmVudCwge1xuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LXN0cmF0ZWdpZXMnLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ1N0cmF0ZWd5SGFuZGxlcicsXG4gICAgICAgICAgICAgICAgZnVuY05hbWU6ICdjb25zdHJ1Y3RvcicsXG4gICAgICAgICAgICAgICAgcGFyYW1OYW1lOiAnb3B0aW9ucy5ldmVudCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLmV2ZW50ID0gb3B0aW9ucy5ldmVudDtcbiAgICAgICAgdGhpcy5fc3RyYXRlZ3kgPSBzdHJhdGVneTtcbiAgICAgICAgdGhpcy5faGFuZGxlckRlZmVycmVkID0gbmV3IERlZmVycmVkKCk7XG4gICAgICAgIHRoaXMuX2V4dGVuZExpZmV0aW1lUHJvbWlzZXMgPSBbXTtcbiAgICAgICAgLy8gQ29weSB0aGUgcGx1Z2lucyBsaXN0IChzaW5jZSBpdCdzIG11dGFibGUgb24gdGhlIHN0cmF0ZWd5KSxcbiAgICAgICAgLy8gc28gYW55IG11dGF0aW9ucyBkb24ndCBhZmZlY3QgdGhpcyBoYW5kbGVyIGluc3RhbmNlLlxuICAgICAgICB0aGlzLl9wbHVnaW5zID0gWy4uLnN0cmF0ZWd5LnBsdWdpbnNdO1xuICAgICAgICB0aGlzLl9wbHVnaW5TdGF0ZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgZm9yIChjb25zdCBwbHVnaW4gb2YgdGhpcy5fcGx1Z2lucykge1xuICAgICAgICAgICAgdGhpcy5fcGx1Z2luU3RhdGVNYXAuc2V0KHBsdWdpbiwge30pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXZlbnQud2FpdFVudGlsKHRoaXMuX2hhbmRsZXJEZWZlcnJlZC5wcm9taXNlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmV0Y2hlcyBhIGdpdmVuIHJlcXVlc3QgKGFuZCBpbnZva2VzIGFueSBhcHBsaWNhYmxlIHBsdWdpbiBjYWxsYmFja1xuICAgICAqIG1ldGhvZHMpIHVzaW5nIHRoZSBgZmV0Y2hPcHRpb25zYCAoZm9yIG5vbi1uYXZpZ2F0aW9uIHJlcXVlc3RzKSBhbmRcbiAgICAgKiBgcGx1Z2luc2AgZGVmaW5lZCBvbiB0aGUgYFN0cmF0ZWd5YCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBUaGUgZm9sbG93aW5nIHBsdWdpbiBsaWZlY3ljbGUgbWV0aG9kcyBhcmUgaW52b2tlZCB3aGVuIHVzaW5nIHRoaXMgbWV0aG9kOlxuICAgICAqIC0gYHJlcXVlc3RXaWxsRmV0Y2goKWBcbiAgICAgKiAtIGBmZXRjaERpZFN1Y2NlZWQoKWBcbiAgICAgKiAtIGBmZXRjaERpZEZhaWwoKWBcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVxdWVzdHxzdHJpbmd9IGlucHV0IFRoZSBVUkwgb3IgcmVxdWVzdCB0byBmZXRjaC5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPFJlc3BvbnNlPn1cbiAgICAgKi9cbiAgICBhc3luYyBmZXRjaChpbnB1dCkge1xuICAgICAgICBjb25zdCB7IGV2ZW50IH0gPSB0aGlzO1xuICAgICAgICBsZXQgcmVxdWVzdCA9IHRvUmVxdWVzdChpbnB1dCk7XG4gICAgICAgIGlmIChyZXF1ZXN0Lm1vZGUgPT09ICduYXZpZ2F0ZScgJiZcbiAgICAgICAgICAgIGV2ZW50IGluc3RhbmNlb2YgRmV0Y2hFdmVudCAmJlxuICAgICAgICAgICAgZXZlbnQucHJlbG9hZFJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zdCBwb3NzaWJsZVByZWxvYWRSZXNwb25zZSA9IChhd2FpdCBldmVudC5wcmVsb2FkUmVzcG9uc2UpO1xuICAgICAgICAgICAgaWYgKHBvc3NpYmxlUHJlbG9hZFJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgVXNpbmcgYSBwcmVsb2FkZWQgbmF2aWdhdGlvbiByZXNwb25zZSBmb3IgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgJyR7Z2V0RnJpZW5kbHlVUkwocmVxdWVzdC51cmwpfSdgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc3NpYmxlUHJlbG9hZFJlc3BvbnNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoZXJlIGlzIGEgZmV0Y2hEaWRGYWlsIHBsdWdpbiwgd2UgbmVlZCB0byBzYXZlIGEgY2xvbmUgb2YgdGhlXG4gICAgICAgIC8vIG9yaWdpbmFsIHJlcXVlc3QgYmVmb3JlIGl0J3MgZWl0aGVyIG1vZGlmaWVkIGJ5IGEgcmVxdWVzdFdpbGxGZXRjaFxuICAgICAgICAvLyBwbHVnaW4gb3IgYmVmb3JlIHRoZSBvcmlnaW5hbCByZXF1ZXN0J3MgYm9keSBpcyBjb25zdW1lZCB2aWEgZmV0Y2goKS5cbiAgICAgICAgY29uc3Qgb3JpZ2luYWxSZXF1ZXN0ID0gdGhpcy5oYXNDYWxsYmFjaygnZmV0Y2hEaWRGYWlsJylcbiAgICAgICAgICAgID8gcmVxdWVzdC5jbG9uZSgpXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNiIG9mIHRoaXMuaXRlcmF0ZUNhbGxiYWNrcygncmVxdWVzdFdpbGxGZXRjaCcpKSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdCA9IGF3YWl0IGNiKHsgcmVxdWVzdDogcmVxdWVzdC5jbG9uZSgpLCBldmVudCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgV29ya2JveEVycm9yKCdwbHVnaW4tZXJyb3ItcmVxdWVzdC13aWxsLWZldGNoJywge1xuICAgICAgICAgICAgICAgICAgICB0aHJvd25FcnJvck1lc3NhZ2U6IGVyci5tZXNzYWdlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFRoZSByZXF1ZXN0IGNhbiBiZSBhbHRlcmVkIGJ5IHBsdWdpbnMgd2l0aCBgcmVxdWVzdFdpbGxGZXRjaGAgbWFraW5nXG4gICAgICAgIC8vIHRoZSBvcmlnaW5hbCByZXF1ZXN0IChtb3N0IGxpa2VseSBmcm9tIGEgYGZldGNoYCBldmVudCkgZGlmZmVyZW50XG4gICAgICAgIC8vIGZyb20gdGhlIFJlcXVlc3Qgd2UgbWFrZS4gUGFzcyBib3RoIHRvIGBmZXRjaERpZEZhaWxgIHRvIGFpZCBkZWJ1Z2dpbmcuXG4gICAgICAgIGNvbnN0IHBsdWdpbkZpbHRlcmVkUmVxdWVzdCA9IHJlcXVlc3QuY2xvbmUoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBmZXRjaFJlc3BvbnNlO1xuICAgICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvd29ya2JveC9pc3N1ZXMvMTc5NlxuICAgICAgICAgICAgZmV0Y2hSZXNwb25zZSA9IGF3YWl0IGZldGNoKHJlcXVlc3QsIHJlcXVlc3QubW9kZSA9PT0gJ25hdmlnYXRlJyA/IHVuZGVmaW5lZCA6IHRoaXMuX3N0cmF0ZWd5LmZldGNoT3B0aW9ucyk7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgTmV0d29yayByZXF1ZXN0IGZvciBgICtcbiAgICAgICAgICAgICAgICAgICAgYCcke2dldEZyaWVuZGx5VVJMKHJlcXVlc3QudXJsKX0nIHJldHVybmVkIGEgcmVzcG9uc2Ugd2l0aCBgICtcbiAgICAgICAgICAgICAgICAgICAgYHN0YXR1cyAnJHtmZXRjaFJlc3BvbnNlLnN0YXR1c30nLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiB0aGlzLml0ZXJhdGVDYWxsYmFja3MoJ2ZldGNoRGlkU3VjY2VlZCcpKSB7XG4gICAgICAgICAgICAgICAgZmV0Y2hSZXNwb25zZSA9IGF3YWl0IGNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3Q6IHBsdWdpbkZpbHRlcmVkUmVxdWVzdCxcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IGZldGNoUmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmV0Y2hSZXNwb25zZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgTmV0d29yayByZXF1ZXN0IGZvciBgICtcbiAgICAgICAgICAgICAgICAgICAgYCcke2dldEZyaWVuZGx5VVJMKHJlcXVlc3QudXJsKX0nIHRocmV3IGFuIGVycm9yLmAsIGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGBvcmlnaW5hbFJlcXVlc3RgIHdpbGwgb25seSBleGlzdCBpZiBhIGBmZXRjaERpZEZhaWxgIGNhbGxiYWNrXG4gICAgICAgICAgICAvLyBpcyBiZWluZyB1c2VkIChzZWUgYWJvdmUpLlxuICAgICAgICAgICAgaWYgKG9yaWdpbmFsUmVxdWVzdCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucnVuQ2FsbGJhY2tzKCdmZXRjaERpZEZhaWwnLCB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvcixcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsUmVxdWVzdDogb3JpZ2luYWxSZXF1ZXN0LmNsb25lKCksXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3Q6IHBsdWdpbkZpbHRlcmVkUmVxdWVzdC5jbG9uZSgpLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbHMgYHRoaXMuZmV0Y2goKWAgYW5kIChpbiB0aGUgYmFja2dyb3VuZCkgcnVucyBgdGhpcy5jYWNoZVB1dCgpYCBvblxuICAgICAqIHRoZSByZXNwb25zZSBnZW5lcmF0ZWQgYnkgYHRoaXMuZmV0Y2goKWAuXG4gICAgICpcbiAgICAgKiBUaGUgY2FsbCB0byBgdGhpcy5jYWNoZVB1dCgpYCBhdXRvbWF0aWNhbGx5IGludm9rZXMgYHRoaXMud2FpdFVudGlsKClgLFxuICAgICAqIHNvIHlvdSBkbyBub3QgaGF2ZSB0byBtYW51YWxseSBjYWxsIGB3YWl0VW50aWwoKWAgb24gdGhlIGV2ZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0fHN0cmluZ30gaW5wdXQgVGhlIHJlcXVlc3Qgb3IgVVJMIHRvIGZldGNoIGFuZCBjYWNoZS5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPFJlc3BvbnNlPn1cbiAgICAgKi9cbiAgICBhc3luYyBmZXRjaEFuZENhY2hlUHV0KGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5mZXRjaChpbnB1dCk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlQ2xvbmUgPSByZXNwb25zZS5jbG9uZSgpO1xuICAgICAgICB2b2lkIHRoaXMud2FpdFVudGlsKHRoaXMuY2FjaGVQdXQoaW5wdXQsIHJlc3BvbnNlQ2xvbmUpKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYXRjaGVzIGEgcmVxdWVzdCBmcm9tIHRoZSBjYWNoZSAoYW5kIGludm9rZXMgYW55IGFwcGxpY2FibGUgcGx1Z2luXG4gICAgICogY2FsbGJhY2sgbWV0aG9kcykgdXNpbmcgdGhlIGBjYWNoZU5hbWVgLCBgbWF0Y2hPcHRpb25zYCwgYW5kIGBwbHVnaW5zYFxuICAgICAqIGRlZmluZWQgb24gdGhlIHN0cmF0ZWd5IG9iamVjdC5cbiAgICAgKlxuICAgICAqIFRoZSBmb2xsb3dpbmcgcGx1Z2luIGxpZmVjeWNsZSBtZXRob2RzIGFyZSBpbnZva2VkIHdoZW4gdXNpbmcgdGhpcyBtZXRob2Q6XG4gICAgICogLSBjYWNoZUtleVdpbGxCeVVzZWQoKVxuICAgICAqIC0gY2FjaGVkUmVzcG9uc2VXaWxsQnlVc2VkKClcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVxdWVzdHxzdHJpbmd9IGtleSBUaGUgUmVxdWVzdCBvciBVUkwgdG8gdXNlIGFzIHRoZSBjYWNoZSBrZXkuXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxSZXNwb25zZXx1bmRlZmluZWQ+fSBBIG1hdGNoaW5nIHJlc3BvbnNlLCBpZiBmb3VuZC5cbiAgICAgKi9cbiAgICBhc3luYyBjYWNoZU1hdGNoKGtleSkge1xuICAgICAgICBjb25zdCByZXF1ZXN0ID0gdG9SZXF1ZXN0KGtleSk7XG4gICAgICAgIGxldCBjYWNoZWRSZXNwb25zZTtcbiAgICAgICAgY29uc3QgeyBjYWNoZU5hbWUsIG1hdGNoT3B0aW9ucyB9ID0gdGhpcy5fc3RyYXRlZ3k7XG4gICAgICAgIGNvbnN0IGVmZmVjdGl2ZVJlcXVlc3QgPSBhd2FpdCB0aGlzLmdldENhY2hlS2V5KHJlcXVlc3QsICdyZWFkJyk7XG4gICAgICAgIGNvbnN0IG11bHRpTWF0Y2hPcHRpb25zID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtYXRjaE9wdGlvbnMpLCB7IGNhY2hlTmFtZSB9KTtcbiAgICAgICAgY2FjaGVkUmVzcG9uc2UgPSBhd2FpdCBjYWNoZXMubWF0Y2goZWZmZWN0aXZlUmVxdWVzdCwgbXVsdGlNYXRjaE9wdGlvbnMpO1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgaWYgKGNhY2hlZFJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGBGb3VuZCBhIGNhY2hlZCByZXNwb25zZSBpbiAnJHtjYWNoZU5hbWV9Jy5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgTm8gY2FjaGVkIHJlc3BvbnNlIGZvdW5kIGluICcke2NhY2hlTmFtZX0nLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgdGhpcy5pdGVyYXRlQ2FsbGJhY2tzKCdjYWNoZWRSZXNwb25zZVdpbGxCZVVzZWQnKSkge1xuICAgICAgICAgICAgY2FjaGVkUmVzcG9uc2UgPVxuICAgICAgICAgICAgICAgIChhd2FpdCBjYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgICAgIGNhY2hlTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hPcHRpb25zLFxuICAgICAgICAgICAgICAgICAgICBjYWNoZWRSZXNwb25zZSxcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdDogZWZmZWN0aXZlUmVxdWVzdCxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IHRoaXMuZXZlbnQsXG4gICAgICAgICAgICAgICAgfSkpIHx8IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FjaGVkUmVzcG9uc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFB1dHMgYSByZXF1ZXN0L3Jlc3BvbnNlIHBhaXIgaW4gdGhlIGNhY2hlIChhbmQgaW52b2tlcyBhbnkgYXBwbGljYWJsZVxuICAgICAqIHBsdWdpbiBjYWxsYmFjayBtZXRob2RzKSB1c2luZyB0aGUgYGNhY2hlTmFtZWAgYW5kIGBwbHVnaW5zYCBkZWZpbmVkIG9uXG4gICAgICogdGhlIHN0cmF0ZWd5IG9iamVjdC5cbiAgICAgKlxuICAgICAqIFRoZSBmb2xsb3dpbmcgcGx1Z2luIGxpZmVjeWNsZSBtZXRob2RzIGFyZSBpbnZva2VkIHdoZW4gdXNpbmcgdGhpcyBtZXRob2Q6XG4gICAgICogLSBjYWNoZUtleVdpbGxCeVVzZWQoKVxuICAgICAqIC0gY2FjaGVXaWxsVXBkYXRlKClcbiAgICAgKiAtIGNhY2hlRGlkVXBkYXRlKClcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVxdWVzdHxzdHJpbmd9IGtleSBUaGUgcmVxdWVzdCBvciBVUkwgdG8gdXNlIGFzIHRoZSBjYWNoZSBrZXkuXG4gICAgICogQHBhcmFtIHtSZXNwb25zZX0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlIHRvIGNhY2hlLlxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8Ym9vbGVhbj59IGBmYWxzZWAgaWYgYSBjYWNoZVdpbGxVcGRhdGUgY2F1c2VkIHRoZSByZXNwb25zZVxuICAgICAqIG5vdCBiZSBjYWNoZWQsIGFuZCBgdHJ1ZWAgb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIGFzeW5jIGNhY2hlUHV0KGtleSwgcmVzcG9uc2UpIHtcbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IHRvUmVxdWVzdChrZXkpO1xuICAgICAgICAvLyBSdW4gaW4gdGhlIG5leHQgdGFzayB0byBhdm9pZCBibG9ja2luZyBvdGhlciBjYWNoZSByZWFkcy5cbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3czYy9TZXJ2aWNlV29ya2VyL2lzc3Vlcy8xMzk3XG4gICAgICAgIGF3YWl0IHRpbWVvdXQoMCk7XG4gICAgICAgIGNvbnN0IGVmZmVjdGl2ZVJlcXVlc3QgPSBhd2FpdCB0aGlzLmdldENhY2hlS2V5KHJlcXVlc3QsICd3cml0ZScpO1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgaWYgKGVmZmVjdGl2ZVJlcXVlc3QubWV0aG9kICYmIGVmZmVjdGl2ZVJlcXVlc3QubWV0aG9kICE9PSAnR0VUJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBXb3JrYm94RXJyb3IoJ2F0dGVtcHQtdG8tY2FjaGUtbm9uLWdldC1yZXF1ZXN0Jywge1xuICAgICAgICAgICAgICAgICAgICB1cmw6IGdldEZyaWVuZGx5VVJMKGVmZmVjdGl2ZVJlcXVlc3QudXJsKSxcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBlZmZlY3RpdmVSZXF1ZXN0Lm1ldGhvZCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3dvcmtib3gvaXNzdWVzLzI4MThcbiAgICAgICAgICAgIGNvbnN0IHZhcnkgPSByZXNwb25zZS5oZWFkZXJzLmdldCgnVmFyeScpO1xuICAgICAgICAgICAgaWYgKHZhcnkpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoYFRoZSByZXNwb25zZSBmb3IgJHtnZXRGcmllbmRseVVSTChlZmZlY3RpdmVSZXF1ZXN0LnVybCl9IGAgK1xuICAgICAgICAgICAgICAgICAgICBgaGFzIGEgJ1Zhcnk6ICR7dmFyeX0nIGhlYWRlci4gYCArXG4gICAgICAgICAgICAgICAgICAgIGBDb25zaWRlciBzZXR0aW5nIHRoZSB7aWdub3JlVmFyeTogdHJ1ZX0gb3B0aW9uIG9uIHlvdXIgc3RyYXRlZ3kgYCArXG4gICAgICAgICAgICAgICAgICAgIGB0byBlbnN1cmUgY2FjaGUgbWF0Y2hpbmcgYW5kIGRlbGV0aW9uIHdvcmtzIGFzIGV4cGVjdGVkLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBDYW5ub3QgY2FjaGUgbm9uLWV4aXN0ZW50IHJlc3BvbnNlIGZvciBgICtcbiAgICAgICAgICAgICAgICAgICAgYCcke2dldEZyaWVuZGx5VVJMKGVmZmVjdGl2ZVJlcXVlc3QudXJsKX0nLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IFdvcmtib3hFcnJvcignY2FjaGUtcHV0LXdpdGgtbm8tcmVzcG9uc2UnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiBnZXRGcmllbmRseVVSTChlZmZlY3RpdmVSZXF1ZXN0LnVybCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXNwb25zZVRvQ2FjaGUgPSBhd2FpdCB0aGlzLl9lbnN1cmVSZXNwb25zZVNhZmVUb0NhY2hlKHJlc3BvbnNlKTtcbiAgICAgICAgaWYgKCFyZXNwb25zZVRvQ2FjaGUpIHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGBSZXNwb25zZSAnJHtnZXRGcmllbmRseVVSTChlZmZlY3RpdmVSZXF1ZXN0LnVybCl9JyBgICtcbiAgICAgICAgICAgICAgICAgICAgYHdpbGwgbm90IGJlIGNhY2hlZC5gLCByZXNwb25zZVRvQ2FjaGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgY2FjaGVOYW1lLCBtYXRjaE9wdGlvbnMgfSA9IHRoaXMuX3N0cmF0ZWd5O1xuICAgICAgICBjb25zdCBjYWNoZSA9IGF3YWl0IHNlbGYuY2FjaGVzLm9wZW4oY2FjaGVOYW1lKTtcbiAgICAgICAgY29uc3QgaGFzQ2FjaGVVcGRhdGVDYWxsYmFjayA9IHRoaXMuaGFzQ2FsbGJhY2soJ2NhY2hlRGlkVXBkYXRlJyk7XG4gICAgICAgIGNvbnN0IG9sZFJlc3BvbnNlID0gaGFzQ2FjaGVVcGRhdGVDYWxsYmFja1xuICAgICAgICAgICAgPyBhd2FpdCBjYWNoZU1hdGNoSWdub3JlUGFyYW1zKFxuICAgICAgICAgICAgLy8gVE9ETyhwaGlsaXB3YWx0b24pOiB0aGUgYF9fV0JfUkVWSVNJT05fX2AgcGFyYW0gaXMgYSBwcmVjYWNoaW5nXG4gICAgICAgICAgICAvLyBmZWF0dXJlLiBDb25zaWRlciBpbnRvIHdheXMgdG8gb25seSBhZGQgdGhpcyBiZWhhdmlvciBpZiB1c2luZ1xuICAgICAgICAgICAgLy8gcHJlY2FjaGluZy5cbiAgICAgICAgICAgIGNhY2hlLCBlZmZlY3RpdmVSZXF1ZXN0LmNsb25lKCksIFsnX19XQl9SRVZJU0lPTl9fJ10sIG1hdGNoT3B0aW9ucylcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgVXBkYXRpbmcgdGhlICcke2NhY2hlTmFtZX0nIGNhY2hlIHdpdGggYSBuZXcgUmVzcG9uc2UgYCArXG4gICAgICAgICAgICAgICAgYGZvciAke2dldEZyaWVuZGx5VVJMKGVmZmVjdGl2ZVJlcXVlc3QudXJsKX0uYCk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IGNhY2hlLnB1dChlZmZlY3RpdmVSZXF1ZXN0LCBoYXNDYWNoZVVwZGF0ZUNhbGxiYWNrID8gcmVzcG9uc2VUb0NhY2hlLmNsb25lKCkgOiByZXNwb25zZVRvQ2FjaGUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAvLyBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0RPTUV4Y2VwdGlvbiNleGNlcHRpb24tUXVvdGFFeGNlZWRlZEVycm9yXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yLm5hbWUgPT09ICdRdW90YUV4Y2VlZGVkRXJyb3InKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGV4ZWN1dGVRdW90YUVycm9yQ2FsbGJhY2tzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgdGhpcy5pdGVyYXRlQ2FsbGJhY2tzKCdjYWNoZURpZFVwZGF0ZScpKSB7XG4gICAgICAgICAgICBhd2FpdCBjYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgY2FjaGVOYW1lLFxuICAgICAgICAgICAgICAgIG9sZFJlc3BvbnNlLFxuICAgICAgICAgICAgICAgIG5ld1Jlc3BvbnNlOiByZXNwb25zZVRvQ2FjaGUuY2xvbmUoKSxcbiAgICAgICAgICAgICAgICByZXF1ZXN0OiBlZmZlY3RpdmVSZXF1ZXN0LFxuICAgICAgICAgICAgICAgIGV2ZW50OiB0aGlzLmV2ZW50LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrcyB0aGUgbGlzdCBvZiBwbHVnaW5zIGZvciB0aGUgYGNhY2hlS2V5V2lsbEJlVXNlZGAgY2FsbGJhY2ssIGFuZFxuICAgICAqIGV4ZWN1dGVzIGFueSBvZiB0aG9zZSBjYWxsYmFja3MgZm91bmQgaW4gc2VxdWVuY2UuIFRoZSBmaW5hbCBgUmVxdWVzdGBcbiAgICAgKiBvYmplY3QgcmV0dXJuZWQgYnkgdGhlIGxhc3QgcGx1Z2luIGlzIHRyZWF0ZWQgYXMgdGhlIGNhY2hlIGtleSBmb3IgY2FjaGVcbiAgICAgKiByZWFkcyBhbmQvb3Igd3JpdGVzLiBJZiBubyBgY2FjaGVLZXlXaWxsQmVVc2VkYCBwbHVnaW4gY2FsbGJhY2tzIGhhdmVcbiAgICAgKiBiZWVuIHJlZ2lzdGVyZWQsIHRoZSBwYXNzZWQgcmVxdWVzdCBpcyByZXR1cm5lZCB1bm1vZGlmaWVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlcXVlc3R9IHJlcXVlc3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbW9kZVxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8UmVxdWVzdD59XG4gICAgICovXG4gICAgYXN5bmMgZ2V0Q2FjaGVLZXkocmVxdWVzdCwgbW9kZSkge1xuICAgICAgICBjb25zdCBrZXkgPSBgJHtyZXF1ZXN0LnVybH0gfCAke21vZGV9YDtcbiAgICAgICAgaWYgKCF0aGlzLl9jYWNoZUtleXNba2V5XSkge1xuICAgICAgICAgICAgbGV0IGVmZmVjdGl2ZVJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICAgICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiB0aGlzLml0ZXJhdGVDYWxsYmFja3MoJ2NhY2hlS2V5V2lsbEJlVXNlZCcpKSB7XG4gICAgICAgICAgICAgICAgZWZmZWN0aXZlUmVxdWVzdCA9IHRvUmVxdWVzdChhd2FpdCBjYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgICAgIG1vZGUsXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3Q6IGVmZmVjdGl2ZVJlcXVlc3QsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiB0aGlzLmV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAvLyBwYXJhbXMgaGFzIGEgdHlwZSBhbnkgY2FuJ3QgY2hhbmdlIHJpZ2h0IG5vdy5cbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB0aGlzLnBhcmFtcywgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2NhY2hlS2V5c1trZXldID0gZWZmZWN0aXZlUmVxdWVzdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fY2FjaGVLZXlzW2tleV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgc3RyYXRlZ3kgaGFzIGF0IGxlYXN0IG9uZSBwbHVnaW4gd2l0aCB0aGUgZ2l2ZW5cbiAgICAgKiBjYWxsYmFjay5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBjYWxsYmFjayB0byBjaGVjayBmb3IuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBoYXNDYWxsYmFjayhuYW1lKSB7XG4gICAgICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIHRoaXMuX3N0cmF0ZWd5LnBsdWdpbnMpIHtcbiAgICAgICAgICAgIGlmIChuYW1lIGluIHBsdWdpbikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUnVucyBhbGwgcGx1Z2luIGNhbGxiYWNrcyBtYXRjaGluZyB0aGUgZ2l2ZW4gbmFtZSwgaW4gb3JkZXIsIHBhc3NpbmcgdGhlXG4gICAgICogZ2l2ZW4gcGFyYW0gb2JqZWN0IChtZXJnZWQgaXRoIHRoZSBjdXJyZW50IHBsdWdpbiBzdGF0ZSkgYXMgdGhlIG9ubHlcbiAgICAgKiBhcmd1bWVudC5cbiAgICAgKlxuICAgICAqIE5vdGU6IHNpbmNlIHRoaXMgbWV0aG9kIHJ1bnMgYWxsIHBsdWdpbnMsIGl0J3Mgbm90IHN1aXRhYmxlIGZvciBjYXNlc1xuICAgICAqIHdoZXJlIHRoZSByZXR1cm4gdmFsdWUgb2YgYSBjYWxsYmFjayBuZWVkcyB0byBiZSBhcHBsaWVkIHByaW9yIHRvIGNhbGxpbmdcbiAgICAgKiB0aGUgbmV4dCBjYWxsYmFjay4gU2VlXG4gICAgICoge0BsaW5rIHdvcmtib3gtc3RyYXRlZ2llcy5TdHJhdGVneUhhbmRsZXIjaXRlcmF0ZUNhbGxiYWNrc31cbiAgICAgKiBiZWxvdyBmb3IgaG93IHRvIGhhbmRsZSB0aGF0IGNhc2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgY2FsbGJhY2sgdG8gcnVuIHdpdGhpbiBlYWNoIHBsdWdpbi5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW0gVGhlIG9iamVjdCB0byBwYXNzIGFzIHRoZSBmaXJzdCAoYW5kIG9ubHkpIHBhcmFtXG4gICAgICogICAgIHdoZW4gZXhlY3V0aW5nIGVhY2ggY2FsbGJhY2suIFRoaXMgb2JqZWN0IHdpbGwgYmUgbWVyZ2VkIHdpdGggdGhlXG4gICAgICogICAgIGN1cnJlbnQgcGx1Z2luIHN0YXRlIHByaW9yIHRvIGNhbGxiYWNrIGV4ZWN1dGlvbi5cbiAgICAgKi9cbiAgICBhc3luYyBydW5DYWxsYmFja3MobmFtZSwgcGFyYW0pIHtcbiAgICAgICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiB0aGlzLml0ZXJhdGVDYWxsYmFja3MobmFtZSkpIHtcbiAgICAgICAgICAgIC8vIFRPRE8ocGhpbGlwd2FsdG9uKTogbm90IHN1cmUgd2h5IGBhbnlgIGlzIG5lZWRlZC4gSXQgc2VlbXMgbGlrZVxuICAgICAgICAgICAgLy8gdGhpcyBzaG91bGQgd29yayB3aXRoIGBhcyBXb3JrYm94UGx1Z2luQ2FsbGJhY2tQYXJhbVtDXWAuXG4gICAgICAgICAgICBhd2FpdCBjYWxsYmFjayhwYXJhbSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQWNjZXB0cyBhIGNhbGxiYWNrIGFuZCByZXR1cm5zIGFuIGl0ZXJhYmxlIG9mIG1hdGNoaW5nIHBsdWdpbiBjYWxsYmFja3MsXG4gICAgICogd2hlcmUgZWFjaCBjYWxsYmFjayBpcyB3cmFwcGVkIHdpdGggdGhlIGN1cnJlbnQgaGFuZGxlciBzdGF0ZSAoaS5lLiB3aGVuXG4gICAgICogeW91IGNhbGwgZWFjaCBjYWxsYmFjaywgd2hhdGV2ZXIgb2JqZWN0IHBhcmFtZXRlciB5b3UgcGFzcyBpdCB3aWxsXG4gICAgICogYmUgbWVyZ2VkIHdpdGggdGhlIHBsdWdpbidzIGN1cnJlbnQgc3RhdGUpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgZm8gdGhlIGNhbGxiYWNrIHRvIHJ1blxuICAgICAqIEByZXR1cm4ge0FycmF5PEZ1bmN0aW9uPn1cbiAgICAgKi9cbiAgICAqaXRlcmF0ZUNhbGxiYWNrcyhuYW1lKSB7XG4gICAgICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIHRoaXMuX3N0cmF0ZWd5LnBsdWdpbnMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGx1Z2luW25hbWVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLl9wbHVnaW5TdGF0ZU1hcC5nZXQocGx1Z2luKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0ZWZ1bENhbGxiYWNrID0gKHBhcmFtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXRlZnVsUGFyYW0gPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHBhcmFtKSwgeyBzdGF0ZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyhwaGlsaXB3YWx0b24pOiBub3Qgc3VyZSB3aHkgYGFueWAgaXMgbmVlZGVkLiBJdCBzZWVtcyBsaWtlXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgc2hvdWxkIHdvcmsgd2l0aCBgYXMgV29ya2JveFBsdWdpbkNhbGxiYWNrUGFyYW1bQ11gLlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGx1Z2luW25hbWVdKHN0YXRlZnVsUGFyYW0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgeWllbGQgc3RhdGVmdWxDYWxsYmFjaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgcHJvbWlzZSB0byB0aGVcbiAgICAgKiBbZXh0ZW5kIGxpZmV0aW1lIHByb21pc2VzXXtAbGluayBodHRwczovL3czYy5naXRodWIuaW8vU2VydmljZVdvcmtlci8jZXh0ZW5kYWJsZWV2ZW50LWV4dGVuZC1saWZldGltZS1wcm9taXNlc31cbiAgICAgKiBvZiB0aGUgZXZlbnQgZXZlbnQgYXNzb2NpYXRlZCB3aXRoIHRoZSByZXF1ZXN0IGJlaW5nIGhhbmRsZWQgKHVzdWFsbHkgYVxuICAgICAqIGBGZXRjaEV2ZW50YCkuXG4gICAgICpcbiAgICAgKiBOb3RlOiB5b3UgY2FuIGF3YWl0XG4gICAgICoge0BsaW5rIHdvcmtib3gtc3RyYXRlZ2llcy5TdHJhdGVneUhhbmRsZXJ+ZG9uZVdhaXRpbmd9XG4gICAgICogdG8ga25vdyB3aGVuIGFsbCBhZGRlZCBwcm9taXNlcyBoYXZlIHNldHRsZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1Byb21pc2V9IHByb21pc2UgQSBwcm9taXNlIHRvIGFkZCB0byB0aGUgZXh0ZW5kIGxpZmV0aW1lIHByb21pc2VzXG4gICAgICogICAgIG9mIHRoZSBldmVudCB0aGF0IHRyaWdnZXJlZCB0aGUgcmVxdWVzdC5cbiAgICAgKi9cbiAgICB3YWl0VW50aWwocHJvbWlzZSkge1xuICAgICAgICB0aGlzLl9leHRlbmRMaWZldGltZVByb21pc2VzLnB1c2gocHJvbWlzZSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIG9uY2UgYWxsIHByb21pc2VzIHBhc3NlZCB0b1xuICAgICAqIHtAbGluayB3b3JrYm94LXN0cmF0ZWdpZXMuU3RyYXRlZ3lIYW5kbGVyfndhaXRVbnRpbH1cbiAgICAgKiBoYXZlIHNldHRsZWQuXG4gICAgICpcbiAgICAgKiBOb3RlOiBhbnkgd29yayBkb25lIGFmdGVyIGBkb25lV2FpdGluZygpYCBzZXR0bGVzIHNob3VsZCBiZSBtYW51YWxseVxuICAgICAqIHBhc3NlZCB0byBhbiBldmVudCdzIGB3YWl0VW50aWwoKWAgbWV0aG9kIChub3QgdGhpcyBoYW5kbGVyJ3NcbiAgICAgKiBgd2FpdFVudGlsKClgIG1ldGhvZCksIG90aGVyd2lzZSB0aGUgc2VydmljZSB3b3JrZXIgdGhyZWFkIG15IGJlIGtpbGxlZFxuICAgICAqIHByaW9yIHRvIHlvdXIgd29yayBjb21wbGV0aW5nLlxuICAgICAqL1xuICAgIGFzeW5jIGRvbmVXYWl0aW5nKCkge1xuICAgICAgICBsZXQgcHJvbWlzZTtcbiAgICAgICAgd2hpbGUgKChwcm9taXNlID0gdGhpcy5fZXh0ZW5kTGlmZXRpbWVQcm9taXNlcy5zaGlmdCgpKSkge1xuICAgICAgICAgICAgYXdhaXQgcHJvbWlzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdG9wcyBydW5uaW5nIHRoZSBzdHJhdGVneSBhbmQgaW1tZWRpYXRlbHkgcmVzb2x2ZXMgYW55IHBlbmRpbmdcbiAgICAgKiBgd2FpdFVudGlsKClgIHByb21pc2VzLlxuICAgICAqL1xuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX2hhbmRsZXJEZWZlcnJlZC5yZXNvbHZlKG51bGwpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCB3aWxsIGNhbGwgY2FjaGVXaWxsVXBkYXRlIG9uIHRoZSBhdmFpbGFibGUgcGx1Z2lucyAob3IgdXNlXG4gICAgICogc3RhdHVzID09PSAyMDApIHRvIGRldGVybWluZSBpZiB0aGUgUmVzcG9uc2UgaXMgc2FmZSBhbmQgdmFsaWQgdG8gY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlcXVlc3R9IG9wdGlvbnMucmVxdWVzdFxuICAgICAqIEBwYXJhbSB7UmVzcG9uc2V9IG9wdGlvbnMucmVzcG9uc2VcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPFJlc3BvbnNlfHVuZGVmaW5lZD59XG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGFzeW5jIF9lbnN1cmVSZXNwb25zZVNhZmVUb0NhY2hlKHJlc3BvbnNlKSB7XG4gICAgICAgIGxldCByZXNwb25zZVRvQ2FjaGUgPSByZXNwb25zZTtcbiAgICAgICAgbGV0IHBsdWdpbnNVc2VkID0gZmFsc2U7XG4gICAgICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgdGhpcy5pdGVyYXRlQ2FsbGJhY2tzKCdjYWNoZVdpbGxVcGRhdGUnKSkge1xuICAgICAgICAgICAgcmVzcG9uc2VUb0NhY2hlID1cbiAgICAgICAgICAgICAgICAoYXdhaXQgY2FsbGJhY2soe1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0OiB0aGlzLnJlcXVlc3QsXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiByZXNwb25zZVRvQ2FjaGUsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiB0aGlzLmV2ZW50LFxuICAgICAgICAgICAgICAgIH0pKSB8fCB1bmRlZmluZWQ7XG4gICAgICAgICAgICBwbHVnaW5zVXNlZCA9IHRydWU7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlVG9DYWNoZSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghcGx1Z2luc1VzZWQpIHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZVRvQ2FjaGUgJiYgcmVzcG9uc2VUb0NhY2hlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VUb0NhY2hlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2VUb0NhY2hlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZVRvQ2FjaGUuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZVRvQ2FjaGUuc3RhdHVzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLndhcm4oYFRoZSByZXNwb25zZSBmb3IgJyR7dGhpcy5yZXF1ZXN0LnVybH0nIGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgaXMgYW4gb3BhcXVlIHJlc3BvbnNlLiBUaGUgY2FjaGluZyBzdHJhdGVneSB0aGF0IHlvdSdyZSBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYHVzaW5nIHdpbGwgbm90IGNhY2hlIG9wYXF1ZSByZXNwb25zZXMgYnkgZGVmYXVsdC5gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgVGhlIHJlc3BvbnNlIGZvciAnJHt0aGlzLnJlcXVlc3QudXJsfScgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGByZXR1cm5lZCBhIHN0YXR1cyBjb2RlIG9mICcke3Jlc3BvbnNlLnN0YXR1c30nIGFuZCB3b24ndCBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGJlIGNhY2hlZCBhcyBhIHJlc3VsdC5gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2VUb0NhY2hlO1xuICAgIH1cbn1cbmV4cG9ydCB7IFN0cmF0ZWd5SGFuZGxlciB9O1xuIiwgIi8qXG4gIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IGNhY2hlTmFtZXMgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvY2FjaGVOYW1lcy5qcyc7XG5pbXBvcnQgeyBXb3JrYm94RXJyb3IgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvV29ya2JveEVycm9yLmpzJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9sb2dnZXIuanMnO1xuaW1wb3J0IHsgZ2V0RnJpZW5kbHlVUkwgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvZ2V0RnJpZW5kbHlVUkwuanMnO1xuaW1wb3J0IHsgU3RyYXRlZ3lIYW5kbGVyIH0gZnJvbSAnLi9TdHJhdGVneUhhbmRsZXIuanMnO1xuaW1wb3J0ICcuL192ZXJzaW9uLmpzJztcbi8qKlxuICogQW4gYWJzdHJhY3QgYmFzZSBjbGFzcyB0aGF0IGFsbCBvdGhlciBzdHJhdGVneSBjbGFzc2VzIG11c3QgZXh0ZW5kIGZyb206XG4gKlxuICogQG1lbWJlcm9mIHdvcmtib3gtc3RyYXRlZ2llc1xuICovXG5jbGFzcyBTdHJhdGVneSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgc3RyYXRlZ3kgYW5kIHNldHMgYWxsIGRvY3VtZW50ZWQgb3B0aW9uXG4gICAgICogcHJvcGVydGllcyBhcyBwdWJsaWMgaW5zdGFuY2UgcHJvcGVydGllcy5cbiAgICAgKlxuICAgICAqIE5vdGU6IGlmIGEgY3VzdG9tIHN0cmF0ZWd5IGNsYXNzIGV4dGVuZHMgdGhlIGJhc2UgU3RyYXRlZ3kgY2xhc3MgYW5kIGRvZXNcbiAgICAgKiBub3QgbmVlZCBtb3JlIHRoYW4gdGhlc2UgcHJvcGVydGllcywgaXQgZG9lcyBub3QgbmVlZCB0byBkZWZpbmUgaXRzIG93blxuICAgICAqIGNvbnN0cnVjdG9yLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5jYWNoZU5hbWVdIENhY2hlIG5hbWUgdG8gc3RvcmUgYW5kIHJldHJpZXZlXG4gICAgICogcmVxdWVzdHMuIERlZmF1bHRzIHRvIHRoZSBjYWNoZSBuYW1lcyBwcm92aWRlZCBieVxuICAgICAqIHtAbGluayB3b3JrYm94LWNvcmUuY2FjaGVOYW1lc30uXG4gICAgICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSBbb3B0aW9ucy5wbHVnaW5zXSBbUGx1Z2luc117QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vd2ViL3Rvb2xzL3dvcmtib3gvZ3VpZGVzL3VzaW5nLXBsdWdpbnN9XG4gICAgICogdG8gdXNlIGluIGNvbmp1bmN0aW9uIHdpdGggdGhpcyBjYWNoaW5nIHN0cmF0ZWd5LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5mZXRjaE9wdGlvbnNdIFZhbHVlcyBwYXNzZWQgYWxvbmcgdG8gdGhlXG4gICAgICogW2Bpbml0YF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dpbmRvd09yV29ya2VyR2xvYmFsU2NvcGUvZmV0Y2gjUGFyYW1ldGVycylcbiAgICAgKiBvZiBbbm9uLW5hdmlnYXRpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvd29ya2JveC9pc3N1ZXMvMTc5NilcbiAgICAgKiBgZmV0Y2goKWAgcmVxdWVzdHMgbWFkZSBieSB0aGlzIHN0cmF0ZWd5LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5tYXRjaE9wdGlvbnNdIFRoZVxuICAgICAqIFtgQ2FjaGVRdWVyeU9wdGlvbnNgXXtAbGluayBodHRwczovL3czYy5naXRodWIuaW8vU2VydmljZVdvcmtlci8jZGljdGRlZi1jYWNoZXF1ZXJ5b3B0aW9uc31cbiAgICAgKiBmb3IgYW55IGBjYWNoZS5tYXRjaCgpYCBvciBgY2FjaGUucHV0KClgIGNhbGxzIG1hZGUgYnkgdGhpcyBzdHJhdGVneS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENhY2hlIG5hbWUgdG8gc3RvcmUgYW5kIHJldHJpZXZlXG4gICAgICAgICAqIHJlcXVlc3RzLiBEZWZhdWx0cyB0byB0aGUgY2FjaGUgbmFtZXMgcHJvdmlkZWQgYnlcbiAgICAgICAgICoge0BsaW5rIHdvcmtib3gtY29yZS5jYWNoZU5hbWVzfS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY2FjaGVOYW1lID0gY2FjaGVOYW1lcy5nZXRSdW50aW1lTmFtZShvcHRpb25zLmNhY2hlTmFtZSk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbGlzdFxuICAgICAgICAgKiBbUGx1Z2luc117QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vd2ViL3Rvb2xzL3dvcmtib3gvZ3VpZGVzL3VzaW5nLXBsdWdpbnN9XG4gICAgICAgICAqIHVzZWQgYnkgdGhpcyBzdHJhdGVneS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge0FycmF5PE9iamVjdD59XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBsdWdpbnMgPSBvcHRpb25zLnBsdWdpbnMgfHwgW107XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBWYWx1ZXMgcGFzc2VkIGFsb25nIHRvIHRoZVxuICAgICAgICAgKiBbYGluaXRgXXtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2luZG93T3JXb3JrZXJHbG9iYWxTY29wZS9mZXRjaCNQYXJhbWV0ZXJzfVxuICAgICAgICAgKiBvZiBhbGwgZmV0Y2goKSByZXF1ZXN0cyBtYWRlIGJ5IHRoaXMgc3RyYXRlZ3kuXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmZldGNoT3B0aW9ucyA9IG9wdGlvbnMuZmV0Y2hPcHRpb25zO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlXG4gICAgICAgICAqIFtgQ2FjaGVRdWVyeU9wdGlvbnNgXXtAbGluayBodHRwczovL3czYy5naXRodWIuaW8vU2VydmljZVdvcmtlci8jZGljdGRlZi1jYWNoZXF1ZXJ5b3B0aW9uc31cbiAgICAgICAgICogZm9yIGFueSBgY2FjaGUubWF0Y2goKWAgb3IgYGNhY2hlLnB1dCgpYCBjYWxscyBtYWRlIGJ5IHRoaXMgc3RyYXRlZ3kuXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1hdGNoT3B0aW9ucyA9IG9wdGlvbnMubWF0Y2hPcHRpb25zO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGEgcmVxdWVzdCBzdHJhdGVneSBhbmQgcmV0dXJucyBhIGBQcm9taXNlYCB0aGF0IHdpbGwgcmVzb2x2ZSB3aXRoXG4gICAgICogYSBgUmVzcG9uc2VgLCBpbnZva2luZyBhbGwgcmVsZXZhbnQgcGx1Z2luIGNhbGxiYWNrcy5cbiAgICAgKlxuICAgICAqIFdoZW4gYSBzdHJhdGVneSBpbnN0YW5jZSBpcyByZWdpc3RlcmVkIHdpdGggYSBXb3JrYm94XG4gICAgICoge0BsaW5rIHdvcmtib3gtcm91dGluZy5Sb3V0ZX0sIHRoaXMgbWV0aG9kIGlzIGF1dG9tYXRpY2FsbHlcbiAgICAgKiBjYWxsZWQgd2hlbiB0aGUgcm91dGUgbWF0Y2hlcy5cbiAgICAgKlxuICAgICAqIEFsdGVybmF0aXZlbHksIHRoaXMgbWV0aG9kIGNhbiBiZSB1c2VkIGluIGEgc3RhbmRhbG9uZSBgRmV0Y2hFdmVudGBcbiAgICAgKiBsaXN0ZW5lciBieSBwYXNzaW5nIGl0IHRvIGBldmVudC5yZXNwb25kV2l0aCgpYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RmV0Y2hFdmVudHxPYmplY3R9IG9wdGlvbnMgQSBgRmV0Y2hFdmVudGAgb3IgYW4gb2JqZWN0IHdpdGggdGhlXG4gICAgICogICAgIHByb3BlcnRpZXMgbGlzdGVkIGJlbG93LlxuICAgICAqIEBwYXJhbSB7UmVxdWVzdHxzdHJpbmd9IG9wdGlvbnMucmVxdWVzdCBBIHJlcXVlc3QgdG8gcnVuIHRoaXMgc3RyYXRlZ3kgZm9yLlxuICAgICAqIEBwYXJhbSB7RXh0ZW5kYWJsZUV2ZW50fSBvcHRpb25zLmV2ZW50IFRoZSBldmVudCBhc3NvY2lhdGVkIHdpdGggdGhlXG4gICAgICogICAgIHJlcXVlc3QuXG4gICAgICogQHBhcmFtIHtVUkx9IFtvcHRpb25zLnVybF1cbiAgICAgKiBAcGFyYW0geyp9IFtvcHRpb25zLnBhcmFtc11cbiAgICAgKi9cbiAgICBoYW5kbGUob3B0aW9ucykge1xuICAgICAgICBjb25zdCBbcmVzcG9uc2VEb25lXSA9IHRoaXMuaGFuZGxlQWxsKG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2VEb25lO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaW1pbGFyIHRvIHtAbGluayB3b3JrYm94LXN0cmF0ZWdpZXMuU3RyYXRlZ3l+aGFuZGxlfSwgYnV0XG4gICAgICogaW5zdGVhZCBvZiBqdXN0IHJldHVybmluZyBhIGBQcm9taXNlYCB0aGF0IHJlc29sdmVzIHRvIGEgYFJlc3BvbnNlYCBpdFxuICAgICAqIGl0IHdpbGwgcmV0dXJuIGFuIHR1cGxlIG9mIGBbcmVzcG9uc2UsIGRvbmVdYCBwcm9taXNlcywgd2hlcmUgdGhlIGZvcm1lclxuICAgICAqIChgcmVzcG9uc2VgKSBpcyBlcXVpdmFsZW50IHRvIHdoYXQgYGhhbmRsZSgpYCByZXR1cm5zLCBhbmQgdGhlIGxhdHRlciBpcyBhXG4gICAgICogUHJvbWlzZSB0aGF0IHdpbGwgcmVzb2x2ZSBvbmNlIGFueSBwcm9taXNlcyB0aGF0IHdlcmUgYWRkZWQgdG9cbiAgICAgKiBgZXZlbnQud2FpdFVudGlsKClgIGFzIHBhcnQgb2YgcGVyZm9ybWluZyB0aGUgc3RyYXRlZ3kgaGF2ZSBjb21wbGV0ZWQuXG4gICAgICpcbiAgICAgKiBZb3UgY2FuIGF3YWl0IHRoZSBgZG9uZWAgcHJvbWlzZSB0byBlbnN1cmUgYW55IGV4dHJhIHdvcmsgcGVyZm9ybWVkIGJ5XG4gICAgICogdGhlIHN0cmF0ZWd5ICh1c3VhbGx5IGNhY2hpbmcgcmVzcG9uc2VzKSBjb21wbGV0ZXMgc3VjY2Vzc2Z1bGx5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtGZXRjaEV2ZW50fE9iamVjdH0gb3B0aW9ucyBBIGBGZXRjaEV2ZW50YCBvciBhbiBvYmplY3Qgd2l0aCB0aGVcbiAgICAgKiAgICAgcHJvcGVydGllcyBsaXN0ZWQgYmVsb3cuXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0fHN0cmluZ30gb3B0aW9ucy5yZXF1ZXN0IEEgcmVxdWVzdCB0byBydW4gdGhpcyBzdHJhdGVneSBmb3IuXG4gICAgICogQHBhcmFtIHtFeHRlbmRhYmxlRXZlbnR9IG9wdGlvbnMuZXZlbnQgVGhlIGV2ZW50IGFzc29jaWF0ZWQgd2l0aCB0aGVcbiAgICAgKiAgICAgcmVxdWVzdC5cbiAgICAgKiBAcGFyYW0ge1VSTH0gW29wdGlvbnMudXJsXVxuICAgICAqIEBwYXJhbSB7Kn0gW29wdGlvbnMucGFyYW1zXVxuICAgICAqIEByZXR1cm4ge0FycmF5PFByb21pc2U+fSBBIHR1cGxlIG9mIFtyZXNwb25zZSwgZG9uZV1cbiAgICAgKiAgICAgcHJvbWlzZXMgdGhhdCBjYW4gYmUgdXNlZCB0byBkZXRlcm1pbmUgd2hlbiB0aGUgcmVzcG9uc2UgcmVzb2x2ZXMgYXNcbiAgICAgKiAgICAgd2VsbCBhcyB3aGVuIHRoZSBoYW5kbGVyIGhhcyBjb21wbGV0ZWQgYWxsIGl0cyB3b3JrLlxuICAgICAqL1xuICAgIGhhbmRsZUFsbChvcHRpb25zKSB7XG4gICAgICAgIC8vIEFsbG93IGZvciBmbGV4aWJsZSBvcHRpb25zIHRvIGJlIHBhc3NlZC5cbiAgICAgICAgaWYgKG9wdGlvbnMgaW5zdGFuY2VvZiBGZXRjaEV2ZW50KSB7XG4gICAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIGV2ZW50OiBvcHRpb25zLFxuICAgICAgICAgICAgICAgIHJlcXVlc3Q6IG9wdGlvbnMucmVxdWVzdCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZXZlbnQgPSBvcHRpb25zLmV2ZW50O1xuICAgICAgICBjb25zdCByZXF1ZXN0ID0gdHlwZW9mIG9wdGlvbnMucmVxdWVzdCA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgID8gbmV3IFJlcXVlc3Qob3B0aW9ucy5yZXF1ZXN0KVxuICAgICAgICAgICAgOiBvcHRpb25zLnJlcXVlc3Q7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9ICdwYXJhbXMnIGluIG9wdGlvbnMgPyBvcHRpb25zLnBhcmFtcyA6IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IG5ldyBTdHJhdGVneUhhbmRsZXIodGhpcywgeyBldmVudCwgcmVxdWVzdCwgcGFyYW1zIH0pO1xuICAgICAgICBjb25zdCByZXNwb25zZURvbmUgPSB0aGlzLl9nZXRSZXNwb25zZShoYW5kbGVyLCByZXF1ZXN0LCBldmVudCk7XG4gICAgICAgIGNvbnN0IGhhbmRsZXJEb25lID0gdGhpcy5fYXdhaXRDb21wbGV0ZShyZXNwb25zZURvbmUsIGhhbmRsZXIsIHJlcXVlc3QsIGV2ZW50KTtcbiAgICAgICAgLy8gUmV0dXJuIGFuIGFycmF5IG9mIHByb21pc2VzLCBzdWl0YWJsZSBmb3IgdXNlIHdpdGggUHJvbWlzZS5hbGwoKS5cbiAgICAgICAgcmV0dXJuIFtyZXNwb25zZURvbmUsIGhhbmRsZXJEb25lXTtcbiAgICB9XG4gICAgYXN5bmMgX2dldFJlc3BvbnNlKGhhbmRsZXIsIHJlcXVlc3QsIGV2ZW50KSB7XG4gICAgICAgIGF3YWl0IGhhbmRsZXIucnVuQ2FsbGJhY2tzKCdoYW5kbGVyV2lsbFN0YXJ0JywgeyBldmVudCwgcmVxdWVzdCB9KTtcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gdW5kZWZpbmVkO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9oYW5kbGUocmVxdWVzdCwgaGFuZGxlcik7XG4gICAgICAgICAgICAvLyBUaGUgXCJvZmZpY2lhbFwiIFN0cmF0ZWd5IHN1YmNsYXNzZXMgYWxsIHRocm93IHRoaXMgZXJyb3IgYXV0b21hdGljYWxseSxcbiAgICAgICAgICAgIC8vIGJ1dCBpbiBjYXNlIGEgdGhpcmQtcGFydHkgU3RyYXRlZ3kgZG9lc24ndCwgZW5zdXJlIHRoYXQgd2UgaGF2ZSBhXG4gICAgICAgICAgICAvLyBjb25zaXN0ZW50IGZhaWx1cmUgd2hlbiB0aGVyZSdzIG5vIHJlc3BvbnNlIG9yIGFuIGVycm9yIHJlc3BvbnNlLlxuICAgICAgICAgICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS50eXBlID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFdvcmtib3hFcnJvcignbm8tcmVzcG9uc2UnLCB7IHVybDogcmVxdWVzdC51cmwgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgaGFuZGxlci5pdGVyYXRlQ2FsbGJhY2tzKCdoYW5kbGVyRGlkRXJyb3InKSkge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IGF3YWl0IGNhbGxiYWNrKHsgZXJyb3IsIGV2ZW50LCByZXF1ZXN0IH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYFdoaWxlIHJlc3BvbmRpbmcgdG8gJyR7Z2V0RnJpZW5kbHlVUkwocmVxdWVzdC51cmwpfScsIGAgK1xuICAgICAgICAgICAgICAgICAgICBgYW4gJHtlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IudG9TdHJpbmcoKSA6ICcnfSBlcnJvciBvY2N1cnJlZC4gVXNpbmcgYSBmYWxsYmFjayByZXNwb25zZSBwcm92aWRlZCBieSBgICtcbiAgICAgICAgICAgICAgICAgICAgYGEgaGFuZGxlckRpZEVycm9yIHBsdWdpbi5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGNhbGxiYWNrIG9mIGhhbmRsZXIuaXRlcmF0ZUNhbGxiYWNrcygnaGFuZGxlcldpbGxSZXNwb25kJykpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0gYXdhaXQgY2FsbGJhY2soeyBldmVudCwgcmVxdWVzdCwgcmVzcG9uc2UgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cbiAgICBhc3luYyBfYXdhaXRDb21wbGV0ZShyZXNwb25zZURvbmUsIGhhbmRsZXIsIHJlcXVlc3QsIGV2ZW50KSB7XG4gICAgICAgIGxldCByZXNwb25zZTtcbiAgICAgICAgbGV0IGVycm9yO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCByZXNwb25zZURvbmU7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAvLyBJZ25vcmUgZXJyb3JzLCBhcyByZXNwb25zZSBlcnJvcnMgc2hvdWxkIGJlIGNhdWdodCB2aWEgdGhlIGByZXNwb25zZWBcbiAgICAgICAgICAgIC8vIHByb21pc2UgYWJvdmUuIFRoZSBgZG9uZWAgcHJvbWlzZSB3aWxsIG9ubHkgdGhyb3cgZm9yIGVycm9ycyBpblxuICAgICAgICAgICAgLy8gcHJvbWlzZXMgcGFzc2VkIHRvIGBoYW5kbGVyLndhaXRVbnRpbCgpYC5cbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgaGFuZGxlci5ydW5DYWxsYmFja3MoJ2hhbmRsZXJEaWRSZXNwb25kJywge1xuICAgICAgICAgICAgICAgIGV2ZW50LFxuICAgICAgICAgICAgICAgIHJlcXVlc3QsXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGF3YWl0IGhhbmRsZXIuZG9uZVdhaXRpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAod2FpdFVudGlsRXJyb3IpIHtcbiAgICAgICAgICAgIGlmICh3YWl0VW50aWxFcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IgPSB3YWl0VW50aWxFcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBoYW5kbGVyLnJ1bkNhbGxiYWNrcygnaGFuZGxlckRpZENvbXBsZXRlJywge1xuICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICByZXF1ZXN0LFxuICAgICAgICAgICAgcmVzcG9uc2UsXG4gICAgICAgICAgICBlcnJvcjogZXJyb3IsXG4gICAgICAgIH0pO1xuICAgICAgICBoYW5kbGVyLmRlc3Ryb3koKTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCB7IFN0cmF0ZWd5IH07XG4vKipcbiAqIENsYXNzZXMgZXh0ZW5kaW5nIHRoZSBgU3RyYXRlZ3lgIGJhc2VkIGNsYXNzIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QsXG4gKiBhbmQgbGV2ZXJhZ2UgdGhlIHtAbGluayB3b3JrYm94LXN0cmF0ZWdpZXMuU3RyYXRlZ3lIYW5kbGVyfVxuICogYXJnIHRvIHBlcmZvcm0gYWxsIGZldGNoaW5nIGFuZCBjYWNoZSBsb2dpYywgd2hpY2ggd2lsbCBlbnN1cmUgYWxsIHJlbGV2YW50XG4gKiBjYWNoZSwgY2FjaGUgb3B0aW9ucywgZmV0Y2ggb3B0aW9ucyBhbmQgcGx1Z2lucyBhcmUgdXNlZCAocGVyIHRoZSBjdXJyZW50XG4gKiBzdHJhdGVneSBpbnN0YW5jZSkuXG4gKlxuICogQG5hbWUgX2hhbmRsZVxuICogQGluc3RhbmNlXG4gKiBAYWJzdHJhY3RcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtSZXF1ZXN0fSByZXF1ZXN0XG4gKiBAcGFyYW0ge3dvcmtib3gtc3RyYXRlZ2llcy5TdHJhdGVneUhhbmRsZXJ9IGhhbmRsZXJcbiAqIEByZXR1cm4ge1Byb21pc2U8UmVzcG9uc2U+fVxuICpcbiAqIEBtZW1iZXJvZiB3b3JrYm94LXN0cmF0ZWdpZXMuU3RyYXRlZ3lcbiAqL1xuIiwgIi8qXG4gIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IGNvcHlSZXNwb25zZSB9IGZyb20gJ3dvcmtib3gtY29yZS9jb3B5UmVzcG9uc2UuanMnO1xuaW1wb3J0IHsgY2FjaGVOYW1lcyB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9jYWNoZU5hbWVzLmpzJztcbmltcG9ydCB7IGdldEZyaWVuZGx5VVJMIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2dldEZyaWVuZGx5VVJMLmpzJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9sb2dnZXIuanMnO1xuaW1wb3J0IHsgV29ya2JveEVycm9yIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL1dvcmtib3hFcnJvci5qcyc7XG5pbXBvcnQgeyBTdHJhdGVneSB9IGZyb20gJ3dvcmtib3gtc3RyYXRlZ2llcy9TdHJhdGVneS5qcyc7XG5pbXBvcnQgJy4vX3ZlcnNpb24uanMnO1xuLyoqXG4gKiBBIHtAbGluayB3b3JrYm94LXN0cmF0ZWdpZXMuU3RyYXRlZ3l9IGltcGxlbWVudGF0aW9uXG4gKiBzcGVjaWZpY2FsbHkgZGVzaWduZWQgdG8gd29yayB3aXRoXG4gKiB7QGxpbmsgd29ya2JveC1wcmVjYWNoaW5nLlByZWNhY2hlQ29udHJvbGxlcn1cbiAqIHRvIGJvdGggY2FjaGUgYW5kIGZldGNoIHByZWNhY2hlZCBhc3NldHMuXG4gKlxuICogTm90ZTogYW4gaW5zdGFuY2Ugb2YgdGhpcyBjbGFzcyBpcyBjcmVhdGVkIGF1dG9tYXRpY2FsbHkgd2hlbiBjcmVhdGluZyBhXG4gKiBgUHJlY2FjaGVDb250cm9sbGVyYDsgaXQncyBnZW5lcmFsbHkgbm90IG5lY2Vzc2FyeSB0byBjcmVhdGUgdGhpcyB5b3Vyc2VsZi5cbiAqXG4gKiBAZXh0ZW5kcyB3b3JrYm94LXN0cmF0ZWdpZXMuU3RyYXRlZ3lcbiAqIEBtZW1iZXJvZiB3b3JrYm94LXByZWNhY2hpbmdcbiAqL1xuY2xhc3MgUHJlY2FjaGVTdHJhdGVneSBleHRlbmRzIFN0cmF0ZWd5IHtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuY2FjaGVOYW1lXSBDYWNoZSBuYW1lIHRvIHN0b3JlIGFuZCByZXRyaWV2ZVxuICAgICAqIHJlcXVlc3RzLiBEZWZhdWx0cyB0byB0aGUgY2FjaGUgbmFtZXMgcHJvdmlkZWQgYnlcbiAgICAgKiB7QGxpbmsgd29ya2JveC1jb3JlLmNhY2hlTmFtZXN9LlxuICAgICAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gW29wdGlvbnMucGx1Z2luc10ge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3dlYi90b29scy93b3JrYm94L2d1aWRlcy91c2luZy1wbHVnaW5zfFBsdWdpbnN9XG4gICAgICogdG8gdXNlIGluIGNvbmp1bmN0aW9uIHdpdGggdGhpcyBjYWNoaW5nIHN0cmF0ZWd5LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5mZXRjaE9wdGlvbnNdIFZhbHVlcyBwYXNzZWQgYWxvbmcgdG8gdGhlXG4gICAgICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XaW5kb3dPcldvcmtlckdsb2JhbFNjb3BlL2ZldGNoI1BhcmFtZXRlcnN8aW5pdH1cbiAgICAgKiBvZiBhbGwgZmV0Y2goKSByZXF1ZXN0cyBtYWRlIGJ5IHRoaXMgc3RyYXRlZ3kuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLm1hdGNoT3B0aW9uc10gVGhlXG4gICAgICoge0BsaW5rIGh0dHBzOi8vdzNjLmdpdGh1Yi5pby9TZXJ2aWNlV29ya2VyLyNkaWN0ZGVmLWNhY2hlcXVlcnlvcHRpb25zfENhY2hlUXVlcnlPcHRpb25zfVxuICAgICAqIGZvciBhbnkgYGNhY2hlLm1hdGNoKClgIG9yIGBjYWNoZS5wdXQoKWAgY2FsbHMgbWFkZSBieSB0aGlzIHN0cmF0ZWd5LlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuZmFsbGJhY2tUb05ldHdvcms9dHJ1ZV0gV2hldGhlciB0byBhdHRlbXB0IHRvXG4gICAgICogZ2V0IHRoZSByZXNwb25zZSBmcm9tIHRoZSBuZXR3b3JrIGlmIHRoZXJlJ3MgYSBwcmVjYWNoZSBtaXNzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBvcHRpb25zLmNhY2hlTmFtZSA9IGNhY2hlTmFtZXMuZ2V0UHJlY2FjaGVOYW1lKG9wdGlvbnMuY2FjaGVOYW1lKTtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2ZhbGxiYWNrVG9OZXR3b3JrID1cbiAgICAgICAgICAgIG9wdGlvbnMuZmFsbGJhY2tUb05ldHdvcmsgPT09IGZhbHNlID8gZmFsc2UgOiB0cnVlO1xuICAgICAgICAvLyBSZWRpcmVjdGVkIHJlc3BvbnNlcyBjYW5ub3QgYmUgdXNlZCB0byBzYXRpc2Z5IGEgbmF2aWdhdGlvbiByZXF1ZXN0LCBzb1xuICAgICAgICAvLyBhbnkgcmVkaXJlY3RlZCByZXNwb25zZSBtdXN0IGJlIFwiY29waWVkXCIgcmF0aGVyIHRoYW4gY2xvbmVkLCBzbyB0aGUgbmV3XG4gICAgICAgIC8vIHJlc3BvbnNlIGRvZXNuJ3QgY29udGFpbiB0aGUgYHJlZGlyZWN0ZWRgIGZsYWcuIFNlZTpcbiAgICAgICAgLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NjY5MzYzJmRlc2M9MiNjMVxuICAgICAgICB0aGlzLnBsdWdpbnMucHVzaChQcmVjYWNoZVN0cmF0ZWd5LmNvcHlSZWRpcmVjdGVkQ2FjaGVhYmxlUmVzcG9uc2VzUGx1Z2luKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge1JlcXVlc3R8c3RyaW5nfSByZXF1ZXN0IEEgcmVxdWVzdCB0byBydW4gdGhpcyBzdHJhdGVneSBmb3IuXG4gICAgICogQHBhcmFtIHt3b3JrYm94LXN0cmF0ZWdpZXMuU3RyYXRlZ3lIYW5kbGVyfSBoYW5kbGVyIFRoZSBldmVudCB0aGF0XG4gICAgICogICAgIHRyaWdnZXJlZCB0aGUgcmVxdWVzdC5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPFJlc3BvbnNlPn1cbiAgICAgKi9cbiAgICBhc3luYyBfaGFuZGxlKHJlcXVlc3QsIGhhbmRsZXIpIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBoYW5kbGVyLmNhY2hlTWF0Y2gocmVxdWVzdCk7XG4gICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoaXMgaXMgYW4gYGluc3RhbGxgIGV2ZW50IGZvciBhbiBlbnRyeSB0aGF0IGlzbid0IGFscmVhZHkgY2FjaGVkLFxuICAgICAgICAvLyB0aGVuIHBvcHVsYXRlIHRoZSBjYWNoZS5cbiAgICAgICAgaWYgKGhhbmRsZXIuZXZlbnQgJiYgaGFuZGxlci5ldmVudC50eXBlID09PSAnaW5zdGFsbCcpIHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9oYW5kbGVJbnN0YWxsKHJlcXVlc3QsIGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEdldHRpbmcgaGVyZSBtZWFucyBzb21ldGhpbmcgd2VudCB3cm9uZy4gQW4gZW50cnkgdGhhdCBzaG91bGQgaGF2ZSBiZWVuXG4gICAgICAgIC8vIHByZWNhY2hlZCB3YXNuJ3QgZm91bmQgaW4gdGhlIGNhY2hlLlxuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5faGFuZGxlRmV0Y2gocmVxdWVzdCwgaGFuZGxlcik7XG4gICAgfVxuICAgIGFzeW5jIF9oYW5kbGVGZXRjaChyZXF1ZXN0LCBoYW5kbGVyKSB7XG4gICAgICAgIGxldCByZXNwb25zZTtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gKGhhbmRsZXIucGFyYW1zIHx8IHt9KTtcbiAgICAgICAgLy8gRmFsbCBiYWNrIHRvIHRoZSBuZXR3b3JrIGlmIHdlJ3JlIGNvbmZpZ3VyZWQgdG8gZG8gc28uXG4gICAgICAgIGlmICh0aGlzLl9mYWxsYmFja1RvTmV0d29yaykge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIud2FybihgVGhlIHByZWNhY2hlZCByZXNwb25zZSBmb3IgYCArXG4gICAgICAgICAgICAgICAgICAgIGAke2dldEZyaWVuZGx5VVJMKHJlcXVlc3QudXJsKX0gaW4gJHt0aGlzLmNhY2hlTmFtZX0gd2FzIG5vdCBgICtcbiAgICAgICAgICAgICAgICAgICAgYGZvdW5kLiBGYWxsaW5nIGJhY2sgdG8gdGhlIG5ldHdvcmsuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBpbnRlZ3JpdHlJbk1hbmlmZXN0ID0gcGFyYW1zLmludGVncml0eTtcbiAgICAgICAgICAgIGNvbnN0IGludGVncml0eUluUmVxdWVzdCA9IHJlcXVlc3QuaW50ZWdyaXR5O1xuICAgICAgICAgICAgY29uc3Qgbm9JbnRlZ3JpdHlDb25mbGljdCA9ICFpbnRlZ3JpdHlJblJlcXVlc3QgfHwgaW50ZWdyaXR5SW5SZXF1ZXN0ID09PSBpbnRlZ3JpdHlJbk1hbmlmZXN0O1xuICAgICAgICAgICAgLy8gRG8gbm90IGFkZCBpbnRlZ3JpdHkgaWYgdGhlIG9yaWdpbmFsIHJlcXVlc3QgaXMgbm8tY29yc1xuICAgICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvd29ya2JveC9pc3N1ZXMvMzA5NlxuICAgICAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCBoYW5kbGVyLmZldGNoKG5ldyBSZXF1ZXN0KHJlcXVlc3QsIHtcbiAgICAgICAgICAgICAgICBpbnRlZ3JpdHk6IHJlcXVlc3QubW9kZSAhPT0gJ25vLWNvcnMnXG4gICAgICAgICAgICAgICAgICAgID8gaW50ZWdyaXR5SW5SZXF1ZXN0IHx8IGludGVncml0eUluTWFuaWZlc3RcbiAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAvLyBJdCdzIG9ubHkgXCJzYWZlXCIgdG8gcmVwYWlyIHRoZSBjYWNoZSBpZiB3ZSdyZSB1c2luZyBTUkkgdG8gZ3VhcmFudGVlXG4gICAgICAgICAgICAvLyB0aGF0IHRoZSByZXNwb25zZSBtYXRjaGVzIHRoZSBwcmVjYWNoZSBtYW5pZmVzdCdzIGV4cGVjdGF0aW9ucyxcbiAgICAgICAgICAgIC8vIGFuZCB0aGVyZSdzIGVpdGhlciBhKSBubyBpbnRlZ3JpdHkgcHJvcGVydHkgaW4gdGhlIGluY29taW5nIHJlcXVlc3RcbiAgICAgICAgICAgIC8vIG9yIGIpIHRoZXJlIGlzIGFuIGludGVncml0eSwgYW5kIGl0IG1hdGNoZXMgdGhlIHByZWNhY2hlIG1hbmlmZXN0LlxuICAgICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvd29ya2JveC9pc3N1ZXMvMjg1OFxuICAgICAgICAgICAgLy8gQWxzbyBpZiB0aGUgb3JpZ2luYWwgcmVxdWVzdCB1c2VycyBuby1jb3JzIHdlIGRvbid0IHVzZSBpbnRlZ3JpdHkuXG4gICAgICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZS93b3JrYm94L2lzc3Vlcy8zMDk2XG4gICAgICAgICAgICBpZiAoaW50ZWdyaXR5SW5NYW5pZmVzdCAmJlxuICAgICAgICAgICAgICAgIG5vSW50ZWdyaXR5Q29uZmxpY3QgJiZcbiAgICAgICAgICAgICAgICByZXF1ZXN0Lm1vZGUgIT09ICduby1jb3JzJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VzZURlZmF1bHRDYWNoZWFiaWxpdHlQbHVnaW5JZk5lZWRlZCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHdhc0NhY2hlZCA9IGF3YWl0IGhhbmRsZXIuY2FjaGVQdXQocmVxdWVzdCwgcmVzcG9uc2UuY2xvbmUoKSk7XG4gICAgICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdhc0NhY2hlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgQSByZXNwb25zZSBmb3IgJHtnZXRGcmllbmRseVVSTChyZXF1ZXN0LnVybCl9IGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGB3YXMgdXNlZCB0byBcInJlcGFpclwiIHRoZSBwcmVjYWNoZS5gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRoaXMgc2hvdWxkbid0IG5vcm1hbGx5IGhhcHBlbiwgYnV0IHRoZXJlIGFyZSBlZGdlIGNhc2VzOlxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZS93b3JrYm94L2lzc3Vlcy8xNDQxXG4gICAgICAgICAgICB0aHJvdyBuZXcgV29ya2JveEVycm9yKCdtaXNzaW5nLXByZWNhY2hlLWVudHJ5Jywge1xuICAgICAgICAgICAgICAgIGNhY2hlTmFtZTogdGhpcy5jYWNoZU5hbWUsXG4gICAgICAgICAgICAgICAgdXJsOiByZXF1ZXN0LnVybCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBjb25zdCBjYWNoZUtleSA9IHBhcmFtcy5jYWNoZUtleSB8fCAoYXdhaXQgaGFuZGxlci5nZXRDYWNoZUtleShyZXF1ZXN0LCAncmVhZCcpKTtcbiAgICAgICAgICAgIC8vIFdvcmtib3ggaXMgZ29pbmcgdG8gaGFuZGxlIHRoZSByb3V0ZS5cbiAgICAgICAgICAgIC8vIHByaW50IHRoZSByb3V0aW5nIGRldGFpbHMgdG8gdGhlIGNvbnNvbGUuXG4gICAgICAgICAgICBsb2dnZXIuZ3JvdXBDb2xsYXBzZWQoYFByZWNhY2hpbmcgaXMgcmVzcG9uZGluZyB0bzogYCArIGdldEZyaWVuZGx5VVJMKHJlcXVlc3QudXJsKSk7XG4gICAgICAgICAgICBsb2dnZXIubG9nKGBTZXJ2aW5nIHRoZSBwcmVjYWNoZWQgdXJsOiAke2dldEZyaWVuZGx5VVJMKGNhY2hlS2V5IGluc3RhbmNlb2YgUmVxdWVzdCA/IGNhY2hlS2V5LnVybCA6IGNhY2hlS2V5KX1gKTtcbiAgICAgICAgICAgIGxvZ2dlci5ncm91cENvbGxhcHNlZChgVmlldyByZXF1ZXN0IGRldGFpbHMgaGVyZS5gKTtcbiAgICAgICAgICAgIGxvZ2dlci5sb2cocmVxdWVzdCk7XG4gICAgICAgICAgICBsb2dnZXIuZ3JvdXBFbmQoKTtcbiAgICAgICAgICAgIGxvZ2dlci5ncm91cENvbGxhcHNlZChgVmlldyByZXNwb25zZSBkZXRhaWxzIGhlcmUuYCk7XG4gICAgICAgICAgICBsb2dnZXIubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIGxvZ2dlci5ncm91cEVuZCgpO1xuICAgICAgICAgICAgbG9nZ2VyLmdyb3VwRW5kKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cbiAgICBhc3luYyBfaGFuZGxlSW5zdGFsbChyZXF1ZXN0LCBoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMuX3VzZURlZmF1bHRDYWNoZWFiaWxpdHlQbHVnaW5JZk5lZWRlZCgpO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGhhbmRsZXIuZmV0Y2gocmVxdWVzdCk7XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBkZWZlciBjYWNoZVB1dCgpIHVudGlsIGFmdGVyIHdlIGtub3cgdGhlIHJlc3BvbnNlXG4gICAgICAgIC8vIHNob3VsZCBiZSBjYWNoZWQ7IHNlZSBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3dvcmtib3gvaXNzdWVzLzI3MzdcbiAgICAgICAgY29uc3Qgd2FzQ2FjaGVkID0gYXdhaXQgaGFuZGxlci5jYWNoZVB1dChyZXF1ZXN0LCByZXNwb25zZS5jbG9uZSgpKTtcbiAgICAgICAgaWYgKCF3YXNDYWNoZWQpIHtcbiAgICAgICAgICAgIC8vIFRocm93aW5nIGhlcmUgd2lsbCBsZWFkIHRvIHRoZSBgaW5zdGFsbGAgaGFuZGxlciBmYWlsaW5nLCB3aGljaFxuICAgICAgICAgICAgLy8gd2Ugd2FudCB0byBkbyBpZiAqYW55KiBvZiB0aGUgcmVzcG9uc2VzIGFyZW4ndCBzYWZlIHRvIGNhY2hlLlxuICAgICAgICAgICAgdGhyb3cgbmV3IFdvcmtib3hFcnJvcignYmFkLXByZWNhY2hpbmctcmVzcG9uc2UnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiByZXF1ZXN0LnVybCxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgaXMgY29tcGxleCwgYXMgdGhlcmUgYSBudW1iZXIgb2YgdGhpbmdzIHRvIGFjY291bnQgZm9yOlxuICAgICAqXG4gICAgICogVGhlIGBwbHVnaW5zYCBhcnJheSBjYW4gYmUgc2V0IGF0IGNvbnN0cnVjdGlvbiwgYW5kL29yIGl0IG1pZ2h0IGJlIGFkZGVkIHRvXG4gICAgICogdG8gYXQgYW55IHRpbWUgYmVmb3JlIHRoZSBzdHJhdGVneSBpcyB1c2VkLlxuICAgICAqXG4gICAgICogQXQgdGhlIHRpbWUgdGhlIHN0cmF0ZWd5IGlzIHVzZWQgKGkuZS4gZHVyaW5nIGFuIGBpbnN0YWxsYCBldmVudCksIHRoZXJlXG4gICAgICogbmVlZHMgdG8gYmUgYXQgbGVhc3Qgb25lIHBsdWdpbiB0aGF0IGltcGxlbWVudHMgYGNhY2hlV2lsbFVwZGF0ZWAgaW4gdGhlXG4gICAgICogYXJyYXksIG90aGVyIHRoYW4gYGNvcHlSZWRpcmVjdGVkQ2FjaGVhYmxlUmVzcG9uc2VzUGx1Z2luYC5cbiAgICAgKlxuICAgICAqIC0gSWYgdGhpcyBtZXRob2QgaXMgY2FsbGVkIGFuZCB0aGVyZSBhcmUgbm8gc3VpdGFibGUgYGNhY2hlV2lsbFVwZGF0ZWBcbiAgICAgKiBwbHVnaW5zLCB3ZSBuZWVkIHRvIGFkZCBgZGVmYXVsdFByZWNhY2hlQ2FjaGVhYmlsaXR5UGx1Z2luYC5cbiAgICAgKlxuICAgICAqIC0gSWYgdGhpcyBtZXRob2QgaXMgY2FsbGVkIGFuZCB0aGVyZSBpcyBleGFjdGx5IG9uZSBgY2FjaGVXaWxsVXBkYXRlYCwgdGhlblxuICAgICAqIHdlIGRvbid0IGhhdmUgdG8gZG8gYW55dGhpbmcgKHRoaXMgbWlnaHQgYmUgYSBwcmV2aW91c2x5IGFkZGVkXG4gICAgICogYGRlZmF1bHRQcmVjYWNoZUNhY2hlYWJpbGl0eVBsdWdpbmAsIG9yIGl0IG1pZ2h0IGJlIGEgY3VzdG9tIHBsdWdpbikuXG4gICAgICpcbiAgICAgKiAtIElmIHRoaXMgbWV0aG9kIGlzIGNhbGxlZCBhbmQgdGhlcmUgaXMgbW9yZSB0aGFuIG9uZSBgY2FjaGVXaWxsVXBkYXRlYCxcbiAgICAgKiB0aGVuIHdlIG5lZWQgdG8gY2hlY2sgaWYgb25lIGlzIGBkZWZhdWx0UHJlY2FjaGVDYWNoZWFiaWxpdHlQbHVnaW5gLiBJZiBzbyxcbiAgICAgKiB3ZSBuZWVkIHRvIHJlbW92ZSBpdC4gKFRoaXMgc2l0dWF0aW9uIGlzIHVubGlrZWx5LCBidXQgaXQgY291bGQgaGFwcGVuIGlmXG4gICAgICogdGhlIHN0cmF0ZWd5IGlzIHVzZWQgbXVsdGlwbGUgdGltZXMsIHRoZSBmaXJzdCB3aXRob3V0IGEgYGNhY2hlV2lsbFVwZGF0ZWAsXG4gICAgICogYW5kIHRoZW4gbGF0ZXIgb24gYWZ0ZXIgbWFudWFsbHkgYWRkaW5nIGEgY3VzdG9tIGBjYWNoZVdpbGxVcGRhdGVgLilcbiAgICAgKlxuICAgICAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3dvcmtib3gvaXNzdWVzLzI3MzcgZm9yIG1vcmUgY29udGV4dC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3VzZURlZmF1bHRDYWNoZWFiaWxpdHlQbHVnaW5JZk5lZWRlZCgpIHtcbiAgICAgICAgbGV0IGRlZmF1bHRQbHVnaW5JbmRleCA9IG51bGw7XG4gICAgICAgIGxldCBjYWNoZVdpbGxVcGRhdGVQbHVnaW5Db3VudCA9IDA7XG4gICAgICAgIGZvciAoY29uc3QgW2luZGV4LCBwbHVnaW5dIG9mIHRoaXMucGx1Z2lucy5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgIC8vIElnbm9yZSB0aGUgY29weSByZWRpcmVjdGVkIHBsdWdpbiB3aGVuIGRldGVybWluaW5nIHdoYXQgdG8gZG8uXG4gICAgICAgICAgICBpZiAocGx1Z2luID09PSBQcmVjYWNoZVN0cmF0ZWd5LmNvcHlSZWRpcmVjdGVkQ2FjaGVhYmxlUmVzcG9uc2VzUGx1Z2luKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTYXZlIHRoZSBkZWZhdWx0IHBsdWdpbidzIGluZGV4LCBpbiBjYXNlIGl0IG5lZWRzIHRvIGJlIHJlbW92ZWQuXG4gICAgICAgICAgICBpZiAocGx1Z2luID09PSBQcmVjYWNoZVN0cmF0ZWd5LmRlZmF1bHRQcmVjYWNoZUNhY2hlYWJpbGl0eVBsdWdpbikge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRQbHVnaW5JbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBsdWdpbi5jYWNoZVdpbGxVcGRhdGUpIHtcbiAgICAgICAgICAgICAgICBjYWNoZVdpbGxVcGRhdGVQbHVnaW5Db3VudCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjYWNoZVdpbGxVcGRhdGVQbHVnaW5Db3VudCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW5zLnB1c2goUHJlY2FjaGVTdHJhdGVneS5kZWZhdWx0UHJlY2FjaGVDYWNoZWFiaWxpdHlQbHVnaW4pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNhY2hlV2lsbFVwZGF0ZVBsdWdpbkNvdW50ID4gMSAmJiBkZWZhdWx0UGx1Z2luSW5kZXggIT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIE9ubHkgcmVtb3ZlIHRoZSBkZWZhdWx0IHBsdWdpbjsgbXVsdGlwbGUgY3VzdG9tIHBsdWdpbnMgYXJlIGFsbG93ZWQuXG4gICAgICAgICAgICB0aGlzLnBsdWdpbnMuc3BsaWNlKGRlZmF1bHRQbHVnaW5JbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTm90aGluZyBuZWVkcyB0byBiZSBkb25lIGlmIGNhY2hlV2lsbFVwZGF0ZVBsdWdpbkNvdW50IGlzIDFcbiAgICB9XG59XG5QcmVjYWNoZVN0cmF0ZWd5LmRlZmF1bHRQcmVjYWNoZUNhY2hlYWJpbGl0eVBsdWdpbiA9IHtcbiAgICBhc3luYyBjYWNoZVdpbGxVcGRhdGUoeyByZXNwb25zZSB9KSB7XG4gICAgICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzID49IDQwMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0sXG59O1xuUHJlY2FjaGVTdHJhdGVneS5jb3B5UmVkaXJlY3RlZENhY2hlYWJsZVJlc3BvbnNlc1BsdWdpbiA9IHtcbiAgICBhc3luYyBjYWNoZVdpbGxVcGRhdGUoeyByZXNwb25zZSB9KSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5yZWRpcmVjdGVkID8gYXdhaXQgY29weVJlc3BvbnNlKHJlc3BvbnNlKSA6IHJlc3BvbnNlO1xuICAgIH0sXG59O1xuZXhwb3J0IHsgUHJlY2FjaGVTdHJhdGVneSB9O1xuIiwgIi8qXG4gIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9hc3NlcnQuanMnO1xuaW1wb3J0IHsgY2FjaGVOYW1lcyB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9jYWNoZU5hbWVzLmpzJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9sb2dnZXIuanMnO1xuaW1wb3J0IHsgV29ya2JveEVycm9yIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL1dvcmtib3hFcnJvci5qcyc7XG5pbXBvcnQgeyB3YWl0VW50aWwgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvd2FpdFVudGlsLmpzJztcbmltcG9ydCB7IGNyZWF0ZUNhY2hlS2V5IH0gZnJvbSAnLi91dGlscy9jcmVhdGVDYWNoZUtleS5qcyc7XG5pbXBvcnQgeyBQcmVjYWNoZUluc3RhbGxSZXBvcnRQbHVnaW4gfSBmcm9tICcuL3V0aWxzL1ByZWNhY2hlSW5zdGFsbFJlcG9ydFBsdWdpbi5qcyc7XG5pbXBvcnQgeyBQcmVjYWNoZUNhY2hlS2V5UGx1Z2luIH0gZnJvbSAnLi91dGlscy9QcmVjYWNoZUNhY2hlS2V5UGx1Z2luLmpzJztcbmltcG9ydCB7IHByaW50Q2xlYW51cERldGFpbHMgfSBmcm9tICcuL3V0aWxzL3ByaW50Q2xlYW51cERldGFpbHMuanMnO1xuaW1wb3J0IHsgcHJpbnRJbnN0YWxsRGV0YWlscyB9IGZyb20gJy4vdXRpbHMvcHJpbnRJbnN0YWxsRGV0YWlscy5qcyc7XG5pbXBvcnQgeyBQcmVjYWNoZVN0cmF0ZWd5IH0gZnJvbSAnLi9QcmVjYWNoZVN0cmF0ZWd5LmpzJztcbmltcG9ydCAnLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIFBlcmZvcm1zIGVmZmljaWVudCBwcmVjYWNoaW5nIG9mIGFzc2V0cy5cbiAqXG4gKiBAbWVtYmVyb2Ygd29ya2JveC1wcmVjYWNoaW5nXG4gKi9cbmNsYXNzIFByZWNhY2hlQ29udHJvbGxlciB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IFByZWNhY2hlQ29udHJvbGxlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuY2FjaGVOYW1lXSBUaGUgY2FjaGUgdG8gdXNlIGZvciBwcmVjYWNoaW5nLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5wbHVnaW5zXSBQbHVnaW5zIHRvIHVzZSB3aGVuIHByZWNhY2hpbmcgYXMgd2VsbFxuICAgICAqIGFzIHJlc3BvbmRpbmcgdG8gZmV0Y2ggZXZlbnRzIGZvciBwcmVjYWNoZWQgYXNzZXRzLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuZmFsbGJhY2tUb05ldHdvcms9dHJ1ZV0gV2hldGhlciB0byBhdHRlbXB0IHRvXG4gICAgICogZ2V0IHRoZSByZXNwb25zZSBmcm9tIHRoZSBuZXR3b3JrIGlmIHRoZXJlJ3MgYSBwcmVjYWNoZSBtaXNzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHsgY2FjaGVOYW1lLCBwbHVnaW5zID0gW10sIGZhbGxiYWNrVG9OZXR3b3JrID0gdHJ1ZSwgfSA9IHt9KSB7XG4gICAgICAgIHRoaXMuX3VybHNUb0NhY2hlS2V5cyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5fdXJsc1RvQ2FjaGVNb2RlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5fY2FjaGVLZXlzVG9JbnRlZ3JpdGllcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5fc3RyYXRlZ3kgPSBuZXcgUHJlY2FjaGVTdHJhdGVneSh7XG4gICAgICAgICAgICBjYWNoZU5hbWU6IGNhY2hlTmFtZXMuZ2V0UHJlY2FjaGVOYW1lKGNhY2hlTmFtZSksXG4gICAgICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgICAgICAgLi4ucGx1Z2lucyxcbiAgICAgICAgICAgICAgICBuZXcgUHJlY2FjaGVDYWNoZUtleVBsdWdpbih7IHByZWNhY2hlQ29udHJvbGxlcjogdGhpcyB9KSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBmYWxsYmFja1RvTmV0d29yayxcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEJpbmQgdGhlIGluc3RhbGwgYW5kIGFjdGl2YXRlIG1ldGhvZHMgdG8gdGhlIGluc3RhbmNlLlxuICAgICAgICB0aGlzLmluc3RhbGwgPSB0aGlzLmluc3RhbGwuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZSA9IHRoaXMuYWN0aXZhdGUuYmluZCh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHR5cGUge3dvcmtib3gtcHJlY2FjaGluZy5QcmVjYWNoZVN0cmF0ZWd5fSBUaGUgc3RyYXRlZ3kgY3JlYXRlZCBieSB0aGlzIGNvbnRyb2xsZXIgYW5kXG4gICAgICogdXNlZCB0byBjYWNoZSBhc3NldHMgYW5kIHJlc3BvbmQgdG8gZmV0Y2ggZXZlbnRzLlxuICAgICAqL1xuICAgIGdldCBzdHJhdGVneSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0cmF0ZWd5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGl0ZW1zIHRvIHRoZSBwcmVjYWNoZSBsaXN0LCByZW1vdmluZyBhbnkgZHVwbGljYXRlcyBhbmRcbiAgICAgKiBzdG9yZXMgdGhlIGZpbGVzIGluIHRoZVxuICAgICAqIHtAbGluayB3b3JrYm94LWNvcmUuY2FjaGVOYW1lc3xcInByZWNhY2hlIGNhY2hlXCJ9IHdoZW4gdGhlIHNlcnZpY2VcbiAgICAgKiB3b3JrZXIgaW5zdGFsbHMuXG4gICAgICpcbiAgICAgKiBUaGlzIG1ldGhvZCBjYW4gYmUgY2FsbGVkIG11bHRpcGxlIHRpbWVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheTxPYmplY3R8c3RyaW5nPn0gW2VudHJpZXM9W11dIEFycmF5IG9mIGVudHJpZXMgdG8gcHJlY2FjaGUuXG4gICAgICovXG4gICAgcHJlY2FjaGUoZW50cmllcykge1xuICAgICAgICB0aGlzLmFkZFRvQ2FjaGVMaXN0KGVudHJpZXMpO1xuICAgICAgICBpZiAoIXRoaXMuX2luc3RhbGxBbmRBY3RpdmVMaXN0ZW5lcnNBZGRlZCkge1xuICAgICAgICAgICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdpbnN0YWxsJywgdGhpcy5pbnN0YWxsKTtcbiAgICAgICAgICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignYWN0aXZhdGUnLCB0aGlzLmFjdGl2YXRlKTtcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbGxBbmRBY3RpdmVMaXN0ZW5lcnNBZGRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2Qgd2lsbCBhZGQgaXRlbXMgdG8gdGhlIHByZWNhY2hlIGxpc3QsIHJlbW92aW5nIGR1cGxpY2F0ZXNcbiAgICAgKiBhbmQgZW5zdXJpbmcgdGhlIGluZm9ybWF0aW9uIGlzIHZhbGlkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheTx3b3JrYm94LXByZWNhY2hpbmcuUHJlY2FjaGVDb250cm9sbGVyLlByZWNhY2hlRW50cnl8c3RyaW5nPn0gZW50cmllc1xuICAgICAqICAgICBBcnJheSBvZiBlbnRyaWVzIHRvIHByZWNhY2hlLlxuICAgICAqL1xuICAgIGFkZFRvQ2FjaGVMaXN0KGVudHJpZXMpIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGFzc2VydC5pc0FycmF5KGVudHJpZXMsIHtcbiAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1wcmVjYWNoaW5nJyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdQcmVjYWNoZUNvbnRyb2xsZXInLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAnYWRkVG9DYWNoZUxpc3QnLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ2VudHJpZXMnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXJsc1RvV2FybkFib3V0ID0gW107XG4gICAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykge1xuICAgICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvd29ya2JveC9pc3N1ZXMvMjI1OVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBlbnRyeSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB1cmxzVG9XYXJuQWJvdXQucHVzaChlbnRyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChlbnRyeSAmJiBlbnRyeS5yZXZpc2lvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdXJsc1RvV2FybkFib3V0LnB1c2goZW50cnkudXJsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHsgY2FjaGVLZXksIHVybCB9ID0gY3JlYXRlQ2FjaGVLZXkoZW50cnkpO1xuICAgICAgICAgICAgY29uc3QgY2FjaGVNb2RlID0gdHlwZW9mIGVudHJ5ICE9PSAnc3RyaW5nJyAmJiBlbnRyeS5yZXZpc2lvbiA/ICdyZWxvYWQnIDogJ2RlZmF1bHQnO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3VybHNUb0NhY2hlS2V5cy5oYXModXJsKSAmJlxuICAgICAgICAgICAgICAgIHRoaXMuX3VybHNUb0NhY2hlS2V5cy5nZXQodXJsKSAhPT0gY2FjaGVLZXkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgV29ya2JveEVycm9yKCdhZGQtdG8tY2FjaGUtbGlzdC1jb25mbGljdGluZy1lbnRyaWVzJywge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdEVudHJ5OiB0aGlzLl91cmxzVG9DYWNoZUtleXMuZ2V0KHVybCksXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZEVudHJ5OiBjYWNoZUtleSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZW50cnkgIT09ICdzdHJpbmcnICYmIGVudHJ5LmludGVncml0eSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jYWNoZUtleXNUb0ludGVncml0aWVzLmhhcyhjYWNoZUtleSkgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVLZXlzVG9JbnRlZ3JpdGllcy5nZXQoY2FjaGVLZXkpICE9PSBlbnRyeS5pbnRlZ3JpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFdvcmtib3hFcnJvcignYWRkLXRvLWNhY2hlLWxpc3QtY29uZmxpY3RpbmctaW50ZWdyaXRpZXMnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUtleXNUb0ludGVncml0aWVzLnNldChjYWNoZUtleSwgZW50cnkuaW50ZWdyaXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3VybHNUb0NhY2hlS2V5cy5zZXQodXJsLCBjYWNoZUtleSk7XG4gICAgICAgICAgICB0aGlzLl91cmxzVG9DYWNoZU1vZGVzLnNldCh1cmwsIGNhY2hlTW9kZSk7XG4gICAgICAgICAgICBpZiAodXJsc1RvV2FybkFib3V0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCB3YXJuaW5nTWVzc2FnZSA9IGBXb3JrYm94IGlzIHByZWNhY2hpbmcgVVJMcyB3aXRob3V0IHJldmlzaW9uIGAgK1xuICAgICAgICAgICAgICAgICAgICBgaW5mbzogJHt1cmxzVG9XYXJuQWJvdXQuam9pbignLCAnKX1cXG5UaGlzIGlzIGdlbmVyYWxseSBOT1Qgc2FmZS4gYCArXG4gICAgICAgICAgICAgICAgICAgIGBMZWFybiBtb3JlIGF0IGh0dHBzOi8vYml0Lmx5L3diLXByZWNhY2hlYDtcbiAgICAgICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBVc2UgY29uc29sZSBkaXJlY3RseSB0byBkaXNwbGF5IHRoaXMgd2FybmluZyB3aXRob3V0IGJsb2F0aW5nXG4gICAgICAgICAgICAgICAgICAgIC8vIGJ1bmRsZSBzaXplcyBieSBwdWxsaW5nIGluIGFsbCBvZiB0aGUgbG9nZ2VyIGNvZGViYXNlIGluIHByb2QuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2Fybih3YXJuaW5nTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsb2dnZXIud2Fybih3YXJuaW5nTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFByZWNhY2hlcyBuZXcgYW5kIHVwZGF0ZWQgYXNzZXRzLiBDYWxsIHRoaXMgbWV0aG9kIGZyb20gdGhlIHNlcnZpY2Ugd29ya2VyXG4gICAgICogaW5zdGFsbCBldmVudC5cbiAgICAgKlxuICAgICAqIE5vdGU6IHRoaXMgbWV0aG9kIGNhbGxzIGBldmVudC53YWl0VW50aWwoKWAgZm9yIHlvdSwgc28geW91IGRvIG5vdCBuZWVkXG4gICAgICogdG8gY2FsbCBpdCB5b3Vyc2VsZiBpbiB5b3VyIGV2ZW50IGhhbmRsZXJzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFeHRlbmRhYmxlRXZlbnR9IGV2ZW50XG4gICAgICogQHJldHVybiB7UHJvbWlzZTx3b3JrYm94LXByZWNhY2hpbmcuSW5zdGFsbFJlc3VsdD59XG4gICAgICovXG4gICAgaW5zdGFsbChldmVudCkge1xuICAgICAgICAvLyB3YWl0VW50aWwgcmV0dXJucyBQcm9taXNlPGFueT5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtcmV0dXJuXG4gICAgICAgIHJldHVybiB3YWl0VW50aWwoZXZlbnQsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGluc3RhbGxSZXBvcnRQbHVnaW4gPSBuZXcgUHJlY2FjaGVJbnN0YWxsUmVwb3J0UGx1Z2luKCk7XG4gICAgICAgICAgICB0aGlzLnN0cmF0ZWd5LnBsdWdpbnMucHVzaChpbnN0YWxsUmVwb3J0UGx1Z2luKTtcbiAgICAgICAgICAgIC8vIENhY2hlIGVudHJpZXMgb25lIGF0IGEgdGltZS5cbiAgICAgICAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3dvcmtib3gvaXNzdWVzLzI1MjhcbiAgICAgICAgICAgIGZvciAoY29uc3QgW3VybCwgY2FjaGVLZXldIG9mIHRoaXMuX3VybHNUb0NhY2hlS2V5cykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGludGVncml0eSA9IHRoaXMuX2NhY2hlS2V5c1RvSW50ZWdyaXRpZXMuZ2V0KGNhY2hlS2V5KTtcbiAgICAgICAgICAgICAgICBjb25zdCBjYWNoZU1vZGUgPSB0aGlzLl91cmxzVG9DYWNoZU1vZGVzLmdldCh1cmwpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdCh1cmwsIHtcbiAgICAgICAgICAgICAgICAgICAgaW50ZWdyaXR5LFxuICAgICAgICAgICAgICAgICAgICBjYWNoZTogY2FjaGVNb2RlLFxuICAgICAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBhd2FpdCBQcm9taXNlLmFsbCh0aGlzLnN0cmF0ZWd5LmhhbmRsZUFsbCh7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogeyBjYWNoZUtleSB9LFxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LFxuICAgICAgICAgICAgICAgICAgICBldmVudCxcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB7IHVwZGF0ZWRVUkxzLCBub3RVcGRhdGVkVVJMcyB9ID0gaW5zdGFsbFJlcG9ydFBsdWdpbjtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgcHJpbnRJbnN0YWxsRGV0YWlscyh1cGRhdGVkVVJMcywgbm90VXBkYXRlZFVSTHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgdXBkYXRlZFVSTHMsIG5vdFVwZGF0ZWRVUkxzIH07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWxldGVzIGFzc2V0cyB0aGF0IGFyZSBubyBsb25nZXIgcHJlc2VudCBpbiB0aGUgY3VycmVudCBwcmVjYWNoZSBtYW5pZmVzdC5cbiAgICAgKiBDYWxsIHRoaXMgbWV0aG9kIGZyb20gdGhlIHNlcnZpY2Ugd29ya2VyIGFjdGl2YXRlIGV2ZW50LlxuICAgICAqXG4gICAgICogTm90ZTogdGhpcyBtZXRob2QgY2FsbHMgYGV2ZW50LndhaXRVbnRpbCgpYCBmb3IgeW91LCBzbyB5b3UgZG8gbm90IG5lZWRcbiAgICAgKiB0byBjYWxsIGl0IHlvdXJzZWxmIGluIHlvdXIgZXZlbnQgaGFuZGxlcnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V4dGVuZGFibGVFdmVudH0gZXZlbnRcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPHdvcmtib3gtcHJlY2FjaGluZy5DbGVhbnVwUmVzdWx0Pn1cbiAgICAgKi9cbiAgICBhY3RpdmF0ZShldmVudCkge1xuICAgICAgICAvLyB3YWl0VW50aWwgcmV0dXJucyBQcm9taXNlPGFueT5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtcmV0dXJuXG4gICAgICAgIHJldHVybiB3YWl0VW50aWwoZXZlbnQsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNhY2hlID0gYXdhaXQgc2VsZi5jYWNoZXMub3Blbih0aGlzLnN0cmF0ZWd5LmNhY2hlTmFtZSk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50bHlDYWNoZWRSZXF1ZXN0cyA9IGF3YWl0IGNhY2hlLmtleXMoKTtcbiAgICAgICAgICAgIGNvbnN0IGV4cGVjdGVkQ2FjaGVLZXlzID0gbmV3IFNldCh0aGlzLl91cmxzVG9DYWNoZUtleXMudmFsdWVzKCkpO1xuICAgICAgICAgICAgY29uc3QgZGVsZXRlZFVSTHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcmVxdWVzdCBvZiBjdXJyZW50bHlDYWNoZWRSZXF1ZXN0cykge1xuICAgICAgICAgICAgICAgIGlmICghZXhwZWN0ZWRDYWNoZUtleXMuaGFzKHJlcXVlc3QudXJsKSkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBjYWNoZS5kZWxldGUocmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZWRVUkxzLnB1c2gocmVxdWVzdC51cmwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgcHJpbnRDbGVhbnVwRGV0YWlscyhkZWxldGVkVVJMcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyBkZWxldGVkVVJMcyB9O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIG1hcHBpbmcgb2YgYSBwcmVjYWNoZWQgVVJMIHRvIHRoZSBjb3JyZXNwb25kaW5nIGNhY2hlIGtleSwgdGFraW5nXG4gICAgICogaW50byBhY2NvdW50IHRoZSByZXZpc2lvbiBpbmZvcm1hdGlvbiBmb3IgdGhlIFVSTC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge01hcDxzdHJpbmcsIHN0cmluZz59IEEgVVJMIHRvIGNhY2hlIGtleSBtYXBwaW5nLlxuICAgICAqL1xuICAgIGdldFVSTHNUb0NhY2hlS2V5cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VybHNUb0NhY2hlS2V5cztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YgYWxsIHRoZSBVUkxzIHRoYXQgaGF2ZSBiZWVuIHByZWNhY2hlZCBieSB0aGUgY3VycmVudFxuICAgICAqIHNlcnZpY2Ugd29ya2VyLlxuICAgICAqXG4gICAgICogQHJldHVybiB7QXJyYXk8c3RyaW5nPn0gVGhlIHByZWNhY2hlZCBVUkxzLlxuICAgICAqL1xuICAgIGdldENhY2hlZFVSTHMoKSB7XG4gICAgICAgIHJldHVybiBbLi4udGhpcy5fdXJsc1RvQ2FjaGVLZXlzLmtleXMoKV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNhY2hlIGtleSB1c2VkIGZvciBzdG9yaW5nIGEgZ2l2ZW4gVVJMLiBJZiB0aGF0IFVSTCBpc1xuICAgICAqIHVudmVyc2lvbmVkLCBsaWtlIGAvaW5kZXguaHRtbCcsIHRoZW4gdGhlIGNhY2hlIGtleSB3aWxsIGJlIHRoZSBvcmlnaW5hbFxuICAgICAqIFVSTCB3aXRoIGEgc2VhcmNoIHBhcmFtZXRlciBhcHBlbmRlZCB0byBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgQSBVUkwgd2hvc2UgY2FjaGUga2V5IHlvdSB3YW50IHRvIGxvb2sgdXAuXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgdmVyc2lvbmVkIFVSTCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEgY2FjaGUga2V5XG4gICAgICogZm9yIHRoZSBvcmlnaW5hbCBVUkwsIG9yIHVuZGVmaW5lZCBpZiB0aGF0IFVSTCBpc24ndCBwcmVjYWNoZWQuXG4gICAgICovXG4gICAgZ2V0Q2FjaGVLZXlGb3JVUkwodXJsKSB7XG4gICAgICAgIGNvbnN0IHVybE9iamVjdCA9IG5ldyBVUkwodXJsLCBsb2NhdGlvbi5ocmVmKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VybHNUb0NhY2hlS2V5cy5nZXQodXJsT2JqZWN0LmhyZWYpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIEEgY2FjaGUga2V5IHdob3NlIFNSSSB5b3Ugd2FudCB0byBsb29rIHVwLlxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHN1YnJlc291cmNlIGludGVncml0eSBhc3NvY2lhdGVkIHdpdGggdGhlIGNhY2hlIGtleSxcbiAgICAgKiBvciB1bmRlZmluZWQgaWYgaXQncyBub3Qgc2V0LlxuICAgICAqL1xuICAgIGdldEludGVncml0eUZvckNhY2hlS2V5KGNhY2hlS2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZUtleXNUb0ludGVncml0aWVzLmdldChjYWNoZUtleSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoaXMgYWN0cyBhcyBhIGRyb3AtaW4gcmVwbGFjZW1lbnQgZm9yXG4gICAgICogW2BjYWNoZS5tYXRjaCgpYF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0NhY2hlL21hdGNoKVxuICAgICAqIHdpdGggdGhlIGZvbGxvd2luZyBkaWZmZXJlbmNlczpcbiAgICAgKlxuICAgICAqIC0gSXQga25vd3Mgd2hhdCB0aGUgbmFtZSBvZiB0aGUgcHJlY2FjaGUgaXMsIGFuZCBvbmx5IGNoZWNrcyBpbiB0aGF0IGNhY2hlLlxuICAgICAqIC0gSXQgYWxsb3dzIHlvdSB0byBwYXNzIGluIGFuIFwib3JpZ2luYWxcIiBVUkwgd2l0aG91dCB2ZXJzaW9uaW5nIHBhcmFtZXRlcnMsXG4gICAgICogYW5kIGl0IHdpbGwgYXV0b21hdGljYWxseSBsb29rIHVwIHRoZSBjb3JyZWN0IGNhY2hlIGtleSBmb3IgdGhlIGN1cnJlbnRseVxuICAgICAqIGFjdGl2ZSByZXZpc2lvbiBvZiB0aGF0IFVSTC5cbiAgICAgKlxuICAgICAqIEUuZy4sIGBtYXRjaFByZWNhY2hlKCdpbmRleC5odG1sJylgIHdpbGwgZmluZCB0aGUgY29ycmVjdCBwcmVjYWNoZWRcbiAgICAgKiByZXNwb25zZSBmb3IgdGhlIGN1cnJlbnRseSBhY3RpdmUgc2VydmljZSB3b3JrZXIsIGV2ZW4gaWYgdGhlIGFjdHVhbCBjYWNoZVxuICAgICAqIGtleSBpcyBgJy9pbmRleC5odG1sP19fV0JfUkVWSVNJT05fXz0xMjM0YWJjZCdgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd8UmVxdWVzdH0gcmVxdWVzdCBUaGUga2V5ICh3aXRob3V0IHJldmlzaW9uaW5nIHBhcmFtZXRlcnMpXG4gICAgICogdG8gbG9vayB1cCBpbiB0aGUgcHJlY2FjaGUuXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxSZXNwb25zZXx1bmRlZmluZWQ+fVxuICAgICAqL1xuICAgIGFzeW5jIG1hdGNoUHJlY2FjaGUocmVxdWVzdCkge1xuICAgICAgICBjb25zdCB1cmwgPSByZXF1ZXN0IGluc3RhbmNlb2YgUmVxdWVzdCA/IHJlcXVlc3QudXJsIDogcmVxdWVzdDtcbiAgICAgICAgY29uc3QgY2FjaGVLZXkgPSB0aGlzLmdldENhY2hlS2V5Rm9yVVJMKHVybCk7XG4gICAgICAgIGlmIChjYWNoZUtleSkge1xuICAgICAgICAgICAgY29uc3QgY2FjaGUgPSBhd2FpdCBzZWxmLmNhY2hlcy5vcGVuKHRoaXMuc3RyYXRlZ3kuY2FjaGVOYW1lKTtcbiAgICAgICAgICAgIHJldHVybiBjYWNoZS5tYXRjaChjYWNoZUtleSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgbG9va3MgdXAgYHVybGAgaW4gdGhlIHByZWNhY2hlICh0YWtpbmcgaW50b1xuICAgICAqIGFjY291bnQgcmV2aXNpb24gaW5mb3JtYXRpb24pLCBhbmQgcmV0dXJucyB0aGUgY29ycmVzcG9uZGluZyBgUmVzcG9uc2VgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgcHJlY2FjaGVkIFVSTCB3aGljaCB3aWxsIGJlIHVzZWQgdG8gbG9va3VwIHRoZVxuICAgICAqIGBSZXNwb25zZWAuXG4gICAgICogQHJldHVybiB7d29ya2JveC1yb3V0aW5nfmhhbmRsZXJDYWxsYmFja31cbiAgICAgKi9cbiAgICBjcmVhdGVIYW5kbGVyQm91bmRUb1VSTCh1cmwpIHtcbiAgICAgICAgY29uc3QgY2FjaGVLZXkgPSB0aGlzLmdldENhY2hlS2V5Rm9yVVJMKHVybCk7XG4gICAgICAgIGlmICghY2FjaGVLZXkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBXb3JrYm94RXJyb3IoJ25vbi1wcmVjYWNoZWQtdXJsJywgeyB1cmwgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChvcHRpb25zKSA9PiB7XG4gICAgICAgICAgICBvcHRpb25zLnJlcXVlc3QgPSBuZXcgUmVxdWVzdCh1cmwpO1xuICAgICAgICAgICAgb3B0aW9ucy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHsgY2FjaGVLZXkgfSwgb3B0aW9ucy5wYXJhbXMpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RyYXRlZ3kuaGFuZGxlKG9wdGlvbnMpO1xuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydCB7IFByZWNhY2hlQ29udHJvbGxlciB9O1xuIiwgIi8qXG4gIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IFByZWNhY2hlQ29udHJvbGxlciB9IGZyb20gJy4uL1ByZWNhY2hlQ29udHJvbGxlci5qcyc7XG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbmxldCBwcmVjYWNoZUNvbnRyb2xsZXI7XG4vKipcbiAqIEByZXR1cm4ge1ByZWNhY2hlQ29udHJvbGxlcn1cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRPckNyZWF0ZVByZWNhY2hlQ29udHJvbGxlciA9ICgpID0+IHtcbiAgICBpZiAoIXByZWNhY2hlQ29udHJvbGxlcikge1xuICAgICAgICBwcmVjYWNoZUNvbnRyb2xsZXIgPSBuZXcgUHJlY2FjaGVDb250cm9sbGVyKCk7XG4gICAgfVxuICAgIHJldHVybiBwcmVjYWNoZUNvbnRyb2xsZXI7XG59O1xuIiwgIlwidXNlIHN0cmljdFwiO1xuLy8gQHRzLWlnbm9yZVxudHJ5IHtcbiAgICBzZWxmWyd3b3JrYm94OnJvdXRpbmc6Ni41LjMnXSAmJiBfKCk7XG59XG5jYXRjaCAoZSkgeyB9XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0ICcuLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIFRoZSBkZWZhdWx0IEhUVFAgbWV0aG9kLCAnR0VUJywgdXNlZCB3aGVuIHRoZXJlJ3Mgbm8gc3BlY2lmaWMgbWV0aG9kXG4gKiBjb25maWd1cmVkIGZvciBhIHJvdXRlLlxuICpcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRNZXRob2QgPSAnR0VUJztcbi8qKlxuICogVGhlIGxpc3Qgb2YgdmFsaWQgSFRUUCBtZXRob2RzIGFzc29jaWF0ZWQgd2l0aCByZXF1ZXN0cyB0aGF0IGNvdWxkIGJlIHJvdXRlZC5cbiAqXG4gKiBAdHlwZSB7QXJyYXk8c3RyaW5nPn1cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgdmFsaWRNZXRob2RzID0gW1xuICAgICdERUxFVEUnLFxuICAgICdHRVQnLFxuICAgICdIRUFEJyxcbiAgICAnUEFUQ0gnLFxuICAgICdQT1NUJyxcbiAgICAnUFVUJyxcbl07XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2Fzc2VydC5qcyc7XG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbi8qKlxuICogQHBhcmFtIHtmdW5jdGlvbigpfE9iamVjdH0gaGFuZGxlciBFaXRoZXIgYSBmdW5jdGlvbiwgb3IgYW4gb2JqZWN0IHdpdGggYVxuICogJ2hhbmRsZScgbWV0aG9kLlxuICogQHJldHVybiB7T2JqZWN0fSBBbiBvYmplY3Qgd2l0aCBhIGhhbmRsZSBtZXRob2QuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUhhbmRsZXIgPSAoaGFuZGxlcikgPT4ge1xuICAgIGlmIChoYW5kbGVyICYmIHR5cGVvZiBoYW5kbGVyID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgYXNzZXJ0Lmhhc01ldGhvZChoYW5kbGVyLCAnaGFuZGxlJywge1xuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LXJvdXRpbmcnLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ1JvdXRlJyxcbiAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ2NvbnN0cnVjdG9yJyxcbiAgICAgICAgICAgICAgICBwYXJhbU5hbWU6ICdoYW5kbGVyJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoYW5kbGVyO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGFzc2VydC5pc1R5cGUoaGFuZGxlciwgJ2Z1bmN0aW9uJywge1xuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LXJvdXRpbmcnLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ1JvdXRlJyxcbiAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ2NvbnN0cnVjdG9yJyxcbiAgICAgICAgICAgICAgICBwYXJhbU5hbWU6ICdoYW5kbGVyJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGhhbmRsZTogaGFuZGxlciB9O1xuICAgIH1cbn07XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2Fzc2VydC5qcyc7XG5pbXBvcnQgeyBkZWZhdWx0TWV0aG9kLCB2YWxpZE1ldGhvZHMgfSBmcm9tICcuL3V0aWxzL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgeyBub3JtYWxpemVIYW5kbGVyIH0gZnJvbSAnLi91dGlscy9ub3JtYWxpemVIYW5kbGVyLmpzJztcbmltcG9ydCAnLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIEEgYFJvdXRlYCBjb25zaXN0cyBvZiBhIHBhaXIgb2YgY2FsbGJhY2sgZnVuY3Rpb25zLCBcIm1hdGNoXCIgYW5kIFwiaGFuZGxlclwiLlxuICogVGhlIFwibWF0Y2hcIiBjYWxsYmFjayBkZXRlcm1pbmUgaWYgYSByb3V0ZSBzaG91bGQgYmUgdXNlZCB0byBcImhhbmRsZVwiIGFcbiAqIHJlcXVlc3QgYnkgcmV0dXJuaW5nIGEgbm9uLWZhbHN5IHZhbHVlIGlmIGl0IGNhbi4gVGhlIFwiaGFuZGxlclwiIGNhbGxiYWNrXG4gKiBpcyBjYWxsZWQgd2hlbiB0aGVyZSBpcyBhIG1hdGNoIGFuZCBzaG91bGQgcmV0dXJuIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzXG4gKiB0byBhIGBSZXNwb25zZWAuXG4gKlxuICogQG1lbWJlcm9mIHdvcmtib3gtcm91dGluZ1xuICovXG5jbGFzcyBSb3V0ZSB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3IgZm9yIFJvdXRlIGNsYXNzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHt3b3JrYm94LXJvdXRpbmd+bWF0Y2hDYWxsYmFja30gbWF0Y2hcbiAgICAgKiBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgZGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSByb3V0ZSBtYXRjaGVzIGEgZ2l2ZW5cbiAgICAgKiBgZmV0Y2hgIGV2ZW50IGJ5IHJldHVybmluZyBhIG5vbi1mYWxzeSB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge3dvcmtib3gtcm91dGluZ35oYW5kbGVyQ2FsbGJhY2t9IGhhbmRsZXIgQSBjYWxsYmFja1xuICAgICAqIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIFByb21pc2UgcmVzb2x2aW5nIHRvIGEgUmVzcG9uc2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFttZXRob2Q9J0dFVCddIFRoZSBIVFRQIG1ldGhvZCB0byBtYXRjaCB0aGUgUm91dGVcbiAgICAgKiBhZ2FpbnN0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG1hdGNoLCBoYW5kbGVyLCBtZXRob2QgPSBkZWZhdWx0TWV0aG9kKSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBhc3NlcnQuaXNUeXBlKG1hdGNoLCAnZnVuY3Rpb24nLCB7XG4gICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtcm91dGluZycsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnUm91dGUnLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAnY29uc3RydWN0b3InLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ21hdGNoJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG1ldGhvZCkge1xuICAgICAgICAgICAgICAgIGFzc2VydC5pc09uZU9mKG1ldGhvZCwgdmFsaWRNZXRob2RzLCB7IHBhcmFtTmFtZTogJ21ldGhvZCcgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhlc2UgdmFsdWVzIGFyZSByZWZlcmVuY2VkIGRpcmVjdGx5IGJ5IFJvdXRlciBzbyBjYW5ub3QgYmVcbiAgICAgICAgLy8gYWx0ZXJlZCBieSBtaW5pZmljYXRvbi5cbiAgICAgICAgdGhpcy5oYW5kbGVyID0gbm9ybWFsaXplSGFuZGxlcihoYW5kbGVyKTtcbiAgICAgICAgdGhpcy5tYXRjaCA9IG1hdGNoO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3dvcmtib3gtcm91dGluZy1oYW5kbGVyQ2FsbGJhY2t9IGhhbmRsZXIgQSBjYWxsYmFja1xuICAgICAqIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIFByb21pc2UgcmVzb2x2aW5nIHRvIGEgUmVzcG9uc2VcbiAgICAgKi9cbiAgICBzZXRDYXRjaEhhbmRsZXIoaGFuZGxlcikge1xuICAgICAgICB0aGlzLmNhdGNoSGFuZGxlciA9IG5vcm1hbGl6ZUhhbmRsZXIoaGFuZGxlcik7XG4gICAgfVxufVxuZXhwb3J0IHsgUm91dGUgfTtcbiIsICIvKlxuICBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvYXNzZXJ0LmpzJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9sb2dnZXIuanMnO1xuaW1wb3J0IHsgUm91dGUgfSBmcm9tICcuL1JvdXRlLmpzJztcbmltcG9ydCAnLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIFJlZ0V4cFJvdXRlIG1ha2VzIGl0IGVhc3kgdG8gY3JlYXRlIGEgcmVndWxhciBleHByZXNzaW9uIGJhc2VkXG4gKiB7QGxpbmsgd29ya2JveC1yb3V0aW5nLlJvdXRlfS5cbiAqXG4gKiBGb3Igc2FtZS1vcmlnaW4gcmVxdWVzdHMgdGhlIFJlZ0V4cCBvbmx5IG5lZWRzIHRvIG1hdGNoIHBhcnQgb2YgdGhlIFVSTC4gRm9yXG4gKiByZXF1ZXN0cyBhZ2FpbnN0IHRoaXJkLXBhcnR5IHNlcnZlcnMsIHlvdSBtdXN0IGRlZmluZSBhIFJlZ0V4cCB0aGF0IG1hdGNoZXNcbiAqIHRoZSBzdGFydCBvZiB0aGUgVVJMLlxuICpcbiAqIEBtZW1iZXJvZiB3b3JrYm94LXJvdXRpbmdcbiAqIEBleHRlbmRzIHdvcmtib3gtcm91dGluZy5Sb3V0ZVxuICovXG5jbGFzcyBSZWdFeHBSb3V0ZSBleHRlbmRzIFJvdXRlIHtcbiAgICAvKipcbiAgICAgKiBJZiB0aGUgcmVndWxhciBleHByZXNzaW9uIGNvbnRhaW5zXG4gICAgICogW2NhcHR1cmUgZ3JvdXBzXXtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9SZWdFeHAjZ3JvdXBpbmctYmFjay1yZWZlcmVuY2VzfSxcbiAgICAgKiB0aGUgY2FwdHVyZWQgdmFsdWVzIHdpbGwgYmUgcGFzc2VkIHRvIHRoZVxuICAgICAqIHtAbGluayB3b3JrYm94LXJvdXRpbmd+aGFuZGxlckNhbGxiYWNrfSBgcGFyYW1zYFxuICAgICAqIGFyZ3VtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZWdFeHB9IHJlZ0V4cCBUaGUgcmVndWxhciBleHByZXNzaW9uIHRvIG1hdGNoIGFnYWluc3QgVVJMcy5cbiAgICAgKiBAcGFyYW0ge3dvcmtib3gtcm91dGluZ35oYW5kbGVyQ2FsbGJhY2t9IGhhbmRsZXIgQSBjYWxsYmFja1xuICAgICAqIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIFByb21pc2UgcmVzdWx0aW5nIGluIGEgUmVzcG9uc2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFttZXRob2Q9J0dFVCddIFRoZSBIVFRQIG1ldGhvZCB0byBtYXRjaCB0aGUgUm91dGVcbiAgICAgKiBhZ2FpbnN0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlZ0V4cCwgaGFuZGxlciwgbWV0aG9kKSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBhc3NlcnQuaXNJbnN0YW5jZShyZWdFeHAsIFJlZ0V4cCwge1xuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LXJvdXRpbmcnLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ1JlZ0V4cFJvdXRlJyxcbiAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ2NvbnN0cnVjdG9yJyxcbiAgICAgICAgICAgICAgICBwYXJhbU5hbWU6ICdwYXR0ZXJuJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1hdGNoID0gKHsgdXJsIH0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZ0V4cC5leGVjKHVybC5ocmVmKTtcbiAgICAgICAgICAgIC8vIFJldHVybiBpbW1lZGlhdGVseSBpZiB0aGVyZSdzIG5vIG1hdGNoLlxuICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBSZXF1aXJlIHRoYXQgdGhlIG1hdGNoIHN0YXJ0IGF0IHRoZSBmaXJzdCBjaGFyYWN0ZXIgaW4gdGhlIFVSTCBzdHJpbmdcbiAgICAgICAgICAgIC8vIGlmIGl0J3MgYSBjcm9zcy1vcmlnaW4gcmVxdWVzdC5cbiAgICAgICAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3dvcmtib3gvaXNzdWVzLzI4MSBmb3IgdGhlIGNvbnRleHRcbiAgICAgICAgICAgIC8vIGJlaGluZCB0aGlzIGJlaGF2aW9yLlxuICAgICAgICAgICAgaWYgKHVybC5vcmlnaW4gIT09IGxvY2F0aW9uLm9yaWdpbiAmJiByZXN1bHQuaW5kZXggIT09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoYFRoZSByZWd1bGFyIGV4cHJlc3Npb24gJyR7cmVnRXhwLnRvU3RyaW5nKCl9JyBvbmx5IHBhcnRpYWxseSBtYXRjaGVkIGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYGFnYWluc3QgdGhlIGNyb3NzLW9yaWdpbiBVUkwgJyR7dXJsLnRvU3RyaW5nKCl9Jy4gUmVnRXhwUm91dGUncyB3aWxsIG9ubHkgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgaGFuZGxlIGNyb3NzLW9yaWdpbiByZXF1ZXN0cyBpZiB0aGV5IG1hdGNoIHRoZSBlbnRpcmUgVVJMLmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiB0aGUgcm91dGUgbWF0Y2hlcywgYnV0IHRoZXJlIGFyZW4ndCBhbnkgY2FwdHVyZSBncm91cHMgZGVmaW5lZCwgdGhlblxuICAgICAgICAgICAgLy8gdGhpcyB3aWxsIHJldHVybiBbXSwgd2hpY2ggaXMgdHJ1dGh5IGFuZCB0aGVyZWZvcmUgc3VmZmljaWVudCB0b1xuICAgICAgICAgICAgLy8gaW5kaWNhdGUgYSBtYXRjaC5cbiAgICAgICAgICAgIC8vIElmIHRoZXJlIGFyZSBjYXB0dXJlIGdyb3VwcywgdGhlbiBpdCB3aWxsIHJldHVybiB0aGVpciB2YWx1ZXMuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LnNsaWNlKDEpO1xuICAgICAgICB9O1xuICAgICAgICBzdXBlcihtYXRjaCwgaGFuZGxlciwgbWV0aG9kKTtcbiAgICB9XG59XG5leHBvcnQgeyBSZWdFeHBSb3V0ZSB9O1xuIiwgIi8qXG4gIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9hc3NlcnQuanMnO1xuaW1wb3J0IHsgZ2V0RnJpZW5kbHlVUkwgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvZ2V0RnJpZW5kbHlVUkwuanMnO1xuaW1wb3J0IHsgZGVmYXVsdE1ldGhvZCB9IGZyb20gJy4vdXRpbHMvY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9sb2dnZXIuanMnO1xuaW1wb3J0IHsgbm9ybWFsaXplSGFuZGxlciB9IGZyb20gJy4vdXRpbHMvbm9ybWFsaXplSGFuZGxlci5qcyc7XG5pbXBvcnQgeyBXb3JrYm94RXJyb3IgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvV29ya2JveEVycm9yLmpzJztcbmltcG9ydCAnLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIFRoZSBSb3V0ZXIgY2FuIGJlIHVzZWQgdG8gcHJvY2VzcyBhIGBGZXRjaEV2ZW50YCB1c2luZyBvbmUgb3IgbW9yZVxuICoge0BsaW5rIHdvcmtib3gtcm91dGluZy5Sb3V0ZX0sIHJlc3BvbmRpbmcgd2l0aCBhIGBSZXNwb25zZWAgaWZcbiAqIGEgbWF0Y2hpbmcgcm91dGUgZXhpc3RzLlxuICpcbiAqIElmIG5vIHJvdXRlIG1hdGNoZXMgYSBnaXZlbiBhIHJlcXVlc3QsIHRoZSBSb3V0ZXIgd2lsbCB1c2UgYSBcImRlZmF1bHRcIlxuICogaGFuZGxlciBpZiBvbmUgaXMgZGVmaW5lZC5cbiAqXG4gKiBTaG91bGQgdGhlIG1hdGNoaW5nIFJvdXRlIHRocm93IGFuIGVycm9yLCB0aGUgUm91dGVyIHdpbGwgdXNlIGEgXCJjYXRjaFwiXG4gKiBoYW5kbGVyIGlmIG9uZSBpcyBkZWZpbmVkIHRvIGdyYWNlZnVsbHkgZGVhbCB3aXRoIGlzc3VlcyBhbmQgcmVzcG9uZCB3aXRoIGFcbiAqIFJlcXVlc3QuXG4gKlxuICogSWYgYSByZXF1ZXN0IG1hdGNoZXMgbXVsdGlwbGUgcm91dGVzLCB0aGUgKiplYXJsaWVzdCoqIHJlZ2lzdGVyZWQgcm91dGUgd2lsbFxuICogYmUgdXNlZCB0byByZXNwb25kIHRvIHRoZSByZXF1ZXN0LlxuICpcbiAqIEBtZW1iZXJvZiB3b3JrYm94LXJvdXRpbmdcbiAqL1xuY2xhc3MgUm91dGVyIHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBSb3V0ZXIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX3JvdXRlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5fZGVmYXVsdEhhbmRsZXJNYXAgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge01hcDxzdHJpbmcsIEFycmF5PHdvcmtib3gtcm91dGluZy5Sb3V0ZT4+fSByb3V0ZXMgQSBgTWFwYCBvZiBIVFRQXG4gICAgICogbWV0aG9kIG5hbWUgKCdHRVQnLCBldGMuKSB0byBhbiBhcnJheSBvZiBhbGwgdGhlIGNvcnJlc3BvbmRpbmcgYFJvdXRlYFxuICAgICAqIGluc3RhbmNlcyB0aGF0IGFyZSByZWdpc3RlcmVkLlxuICAgICAqL1xuICAgIGdldCByb3V0ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yb3V0ZXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBmZXRjaCBldmVudCBsaXN0ZW5lciB0byByZXNwb25kIHRvIGV2ZW50cyB3aGVuIGEgcm91dGUgbWF0Y2hlc1xuICAgICAqIHRoZSBldmVudCdzIHJlcXVlc3QuXG4gICAgICovXG4gICAgYWRkRmV0Y2hMaXN0ZW5lcigpIHtcbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMjgzNTcjaXNzdWVjb21tZW50LTQzNjQ4NDcwNVxuICAgICAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2ZldGNoJywgKChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyByZXF1ZXN0IH0gPSBldmVudDtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlUHJvbWlzZSA9IHRoaXMuaGFuZGxlUmVxdWVzdCh7IHJlcXVlc3QsIGV2ZW50IH0pO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnJlc3BvbmRXaXRoKHJlc3BvbnNlUHJvbWlzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIG1lc3NhZ2UgZXZlbnQgbGlzdGVuZXIgZm9yIFVSTHMgdG8gY2FjaGUgZnJvbSB0aGUgd2luZG93LlxuICAgICAqIFRoaXMgaXMgdXNlZnVsIHRvIGNhY2hlIHJlc291cmNlcyBsb2FkZWQgb24gdGhlIHBhZ2UgcHJpb3IgdG8gd2hlbiB0aGVcbiAgICAgKiBzZXJ2aWNlIHdvcmtlciBzdGFydGVkIGNvbnRyb2xsaW5nIGl0LlxuICAgICAqXG4gICAgICogVGhlIGZvcm1hdCBvZiB0aGUgbWVzc2FnZSBkYXRhIHNlbnQgZnJvbSB0aGUgd2luZG93IHNob3VsZCBiZSBhcyBmb2xsb3dzLlxuICAgICAqIFdoZXJlIHRoZSBgdXJsc1RvQ2FjaGVgIGFycmF5IG1heSBjb25zaXN0IG9mIFVSTCBzdHJpbmdzIG9yIGFuIGFycmF5IG9mXG4gICAgICogVVJMIHN0cmluZyArIGByZXF1ZXN0SW5pdGAgb2JqZWN0ICh0aGUgc2FtZSBhcyB5b3UnZCBwYXNzIHRvIGBmZXRjaCgpYCkuXG4gICAgICpcbiAgICAgKiBgYGBcbiAgICAgKiB7XG4gICAgICogICB0eXBlOiAnQ0FDSEVfVVJMUycsXG4gICAgICogICBwYXlsb2FkOiB7XG4gICAgICogICAgIHVybHNUb0NhY2hlOiBbXG4gICAgICogICAgICAgJy4vc2NyaXB0MS5qcycsXG4gICAgICogICAgICAgJy4vc2NyaXB0Mi5qcycsXG4gICAgICogICAgICAgWycuL3NjcmlwdDMuanMnLCB7bW9kZTogJ25vLWNvcnMnfV0sXG4gICAgICogICAgIF0sXG4gICAgICogICB9LFxuICAgICAqIH1cbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBhZGRDYWNoZUxpc3RlbmVyKCkge1xuICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8yODM1NyNpc3N1ZWNvbW1lbnQtNDM2NDg0NzA1XG4gICAgICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsICgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIC8vIGV2ZW50LmRhdGEgaXMgdHlwZSAnYW55J1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtbWVtYmVyLWFjY2Vzc1xuICAgICAgICAgICAgaWYgKGV2ZW50LmRhdGEgJiYgZXZlbnQuZGF0YS50eXBlID09PSAnQ0FDSEVfVVJMUycpIHtcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hc3NpZ25tZW50XG4gICAgICAgICAgICAgICAgY29uc3QgeyBwYXlsb2FkIH0gPSBldmVudC5kYXRhO1xuICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgQ2FjaGluZyBVUkxzIGZyb20gdGhlIHdpbmRvd2AsIHBheWxvYWQudXJsc1RvQ2FjaGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByZXF1ZXN0UHJvbWlzZXMgPSBQcm9taXNlLmFsbChwYXlsb2FkLnVybHNUb0NhY2hlLm1hcCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlbnRyeSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5ID0gW2VudHJ5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoLi4uZW50cnkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0KHsgcmVxdWVzdCwgZXZlbnQgfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE8ocGhpbGlwd2FsdG9uKTogVHlwZVNjcmlwdCBlcnJvcnMgd2l0aG91dCB0aGlzIHR5cGVjYXN0IGZvclxuICAgICAgICAgICAgICAgICAgICAvLyBzb21lIHJlYXNvbiAocHJvYmFibHkgYSBidWcpLiBUaGUgcmVhbCB0eXBlIGhlcmUgc2hvdWxkIHdvcmsgYnV0XG4gICAgICAgICAgICAgICAgICAgIC8vIGRvZXNuJ3Q6IGBBcnJheTxQcm9taXNlPFJlc3BvbnNlPiB8IHVuZGVmaW5lZD5gLlxuICAgICAgICAgICAgICAgIH0pKTsgLy8gVHlwZVNjcmlwdFxuICAgICAgICAgICAgICAgIGV2ZW50LndhaXRVbnRpbChyZXF1ZXN0UHJvbWlzZXMpO1xuICAgICAgICAgICAgICAgIC8vIElmIGEgTWVzc2FnZUNoYW5uZWwgd2FzIHVzZWQsIHJlcGx5IHRvIHRoZSBtZXNzYWdlIG9uIHN1Y2Nlc3MuXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnBvcnRzICYmIGV2ZW50LnBvcnRzWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIHZvaWQgcmVxdWVzdFByb21pc2VzLnRoZW4oKCkgPT4gZXZlbnQucG9ydHNbMF0ucG9zdE1lc3NhZ2UodHJ1ZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBcHBseSB0aGUgcm91dGluZyBydWxlcyB0byBhIEZldGNoRXZlbnQgb2JqZWN0IHRvIGdldCBhIFJlc3BvbnNlIGZyb20gYW5cbiAgICAgKiBhcHByb3ByaWF0ZSBSb3V0ZSdzIGhhbmRsZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7UmVxdWVzdH0gb3B0aW9ucy5yZXF1ZXN0IFRoZSByZXF1ZXN0IHRvIGhhbmRsZS5cbiAgICAgKiBAcGFyYW0ge0V4dGVuZGFibGVFdmVudH0gb3B0aW9ucy5ldmVudCBUaGUgZXZlbnQgdGhhdCB0cmlnZ2VyZWQgdGhlXG4gICAgICogICAgIHJlcXVlc3QuXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxSZXNwb25zZT58dW5kZWZpbmVkfSBBIHByb21pc2UgaXMgcmV0dXJuZWQgaWYgYVxuICAgICAqICAgICByZWdpc3RlcmVkIHJvdXRlIGNhbiBoYW5kbGUgdGhlIHJlcXVlc3QuIElmIHRoZXJlIGlzIG5vIG1hdGNoaW5nXG4gICAgICogICAgIHJvdXRlIGFuZCB0aGVyZSdzIG5vIGBkZWZhdWx0SGFuZGxlcmAsIGB1bmRlZmluZWRgIGlzIHJldHVybmVkLlxuICAgICAqL1xuICAgIGhhbmRsZVJlcXVlc3QoeyByZXF1ZXN0LCBldmVudCwgfSkge1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgYXNzZXJ0LmlzSW5zdGFuY2UocmVxdWVzdCwgUmVxdWVzdCwge1xuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LXJvdXRpbmcnLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ1JvdXRlcicsXG4gICAgICAgICAgICAgICAgZnVuY05hbWU6ICdoYW5kbGVSZXF1ZXN0JyxcbiAgICAgICAgICAgICAgICBwYXJhbU5hbWU6ICdvcHRpb25zLnJlcXVlc3QnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChyZXF1ZXN0LnVybCwgbG9jYXRpb24uaHJlZik7XG4gICAgICAgIGlmICghdXJsLnByb3RvY29sLnN0YXJ0c1dpdGgoJ2h0dHAnKSkge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoYFdvcmtib3ggUm91dGVyIG9ubHkgc3VwcG9ydHMgVVJMcyB0aGF0IHN0YXJ0IHdpdGggJ2h0dHAnLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNhbWVPcmlnaW4gPSB1cmwub3JpZ2luID09PSBsb2NhdGlvbi5vcmlnaW47XG4gICAgICAgIGNvbnN0IHsgcGFyYW1zLCByb3V0ZSB9ID0gdGhpcy5maW5kTWF0Y2hpbmdSb3V0ZSh7XG4gICAgICAgICAgICBldmVudCxcbiAgICAgICAgICAgIHJlcXVlc3QsXG4gICAgICAgICAgICBzYW1lT3JpZ2luLFxuICAgICAgICAgICAgdXJsLFxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGhhbmRsZXIgPSByb3V0ZSAmJiByb3V0ZS5oYW5kbGVyO1xuICAgICAgICBjb25zdCBkZWJ1Z01lc3NhZ2VzID0gW107XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGRlYnVnTWVzc2FnZXMucHVzaChbYEZvdW5kIGEgcm91dGUgdG8gaGFuZGxlIHRoaXMgcmVxdWVzdDpgLCByb3V0ZV0pO1xuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVidWdNZXNzYWdlcy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGBQYXNzaW5nIHRoZSBmb2xsb3dpbmcgcGFyYW1zIHRvIHRoZSByb3V0ZSdzIGhhbmRsZXI6YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcyxcbiAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIElmIHdlIGRvbid0IGhhdmUgYSBoYW5kbGVyIGJlY2F1c2UgdGhlcmUgd2FzIG5vIG1hdGNoaW5nIHJvdXRlLCB0aGVuXG4gICAgICAgIC8vIGZhbGwgYmFjayB0byBkZWZhdWx0SGFuZGxlciBpZiB0aGF0J3MgZGVmaW5lZC5cbiAgICAgICAgY29uc3QgbWV0aG9kID0gcmVxdWVzdC5tZXRob2Q7XG4gICAgICAgIGlmICghaGFuZGxlciAmJiB0aGlzLl9kZWZhdWx0SGFuZGxlck1hcC5oYXMobWV0aG9kKSkge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBkZWJ1Z01lc3NhZ2VzLnB1c2goYEZhaWxlZCB0byBmaW5kIGEgbWF0Y2hpbmcgcm91dGUuIEZhbGxpbmcgYCArXG4gICAgICAgICAgICAgICAgICAgIGBiYWNrIHRvIHRoZSBkZWZhdWx0IGhhbmRsZXIgZm9yICR7bWV0aG9kfS5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhhbmRsZXIgPSB0aGlzLl9kZWZhdWx0SGFuZGxlck1hcC5nZXQobWV0aG9kKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWhhbmRsZXIpIHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgLy8gTm8gaGFuZGxlciBzbyBXb3JrYm94IHdpbGwgZG8gbm90aGluZy4gSWYgbG9ncyBpcyBzZXQgb2YgZGVidWdcbiAgICAgICAgICAgICAgICAvLyBpLmUuIHZlcmJvc2UsIHdlIHNob3VsZCBwcmludCBvdXQgdGhpcyBpbmZvcm1hdGlvbi5cbiAgICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoYE5vIHJvdXRlIGZvdW5kIGZvcjogJHtnZXRGcmllbmRseVVSTCh1cmwpfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBXZSBoYXZlIGEgaGFuZGxlciwgbWVhbmluZyBXb3JrYm94IGlzIGdvaW5nIHRvIGhhbmRsZSB0aGUgcm91dGUuXG4gICAgICAgICAgICAvLyBwcmludCB0aGUgcm91dGluZyBkZXRhaWxzIHRvIHRoZSBjb25zb2xlLlxuICAgICAgICAgICAgbG9nZ2VyLmdyb3VwQ29sbGFwc2VkKGBSb3V0ZXIgaXMgcmVzcG9uZGluZyB0bzogJHtnZXRGcmllbmRseVVSTCh1cmwpfWApO1xuICAgICAgICAgICAgZGVidWdNZXNzYWdlcy5mb3JFYWNoKChtc2cpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtc2cpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coLi4ubXNnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2cobXNnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxvZ2dlci5ncm91cEVuZCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFdyYXAgaW4gdHJ5IGFuZCBjYXRjaCBpbiBjYXNlIHRoZSBoYW5kbGUgbWV0aG9kIHRocm93cyBhIHN5bmNocm9ub3VzXG4gICAgICAgIC8vIGVycm9yLiBJdCBzaG91bGQgc3RpbGwgY2FsbGJhY2sgdG8gdGhlIGNhdGNoIGhhbmRsZXIuXG4gICAgICAgIGxldCByZXNwb25zZVByb21pc2U7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXNwb25zZVByb21pc2UgPSBoYW5kbGVyLmhhbmRsZSh7IHVybCwgcmVxdWVzdCwgZXZlbnQsIHBhcmFtcyB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXNwb25zZVByb21pc2UgPSBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEdldCByb3V0ZSdzIGNhdGNoIGhhbmRsZXIsIGlmIGl0IGV4aXN0c1xuICAgICAgICBjb25zdCBjYXRjaEhhbmRsZXIgPSByb3V0ZSAmJiByb3V0ZS5jYXRjaEhhbmRsZXI7XG4gICAgICAgIGlmIChyZXNwb25zZVByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlICYmXG4gICAgICAgICAgICAodGhpcy5fY2F0Y2hIYW5kbGVyIHx8IGNhdGNoSGFuZGxlcikpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlUHJvbWlzZSA9IHJlc3BvbnNlUHJvbWlzZS5jYXRjaChhc3luYyAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUncyBhIHJvdXRlIGNhdGNoIGhhbmRsZXIsIHByb2Nlc3MgdGhhdCBmaXJzdFxuICAgICAgICAgICAgICAgIGlmIChjYXRjaEhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN0aWxsIGluY2x1ZGUgVVJMIGhlcmUgYXMgaXQgd2lsbCBiZSBhc3luYyBmcm9tIHRoZSBjb25zb2xlIGdyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhbmQgbWF5IG5vdCBtYWtlIHNlbnNlIHdpdGhvdXQgdGhlIFVSTFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmdyb3VwQ29sbGFwc2VkKGBFcnJvciB0aHJvd24gd2hlbiByZXNwb25kaW5nIHRvOiBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgICR7Z2V0RnJpZW5kbHlVUkwodXJsKX0uIEZhbGxpbmcgYmFjayB0byByb3V0ZSdzIENhdGNoIEhhbmRsZXIuYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoYEVycm9yIHRocm93biBieTpgLCByb3V0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2dlci5ncm91cEVuZCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgY2F0Y2hIYW5kbGVyLmhhbmRsZSh7IHVybCwgcmVxdWVzdCwgZXZlbnQsIHBhcmFtcyB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoY2F0Y2hFcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYXRjaEVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyID0gY2F0Y2hFcnI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NhdGNoSGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3RpbGwgaW5jbHVkZSBVUkwgaGVyZSBhcyBpdCB3aWxsIGJlIGFzeW5jIGZyb20gdGhlIGNvbnNvbGUgZ3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFuZCBtYXkgbm90IG1ha2Ugc2Vuc2Ugd2l0aG91dCB0aGUgVVJMXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZ3JvdXBDb2xsYXBzZWQoYEVycm9yIHRocm93biB3aGVuIHJlc3BvbmRpbmcgdG86IGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAgJHtnZXRGcmllbmRseVVSTCh1cmwpfS4gRmFsbGluZyBiYWNrIHRvIGdsb2JhbCBDYXRjaCBIYW5kbGVyLmApO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBFcnJvciB0aHJvd24gYnk6YCwgcm91dGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZ3JvdXBFbmQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2F0Y2hIYW5kbGVyLmhhbmRsZSh7IHVybCwgcmVxdWVzdCwgZXZlbnQgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZVByb21pc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrcyBhIHJlcXVlc3QgYW5kIFVSTCAoYW5kIG9wdGlvbmFsbHkgYW4gZXZlbnQpIGFnYWluc3QgdGhlIGxpc3Qgb2ZcbiAgICAgKiByZWdpc3RlcmVkIHJvdXRlcywgYW5kIGlmIHRoZXJlJ3MgYSBtYXRjaCwgcmV0dXJucyB0aGUgY29ycmVzcG9uZGluZ1xuICAgICAqIHJvdXRlIGFsb25nIHdpdGggYW55IHBhcmFtcyBnZW5lcmF0ZWQgYnkgdGhlIG1hdGNoLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge1VSTH0gb3B0aW9ucy51cmxcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuc2FtZU9yaWdpbiBUaGUgcmVzdWx0IG9mIGNvbXBhcmluZyBgdXJsLm9yaWdpbmBcbiAgICAgKiAgICAgYWdhaW5zdCB0aGUgY3VycmVudCBvcmlnaW4uXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0fSBvcHRpb25zLnJlcXVlc3QgVGhlIHJlcXVlc3QgdG8gbWF0Y2guXG4gICAgICogQHBhcmFtIHtFdmVudH0gb3B0aW9ucy5ldmVudCBUaGUgY29ycmVzcG9uZGluZyBldmVudC5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEFuIG9iamVjdCB3aXRoIGByb3V0ZWAgYW5kIGBwYXJhbXNgIHByb3BlcnRpZXMuXG4gICAgICogICAgIFRoZXkgYXJlIHBvcHVsYXRlZCBpZiBhIG1hdGNoaW5nIHJvdXRlIHdhcyBmb3VuZCBvciBgdW5kZWZpbmVkYFxuICAgICAqICAgICBvdGhlcndpc2UuXG4gICAgICovXG4gICAgZmluZE1hdGNoaW5nUm91dGUoeyB1cmwsIHNhbWVPcmlnaW4sIHJlcXVlc3QsIGV2ZW50LCB9KSB7XG4gICAgICAgIGNvbnN0IHJvdXRlcyA9IHRoaXMuX3JvdXRlcy5nZXQocmVxdWVzdC5tZXRob2QpIHx8IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHJvdXRlIG9mIHJvdXRlcykge1xuICAgICAgICAgICAgbGV0IHBhcmFtcztcbiAgICAgICAgICAgIC8vIHJvdXRlLm1hdGNoIHJldHVybnMgdHlwZSBhbnksIG5vdCBwb3NzaWJsZSB0byBjaGFuZ2UgcmlnaHQgbm93LlxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtYXNzaWdubWVudFxuICAgICAgICAgICAgY29uc3QgbWF0Y2hSZXN1bHQgPSByb3V0ZS5tYXRjaCh7IHVybCwgc2FtZU9yaWdpbiwgcmVxdWVzdCwgZXZlbnQgfSk7XG4gICAgICAgICAgICBpZiAobWF0Y2hSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBXYXJuIGRldmVsb3BlcnMgdGhhdCB1c2luZyBhbiBhc3luYyBtYXRjaENhbGxiYWNrIGlzIGFsbW9zdCBhbHdheXNcbiAgICAgICAgICAgICAgICAgICAgLy8gbm90IHRoZSByaWdodCB0aGluZyB0byBkby5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoUmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLndhcm4oYFdoaWxlIHJvdXRpbmcgJHtnZXRGcmllbmRseVVSTCh1cmwpfSwgYW4gYXN5bmMgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYG1hdGNoQ2FsbGJhY2sgZnVuY3Rpb24gd2FzIHVzZWQuIFBsZWFzZSBjb252ZXJ0IHRoZSBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgZm9sbG93aW5nIHJvdXRlIHRvIHVzZSBhIHN5bmNocm9ub3VzIG1hdGNoQ2FsbGJhY2sgZnVuY3Rpb246YCwgcm91dGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3dvcmtib3gvaXNzdWVzLzIwNzlcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hc3NpZ25tZW50XG4gICAgICAgICAgICAgICAgcGFyYW1zID0gbWF0Y2hSZXN1bHQ7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGFyYW1zKSAmJiBwYXJhbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEluc3RlYWQgb2YgcGFzc2luZyBhbiBlbXB0eSBhcnJheSBpbiBhcyBwYXJhbXMsIHVzZSB1bmRlZmluZWQuXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobWF0Y2hSZXN1bHQuY29uc3RydWN0b3IgPT09IE9iamVjdCAmJiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKG1hdGNoUmVzdWx0KS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSW5zdGVhZCBvZiBwYXNzaW5nIGFuIGVtcHR5IG9iamVjdCBpbiBhcyBwYXJhbXMsIHVzZSB1bmRlZmluZWQuXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG1hdGNoUmVzdWx0ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRm9yIHRoZSBib29sZWFuIHZhbHVlIHRydWUgKHJhdGhlciB0aGFuIGp1c3Qgc29tZXRoaW5nIHRydXRoLXkpLFxuICAgICAgICAgICAgICAgICAgICAvLyBkb24ndCBzZXQgcGFyYW1zLlxuICAgICAgICAgICAgICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZS93b3JrYm94L3B1bGwvMjEzNCNpc3N1ZWNvbW1lbnQtNTEzOTI0MzUzXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIGVhcmx5IGlmIGhhdmUgYSBtYXRjaC5cbiAgICAgICAgICAgICAgICByZXR1cm4geyByb3V0ZSwgcGFyYW1zIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgbm8gbWF0Y2ggd2FzIGZvdW5kIGFib3ZlLCByZXR1cm4gYW5kIGVtcHR5IG9iamVjdC5cbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWZpbmUgYSBkZWZhdWx0IGBoYW5kbGVyYCB0aGF0J3MgY2FsbGVkIHdoZW4gbm8gcm91dGVzIGV4cGxpY2l0bHlcbiAgICAgKiBtYXRjaCB0aGUgaW5jb21pbmcgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEVhY2ggSFRUUCBtZXRob2QgKCdHRVQnLCAnUE9TVCcsIGV0Yy4pIGdldHMgaXRzIG93biBkZWZhdWx0IGhhbmRsZXIuXG4gICAgICpcbiAgICAgKiBXaXRob3V0IGEgZGVmYXVsdCBoYW5kbGVyLCB1bm1hdGNoZWQgcmVxdWVzdHMgd2lsbCBnbyBhZ2FpbnN0IHRoZVxuICAgICAqIG5ldHdvcmsgYXMgaWYgdGhlcmUgd2VyZSBubyBzZXJ2aWNlIHdvcmtlciBwcmVzZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHt3b3JrYm94LXJvdXRpbmd+aGFuZGxlckNhbGxiYWNrfSBoYW5kbGVyIEEgY2FsbGJhY2tcbiAgICAgKiBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBQcm9taXNlIHJlc3VsdGluZyBpbiBhIFJlc3BvbnNlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbbWV0aG9kPSdHRVQnXSBUaGUgSFRUUCBtZXRob2QgdG8gYXNzb2NpYXRlIHdpdGggdGhpc1xuICAgICAqIGRlZmF1bHQgaGFuZGxlci4gRWFjaCBtZXRob2QgaGFzIGl0cyBvd24gZGVmYXVsdC5cbiAgICAgKi9cbiAgICBzZXREZWZhdWx0SGFuZGxlcihoYW5kbGVyLCBtZXRob2QgPSBkZWZhdWx0TWV0aG9kKSB7XG4gICAgICAgIHRoaXMuX2RlZmF1bHRIYW5kbGVyTWFwLnNldChtZXRob2QsIG5vcm1hbGl6ZUhhbmRsZXIoaGFuZGxlcikpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJZiBhIFJvdXRlIHRocm93cyBhbiBlcnJvciB3aGlsZSBoYW5kbGluZyBhIHJlcXVlc3QsIHRoaXMgYGhhbmRsZXJgXG4gICAgICogd2lsbCBiZSBjYWxsZWQgYW5kIGdpdmVuIGEgY2hhbmNlIHRvIHByb3ZpZGUgYSByZXNwb25zZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7d29ya2JveC1yb3V0aW5nfmhhbmRsZXJDYWxsYmFja30gaGFuZGxlciBBIGNhbGxiYWNrXG4gICAgICogZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgUHJvbWlzZSByZXN1bHRpbmcgaW4gYSBSZXNwb25zZS5cbiAgICAgKi9cbiAgICBzZXRDYXRjaEhhbmRsZXIoaGFuZGxlcikge1xuICAgICAgICB0aGlzLl9jYXRjaEhhbmRsZXIgPSBub3JtYWxpemVIYW5kbGVyKGhhbmRsZXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgYSByb3V0ZSB3aXRoIHRoZSByb3V0ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3dvcmtib3gtcm91dGluZy5Sb3V0ZX0gcm91dGUgVGhlIHJvdXRlIHRvIHJlZ2lzdGVyLlxuICAgICAqL1xuICAgIHJlZ2lzdGVyUm91dGUocm91dGUpIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGFzc2VydC5pc1R5cGUocm91dGUsICdvYmplY3QnLCB7XG4gICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtcm91dGluZycsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnUm91dGVyJyxcbiAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ3JlZ2lzdGVyUm91dGUnLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ3JvdXRlJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXNzZXJ0Lmhhc01ldGhvZChyb3V0ZSwgJ21hdGNoJywge1xuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LXJvdXRpbmcnLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ1JvdXRlcicsXG4gICAgICAgICAgICAgICAgZnVuY05hbWU6ICdyZWdpc3RlclJvdXRlJyxcbiAgICAgICAgICAgICAgICBwYXJhbU5hbWU6ICdyb3V0ZScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFzc2VydC5pc1R5cGUocm91dGUuaGFuZGxlciwgJ29iamVjdCcsIHtcbiAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1yb3V0aW5nJyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdSb3V0ZXInLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAncmVnaXN0ZXJSb3V0ZScsXG4gICAgICAgICAgICAgICAgcGFyYW1OYW1lOiAncm91dGUnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3NlcnQuaGFzTWV0aG9kKHJvdXRlLmhhbmRsZXIsICdoYW5kbGUnLCB7XG4gICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtcm91dGluZycsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnUm91dGVyJyxcbiAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ3JlZ2lzdGVyUm91dGUnLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ3JvdXRlLmhhbmRsZXInLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3NlcnQuaXNUeXBlKHJvdXRlLm1ldGhvZCwgJ3N0cmluZycsIHtcbiAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1yb3V0aW5nJyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdSb3V0ZXInLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAncmVnaXN0ZXJSb3V0ZScsXG4gICAgICAgICAgICAgICAgcGFyYW1OYW1lOiAncm91dGUubWV0aG9kJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fcm91dGVzLmhhcyhyb3V0ZS5tZXRob2QpKSB7XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXMuc2V0KHJvdXRlLm1ldGhvZCwgW10pO1xuICAgICAgICB9XG4gICAgICAgIC8vIEdpdmUgcHJlY2VkZW5jZSB0byBhbGwgb2YgdGhlIGVhcmxpZXIgcm91dGVzIGJ5IGFkZGluZyB0aGlzIGFkZGl0aW9uYWxcbiAgICAgICAgLy8gcm91dGUgdG8gdGhlIGVuZCBvZiB0aGUgYXJyYXkuXG4gICAgICAgIHRoaXMuX3JvdXRlcy5nZXQocm91dGUubWV0aG9kKS5wdXNoKHJvdXRlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVW5yZWdpc3RlcnMgYSByb3V0ZSB3aXRoIHRoZSByb3V0ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3dvcmtib3gtcm91dGluZy5Sb3V0ZX0gcm91dGUgVGhlIHJvdXRlIHRvIHVucmVnaXN0ZXIuXG4gICAgICovXG4gICAgdW5yZWdpc3RlclJvdXRlKHJvdXRlKSB7XG4gICAgICAgIGlmICghdGhpcy5fcm91dGVzLmhhcyhyb3V0ZS5tZXRob2QpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgV29ya2JveEVycm9yKCd1bnJlZ2lzdGVyLXJvdXRlLWJ1dC1ub3QtZm91bmQtd2l0aC1tZXRob2QnLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiByb3V0ZS5tZXRob2QsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByb3V0ZUluZGV4ID0gdGhpcy5fcm91dGVzLmdldChyb3V0ZS5tZXRob2QpLmluZGV4T2Yocm91dGUpO1xuICAgICAgICBpZiAocm91dGVJbmRleCA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXMuZ2V0KHJvdXRlLm1ldGhvZCkuc3BsaWNlKHJvdXRlSW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFdvcmtib3hFcnJvcigndW5yZWdpc3Rlci1yb3V0ZS1yb3V0ZS1ub3QtcmVnaXN0ZXJlZCcpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IHsgUm91dGVyIH07XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnLi4vUm91dGVyLmpzJztcbmltcG9ydCAnLi4vX3ZlcnNpb24uanMnO1xubGV0IGRlZmF1bHRSb3V0ZXI7XG4vKipcbiAqIENyZWF0ZXMgYSBuZXcsIHNpbmdsZXRvbiBSb3V0ZXIgaW5zdGFuY2UgaWYgb25lIGRvZXMgbm90IGV4aXN0LiBJZiBvbmVcbiAqIGRvZXMgYWxyZWFkeSBleGlzdCwgdGhhdCBpbnN0YW5jZSBpcyByZXR1cm5lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybiB7Um91dGVyfVxuICovXG5leHBvcnQgY29uc3QgZ2V0T3JDcmVhdGVEZWZhdWx0Um91dGVyID0gKCkgPT4ge1xuICAgIGlmICghZGVmYXVsdFJvdXRlcikge1xuICAgICAgICBkZWZhdWx0Um91dGVyID0gbmV3IFJvdXRlcigpO1xuICAgICAgICAvLyBUaGUgaGVscGVycyB0aGF0IHVzZSB0aGUgZGVmYXVsdCBSb3V0ZXIgYXNzdW1lIHRoZXNlIGxpc3RlbmVycyBleGlzdC5cbiAgICAgICAgZGVmYXVsdFJvdXRlci5hZGRGZXRjaExpc3RlbmVyKCk7XG4gICAgICAgIGRlZmF1bHRSb3V0ZXIuYWRkQ2FjaGVMaXN0ZW5lcigpO1xuICAgIH1cbiAgICByZXR1cm4gZGVmYXVsdFJvdXRlcjtcbn07XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2xvZ2dlci5qcyc7XG5pbXBvcnQgeyBXb3JrYm94RXJyb3IgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvV29ya2JveEVycm9yLmpzJztcbmltcG9ydCB7IFJvdXRlIH0gZnJvbSAnLi9Sb3V0ZS5qcyc7XG5pbXBvcnQgeyBSZWdFeHBSb3V0ZSB9IGZyb20gJy4vUmVnRXhwUm91dGUuanMnO1xuaW1wb3J0IHsgZ2V0T3JDcmVhdGVEZWZhdWx0Um91dGVyIH0gZnJvbSAnLi91dGlscy9nZXRPckNyZWF0ZURlZmF1bHRSb3V0ZXIuanMnO1xuaW1wb3J0ICcuL192ZXJzaW9uLmpzJztcbi8qKlxuICogRWFzaWx5IHJlZ2lzdGVyIGEgUmVnRXhwLCBzdHJpbmcsIG9yIGZ1bmN0aW9uIHdpdGggYSBjYWNoaW5nXG4gKiBzdHJhdGVneSB0byBhIHNpbmdsZXRvbiBSb3V0ZXIgaW5zdGFuY2UuXG4gKlxuICogVGhpcyBtZXRob2Qgd2lsbCBnZW5lcmF0ZSBhIFJvdXRlIGZvciB5b3UgaWYgbmVlZGVkIGFuZFxuICogY2FsbCB7QGxpbmsgd29ya2JveC1yb3V0aW5nLlJvdXRlciNyZWdpc3RlclJvdXRlfS5cbiAqXG4gKiBAcGFyYW0ge1JlZ0V4cHxzdHJpbmd8d29ya2JveC1yb3V0aW5nLlJvdXRlfm1hdGNoQ2FsbGJhY2t8d29ya2JveC1yb3V0aW5nLlJvdXRlfSBjYXB0dXJlXG4gKiBJZiB0aGUgY2FwdHVyZSBwYXJhbSBpcyBhIGBSb3V0ZWAsIGFsbCBvdGhlciBhcmd1bWVudHMgd2lsbCBiZSBpZ25vcmVkLlxuICogQHBhcmFtIHt3b3JrYm94LXJvdXRpbmd+aGFuZGxlckNhbGxiYWNrfSBbaGFuZGxlcl0gQSBjYWxsYmFja1xuICogZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgUHJvbWlzZSByZXN1bHRpbmcgaW4gYSBSZXNwb25zZS4gVGhpcyBwYXJhbWV0ZXJcbiAqIGlzIHJlcXVpcmVkIGlmIGBjYXB0dXJlYCBpcyBub3QgYSBgUm91dGVgIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbbWV0aG9kPSdHRVQnXSBUaGUgSFRUUCBtZXRob2QgdG8gbWF0Y2ggdGhlIFJvdXRlXG4gKiBhZ2FpbnN0LlxuICogQHJldHVybiB7d29ya2JveC1yb3V0aW5nLlJvdXRlfSBUaGUgZ2VuZXJhdGVkIGBSb3V0ZWAuXG4gKlxuICogQG1lbWJlcm9mIHdvcmtib3gtcm91dGluZ1xuICovXG5mdW5jdGlvbiByZWdpc3RlclJvdXRlKGNhcHR1cmUsIGhhbmRsZXIsIG1ldGhvZCkge1xuICAgIGxldCByb3V0ZTtcbiAgICBpZiAodHlwZW9mIGNhcHR1cmUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IGNhcHR1cmVVcmwgPSBuZXcgVVJMKGNhcHR1cmUsIGxvY2F0aW9uLmhyZWYpO1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgaWYgKCEoY2FwdHVyZS5zdGFydHNXaXRoKCcvJykgfHwgY2FwdHVyZS5zdGFydHNXaXRoKCdodHRwJykpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFdvcmtib3hFcnJvcignaW52YWxpZC1zdHJpbmcnLCB7XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LXJvdXRpbmcnLFxuICAgICAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ3JlZ2lzdGVyUm91dGUnLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbU5hbWU6ICdjYXB0dXJlJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFdlIHdhbnQgdG8gY2hlY2sgaWYgRXhwcmVzcy1zdHlsZSB3aWxkY2FyZHMgYXJlIGluIHRoZSBwYXRobmFtZSBvbmx5LlxuICAgICAgICAgICAgLy8gVE9ETzogUmVtb3ZlIHRoaXMgbG9nIG1lc3NhZ2UgaW4gdjQuXG4gICAgICAgICAgICBjb25zdCB2YWx1ZVRvQ2hlY2sgPSBjYXB0dXJlLnN0YXJ0c1dpdGgoJ2h0dHAnKVxuICAgICAgICAgICAgICAgID8gY2FwdHVyZVVybC5wYXRobmFtZVxuICAgICAgICAgICAgICAgIDogY2FwdHVyZTtcbiAgICAgICAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vcGlsbGFyanMvcGF0aC10by1yZWdleHAjcGFyYW1ldGVyc1xuICAgICAgICAgICAgY29uc3Qgd2lsZGNhcmRzID0gJ1sqOj8rXSc7XG4gICAgICAgICAgICBpZiAobmV3IFJlZ0V4cChgJHt3aWxkY2FyZHN9YCkuZXhlYyh2YWx1ZVRvQ2hlY2spKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGBUaGUgJyRjYXB0dXJlJyBwYXJhbWV0ZXIgY29udGFpbnMgYW4gRXhwcmVzcy1zdHlsZSB3aWxkY2FyZCBgICtcbiAgICAgICAgICAgICAgICAgICAgYGNoYXJhY3RlciAoJHt3aWxkY2FyZHN9KS4gU3RyaW5ncyBhcmUgbm93IGFsd2F5cyBpbnRlcnByZXRlZCBhcyBgICtcbiAgICAgICAgICAgICAgICAgICAgYGV4YWN0IG1hdGNoZXM7IHVzZSBhIFJlZ0V4cCBmb3IgcGFydGlhbCBvciB3aWxkY2FyZCBtYXRjaGVzLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1hdGNoQ2FsbGJhY2sgPSAoeyB1cmwgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBpZiAodXJsLnBhdGhuYW1lID09PSBjYXB0dXJlVXJsLnBhdGhuYW1lICYmXG4gICAgICAgICAgICAgICAgICAgIHVybC5vcmlnaW4gIT09IGNhcHR1cmVVcmwub3JpZ2luKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgJHtjYXB0dXJlfSBvbmx5IHBhcnRpYWxseSBtYXRjaGVzIHRoZSBjcm9zcy1vcmlnaW4gVVJMIGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYCR7dXJsLnRvU3RyaW5nKCl9LiBUaGlzIHJvdXRlIHdpbGwgb25seSBoYW5kbGUgY3Jvc3Mtb3JpZ2luIHJlcXVlc3RzIGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYGlmIHRoZXkgbWF0Y2ggdGhlIGVudGlyZSBVUkwuYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVybC5ocmVmID09PSBjYXB0dXJlVXJsLmhyZWY7XG4gICAgICAgIH07XG4gICAgICAgIC8vIElmIGBjYXB0dXJlYCBpcyBhIHN0cmluZyB0aGVuIGBoYW5kbGVyYCBhbmQgYG1ldGhvZGAgbXVzdCBiZSBwcmVzZW50LlxuICAgICAgICByb3V0ZSA9IG5ldyBSb3V0ZShtYXRjaENhbGxiYWNrLCBoYW5kbGVyLCBtZXRob2QpO1xuICAgIH1cbiAgICBlbHNlIGlmIChjYXB0dXJlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIC8vIElmIGBjYXB0dXJlYCBpcyBhIGBSZWdFeHBgIHRoZW4gYGhhbmRsZXJgIGFuZCBgbWV0aG9kYCBtdXN0IGJlIHByZXNlbnQuXG4gICAgICAgIHJvdXRlID0gbmV3IFJlZ0V4cFJvdXRlKGNhcHR1cmUsIGhhbmRsZXIsIG1ldGhvZCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBjYXB0dXJlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIElmIGBjYXB0dXJlYCBpcyBhIGZ1bmN0aW9uIHRoZW4gYGhhbmRsZXJgIGFuZCBgbWV0aG9kYCBtdXN0IGJlIHByZXNlbnQuXG4gICAgICAgIHJvdXRlID0gbmV3IFJvdXRlKGNhcHR1cmUsIGhhbmRsZXIsIG1ldGhvZCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNhcHR1cmUgaW5zdGFuY2VvZiBSb3V0ZSkge1xuICAgICAgICByb3V0ZSA9IGNhcHR1cmU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgV29ya2JveEVycm9yKCd1bnN1cHBvcnRlZC1yb3V0ZS10eXBlJywge1xuICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtcm91dGluZycsXG4gICAgICAgICAgICBmdW5jTmFtZTogJ3JlZ2lzdGVyUm91dGUnLFxuICAgICAgICAgICAgcGFyYW1OYW1lOiAnY2FwdHVyZScsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBkZWZhdWx0Um91dGVyID0gZ2V0T3JDcmVhdGVEZWZhdWx0Um91dGVyKCk7XG4gICAgZGVmYXVsdFJvdXRlci5yZWdpc3RlclJvdXRlKHJvdXRlKTtcbiAgICByZXR1cm4gcm91dGU7XG59XG5leHBvcnQgeyByZWdpc3RlclJvdXRlIH07XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0ICcuLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIFJlbW92ZXMgYW55IFVSTCBzZWFyY2ggcGFyYW1ldGVycyB0aGF0IHNob3VsZCBiZSBpZ25vcmVkLlxuICpcbiAqIEBwYXJhbSB7VVJMfSB1cmxPYmplY3QgVGhlIG9yaWdpbmFsIFVSTC5cbiAqIEBwYXJhbSB7QXJyYXk8UmVnRXhwPn0gaWdub3JlVVJMUGFyYW1ldGVyc01hdGNoaW5nIFJlZ0V4cHMgdG8gdGVzdCBhZ2FpbnN0XG4gKiBlYWNoIHNlYXJjaCBwYXJhbWV0ZXIgbmFtZS4gTWF0Y2hlcyBtZWFuIHRoYXQgdGhlIHNlYXJjaCBwYXJhbWV0ZXIgc2hvdWxkIGJlXG4gKiBpZ25vcmVkLlxuICogQHJldHVybiB7VVJMfSBUaGUgVVJMIHdpdGggYW55IGlnbm9yZWQgc2VhcmNoIHBhcmFtZXRlcnMgcmVtb3ZlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG1lbWJlcm9mIHdvcmtib3gtcHJlY2FjaGluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlSWdub3JlZFNlYXJjaFBhcmFtcyh1cmxPYmplY3QsIGlnbm9yZVVSTFBhcmFtZXRlcnNNYXRjaGluZyA9IFtdKSB7XG4gICAgLy8gQ29udmVydCB0aGUgaXRlcmFibGUgaW50byBhbiBhcnJheSBhdCB0aGUgc3RhcnQgb2YgdGhlIGxvb3AgdG8gbWFrZSBzdXJlXG4gICAgLy8gZGVsZXRpb24gZG9lc24ndCBtZXNzIHVwIGl0ZXJhdGlvbi5cbiAgICBmb3IgKGNvbnN0IHBhcmFtTmFtZSBvZiBbLi4udXJsT2JqZWN0LnNlYXJjaFBhcmFtcy5rZXlzKCldKSB7XG4gICAgICAgIGlmIChpZ25vcmVVUkxQYXJhbWV0ZXJzTWF0Y2hpbmcuc29tZSgocmVnRXhwKSA9PiByZWdFeHAudGVzdChwYXJhbU5hbWUpKSkge1xuICAgICAgICAgICAgdXJsT2JqZWN0LnNlYXJjaFBhcmFtcy5kZWxldGUocGFyYW1OYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdXJsT2JqZWN0O1xufVxuIiwgIi8qXG4gIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IHJlbW92ZUlnbm9yZWRTZWFyY2hQYXJhbXMgfSBmcm9tICcuL3JlbW92ZUlnbm9yZWRTZWFyY2hQYXJhbXMuanMnO1xuaW1wb3J0ICcuLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIEdlbmVyYXRvciBmdW5jdGlvbiB0aGF0IHlpZWxkcyBwb3NzaWJsZSB2YXJpYXRpb25zIG9uIHRoZSBvcmlnaW5hbCBVUkwgdG9cbiAqIGNoZWNrLCBvbmUgYXQgYSB0aW1lLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKlxuICogQHByaXZhdGVcbiAqIEBtZW1iZXJvZiB3b3JrYm94LXByZWNhY2hpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uKiBnZW5lcmF0ZVVSTFZhcmlhdGlvbnModXJsLCB7IGlnbm9yZVVSTFBhcmFtZXRlcnNNYXRjaGluZyA9IFsvXnV0bV8vLCAvXmZiY2xpZCQvXSwgZGlyZWN0b3J5SW5kZXggPSAnaW5kZXguaHRtbCcsIGNsZWFuVVJMcyA9IHRydWUsIHVybE1hbmlwdWxhdGlvbiwgfSA9IHt9KSB7XG4gICAgY29uc3QgdXJsT2JqZWN0ID0gbmV3IFVSTCh1cmwsIGxvY2F0aW9uLmhyZWYpO1xuICAgIHVybE9iamVjdC5oYXNoID0gJyc7XG4gICAgeWllbGQgdXJsT2JqZWN0LmhyZWY7XG4gICAgY29uc3QgdXJsV2l0aG91dElnbm9yZWRQYXJhbXMgPSByZW1vdmVJZ25vcmVkU2VhcmNoUGFyYW1zKHVybE9iamVjdCwgaWdub3JlVVJMUGFyYW1ldGVyc01hdGNoaW5nKTtcbiAgICB5aWVsZCB1cmxXaXRob3V0SWdub3JlZFBhcmFtcy5ocmVmO1xuICAgIGlmIChkaXJlY3RvcnlJbmRleCAmJiB1cmxXaXRob3V0SWdub3JlZFBhcmFtcy5wYXRobmFtZS5lbmRzV2l0aCgnLycpKSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeVVSTCA9IG5ldyBVUkwodXJsV2l0aG91dElnbm9yZWRQYXJhbXMuaHJlZik7XG4gICAgICAgIGRpcmVjdG9yeVVSTC5wYXRobmFtZSArPSBkaXJlY3RvcnlJbmRleDtcbiAgICAgICAgeWllbGQgZGlyZWN0b3J5VVJMLmhyZWY7XG4gICAgfVxuICAgIGlmIChjbGVhblVSTHMpIHtcbiAgICAgICAgY29uc3QgY2xlYW5VUkwgPSBuZXcgVVJMKHVybFdpdGhvdXRJZ25vcmVkUGFyYW1zLmhyZWYpO1xuICAgICAgICBjbGVhblVSTC5wYXRobmFtZSArPSAnLmh0bWwnO1xuICAgICAgICB5aWVsZCBjbGVhblVSTC5ocmVmO1xuICAgIH1cbiAgICBpZiAodXJsTWFuaXB1bGF0aW9uKSB7XG4gICAgICAgIGNvbnN0IGFkZGl0aW9uYWxVUkxzID0gdXJsTWFuaXB1bGF0aW9uKHsgdXJsOiB1cmxPYmplY3QgfSk7XG4gICAgICAgIGZvciAoY29uc3QgdXJsVG9BdHRlbXB0IG9mIGFkZGl0aW9uYWxVUkxzKSB7XG4gICAgICAgICAgICB5aWVsZCB1cmxUb0F0dGVtcHQuaHJlZjtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsICIvKlxuICBDb3B5cmlnaHQgMjAyMCBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvbG9nZ2VyLmpzJztcbmltcG9ydCB7IGdldEZyaWVuZGx5VVJMIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2dldEZyaWVuZGx5VVJMLmpzJztcbmltcG9ydCB7IFJvdXRlIH0gZnJvbSAnd29ya2JveC1yb3V0aW5nL1JvdXRlLmpzJztcbmltcG9ydCB7IGdlbmVyYXRlVVJMVmFyaWF0aW9ucyB9IGZyb20gJy4vdXRpbHMvZ2VuZXJhdGVVUkxWYXJpYXRpb25zLmpzJztcbmltcG9ydCAnLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIEEgc3ViY2xhc3Mgb2Yge0BsaW5rIHdvcmtib3gtcm91dGluZy5Sb3V0ZX0gdGhhdCB0YWtlcyBhXG4gKiB7QGxpbmsgd29ya2JveC1wcmVjYWNoaW5nLlByZWNhY2hlQ29udHJvbGxlcn1cbiAqIGluc3RhbmNlIGFuZCB1c2VzIGl0IHRvIG1hdGNoIGluY29taW5nIHJlcXVlc3RzIGFuZCBoYW5kbGUgZmV0Y2hpbmdcbiAqIHJlc3BvbnNlcyBmcm9tIHRoZSBwcmVjYWNoZS5cbiAqXG4gKiBAbWVtYmVyb2Ygd29ya2JveC1wcmVjYWNoaW5nXG4gKiBAZXh0ZW5kcyB3b3JrYm94LXJvdXRpbmcuUm91dGVcbiAqL1xuY2xhc3MgUHJlY2FjaGVSb3V0ZSBleHRlbmRzIFJvdXRlIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1ByZWNhY2hlQ29udHJvbGxlcn0gcHJlY2FjaGVDb250cm9sbGVyIEEgYFByZWNhY2hlQ29udHJvbGxlcmBcbiAgICAgKiBpbnN0YW5jZSB1c2VkIHRvIGJvdGggbWF0Y2ggcmVxdWVzdHMgYW5kIHJlc3BvbmQgdG8gZmV0Y2ggZXZlbnRzLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gT3B0aW9ucyB0byBjb250cm9sIGhvdyByZXF1ZXN0cyBhcmUgbWF0Y2hlZFxuICAgICAqIGFnYWluc3QgdGhlIGxpc3Qgb2YgcHJlY2FjaGVkIFVSTHMuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmRpcmVjdG9yeUluZGV4PWluZGV4Lmh0bWxdIFRoZSBgZGlyZWN0b3J5SW5kZXhgIHdpbGxcbiAgICAgKiBjaGVjayBjYWNoZSBlbnRyaWVzIGZvciBhIFVSTHMgZW5kaW5nIHdpdGggJy8nIHRvIHNlZSBpZiB0aGVyZSBpcyBhIGhpdCB3aGVuXG4gICAgICogYXBwZW5kaW5nIHRoZSBgZGlyZWN0b3J5SW5kZXhgIHZhbHVlLlxuICAgICAqIEBwYXJhbSB7QXJyYXk8UmVnRXhwPn0gW29wdGlvbnMuaWdub3JlVVJMUGFyYW1ldGVyc01hdGNoaW5nPVsvXnV0bV8vLCAvXmZiY2xpZCQvXV0gQW5cbiAgICAgKiBhcnJheSBvZiByZWdleCdzIHRvIHJlbW92ZSBzZWFyY2ggcGFyYW1zIHdoZW4gbG9va2luZyBmb3IgYSBjYWNoZSBtYXRjaC5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmNsZWFuVVJMcz10cnVlXSBUaGUgYGNsZWFuVVJMc2Agb3B0aW9uIHdpbGxcbiAgICAgKiBjaGVjayB0aGUgY2FjaGUgZm9yIHRoZSBVUkwgd2l0aCBhIGAuaHRtbGAgYWRkZWQgdG8gdGhlIGVuZCBvZiB0aGUgZW5kLlxuICAgICAqIEBwYXJhbSB7d29ya2JveC1wcmVjYWNoaW5nfnVybE1hbmlwdWxhdGlvbn0gW29wdGlvbnMudXJsTWFuaXB1bGF0aW9uXVxuICAgICAqIFRoaXMgaXMgYSBmdW5jdGlvbiB0aGF0IHNob3VsZCB0YWtlIGEgVVJMIGFuZCByZXR1cm4gYW4gYXJyYXkgb2ZcbiAgICAgKiBhbHRlcm5hdGl2ZSBVUkxzIHRoYXQgc2hvdWxkIGJlIGNoZWNrZWQgZm9yIHByZWNhY2hlIG1hdGNoZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJlY2FjaGVDb250cm9sbGVyLCBvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gKHsgcmVxdWVzdCwgfSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXJsc1RvQ2FjaGVLZXlzID0gcHJlY2FjaGVDb250cm9sbGVyLmdldFVSTHNUb0NhY2hlS2V5cygpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBwb3NzaWJsZVVSTCBvZiBnZW5lcmF0ZVVSTFZhcmlhdGlvbnMocmVxdWVzdC51cmwsIG9wdGlvbnMpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FjaGVLZXkgPSB1cmxzVG9DYWNoZUtleXMuZ2V0KHBvc3NpYmxlVVJMKTtcbiAgICAgICAgICAgICAgICBpZiAoY2FjaGVLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW50ZWdyaXR5ID0gcHJlY2FjaGVDb250cm9sbGVyLmdldEludGVncml0eUZvckNhY2hlS2V5KGNhY2hlS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgY2FjaGVLZXksIGludGVncml0eSB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGBQcmVjYWNoaW5nIGRpZCBub3QgZmluZCBhIG1hdGNoIGZvciBgICsgZ2V0RnJpZW5kbHlVUkwocmVxdWVzdC51cmwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcbiAgICAgICAgc3VwZXIobWF0Y2gsIHByZWNhY2hlQ29udHJvbGxlci5zdHJhdGVneSk7XG4gICAgfVxufVxuZXhwb3J0IHsgUHJlY2FjaGVSb3V0ZSB9O1xuIiwgIi8qXG4gIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgeyByZWdpc3RlclJvdXRlIH0gZnJvbSAnd29ya2JveC1yb3V0aW5nL3JlZ2lzdGVyUm91dGUuanMnO1xuaW1wb3J0IHsgZ2V0T3JDcmVhdGVQcmVjYWNoZUNvbnRyb2xsZXIgfSBmcm9tICcuL3V0aWxzL2dldE9yQ3JlYXRlUHJlY2FjaGVDb250cm9sbGVyLmpzJztcbmltcG9ydCB7IFByZWNhY2hlUm91dGUgfSBmcm9tICcuL1ByZWNhY2hlUm91dGUuanMnO1xuaW1wb3J0ICcuL192ZXJzaW9uLmpzJztcbi8qKlxuICogQWRkIGEgYGZldGNoYCBsaXN0ZW5lciB0byB0aGUgc2VydmljZSB3b3JrZXIgdGhhdCB3aWxsXG4gKiByZXNwb25kIHRvXG4gKiBbbmV0d29yayByZXF1ZXN0c117QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1NlcnZpY2VfV29ya2VyX0FQSS9Vc2luZ19TZXJ2aWNlX1dvcmtlcnMjQ3VzdG9tX3Jlc3BvbnNlc190b19yZXF1ZXN0c31cbiAqIHdpdGggcHJlY2FjaGVkIGFzc2V0cy5cbiAqXG4gKiBSZXF1ZXN0cyBmb3IgYXNzZXRzIHRoYXQgYXJlbid0IHByZWNhY2hlZCwgdGhlIGBGZXRjaEV2ZW50YCB3aWxsIG5vdCBiZVxuICogcmVzcG9uZGVkIHRvLCBhbGxvd2luZyB0aGUgZXZlbnQgdG8gZmFsbCB0aHJvdWdoIHRvIG90aGVyIGBmZXRjaGAgZXZlbnRcbiAqIGxpc3RlbmVycy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIFNlZSB0aGUge0BsaW5rIHdvcmtib3gtcHJlY2FjaGluZy5QcmVjYWNoZVJvdXRlfVxuICogb3B0aW9ucy5cbiAqXG4gKiBAbWVtYmVyb2Ygd29ya2JveC1wcmVjYWNoaW5nXG4gKi9cbmZ1bmN0aW9uIGFkZFJvdXRlKG9wdGlvbnMpIHtcbiAgICBjb25zdCBwcmVjYWNoZUNvbnRyb2xsZXIgPSBnZXRPckNyZWF0ZVByZWNhY2hlQ29udHJvbGxlcigpO1xuICAgIGNvbnN0IHByZWNhY2hlUm91dGUgPSBuZXcgUHJlY2FjaGVSb3V0ZShwcmVjYWNoZUNvbnRyb2xsZXIsIG9wdGlvbnMpO1xuICAgIHJlZ2lzdGVyUm91dGUocHJlY2FjaGVSb3V0ZSk7XG59XG5leHBvcnQgeyBhZGRSb3V0ZSB9O1xuIiwgIi8qXG4gIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCAnLi4vX3ZlcnNpb24uanMnO1xuY29uc3QgU1VCU1RSSU5HX1RPX0ZJTkQgPSAnLXByZWNhY2hlLSc7XG4vKipcbiAqIENsZWFucyB1cCBpbmNvbXBhdGlibGUgcHJlY2FjaGVzIHRoYXQgd2VyZSBjcmVhdGVkIGJ5IG9sZGVyIHZlcnNpb25zIG9mXG4gKiBXb3JrYm94LCBieSBhIHNlcnZpY2Ugd29ya2VyIHJlZ2lzdGVyZWQgdW5kZXIgdGhlIGN1cnJlbnQgc2NvcGUuXG4gKlxuICogVGhpcyBpcyBtZWFudCB0byBiZSBjYWxsZWQgYXMgcGFydCBvZiB0aGUgYGFjdGl2YXRlYCBldmVudC5cbiAqXG4gKiBUaGlzIHNob3VsZCBiZSBzYWZlIHRvIHVzZSBhcyBsb25nIGFzIHlvdSBkb24ndCBpbmNsdWRlIGBzdWJzdHJpbmdUb0ZpbmRgXG4gKiAoZGVmYXVsdGluZyB0byBgLXByZWNhY2hlLWApIGluIHlvdXIgbm9uLXByZWNhY2hlIGNhY2hlIG5hbWVzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjdXJyZW50UHJlY2FjaGVOYW1lIFRoZSBjYWNoZSBuYW1lIGN1cnJlbnRseSBpbiB1c2UgZm9yXG4gKiBwcmVjYWNoaW5nLiBUaGlzIGNhY2hlIHdvbid0IGJlIGRlbGV0ZWQuXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N1YnN0cmluZ1RvRmluZD0nLXByZWNhY2hlLSddIENhY2hlIG5hbWVzIHdoaWNoIGluY2x1ZGUgdGhpc1xuICogc3Vic3RyaW5nIHdpbGwgYmUgZGVsZXRlZCAoZXhjbHVkaW5nIGBjdXJyZW50UHJlY2FjaGVOYW1lYCkuXG4gKiBAcmV0dXJuIHtBcnJheTxzdHJpbmc+fSBBIGxpc3Qgb2YgYWxsIHRoZSBjYWNoZSBuYW1lcyB0aGF0IHdlcmUgZGVsZXRlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG1lbWJlcm9mIHdvcmtib3gtcHJlY2FjaGluZ1xuICovXG5jb25zdCBkZWxldGVPdXRkYXRlZENhY2hlcyA9IGFzeW5jIChjdXJyZW50UHJlY2FjaGVOYW1lLCBzdWJzdHJpbmdUb0ZpbmQgPSBTVUJTVFJJTkdfVE9fRklORCkgPT4ge1xuICAgIGNvbnN0IGNhY2hlTmFtZXMgPSBhd2FpdCBzZWxmLmNhY2hlcy5rZXlzKCk7XG4gICAgY29uc3QgY2FjaGVOYW1lc1RvRGVsZXRlID0gY2FjaGVOYW1lcy5maWx0ZXIoKGNhY2hlTmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gKGNhY2hlTmFtZS5pbmNsdWRlcyhzdWJzdHJpbmdUb0ZpbmQpICYmXG4gICAgICAgICAgICBjYWNoZU5hbWUuaW5jbHVkZXMoc2VsZi5yZWdpc3RyYXRpb24uc2NvcGUpICYmXG4gICAgICAgICAgICBjYWNoZU5hbWUgIT09IGN1cnJlbnRQcmVjYWNoZU5hbWUpO1xuICAgIH0pO1xuICAgIGF3YWl0IFByb21pc2UuYWxsKGNhY2hlTmFtZXNUb0RlbGV0ZS5tYXAoKGNhY2hlTmFtZSkgPT4gc2VsZi5jYWNoZXMuZGVsZXRlKGNhY2hlTmFtZSkpKTtcbiAgICByZXR1cm4gY2FjaGVOYW1lc1RvRGVsZXRlO1xufTtcbmV4cG9ydCB7IGRlbGV0ZU91dGRhdGVkQ2FjaGVzIH07XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgY2FjaGVOYW1lcyB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9jYWNoZU5hbWVzLmpzJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9sb2dnZXIuanMnO1xuaW1wb3J0IHsgZGVsZXRlT3V0ZGF0ZWRDYWNoZXMgfSBmcm9tICcuL3V0aWxzL2RlbGV0ZU91dGRhdGVkQ2FjaGVzLmpzJztcbmltcG9ydCAnLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIEFkZHMgYW4gYGFjdGl2YXRlYCBldmVudCBsaXN0ZW5lciB3aGljaCB3aWxsIGNsZWFuIHVwIGluY29tcGF0aWJsZVxuICogcHJlY2FjaGVzIHRoYXQgd2VyZSBjcmVhdGVkIGJ5IG9sZGVyIHZlcnNpb25zIG9mIFdvcmtib3guXG4gKlxuICogQG1lbWJlcm9mIHdvcmtib3gtcHJlY2FjaGluZ1xuICovXG5mdW5jdGlvbiBjbGVhbnVwT3V0ZGF0ZWRDYWNoZXMoKSB7XG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMjgzNTcjaXNzdWVjb21tZW50LTQzNjQ4NDcwNVxuICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignYWN0aXZhdGUnLCAoKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGNhY2hlTmFtZSA9IGNhY2hlTmFtZXMuZ2V0UHJlY2FjaGVOYW1lKCk7XG4gICAgICAgIGV2ZW50LndhaXRVbnRpbChkZWxldGVPdXRkYXRlZENhY2hlcyhjYWNoZU5hbWUpLnRoZW4oKGNhY2hlc0RlbGV0ZWQpID0+IHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNhY2hlc0RlbGV0ZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBUaGUgZm9sbG93aW5nIG91dC1vZi1kYXRlIHByZWNhY2hlcyB3ZXJlIGNsZWFuZWQgdXAgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgYXV0b21hdGljYWxseTpgLCBjYWNoZXNEZWxldGVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9KSk7XG59XG5leHBvcnQgeyBjbGVhbnVwT3V0ZGF0ZWRDYWNoZXMgfTtcbiIsICIvKlxuICBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXG5cbiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVC5cbiovXG5pbXBvcnQgeyBnZXRPckNyZWF0ZVByZWNhY2hlQ29udHJvbGxlciB9IGZyb20gJy4vdXRpbHMvZ2V0T3JDcmVhdGVQcmVjYWNoZUNvbnRyb2xsZXIuanMnO1xuaW1wb3J0ICcuL192ZXJzaW9uLmpzJztcbi8qKlxuICogQWRkcyBpdGVtcyB0byB0aGUgcHJlY2FjaGUgbGlzdCwgcmVtb3ZpbmcgYW55IGR1cGxpY2F0ZXMgYW5kXG4gKiBzdG9yZXMgdGhlIGZpbGVzIGluIHRoZVxuICoge0BsaW5rIHdvcmtib3gtY29yZS5jYWNoZU5hbWVzfFwicHJlY2FjaGUgY2FjaGVcIn0gd2hlbiB0aGUgc2VydmljZVxuICogd29ya2VyIGluc3RhbGxzLlxuICpcbiAqIFRoaXMgbWV0aG9kIGNhbiBiZSBjYWxsZWQgbXVsdGlwbGUgdGltZXMuXG4gKlxuICogUGxlYXNlIG5vdGU6IFRoaXMgbWV0aG9kICoqd2lsbCBub3QqKiBzZXJ2ZSBhbnkgb2YgdGhlIGNhY2hlZCBmaWxlcyBmb3IgeW91LlxuICogSXQgb25seSBwcmVjYWNoZXMgZmlsZXMuIFRvIHJlc3BvbmQgdG8gYSBuZXR3b3JrIHJlcXVlc3QgeW91IGNhbGxcbiAqIHtAbGluayB3b3JrYm94LXByZWNhY2hpbmcuYWRkUm91dGV9LlxuICpcbiAqIElmIHlvdSBoYXZlIGEgc2luZ2xlIGFycmF5IG9mIGZpbGVzIHRvIHByZWNhY2hlLCB5b3UgY2FuIGp1c3QgY2FsbFxuICoge0BsaW5rIHdvcmtib3gtcHJlY2FjaGluZy5wcmVjYWNoZUFuZFJvdXRlfS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PE9iamVjdHxzdHJpbmc+fSBbZW50cmllcz1bXV0gQXJyYXkgb2YgZW50cmllcyB0byBwcmVjYWNoZS5cbiAqXG4gKiBAbWVtYmVyb2Ygd29ya2JveC1wcmVjYWNoaW5nXG4gKi9cbmZ1bmN0aW9uIHByZWNhY2hlKGVudHJpZXMpIHtcbiAgICBjb25zdCBwcmVjYWNoZUNvbnRyb2xsZXIgPSBnZXRPckNyZWF0ZVByZWNhY2hlQ29udHJvbGxlcigpO1xuICAgIHByZWNhY2hlQ29udHJvbGxlci5wcmVjYWNoZShlbnRyaWVzKTtcbn1cbmV4cG9ydCB7IHByZWNhY2hlIH07XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgYWRkUm91dGUgfSBmcm9tICcuL2FkZFJvdXRlLmpzJztcbmltcG9ydCB7IHByZWNhY2hlIH0gZnJvbSAnLi9wcmVjYWNoZS5qcyc7XG5pbXBvcnQgJy4vX3ZlcnNpb24uanMnO1xuLyoqXG4gKiBUaGlzIG1ldGhvZCB3aWxsIGFkZCBlbnRyaWVzIHRvIHRoZSBwcmVjYWNoZSBsaXN0IGFuZCBhZGQgYSByb3V0ZSB0b1xuICogcmVzcG9uZCB0byBmZXRjaCBldmVudHMuXG4gKlxuICogVGhpcyBpcyBhIGNvbnZlbmllbmNlIG1ldGhvZCB0aGF0IHdpbGwgY2FsbFxuICoge0BsaW5rIHdvcmtib3gtcHJlY2FjaGluZy5wcmVjYWNoZX0gYW5kXG4gKiB7QGxpbmsgd29ya2JveC1wcmVjYWNoaW5nLmFkZFJvdXRlfSBpbiBhIHNpbmdsZSBjYWxsLlxuICpcbiAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0fHN0cmluZz59IGVudHJpZXMgQXJyYXkgb2YgZW50cmllcyB0byBwcmVjYWNoZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gU2VlIHRoZVxuICoge0BsaW5rIHdvcmtib3gtcHJlY2FjaGluZy5QcmVjYWNoZVJvdXRlfSBvcHRpb25zLlxuICpcbiAqIEBtZW1iZXJvZiB3b3JrYm94LXByZWNhY2hpbmdcbiAqL1xuZnVuY3Rpb24gcHJlY2FjaGVBbmRSb3V0ZShlbnRyaWVzLCBvcHRpb25zKSB7XG4gICAgcHJlY2FjaGUoZW50cmllcyk7XG4gICAgYWRkUm91dGUob3B0aW9ucyk7XG59XG5leHBvcnQgeyBwcmVjYWNoZUFuZFJvdXRlIH07XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2Fzc2VydC5qcyc7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvbG9nZ2VyLmpzJztcbmltcG9ydCB7IFdvcmtib3hFcnJvciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9Xb3JrYm94RXJyb3IuanMnO1xuaW1wb3J0IHsgU3RyYXRlZ3kgfSBmcm9tICcuL1N0cmF0ZWd5LmpzJztcbmltcG9ydCB7IG1lc3NhZ2VzIH0gZnJvbSAnLi91dGlscy9tZXNzYWdlcy5qcyc7XG5pbXBvcnQgJy4vX3ZlcnNpb24uanMnO1xuLyoqXG4gKiBBbiBpbXBsZW1lbnRhdGlvbiBvZiBhIFtjYWNoZS1maXJzdF0oaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9kb2NzL3dvcmtib3gvY2FjaGluZy1zdHJhdGVnaWVzLW92ZXJ2aWV3LyNjYWNoZS1maXJzdC1mYWxsaW5nLWJhY2stdG8tbmV0d29yaylcbiAqIHJlcXVlc3Qgc3RyYXRlZ3kuXG4gKlxuICogQSBjYWNoZSBmaXJzdCBzdHJhdGVneSBpcyB1c2VmdWwgZm9yIGFzc2V0cyB0aGF0IGhhdmUgYmVlbiByZXZpc2lvbmVkLFxuICogc3VjaCBhcyBVUkxzIGxpa2UgYC9zdHlsZXMvZXhhbXBsZS5hOGY1ZjEuY3NzYCwgc2luY2UgdGhleVxuICogY2FuIGJlIGNhY2hlZCBmb3IgbG9uZyBwZXJpb2RzIG9mIHRpbWUuXG4gKlxuICogSWYgdGhlIG5ldHdvcmsgcmVxdWVzdCBmYWlscywgYW5kIHRoZXJlIGlzIG5vIGNhY2hlIG1hdGNoLCB0aGlzIHdpbGwgdGhyb3dcbiAqIGEgYFdvcmtib3hFcnJvcmAgZXhjZXB0aW9uLlxuICpcbiAqIEBleHRlbmRzIHdvcmtib3gtc3RyYXRlZ2llcy5TdHJhdGVneVxuICogQG1lbWJlcm9mIHdvcmtib3gtc3RyYXRlZ2llc1xuICovXG5jbGFzcyBDYWNoZUZpcnN0IGV4dGVuZHMgU3RyYXRlZ3kge1xuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0fHN0cmluZ30gcmVxdWVzdCBBIHJlcXVlc3QgdG8gcnVuIHRoaXMgc3RyYXRlZ3kgZm9yLlxuICAgICAqIEBwYXJhbSB7d29ya2JveC1zdHJhdGVnaWVzLlN0cmF0ZWd5SGFuZGxlcn0gaGFuZGxlciBUaGUgZXZlbnQgdGhhdFxuICAgICAqICAgICB0cmlnZ2VyZWQgdGhlIHJlcXVlc3QuXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxSZXNwb25zZT59XG4gICAgICovXG4gICAgYXN5bmMgX2hhbmRsZShyZXF1ZXN0LCBoYW5kbGVyKSB7XG4gICAgICAgIGNvbnN0IGxvZ3MgPSBbXTtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGFzc2VydC5pc0luc3RhbmNlKHJlcXVlc3QsIFJlcXVlc3QsIHtcbiAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1zdHJhdGVnaWVzJyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IHRoaXMuY29uc3RydWN0b3IubmFtZSxcbiAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ21ha2VSZXF1ZXN0JyxcbiAgICAgICAgICAgICAgICBwYXJhbU5hbWU6ICdyZXF1ZXN0JyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGhhbmRsZXIuY2FjaGVNYXRjaChyZXF1ZXN0KTtcbiAgICAgICAgbGV0IGVycm9yID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAoIXJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIGxvZ3MucHVzaChgTm8gcmVzcG9uc2UgZm91bmQgaW4gdGhlICcke3RoaXMuY2FjaGVOYW1lfScgY2FjaGUuIGAgK1xuICAgICAgICAgICAgICAgICAgICBgV2lsbCByZXNwb25kIHdpdGggYSBuZXR3b3JrIHJlcXVlc3QuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gYXdhaXQgaGFuZGxlci5mZXRjaEFuZENhY2hlUHV0KHJlcXVlc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IGVycjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBsb2dzLnB1c2goYEdvdCByZXNwb25zZSBmcm9tIG5ldHdvcmsuYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsb2dzLnB1c2goYFVuYWJsZSB0byBnZXQgYSByZXNwb25zZSBmcm9tIHRoZSBuZXR3b3JrLmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgbG9ncy5wdXNoKGBGb3VuZCBhIGNhY2hlZCByZXNwb25zZSBpbiB0aGUgJyR7dGhpcy5jYWNoZU5hbWV9JyBjYWNoZS5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgbG9nZ2VyLmdyb3VwQ29sbGFwc2VkKG1lc3NhZ2VzLnN0cmF0ZWd5U3RhcnQodGhpcy5jb25zdHJ1Y3Rvci5uYW1lLCByZXF1ZXN0KSk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGxvZyBvZiBsb2dzKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhsb2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWVzc2FnZXMucHJpbnRGaW5hbFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIGxvZ2dlci5ncm91cEVuZCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBXb3JrYm94RXJyb3IoJ25vLXJlc3BvbnNlJywgeyB1cmw6IHJlcXVlc3QudXJsLCBlcnJvciB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxufVxuZXhwb3J0IHsgQ2FjaGVGaXJzdCB9O1xuIiwgIi8qXG4gIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCAnLi4vX3ZlcnNpb24uanMnO1xuZXhwb3J0IGNvbnN0IGNhY2hlT2tBbmRPcGFxdWVQbHVnaW4gPSB7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHZhbGlkIHJlc3BvbnNlICh0byBhbGxvdyBjYWNoaW5nKSBpZiB0aGUgc3RhdHVzIGlzIDIwMCAoT0spIG9yXG4gICAgICogMCAob3BhcXVlKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQHBhcmFtIHtSZXNwb25zZX0gb3B0aW9ucy5yZXNwb25zZVxuICAgICAqIEByZXR1cm4ge1Jlc3BvbnNlfG51bGx9XG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGNhY2hlV2lsbFVwZGF0ZTogYXN5bmMgKHsgcmVzcG9uc2UgfSkgPT4ge1xuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDAgfHwgcmVzcG9uc2Uuc3RhdHVzID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbn07XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2Fzc2VydC5qcyc7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvbG9nZ2VyLmpzJztcbmltcG9ydCB7IFdvcmtib3hFcnJvciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9Xb3JrYm94RXJyb3IuanMnO1xuaW1wb3J0IHsgY2FjaGVPa0FuZE9wYXF1ZVBsdWdpbiB9IGZyb20gJy4vcGx1Z2lucy9jYWNoZU9rQW5kT3BhcXVlUGx1Z2luLmpzJztcbmltcG9ydCB7IFN0cmF0ZWd5IH0gZnJvbSAnLi9TdHJhdGVneS5qcyc7XG5pbXBvcnQgeyBtZXNzYWdlcyB9IGZyb20gJy4vdXRpbHMvbWVzc2FnZXMuanMnO1xuaW1wb3J0ICcuL192ZXJzaW9uLmpzJztcbi8qKlxuICogQW4gaW1wbGVtZW50YXRpb24gb2YgYVxuICogW25ldHdvcmsgZmlyc3RdKGh0dHBzOi8vZGV2ZWxvcGVyLmNocm9tZS5jb20vZG9jcy93b3JrYm94L2NhY2hpbmctc3RyYXRlZ2llcy1vdmVydmlldy8jbmV0d29yay1maXJzdC1mYWxsaW5nLWJhY2stdG8tY2FjaGUpXG4gKiByZXF1ZXN0IHN0cmF0ZWd5LlxuICpcbiAqIEJ5IGRlZmF1bHQsIHRoaXMgc3RyYXRlZ3kgd2lsbCBjYWNoZSByZXNwb25zZXMgd2l0aCBhIDIwMCBzdGF0dXMgY29kZSBhc1xuICogd2VsbCBhcyBbb3BhcXVlIHJlc3BvbnNlc10oaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9kb2NzL3dvcmtib3gvY2FjaGluZy1yZXNvdXJjZXMtZHVyaW5nLXJ1bnRpbWUvI29wYXF1ZS1yZXNwb25zZXMpLlxuICogT3BhcXVlIHJlc3BvbnNlcyBhcmUgYXJlIGNyb3NzLW9yaWdpbiByZXF1ZXN0cyB3aGVyZSB0aGUgcmVzcG9uc2UgZG9lc24ndFxuICogc3VwcG9ydCBbQ09SU10oaHR0cHM6Ly9lbmFibGUtY29ycy5vcmcvKS5cbiAqXG4gKiBJZiB0aGUgbmV0d29yayByZXF1ZXN0IGZhaWxzLCBhbmQgdGhlcmUgaXMgbm8gY2FjaGUgbWF0Y2gsIHRoaXMgd2lsbCB0aHJvd1xuICogYSBgV29ya2JveEVycm9yYCBleGNlcHRpb24uXG4gKlxuICogQGV4dGVuZHMgd29ya2JveC1zdHJhdGVnaWVzLlN0cmF0ZWd5XG4gKiBAbWVtYmVyb2Ygd29ya2JveC1zdHJhdGVnaWVzXG4gKi9cbmNsYXNzIE5ldHdvcmtGaXJzdCBleHRlbmRzIFN0cmF0ZWd5IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmNhY2hlTmFtZV0gQ2FjaGUgbmFtZSB0byBzdG9yZSBhbmQgcmV0cmlldmVcbiAgICAgKiByZXF1ZXN0cy4gRGVmYXVsdHMgdG8gY2FjaGUgbmFtZXMgcHJvdmlkZWQgYnlcbiAgICAgKiB7QGxpbmsgd29ya2JveC1jb3JlLmNhY2hlTmFtZXN9LlxuICAgICAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gW29wdGlvbnMucGx1Z2luc10gW1BsdWdpbnNde0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3dlYi90b29scy93b3JrYm94L2d1aWRlcy91c2luZy1wbHVnaW5zfVxuICAgICAqIHRvIHVzZSBpbiBjb25qdW5jdGlvbiB3aXRoIHRoaXMgY2FjaGluZyBzdHJhdGVneS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMuZmV0Y2hPcHRpb25zXSBWYWx1ZXMgcGFzc2VkIGFsb25nIHRvIHRoZVxuICAgICAqIFtgaW5pdGBdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XaW5kb3dPcldvcmtlckdsb2JhbFNjb3BlL2ZldGNoI1BhcmFtZXRlcnMpXG4gICAgICogb2YgW25vbi1uYXZpZ2F0aW9uXShodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3dvcmtib3gvaXNzdWVzLzE3OTYpXG4gICAgICogYGZldGNoKClgIHJlcXVlc3RzIG1hZGUgYnkgdGhpcyBzdHJhdGVneS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMubWF0Y2hPcHRpb25zXSBbYENhY2hlUXVlcnlPcHRpb25zYF0oaHR0cHM6Ly93M2MuZ2l0aHViLmlvL1NlcnZpY2VXb3JrZXIvI2RpY3RkZWYtY2FjaGVxdWVyeW9wdGlvbnMpXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm5ldHdvcmtUaW1lb3V0U2Vjb25kc10gSWYgc2V0LCBhbnkgbmV0d29yayByZXF1ZXN0c1xuICAgICAqIHRoYXQgZmFpbCB0byByZXNwb25kIHdpdGhpbiB0aGUgdGltZW91dCB3aWxsIGZhbGxiYWNrIHRvIHRoZSBjYWNoZS5cbiAgICAgKlxuICAgICAqIFRoaXMgb3B0aW9uIGNhbiBiZSB1c2VkIHRvIGNvbWJhdFxuICAgICAqIFwiW2xpZS1maV17QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vd2ViL2Z1bmRhbWVudGFscy9wZXJmb3JtYW5jZS9wb29yLWNvbm5lY3Rpdml0eS8jbGllLWZpfVwiXG4gICAgICogc2NlbmFyaW9zLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgLy8gSWYgdGhpcyBpbnN0YW5jZSBjb250YWlucyBubyBwbHVnaW5zIHdpdGggYSAnY2FjaGVXaWxsVXBkYXRlJyBjYWxsYmFjayxcbiAgICAgICAgLy8gcHJlcGVuZCB0aGUgYGNhY2hlT2tBbmRPcGFxdWVQbHVnaW5gIHBsdWdpbiB0byB0aGUgcGx1Z2lucyBsaXN0LlxuICAgICAgICBpZiAoIXRoaXMucGx1Z2lucy5zb21lKChwKSA9PiAnY2FjaGVXaWxsVXBkYXRlJyBpbiBwKSkge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW5zLnVuc2hpZnQoY2FjaGVPa0FuZE9wYXF1ZVBsdWdpbik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbmV0d29ya1RpbWVvdXRTZWNvbmRzID0gb3B0aW9ucy5uZXR3b3JrVGltZW91dFNlY29uZHMgfHwgMDtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9uZXR3b3JrVGltZW91dFNlY29uZHMpIHtcbiAgICAgICAgICAgICAgICBhc3NlcnQuaXNUeXBlKHRoaXMuX25ldHdvcmtUaW1lb3V0U2Vjb25kcywgJ251bWJlcicsIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtc3RyYXRlZ2llcycsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogdGhpcy5jb25zdHJ1Y3Rvci5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ2NvbnN0cnVjdG9yJyxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1OYW1lOiAnbmV0d29ya1RpbWVvdXRTZWNvbmRzJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7UmVxdWVzdHxzdHJpbmd9IHJlcXVlc3QgQSByZXF1ZXN0IHRvIHJ1biB0aGlzIHN0cmF0ZWd5IGZvci5cbiAgICAgKiBAcGFyYW0ge3dvcmtib3gtc3RyYXRlZ2llcy5TdHJhdGVneUhhbmRsZXJ9IGhhbmRsZXIgVGhlIGV2ZW50IHRoYXRcbiAgICAgKiAgICAgdHJpZ2dlcmVkIHRoZSByZXF1ZXN0LlxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8UmVzcG9uc2U+fVxuICAgICAqL1xuICAgIGFzeW5jIF9oYW5kbGUocmVxdWVzdCwgaGFuZGxlcikge1xuICAgICAgICBjb25zdCBsb2dzID0gW107XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBhc3NlcnQuaXNJbnN0YW5jZShyZXF1ZXN0LCBSZXF1ZXN0LCB7XG4gICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtc3RyYXRlZ2llcycsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiB0aGlzLmNvbnN0cnVjdG9yLm5hbWUsXG4gICAgICAgICAgICAgICAgZnVuY05hbWU6ICdoYW5kbGUnLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ21ha2VSZXF1ZXN0JyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gW107XG4gICAgICAgIGxldCB0aW1lb3V0SWQ7XG4gICAgICAgIGlmICh0aGlzLl9uZXR3b3JrVGltZW91dFNlY29uZHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgaWQsIHByb21pc2UgfSA9IHRoaXMuX2dldFRpbWVvdXRQcm9taXNlKHsgcmVxdWVzdCwgbG9ncywgaGFuZGxlciB9KTtcbiAgICAgICAgICAgIHRpbWVvdXRJZCA9IGlkO1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChwcm9taXNlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXR3b3JrUHJvbWlzZSA9IHRoaXMuX2dldE5ldHdvcmtQcm9taXNlKHtcbiAgICAgICAgICAgIHRpbWVvdXRJZCxcbiAgICAgICAgICAgIHJlcXVlc3QsXG4gICAgICAgICAgICBsb2dzLFxuICAgICAgICAgICAgaGFuZGxlcixcbiAgICAgICAgfSk7XG4gICAgICAgIHByb21pc2VzLnB1c2gobmV0d29ya1Byb21pc2UpO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGhhbmRsZXIud2FpdFVudGlsKChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAvLyBQcm9taXNlLnJhY2UoKSB3aWxsIHJlc29sdmUgYXMgc29vbiBhcyB0aGUgZmlyc3QgcHJvbWlzZSByZXNvbHZlcy5cbiAgICAgICAgICAgIHJldHVybiAoKGF3YWl0IGhhbmRsZXIud2FpdFVudGlsKFByb21pc2UucmFjZShwcm9taXNlcykpKSB8fFxuICAgICAgICAgICAgICAgIC8vIElmIFByb21pc2UucmFjZSgpIHJlc29sdmVkIHdpdGggbnVsbCwgaXQgbWlnaHQgYmUgZHVlIHRvIGEgbmV0d29ya1xuICAgICAgICAgICAgICAgIC8vIHRpbWVvdXQgKyBhIGNhY2hlIG1pc3MuIElmIHRoYXQgd2VyZSB0byBoYXBwZW4sIHdlJ2QgcmF0aGVyIHdhaXQgdW50aWxcbiAgICAgICAgICAgICAgICAvLyB0aGUgbmV0d29ya1Byb21pc2UgcmVzb2x2ZXMgaW5zdGVhZCBvZiByZXR1cm5pbmcgbnVsbC5cbiAgICAgICAgICAgICAgICAvLyBOb3RlIHRoYXQgaXQncyBmaW5lIHRvIGF3YWl0IGFuIGFscmVhZHktcmVzb2x2ZWQgcHJvbWlzZSwgc28gd2UgZG9uJ3RcbiAgICAgICAgICAgICAgICAvLyBoYXZlIHRvIGNoZWNrIHRvIHNlZSBpZiBpdCdzIHN0aWxsIFwiaW4gZmxpZ2h0XCIuXG4gICAgICAgICAgICAgICAgKGF3YWl0IG5ldHdvcmtQcm9taXNlKSk7XG4gICAgICAgIH0pKCkpO1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgbG9nZ2VyLmdyb3VwQ29sbGFwc2VkKG1lc3NhZ2VzLnN0cmF0ZWd5U3RhcnQodGhpcy5jb25zdHJ1Y3Rvci5uYW1lLCByZXF1ZXN0KSk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGxvZyBvZiBsb2dzKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhsb2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWVzc2FnZXMucHJpbnRGaW5hbFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIGxvZ2dlci5ncm91cEVuZCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBXb3JrYm94RXJyb3IoJ25vLXJlc3BvbnNlJywgeyB1cmw6IHJlcXVlc3QudXJsIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge1JlcXVlc3R9IG9wdGlvbnMucmVxdWVzdFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMubG9ncyBBIHJlZmVyZW5jZSB0byB0aGUgbG9ncyBhcnJheVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IG9wdGlvbnMuZXZlbnRcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPFJlc3BvbnNlPn1cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2dldFRpbWVvdXRQcm9taXNlKHsgcmVxdWVzdCwgbG9ncywgaGFuZGxlciwgfSkge1xuICAgICAgICBsZXQgdGltZW91dElkO1xuICAgICAgICBjb25zdCB0aW1lb3V0UHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvbk5ldHdvcmtUaW1lb3V0ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ3MucHVzaChgVGltaW5nIG91dCB0aGUgbmV0d29yayByZXNwb25zZSBhdCBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGAke3RoaXMuX25ldHdvcmtUaW1lb3V0U2Vjb25kc30gc2Vjb25kcy5gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShhd2FpdCBoYW5kbGVyLmNhY2hlTWF0Y2gocmVxdWVzdCkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRpbWVvdXRJZCA9IHNldFRpbWVvdXQob25OZXR3b3JrVGltZW91dCwgdGhpcy5fbmV0d29ya1RpbWVvdXRTZWNvbmRzICogMTAwMCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJvbWlzZTogdGltZW91dFByb21pc2UsXG4gICAgICAgICAgICBpZDogdGltZW91dElkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfHVuZGVmaW5lZH0gb3B0aW9ucy50aW1lb3V0SWRcbiAgICAgKiBAcGFyYW0ge1JlcXVlc3R9IG9wdGlvbnMucmVxdWVzdFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMubG9ncyBBIHJlZmVyZW5jZSB0byB0aGUgbG9ncyBBcnJheS5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBvcHRpb25zLmV2ZW50XG4gICAgICogQHJldHVybiB7UHJvbWlzZTxSZXNwb25zZT59XG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGFzeW5jIF9nZXROZXR3b3JrUHJvbWlzZSh7IHRpbWVvdXRJZCwgcmVxdWVzdCwgbG9ncywgaGFuZGxlciwgfSkge1xuICAgICAgICBsZXQgZXJyb3I7XG4gICAgICAgIGxldCByZXNwb25zZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0gYXdhaXQgaGFuZGxlci5mZXRjaEFuZENhY2hlUHV0KHJlcXVlc3QpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChmZXRjaEVycm9yKSB7XG4gICAgICAgICAgICBpZiAoZmV0Y2hFcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IgPSBmZXRjaEVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aW1lb3V0SWQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBsb2dzLnB1c2goYEdvdCByZXNwb25zZSBmcm9tIG5ldHdvcmsuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsb2dzLnB1c2goYFVuYWJsZSB0byBnZXQgYSByZXNwb25zZSBmcm9tIHRoZSBuZXR3b3JrLiBXaWxsIHJlc3BvbmQgYCArXG4gICAgICAgICAgICAgICAgICAgIGB3aXRoIGEgY2FjaGVkIHJlc3BvbnNlLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvciB8fCAhcmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0gYXdhaXQgaGFuZGxlci5jYWNoZU1hdGNoKHJlcXVlc3QpO1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9ncy5wdXNoKGBGb3VuZCBhIGNhY2hlZCByZXNwb25zZSBpbiB0aGUgJyR7dGhpcy5jYWNoZU5hbWV9J2AgKyBgIGNhY2hlLmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbG9ncy5wdXNoKGBObyByZXNwb25zZSBmb3VuZCBpbiB0aGUgJyR7dGhpcy5jYWNoZU5hbWV9JyBjYWNoZS5gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cbn1cbmV4cG9ydCB7IE5ldHdvcmtGaXJzdCB9O1xuIiwgIi8qXG4gIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9hc3NlcnQuanMnO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2xvZ2dlci5qcyc7XG5pbXBvcnQgeyBXb3JrYm94RXJyb3IgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvV29ya2JveEVycm9yLmpzJztcbmltcG9ydCB7IGNhY2hlT2tBbmRPcGFxdWVQbHVnaW4gfSBmcm9tICcuL3BsdWdpbnMvY2FjaGVPa0FuZE9wYXF1ZVBsdWdpbi5qcyc7XG5pbXBvcnQgeyBTdHJhdGVneSB9IGZyb20gJy4vU3RyYXRlZ3kuanMnO1xuaW1wb3J0IHsgbWVzc2FnZXMgfSBmcm9tICcuL3V0aWxzL21lc3NhZ2VzLmpzJztcbmltcG9ydCAnLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIEFuIGltcGxlbWVudGF0aW9uIG9mIGFcbiAqIFtzdGFsZS13aGlsZS1yZXZhbGlkYXRlXShodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2RvY3Mvd29ya2JveC9jYWNoaW5nLXN0cmF0ZWdpZXMtb3ZlcnZpZXcvI3N0YWxlLXdoaWxlLXJldmFsaWRhdGUpXG4gKiByZXF1ZXN0IHN0cmF0ZWd5LlxuICpcbiAqIFJlc291cmNlcyBhcmUgcmVxdWVzdGVkIGZyb20gYm90aCB0aGUgY2FjaGUgYW5kIHRoZSBuZXR3b3JrIGluIHBhcmFsbGVsLlxuICogVGhlIHN0cmF0ZWd5IHdpbGwgcmVzcG9uZCB3aXRoIHRoZSBjYWNoZWQgdmVyc2lvbiBpZiBhdmFpbGFibGUsIG90aGVyd2lzZVxuICogd2FpdCBmb3IgdGhlIG5ldHdvcmsgcmVzcG9uc2UuIFRoZSBjYWNoZSBpcyB1cGRhdGVkIHdpdGggdGhlIG5ldHdvcmsgcmVzcG9uc2VcbiAqIHdpdGggZWFjaCBzdWNjZXNzZnVsIHJlcXVlc3QuXG4gKlxuICogQnkgZGVmYXVsdCwgdGhpcyBzdHJhdGVneSB3aWxsIGNhY2hlIHJlc3BvbnNlcyB3aXRoIGEgMjAwIHN0YXR1cyBjb2RlIGFzXG4gKiB3ZWxsIGFzIFtvcGFxdWUgcmVzcG9uc2VzXShodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2RvY3Mvd29ya2JveC9jYWNoaW5nLXJlc291cmNlcy1kdXJpbmctcnVudGltZS8jb3BhcXVlLXJlc3BvbnNlcykuXG4gKiBPcGFxdWUgcmVzcG9uc2VzIGFyZSBjcm9zcy1vcmlnaW4gcmVxdWVzdHMgd2hlcmUgdGhlIHJlc3BvbnNlIGRvZXNuJ3RcbiAqIHN1cHBvcnQgW0NPUlNdKGh0dHBzOi8vZW5hYmxlLWNvcnMub3JnLykuXG4gKlxuICogSWYgdGhlIG5ldHdvcmsgcmVxdWVzdCBmYWlscywgYW5kIHRoZXJlIGlzIG5vIGNhY2hlIG1hdGNoLCB0aGlzIHdpbGwgdGhyb3dcbiAqIGEgYFdvcmtib3hFcnJvcmAgZXhjZXB0aW9uLlxuICpcbiAqIEBleHRlbmRzIHdvcmtib3gtc3RyYXRlZ2llcy5TdHJhdGVneVxuICogQG1lbWJlcm9mIHdvcmtib3gtc3RyYXRlZ2llc1xuICovXG5jbGFzcyBTdGFsZVdoaWxlUmV2YWxpZGF0ZSBleHRlbmRzIFN0cmF0ZWd5IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmNhY2hlTmFtZV0gQ2FjaGUgbmFtZSB0byBzdG9yZSBhbmQgcmV0cmlldmVcbiAgICAgKiByZXF1ZXN0cy4gRGVmYXVsdHMgdG8gY2FjaGUgbmFtZXMgcHJvdmlkZWQgYnlcbiAgICAgKiB7QGxpbmsgd29ya2JveC1jb3JlLmNhY2hlTmFtZXN9LlxuICAgICAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gW29wdGlvbnMucGx1Z2luc10gW1BsdWdpbnNde0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3dlYi90b29scy93b3JrYm94L2d1aWRlcy91c2luZy1wbHVnaW5zfVxuICAgICAqIHRvIHVzZSBpbiBjb25qdW5jdGlvbiB3aXRoIHRoaXMgY2FjaGluZyBzdHJhdGVneS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMuZmV0Y2hPcHRpb25zXSBWYWx1ZXMgcGFzc2VkIGFsb25nIHRvIHRoZVxuICAgICAqIFtgaW5pdGBdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XaW5kb3dPcldvcmtlckdsb2JhbFNjb3BlL2ZldGNoI1BhcmFtZXRlcnMpXG4gICAgICogb2YgW25vbi1uYXZpZ2F0aW9uXShodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3dvcmtib3gvaXNzdWVzLzE3OTYpXG4gICAgICogYGZldGNoKClgIHJlcXVlc3RzIG1hZGUgYnkgdGhpcyBzdHJhdGVneS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMubWF0Y2hPcHRpb25zXSBbYENhY2hlUXVlcnlPcHRpb25zYF0oaHR0cHM6Ly93M2MuZ2l0aHViLmlvL1NlcnZpY2VXb3JrZXIvI2RpY3RkZWYtY2FjaGVxdWVyeW9wdGlvbnMpXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICAvLyBJZiB0aGlzIGluc3RhbmNlIGNvbnRhaW5zIG5vIHBsdWdpbnMgd2l0aCBhICdjYWNoZVdpbGxVcGRhdGUnIGNhbGxiYWNrLFxuICAgICAgICAvLyBwcmVwZW5kIHRoZSBgY2FjaGVPa0FuZE9wYXF1ZVBsdWdpbmAgcGx1Z2luIHRvIHRoZSBwbHVnaW5zIGxpc3QuXG4gICAgICAgIGlmICghdGhpcy5wbHVnaW5zLnNvbWUoKHApID0+ICdjYWNoZVdpbGxVcGRhdGUnIGluIHApKSB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbnMudW5zaGlmdChjYWNoZU9rQW5kT3BhcXVlUGx1Z2luKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7UmVxdWVzdHxzdHJpbmd9IHJlcXVlc3QgQSByZXF1ZXN0IHRvIHJ1biB0aGlzIHN0cmF0ZWd5IGZvci5cbiAgICAgKiBAcGFyYW0ge3dvcmtib3gtc3RyYXRlZ2llcy5TdHJhdGVneUhhbmRsZXJ9IGhhbmRsZXIgVGhlIGV2ZW50IHRoYXRcbiAgICAgKiAgICAgdHJpZ2dlcmVkIHRoZSByZXF1ZXN0LlxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8UmVzcG9uc2U+fVxuICAgICAqL1xuICAgIGFzeW5jIF9oYW5kbGUocmVxdWVzdCwgaGFuZGxlcikge1xuICAgICAgICBjb25zdCBsb2dzID0gW107XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBhc3NlcnQuaXNJbnN0YW5jZShyZXF1ZXN0LCBSZXF1ZXN0LCB7XG4gICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtc3RyYXRlZ2llcycsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiB0aGlzLmNvbnN0cnVjdG9yLm5hbWUsXG4gICAgICAgICAgICAgICAgZnVuY05hbWU6ICdoYW5kbGUnLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ3JlcXVlc3QnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmV0Y2hBbmRDYWNoZVByb21pc2UgPSBoYW5kbGVyLmZldGNoQW5kQ2FjaGVQdXQocmVxdWVzdCkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgLy8gU3dhbGxvdyB0aGlzIGVycm9yIGJlY2F1c2UgYSAnbm8tcmVzcG9uc2UnIGVycm9yIHdpbGwgYmUgdGhyb3duIGluXG4gICAgICAgICAgICAvLyBtYWluIGhhbmRsZXIgcmV0dXJuIGZsb3cuIFRoaXMgd2lsbCBiZSBpbiB0aGUgYHdhaXRVbnRpbCgpYCBmbG93LlxuICAgICAgICB9KTtcbiAgICAgICAgdm9pZCBoYW5kbGVyLndhaXRVbnRpbChmZXRjaEFuZENhY2hlUHJvbWlzZSk7XG4gICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGhhbmRsZXIuY2FjaGVNYXRjaChyZXF1ZXN0KTtcbiAgICAgICAgbGV0IGVycm9yO1xuICAgICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgbG9ncy5wdXNoKGBGb3VuZCBhIGNhY2hlZCByZXNwb25zZSBpbiB0aGUgJyR7dGhpcy5jYWNoZU5hbWV9J2AgK1xuICAgICAgICAgICAgICAgICAgICBgIGNhY2hlLiBXaWxsIHVwZGF0ZSB3aXRoIHRoZSBuZXR3b3JrIHJlc3BvbnNlIGluIHRoZSBiYWNrZ3JvdW5kLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBsb2dzLnB1c2goYE5vIHJlc3BvbnNlIGZvdW5kIGluIHRoZSAnJHt0aGlzLmNhY2hlTmFtZX0nIGNhY2hlLiBgICtcbiAgICAgICAgICAgICAgICAgICAgYFdpbGwgd2FpdCBmb3IgdGhlIG5ldHdvcmsgcmVzcG9uc2UuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIC8vIE5PVEUocGhpbGlwd2FsdG9uKTogUmVhbGx5IGFubm95aW5nIHRoYXQgd2UgaGF2ZSB0byB0eXBlIGNhc3QgaGVyZS5cbiAgICAgICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzIwMDA2XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UgPSAoYXdhaXQgZmV0Y2hBbmRDYWNoZVByb21pc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IGVycjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGxvZ2dlci5ncm91cENvbGxhcHNlZChtZXNzYWdlcy5zdHJhdGVneVN0YXJ0KHRoaXMuY29uc3RydWN0b3IubmFtZSwgcmVxdWVzdCkpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBsb2cgb2YgbG9ncykge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2cobG9nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1lc3NhZ2VzLnByaW50RmluYWxSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICAgICAgICBsb2dnZXIuZ3JvdXBFbmQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJlc3BvbnNlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgV29ya2JveEVycm9yKCduby1yZXNwb25zZScsIHsgdXJsOiByZXF1ZXN0LnVybCwgZXJyb3IgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cbn1cbmV4cG9ydCB7IFN0YWxlV2hpbGVSZXZhbGlkYXRlIH07XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBAdHMtaWdub3JlXG50cnkge1xuICAgIHNlbGZbJ3dvcmtib3g6Y2FjaGVhYmxlLXJlc3BvbnNlOjYuNS4zJ10gJiYgXygpO1xufVxuY2F0Y2ggKGUpIHsgfVxuIiwgIi8qXG4gIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9hc3NlcnQuanMnO1xuaW1wb3J0IHsgV29ya2JveEVycm9yIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL1dvcmtib3hFcnJvci5qcyc7XG5pbXBvcnQgeyBnZXRGcmllbmRseVVSTCB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9nZXRGcmllbmRseVVSTC5qcyc7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvbG9nZ2VyLmpzJztcbmltcG9ydCAnLi9fdmVyc2lvbi5qcyc7XG4vKipcbiAqIFRoaXMgY2xhc3MgYWxsb3dzIHlvdSB0byBzZXQgdXAgcnVsZXMgZGV0ZXJtaW5pbmcgd2hhdFxuICogc3RhdHVzIGNvZGVzIGFuZC9vciBoZWFkZXJzIG5lZWQgdG8gYmUgcHJlc2VudCBpbiBvcmRlciBmb3IgYVxuICogW2BSZXNwb25zZWBdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9SZXNwb25zZSlcbiAqIHRvIGJlIGNvbnNpZGVyZWQgY2FjaGVhYmxlLlxuICpcbiAqIEBtZW1iZXJvZiB3b3JrYm94LWNhY2hlYWJsZS1yZXNwb25zZVxuICovXG5jbGFzcyBDYWNoZWFibGVSZXNwb25zZSB7XG4gICAgLyoqXG4gICAgICogVG8gY29uc3RydWN0IGEgbmV3IENhY2hlYWJsZVJlc3BvbnNlIGluc3RhbmNlIHlvdSBtdXN0IHByb3ZpZGUgYXQgbGVhc3RcbiAgICAgKiBvbmUgb2YgdGhlIGBjb25maWdgIHByb3BlcnRpZXMuXG4gICAgICpcbiAgICAgKiBJZiBib3RoIGBzdGF0dXNlc2AgYW5kIGBoZWFkZXJzYCBhcmUgc3BlY2lmaWVkLCB0aGVuIGJvdGggY29uZGl0aW9ucyBtdXN0XG4gICAgICogYmUgbWV0IGZvciB0aGUgYFJlc3BvbnNlYCB0byBiZSBjb25zaWRlcmVkIGNhY2hlYWJsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IFtjb25maWcuc3RhdHVzZXNdIE9uZSBvciBtb3JlIHN0YXR1cyBjb2RlcyB0aGF0IGFcbiAgICAgKiBgUmVzcG9uc2VgIGNhbiBoYXZlIGFuZCBiZSBjb25zaWRlcmVkIGNhY2hlYWJsZS5cbiAgICAgKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsc3RyaW5nPn0gW2NvbmZpZy5oZWFkZXJzXSBBIG1hcHBpbmcgb2YgaGVhZGVyIG5hbWVzXG4gICAgICogYW5kIGV4cGVjdGVkIHZhbHVlcyB0aGF0IGEgYFJlc3BvbnNlYCBjYW4gaGF2ZSBhbmQgYmUgY29uc2lkZXJlZCBjYWNoZWFibGUuXG4gICAgICogSWYgbXVsdGlwbGUgaGVhZGVycyBhcmUgcHJvdmlkZWQsIG9ubHkgb25lIG5lZWRzIHRvIGJlIHByZXNlbnQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnID0ge30pIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGlmICghKGNvbmZpZy5zdGF0dXNlcyB8fCBjb25maWcuaGVhZGVycykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgV29ya2JveEVycm9yKCdzdGF0dXNlcy1vci1oZWFkZXJzLXJlcXVpcmVkJywge1xuICAgICAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1jYWNoZWFibGUtcmVzcG9uc2UnLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdDYWNoZWFibGVSZXNwb25zZScsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAnY29uc3RydWN0b3InLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbmZpZy5zdGF0dXNlcykge1xuICAgICAgICAgICAgICAgIGFzc2VydC5pc0FycmF5KGNvbmZpZy5zdGF0dXNlcywge1xuICAgICAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1jYWNoZWFibGUtcmVzcG9uc2UnLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdDYWNoZWFibGVSZXNwb25zZScsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAnY29uc3RydWN0b3InLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbU5hbWU6ICdjb25maWcuc3RhdHVzZXMnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbmZpZy5oZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0LmlzVHlwZShjb25maWcuaGVhZGVycywgJ29iamVjdCcsIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtY2FjaGVhYmxlLXJlc3BvbnNlJyxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnQ2FjaGVhYmxlUmVzcG9uc2UnLFxuICAgICAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ2NvbnN0cnVjdG9yJyxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1OYW1lOiAnY29uZmlnLmhlYWRlcnMnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N0YXR1c2VzID0gY29uZmlnLnN0YXR1c2VzO1xuICAgICAgICB0aGlzLl9oZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrcyBhIHJlc3BvbnNlIHRvIHNlZSB3aGV0aGVyIGl0J3MgY2FjaGVhYmxlIG9yIG5vdCwgYmFzZWQgb24gdGhpc1xuICAgICAqIG9iamVjdCdzIGNvbmZpZ3VyYXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNwb25zZSBUaGUgcmVzcG9uc2Ugd2hvc2UgY2FjaGVhYmlsaXR5IGlzIGJlaW5nXG4gICAgICogY2hlY2tlZC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBgdHJ1ZWAgaWYgdGhlIGBSZXNwb25zZWAgaXMgY2FjaGVhYmxlLCBhbmQgYGZhbHNlYFxuICAgICAqIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBpc1Jlc3BvbnNlQ2FjaGVhYmxlKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBhc3NlcnQuaXNJbnN0YW5jZShyZXNwb25zZSwgUmVzcG9uc2UsIHtcbiAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1jYWNoZWFibGUtcmVzcG9uc2UnLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ0NhY2hlYWJsZVJlc3BvbnNlJyxcbiAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ2lzUmVzcG9uc2VDYWNoZWFibGUnLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ3Jlc3BvbnNlJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjYWNoZWFibGUgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5fc3RhdHVzZXMpIHtcbiAgICAgICAgICAgIGNhY2hlYWJsZSA9IHRoaXMuX3N0YXR1c2VzLmluY2x1ZGVzKHJlc3BvbnNlLnN0YXR1cyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2hlYWRlcnMgJiYgY2FjaGVhYmxlKSB7XG4gICAgICAgICAgICBjYWNoZWFibGUgPSBPYmplY3Qua2V5cyh0aGlzLl9oZWFkZXJzKS5zb21lKChoZWFkZXJOYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmhlYWRlcnMuZ2V0KGhlYWRlck5hbWUpID09PSB0aGlzLl9oZWFkZXJzW2hlYWRlck5hbWVdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGlmICghY2FjaGVhYmxlKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmdyb3VwQ29sbGFwc2VkKGBUaGUgcmVxdWVzdCBmb3IgYCArXG4gICAgICAgICAgICAgICAgICAgIGAnJHtnZXRGcmllbmRseVVSTChyZXNwb25zZS51cmwpfScgcmV0dXJuZWQgYSByZXNwb25zZSB0aGF0IGRvZXMgYCArXG4gICAgICAgICAgICAgICAgICAgIGBub3QgbWVldCB0aGUgY3JpdGVyaWEgZm9yIGJlaW5nIGNhY2hlZC5gKTtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZ3JvdXBDb2xsYXBzZWQoYFZpZXcgY2FjaGVhYmlsaXR5IGNyaXRlcmlhIGhlcmUuYCk7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgQ2FjaGVhYmxlIHN0YXR1c2VzOiBgICsgSlNPTi5zdHJpbmdpZnkodGhpcy5fc3RhdHVzZXMpKTtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBDYWNoZWFibGUgaGVhZGVyczogYCArIEpTT04uc3RyaW5naWZ5KHRoaXMuX2hlYWRlcnMsIG51bGwsIDIpKTtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZ3JvdXBFbmQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsb2dGcmllbmRseUhlYWRlcnMgPSB7fTtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5oZWFkZXJzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbG9nRnJpZW5kbHlIZWFkZXJzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZ3JvdXBDb2xsYXBzZWQoYFZpZXcgcmVzcG9uc2Ugc3RhdHVzIGFuZCBoZWFkZXJzIGhlcmUuYCk7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgUmVzcG9uc2Ugc3RhdHVzOiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXNwb25zZSBoZWFkZXJzOiBgICsgSlNPTi5zdHJpbmdpZnkobG9nRnJpZW5kbHlIZWFkZXJzLCBudWxsLCAyKSk7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmdyb3VwRW5kKCk7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmdyb3VwQ29sbGFwc2VkKGBWaWV3IGZ1bGwgcmVzcG9uc2UgZGV0YWlscyBoZXJlLmApO1xuICAgICAgICAgICAgICAgIGxvZ2dlci5sb2cocmVzcG9uc2UuaGVhZGVycyk7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmdyb3VwRW5kKCk7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmdyb3VwRW5kKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNhY2hlYWJsZTtcbiAgICB9XG59XG5leHBvcnQgeyBDYWNoZWFibGVSZXNwb25zZSB9O1xuIiwgIi8qXG4gIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IENhY2hlYWJsZVJlc3BvbnNlLCB9IGZyb20gJy4vQ2FjaGVhYmxlUmVzcG9uc2UuanMnO1xuaW1wb3J0ICcuL192ZXJzaW9uLmpzJztcbi8qKlxuICogQSBjbGFzcyBpbXBsZW1lbnRpbmcgdGhlIGBjYWNoZVdpbGxVcGRhdGVgIGxpZmVjeWNsZSBjYWxsYmFjay4gVGhpcyBtYWtlcyBpdFxuICogZWFzaWVyIHRvIGFkZCBpbiBjYWNoZWFiaWxpdHkgY2hlY2tzIHRvIHJlcXVlc3RzIG1hZGUgdmlhIFdvcmtib3gncyBidWlsdC1pblxuICogc3RyYXRlZ2llcy5cbiAqXG4gKiBAbWVtYmVyb2Ygd29ya2JveC1jYWNoZWFibGUtcmVzcG9uc2VcbiAqL1xuY2xhc3MgQ2FjaGVhYmxlUmVzcG9uc2VQbHVnaW4ge1xuICAgIC8qKlxuICAgICAqIFRvIGNvbnN0cnVjdCBhIG5ldyBDYWNoZWFibGVSZXNwb25zZVBsdWdpbiBpbnN0YW5jZSB5b3UgbXVzdCBwcm92aWRlIGF0XG4gICAgICogbGVhc3Qgb25lIG9mIHRoZSBgY29uZmlnYCBwcm9wZXJ0aWVzLlxuICAgICAqXG4gICAgICogSWYgYm90aCBgc3RhdHVzZXNgIGFuZCBgaGVhZGVyc2AgYXJlIHNwZWNpZmllZCwgdGhlbiBib3RoIGNvbmRpdGlvbnMgbXVzdFxuICAgICAqIGJlIG1ldCBmb3IgdGhlIGBSZXNwb25zZWAgdG8gYmUgY29uc2lkZXJlZCBjYWNoZWFibGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbY29uZmlnLnN0YXR1c2VzXSBPbmUgb3IgbW9yZSBzdGF0dXMgY29kZXMgdGhhdCBhXG4gICAgICogYFJlc3BvbnNlYCBjYW4gaGF2ZSBhbmQgYmUgY29uc2lkZXJlZCBjYWNoZWFibGUuXG4gICAgICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLHN0cmluZz59IFtjb25maWcuaGVhZGVyc10gQSBtYXBwaW5nIG9mIGhlYWRlciBuYW1lc1xuICAgICAqIGFuZCBleHBlY3RlZCB2YWx1ZXMgdGhhdCBhIGBSZXNwb25zZWAgY2FuIGhhdmUgYW5kIGJlIGNvbnNpZGVyZWQgY2FjaGVhYmxlLlxuICAgICAqIElmIG11bHRpcGxlIGhlYWRlcnMgYXJlIHByb3ZpZGVkLCBvbmx5IG9uZSBuZWVkcyB0byBiZSBwcmVzZW50LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAgICogQHBhcmFtIHtSZXNwb25zZX0gb3B0aW9ucy5yZXNwb25zZVxuICAgICAgICAgKiBAcmV0dXJuIHtSZXNwb25zZXxudWxsfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jYWNoZVdpbGxVcGRhdGUgPSBhc3luYyAoeyByZXNwb25zZSB9KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fY2FjaGVhYmxlUmVzcG9uc2UuaXNSZXNwb25zZUNhY2hlYWJsZShyZXNwb25zZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fY2FjaGVhYmxlUmVzcG9uc2UgPSBuZXcgQ2FjaGVhYmxlUmVzcG9uc2UoY29uZmlnKTtcbiAgICB9XG59XG5leHBvcnQgeyBDYWNoZWFibGVSZXNwb25zZVBsdWdpbiB9O1xuIiwgImNvbnN0IGluc3RhbmNlT2ZBbnkgPSAob2JqZWN0LCBjb25zdHJ1Y3RvcnMpID0+IGNvbnN0cnVjdG9ycy5zb21lKChjKSA9PiBvYmplY3QgaW5zdGFuY2VvZiBjKTtcblxubGV0IGlkYlByb3h5YWJsZVR5cGVzO1xubGV0IGN1cnNvckFkdmFuY2VNZXRob2RzO1xuLy8gVGhpcyBpcyBhIGZ1bmN0aW9uIHRvIHByZXZlbnQgaXQgdGhyb3dpbmcgdXAgaW4gbm9kZSBlbnZpcm9ubWVudHMuXG5mdW5jdGlvbiBnZXRJZGJQcm94eWFibGVUeXBlcygpIHtcbiAgICByZXR1cm4gKGlkYlByb3h5YWJsZVR5cGVzIHx8XG4gICAgICAgIChpZGJQcm94eWFibGVUeXBlcyA9IFtcbiAgICAgICAgICAgIElEQkRhdGFiYXNlLFxuICAgICAgICAgICAgSURCT2JqZWN0U3RvcmUsXG4gICAgICAgICAgICBJREJJbmRleCxcbiAgICAgICAgICAgIElEQkN1cnNvcixcbiAgICAgICAgICAgIElEQlRyYW5zYWN0aW9uLFxuICAgICAgICBdKSk7XG59XG4vLyBUaGlzIGlzIGEgZnVuY3Rpb24gdG8gcHJldmVudCBpdCB0aHJvd2luZyB1cCBpbiBub2RlIGVudmlyb25tZW50cy5cbmZ1bmN0aW9uIGdldEN1cnNvckFkdmFuY2VNZXRob2RzKCkge1xuICAgIHJldHVybiAoY3Vyc29yQWR2YW5jZU1ldGhvZHMgfHxcbiAgICAgICAgKGN1cnNvckFkdmFuY2VNZXRob2RzID0gW1xuICAgICAgICAgICAgSURCQ3Vyc29yLnByb3RvdHlwZS5hZHZhbmNlLFxuICAgICAgICAgICAgSURCQ3Vyc29yLnByb3RvdHlwZS5jb250aW51ZSxcbiAgICAgICAgICAgIElEQkN1cnNvci5wcm90b3R5cGUuY29udGludWVQcmltYXJ5S2V5LFxuICAgICAgICBdKSk7XG59XG5jb25zdCBjdXJzb3JSZXF1ZXN0TWFwID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHRyYW5zYWN0aW9uRG9uZU1hcCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCB0cmFuc2FjdGlvblN0b3JlTmFtZXNNYXAgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgdHJhbnNmb3JtQ2FjaGUgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgcmV2ZXJzZVRyYW5zZm9ybUNhY2hlID0gbmV3IFdlYWtNYXAoKTtcbmZ1bmN0aW9uIHByb21pc2lmeVJlcXVlc3QocmVxdWVzdCkge1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHVubGlzdGVuID0gKCkgPT4ge1xuICAgICAgICAgICAgcmVxdWVzdC5yZW1vdmVFdmVudExpc3RlbmVyKCdzdWNjZXNzJywgc3VjY2Vzcyk7XG4gICAgICAgICAgICByZXF1ZXN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3IpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBzdWNjZXNzID0gKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSh3cmFwKHJlcXVlc3QucmVzdWx0KSk7XG4gICAgICAgICAgICB1bmxpc3RlbigpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBlcnJvciA9ICgpID0+IHtcbiAgICAgICAgICAgIHJlamVjdChyZXF1ZXN0LmVycm9yKTtcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignc3VjY2VzcycsIHN1Y2Nlc3MpO1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3IpO1xuICAgIH0pO1xuICAgIHByb21pc2VcbiAgICAgICAgLnRoZW4oKHZhbHVlKSA9PiB7XG4gICAgICAgIC8vIFNpbmNlIGN1cnNvcmluZyByZXVzZXMgdGhlIElEQlJlcXVlc3QgKCpzaWdoKiksIHdlIGNhY2hlIGl0IGZvciBsYXRlciByZXRyaWV2YWxcbiAgICAgICAgLy8gKHNlZSB3cmFwRnVuY3Rpb24pLlxuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJREJDdXJzb3IpIHtcbiAgICAgICAgICAgIGN1cnNvclJlcXVlc3RNYXAuc2V0KHZhbHVlLCByZXF1ZXN0KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDYXRjaGluZyB0byBhdm9pZCBcIlVuY2F1Z2h0IFByb21pc2UgZXhjZXB0aW9uc1wiXG4gICAgfSlcbiAgICAgICAgLmNhdGNoKCgpID0+IHsgfSk7XG4gICAgLy8gVGhpcyBtYXBwaW5nIGV4aXN0cyBpbiByZXZlcnNlVHJhbnNmb3JtQ2FjaGUgYnV0IGRvZXNuJ3QgZG9lc24ndCBleGlzdCBpbiB0cmFuc2Zvcm1DYWNoZS4gVGhpc1xuICAgIC8vIGlzIGJlY2F1c2Ugd2UgY3JlYXRlIG1hbnkgcHJvbWlzZXMgZnJvbSBhIHNpbmdsZSBJREJSZXF1ZXN0LlxuICAgIHJldmVyc2VUcmFuc2Zvcm1DYWNoZS5zZXQocHJvbWlzZSwgcmVxdWVzdCk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5mdW5jdGlvbiBjYWNoZURvbmVQcm9taXNlRm9yVHJhbnNhY3Rpb24odHgpIHtcbiAgICAvLyBFYXJseSBiYWlsIGlmIHdlJ3ZlIGFscmVhZHkgY3JlYXRlZCBhIGRvbmUgcHJvbWlzZSBmb3IgdGhpcyB0cmFuc2FjdGlvbi5cbiAgICBpZiAodHJhbnNhY3Rpb25Eb25lTWFwLmhhcyh0eCkpXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCBkb25lID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCB1bmxpc3RlbiA9ICgpID0+IHtcbiAgICAgICAgICAgIHR4LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NvbXBsZXRlJywgY29tcGxldGUpO1xuICAgICAgICAgICAgdHgucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvcik7XG4gICAgICAgICAgICB0eC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIGVycm9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB1bmxpc3RlbigpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBlcnJvciA9ICgpID0+IHtcbiAgICAgICAgICAgIHJlamVjdCh0eC5lcnJvciB8fCBuZXcgRE9NRXhjZXB0aW9uKCdBYm9ydEVycm9yJywgJ0Fib3J0RXJyb3InKSk7XG4gICAgICAgICAgICB1bmxpc3RlbigpO1xuICAgICAgICB9O1xuICAgICAgICB0eC5hZGRFdmVudExpc3RlbmVyKCdjb21wbGV0ZScsIGNvbXBsZXRlKTtcbiAgICAgICAgdHguYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvcik7XG4gICAgICAgIHR4LmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgZXJyb3IpO1xuICAgIH0pO1xuICAgIC8vIENhY2hlIGl0IGZvciBsYXRlciByZXRyaWV2YWwuXG4gICAgdHJhbnNhY3Rpb25Eb25lTWFwLnNldCh0eCwgZG9uZSk7XG59XG5sZXQgaWRiUHJveHlUcmFwcyA9IHtcbiAgICBnZXQodGFyZ2V0LCBwcm9wLCByZWNlaXZlcikge1xuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSURCVHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgIC8vIFNwZWNpYWwgaGFuZGxpbmcgZm9yIHRyYW5zYWN0aW9uLmRvbmUuXG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gJ2RvbmUnKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cmFuc2FjdGlvbkRvbmVNYXAuZ2V0KHRhcmdldCk7XG4gICAgICAgICAgICAvLyBQb2x5ZmlsbCBmb3Igb2JqZWN0U3RvcmVOYW1lcyBiZWNhdXNlIG9mIEVkZ2UuXG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gJ29iamVjdFN0b3JlTmFtZXMnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldC5vYmplY3RTdG9yZU5hbWVzIHx8IHRyYW5zYWN0aW9uU3RvcmVOYW1lc01hcC5nZXQodGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE1ha2UgdHguc3RvcmUgcmV0dXJuIHRoZSBvbmx5IHN0b3JlIGluIHRoZSB0cmFuc2FjdGlvbiwgb3IgdW5kZWZpbmVkIGlmIHRoZXJlIGFyZSBtYW55LlxuICAgICAgICAgICAgaWYgKHByb3AgPT09ICdzdG9yZScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVjZWl2ZXIub2JqZWN0U3RvcmVOYW1lc1sxXVxuICAgICAgICAgICAgICAgICAgICA/IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICA6IHJlY2VpdmVyLm9iamVjdFN0b3JlKHJlY2VpdmVyLm9iamVjdFN0b3JlTmFtZXNbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEVsc2UgdHJhbnNmb3JtIHdoYXRldmVyIHdlIGdldCBiYWNrLlxuICAgICAgICByZXR1cm4gd3JhcCh0YXJnZXRbcHJvcF0pO1xuICAgIH0sXG4gICAgc2V0KHRhcmdldCwgcHJvcCwgdmFsdWUpIHtcbiAgICAgICAgdGFyZ2V0W3Byb3BdID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgaGFzKHRhcmdldCwgcHJvcCkge1xuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSURCVHJhbnNhY3Rpb24gJiZcbiAgICAgICAgICAgIChwcm9wID09PSAnZG9uZScgfHwgcHJvcCA9PT0gJ3N0b3JlJykpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcm9wIGluIHRhcmdldDtcbiAgICB9LFxufTtcbmZ1bmN0aW9uIHJlcGxhY2VUcmFwcyhjYWxsYmFjaykge1xuICAgIGlkYlByb3h5VHJhcHMgPSBjYWxsYmFjayhpZGJQcm94eVRyYXBzKTtcbn1cbmZ1bmN0aW9uIHdyYXBGdW5jdGlvbihmdW5jKSB7XG4gICAgLy8gRHVlIHRvIGV4cGVjdGVkIG9iamVjdCBlcXVhbGl0eSAod2hpY2ggaXMgZW5mb3JjZWQgYnkgdGhlIGNhY2hpbmcgaW4gYHdyYXBgKSwgd2VcbiAgICAvLyBvbmx5IGNyZWF0ZSBvbmUgbmV3IGZ1bmMgcGVyIGZ1bmMuXG4gICAgLy8gRWRnZSBkb2Vzbid0IHN1cHBvcnQgb2JqZWN0U3RvcmVOYW1lcyAoYm9vbyksIHNvIHdlIHBvbHlmaWxsIGl0IGhlcmUuXG4gICAgaWYgKGZ1bmMgPT09IElEQkRhdGFiYXNlLnByb3RvdHlwZS50cmFuc2FjdGlvbiAmJlxuICAgICAgICAhKCdvYmplY3RTdG9yZU5hbWVzJyBpbiBJREJUcmFuc2FjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RvcmVOYW1lcywgLi4uYXJncykge1xuICAgICAgICAgICAgY29uc3QgdHggPSBmdW5jLmNhbGwodW53cmFwKHRoaXMpLCBzdG9yZU5hbWVzLCAuLi5hcmdzKTtcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uU3RvcmVOYW1lc01hcC5zZXQodHgsIHN0b3JlTmFtZXMuc29ydCA/IHN0b3JlTmFtZXMuc29ydCgpIDogW3N0b3JlTmFtZXNdKTtcbiAgICAgICAgICAgIHJldHVybiB3cmFwKHR4KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLy8gQ3Vyc29yIG1ldGhvZHMgYXJlIHNwZWNpYWwsIGFzIHRoZSBiZWhhdmlvdXIgaXMgYSBsaXR0bGUgbW9yZSBkaWZmZXJlbnQgdG8gc3RhbmRhcmQgSURCLiBJblxuICAgIC8vIElEQiwgeW91IGFkdmFuY2UgdGhlIGN1cnNvciBhbmQgd2FpdCBmb3IgYSBuZXcgJ3N1Y2Nlc3MnIG9uIHRoZSBJREJSZXF1ZXN0IHRoYXQgZ2F2ZSB5b3UgdGhlXG4gICAgLy8gY3Vyc29yLiBJdCdzIGtpbmRhIGxpa2UgYSBwcm9taXNlIHRoYXQgY2FuIHJlc29sdmUgd2l0aCBtYW55IHZhbHVlcy4gVGhhdCBkb2Vzbid0IG1ha2Ugc2Vuc2VcbiAgICAvLyB3aXRoIHJlYWwgcHJvbWlzZXMsIHNvIGVhY2ggYWR2YW5jZSBtZXRob2RzIHJldHVybnMgYSBuZXcgcHJvbWlzZSBmb3IgdGhlIGN1cnNvciBvYmplY3QsIG9yXG4gICAgLy8gdW5kZWZpbmVkIGlmIHRoZSBlbmQgb2YgdGhlIGN1cnNvciBoYXMgYmVlbiByZWFjaGVkLlxuICAgIGlmIChnZXRDdXJzb3JBZHZhbmNlTWV0aG9kcygpLmluY2x1ZGVzKGZ1bmMpKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgICAgICAgLy8gQ2FsbGluZyB0aGUgb3JpZ2luYWwgZnVuY3Rpb24gd2l0aCB0aGUgcHJveHkgYXMgJ3RoaXMnIGNhdXNlcyBJTExFR0FMIElOVk9DQVRJT04sIHNvIHdlIHVzZVxuICAgICAgICAgICAgLy8gdGhlIG9yaWdpbmFsIG9iamVjdC5cbiAgICAgICAgICAgIGZ1bmMuYXBwbHkodW53cmFwKHRoaXMpLCBhcmdzKTtcbiAgICAgICAgICAgIHJldHVybiB3cmFwKGN1cnNvclJlcXVlc3RNYXAuZ2V0KHRoaXMpKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICAgIC8vIENhbGxpbmcgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIHdpdGggdGhlIHByb3h5IGFzICd0aGlzJyBjYXVzZXMgSUxMRUdBTCBJTlZPQ0FUSU9OLCBzbyB3ZSB1c2VcbiAgICAgICAgLy8gdGhlIG9yaWdpbmFsIG9iamVjdC5cbiAgICAgICAgcmV0dXJuIHdyYXAoZnVuYy5hcHBseSh1bndyYXAodGhpcyksIGFyZ3MpKTtcbiAgICB9O1xufVxuZnVuY3Rpb24gdHJhbnNmb3JtQ2FjaGFibGVWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpXG4gICAgICAgIHJldHVybiB3cmFwRnVuY3Rpb24odmFsdWUpO1xuICAgIC8vIFRoaXMgZG9lc24ndCByZXR1cm4sIGl0IGp1c3QgY3JlYXRlcyBhICdkb25lJyBwcm9taXNlIGZvciB0aGUgdHJhbnNhY3Rpb24sXG4gICAgLy8gd2hpY2ggaXMgbGF0ZXIgcmV0dXJuZWQgZm9yIHRyYW5zYWN0aW9uLmRvbmUgKHNlZSBpZGJPYmplY3RIYW5kbGVyKS5cbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJREJUcmFuc2FjdGlvbilcbiAgICAgICAgY2FjaGVEb25lUHJvbWlzZUZvclRyYW5zYWN0aW9uKHZhbHVlKTtcbiAgICBpZiAoaW5zdGFuY2VPZkFueSh2YWx1ZSwgZ2V0SWRiUHJveHlhYmxlVHlwZXMoKSkpXG4gICAgICAgIHJldHVybiBuZXcgUHJveHkodmFsdWUsIGlkYlByb3h5VHJhcHMpO1xuICAgIC8vIFJldHVybiB0aGUgc2FtZSB2YWx1ZSBiYWNrIGlmIHdlJ3JlIG5vdCBnb2luZyB0byB0cmFuc2Zvcm0gaXQuXG4gICAgcmV0dXJuIHZhbHVlO1xufVxuZnVuY3Rpb24gd3JhcCh2YWx1ZSkge1xuICAgIC8vIFdlIHNvbWV0aW1lcyBnZW5lcmF0ZSBtdWx0aXBsZSBwcm9taXNlcyBmcm9tIGEgc2luZ2xlIElEQlJlcXVlc3QgKGVnIHdoZW4gY3Vyc29yaW5nKSwgYmVjYXVzZVxuICAgIC8vIElEQiBpcyB3ZWlyZCBhbmQgYSBzaW5nbGUgSURCUmVxdWVzdCBjYW4geWllbGQgbWFueSByZXNwb25zZXMsIHNvIHRoZXNlIGNhbid0IGJlIGNhY2hlZC5cbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJREJSZXF1ZXN0KVxuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdCh2YWx1ZSk7XG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSB0cmFuc2Zvcm1lZCB0aGlzIHZhbHVlIGJlZm9yZSwgcmV1c2UgdGhlIHRyYW5zZm9ybWVkIHZhbHVlLlxuICAgIC8vIFRoaXMgaXMgZmFzdGVyLCBidXQgaXQgYWxzbyBwcm92aWRlcyBvYmplY3QgZXF1YWxpdHkuXG4gICAgaWYgKHRyYW5zZm9ybUNhY2hlLmhhcyh2YWx1ZSkpXG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm1DYWNoZS5nZXQodmFsdWUpO1xuICAgIGNvbnN0IG5ld1ZhbHVlID0gdHJhbnNmb3JtQ2FjaGFibGVWYWx1ZSh2YWx1ZSk7XG4gICAgLy8gTm90IGFsbCB0eXBlcyBhcmUgdHJhbnNmb3JtZWQuXG4gICAgLy8gVGhlc2UgbWF5IGJlIHByaW1pdGl2ZSB0eXBlcywgc28gdGhleSBjYW4ndCBiZSBXZWFrTWFwIGtleXMuXG4gICAgaWYgKG5ld1ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICB0cmFuc2Zvcm1DYWNoZS5zZXQodmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgcmV2ZXJzZVRyYW5zZm9ybUNhY2hlLnNldChuZXdWYWx1ZSwgdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3VmFsdWU7XG59XG5jb25zdCB1bndyYXAgPSAodmFsdWUpID0+IHJldmVyc2VUcmFuc2Zvcm1DYWNoZS5nZXQodmFsdWUpO1xuXG5leHBvcnQgeyByZXZlcnNlVHJhbnNmb3JtQ2FjaGUgYXMgYSwgaW5zdGFuY2VPZkFueSBhcyBpLCByZXBsYWNlVHJhcHMgYXMgciwgdW53cmFwIGFzIHUsIHdyYXAgYXMgdyB9O1xuIiwgImltcG9ydCB7IHcgYXMgd3JhcCwgciBhcyByZXBsYWNlVHJhcHMgfSBmcm9tICcuL3dyYXAtaWRiLXZhbHVlLmpzJztcbmV4cG9ydCB7IHUgYXMgdW53cmFwLCB3IGFzIHdyYXAgfSBmcm9tICcuL3dyYXAtaWRiLXZhbHVlLmpzJztcblxuLyoqXG4gKiBPcGVuIGEgZGF0YWJhc2UuXG4gKlxuICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgZGF0YWJhc2UuXG4gKiBAcGFyYW0gdmVyc2lvbiBTY2hlbWEgdmVyc2lvbi5cbiAqIEBwYXJhbSBjYWxsYmFja3MgQWRkaXRpb25hbCBjYWxsYmFja3MuXG4gKi9cbmZ1bmN0aW9uIG9wZW5EQihuYW1lLCB2ZXJzaW9uLCB7IGJsb2NrZWQsIHVwZ3JhZGUsIGJsb2NraW5nLCB0ZXJtaW5hdGVkIH0gPSB7fSkge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBpbmRleGVkREIub3BlbihuYW1lLCB2ZXJzaW9uKTtcbiAgICBjb25zdCBvcGVuUHJvbWlzZSA9IHdyYXAocmVxdWVzdCk7XG4gICAgaWYgKHVwZ3JhZGUpIHtcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCd1cGdyYWRlbmVlZGVkJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB1cGdyYWRlKHdyYXAocmVxdWVzdC5yZXN1bHQpLCBldmVudC5vbGRWZXJzaW9uLCBldmVudC5uZXdWZXJzaW9uLCB3cmFwKHJlcXVlc3QudHJhbnNhY3Rpb24pKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChibG9ja2VkKVxuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2Jsb2NrZWQnLCAoKSA9PiBibG9ja2VkKCkpO1xuICAgIG9wZW5Qcm9taXNlXG4gICAgICAgIC50aGVuKChkYikgPT4ge1xuICAgICAgICBpZiAodGVybWluYXRlZClcbiAgICAgICAgICAgIGRiLmFkZEV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgKCkgPT4gdGVybWluYXRlZCgpKTtcbiAgICAgICAgaWYgKGJsb2NraW5nKVxuICAgICAgICAgICAgZGIuYWRkRXZlbnRMaXN0ZW5lcigndmVyc2lvbmNoYW5nZScsICgpID0+IGJsb2NraW5nKCkpO1xuICAgIH0pXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7IH0pO1xuICAgIHJldHVybiBvcGVuUHJvbWlzZTtcbn1cbi8qKlxuICogRGVsZXRlIGEgZGF0YWJhc2UuXG4gKlxuICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgZGF0YWJhc2UuXG4gKi9cbmZ1bmN0aW9uIGRlbGV0ZURCKG5hbWUsIHsgYmxvY2tlZCB9ID0ge30pIHtcbiAgICBjb25zdCByZXF1ZXN0ID0gaW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlKG5hbWUpO1xuICAgIGlmIChibG9ja2VkKVxuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2Jsb2NrZWQnLCAoKSA9PiBibG9ja2VkKCkpO1xuICAgIHJldHVybiB3cmFwKHJlcXVlc3QpLnRoZW4oKCkgPT4gdW5kZWZpbmVkKTtcbn1cblxuY29uc3QgcmVhZE1ldGhvZHMgPSBbJ2dldCcsICdnZXRLZXknLCAnZ2V0QWxsJywgJ2dldEFsbEtleXMnLCAnY291bnQnXTtcbmNvbnN0IHdyaXRlTWV0aG9kcyA9IFsncHV0JywgJ2FkZCcsICdkZWxldGUnLCAnY2xlYXInXTtcbmNvbnN0IGNhY2hlZE1ldGhvZHMgPSBuZXcgTWFwKCk7XG5mdW5jdGlvbiBnZXRNZXRob2QodGFyZ2V0LCBwcm9wKSB7XG4gICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgSURCRGF0YWJhc2UgJiZcbiAgICAgICAgIShwcm9wIGluIHRhcmdldCkgJiZcbiAgICAgICAgdHlwZW9mIHByb3AgPT09ICdzdHJpbmcnKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjYWNoZWRNZXRob2RzLmdldChwcm9wKSlcbiAgICAgICAgcmV0dXJuIGNhY2hlZE1ldGhvZHMuZ2V0KHByb3ApO1xuICAgIGNvbnN0IHRhcmdldEZ1bmNOYW1lID0gcHJvcC5yZXBsYWNlKC9Gcm9tSW5kZXgkLywgJycpO1xuICAgIGNvbnN0IHVzZUluZGV4ID0gcHJvcCAhPT0gdGFyZ2V0RnVuY05hbWU7XG4gICAgY29uc3QgaXNXcml0ZSA9IHdyaXRlTWV0aG9kcy5pbmNsdWRlcyh0YXJnZXRGdW5jTmFtZSk7XG4gICAgaWYgKFxuICAgIC8vIEJhaWwgaWYgdGhlIHRhcmdldCBkb2Vzbid0IGV4aXN0IG9uIHRoZSB0YXJnZXQuIEVnLCBnZXRBbGwgaXNuJ3QgaW4gRWRnZS5cbiAgICAhKHRhcmdldEZ1bmNOYW1lIGluICh1c2VJbmRleCA/IElEQkluZGV4IDogSURCT2JqZWN0U3RvcmUpLnByb3RvdHlwZSkgfHxcbiAgICAgICAgIShpc1dyaXRlIHx8IHJlYWRNZXRob2RzLmluY2x1ZGVzKHRhcmdldEZ1bmNOYW1lKSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBtZXRob2QgPSBhc3luYyBmdW5jdGlvbiAoc3RvcmVOYW1lLCAuLi5hcmdzKSB7XG4gICAgICAgIC8vIGlzV3JpdGUgPyAncmVhZHdyaXRlJyA6IHVuZGVmaW5lZCBnemlwcHMgYmV0dGVyLCBidXQgZmFpbHMgaW4gRWRnZSA6KFxuICAgICAgICBjb25zdCB0eCA9IHRoaXMudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCBpc1dyaXRlID8gJ3JlYWR3cml0ZScgOiAncmVhZG9ubHknKTtcbiAgICAgICAgbGV0IHRhcmdldCA9IHR4LnN0b3JlO1xuICAgICAgICBpZiAodXNlSW5kZXgpXG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQuaW5kZXgoYXJncy5zaGlmdCgpKTtcbiAgICAgICAgLy8gTXVzdCByZWplY3QgaWYgb3AgcmVqZWN0cy5cbiAgICAgICAgLy8gSWYgaXQncyBhIHdyaXRlIG9wZXJhdGlvbiwgbXVzdCByZWplY3QgaWYgdHguZG9uZSByZWplY3RzLlxuICAgICAgICAvLyBNdXN0IHJlamVjdCB3aXRoIG9wIHJlamVjdGlvbiBmaXJzdC5cbiAgICAgICAgLy8gTXVzdCByZXNvbHZlIHdpdGggb3AgdmFsdWUuXG4gICAgICAgIC8vIE11c3QgaGFuZGxlIGJvdGggcHJvbWlzZXMgKG5vIHVuaGFuZGxlZCByZWplY3Rpb25zKVxuICAgICAgICByZXR1cm4gKGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHRhcmdldFt0YXJnZXRGdW5jTmFtZV0oLi4uYXJncyksXG4gICAgICAgICAgICBpc1dyaXRlICYmIHR4LmRvbmUsXG4gICAgICAgIF0pKVswXTtcbiAgICB9O1xuICAgIGNhY2hlZE1ldGhvZHMuc2V0KHByb3AsIG1ldGhvZCk7XG4gICAgcmV0dXJuIG1ldGhvZDtcbn1cbnJlcGxhY2VUcmFwcygob2xkVHJhcHMpID0+ICh7XG4gICAgLi4ub2xkVHJhcHMsXG4gICAgZ2V0OiAodGFyZ2V0LCBwcm9wLCByZWNlaXZlcikgPT4gZ2V0TWV0aG9kKHRhcmdldCwgcHJvcCkgfHwgb2xkVHJhcHMuZ2V0KHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpLFxuICAgIGhhczogKHRhcmdldCwgcHJvcCkgPT4gISFnZXRNZXRob2QodGFyZ2V0LCBwcm9wKSB8fCBvbGRUcmFwcy5oYXModGFyZ2V0LCBwcm9wKSxcbn0pKTtcblxuZXhwb3J0IHsgZGVsZXRlREIsIG9wZW5EQiB9O1xuIiwgIlwidXNlIHN0cmljdFwiO1xuLy8gQHRzLWlnbm9yZVxudHJ5IHtcbiAgICBzZWxmWyd3b3JrYm94OmV4cGlyYXRpb246Ni41LjMnXSAmJiBfKCk7XG59XG5jYXRjaCAoZSkgeyB9XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgb3BlbkRCLCBkZWxldGVEQiB9IGZyb20gJ2lkYic7XG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbmNvbnN0IERCX05BTUUgPSAnd29ya2JveC1leHBpcmF0aW9uJztcbmNvbnN0IENBQ0hFX09CSkVDVF9TVE9SRSA9ICdjYWNoZS1lbnRyaWVzJztcbmNvbnN0IG5vcm1hbGl6ZVVSTCA9ICh1bk5vcm1hbGl6ZWRVcmwpID0+IHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHVuTm9ybWFsaXplZFVybCwgbG9jYXRpb24uaHJlZik7XG4gICAgdXJsLmhhc2ggPSAnJztcbiAgICByZXR1cm4gdXJsLmhyZWY7XG59O1xuLyoqXG4gKiBSZXR1cm5zIHRoZSB0aW1lc3RhbXAgbW9kZWwuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuY2xhc3MgQ2FjaGVUaW1lc3RhbXBzTW9kZWwge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNhY2hlTmFtZVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihjYWNoZU5hbWUpIHtcbiAgICAgICAgdGhpcy5fZGIgPSBudWxsO1xuICAgICAgICB0aGlzLl9jYWNoZU5hbWUgPSBjYWNoZU5hbWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIHVwZ3JhZGUgb2YgaW5kZXhlZERCLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtJREJQRGF0YWJhc2U8Q2FjaGVEYlNjaGVtYT59IGRiXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF91cGdyYWRlRGIoZGIpIHtcbiAgICAgICAgLy8gVE9ETyhwaGlsaXB3YWx0b24pOiBFZGdlSFRNTCBkb2Vzbid0IHN1cHBvcnQgYXJyYXlzIGFzIGEga2V5UGF0aCwgc28gd2VcbiAgICAgICAgLy8gaGF2ZSB0byB1c2UgdGhlIGBpZGAga2V5UGF0aCBoZXJlIGFuZCBjcmVhdGUgb3VyIG93biB2YWx1ZXMgKGFcbiAgICAgICAgLy8gY29uY2F0ZW5hdGlvbiBvZiBgdXJsICsgY2FjaGVOYW1lYCkgaW5zdGVhZCBvZiBzaW1wbHkgdXNpbmdcbiAgICAgICAgLy8gYGtleVBhdGg6IFsndXJsJywgJ2NhY2hlTmFtZSddYCwgd2hpY2ggaXMgc3VwcG9ydGVkIGluIG90aGVyIGJyb3dzZXJzLlxuICAgICAgICBjb25zdCBvYmpTdG9yZSA9IGRiLmNyZWF0ZU9iamVjdFN0b3JlKENBQ0hFX09CSkVDVF9TVE9SRSwgeyBrZXlQYXRoOiAnaWQnIH0pO1xuICAgICAgICAvLyBUT0RPKHBoaWxpcHdhbHRvbik6IG9uY2Ugd2UgZG9uJ3QgaGF2ZSB0byBzdXBwb3J0IEVkZ2VIVE1MLCB3ZSBjYW5cbiAgICAgICAgLy8gY3JlYXRlIGEgc2luZ2xlIGluZGV4IHdpdGggdGhlIGtleVBhdGggYFsnY2FjaGVOYW1lJywgJ3RpbWVzdGFtcCddYFxuICAgICAgICAvLyBpbnN0ZWFkIG9mIGRvaW5nIGJvdGggdGhlc2UgaW5kZXhlcy5cbiAgICAgICAgb2JqU3RvcmUuY3JlYXRlSW5kZXgoJ2NhY2hlTmFtZScsICdjYWNoZU5hbWUnLCB7IHVuaXF1ZTogZmFsc2UgfSk7XG4gICAgICAgIG9ialN0b3JlLmNyZWF0ZUluZGV4KCd0aW1lc3RhbXAnLCAndGltZXN0YW1wJywgeyB1bmlxdWU6IGZhbHNlIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhbiB1cGdyYWRlIG9mIGluZGV4ZWREQiBhbmQgZGVsZXRlcyBkZXByZWNhdGVkIERCcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SURCUERhdGFiYXNlPENhY2hlRGJTY2hlbWE+fSBkYlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfdXBncmFkZURiQW5kRGVsZXRlT2xkRGJzKGRiKSB7XG4gICAgICAgIHRoaXMuX3VwZ3JhZGVEYihkYik7XG4gICAgICAgIGlmICh0aGlzLl9jYWNoZU5hbWUpIHtcbiAgICAgICAgICAgIHZvaWQgZGVsZXRlREIodGhpcy5fY2FjaGVOYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVzdGFtcFxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhc3luYyBzZXRUaW1lc3RhbXAodXJsLCB0aW1lc3RhbXApIHtcbiAgICAgICAgdXJsID0gbm9ybWFsaXplVVJMKHVybCk7XG4gICAgICAgIGNvbnN0IGVudHJ5ID0ge1xuICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgdGltZXN0YW1wLFxuICAgICAgICAgICAgY2FjaGVOYW1lOiB0aGlzLl9jYWNoZU5hbWUsXG4gICAgICAgICAgICAvLyBDcmVhdGluZyBhbiBJRCBmcm9tIHRoZSBVUkwgYW5kIGNhY2hlIG5hbWUgd29uJ3QgYmUgbmVjZXNzYXJ5IG9uY2VcbiAgICAgICAgICAgIC8vIEVkZ2Ugc3dpdGNoZXMgdG8gQ2hyb21pdW0gYW5kIGFsbCBicm93c2VycyB3ZSBzdXBwb3J0IHdvcmsgd2l0aFxuICAgICAgICAgICAgLy8gYXJyYXkga2V5UGF0aHMuXG4gICAgICAgICAgICBpZDogdGhpcy5fZ2V0SWQodXJsKSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZGIgPSBhd2FpdCB0aGlzLmdldERiKCk7XG4gICAgICAgIGNvbnN0IHR4ID0gZGIudHJhbnNhY3Rpb24oQ0FDSEVfT0JKRUNUX1NUT1JFLCAncmVhZHdyaXRlJywge1xuICAgICAgICAgICAgZHVyYWJpbGl0eTogJ3JlbGF4ZWQnLFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgdHguc3RvcmUucHV0KGVudHJ5KTtcbiAgICAgICAgYXdhaXQgdHguZG9uZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdGltZXN0YW1wIHN0b3JlZCBmb3IgYSBnaXZlbiBVUkwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICogQHJldHVybiB7bnVtYmVyIHwgdW5kZWZpbmVkfVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhc3luYyBnZXRUaW1lc3RhbXAodXJsKSB7XG4gICAgICAgIGNvbnN0IGRiID0gYXdhaXQgdGhpcy5nZXREYigpO1xuICAgICAgICBjb25zdCBlbnRyeSA9IGF3YWl0IGRiLmdldChDQUNIRV9PQkpFQ1RfU1RPUkUsIHRoaXMuX2dldElkKHVybCkpO1xuICAgICAgICByZXR1cm4gZW50cnkgPT09IG51bGwgfHwgZW50cnkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGVudHJ5LnRpbWVzdGFtcDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSXRlcmF0ZXMgdGhyb3VnaCBhbGwgdGhlIGVudHJpZXMgaW4gdGhlIG9iamVjdCBzdG9yZSAoZnJvbSBuZXdlc3QgdG9cbiAgICAgKiBvbGRlc3QpIGFuZCByZW1vdmVzIGVudHJpZXMgb25jZSBlaXRoZXIgYG1heENvdW50YCBpcyByZWFjaGVkIG9yIHRoZVxuICAgICAqIGVudHJ5J3MgdGltZXN0YW1wIGlzIGxlc3MgdGhhbiBgbWluVGltZXN0YW1wYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtaW5UaW1lc3RhbXBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4Q291bnRcbiAgICAgKiBAcmV0dXJuIHtBcnJheTxzdHJpbmc+fVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhc3luYyBleHBpcmVFbnRyaWVzKG1pblRpbWVzdGFtcCwgbWF4Q291bnQpIHtcbiAgICAgICAgY29uc3QgZGIgPSBhd2FpdCB0aGlzLmdldERiKCk7XG4gICAgICAgIGxldCBjdXJzb3IgPSBhd2FpdCBkYlxuICAgICAgICAgICAgLnRyYW5zYWN0aW9uKENBQ0hFX09CSkVDVF9TVE9SRSlcbiAgICAgICAgICAgIC5zdG9yZS5pbmRleCgndGltZXN0YW1wJylcbiAgICAgICAgICAgIC5vcGVuQ3Vyc29yKG51bGwsICdwcmV2Jyk7XG4gICAgICAgIGNvbnN0IGVudHJpZXNUb0RlbGV0ZSA9IFtdO1xuICAgICAgICBsZXQgZW50cmllc05vdERlbGV0ZWRDb3VudCA9IDA7XG4gICAgICAgIHdoaWxlIChjdXJzb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGN1cnNvci52YWx1ZTtcbiAgICAgICAgICAgIC8vIFRPRE8ocGhpbGlwd2FsdG9uKTogb25jZSB3ZSBjYW4gdXNlIGEgbXVsdGkta2V5IGluZGV4LCB3ZVxuICAgICAgICAgICAgLy8gd29uJ3QgaGF2ZSB0byBjaGVjayBgY2FjaGVOYW1lYCBoZXJlLlxuICAgICAgICAgICAgaWYgKHJlc3VsdC5jYWNoZU5hbWUgPT09IHRoaXMuX2NhY2hlTmFtZSkge1xuICAgICAgICAgICAgICAgIC8vIERlbGV0ZSBhbiBlbnRyeSBpZiBpdCdzIG9sZGVyIHRoYW4gdGhlIG1heCBhZ2Ugb3JcbiAgICAgICAgICAgICAgICAvLyBpZiB3ZSBhbHJlYWR5IGhhdmUgdGhlIG1heCBudW1iZXIgYWxsb3dlZC5cbiAgICAgICAgICAgICAgICBpZiAoKG1pblRpbWVzdGFtcCAmJiByZXN1bHQudGltZXN0YW1wIDwgbWluVGltZXN0YW1wKSB8fFxuICAgICAgICAgICAgICAgICAgICAobWF4Q291bnQgJiYgZW50cmllc05vdERlbGV0ZWRDb3VudCA+PSBtYXhDb3VudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyhwaGlsaXB3YWx0b24pOiB3ZSBzaG91bGQgYmUgYWJsZSB0byBkZWxldGUgdGhlXG4gICAgICAgICAgICAgICAgICAgIC8vIGVudHJ5IHJpZ2h0IGhlcmUsIGJ1dCBkb2luZyBzbyBjYXVzZXMgYW4gaXRlcmF0aW9uXG4gICAgICAgICAgICAgICAgICAgIC8vIGJ1ZyBpbiBTYWZhcmkgc3RhYmxlIChmaXhlZCBpbiBUUCkuIEluc3RlYWQgd2UgY2FuXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0b3JlIHRoZSBrZXlzIG9mIHRoZSBlbnRyaWVzIHRvIGRlbGV0ZSwgYW5kIHRoZW5cbiAgICAgICAgICAgICAgICAgICAgLy8gZGVsZXRlIHRoZSBzZXBhcmF0ZSB0cmFuc2FjdGlvbnMuXG4gICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvd29ya2JveC9pc3N1ZXMvMTk3OFxuICAgICAgICAgICAgICAgICAgICAvLyBjdXJzb3IuZGVsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIG9ubHkgbmVlZCB0byByZXR1cm4gdGhlIFVSTCwgbm90IHRoZSB3aG9sZSBlbnRyeS5cbiAgICAgICAgICAgICAgICAgICAgZW50cmllc1RvRGVsZXRlLnB1c2goY3Vyc29yLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVudHJpZXNOb3REZWxldGVkQ291bnQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJzb3IgPSBhd2FpdCBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUT0RPKHBoaWxpcHdhbHRvbik6IG9uY2UgdGhlIFNhZmFyaSBidWcgaW4gdGhlIGZvbGxvd2luZyBpc3N1ZSBpcyBmaXhlZCxcbiAgICAgICAgLy8gd2Ugc2hvdWxkIGJlIGFibGUgdG8gcmVtb3ZlIHRoaXMgbG9vcCBhbmQgZG8gdGhlIGVudHJ5IGRlbGV0aW9uIGluIHRoZVxuICAgICAgICAvLyBjdXJzb3IgbG9vcCBhYm92ZTpcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZS93b3JrYm94L2lzc3Vlcy8xOTc4XG4gICAgICAgIGNvbnN0IHVybHNEZWxldGVkID0gW107XG4gICAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllc1RvRGVsZXRlKSB7XG4gICAgICAgICAgICBhd2FpdCBkYi5kZWxldGUoQ0FDSEVfT0JKRUNUX1NUT1JFLCBlbnRyeS5pZCk7XG4gICAgICAgICAgICB1cmxzRGVsZXRlZC5wdXNoKGVudHJ5LnVybCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVybHNEZWxldGVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUYWtlcyBhIFVSTCBhbmQgcmV0dXJucyBhbiBJRCB0aGF0IHdpbGwgYmUgdW5pcXVlIGluIHRoZSBvYmplY3Qgc3RvcmUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfZ2V0SWQodXJsKSB7XG4gICAgICAgIC8vIENyZWF0aW5nIGFuIElEIGZyb20gdGhlIFVSTCBhbmQgY2FjaGUgbmFtZSB3b24ndCBiZSBuZWNlc3Nhcnkgb25jZVxuICAgICAgICAvLyBFZGdlIHN3aXRjaGVzIHRvIENocm9taXVtIGFuZCBhbGwgYnJvd3NlcnMgd2Ugc3VwcG9ydCB3b3JrIHdpdGhcbiAgICAgICAgLy8gYXJyYXkga2V5UGF0aHMuXG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZU5hbWUgKyAnfCcgKyBub3JtYWxpemVVUkwodXJsKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBvcGVuIGNvbm5lY3Rpb24gdG8gdGhlIGRhdGFiYXNlLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhc3luYyBnZXREYigpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9kYikge1xuICAgICAgICAgICAgdGhpcy5fZGIgPSBhd2FpdCBvcGVuREIoREJfTkFNRSwgMSwge1xuICAgICAgICAgICAgICAgIHVwZ3JhZGU6IHRoaXMuX3VwZ3JhZGVEYkFuZERlbGV0ZU9sZERicy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2RiO1xuICAgIH1cbn1cbmV4cG9ydCB7IENhY2hlVGltZXN0YW1wc01vZGVsIH07XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2Fzc2VydC5qcyc7XG5pbXBvcnQgeyBkb250V2FpdEZvciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9kb250V2FpdEZvci5qcyc7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvbG9nZ2VyLmpzJztcbmltcG9ydCB7IFdvcmtib3hFcnJvciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9Xb3JrYm94RXJyb3IuanMnO1xuaW1wb3J0IHsgQ2FjaGVUaW1lc3RhbXBzTW9kZWwgfSBmcm9tICcuL21vZGVscy9DYWNoZVRpbWVzdGFtcHNNb2RlbC5qcyc7XG5pbXBvcnQgJy4vX3ZlcnNpb24uanMnO1xuLyoqXG4gKiBUaGUgYENhY2hlRXhwaXJhdGlvbmAgY2xhc3MgYWxsb3dzIHlvdSBkZWZpbmUgYW4gZXhwaXJhdGlvbiBhbmQgLyBvclxuICogbGltaXQgb24gdGhlIG51bWJlciBvZiByZXNwb25zZXMgc3RvcmVkIGluIGFcbiAqIFtgQ2FjaGVgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ2FjaGUpLlxuICpcbiAqIEBtZW1iZXJvZiB3b3JrYm94LWV4cGlyYXRpb25cbiAqL1xuY2xhc3MgQ2FjaGVFeHBpcmF0aW9uIHtcbiAgICAvKipcbiAgICAgKiBUbyBjb25zdHJ1Y3QgYSBuZXcgQ2FjaGVFeHBpcmF0aW9uIGluc3RhbmNlIHlvdSBtdXN0IHByb3ZpZGUgYXQgbGVhc3RcbiAgICAgKiBvbmUgb2YgdGhlIGBjb25maWdgIHByb3BlcnRpZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2FjaGVOYW1lIE5hbWUgb2YgdGhlIGNhY2hlIHRvIGFwcGx5IHJlc3RyaWN0aW9ucyB0by5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtjb25maWcubWF4RW50cmllc10gVGhlIG1heGltdW0gbnVtYmVyIG9mIGVudHJpZXMgdG8gY2FjaGUuXG4gICAgICogRW50cmllcyB1c2VkIHRoZSBsZWFzdCB3aWxsIGJlIHJlbW92ZWQgYXMgdGhlIG1heGltdW0gaXMgcmVhY2hlZC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2NvbmZpZy5tYXhBZ2VTZWNvbmRzXSBUaGUgbWF4aW11bSBhZ2Ugb2YgYW4gZW50cnkgYmVmb3JlXG4gICAgICogaXQncyB0cmVhdGVkIGFzIHN0YWxlIGFuZCByZW1vdmVkLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnLm1hdGNoT3B0aW9uc10gVGhlIFtgQ2FjaGVRdWVyeU9wdGlvbnNgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ2FjaGUvZGVsZXRlI1BhcmFtZXRlcnMpXG4gICAgICogdGhhdCB3aWxsIGJlIHVzZWQgd2hlbiBjYWxsaW5nIGBkZWxldGUoKWAgb24gdGhlIGNhY2hlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNhY2hlTmFtZSwgY29uZmlnID0ge30pIHtcbiAgICAgICAgdGhpcy5faXNSdW5uaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3JlcnVuUmVxdWVzdGVkID0gZmFsc2U7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBhc3NlcnQuaXNUeXBlKGNhY2hlTmFtZSwgJ3N0cmluZycsIHtcbiAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1leHBpcmF0aW9uJyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdDYWNoZUV4cGlyYXRpb24nLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAnY29uc3RydWN0b3InLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ2NhY2hlTmFtZScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghKGNvbmZpZy5tYXhFbnRyaWVzIHx8IGNvbmZpZy5tYXhBZ2VTZWNvbmRzKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBXb3JrYm94RXJyb3IoJ21heC1lbnRyaWVzLW9yLWFnZS1yZXF1aXJlZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtZXhwaXJhdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ0NhY2hlRXhwaXJhdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAnY29uc3RydWN0b3InLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbmZpZy5tYXhFbnRyaWVzKSB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0LmlzVHlwZShjb25maWcubWF4RW50cmllcywgJ251bWJlcicsIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtZXhwaXJhdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ0NhY2hlRXhwaXJhdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAnY29uc3RydWN0b3InLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbU5hbWU6ICdjb25maWcubWF4RW50cmllcycsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29uZmlnLm1heEFnZVNlY29uZHMpIHtcbiAgICAgICAgICAgICAgICBhc3NlcnQuaXNUeXBlKGNvbmZpZy5tYXhBZ2VTZWNvbmRzLCAnbnVtYmVyJywge1xuICAgICAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1leHBpcmF0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnQ2FjaGVFeHBpcmF0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgZnVuY05hbWU6ICdjb25zdHJ1Y3RvcicsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ2NvbmZpZy5tYXhBZ2VTZWNvbmRzJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tYXhFbnRyaWVzID0gY29uZmlnLm1heEVudHJpZXM7XG4gICAgICAgIHRoaXMuX21heEFnZVNlY29uZHMgPSBjb25maWcubWF4QWdlU2Vjb25kcztcbiAgICAgICAgdGhpcy5fbWF0Y2hPcHRpb25zID0gY29uZmlnLm1hdGNoT3B0aW9ucztcbiAgICAgICAgdGhpcy5fY2FjaGVOYW1lID0gY2FjaGVOYW1lO1xuICAgICAgICB0aGlzLl90aW1lc3RhbXBNb2RlbCA9IG5ldyBDYWNoZVRpbWVzdGFtcHNNb2RlbChjYWNoZU5hbWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFeHBpcmVzIGVudHJpZXMgZm9yIHRoZSBnaXZlbiBjYWNoZSBhbmQgZ2l2ZW4gY3JpdGVyaWEuXG4gICAgICovXG4gICAgYXN5bmMgZXhwaXJlRW50cmllcygpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzUnVubmluZykge1xuICAgICAgICAgICAgdGhpcy5fcmVydW5SZXF1ZXN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzUnVubmluZyA9IHRydWU7XG4gICAgICAgIGNvbnN0IG1pblRpbWVzdGFtcCA9IHRoaXMuX21heEFnZVNlY29uZHNcbiAgICAgICAgICAgID8gRGF0ZS5ub3coKSAtIHRoaXMuX21heEFnZVNlY29uZHMgKiAxMDAwXG4gICAgICAgICAgICA6IDA7XG4gICAgICAgIGNvbnN0IHVybHNFeHBpcmVkID0gYXdhaXQgdGhpcy5fdGltZXN0YW1wTW9kZWwuZXhwaXJlRW50cmllcyhtaW5UaW1lc3RhbXAsIHRoaXMuX21heEVudHJpZXMpO1xuICAgICAgICAvLyBEZWxldGUgVVJMcyBmcm9tIHRoZSBjYWNoZVxuICAgICAgICBjb25zdCBjYWNoZSA9IGF3YWl0IHNlbGYuY2FjaGVzLm9wZW4odGhpcy5fY2FjaGVOYW1lKTtcbiAgICAgICAgZm9yIChjb25zdCB1cmwgb2YgdXJsc0V4cGlyZWQpIHtcbiAgICAgICAgICAgIGF3YWl0IGNhY2hlLmRlbGV0ZSh1cmwsIHRoaXMuX21hdGNoT3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGlmICh1cmxzRXhwaXJlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmdyb3VwQ29sbGFwc2VkKGBFeHBpcmVkICR7dXJsc0V4cGlyZWQubGVuZ3RofSBgICtcbiAgICAgICAgICAgICAgICAgICAgYCR7dXJsc0V4cGlyZWQubGVuZ3RoID09PSAxID8gJ2VudHJ5JyA6ICdlbnRyaWVzJ30gYW5kIHJlbW92ZWQgYCArXG4gICAgICAgICAgICAgICAgICAgIGAke3VybHNFeHBpcmVkLmxlbmd0aCA9PT0gMSA/ICdpdCcgOiAndGhlbSd9IGZyb20gdGhlIGAgK1xuICAgICAgICAgICAgICAgICAgICBgJyR7dGhpcy5fY2FjaGVOYW1lfScgY2FjaGUuYCk7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhgRXhwaXJlZCB0aGUgZm9sbG93aW5nICR7dXJsc0V4cGlyZWQubGVuZ3RoID09PSAxID8gJ1VSTCcgOiAnVVJMcyd9OmApO1xuICAgICAgICAgICAgICAgIHVybHNFeHBpcmVkLmZvckVhY2goKHVybCkgPT4gbG9nZ2VyLmxvZyhgICAgICR7dXJsfWApKTtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZ3JvdXBFbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgQ2FjaGUgZXhwaXJhdGlvbiByYW4gYW5kIGZvdW5kIG5vIGVudHJpZXMgdG8gcmVtb3ZlLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzUnVubmluZyA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5fcmVydW5SZXF1ZXN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlcnVuUmVxdWVzdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBkb250V2FpdEZvcih0aGlzLmV4cGlyZUVudHJpZXMoKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSB0aW1lc3RhbXAgZm9yIHRoZSBnaXZlbiBVUkwuIFRoaXMgZW5zdXJlcyB0aGUgd2hlblxuICAgICAqIHJlbW92aW5nIGVudHJpZXMgYmFzZWQgb24gbWF4aW11bSBlbnRyaWVzLCBtb3N0IHJlY2VudGx5IHVzZWRcbiAgICAgKiBpcyBhY2N1cmF0ZSBvciB3aGVuIGV4cGlyaW5nLCB0aGUgdGltZXN0YW1wIGlzIHVwLXRvLWRhdGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICovXG4gICAgYXN5bmMgdXBkYXRlVGltZXN0YW1wKHVybCkge1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgYXNzZXJ0LmlzVHlwZSh1cmwsICdzdHJpbmcnLCB7XG4gICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtZXhwaXJhdGlvbicsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnQ2FjaGVFeHBpcmF0aW9uJyxcbiAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ3VwZGF0ZVRpbWVzdGFtcCcsXG4gICAgICAgICAgICAgICAgcGFyYW1OYW1lOiAndXJsJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMuX3RpbWVzdGFtcE1vZGVsLnNldFRpbWVzdGFtcCh1cmwsIERhdGUubm93KCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYW4gYmUgdXNlZCB0byBjaGVjayBpZiBhIFVSTCBoYXMgZXhwaXJlZCBvciBub3QgYmVmb3JlIGl0J3MgdXNlZC5cbiAgICAgKlxuICAgICAqIFRoaXMgcmVxdWlyZXMgYSBsb29rIHVwIGZyb20gSW5kZXhlZERCLCBzbyBjYW4gYmUgc2xvdy5cbiAgICAgKlxuICAgICAqIE5vdGU6IFRoaXMgbWV0aG9kIHdpbGwgbm90IHJlbW92ZSB0aGUgY2FjaGVkIGVudHJ5LCBjYWxsXG4gICAgICogYGV4cGlyZUVudHJpZXMoKWAgdG8gcmVtb3ZlIGluZGV4ZWREQiBhbmQgQ2FjaGUgZW50cmllcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuICAgIGFzeW5jIGlzVVJMRXhwaXJlZCh1cmwpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9tYXhBZ2VTZWNvbmRzKSB7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBXb3JrYm94RXJyb3IoYGV4cGlyZWQtdGVzdC13aXRob3V0LW1heC1hZ2VgLCB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZE5hbWU6ICdpc1VSTEV4cGlyZWQnLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbU5hbWU6ICdtYXhBZ2VTZWNvbmRzJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IGF3YWl0IHRoaXMuX3RpbWVzdGFtcE1vZGVsLmdldFRpbWVzdGFtcCh1cmwpO1xuICAgICAgICAgICAgY29uc3QgZXhwaXJlT2xkZXJUaGFuID0gRGF0ZS5ub3coKSAtIHRoaXMuX21heEFnZVNlY29uZHMgKiAxMDAwO1xuICAgICAgICAgICAgcmV0dXJuIHRpbWVzdGFtcCAhPT0gdW5kZWZpbmVkID8gdGltZXN0YW1wIDwgZXhwaXJlT2xkZXJUaGFuIDogdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBJbmRleGVkREIgb2JqZWN0IHN0b3JlIHVzZWQgdG8ga2VlcCB0cmFjayBvZiBjYWNoZSBleHBpcmF0aW9uXG4gICAgICogbWV0YWRhdGEuXG4gICAgICovXG4gICAgYXN5bmMgZGVsZXRlKCkge1xuICAgICAgICAvLyBNYWtlIHN1cmUgd2UgZG9uJ3QgYXR0ZW1wdCBhbm90aGVyIHJlcnVuIGlmIHdlJ3JlIGNhbGxlZCBpbiB0aGUgbWlkZGxlIG9mXG4gICAgICAgIC8vIGEgY2FjaGUgZXhwaXJhdGlvbi5cbiAgICAgICAgdGhpcy5fcmVydW5SZXF1ZXN0ZWQgPSBmYWxzZTtcbiAgICAgICAgYXdhaXQgdGhpcy5fdGltZXN0YW1wTW9kZWwuZXhwaXJlRW50cmllcyhJbmZpbml0eSk7IC8vIEV4cGlyZXMgYWxsLlxuICAgIH1cbn1cbmV4cG9ydCB7IENhY2hlRXhwaXJhdGlvbiB9O1xuIiwgIi8qXG4gIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9hc3NlcnQuanMnO1xuaW1wb3J0IHsgY2FjaGVOYW1lcyB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9jYWNoZU5hbWVzLmpzJztcbmltcG9ydCB7IGRvbnRXYWl0Rm9yIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2RvbnRXYWl0Rm9yLmpzJztcbmltcG9ydCB7IGdldEZyaWVuZGx5VVJMIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2dldEZyaWVuZGx5VVJMLmpzJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9sb2dnZXIuanMnO1xuaW1wb3J0IHsgcmVnaXN0ZXJRdW90YUVycm9yQ2FsbGJhY2sgfSBmcm9tICd3b3JrYm94LWNvcmUvcmVnaXN0ZXJRdW90YUVycm9yQ2FsbGJhY2suanMnO1xuaW1wb3J0IHsgV29ya2JveEVycm9yIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL1dvcmtib3hFcnJvci5qcyc7XG5pbXBvcnQgeyBDYWNoZUV4cGlyYXRpb24gfSBmcm9tICcuL0NhY2hlRXhwaXJhdGlvbi5qcyc7XG5pbXBvcnQgJy4vX3ZlcnNpb24uanMnO1xuLyoqXG4gKiBUaGlzIHBsdWdpbiBjYW4gYmUgdXNlZCBpbiBhIGB3b3JrYm94LXN0cmF0ZWd5YCB0byByZWd1bGFybHkgZW5mb3JjZSBhXG4gKiBsaW1pdCBvbiB0aGUgYWdlIGFuZCAvIG9yIHRoZSBudW1iZXIgb2YgY2FjaGVkIHJlcXVlc3RzLlxuICpcbiAqIEl0IGNhbiBvbmx5IGJlIHVzZWQgd2l0aCBgd29ya2JveC1zdHJhdGVneWAgaW5zdGFuY2VzIHRoYXQgaGF2ZSBhXG4gKiBbY3VzdG9tIGBjYWNoZU5hbWVgIHByb3BlcnR5IHNldF0oL3dlYi90b29scy93b3JrYm94L2d1aWRlcy9jb25maWd1cmUtd29ya2JveCNjdXN0b21fY2FjaGVfbmFtZXNfaW5fc3RyYXRlZ2llcykuXG4gKiBJbiBvdGhlciB3b3JkcywgaXQgY2FuJ3QgYmUgdXNlZCB0byBleHBpcmUgZW50cmllcyBpbiBzdHJhdGVneSB0aGF0IHVzZXMgdGhlXG4gKiBkZWZhdWx0IHJ1bnRpbWUgY2FjaGUgbmFtZS5cbiAqXG4gKiBXaGVuZXZlciBhIGNhY2hlZCByZXNwb25zZSBpcyB1c2VkIG9yIHVwZGF0ZWQsIHRoaXMgcGx1Z2luIHdpbGwgbG9va1xuICogYXQgdGhlIGFzc29jaWF0ZWQgY2FjaGUgYW5kIHJlbW92ZSBhbnkgb2xkIG9yIGV4dHJhIHJlc3BvbnNlcy5cbiAqXG4gKiBXaGVuIHVzaW5nIGBtYXhBZ2VTZWNvbmRzYCwgcmVzcG9uc2VzIG1heSBiZSB1c2VkICpvbmNlKiBhZnRlciBleHBpcmluZ1xuICogYmVjYXVzZSB0aGUgZXhwaXJhdGlvbiBjbGVhbiB1cCB3aWxsIG5vdCBoYXZlIG9jY3VycmVkIHVudGlsICphZnRlciogdGhlXG4gKiBjYWNoZWQgcmVzcG9uc2UgaGFzIGJlZW4gdXNlZC4gSWYgdGhlIHJlc3BvbnNlIGhhcyBhIFwiRGF0ZVwiIGhlYWRlciwgdGhlblxuICogYSBsaWdodCB3ZWlnaHQgZXhwaXJhdGlvbiBjaGVjayBpcyBwZXJmb3JtZWQgYW5kIHRoZSByZXNwb25zZSB3aWxsIG5vdCBiZVxuICogdXNlZCBpbW1lZGlhdGVseS5cbiAqXG4gKiBXaGVuIHVzaW5nIGBtYXhFbnRyaWVzYCwgdGhlIGVudHJ5IGxlYXN0LXJlY2VudGx5IHJlcXVlc3RlZCB3aWxsIGJlIHJlbW92ZWRcbiAqIGZyb20gdGhlIGNhY2hlIGZpcnN0LlxuICpcbiAqIEBtZW1iZXJvZiB3b3JrYm94LWV4cGlyYXRpb25cbiAqL1xuY2xhc3MgRXhwaXJhdGlvblBsdWdpbiB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtFeHBpcmF0aW9uUGx1Z2luT3B0aW9uc30gY29uZmlnXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtjb25maWcubWF4RW50cmllc10gVGhlIG1heGltdW0gbnVtYmVyIG9mIGVudHJpZXMgdG8gY2FjaGUuXG4gICAgICogRW50cmllcyB1c2VkIHRoZSBsZWFzdCB3aWxsIGJlIHJlbW92ZWQgYXMgdGhlIG1heGltdW0gaXMgcmVhY2hlZC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2NvbmZpZy5tYXhBZ2VTZWNvbmRzXSBUaGUgbWF4aW11bSBhZ2Ugb2YgYW4gZW50cnkgYmVmb3JlXG4gICAgICogaXQncyB0cmVhdGVkIGFzIHN0YWxlIGFuZCByZW1vdmVkLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnLm1hdGNoT3B0aW9uc10gVGhlIFtgQ2FjaGVRdWVyeU9wdGlvbnNgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ2FjaGUvZGVsZXRlI1BhcmFtZXRlcnMpXG4gICAgICogdGhhdCB3aWxsIGJlIHVzZWQgd2hlbiBjYWxsaW5nIGBkZWxldGUoKWAgb24gdGhlIGNhY2hlLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NvbmZpZy5wdXJnZU9uUXVvdGFFcnJvcl0gV2hldGhlciB0byBvcHQgdGhpcyBjYWNoZSBpbiB0b1xuICAgICAqIGF1dG9tYXRpYyBkZWxldGlvbiBpZiB0aGUgYXZhaWxhYmxlIHN0b3JhZ2UgcXVvdGEgaGFzIGJlZW4gZXhjZWVkZWQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnID0ge30pIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgXCJsaWZlY3ljbGVcIiBjYWxsYmFjayB0aGF0IHdpbGwgYmUgdHJpZ2dlcmVkIGF1dG9tYXRpY2FsbHkgYnkgdGhlXG4gICAgICAgICAqIGB3b3JrYm94LXN0cmF0ZWdpZXNgIGhhbmRsZXJzIHdoZW4gYSBgUmVzcG9uc2VgIGlzIGFib3V0IHRvIGJlIHJldHVybmVkXG4gICAgICAgICAqIGZyb20gYSBbQ2FjaGVdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DYWNoZSkgdG9cbiAgICAgICAgICogdGhlIGhhbmRsZXIuIEl0IGFsbG93cyB0aGUgYFJlc3BvbnNlYCB0byBiZSBpbnNwZWN0ZWQgZm9yIGZyZXNobmVzcyBhbmRcbiAgICAgICAgICogcHJldmVudHMgaXQgZnJvbSBiZWluZyB1c2VkIGlmIHRoZSBgUmVzcG9uc2VgJ3MgYERhdGVgIGhlYWRlciB2YWx1ZSBpc1xuICAgICAgICAgKiBvbGRlciB0aGFuIHRoZSBjb25maWd1cmVkIGBtYXhBZ2VTZWNvbmRzYC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuY2FjaGVOYW1lIE5hbWUgb2YgdGhlIGNhY2hlIHRoZSByZXNwb25zZSBpcyBpbi5cbiAgICAgICAgICogQHBhcmFtIHtSZXNwb25zZX0gb3B0aW9ucy5jYWNoZWRSZXNwb25zZSBUaGUgYFJlc3BvbnNlYCBvYmplY3QgdGhhdCdzIGJlZW5cbiAgICAgICAgICogICAgIHJlYWQgZnJvbSBhIGNhY2hlIGFuZCB3aG9zZSBmcmVzaG5lc3Mgc2hvdWxkIGJlIGNoZWNrZWQuXG4gICAgICAgICAqIEByZXR1cm4ge1Jlc3BvbnNlfSBFaXRoZXIgdGhlIGBjYWNoZWRSZXNwb25zZWAsIGlmIGl0J3NcbiAgICAgICAgICogICAgIGZyZXNoLCBvciBgbnVsbGAgaWYgdGhlIGBSZXNwb25zZWAgaXMgb2xkZXIgdGhhbiBgbWF4QWdlU2Vjb25kc2AuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNhY2hlZFJlc3BvbnNlV2lsbEJlVXNlZCA9IGFzeW5jICh7IGV2ZW50LCByZXF1ZXN0LCBjYWNoZU5hbWUsIGNhY2hlZFJlc3BvbnNlLCB9KSA9PiB7XG4gICAgICAgICAgICBpZiAoIWNhY2hlZFJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBpc0ZyZXNoID0gdGhpcy5faXNSZXNwb25zZURhdGVGcmVzaChjYWNoZWRSZXNwb25zZSk7XG4gICAgICAgICAgICAvLyBFeHBpcmUgZW50cmllcyB0byBlbnN1cmUgdGhhdCBldmVuIGlmIHRoZSBleHBpcmF0aW9uIGRhdGUgaGFzXG4gICAgICAgICAgICAvLyBleHBpcmVkLCBpdCdsbCBvbmx5IGJlIHVzZWQgb25jZS5cbiAgICAgICAgICAgIGNvbnN0IGNhY2hlRXhwaXJhdGlvbiA9IHRoaXMuX2dldENhY2hlRXhwaXJhdGlvbihjYWNoZU5hbWUpO1xuICAgICAgICAgICAgZG9udFdhaXRGb3IoY2FjaGVFeHBpcmF0aW9uLmV4cGlyZUVudHJpZXMoKSk7XG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIG1ldGFkYXRhIGZvciB0aGUgcmVxdWVzdCBVUkwgdG8gdGhlIGN1cnJlbnQgdGltZXN0YW1wLFxuICAgICAgICAgICAgLy8gYnV0IGRvbid0IGBhd2FpdGAgaXQgYXMgd2UgZG9uJ3Qgd2FudCB0byBibG9jayB0aGUgcmVzcG9uc2UuXG4gICAgICAgICAgICBjb25zdCB1cGRhdGVUaW1lc3RhbXBEb25lID0gY2FjaGVFeHBpcmF0aW9uLnVwZGF0ZVRpbWVzdGFtcChyZXF1ZXN0LnVybCk7XG4gICAgICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC53YWl0VW50aWwodXBkYXRlVGltZXN0YW1wRG9uZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGV2ZW50IG1heSBub3QgYmUgYSBmZXRjaCBldmVudDsgb25seSBsb2cgdGhlIFVSTCBpZiBpdCBpcy5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgncmVxdWVzdCcgaW4gZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIud2FybihgVW5hYmxlIHRvIGVuc3VyZSBzZXJ2aWNlIHdvcmtlciBzdGF5cyBhbGl2ZSB3aGVuIGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgdXBkYXRpbmcgY2FjaGUgZW50cnkgZm9yIGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgJyR7Z2V0RnJpZW5kbHlVUkwoZXZlbnQucmVxdWVzdC51cmwpfScuYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaXNGcmVzaCA/IGNhY2hlZFJlc3BvbnNlIDogbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgXCJsaWZlY3ljbGVcIiBjYWxsYmFjayB0aGF0IHdpbGwgYmUgdHJpZ2dlcmVkIGF1dG9tYXRpY2FsbHkgYnkgdGhlXG4gICAgICAgICAqIGB3b3JrYm94LXN0cmF0ZWdpZXNgIGhhbmRsZXJzIHdoZW4gYW4gZW50cnkgaXMgYWRkZWQgdG8gYSBjYWNoZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuY2FjaGVOYW1lIE5hbWUgb2YgdGhlIGNhY2hlIHRoYXQgd2FzIHVwZGF0ZWQuXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnJlcXVlc3QgVGhlIFJlcXVlc3QgZm9yIHRoZSBjYWNoZWQgZW50cnkuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNhY2hlRGlkVXBkYXRlID0gYXN5bmMgKHsgY2FjaGVOYW1lLCByZXF1ZXN0LCB9KSA9PiB7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIGFzc2VydC5pc1R5cGUoY2FjaGVOYW1lLCAnc3RyaW5nJywge1xuICAgICAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1leHBpcmF0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnUGx1Z2luJyxcbiAgICAgICAgICAgICAgICAgICAgZnVuY05hbWU6ICdjYWNoZURpZFVwZGF0ZScsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ2NhY2hlTmFtZScsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYXNzZXJ0LmlzSW5zdGFuY2UocmVxdWVzdCwgUmVxdWVzdCwge1xuICAgICAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1leHBpcmF0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnUGx1Z2luJyxcbiAgICAgICAgICAgICAgICAgICAgZnVuY05hbWU6ICdjYWNoZURpZFVwZGF0ZScsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ3JlcXVlc3QnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY2FjaGVFeHBpcmF0aW9uID0gdGhpcy5fZ2V0Q2FjaGVFeHBpcmF0aW9uKGNhY2hlTmFtZSk7XG4gICAgICAgICAgICBhd2FpdCBjYWNoZUV4cGlyYXRpb24udXBkYXRlVGltZXN0YW1wKHJlcXVlc3QudXJsKTtcbiAgICAgICAgICAgIGF3YWl0IGNhY2hlRXhwaXJhdGlvbi5leHBpcmVFbnRyaWVzKCk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBpZiAoIShjb25maWcubWF4RW50cmllcyB8fCBjb25maWcubWF4QWdlU2Vjb25kcykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgV29ya2JveEVycm9yKCdtYXgtZW50cmllcy1vci1hZ2UtcmVxdWlyZWQnLCB7XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LWV4cGlyYXRpb24nLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdQbHVnaW4nLFxuICAgICAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ2NvbnN0cnVjdG9yJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb25maWcubWF4RW50cmllcykge1xuICAgICAgICAgICAgICAgIGFzc2VydC5pc1R5cGUoY29uZmlnLm1heEVudHJpZXMsICdudW1iZXInLCB7XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LWV4cGlyYXRpb24nLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdQbHVnaW4nLFxuICAgICAgICAgICAgICAgICAgICBmdW5jTmFtZTogJ2NvbnN0cnVjdG9yJyxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1OYW1lOiAnY29uZmlnLm1heEVudHJpZXMnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbmZpZy5tYXhBZ2VTZWNvbmRzKSB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0LmlzVHlwZShjb25maWcubWF4QWdlU2Vjb25kcywgJ251bWJlcicsIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtZXhwaXJhdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ1BsdWdpbicsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAnY29uc3RydWN0b3InLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbU5hbWU6ICdjb25maWcubWF4QWdlU2Vjb25kcycsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xuICAgICAgICB0aGlzLl9tYXhBZ2VTZWNvbmRzID0gY29uZmlnLm1heEFnZVNlY29uZHM7XG4gICAgICAgIHRoaXMuX2NhY2hlRXhwaXJhdGlvbnMgPSBuZXcgTWFwKCk7XG4gICAgICAgIGlmIChjb25maWcucHVyZ2VPblF1b3RhRXJyb3IpIHtcbiAgICAgICAgICAgIHJlZ2lzdGVyUXVvdGFFcnJvckNhbGxiYWNrKCgpID0+IHRoaXMuZGVsZXRlQ2FjaGVBbmRNZXRhZGF0YSgpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpbXBsZSBoZWxwZXIgbWV0aG9kIHRvIHJldHVybiBhIENhY2hlRXhwaXJhdGlvbiBpbnN0YW5jZSBmb3IgYSBnaXZlblxuICAgICAqIGNhY2hlIG5hbWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2FjaGVOYW1lXG4gICAgICogQHJldHVybiB7Q2FjaGVFeHBpcmF0aW9ufVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfZ2V0Q2FjaGVFeHBpcmF0aW9uKGNhY2hlTmFtZSkge1xuICAgICAgICBpZiAoY2FjaGVOYW1lID09PSBjYWNoZU5hbWVzLmdldFJ1bnRpbWVOYW1lKCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBXb3JrYm94RXJyb3IoJ2V4cGlyZS1jdXN0b20tY2FjaGVzLW9ubHknKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2FjaGVFeHBpcmF0aW9uID0gdGhpcy5fY2FjaGVFeHBpcmF0aW9ucy5nZXQoY2FjaGVOYW1lKTtcbiAgICAgICAgaWYgKCFjYWNoZUV4cGlyYXRpb24pIHtcbiAgICAgICAgICAgIGNhY2hlRXhwaXJhdGlvbiA9IG5ldyBDYWNoZUV4cGlyYXRpb24oY2FjaGVOYW1lLCB0aGlzLl9jb25maWcpO1xuICAgICAgICAgICAgdGhpcy5fY2FjaGVFeHBpcmF0aW9ucy5zZXQoY2FjaGVOYW1lLCBjYWNoZUV4cGlyYXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYWNoZUV4cGlyYXRpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7UmVzcG9uc2V9IGNhY2hlZFJlc3BvbnNlXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2lzUmVzcG9uc2VEYXRlRnJlc2goY2FjaGVkUmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9tYXhBZ2VTZWNvbmRzKSB7XG4gICAgICAgICAgICAvLyBXZSBhcmVuJ3QgZXhwaXJpbmcgYnkgYWdlLCBzbyByZXR1cm4gdHJ1ZSwgaXQncyBmcmVzaFxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlICdkYXRlJyBoZWFkZXIgd2lsbCBzdWZmaWNlIGEgcXVpY2sgZXhwaXJhdGlvbiBjaGVjay5cbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWVMYWJzL3N3LXRvb2xib3gvaXNzdWVzLzE2NCBmb3JcbiAgICAgICAgLy8gZGlzY3Vzc2lvbi5cbiAgICAgICAgY29uc3QgZGF0ZUhlYWRlclRpbWVzdGFtcCA9IHRoaXMuX2dldERhdGVIZWFkZXJUaW1lc3RhbXAoY2FjaGVkUmVzcG9uc2UpO1xuICAgICAgICBpZiAoZGF0ZUhlYWRlclRpbWVzdGFtcCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gVW5hYmxlIHRvIHBhcnNlIGRhdGUsIHNvIGFzc3VtZSBpdCdzIGZyZXNoLlxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIHZhbGlkIGhlYWRlclRpbWUsIHRoZW4gb3VyIHJlc3BvbnNlIGlzIGZyZXNoIGlmZiB0aGVcbiAgICAgICAgLy8gaGVhZGVyVGltZSBwbHVzIG1heEFnZVNlY29uZHMgaXMgZ3JlYXRlciB0aGFuIHRoZSBjdXJyZW50IHRpbWUuXG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIHJldHVybiBkYXRlSGVhZGVyVGltZXN0YW1wID49IG5vdyAtIHRoaXMuX21heEFnZVNlY29uZHMgKiAxMDAwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCB3aWxsIGV4dHJhY3QgdGhlIGRhdGEgaGVhZGVyIGFuZCBwYXJzZSBpdCBpbnRvIGEgdXNlZnVsXG4gICAgICogdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSBjYWNoZWRSZXNwb25zZVxuICAgICAqIEByZXR1cm4ge251bWJlcnxudWxsfVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfZ2V0RGF0ZUhlYWRlclRpbWVzdGFtcChjYWNoZWRSZXNwb25zZSkge1xuICAgICAgICBpZiAoIWNhY2hlZFJlc3BvbnNlLmhlYWRlcnMuaGFzKCdkYXRlJykpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRhdGVIZWFkZXIgPSBjYWNoZWRSZXNwb25zZS5oZWFkZXJzLmdldCgnZGF0ZScpO1xuICAgICAgICBjb25zdCBwYXJzZWREYXRlID0gbmV3IERhdGUoZGF0ZUhlYWRlcik7XG4gICAgICAgIGNvbnN0IGhlYWRlclRpbWUgPSBwYXJzZWREYXRlLmdldFRpbWUoKTtcbiAgICAgICAgLy8gSWYgdGhlIERhdGUgaGVhZGVyIHdhcyBpbnZhbGlkIGZvciBzb21lIHJlYXNvbiwgcGFyc2VkRGF0ZS5nZXRUaW1lKClcbiAgICAgICAgLy8gd2lsbCByZXR1cm4gTmFOLlxuICAgICAgICBpZiAoaXNOYU4oaGVhZGVyVGltZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoZWFkZXJUaW1lO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIGEgaGVscGVyIG1ldGhvZCB0aGF0IHBlcmZvcm1zIHR3byBvcGVyYXRpb25zOlxuICAgICAqXG4gICAgICogLSBEZWxldGVzICphbGwqIHRoZSB1bmRlcmx5aW5nIENhY2hlIGluc3RhbmNlcyBhc3NvY2lhdGVkIHdpdGggdGhpcyBwbHVnaW5cbiAgICAgKiBpbnN0YW5jZSwgYnkgY2FsbGluZyBjYWNoZXMuZGVsZXRlKCkgb24geW91ciBiZWhhbGYuXG4gICAgICogLSBEZWxldGVzIHRoZSBtZXRhZGF0YSBmcm9tIEluZGV4ZWREQiB1c2VkIHRvIGtlZXAgdHJhY2sgb2YgZXhwaXJhdGlvblxuICAgICAqIGRldGFpbHMgZm9yIGVhY2ggQ2FjaGUgaW5zdGFuY2UuXG4gICAgICpcbiAgICAgKiBXaGVuIHVzaW5nIGNhY2hlIGV4cGlyYXRpb24sIGNhbGxpbmcgdGhpcyBtZXRob2QgaXMgcHJlZmVyYWJsZSB0byBjYWxsaW5nXG4gICAgICogYGNhY2hlcy5kZWxldGUoKWAgZGlyZWN0bHksIHNpbmNlIHRoaXMgd2lsbCBlbnN1cmUgdGhhdCB0aGUgSW5kZXhlZERCXG4gICAgICogbWV0YWRhdGEgaXMgYWxzbyBjbGVhbmx5IHJlbW92ZWQgYW5kIG9wZW4gSW5kZXhlZERCIGluc3RhbmNlcyBhcmUgZGVsZXRlZC5cbiAgICAgKlxuICAgICAqIE5vdGUgdGhhdCBpZiB5b3UncmUgKm5vdCogdXNpbmcgY2FjaGUgZXhwaXJhdGlvbiBmb3IgYSBnaXZlbiBjYWNoZSwgY2FsbGluZ1xuICAgICAqIGBjYWNoZXMuZGVsZXRlKClgIGFuZCBwYXNzaW5nIGluIHRoZSBjYWNoZSdzIG5hbWUgc2hvdWxkIGJlIHN1ZmZpY2llbnQuXG4gICAgICogVGhlcmUgaXMgbm8gV29ya2JveC1zcGVjaWZpYyBtZXRob2QgbmVlZGVkIGZvciBjbGVhbnVwIGluIHRoYXQgY2FzZS5cbiAgICAgKi9cbiAgICBhc3luYyBkZWxldGVDYWNoZUFuZE1ldGFkYXRhKCkge1xuICAgICAgICAvLyBEbyB0aGlzIG9uZSBhdCBhIHRpbWUgaW5zdGVhZCBvZiBhbGwgYXQgb25jZSB2aWEgYFByb21pc2UuYWxsKClgIHRvXG4gICAgICAgIC8vIHJlZHVjZSB0aGUgY2hhbmNlIG9mIGluY29uc2lzdGVuY3kgaWYgYSBwcm9taXNlIHJlamVjdHMuXG4gICAgICAgIGZvciAoY29uc3QgW2NhY2hlTmFtZSwgY2FjaGVFeHBpcmF0aW9uXSBvZiB0aGlzLl9jYWNoZUV4cGlyYXRpb25zKSB7XG4gICAgICAgICAgICBhd2FpdCBzZWxmLmNhY2hlcy5kZWxldGUoY2FjaGVOYW1lKTtcbiAgICAgICAgICAgIGF3YWl0IGNhY2hlRXhwaXJhdGlvbi5kZWxldGUoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBSZXNldCB0aGlzLl9jYWNoZUV4cGlyYXRpb25zIHRvIGl0cyBpbml0aWFsIHN0YXRlLlxuICAgICAgICB0aGlzLl9jYWNoZUV4cGlyYXRpb25zID0gbmV3IE1hcCgpO1xuICAgIH1cbn1cbmV4cG9ydCB7IEV4cGlyYXRpb25QbHVnaW4gfTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbi8vIEB0cy1pZ25vcmVcbnRyeSB7XG4gICAgc2VsZlsnd29ya2JveDpyZWNpcGVzOjYuNS4zJ10gJiYgXygpO1xufVxuY2F0Y2ggKGUpIHsgfVxuIiwgIi8qXG4gIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IHJlZ2lzdGVyUm91dGUgfSBmcm9tICd3b3JrYm94LXJvdXRpbmcvcmVnaXN0ZXJSb3V0ZS5qcyc7XG5pbXBvcnQgeyBTdGFsZVdoaWxlUmV2YWxpZGF0ZSB9IGZyb20gJ3dvcmtib3gtc3RyYXRlZ2llcy9TdGFsZVdoaWxlUmV2YWxpZGF0ZS5qcyc7XG5pbXBvcnQgeyBDYWNoZUZpcnN0IH0gZnJvbSAnd29ya2JveC1zdHJhdGVnaWVzL0NhY2hlRmlyc3QuanMnO1xuaW1wb3J0IHsgQ2FjaGVhYmxlUmVzcG9uc2VQbHVnaW4gfSBmcm9tICd3b3JrYm94LWNhY2hlYWJsZS1yZXNwb25zZS9DYWNoZWFibGVSZXNwb25zZVBsdWdpbi5qcyc7XG5pbXBvcnQgeyBFeHBpcmF0aW9uUGx1Z2luIH0gZnJvbSAnd29ya2JveC1leHBpcmF0aW9uL0V4cGlyYXRpb25QbHVnaW4uanMnO1xuaW1wb3J0ICcuL192ZXJzaW9uLmpzJztcbi8qKlxuICogQW4gaW1wbGVtZW50YXRpb24gb2YgdGhlIFtHb29nbGUgZm9udHNde0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3dlYi90b29scy93b3JrYm94L2d1aWRlcy9jb21tb24tcmVjaXBlcyNnb29nbGVfZm9udHN9IGNhY2hpbmcgcmVjaXBlXG4gKlxuICogQG1lbWJlcm9mIHdvcmtib3gtcmVjaXBlc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5jYWNoZVByZWZpeF0gQ2FjaGUgcHJlZml4IGZvciBjYWNoaW5nIHN0eWxlc2hlZXRzIGFuZCB3ZWJmb250cy4gRGVmYXVsdHMgdG8gZ29vZ2xlLWZvbnRzXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4QWdlU2Vjb25kc10gTWF4aW11bSBhZ2UsIGluIHNlY29uZHMsIHRoYXQgZm9udCBlbnRyaWVzIHdpbGwgYmUgY2FjaGVkIGZvci4gRGVmYXVsdHMgdG8gMSB5ZWFyXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4RW50cmllc10gTWF4aW11bSBudW1iZXIgb2YgZm9udHMgdGhhdCB3aWxsIGJlIGNhY2hlZC4gRGVmYXVsdHMgdG8gMzBcbiAqL1xuZnVuY3Rpb24gZ29vZ2xlRm9udHNDYWNoZShvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBzaGVldENhY2hlTmFtZSA9IGAke29wdGlvbnMuY2FjaGVQcmVmaXggfHwgJ2dvb2dsZS1mb250cyd9LXN0eWxlc2hlZXRzYDtcbiAgICBjb25zdCBmb250Q2FjaGVOYW1lID0gYCR7b3B0aW9ucy5jYWNoZVByZWZpeCB8fCAnZ29vZ2xlLWZvbnRzJ30td2ViZm9udHNgO1xuICAgIGNvbnN0IG1heEFnZVNlY29uZHMgPSBvcHRpb25zLm1heEFnZVNlY29uZHMgfHwgNjAgKiA2MCAqIDI0ICogMzY1O1xuICAgIGNvbnN0IG1heEVudHJpZXMgPSBvcHRpb25zLm1heEVudHJpZXMgfHwgMzA7XG4gICAgLy8gQ2FjaGUgdGhlIEdvb2dsZSBGb250cyBzdHlsZXNoZWV0cyB3aXRoIGEgc3RhbGUtd2hpbGUtcmV2YWxpZGF0ZSBzdHJhdGVneS5cbiAgICByZWdpc3RlclJvdXRlKCh7IHVybCB9KSA9PiB1cmwub3JpZ2luID09PSAnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbScsIG5ldyBTdGFsZVdoaWxlUmV2YWxpZGF0ZSh7XG4gICAgICAgIGNhY2hlTmFtZTogc2hlZXRDYWNoZU5hbWUsXG4gICAgfSkpO1xuICAgIC8vIENhY2hlIHRoZSB1bmRlcmx5aW5nIGZvbnQgZmlsZXMgd2l0aCBhIGNhY2hlLWZpcnN0IHN0cmF0ZWd5IGZvciAxIHllYXIuXG4gICAgcmVnaXN0ZXJSb3V0ZSgoeyB1cmwgfSkgPT4gdXJsLm9yaWdpbiA9PT0gJ2h0dHBzOi8vZm9udHMuZ3N0YXRpYy5jb20nLCBuZXcgQ2FjaGVGaXJzdCh7XG4gICAgICAgIGNhY2hlTmFtZTogZm9udENhY2hlTmFtZSxcbiAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgICAgbmV3IENhY2hlYWJsZVJlc3BvbnNlUGx1Z2luKHtcbiAgICAgICAgICAgICAgICBzdGF0dXNlczogWzAsIDIwMF0sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5ldyBFeHBpcmF0aW9uUGx1Z2luKHtcbiAgICAgICAgICAgICAgICBtYXhBZ2VTZWNvbmRzLFxuICAgICAgICAgICAgICAgIG1heEVudHJpZXMsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgXSxcbiAgICB9KSk7XG59XG5leHBvcnQgeyBnb29nbGVGb250c0NhY2hlIH07XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBAdHMtaWdub3JlXG50cnkge1xuICAgIHNlbGZbJ3dvcmtib3g6YmFja2dyb3VuZC1zeW5jOjYuNS4zJ10gJiYgXygpO1xufVxuY2F0Y2ggKGUpIHsgfVxuIiwgIi8qXG4gIENvcHlyaWdodCAyMDIxIEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IG9wZW5EQiB9IGZyb20gJ2lkYic7XG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbmNvbnN0IERCX1ZFUlNJT04gPSAzO1xuY29uc3QgREJfTkFNRSA9ICd3b3JrYm94LWJhY2tncm91bmQtc3luYyc7XG5jb25zdCBSRVFVRVNUX09CSkVDVF9TVE9SRV9OQU1FID0gJ3JlcXVlc3RzJztcbmNvbnN0IFFVRVVFX05BTUVfSU5ERVggPSAncXVldWVOYW1lJztcbi8qKlxuICogQSBjbGFzcyB0byBpbnRlcmFjdCBkaXJlY3RseSBhbiBJbmRleGVkREIgY3JlYXRlZCBzcGVjaWZpY2FsbHkgdG8gc2F2ZSBhbmRcbiAqIHJldHJpZXZlIFF1ZXVlU3RvcmVFbnRyaWVzLiBUaGlzIGNsYXNzIGVuY2Fwc3VsYXRlcyBhbGwgdGhlIHNjaGVtYSBkZXRhaWxzXG4gKiB0byBzdG9yZSB0aGUgcmVwcmVzZW50YXRpb24gb2YgYSBRdWV1ZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgY2xhc3MgUXVldWVEYiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2RiID0gbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIFF1ZXVlU3RvcmVFbnRyeSB0byB1bmRlcmx5aW5nIGRiLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtVbmlkZW50aWZpZWRRdWV1ZVN0b3JlRW50cnl9IGVudHJ5XG4gICAgICovXG4gICAgYXN5bmMgYWRkRW50cnkoZW50cnkpIHtcbiAgICAgICAgY29uc3QgZGIgPSBhd2FpdCB0aGlzLmdldERiKCk7XG4gICAgICAgIGNvbnN0IHR4ID0gZGIudHJhbnNhY3Rpb24oUkVRVUVTVF9PQkpFQ1RfU1RPUkVfTkFNRSwgJ3JlYWR3cml0ZScsIHtcbiAgICAgICAgICAgIGR1cmFiaWxpdHk6ICdyZWxheGVkJyxcbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IHR4LnN0b3JlLmFkZChlbnRyeSk7XG4gICAgICAgIGF3YWl0IHR4LmRvbmU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGZpcnN0IGVudHJ5IGlkIGluIHRoZSBPYmplY3RTdG9yZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge251bWJlciB8IHVuZGVmaW5lZH1cbiAgICAgKi9cbiAgICBhc3luYyBnZXRGaXJzdEVudHJ5SWQoKSB7XG4gICAgICAgIGNvbnN0IGRiID0gYXdhaXQgdGhpcy5nZXREYigpO1xuICAgICAgICBjb25zdCBjdXJzb3IgPSBhd2FpdCBkYlxuICAgICAgICAgICAgLnRyYW5zYWN0aW9uKFJFUVVFU1RfT0JKRUNUX1NUT1JFX05BTUUpXG4gICAgICAgICAgICAuc3RvcmUub3BlbkN1cnNvcigpO1xuICAgICAgICByZXR1cm4gY3Vyc29yID09PSBudWxsIHx8IGN1cnNvciA9PT0gdm9pZCAwID8gdm9pZCAwIDogY3Vyc29yLnZhbHVlLmlkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIHRoZSBlbnRyaWVzIGZpbHRlcmVkIGJ5IGluZGV4XG4gICAgICpcbiAgICAgKiBAcGFyYW0gcXVldWVOYW1lXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxRdWV1ZVN0b3JlRW50cnlbXT59XG4gICAgICovXG4gICAgYXN5bmMgZ2V0QWxsRW50cmllc0J5UXVldWVOYW1lKHF1ZXVlTmFtZSkge1xuICAgICAgICBjb25zdCBkYiA9IGF3YWl0IHRoaXMuZ2V0RGIoKTtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IGRiLmdldEFsbEZyb21JbmRleChSRVFVRVNUX09CSkVDVF9TVE9SRV9OQU1FLCBRVUVVRV9OQU1FX0lOREVYLCBJREJLZXlSYW5nZS5vbmx5KHF1ZXVlTmFtZSkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0cyA/IHJlc3VsdHMgOiBuZXcgQXJyYXkoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGVudHJpZXMgZmlsdGVyZWQgYnkgaW5kZXhcbiAgICAgKlxuICAgICAqIEBwYXJhbSBxdWV1ZU5hbWVcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPG51bWJlcj59XG4gICAgICovXG4gICAgYXN5bmMgZ2V0RW50cnlDb3VudEJ5UXVldWVOYW1lKHF1ZXVlTmFtZSkge1xuICAgICAgICBjb25zdCBkYiA9IGF3YWl0IHRoaXMuZ2V0RGIoKTtcbiAgICAgICAgcmV0dXJuIGRiLmNvdW50RnJvbUluZGV4KFJFUVVFU1RfT0JKRUNUX1NUT1JFX05BTUUsIFFVRVVFX05BTUVfSU5ERVgsIElEQktleVJhbmdlLm9ubHkocXVldWVOYW1lKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgYSBzaW5nbGUgZW50cnkgYnkgaWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaWQgdGhlIGlkIG9mIHRoZSBlbnRyeSB0byBiZSBkZWxldGVkXG4gICAgICovXG4gICAgYXN5bmMgZGVsZXRlRW50cnkoaWQpIHtcbiAgICAgICAgY29uc3QgZGIgPSBhd2FpdCB0aGlzLmdldERiKCk7XG4gICAgICAgIGF3YWl0IGRiLmRlbGV0ZShSRVFVRVNUX09CSkVDVF9TVE9SRV9OQU1FLCBpZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHF1ZXVlTmFtZVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFF1ZXVlU3RvcmVFbnRyeSB8IHVuZGVmaW5lZD59XG4gICAgICovXG4gICAgYXN5bmMgZ2V0Rmlyc3RFbnRyeUJ5UXVldWVOYW1lKHF1ZXVlTmFtZSkge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5nZXRFbmRFbnRyeUZyb21JbmRleChJREJLZXlSYW5nZS5vbmx5KHF1ZXVlTmFtZSksICduZXh0Jyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHF1ZXVlTmFtZVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFF1ZXVlU3RvcmVFbnRyeSB8IHVuZGVmaW5lZD59XG4gICAgICovXG4gICAgYXN5bmMgZ2V0TGFzdEVudHJ5QnlRdWV1ZU5hbWUocXVldWVOYW1lKSB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmdldEVuZEVudHJ5RnJvbUluZGV4KElEQktleVJhbmdlLm9ubHkocXVldWVOYW1lKSwgJ3ByZXYnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBlaXRoZXIgdGhlIGZpcnN0IG9yIHRoZSBsYXN0IGVudHJpZXMsIGRlcGVuZGluZyBvbiBkaXJlY3Rpb24uXG4gICAgICogRmlsdGVyZWQgYnkgaW5kZXguXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0lEQkN1cnNvckRpcmVjdGlvbn0gZGlyZWN0aW9uXG4gICAgICogQHBhcmFtIHtJREJLZXlSYW5nZX0gcXVlcnlcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPFF1ZXVlU3RvcmVFbnRyeSB8IHVuZGVmaW5lZD59XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhc3luYyBnZXRFbmRFbnRyeUZyb21JbmRleChxdWVyeSwgZGlyZWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IGRiID0gYXdhaXQgdGhpcy5nZXREYigpO1xuICAgICAgICBjb25zdCBjdXJzb3IgPSBhd2FpdCBkYlxuICAgICAgICAgICAgLnRyYW5zYWN0aW9uKFJFUVVFU1RfT0JKRUNUX1NUT1JFX05BTUUpXG4gICAgICAgICAgICAuc3RvcmUuaW5kZXgoUVVFVUVfTkFNRV9JTkRFWClcbiAgICAgICAgICAgIC5vcGVuQ3Vyc29yKHF1ZXJ5LCBkaXJlY3Rpb24pO1xuICAgICAgICByZXR1cm4gY3Vyc29yID09PSBudWxsIHx8IGN1cnNvciA9PT0gdm9pZCAwID8gdm9pZCAwIDogY3Vyc29yLnZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIG9wZW4gY29ubmVjdGlvbiB0byB0aGUgZGF0YWJhc2UuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGFzeW5jIGdldERiKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2RiKSB7XG4gICAgICAgICAgICB0aGlzLl9kYiA9IGF3YWl0IG9wZW5EQihEQl9OQU1FLCBEQl9WRVJTSU9OLCB7XG4gICAgICAgICAgICAgICAgdXBncmFkZTogdGhpcy5fdXBncmFkZURiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2RiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGdyYWRlcyBRdWV1ZURCXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0lEQlBEYXRhYmFzZTxRdWV1ZURCU2NoZW1hPn0gZGJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2xkVmVyc2lvblxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3VwZ3JhZGVEYihkYiwgb2xkVmVyc2lvbikge1xuICAgICAgICBpZiAob2xkVmVyc2lvbiA+IDAgJiYgb2xkVmVyc2lvbiA8IERCX1ZFUlNJT04pIHtcbiAgICAgICAgICAgIGlmIChkYi5vYmplY3RTdG9yZU5hbWVzLmNvbnRhaW5zKFJFUVVFU1RfT0JKRUNUX1NUT1JFX05BTUUpKSB7XG4gICAgICAgICAgICAgICAgZGIuZGVsZXRlT2JqZWN0U3RvcmUoUkVRVUVTVF9PQkpFQ1RfU1RPUkVfTkFNRSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb2JqU3RvcmUgPSBkYi5jcmVhdGVPYmplY3RTdG9yZShSRVFVRVNUX09CSkVDVF9TVE9SRV9OQU1FLCB7XG4gICAgICAgICAgICBhdXRvSW5jcmVtZW50OiB0cnVlLFxuICAgICAgICAgICAga2V5UGF0aDogJ2lkJyxcbiAgICAgICAgfSk7XG4gICAgICAgIG9ialN0b3JlLmNyZWF0ZUluZGV4KFFVRVVFX05BTUVfSU5ERVgsIFFVRVVFX05BTUVfSU5ERVgsIHsgdW5pcXVlOiBmYWxzZSB9KTtcbiAgICB9XG59XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL2Fzc2VydC5qcyc7XG5pbXBvcnQgeyBRdWV1ZURiLCB9IGZyb20gJy4vUXVldWVEYi5qcyc7XG5pbXBvcnQgJy4uL192ZXJzaW9uLmpzJztcbi8qKlxuICogQSBjbGFzcyB0byBtYW5hZ2Ugc3RvcmluZyByZXF1ZXN0cyBmcm9tIGEgUXVldWUgaW4gSW5kZXhlZERCLFxuICogaW5kZXhlZCBieSB0aGVpciBxdWV1ZSBuYW1lIGZvciBlYXNpZXIgYWNjZXNzLlxuICpcbiAqIE1vc3QgZGV2ZWxvcGVycyB3aWxsIG5vdCBuZWVkIHRvIGFjY2VzcyB0aGlzIGNsYXNzIGRpcmVjdGx5O1xuICogaXQgaXMgZXhwb3NlZCBmb3IgYWR2YW5jZWQgdXNlIGNhc2VzLlxuICovXG5leHBvcnQgY2xhc3MgUXVldWVTdG9yZSB7XG4gICAgLyoqXG4gICAgICogQXNzb2NpYXRlcyB0aGlzIGluc3RhbmNlIHdpdGggYSBRdWV1ZSBpbnN0YW5jZSwgc28gZW50cmllcyBhZGRlZCBjYW4gYmVcbiAgICAgKiBpZGVudGlmaWVkIGJ5IHRoZWlyIHF1ZXVlIG5hbWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcXVldWVOYW1lXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocXVldWVOYW1lKSB7XG4gICAgICAgIHRoaXMuX3F1ZXVlTmFtZSA9IHF1ZXVlTmFtZTtcbiAgICAgICAgdGhpcy5fcXVldWVEYiA9IG5ldyBRdWV1ZURiKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFwcGVuZCBhbiBlbnRyeSBsYXN0IGluIHRoZSBxdWV1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbnRyeVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbnRyeS5yZXF1ZXN0RGF0YVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbZW50cnkudGltZXN0YW1wXVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbZW50cnkubWV0YWRhdGFdXG4gICAgICovXG4gICAgYXN5bmMgcHVzaEVudHJ5KGVudHJ5KSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBhc3NlcnQuaXNUeXBlKGVudHJ5LCAnb2JqZWN0Jywge1xuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LWJhY2tncm91bmQtc3luYycsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnUXVldWVTdG9yZScsXG4gICAgICAgICAgICAgICAgZnVuY05hbWU6ICdwdXNoRW50cnknLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ2VudHJ5JyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXNzZXJ0LmlzVHlwZShlbnRyeS5yZXF1ZXN0RGF0YSwgJ29iamVjdCcsIHtcbiAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1iYWNrZ3JvdW5kLXN5bmMnLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ1F1ZXVlU3RvcmUnLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAncHVzaEVudHJ5JyxcbiAgICAgICAgICAgICAgICBwYXJhbU5hbWU6ICdlbnRyeS5yZXF1ZXN0RGF0YScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBEb24ndCBzcGVjaWZ5IGFuIElEIHNpbmNlIG9uZSBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZC5cbiAgICAgICAgZGVsZXRlIGVudHJ5LmlkO1xuICAgICAgICBlbnRyeS5xdWV1ZU5hbWUgPSB0aGlzLl9xdWV1ZU5hbWU7XG4gICAgICAgIGF3YWl0IHRoaXMuX3F1ZXVlRGIuYWRkRW50cnkoZW50cnkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcmVwZW5kIGFuIGVudHJ5IGZpcnN0IGluIHRoZSBxdWV1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbnRyeVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbnRyeS5yZXF1ZXN0RGF0YVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbZW50cnkudGltZXN0YW1wXVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbZW50cnkubWV0YWRhdGFdXG4gICAgICovXG4gICAgYXN5bmMgdW5zaGlmdEVudHJ5KGVudHJ5KSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBhc3NlcnQuaXNUeXBlKGVudHJ5LCAnb2JqZWN0Jywge1xuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LWJhY2tncm91bmQtc3luYycsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnUXVldWVTdG9yZScsXG4gICAgICAgICAgICAgICAgZnVuY05hbWU6ICd1bnNoaWZ0RW50cnknLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ2VudHJ5JyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXNzZXJ0LmlzVHlwZShlbnRyeS5yZXF1ZXN0RGF0YSwgJ29iamVjdCcsIHtcbiAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnd29ya2JveC1iYWNrZ3JvdW5kLXN5bmMnLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ1F1ZXVlU3RvcmUnLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAndW5zaGlmdEVudHJ5JyxcbiAgICAgICAgICAgICAgICBwYXJhbU5hbWU6ICdlbnRyeS5yZXF1ZXN0RGF0YScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaXJzdElkID0gYXdhaXQgdGhpcy5fcXVldWVEYi5nZXRGaXJzdEVudHJ5SWQoKTtcbiAgICAgICAgaWYgKGZpcnN0SWQpIHtcbiAgICAgICAgICAgIC8vIFBpY2sgYW4gSUQgb25lIGxlc3MgdGhhbiB0aGUgbG93ZXN0IElEIGluIHRoZSBvYmplY3Qgc3RvcmUuXG4gICAgICAgICAgICBlbnRyeS5pZCA9IGZpcnN0SWQgLSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIGxldCB0aGUgYXV0by1pbmNyZW1lbnRvciBhc3NpZ24gdGhlIElELlxuICAgICAgICAgICAgZGVsZXRlIGVudHJ5LmlkO1xuICAgICAgICB9XG4gICAgICAgIGVudHJ5LnF1ZXVlTmFtZSA9IHRoaXMuX3F1ZXVlTmFtZTtcbiAgICAgICAgYXdhaXQgdGhpcy5fcXVldWVEYi5hZGRFbnRyeShlbnRyeSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYW5kIHJldHVybnMgdGhlIGxhc3QgZW50cnkgaW4gdGhlIHF1ZXVlIG1hdGNoaW5nIHRoZSBgcXVldWVOYW1lYC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8UXVldWVTdG9yZUVudHJ5fHVuZGVmaW5lZD59XG4gICAgICovXG4gICAgYXN5bmMgcG9wRW50cnkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZW1vdmVFbnRyeShhd2FpdCB0aGlzLl9xdWV1ZURiLmdldExhc3RFbnRyeUJ5UXVldWVOYW1lKHRoaXMuX3F1ZXVlTmFtZSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFuZCByZXR1cm5zIHRoZSBmaXJzdCBlbnRyeSBpbiB0aGUgcXVldWUgbWF0Y2hpbmcgdGhlIGBxdWV1ZU5hbWVgLlxuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxRdWV1ZVN0b3JlRW50cnl8dW5kZWZpbmVkPn1cbiAgICAgKi9cbiAgICBhc3luYyBzaGlmdEVudHJ5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVtb3ZlRW50cnkoYXdhaXQgdGhpcy5fcXVldWVEYi5nZXRGaXJzdEVudHJ5QnlRdWV1ZU5hbWUodGhpcy5fcXVldWVOYW1lKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIGVudHJpZXMgaW4gdGhlIHN0b3JlIG1hdGNoaW5nIHRoZSBgcXVldWVOYW1lYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFNlZSB7QGxpbmsgd29ya2JveC1iYWNrZ3JvdW5kLXN5bmMuUXVldWV+Z2V0QWxsfVxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8QXJyYXk8T2JqZWN0Pj59XG4gICAgICovXG4gICAgYXN5bmMgZ2V0QWxsKCkge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fcXVldWVEYi5nZXRBbGxFbnRyaWVzQnlRdWV1ZU5hbWUodGhpcy5fcXVldWVOYW1lKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGVudHJpZXMgaW4gdGhlIHN0b3JlIG1hdGNoaW5nIHRoZSBgcXVldWVOYW1lYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFNlZSB7QGxpbmsgd29ya2JveC1iYWNrZ3JvdW5kLXN5bmMuUXVldWV+c2l6ZX1cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPG51bWJlcj59XG4gICAgICovXG4gICAgYXN5bmMgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3F1ZXVlRGIuZ2V0RW50cnlDb3VudEJ5UXVldWVOYW1lKHRoaXMuX3F1ZXVlTmFtZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgdGhlIGVudHJ5IGZvciB0aGUgZ2l2ZW4gSUQuXG4gICAgICpcbiAgICAgKiBXQVJOSU5HOiB0aGlzIG1ldGhvZCBkb2VzIG5vdCBlbnN1cmUgdGhlIGRlbGV0ZWQgZW50cnkgYmVsb25ncyB0byB0aGlzXG4gICAgICogcXVldWUgKGkuZS4gbWF0Y2hlcyB0aGUgYHF1ZXVlTmFtZWApLiBCdXQgdGhpcyBsaW1pdGF0aW9uIGlzIGFjY2VwdGFibGVcbiAgICAgKiBhcyB0aGlzIGNsYXNzIGlzIG5vdCBwdWJsaWNseSBleHBvc2VkLiBBbiBhZGRpdGlvbmFsIGNoZWNrIHdvdWxkIG1ha2VcbiAgICAgKiB0aGlzIG1ldGhvZCBzbG93ZXIgdGhhbiBpdCBuZWVkcyB0byBiZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpZFxuICAgICAqL1xuICAgIGFzeW5jIGRlbGV0ZUVudHJ5KGlkKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuX3F1ZXVlRGIuZGVsZXRlRW50cnkoaWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFuZCByZXR1cm5zIHRoZSBmaXJzdCBvciBsYXN0IGVudHJ5IGluIHRoZSBxdWV1ZSAoYmFzZWQgb24gdGhlXG4gICAgICogYGRpcmVjdGlvbmAgYXJndW1lbnQpIG1hdGNoaW5nIHRoZSBgcXVldWVOYW1lYC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8UXVldWVTdG9yZUVudHJ5fHVuZGVmaW5lZD59XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhc3luYyBfcmVtb3ZlRW50cnkoZW50cnkpIHtcbiAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmRlbGV0ZUVudHJ5KGVudHJ5LmlkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZW50cnk7XG4gICAgfVxufVxuIiwgIi8qXG4gIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTENcblxuICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAgbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIG9yIGF0XG4gIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuKi9cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9hc3NlcnQuanMnO1xuaW1wb3J0ICcuLi9fdmVyc2lvbi5qcyc7XG5jb25zdCBzZXJpYWxpemFibGVQcm9wZXJ0aWVzID0gW1xuICAgICdtZXRob2QnLFxuICAgICdyZWZlcnJlcicsXG4gICAgJ3JlZmVycmVyUG9saWN5JyxcbiAgICAnbW9kZScsXG4gICAgJ2NyZWRlbnRpYWxzJyxcbiAgICAnY2FjaGUnLFxuICAgICdyZWRpcmVjdCcsXG4gICAgJ2ludGVncml0eScsXG4gICAgJ2tlZXBhbGl2ZScsXG5dO1xuLyoqXG4gKiBBIGNsYXNzIHRvIG1ha2UgaXQgZWFzaWVyIHRvIHNlcmlhbGl6ZSBhbmQgZGUtc2VyaWFsaXplIHJlcXVlc3RzIHNvIHRoZXlcbiAqIGNhbiBiZSBzdG9yZWQgaW4gSW5kZXhlZERCLlxuICpcbiAqIE1vc3QgZGV2ZWxvcGVycyB3aWxsIG5vdCBuZWVkIHRvIGFjY2VzcyB0aGlzIGNsYXNzIGRpcmVjdGx5O1xuICogaXQgaXMgZXhwb3NlZCBmb3IgYWR2YW5jZWQgdXNlIGNhc2VzLlxuICovXG5jbGFzcyBTdG9yYWJsZVJlcXVlc3Qge1xuICAgIC8qKlxuICAgICAqIEFjY2VwdHMgYW4gb2JqZWN0IG9mIHJlcXVlc3QgZGF0YSB0aGF0IGNhbiBiZSB1c2VkIHRvIGNvbnN0cnVjdCBhXG4gICAgICogYFJlcXVlc3RgIGJ1dCBjYW4gYWxzbyBiZSBzdG9yZWQgaW4gSW5kZXhlZERCLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHJlcXVlc3REYXRhIEFuIG9iamVjdCBvZiByZXF1ZXN0IGRhdGEgdGhhdCBpbmNsdWRlcyB0aGVcbiAgICAgKiAgICAgYHVybGAgcGx1cyBhbnkgcmVsZXZhbnQgcHJvcGVydGllcyBvZlxuICAgICAqICAgICBbcmVxdWVzdEluaXRde0BsaW5rIGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNyZXF1ZXN0aW5pdH0uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVxdWVzdERhdGEpIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGFzc2VydC5pc1R5cGUocmVxdWVzdERhdGEsICdvYmplY3QnLCB7XG4gICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtYmFja2dyb3VuZC1zeW5jJyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdTdG9yYWJsZVJlcXVlc3QnLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAnY29uc3RydWN0b3InLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ3JlcXVlc3REYXRhJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXNzZXJ0LmlzVHlwZShyZXF1ZXN0RGF0YS51cmwsICdzdHJpbmcnLCB7XG4gICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ3dvcmtib3gtYmFja2dyb3VuZC1zeW5jJyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdTdG9yYWJsZVJlcXVlc3QnLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAnY29uc3RydWN0b3InLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ3JlcXVlc3REYXRhLnVybCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGUgcmVxdWVzdCdzIG1vZGUgaXMgYG5hdmlnYXRlYCwgY29udmVydCBpdCB0byBgc2FtZS1vcmlnaW5gIHNpbmNlXG4gICAgICAgIC8vIG5hdmlnYXRpb24gcmVxdWVzdHMgY2FuJ3QgYmUgY29uc3RydWN0ZWQgdmlhIHNjcmlwdC5cbiAgICAgICAgaWYgKHJlcXVlc3REYXRhWydtb2RlJ10gPT09ICduYXZpZ2F0ZScpIHtcbiAgICAgICAgICAgIHJlcXVlc3REYXRhWydtb2RlJ10gPSAnc2FtZS1vcmlnaW4nO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3JlcXVlc3REYXRhID0gcmVxdWVzdERhdGE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgUmVxdWVzdCBvYmplY3QgdG8gYSBwbGFpbiBvYmplY3QgdGhhdCBjYW4gYmUgc3RydWN0dXJlZFxuICAgICAqIGNsb25lZCBvciBKU09OLXN0cmluZ2lmaWVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0fSByZXF1ZXN0XG4gICAgICogQHJldHVybiB7UHJvbWlzZTxTdG9yYWJsZVJlcXVlc3Q+fVxuICAgICAqL1xuICAgIHN0YXRpYyBhc3luYyBmcm9tUmVxdWVzdChyZXF1ZXN0KSB7XG4gICAgICAgIGNvbnN0IHJlcXVlc3REYXRhID0ge1xuICAgICAgICAgICAgdXJsOiByZXF1ZXN0LnVybCxcbiAgICAgICAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgICB9O1xuICAgICAgICAvLyBTZXQgdGhlIGJvZHkgaWYgcHJlc2VudC5cbiAgICAgICAgaWYgKHJlcXVlc3QubWV0aG9kICE9PSAnR0VUJykge1xuICAgICAgICAgICAgLy8gVXNlIEFycmF5QnVmZmVyIHRvIHN1cHBvcnQgbm9uLXRleHQgcmVxdWVzdCBib2RpZXMuXG4gICAgICAgICAgICAvLyBOT1RFOiB3ZSBjYW4ndCB1c2UgQmxvYnMgYmVjdXNlIFNhZmFyaSBkb2Vzbid0IHN1cHBvcnQgc3RvcmluZ1xuICAgICAgICAgICAgLy8gQmxvYnMgaW4gSW5kZXhlZERCIGluIHNvbWUgY2FzZXM6XG4gICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZGZhaGxhbmRlci9EZXhpZS5qcy9pc3N1ZXMvNjE4I2lzc3VlY29tbWVudC0zOTgzNDg0NTdcbiAgICAgICAgICAgIHJlcXVlc3REYXRhLmJvZHkgPSBhd2FpdCByZXF1ZXN0LmNsb25lKCkuYXJyYXlCdWZmZXIoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDb252ZXJ0IHRoZSBoZWFkZXJzIGZyb20gYW4gaXRlcmFibGUgdG8gYW4gb2JqZWN0LlxuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiByZXF1ZXN0LmhlYWRlcnMuZW50cmllcygpKSB7XG4gICAgICAgICAgICByZXF1ZXN0RGF0YS5oZWFkZXJzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBZGQgYWxsIG90aGVyIHNlcmlhbGl6YWJsZSByZXF1ZXN0IHByb3BlcnRpZXNcbiAgICAgICAgZm9yIChjb25zdCBwcm9wIG9mIHNlcmlhbGl6YWJsZVByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0W3Byb3BdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0RGF0YVtwcm9wXSA9IHJlcXVlc3RbcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBTdG9yYWJsZVJlcXVlc3QocmVxdWVzdERhdGEpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgZGVlcCBjbG9uZSBvZiB0aGUgaW5zdGFuY2VzIGBfcmVxdWVzdERhdGFgIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICB0b09iamVjdCgpIHtcbiAgICAgICAgY29uc3QgcmVxdWVzdERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9yZXF1ZXN0RGF0YSk7XG4gICAgICAgIHJlcXVlc3REYXRhLmhlYWRlcnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9yZXF1ZXN0RGF0YS5oZWFkZXJzKTtcbiAgICAgICAgaWYgKHJlcXVlc3REYXRhLmJvZHkpIHtcbiAgICAgICAgICAgIHJlcXVlc3REYXRhLmJvZHkgPSByZXF1ZXN0RGF0YS5ib2R5LnNsaWNlKDApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXF1ZXN0RGF0YTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29udmVydHMgdGhpcyBpbnN0YW5jZSB0byBhIFJlcXVlc3QuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICAgICAqL1xuICAgIHRvUmVxdWVzdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMuX3JlcXVlc3REYXRhLnVybCwgdGhpcy5fcmVxdWVzdERhdGEpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgZGVlcCBjbG9uZSBvZiB0aGUgaW5zdGFuY2UuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtTdG9yYWJsZVJlcXVlc3R9XG4gICAgICovXG4gICAgY2xvbmUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3RvcmFibGVSZXF1ZXN0KHRoaXMudG9PYmplY3QoKSk7XG4gICAgfVxufVxuZXhwb3J0IHsgU3RvcmFibGVSZXF1ZXN0IH07XG4iLCAiLypcbiAgQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuXG4gIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZVxuICBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4qL1xuaW1wb3J0IHsgV29ya2JveEVycm9yIH0gZnJvbSAnd29ya2JveC1jb3JlL19wcml2YXRlL1dvcmtib3hFcnJvci5qcyc7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvbG9nZ2VyLmpzJztcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ3dvcmtib3gtY29yZS9fcHJpdmF0ZS9hc3NlcnQuanMnO1xuaW1wb3J0IHsgZ2V0RnJpZW5kbHlVUkwgfSBmcm9tICd3b3JrYm94LWNvcmUvX3ByaXZhdGUvZ2V0RnJpZW5kbHlVUkwuanMnO1xuaW1wb3J0IHsgUXVldWVTdG9yZSB9IGZyb20gJy4vbGliL1F1ZXVlU3RvcmUuanMnO1xuaW1wb3J0IHsgU3RvcmFibGVSZXF1ZXN0IH0gZnJvbSAnLi9saWIvU3RvcmFibGVSZXF1ZXN0LmpzJztcbmltcG9ydCAnLi9fdmVyc2lvbi5qcyc7XG5jb25zdCBUQUdfUFJFRklYID0gJ3dvcmtib3gtYmFja2dyb3VuZC1zeW5jJztcbmNvbnN0IE1BWF9SRVRFTlRJT05fVElNRSA9IDYwICogMjQgKiA3OyAvLyA3IGRheXMgaW4gbWludXRlc1xuY29uc3QgcXVldWVOYW1lcyA9IG5ldyBTZXQoKTtcbi8qKlxuICogQ29udmVydHMgYSBRdWV1ZVN0b3JlIGVudHJ5IGludG8gdGhlIGZvcm1hdCBleHBvc2VkIGJ5IFF1ZXVlLiBUaGlzIGVudGFpbHNcbiAqIGNvbnZlcnRpbmcgdGhlIHJlcXVlc3QgZGF0YSBpbnRvIGEgcmVhbCByZXF1ZXN0IGFuZCBvbWl0dGluZyB0aGUgYGlkYCBhbmRcbiAqIGBxdWV1ZU5hbWVgIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtVbmlkZW50aWZpZWRRdWV1ZVN0b3JlRW50cnl9IHF1ZXVlU3RvcmVFbnRyeVxuICogQHJldHVybiB7UXVldWV9XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBjb252ZXJ0RW50cnkgPSAocXVldWVTdG9yZUVudHJ5KSA9PiB7XG4gICAgY29uc3QgcXVldWVFbnRyeSA9IHtcbiAgICAgICAgcmVxdWVzdDogbmV3IFN0b3JhYmxlUmVxdWVzdChxdWV1ZVN0b3JlRW50cnkucmVxdWVzdERhdGEpLnRvUmVxdWVzdCgpLFxuICAgICAgICB0aW1lc3RhbXA6IHF1ZXVlU3RvcmVFbnRyeS50aW1lc3RhbXAsXG4gICAgfTtcbiAgICBpZiAocXVldWVTdG9yZUVudHJ5Lm1ldGFkYXRhKSB7XG4gICAgICAgIHF1ZXVlRW50cnkubWV0YWRhdGEgPSBxdWV1ZVN0b3JlRW50cnkubWV0YWRhdGE7XG4gICAgfVxuICAgIHJldHVybiBxdWV1ZUVudHJ5O1xufTtcbi8qKlxuICogQSBjbGFzcyB0byBtYW5hZ2Ugc3RvcmluZyBmYWlsZWQgcmVxdWVzdHMgaW4gSW5kZXhlZERCIGFuZCByZXRyeWluZyB0aGVtXG4gKiBsYXRlci4gQWxsIHBhcnRzIG9mIHRoZSBzdG9yaW5nIGFuZCByZXBsYXlpbmcgcHJvY2VzcyBhcmUgb2JzZXJ2YWJsZSB2aWFcbiAqIGNhbGxiYWNrcy5cbiAqXG4gKiBAbWVtYmVyb2Ygd29ya2JveC1iYWNrZ3JvdW5kLXN5bmNcbiAqL1xuY2xhc3MgUXVldWUge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUXVldWUgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9uc1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIHVuaXF1ZSBuYW1lIGZvciB0aGlzIHF1ZXVlLiBUaGlzIG5hbWUgbXVzdCBiZVxuICAgICAqICAgICB1bmlxdWUgYXMgaXQncyB1c2VkIHRvIHJlZ2lzdGVyIHN5bmMgZXZlbnRzIGFuZCBzdG9yZSByZXF1ZXN0c1xuICAgICAqICAgICBpbiBJbmRleGVkREIgc3BlY2lmaWMgdG8gdGhpcyBpbnN0YW5jZS4gQW4gZXJyb3Igd2lsbCBiZSB0aHJvd24gaWZcbiAgICAgKiAgICAgYSBkdXBsaWNhdGUgbmFtZSBpcyBkZXRlY3RlZC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMub25TeW5jXSBBIGZ1bmN0aW9uIHRoYXQgZ2V0cyBpbnZva2VkIHdoZW5ldmVyXG4gICAgICogICAgIHRoZSAnc3luYycgZXZlbnQgZmlyZXMuIFRoZSBmdW5jdGlvbiBpcyBpbnZva2VkIHdpdGggYW4gb2JqZWN0XG4gICAgICogICAgIGNvbnRhaW5pbmcgdGhlIGBxdWV1ZWAgcHJvcGVydHkgKHJlZmVyZW5jaW5nIHRoaXMgaW5zdGFuY2UpLCBhbmQgeW91XG4gICAgICogICAgIGNhbiB1c2UgdGhlIGNhbGxiYWNrIHRvIGN1c3RvbWl6ZSB0aGUgcmVwbGF5IGJlaGF2aW9yIG9mIHRoZSBxdWV1ZS5cbiAgICAgKiAgICAgV2hlbiBub3Qgc2V0IHRoZSBgcmVwbGF5UmVxdWVzdHMoKWAgbWV0aG9kIGlzIGNhbGxlZC5cbiAgICAgKiAgICAgTm90ZTogaWYgdGhlIHJlcGxheSBmYWlscyBhZnRlciBhIHN5bmMgZXZlbnQsIG1ha2Ugc3VyZSB5b3UgdGhyb3cgYW5cbiAgICAgKiAgICAgZXJyb3IsIHNvIHRoZSBicm93c2VyIGtub3dzIHRvIHJldHJ5IHRoZSBzeW5jIGV2ZW50IGxhdGVyLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhSZXRlbnRpb25UaW1lPTcgZGF5c10gVGhlIGFtb3VudCBvZiB0aW1lIChpblxuICAgICAqICAgICBtaW51dGVzKSBhIHJlcXVlc3QgbWF5IGJlIHJldHJpZWQuIEFmdGVyIHRoaXMgYW1vdW50IG9mIHRpbWUgaGFzXG4gICAgICogICAgIHBhc3NlZCwgdGhlIHJlcXVlc3Qgd2lsbCBiZSBkZWxldGVkIGZyb20gdGhlIHF1ZXVlLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuZm9yY2VTeW5jRmFsbGJhY2s9ZmFsc2VdIElmIGB0cnVlYCwgaW5zdGVhZFxuICAgICAqICAgICBvZiBhdHRlbXB0aW5nIHRvIHVzZSBiYWNrZ3JvdW5kIHN5bmMgZXZlbnRzLCBhbHdheXMgYXR0ZW1wdCB0byByZXBsYXlcbiAgICAgKiAgICAgcXVldWVkIHJlcXVlc3QgYXQgc2VydmljZSB3b3JrZXIgc3RhcnR1cC4gTW9zdCBmb2xrcyB3aWxsIG5vdCBuZWVkXG4gICAgICogICAgIHRoaXMsIHVubGVzcyB5b3UgZXhwbGljaXRseSB0YXJnZXQgYSBydW50aW1lIGxpa2UgRWxlY3Ryb24gdGhhdFxuICAgICAqICAgICBleHBvc2VzIHRoZSBpbnRlcmZhY2VzIGZvciBiYWNrZ3JvdW5kIHN5bmMsIGJ1dCBkb2VzIG5vdCBoYXZlIGEgd29ya2luZ1xuICAgICAqICAgICBpbXBsZW1lbnRhdGlvbi5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCB7IGZvcmNlU3luY0ZhbGxiYWNrLCBvblN5bmMsIG1heFJldGVudGlvblRpbWUgfSA9IHt9KSB7XG4gICAgICAgIHRoaXMuX3N5bmNJblByb2dyZXNzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3JlcXVlc3RzQWRkZWREdXJpbmdTeW5jID0gZmFsc2U7XG4gICAgICAgIC8vIEVuc3VyZSB0aGUgc3RvcmUgbmFtZSBpcyBub3QgYWxyZWFkeSBiZWluZyB1c2VkXG4gICAgICAgIGlmIChxdWV1ZU5hbWVzLmhhcyhuYW1lKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFdvcmtib3hFcnJvcignZHVwbGljYXRlLXF1ZXVlLW5hbWUnLCB7IG5hbWUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBxdWV1ZU5hbWVzLmFkZChuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5fb25TeW5jID0gb25TeW5jIHx8IHRoaXMucmVwbGF5UmVxdWVzdHM7XG4gICAgICAgIHRoaXMuX21heFJldGVudGlvblRpbWUgPSBtYXhSZXRlbnRpb25UaW1lIHx8IE1BWF9SRVRFTlRJT05fVElNRTtcbiAgICAgICAgdGhpcy5fZm9yY2VTeW5jRmFsbGJhY2sgPSBCb29sZWFuKGZvcmNlU3luY0ZhbGxiYWNrKTtcbiAgICAgICAgdGhpcy5fcXVldWVTdG9yZSA9IG5ldyBRdWV1ZVN0b3JlKHRoaXMuX25hbWUpO1xuICAgICAgICB0aGlzLl9hZGRTeW5jTGlzdGVuZXIoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RvcmVzIHRoZSBwYXNzZWQgcmVxdWVzdCBpbiBJbmRleGVkREIgKHdpdGggaXRzIHRpbWVzdGFtcCBhbmQgYW55XG4gICAgICogbWV0YWRhdGEpIGF0IHRoZSBlbmQgb2YgdGhlIHF1ZXVlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtRdWV1ZUVudHJ5fSBlbnRyeVxuICAgICAqIEBwYXJhbSB7UmVxdWVzdH0gZW50cnkucmVxdWVzdCBUaGUgcmVxdWVzdCB0byBzdG9yZSBpbiB0aGUgcXVldWUuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtlbnRyeS5tZXRhZGF0YV0gQW55IG1ldGFkYXRhIHlvdSB3YW50IGFzc29jaWF0ZWQgd2l0aCB0aGVcbiAgICAgKiAgICAgc3RvcmVkIHJlcXVlc3QuIFdoZW4gcmVxdWVzdHMgYXJlIHJlcGxheWVkIHlvdSdsbCBoYXZlIGFjY2VzcyB0byB0aGlzXG4gICAgICogICAgIG1ldGFkYXRhIG9iamVjdCBpbiBjYXNlIHlvdSBuZWVkIHRvIG1vZGlmeSB0aGUgcmVxdWVzdCBiZWZvcmVoYW5kLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbZW50cnkudGltZXN0YW1wXSBUaGUgdGltZXN0YW1wIChFcG9jaCB0aW1lIGluXG4gICAgICogICAgIG1pbGxpc2Vjb25kcykgd2hlbiB0aGUgcmVxdWVzdCB3YXMgZmlyc3QgYWRkZWQgdG8gdGhlIHF1ZXVlLiBUaGlzIGlzXG4gICAgICogICAgIHVzZWQgYWxvbmcgd2l0aCBgbWF4UmV0ZW50aW9uVGltZWAgdG8gcmVtb3ZlIG91dGRhdGVkIHJlcXVlc3RzLiBJblxuICAgICAqICAgICBnZW5lcmFsIHlvdSBkb24ndCBuZWVkIHRvIHNldCB0aGlzIHZhbHVlLCBhcyBpdCdzIGF1dG9tYXRpY2FsbHkgc2V0XG4gICAgICogICAgIGZvciB5b3UgKGRlZmF1bHRpbmcgdG8gYERhdGUubm93KClgKSwgYnV0IHlvdSBjYW4gdXBkYXRlIGl0IGlmIHlvdVxuICAgICAqICAgICBkb24ndCB3YW50IHBhcnRpY3VsYXIgcmVxdWVzdHMgdG8gZXhwaXJlLlxuICAgICAqL1xuICAgIGFzeW5jIHB1c2hSZXF1ZXN0KGVudHJ5KSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBhc3NlcnQuaXNUeXBlKGVudHJ5LCAnb2JqZWN0Jywge1xuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LWJhY2tncm91bmQtc3luYycsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnUXVldWUnLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAncHVzaFJlcXVlc3QnLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ2VudHJ5JyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXNzZXJ0LmlzSW5zdGFuY2UoZW50cnkucmVxdWVzdCwgUmVxdWVzdCwge1xuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LWJhY2tncm91bmQtc3luYycsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnUXVldWUnLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAncHVzaFJlcXVlc3QnLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ2VudHJ5LnJlcXVlc3QnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5fYWRkUmVxdWVzdChlbnRyeSwgJ3B1c2gnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RvcmVzIHRoZSBwYXNzZWQgcmVxdWVzdCBpbiBJbmRleGVkREIgKHdpdGggaXRzIHRpbWVzdGFtcCBhbmQgYW55XG4gICAgICogbWV0YWRhdGEpIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHF1ZXVlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtRdWV1ZUVudHJ5fSBlbnRyeVxuICAgICAqIEBwYXJhbSB7UmVxdWVzdH0gZW50cnkucmVxdWVzdCBUaGUgcmVxdWVzdCB0byBzdG9yZSBpbiB0aGUgcXVldWUuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtlbnRyeS5tZXRhZGF0YV0gQW55IG1ldGFkYXRhIHlvdSB3YW50IGFzc29jaWF0ZWQgd2l0aCB0aGVcbiAgICAgKiAgICAgc3RvcmVkIHJlcXVlc3QuIFdoZW4gcmVxdWVzdHMgYXJlIHJlcGxheWVkIHlvdSdsbCBoYXZlIGFjY2VzcyB0byB0aGlzXG4gICAgICogICAgIG1ldGFkYXRhIG9iamVjdCBpbiBjYXNlIHlvdSBuZWVkIHRvIG1vZGlmeSB0aGUgcmVxdWVzdCBiZWZvcmVoYW5kLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbZW50cnkudGltZXN0YW1wXSBUaGUgdGltZXN0YW1wIChFcG9jaCB0aW1lIGluXG4gICAgICogICAgIG1pbGxpc2Vjb25kcykgd2hlbiB0aGUgcmVxdWVzdCB3YXMgZmlyc3QgYWRkZWQgdG8gdGhlIHF1ZXVlLiBUaGlzIGlzXG4gICAgICogICAgIHVzZWQgYWxvbmcgd2l0aCBgbWF4UmV0ZW50aW9uVGltZWAgdG8gcmVtb3ZlIG91dGRhdGVkIHJlcXVlc3RzLiBJblxuICAgICAqICAgICBnZW5lcmFsIHlvdSBkb24ndCBuZWVkIHRvIHNldCB0aGlzIHZhbHVlLCBhcyBpdCdzIGF1dG9tYXRpY2FsbHkgc2V0XG4gICAgICogICAgIGZvciB5b3UgKGRlZmF1bHRpbmcgdG8gYERhdGUubm93KClgKSwgYnV0IHlvdSBjYW4gdXBkYXRlIGl0IGlmIHlvdVxuICAgICAqICAgICBkb24ndCB3YW50IHBhcnRpY3VsYXIgcmVxdWVzdHMgdG8gZXhwaXJlLlxuICAgICAqL1xuICAgIGFzeW5jIHVuc2hpZnRSZXF1ZXN0KGVudHJ5KSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBhc3NlcnQuaXNUeXBlKGVudHJ5LCAnb2JqZWN0Jywge1xuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LWJhY2tncm91bmQtc3luYycsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnUXVldWUnLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAndW5zaGlmdFJlcXVlc3QnLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ2VudHJ5JyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXNzZXJ0LmlzSW5zdGFuY2UoZW50cnkucmVxdWVzdCwgUmVxdWVzdCwge1xuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICd3b3JrYm94LWJhY2tncm91bmQtc3luYycsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnUXVldWUnLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiAndW5zaGlmdFJlcXVlc3QnLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZTogJ2VudHJ5LnJlcXVlc3QnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5fYWRkUmVxdWVzdChlbnRyeSwgJ3Vuc2hpZnQnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbmQgcmV0dXJucyB0aGUgbGFzdCByZXF1ZXN0IGluIHRoZSBxdWV1ZSAoYWxvbmcgd2l0aCBpdHNcbiAgICAgKiB0aW1lc3RhbXAgYW5kIGFueSBtZXRhZGF0YSkuIFRoZSByZXR1cm5lZCBvYmplY3QgdGFrZXMgdGhlIGZvcm06XG4gICAgICogYHtyZXF1ZXN0LCB0aW1lc3RhbXAsIG1ldGFkYXRhfWAuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPFF1ZXVlRW50cnkgfCB1bmRlZmluZWQ+fVxuICAgICAqL1xuICAgIGFzeW5jIHBvcFJlcXVlc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZW1vdmVSZXF1ZXN0KCdwb3AnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbmQgcmV0dXJucyB0aGUgZmlyc3QgcmVxdWVzdCBpbiB0aGUgcXVldWUgKGFsb25nIHdpdGggaXRzXG4gICAgICogdGltZXN0YW1wIGFuZCBhbnkgbWV0YWRhdGEpLiBUaGUgcmV0dXJuZWQgb2JqZWN0IHRha2VzIHRoZSBmb3JtOlxuICAgICAqIGB7cmVxdWVzdCwgdGltZXN0YW1wLCBtZXRhZGF0YX1gLlxuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxRdWV1ZUVudHJ5IHwgdW5kZWZpbmVkPn1cbiAgICAgKi9cbiAgICBhc3luYyBzaGlmdFJlcXVlc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZW1vdmVSZXF1ZXN0KCdzaGlmdCcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCB0aGUgZW50cmllcyB0aGF0IGhhdmUgbm90IGV4cGlyZWQgKHBlciBgbWF4UmV0ZW50aW9uVGltZWApLlxuICAgICAqIEFueSBleHBpcmVkIGVudHJpZXMgYXJlIHJlbW92ZWQgZnJvbSB0aGUgcXVldWUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPEFycmF5PFF1ZXVlRW50cnk+Pn1cbiAgICAgKi9cbiAgICBhc3luYyBnZXRBbGwoKSB7XG4gICAgICAgIGNvbnN0IGFsbEVudHJpZXMgPSBhd2FpdCB0aGlzLl9xdWV1ZVN0b3JlLmdldEFsbCgpO1xuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBjb25zdCB1bmV4cGlyZWRFbnRyaWVzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgYWxsRW50cmllcykge1xuICAgICAgICAgICAgLy8gSWdub3JlIHJlcXVlc3RzIG9sZGVyIHRoYW4gbWF4UmV0ZW50aW9uVGltZS4gQ2FsbCB0aGlzIGZ1bmN0aW9uXG4gICAgICAgICAgICAvLyByZWN1cnNpdmVseSB1bnRpbCBhbiB1bmV4cGlyZWQgcmVxdWVzdCBpcyBmb3VuZC5cbiAgICAgICAgICAgIGNvbnN0IG1heFJldGVudGlvblRpbWVJbk1zID0gdGhpcy5fbWF4UmV0ZW50aW9uVGltZSAqIDYwICogMTAwMDtcbiAgICAgICAgICAgIGlmIChub3cgLSBlbnRyeS50aW1lc3RhbXAgPiBtYXhSZXRlbnRpb25UaW1lSW5Ncykge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX3F1ZXVlU3RvcmUuZGVsZXRlRW50cnkoZW50cnkuaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdW5leHBpcmVkRW50cmllcy5wdXNoKGNvbnZlcnRFbnRyeShlbnRyeSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmV4cGlyZWRFbnRyaWVzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZW50cmllcyBwcmVzZW50IGluIHRoZSBxdWV1ZS5cbiAgICAgKiBOb3RlIHRoYXQgZXhwaXJlZCBlbnRyaWVzIChwZXIgYG1heFJldGVudGlvblRpbWVgKSBhcmUgYWxzbyBpbmNsdWRlZCBpbiB0aGlzIGNvdW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxudW1iZXI+fVxuICAgICAqL1xuICAgIGFzeW5jIHNpemUoKSB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9xdWV1ZVN0b3JlLnNpemUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyB0aGUgZW50cnkgdG8gdGhlIFF1ZXVlU3RvcmUgYW5kIHJlZ2lzdGVycyBmb3IgYSBzeW5jIGV2ZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVudHJ5XG4gICAgICogQHBhcmFtIHtSZXF1ZXN0fSBlbnRyeS5yZXF1ZXN0XG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtlbnRyeS5tZXRhZGF0YV1cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2VudHJ5LnRpbWVzdGFtcD1EYXRlLm5vdygpXVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcGVyYXRpb24gKCdwdXNoJyBvciAndW5zaGlmdCcpXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhc3luYyBfYWRkUmVxdWVzdCh7IHJlcXVlc3QsIG1ldGFkYXRhLCB0aW1lc3RhbXAgPSBEYXRlLm5vdygpIH0sIG9wZXJhdGlvbikge1xuICAgICAgICBjb25zdCBzdG9yYWJsZVJlcXVlc3QgPSBhd2FpdCBTdG9yYWJsZVJlcXVlc3QuZnJvbVJlcXVlc3QocmVxdWVzdC5jbG9uZSgpKTtcbiAgICAgICAgY29uc3QgZW50cnkgPSB7XG4gICAgICAgICAgICByZXF1ZXN0RGF0YTogc3RvcmFibGVSZXF1ZXN0LnRvT2JqZWN0KCksXG4gICAgICAgICAgICB0aW1lc3RhbXAsXG4gICAgICAgIH07XG4gICAgICAgIC8vIE9ubHkgaW5jbHVkZSBtZXRhZGF0YSBpZiBpdCdzIHByZXNlbnQuXG4gICAgICAgIGlmIChtZXRhZGF0YSkge1xuICAgICAgICAgICAgZW50cnkubWV0YWRhdGEgPSBtZXRhZGF0YTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvbikge1xuICAgICAgICAgICAgY2FzZSAncHVzaCc6XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fcXVldWVTdG9yZS5wdXNoRW50cnkoZW50cnkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndW5zaGlmdCc6XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fcXVldWVTdG9yZS51bnNoaWZ0RW50cnkoZW50cnkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBsb2dnZXIubG9nKGBSZXF1ZXN0IGZvciAnJHtnZXRGcmllbmRseVVSTChyZXF1ZXN0LnVybCl9JyBoYXMgYCArXG4gICAgICAgICAgICAgICAgYGJlZW4gYWRkZWQgdG8gYmFja2dyb3VuZCBzeW5jIHF1ZXVlICcke3RoaXMuX25hbWV9Jy5gKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBEb24ndCByZWdpc3RlciBmb3IgYSBzeW5jIGlmIHdlJ3JlIGluIHRoZSBtaWRkbGUgb2YgYSBzeW5jLiBJbnN0ZWFkLFxuICAgICAgICAvLyB3ZSB3YWl0IHVudGlsIHRoZSBzeW5jIGlzIGNvbXBsZXRlIGFuZCBjYWxsIHJlZ2lzdGVyIGlmXG4gICAgICAgIC8vIGB0aGlzLl9yZXF1ZXN0c0FkZGVkRHVyaW5nU3luY2AgaXMgdHJ1ZS5cbiAgICAgICAgaWYgKHRoaXMuX3N5bmNJblByb2dyZXNzKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXF1ZXN0c0FkZGVkRHVyaW5nU3luYyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnJlZ2lzdGVyU3luYygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYW5kIHJldHVybnMgdGhlIGZpcnN0IG9yIGxhc3QgKGRlcGVuZGluZyBvbiBgb3BlcmF0aW9uYCkgZW50cnlcbiAgICAgKiBmcm9tIHRoZSBRdWV1ZVN0b3JlIHRoYXQncyBub3Qgb2xkZXIgdGhhbiB0aGUgYG1heFJldGVudGlvblRpbWVgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9wZXJhdGlvbiAoJ3BvcCcgb3IgJ3NoaWZ0JylcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R8dW5kZWZpbmVkfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgYXN5bmMgX3JlbW92ZVJlcXVlc3Qob3BlcmF0aW9uKSB7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGxldCBlbnRyeTtcbiAgICAgICAgc3dpdGNoIChvcGVyYXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgJ3BvcCc6XG4gICAgICAgICAgICAgICAgZW50cnkgPSBhd2FpdCB0aGlzLl9xdWV1ZVN0b3JlLnBvcEVudHJ5KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzaGlmdCc6XG4gICAgICAgICAgICAgICAgZW50cnkgPSBhd2FpdCB0aGlzLl9xdWV1ZVN0b3JlLnNoaWZ0RW50cnkoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgIC8vIElnbm9yZSByZXF1ZXN0cyBvbGRlciB0aGFuIG1heFJldGVudGlvblRpbWUuIENhbGwgdGhpcyBmdW5jdGlvblxuICAgICAgICAgICAgLy8gcmVjdXJzaXZlbHkgdW50aWwgYW4gdW5leHBpcmVkIHJlcXVlc3QgaXMgZm91bmQuXG4gICAgICAgICAgICBjb25zdCBtYXhSZXRlbnRpb25UaW1lSW5NcyA9IHRoaXMuX21heFJldGVudGlvblRpbWUgKiA2MCAqIDEwMDA7XG4gICAgICAgICAgICBpZiAobm93IC0gZW50cnkudGltZXN0YW1wID4gbWF4UmV0ZW50aW9uVGltZUluTXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVtb3ZlUmVxdWVzdChvcGVyYXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbnZlcnRFbnRyeShlbnRyeSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExvb3BzIHRocm91Z2ggZWFjaCByZXF1ZXN0IGluIHRoZSBxdWV1ZSBhbmQgYXR0ZW1wdHMgdG8gcmUtZmV0Y2ggaXQuXG4gICAgICogSWYgYW55IHJlcXVlc3QgZmFpbHMgdG8gcmUtZmV0Y2gsIGl0J3MgcHV0IGJhY2sgaW4gdGhlIHNhbWUgcG9zaXRpb24gaW5cbiAgICAgKiB0aGUgcXVldWUgKHdoaWNoIHJlZ2lzdGVycyBhIHJldHJ5IGZvciB0aGUgbmV4dCBzeW5jIGV2ZW50KS5cbiAgICAgKi9cbiAgICBhc3luYyByZXBsYXlSZXF1ZXN0cygpIHtcbiAgICAgICAgbGV0IGVudHJ5O1xuICAgICAgICB3aGlsZSAoKGVudHJ5ID0gYXdhaXQgdGhpcy5zaGlmdFJlcXVlc3QoKSkpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgZmV0Y2goZW50cnkucmVxdWVzdC5jbG9uZSgpKTtcbiAgICAgICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXF1ZXN0IGZvciAnJHtnZXRGcmllbmRseVVSTChlbnRyeS5yZXF1ZXN0LnVybCl9JyBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGBoYXMgYmVlbiByZXBsYXllZCBpbiBxdWV1ZSAnJHt0aGlzLl9uYW1lfSdgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnVuc2hpZnRSZXF1ZXN0KGVudHJ5KTtcbiAgICAgICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBSZXF1ZXN0IGZvciAnJHtnZXRGcmllbmRseVVSTChlbnRyeS5yZXF1ZXN0LnVybCl9JyBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGBmYWlsZWQgdG8gcmVwbGF5LCBwdXR0aW5nIGl0IGJhY2sgaW4gcXVldWUgJyR7dGhpcy5fbmFtZX0nYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBXb3JrYm94RXJyb3IoJ3F1ZXVlLXJlcGxheS1mYWlsZWQnLCB7IG5hbWU6IHRoaXMuX25hbWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coYEFsbCByZXF1ZXN0cyBpbiBxdWV1ZSAnJHt0aGlzLm5hbWV9JyBoYXZlIHN1Y2Nlc3NmdWxseSBgICtcbiAgICAgICAgICAgICAgICBgcmVwbGF5ZWQ7IHRoZSBxdWV1ZSBpcyBub3cgZW1wdHkhYCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIGEgc3luYyBldmVudCB3aXRoIGEgdGFnIHVuaXF1ZSB0byB0aGlzIGluc3RhbmNlLlxuICAgICAqL1xuICAgIGFzeW5jIHJlZ2lzdGVyU3luYygpIHtcbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvd29ya2JveC9pc3N1ZXMvMjM5M1xuICAgICAgICBpZiAoJ3N5bmMnIGluIHNlbGYucmVnaXN0cmF0aW9uICYmICF0aGlzLl9mb3JjZVN5bmNGYWxsYmFjaykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCBzZWxmLnJlZ2lzdHJhdGlvbi5zeW5jLnJlZ2lzdGVyKGAke1RBR19QUkVGSVh9OiR7dGhpcy5fbmFtZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIG1lYW5zIHRoZSByZWdpc3RyYXRpb24gZmFpbGVkIGZvciBzb21lIHJlYXNvbiwgcG9zc2libHkgZHVlIHRvXG4gICAgICAgICAgICAgICAgLy8gdGhlIHVzZXIgZGlzYWJsaW5nIGl0LlxuICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci53YXJuKGBVbmFibGUgdG8gcmVnaXN0ZXIgc3luYyBldmVudCBmb3IgJyR7dGhpcy5fbmFtZX0nLmAsIGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluIHN5bmMtc3VwcG9ydGluZyBicm93c2VycywgdGhpcyBhZGRzIGEgbGlzdGVuZXIgZm9yIHRoZSBzeW5jIGV2ZW50LlxuICAgICAqIEluIG5vbi1zeW5jLXN1cHBvcnRpbmcgYnJvd3NlcnMsIG9yIGlmIF9mb3JjZVN5bmNGYWxsYmFjayBpcyB0cnVlLCB0aGlzXG4gICAgICogd2lsbCByZXRyeSB0aGUgcXVldWUgb24gc2VydmljZSB3b3JrZXIgc3RhcnR1cC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2FkZFN5bmNMaXN0ZW5lcigpIHtcbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvd29ya2JveC9pc3N1ZXMvMjM5M1xuICAgICAgICBpZiAoJ3N5bmMnIGluIHNlbGYucmVnaXN0cmF0aW9uICYmICF0aGlzLl9mb3JjZVN5bmNGYWxsYmFjaykge1xuICAgICAgICAgICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdzeW5jJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnRhZyA9PT0gYCR7VEFHX1BSRUZJWH06JHt0aGlzLl9uYW1lfWApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coYEJhY2tncm91bmQgc3luYyBmb3IgdGFnICcke2V2ZW50LnRhZ30nIGAgKyBgaGFzIGJlZW4gcmVjZWl2ZWRgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzeW5jQ29tcGxldGUgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zeW5jSW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3luY0Vycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9vblN5bmMoeyBxdWV1ZTogdGhpcyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN5bmNFcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXRocm93IHRoZSBlcnJvci4gTm90ZTogdGhlIGxvZ2ljIGluIHRoZSBmaW5hbGx5IGNsYXVzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3aWxsIHJ1biBiZWZvcmUgdGhpcyBnZXRzIHJldGhyb3duLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBzeW5jRXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTmV3IGl0ZW1zIG1heSBoYXZlIGJlZW4gYWRkZWQgdG8gdGhlIHF1ZXVlIGR1cmluZyB0aGUgc3luYyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzbyB3ZSBuZWVkIHRvIHJlZ2lzdGVyIGZvciBhIG5ldyBzeW5jIGlmIHRoYXQncyBoYXBwZW5lZC4uLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVubGVzcyB0aGVyZSB3YXMgYW4gZXJyb3IgZHVyaW5nIHRoZSBzeW5jLCBpbiB3aGljaFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhc2UgdGhlIGJyb3dzZXIgd2lsbCBhdXRvbWF0aWNhbGx5IHJldHJ5IGxhdGVyLCBhcyBsb25nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXMgYGV2ZW50Lmxhc3RDaGFuY2VgIGlzIG5vdCB0cnVlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9yZXF1ZXN0c0FkZGVkRHVyaW5nU3luYyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhKHN5bmNFcnJvciAmJiAhZXZlbnQubGFzdENoYW5jZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5yZWdpc3RlclN5bmMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3luY0luUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXF1ZXN0c0FkZGVkRHVyaW5nU3luYyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBldmVudC53YWl0VW50aWwoc3luY0NvbXBsZXRlKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIubG9nKGBCYWNrZ3JvdW5kIHN5bmMgcmVwbGF5aW5nIHdpdGhvdXQgYmFja2dyb3VuZCBzeW5jIGV2ZW50YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiB0aGUgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgYmFja2dyb3VuZCBzeW5jLCBvciB0aGUgZGV2ZWxvcGVyIGhhc1xuICAgICAgICAgICAgLy8gb3B0ZWQtaW4gdG8gbm90IHVzaW5nIGl0LCByZXRyeSBldmVyeSB0aW1lIHRoZSBzZXJ2aWNlIHdvcmtlciBzdGFydHMgdXBcbiAgICAgICAgICAgIC8vIGFzIGEgZmFsbGJhY2suXG4gICAgICAgICAgICB2b2lkIHRoaXMuX29uU3luYyh7IHF1ZXVlOiB0aGlzIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHNldCBvZiBxdWV1ZSBuYW1lcy4gVGhpcyBpcyBwcmltYXJpbHkgdXNlZCB0byByZXNldCB0aGUgbGlzdFxuICAgICAqIG9mIHF1ZXVlIG5hbWVzIGluIHRlc3RzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7U2V0PHN0cmluZz59XG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXQgX3F1ZXVlTmFtZXMoKSB7XG4gICAgICAgIHJldHVybiBxdWV1ZU5hbWVzO1xuICAgIH1cbn1cbmV4cG9ydCB7IFF1ZXVlIH07XG4iLCAiLyogZXNsaW50LWVudiBzZXJ2aWNld29ya2VyICovXG5cbi8qXG4gKiBUaGlzIGZpbGUgKHdoaWNoIHdpbGwgYmUgeW91ciBzZXJ2aWNlIHdvcmtlcilcbiAqIGlzIHBpY2tlZCB1cCBieSB0aGUgYnVpbGQgc3lzdGVtIE9OTFkgaWZcbiAqIHF1YXNhci5jb25maWcuanMgPiBwd2EgPiB3b3JrYm94TW9kZSBpcyBzZXQgdG8gXCJpbmplY3RNYW5pZmVzdFwiXG4gKi9cblxuaW1wb3J0IHsgY2xpZW50c0NsYWltIH0gZnJvbSBcIndvcmtib3gtY29yZVwiO1xuaW1wb3J0IHtcbiAgcHJlY2FjaGVBbmRSb3V0ZSxcbiAgY2xlYW51cE91dGRhdGVkQ2FjaGVzLFxuICBjcmVhdGVIYW5kbGVyQm91bmRUb1VSTCxcbn0gZnJvbSBcIndvcmtib3gtcHJlY2FjaGluZ1wiO1xuaW1wb3J0IHsgcmVnaXN0ZXJSb3V0ZSwgTmF2aWdhdGlvblJvdXRlIH0gZnJvbSBcIndvcmtib3gtcm91dGluZ1wiO1xuaW1wb3J0IHsgU3RhbGVXaGlsZVJldmFsaWRhdGUsIE5ldHdvcmtGaXJzdCB9IGZyb20gXCJ3b3JrYm94LXN0cmF0ZWdpZXNcIjtcbmltcG9ydCB7IGdvb2dsZUZvbnRzQ2FjaGUgfSBmcm9tIFwid29ya2JveC1yZWNpcGVzXCI7XG5pbXBvcnQgeyBFeHBpcmF0aW9uUGx1Z2luIH0gZnJvbSBcIndvcmtib3gtZXhwaXJhdGlvblwiO1xuaW1wb3J0IHsgUXVldWUgfSBmcm9tIFwid29ya2JveC1iYWNrZ3JvdW5kLXN5bmNcIjtcblxuc2VsZi5za2lwV2FpdGluZygpO1xuY2xpZW50c0NsYWltKCk7XG5cbi8vIFVzZSB3aXRoIHByZWNhY2hlIGluamVjdGlvblxucHJlY2FjaGVBbmRSb3V0ZShzZWxmLl9fV0JfTUFOSUZFU1QpO1xuXG5jb25zdCBiYWNrZ3JvdW5kU3luY1N1cHBvcnRlZCA9IFwic3luY1wiIGluIHNlbGYucmVnaXN0cmF0aW9uIHx8IGZhbHNlO1xuY29uc29sZS5sb2coXCJCYWNrZ3JvdW5kU3luY1N1cHBvcnRlZDogXCIsIGJhY2tncm91bmRTeW5jU3VwcG9ydGVkKTtcblxubGV0IGNyZWF0ZVBvc3RRdWV1ZTtcbmlmIChiYWNrZ3JvdW5kU3luY1N1cHBvcnRlZCkge1xuICBjcmVhdGVQb3N0UXVldWUgPSBuZXcgUXVldWUoXCJjcmVhdGVQb3N0UXVldWVcIiwge1xuICAgIG9uU3luYzogYXN5bmMgKHsgcXVldWUgfSkgPT4ge1xuICAgICAgbGV0IGVudHJ5O1xuICAgICAgd2hpbGUgKChlbnRyeSA9IGF3YWl0IHF1ZXVlLnNoaWZ0UmVxdWVzdCgpKSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IGZldGNoKGVudHJ5LnJlcXVlc3QpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVwbGF5IHN1Y2Nlc3NmdWwgZm9yIHJlcXVlc3RcIiwgZW50cnkucmVxdWVzdCk7XG4gICAgICAgICAgY29uc3QgY2hhbm5lbCA9IG5ldyBCcm9hZGNhc3RDaGFubmVsKFwic3ctbWVzc2FnZXNcIik7XG4gICAgICAgICAgY2hhbm5lbC5wb3N0TWVzc2FnZSh7IG1zZzogXCJvZmZsaW5lLXBvc3QtdXBsb2FkZWRcIiB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUmVwbGF5IGZhaWxlZCBmb3IgcmVxdWVzdFwiLCBlbnRyeS5yZXF1ZXN0LCBlcnJvcik7XG5cbiAgICAgICAgICAvLyBQdXQgdGhlIGVudHJ5IGJhY2sgaW4gdGhlIHF1ZXVlIGFuZCByZS10aHJvdyB0aGUgZXJyb3I6XG4gICAgICAgICAgYXdhaXQgcXVldWUudW5zaGlmdFJlcXVlc3QoZW50cnkpO1xuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhcIlJlcGxheSBjb21wbGV0ZSFcIik7XG4gICAgfSxcbiAgfSk7XG59XG5cbmNsZWFudXBPdXRkYXRlZENhY2hlcygpO1xuXG4vLyBOb24tU1NSIGZhbGxiYWNrIHRvIGluZGV4Lmh0bWxcbi8vIFByb2R1Y3Rpb24gU1NSIGZhbGxiYWNrIHRvIG9mZmxpbmUuaHRtbCAoZXhjZXB0IGZvciBkZXYpXG4vLyBpZiAocHJvY2Vzcy5lbnYuTU9ERSAhPT0gXCJzc3JcIiB8fCBwcm9jZXNzLmVudi5QUk9EKSB7XG4vLyAgIHJlZ2lzdGVyUm91dGUoXG4vLyAgICAgbmV3IE5hdmlnYXRpb25Sb3V0ZShcbi8vICAgICAgIGNyZWF0ZUhhbmRsZXJCb3VuZFRvVVJMKHByb2Nlc3MuZW52LlBXQV9GQUxMQkFDS19IVE1MKSxcbi8vICAgICAgIHsgZGVueWxpc3Q6IFsvc3dcXC5qcyQvLCAvd29ya2JveC0oLikqXFwuanMkL10gfVxuLy8gICAgIClcbi8vICAgKTtcbi8vIH1cblxuLy8gY29uc3Qgc2F2ZVBvc3RSZXNwb25zZVBsdWdpbiA9IHtcbi8vICAgY2FjaGVLZXlXaWxsQmVVc2VkOiBhc3luYyAoeyByZXF1ZXN0LCBtb2RlLCBldmVudCB9KSA9PiB7XG4vLyAgICAgaWYgKG1vZGUgPT09IFwid3JpdGVcIikge1xuLy8gICAgICAgLy8gVXNlIHRoZSBzYW1lIFVSTCBhcyBgUE9TVGAgcmVxdWVzdCBhcyB0aGUgY2FjaGUga2V5LlxuLy8gICAgICAgLy8gQWx0ZXJuYXRpdmVseSwgdXNlIGEgZGlmZmVyZW50IFVSTC5cbi8vICAgICAgIHJldHVybiByZXF1ZXN0LnVybDtcbi8vICAgICB9XG4vLyAgIH0sXG4vLyB9O1xuXG4vLyBDYWNoZSB0aGUgR29vZ2xlIEZvbnRzIHN0eWxlc2hlZXRzIHdpdGggYSBzdGFsZSB3aGlsZSByZXZhbGlkYXRlIHN0cmF0ZWd5LlxuZ29vZ2xlRm9udHNDYWNoZSh7XG4gIGNhY2hlUHJlZml4OiBcImdvb2dsZS1mb250c1wiLFxuICBtYXhFbnRyaWVzOiA2MCxcbn0pO1xuXG5yZWdpc3RlclJvdXRlKFxuICAoeyB1cmwgfSkgPT4gdXJsLnBhdGhuYW1lLnN0YXJ0c1dpdGgoXCIvcG9zdHNcIiksXG4gIG5ldyBOZXR3b3JrRmlyc3Qoe1xuICAgIGNhY2hlTmFtZTogXCJxYXJhdmVsLWFwaVwiLFxuICB9KVxuKTtcblxuLy8gcmVnaXN0ZXJSb3V0ZShcbi8vICAgKHsgdXJsIH0pID0+IHVybC5wYXRobmFtZS5zdGFydHNXaXRoKFwiL3Bvc3RzXCIpLFxuLy8gICBuZXcgTmV0d29ya0ZpcnN0KHtcbi8vICAgICBjYWNoZU5hbWU6IFwicWFyYXZlbC1hcGktcG9zdFwiLFxuLy8gICAgIHBsdWdpbnM6IFtcbi8vICAgICAgIC8vIEFkZCB0aGUgY3VzdG9tIHBsdWdpbiB0byB5b3VyIHN0cmF0ZWd5LlxuLy8gICAgICAgc2F2ZVBvc3RSZXNwb25zZVBsdWdpbixcbi8vICAgICAgIG5ldyBFeHBpcmF0aW9uUGx1Z2luKHtcbi8vICAgICAgICAgbWF4RW50cmllczogMTAwLFxuLy8gICAgICAgICBtYXhBZ2VTZWNvbmRzOiA3ICogMjQgKiA2MCAqIDYwLCAvLyA3IERheXNcbi8vICAgICAgIH0pLFxuLy8gICAgIF0sXG4vLyAgIH0pLFxuLy8gICBcIlBPU1RcIlxuLy8gKTtcblxucmVnaXN0ZXJSb3V0ZShcbiAgKHsgdXJsIH0pID0+IHVybC5ocmVmLnN0YXJ0c1dpdGgoXCJodHRwXCIpLFxuICBuZXcgU3RhbGVXaGlsZVJldmFsaWRhdGUoKVxuKTtcblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKFwiZmV0Y2hcIiwgKGV2ZW50KSA9PiB7XG4gIGlmIChiYWNrZ3JvdW5kU3luY1N1cHBvcnRlZCkge1xuICAgIGlmIChldmVudC5yZXF1ZXN0LnVybC5lbmRzV2l0aChcIi9wb3N0cy9zdG9yZVwiKSkge1xuICAgICAgLy8gQ2xvbmUgdGhlIHJlcXVlc3QgdG8gZW5zdXJlIGl0J3Mgc2FmZSB0byByZWFkIHdoZW5cbiAgICAgIC8vIGFkZGluZyB0byB0aGUgUXVldWUuXG4gICAgICBjb25zdCBwcm9taXNlQ2hhaW4gPSBmZXRjaChldmVudC5yZXF1ZXN0LmNsb25lKCkpLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVBvc3RRdWV1ZS5wdXNoUmVxdWVzdCh7IHJlcXVlc3Q6IGV2ZW50LnJlcXVlc3QgfSk7XG4gICAgICB9KTtcblxuICAgICAgZXZlbnQud2FpdFVudGlsKHByb21pc2VDaGFpbik7XG4gICAgfVxuICB9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBRUEsTUFBSTtBQUNBLFNBQUsseUJBQXlCLEVBQUU7QUFBQSxFQUNwQyxTQUNPLEdBQVA7QUFBQSxFQUFZOzs7QUNFWixNQUFNLFNBQVUsT0FDVixRQUNDLE1BQU07QUFHTCxRQUFJLEVBQUUsMkJBQTJCLE9BQU87QUFDcEMsV0FBSyx3QkFBd0I7QUFBQSxJQUNqQztBQUNBLFFBQUksVUFBVTtBQUNkLFVBQU0sbUJBQW1CO0FBQUEsTUFDckIsT0FBTztBQUFBLE1BQ1AsS0FBSztBQUFBLE1BQ0wsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsZ0JBQWdCO0FBQUEsTUFDaEIsVUFBVTtBQUFBLElBQ2Q7QUFDQSxVQUFNLFFBQVEsU0FBVSxRQUFRLE1BQU07QUFDbEMsVUFBSSxLQUFLLHVCQUF1QjtBQUM1QjtBQUFBLE1BQ0o7QUFDQSxVQUFJLFdBQVcsa0JBQWtCO0FBRzdCLFlBQUksaUNBQWlDLEtBQUssVUFBVSxTQUFTLEdBQUc7QUFDNUQsa0JBQVEsUUFBUSxHQUFHLElBQUk7QUFDdkI7QUFBQSxRQUNKO0FBQUEsTUFDSjtBQUNBLFlBQU0sU0FBUztBQUFBLFFBQ1gsZUFBZSxpQkFBaUI7QUFBQSxRQUNoQztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0o7QUFFQSxZQUFNLFlBQVksVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLE9BQU8sS0FBSyxHQUFHLENBQUM7QUFDL0QsY0FBUSxRQUFRLEdBQUcsV0FBVyxHQUFHLElBQUk7QUFDckMsVUFBSSxXQUFXLGtCQUFrQjtBQUM3QixrQkFBVTtBQUFBLE1BQ2Q7QUFDQSxVQUFJLFdBQVcsWUFBWTtBQUN2QixrQkFB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TSxNQUFNO0FBQzNCLFlBQUk7QUFDSixlQUFRLFFBQVEsTUFBTSxNQUFNLGFBQWEsR0FBSTtBQUMzQyxjQUFJO0FBQ0Ysa0JBQU0sTUFBTSxNQUFNLE9BQU87QUFDekIsb0JBQVEsSUFBSSxpQ0FBaUMsTUFBTSxPQUFPO0FBQzFELGtCQUFNLFVBQVUsSUFBSSxpQkFBaUIsYUFBYTtBQUNsRCxvQkFBUSxZQUFZLEVBQUUsS0FBSyx3QkFBd0IsQ0FBQztBQUFBLFVBQ3RELFNBQVMsT0FBUDtBQUNBLG9CQUFRLE1BQU0sNkJBQTZCLE1BQU0sU0FBUyxLQUFLO0FBRy9ELGtCQUFNLE1BQU0sZUFBZSxLQUFLO0FBQ2hDLGtCQUFNO0FBQUEsVUFDUjtBQUFBLFFBQ0Y7QUFDQSxnQkFBUSxJQUFJLGtCQUFrQjtBQUFBLE1BQ2hDO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUVBLHdCQUFzQjtBQXdCdEIsbUJBQWlCO0FBQUEsSUFDZixhQUFhO0FBQUEsSUFDYixZQUFZO0FBQUEsRUFDZCxDQUFDO0FBRUQ7QUFBQSxJQUNFLENBQUMsRUFBRSxJQUFJLE1BQU0sSUFBSSxTQUFTLFdBQVcsUUFBUTtBQUFBLElBQzdDLElBQUksYUFBYTtBQUFBLE1BQ2YsV0FBVztBQUFBLElBQ2IsQ0FBQztBQUFBLEVBQ0g7QUFrQkE7QUFBQSxJQUNFLENBQUMsRUFBRSxJQUFJLE1BQU0sSUFBSSxLQUFLLFdBQVcsTUFBTTtBQUFBLElBQ3ZDLElBQUkscUJBQXFCO0FBQUEsRUFDM0I7QUFFQSxPQUFLLGlCQUFpQixTQUFTLENBQUMsVUFBVTtBQUN4QyxRQUFJLHlCQUF5QjtBQUMzQixVQUFJLE1BQU0sUUFBUSxJQUFJLFNBQVMsY0FBYyxHQUFHO0FBRzlDLGNBQU0sZUFBZSxNQUFNLE1BQU0sUUFBUSxNQUFNLENBQUMsRUFBRSxNQUFNLENBQUMsUUFBUTtBQUMvRCxpQkFBTyxnQkFBZ0IsWUFBWSxFQUFFLFNBQVMsTUFBTSxRQUFRLENBQUM7QUFBQSxRQUMvRCxDQUFDO0FBRUQsY0FBTSxVQUFVLFlBQVk7QUFBQSxNQUM5QjtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInByZWNhY2hlQ29udHJvbGxlciIsICJlcnJvciIsICJkZWZhdWx0Um91dGVyIiwgInByZWNhY2hlQ29udHJvbGxlciIsICJwcmVjYWNoZUNvbnRyb2xsZXIiLCAiY2FjaGVOYW1lcyIsICJwcmVjYWNoZUNvbnRyb2xsZXIiLCAibWVzc2FnZXMiLCAibWVzc2FnZXMiLCAibWVzc2FnZXMiLCAidGFyZ2V0IiwgIkRCX05BTUUiXQp9Cg==
