exports.processFacebookData = function(facebookInfo) {
  console.log('facebookinfo' ,facebookInfo);
  facebookInfo.picture = facebookInfo.picture.data.url;
  //facebookInfo.location = facebookInfo.location.name;
  delete facebookInfo.verified;
  return facebookInfo;
};
