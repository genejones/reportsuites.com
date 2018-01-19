var Handlebars = require('handlebars');

(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['select_rsid'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression, alias2=container.lambda;

  return "    "
    + alias1(helpers.log.call(depth0 != null ? depth0 : {},depth0,{"name":"log","hash":{},"data":data}))
    + "\r\n    <div class=\"form-check\">\r\n      <label class=\"form-check-label\">\r\n        <input class=\"form-check-input\" type=\"checkbox\" name=\""
    + alias1(alias2((depth0 != null ? depth0.rsid : depth0), depth0))
    + "\" id=\""
    + alias1(alias2((depth0 != null ? depth0.rsid : depth0), depth0))
    + "-checkbox\" checked>\r\n        "
    + alias1(alias2((depth0 != null ? depth0.rsid : depth0), depth0))
    + "\r\n      </label>\r\n    </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<form id=\"rsid-selection\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.report_suite : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    <button id=\"rsid-select-action\" type=\"button\" class=\"btn btn-lg btn-success\" href=\"#\" role=\"button\">Fetch details</a>\r\n</form>";
},"useData":true});
})();