import { useEffect, useState } from 'react';
import axios from 'axios';
import { getChromeVersion, getDeviceOs } from '../utils/device';

const useBrowserValidator = () => {
  const [isValid, setIsValid] = useState(true);
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const getDetails = async () => {
      const userChromeVersion = getChromeVersion();

      if (userChromeVersion) {
        const response = await axios.post('/chromeVersion', {
          os: getDeviceOs(),
        });

        if (userChromeVersion.toString() === response.data.latest.toString()) {
          setIsValid(true);
          setIsValidating(false);
          return;
        }
      }

      setIsValid(false);
      setIsValidating(false);
    };

    getDetails();
  }, []);

  return {
    isValid,
    isValidating,
  };
};

export default useBrowserValidator;
