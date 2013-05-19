Promise = function() {
    var defer = function() {
        return new function() {
            var state = null,
                chain = [],
                args = [],
                fire = function(a) {
                    args = a || args;
                    while (chain.length) {
                        (chain.shift())[state === false ? 1 : 0].apply(this, args);
                    }
                },
                noop = function(){};

            this.then = function(callback, errback) {
                chain.push([callback || noop, errback || noop]);
                state !== null && fire();
                return this;
            };
            this.always = function(callback) {
                return this.then(callback,callback);
            };
            this.done = function(callback) {
                return this.then(callback);
            };
            this.fail = function(callback) {
                return this.then(null,callback);
            };
            this.isResolved = function(){
                return state === true;
            },
            this.isRejected = function(){
                return state === false;
            };
            this.isPending = function(){
                return state === null;
            };
            this.resolve = function() {
                state = true;
                fire(arguments);
            };
            this.reject = function() {
                state = false;
                fire(arguments);
            };
        };
    };

    defer.when = function(args) {
        var deferred = defer(),
            results = 0,
            failed = false;

        for (var i = 0, len = args.length; i < len; i++) {
            args[i].then(function() {
                args.length === ++results && deferred.resolve();
            }, function() {
                failed = failed || deferred.reject.apply(deferred,arguments) || true;
            });
        }

        return deferred;
    };

    return defer;
}();