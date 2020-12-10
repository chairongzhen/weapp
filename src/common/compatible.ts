(function() {
  if (typeof Promise.prototype.finally === "function") {
    return;
  }
  Promise.prototype.finally = function(fn) {
    return this.then(value =>
      this.consgtructor
        ?.resolve(fn())
        .then(() => value)
        .then(reason =>
          this.constructor?.resolve(fn()).then(() => {
            throw reason;
          })
        )
    );
  };
})();
