const rest = require("rest");
const defaultRequest = require("rest/interceptor/defaultRequest");
const mime = require("rest/interceptor/mime");
const errorCode = require("rest/interceptor/errorCode");
const baseRegistry = require("rest/mime/registry");
const interceptor = require("rest/interceptor");

const uriTemplateInterceptor = interceptor({
  request: function(request /*, config, meta */) {
    /* If the URI is a URI Template per RFC 6570 (http://tools.ietf.org/html/rfc6570), trim out the template part */
    if (request.path.indexOf("{") === -1) {
      return request;
    } else {
      request.path = request.path.split("{")[0];
      return request;
    }
  }
});

const uriListConverter = {
  read: function(str /*, opts */) {
    return str.split("\n");
  },
  write: function(obj /*, opts */) {
    // If this is an Array, extract the self URI and then join using a newline
    if (obj instanceof Array) {
      return obj.map(resource => resource._links.self.href).join("\n");
    } else {
      // otherwise, just return the self URI
      return obj._links.self.href;
    }
  }
};

const registry = baseRegistry.child();

registry.register("text/uri-list", uriListConverter);
registry.register(
  "application/hal+json",
  require("rest/mime/type/application/hal")
);

module.exports = rest
  .wrap(mime, { registry: registry })
  .wrap(uriTemplateInterceptor)
  .wrap(errorCode)
  .wrap(defaultRequest, { headers: { Accept: "application/hal+json" } });
