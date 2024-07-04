import { getHash, requestHint, startOtpListener } from 'react-native-otp-verify';

// Utility function to fetch OTP details using the provided methods
export const fetchOtpDetails = async () => {
  try {
    const hash = await getHash().catch((error) => {
      console.error("Error fetching hash:", error);
      return null;
    });
    const hint = await requestHint().catch((error) => {
      console.error("Error fetching hint:", error);
      return null;
    });

    const otp = await new Promise((resolve, reject) => {
      startOtpListener((receivedOtp) => {
        if (receivedOtp) {
          // Extract 4-digit OTP using regex
          const otpMatch = /(\d{4})/g.exec(receivedOtp);
          if (otpMatch) {
            resolve(otpMatch[1]); // Resolve with the extracted OTP
          } else {
            reject('No 4-digit OTP found in the message');
          }
        } else {
          reject('No OTP received');
        }
      });
    }).catch((error) => {
      console.error("Error receiving OTP:", error);
      return null;
    });

    // Ensure we return an object with all the necessary properties, even if some are null
    return {
      hash: hash || [],
      hint: hint || '',
      otp: otp || '',
    };
  } catch (error) {
    console.error("Error fetching OTP details:", error);
    return null; // Return null in case of a critical failure
  }
};


