app.filter("trustUrl", ['$sce', function ($sce) {
  return function (videoUrl) {
    return $sce.trustAsResourceUrl(videoUrl);
  };
}]);
