function localstorage() {
  return {
    set: function(data) {
      if (!this.get(data))
	localStorage.setItem(data, "true");
    },
    get: function(data) {
      return localStorage.getItem(data);
    },
    del: function(data) {
      if (this.get(data))
	localStorage.removeItem(data);
    },
    clear: function() {
      localStorage.clear();
    }
  };
};

var local = new localstorage();
