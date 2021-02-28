export const getChromeVersion = () => {
  var parts = navigator.userAgent.match(/Chrom(?:e|ium)\/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/);
  if (parts == null || parts.length !== 5) {
    return -1;
  }

  return `${parts[1]}.${parts[2]}.${parts[3]}.${parts[4]}`;
};

export const getDeviceOs = () => {
  const { userAgent } = navigator;

  if (userAgent.indexOf('Win') !== -1) {
    return 'win';
  }

  if (userAgent.indexOf('Mac') !== -1) {
    return 'mac';
  }

  if (userAgent.indexOf('Linux') !== -1) {
    return 'linux';
  }

  return 'unknown';
};
