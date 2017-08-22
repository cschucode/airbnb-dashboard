exports.findKeyValue = function(obj, keySearchingFor) {
	var results = '';

	try {
		(function findKeyValue(obj) {
			for (key in obj) {
		    if (key === keySearchingFor) 
		    	return results = obj[key];
		    if (typeof obj[key] === 'object') 
		    	findKeyValue(obj[key], keySearchingFor);
		  }
		})(obj)
	} catch(e) {
		console.log(e);
	}
 
  return results;
}
