(function (ROOT) {
    // 构造函数
    var jQuery = function(selector) {
        return new jQuery.fn.init(selector)
    }

    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        version: '1.0.0',
        init: function(selector) {
            var elem, selector;
            elem = document.querySelector(selector)
            this[0] = elem

            return this
        },
        toArray: function() {},
        get: function() {},
        each: function() {},
        ready: function() {},
        first: function() {},
        slice: function() {},
        // ... more
    }

    // 让init方法的原型指向jQuery的原型
    jQuery.fn.init.prototype = jQuery.fn

    // 实现jQuery的两种扩展方法
    jQuery.extend = jQuery.fn.extend = function(options) {
        var target = this
        var copy
        for(name in options) {
            copy = options[name]
            target[name] = copy
        }
        return target
    }

    // jQuery利用上面实现的扩展机制，添加了许多方法
    // 添加静态扩展方法，即工具方法
    jQuery.extend({
        isFunction: function() {},
        type: function() {},
        parseHTML: function() {},
        parseJSON: function() {},
        ajax: function() {},
        // ...
    })
    // 添加原型方法
    jQuery.fn.extend({
        quene: function() {},
        promise: function() {},
        attr: function() {},
        prop: function() {},
        addClass: function() {},
        removeClass: function() {},
        val: function() {},
        css: function() {},
        // ...
    })

    ROOT.jQuery = ROOT.$ = jQuery
})(window)