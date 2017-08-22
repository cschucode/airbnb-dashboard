exports.paths = function(req, res, next) {
  var paths = req.url.slice(1).split('/');
  var pathArray = [];

  paths.reduce(function(accum, item) {
    pathArray.push({[item]: accum + '/' + item})
    return accum + '/' + item;
  })

  pathArray.unshift({home: paths[0]});
  
  res.locals.paths = pathArray;

  next();
};

