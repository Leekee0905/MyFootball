import { ReactNode, createContext, useContext } from 'react';

interface ImageContextProps {
  preLoadImage: (url: string) => void;
}

const ImageContext = createContext<ImageContextProps | undefined>(undefined);

export const usePreloadImage = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImage must be used within an ImageProvider');
  }
  return context;
};

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const preLoadImage = (url: string) => {
    const img = new Image();
    img.src = url;
  };

  const contextValue: ImageContextProps = {
    preLoadImage,
  };

  return (
    <ImageContext.Provider value={contextValue}>
      {children}
    </ImageContext.Provider>
  );
};
