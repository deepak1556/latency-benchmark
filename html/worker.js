/*
 * Copyright 2013 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

self.postMessage = self.webkitPostMessage || self.mozPostMessage || self.oPostMessage || self.msPostMessage || self.postMessage;
var getMs = function() {
  return new Date().getTime();
}
self.onmessage = function(e) {
  if (e.data.test == 'transferables') {
    self.postMessage(e.data, [e.data.buffer]);
  } else if (e.data.test == 'spin') {
    var start = getMs();
    while (getMs() - e.data.lengthMs < start);
    self.postMessage(e.data);
  } else if (e.data.test == 'gcLoad') {
    var createObjects = function(n) {
      var a = new Array(1000*n);
      var count = 0;
      for(var  i=0; i<g.length; i++) {
	g[i] = {count: count++};
      }

      var generateGarbage = function() {
	var i;
	for(i=0; i<g.length; i++) {
	  g[i] = {count: g[i].count * 2};
	}
      };

      return generateGarbage;
    };

    var gen = createObjects(20);
    var start = getMs();
    while (getMs() - start < 1000) {
	gen();
    }
    self.postMessage(e.data);
  } else {
    console.error('unknown worker message: ' + e.data.test);
  }
};
