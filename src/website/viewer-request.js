// CloudFront Function (viewer request)
// - www.malanius.dev → malanius.dev, permanently
// - directory URLs → their index.html; S3 behind OAC has no directory index of its own
// biome-ignore lint/correctness/noUnusedVariables: entry point, called by CloudFront
function handler(event) {
  var request = event.request;
  var host = request.headers.host.value;

  if (host.startsWith('www.')) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: { value: `https://${host.slice(4)}${request.uri}` },
      },
    };
  }

  var uri = request.uri;
  if (uri.endsWith('/')) {
    request.uri += 'index.html';
  } else if (!uri.split('/').pop().includes('.')) {
    request.uri += '/index.html';
  }
  return request;
}
