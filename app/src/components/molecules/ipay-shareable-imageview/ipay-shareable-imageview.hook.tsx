import { useRef, useState } from 'react';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';

export const useShareableImage = () => {
  const viewShotRef = useRef<ViewShot | null>(null); // Explicit typing
  const [imageUri, setImageUri] = useState<string | null>(null);

  const captureView = async () => {
    const viewShot = viewShotRef.current;
    if (viewShot && typeof viewShot.capture === 'function') {
      try {
        const uri = await viewShot.capture();
        setImageUri(uri);
      } catch (error) {
        console.error('Error capturing view:', error);
      }
    }
  };
  const shareImage = async () => {
    const viewShot = viewShotRef.current;
    if (viewShot && typeof viewShot.capture === 'function') {
      try {
        const uri = await viewShot.capture();
        await Share.open({
          url: uri
        });
        setImageUri(uri);
      } catch (error) {}
    } else {
      //catch error
    }
  };

  return { viewShotRef, imageUri, captureView, shareImage };
};
